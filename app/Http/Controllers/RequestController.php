<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContentRequest;
use App\Models\Asset;
use App\Models\User;
use App\Mail\NewRequestSubmitted;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewRequestNotification;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RequestController extends Controller
{
    public function store(Request $request)
    {
        $cfg = config('simaco');
        $links = preg_split('/\s+/', trim((string) $request->drive_url), -1, PREG_SPLIT_NO_EMPTY);
        $maxMb = $cfg['upload_max_kb'] / 1024;

        $data = $request->validate([
            'event_name' => 'required|string|max:' . $cfg['event_name_max'],
            'description' => 'required|string',
            'project_type_id' => ['required', Rule::exists('project_types', 'id')->where('is_active', true)],
            'content_type' => 'required|in:series,single',
            'serial_name' => 'nullable|required_if:content_type,series|string|max:255',
            'theme_category_group' => 'nullable|string|max:255',
            'series_start_date' => 'nullable|required_if:content_type,series|date',
            'series_end_date' => 'nullable|required_if:content_type,series|date|after_or_equal:series_start_date',
            'event_start_date' => 'required|date|after_or_equal:today',
            'event_end_date' => 'required|date|after_or_equal:event_start_date',
            'content_deadline' => 'required|date|after_or_equal:' . now()->addDays($cfg['min_lead_days'])->toDateString(),
            'platform_ids' => 'required|array|min:1',
            'platform_ids.*' => ['distinct', Rule::exists('platforms', 'id')->where('is_active', true)],
            // Any site is allowed (PRD update), but only http(s): a "javascript:" link would run code when admins click it
            'drive_url' => ['nullable', 'string', 'required_without:files', function ($attr, $value, $fail) use ($links) {
                foreach ($links as $link) {
                    if (! filter_var($link, FILTER_VALIDATE_URL) || ! in_array(strtolower((string) parse_url($link, PHP_URL_SCHEME)), ['http', 'https'], true)) {
                        return $fail(__('Link tidak valid: :link. Link harus diawali http:// atau https://.', ['link' => $link]));
                    }
                }
            }],
            'files' => 'nullable|array|max:' . $cfg['upload_max_files'],
            'files.*' => 'file|mimes:' . implode(',', $cfg['upload_mimes']) . '|max:' . $cfg['upload_max_kb'],
            'additional_notes' => 'nullable|string',
        ], [
            'event_name.max' => __("Nama acara maksimal :max karakter.", ["max" => $cfg["event_name_max"]]),
            'serial_name.required_if' => __('Nama serial wajib diisi untuk Konten Series.'),
            'series_start_date.required_if' => __('Periode tayang wajib diisi untuk Konten Series.'),
            'series_end_date.required_if' => __('Periode tayang wajib diisi untuk Konten Series.'),
            'series_end_date.after_or_equal' => __('Akhir periode tayang harus sama atau setelah tanggal mulainya.'),
            'event_start_date.after_or_equal' => __('Tanggal acara tidak boleh tanggal yang sudah lewat.'),
            'event_end_date.after_or_equal' => __('Tanggal selesai acara harus sama atau setelah tanggal mulai.'),
            'content_deadline.required' => __('Tenggat waktu konten wajib diisi.'),
            'content_deadline.after_or_equal' => __("Request tidak bisa dadakan. Tenggat konten minimal H+:days dari hari ini.", ["days" => $cfg["min_lead_days"]]),
            'platform_ids.required' => __('Pilih minimal 1 platform tujuan.'),
            'drive_url.required_without' => __('Isi minimal 1 link atau upload 1 file.'),
            'files.max' => __("Maksimal :count file.", ["count" => $cfg["upload_max_files"]]),
            'files.*.mimes' => __('Format file harus JPG, PNG, WEBP, atau PDF.'),
            'files.*.max' => __("Ukuran file maksimal :mb MB.", ["mb" => $maxMb]),
        ]);

        if ($data['content_type'] === 'single') {
            $data = array_merge($data, ['serial_name' => null, 'theme_category_group' => null, 'series_start_date' => null, 'series_end_date' => null]);
        }

        $contentReq = DB::transaction(function () use ($data, $links, $request) {
            $contentReq = ContentRequest::create(Arr::only($data, [
                'event_name', 'description', 'additional_notes', 'project_type_id', 'content_type', 'serial_name',
                'theme_category_group', 'series_start_date', 'series_end_date', 'event_start_date', 'event_end_date', 'content_deadline',
            ]) + ['user_id' => Auth::id(), 'status' => 'new_request']);

            $contentReq->platforms()->attach(
                collect($data['platform_ids'])->values()->mapWithKeys(fn ($id, $i) => [$id => ['order' => $i + 1]])->all()
            );

            foreach ($links as $link) {
                $contentReq->assets()->create(['asset_type' => 'drive_link', 'asset_name' => 'Link referensi', 'drive_url' => $link]);
            }

            foreach ($request->file('files', []) as $file) {
                $contentReq->assets()->create([
                    'asset_type' => 'upload',
                    'asset_name' => Str::limit($file->getClientOriginalName(), 250, ''),
                    'file_path' => $file->storeAs('request-assets', Str::uuid() . '.' . $file->extension(), 'local'),
                    'file_size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ]);
            }

            return $contentReq;
        });

        // PRD R7: one queued email per active admin, so addresses are not exposed to each other. R18: plus a bell notification.
        $admins = User::where('role', 'admin')->where('is_active', true)->get();
        $admins->each(fn ($admin) => Mail::to($admin)->queue(new NewRequestSubmitted($contentReq)));
        Notification::send($admins, new NewRequestNotification($contentReq->loadMissing('user')));

        return redirect()->back()->with('success', __('Request berhasil dikirim!'));
    }

    public function index()
    {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $requests = ContentRequest::with('projectType')->visibleTo(Auth::id())->latest()->get();
        return \Inertia\Inertia::render('PageUser/MyRequests', ['requests' => $requests]);
    }

    public function show($id)
    {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $request = ContentRequest::with(['content.pic', 'assets', 'projectType', 'platforms'])->visibleTo(Auth::id())->findOrFail($id);
        return \Inertia\Inertia::render('PageUser/RequestDetail', ['req' => $request]);
    }

    // Uploaded files live in private storage; only admin, the requester and the assigned PIC may open them (PRD R6)
    public function file(Asset $asset)
    {
        abort_unless($asset->asset_type === 'upload' && $asset->file_path, 404);

        $user = Auth::user();
        abort_unless($user->role === 'admin' || ContentRequest::visibleTo($user->id)->whereKey($asset->request_id)->exists(), 404);

        return Storage::disk('local')->response($asset->file_path, $asset->asset_name, ['X-Content-Type-Options' => 'nosniff']);
    }
}
