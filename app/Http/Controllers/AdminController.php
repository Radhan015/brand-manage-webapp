<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContentRequest;
use App\Models\User;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $requests = ContentRequest::with(['user', 'content', 'projectType'])
            ->whereDoesntHave('content')
            ->orWhereHas('content', function ($q) use ($userId) {
                $q->where('pic_id', $userId);
            })
            ->latest()->get();

        $coverages = \App\Models\Coverage::with('pic')
            ->whereNull('pic_id')
            ->orWhere('pic_id', $userId)
            ->orderBy('date', 'asc')->get();

        return Inertia::render('PageAdmin/Dashboard', [
            'requests' => $requests,
            'coverages' => $coverages
        ]);
    }

    // PRD R8: everything with a date, turned into calendar entries on the client
    public function calendar()
    {
        return Inertia::render('PageAdmin/Kalender', [
            // shortcut: loads every non-rejected request at once; filter by month server-side when there are thousands
            'requests' => ContentRequest::with(['content:id,request_id,deadline,coverage_date', 'projectType:id,name'])
                ->where('status', '!=', 'rejected')
                ->get(['id', 'event_name', 'status', 'project_type_id', 'content_type', 'event_start_date', 'event_end_date',
                    'series_start_date', 'series_end_date', 'content_deadline']),
            'coverages' => \App\Models\Coverage::with('pic:id,name')->get(['id', 'name', 'date', 'time', 'pic_id']),
        ]);
    }

    public function manajemenKonten()
    {
        $projects = ContentRequest::with(['user', 'content'])->orderBy('created_at', 'desc')->get();
        $users = User::whereIn('role', ['staff', 'admin'])->get(['id', 'name', 'email', 'role', 'is_active']);
        $coverages = \App\Models\Coverage::with('pic')->orderBy('date', 'asc')->get();

        return Inertia::render('PageAdmin/ManajemenKonten', [
            'projects' => $projects,
            'users' => $users,
            'coverages' => $coverages
        ]);
    }

    public function editTemplate($id)
    {
        $template = \App\Models\Template::findOrFail($id);
        return Inertia::render('PageAdmin/EditTemplate', ['template' => $template]);
    }

    public function updateTemplate(Request $request, $id)
    {
        $request->validate([
            'template_name' => 'required|string',
            'template_type' => 'required|string',
            'template_url' => 'required|url',
            'description' => 'nullable|string'
        ]);

        \App\Models\Template::findOrFail($id)->update($request->all());
        return redirect()->route('admin.asset')->with('success', __('Tautan berhasil diperbarui.'));
    }

    public function storeTemplate(Request $request)
    {
        $request->validate([
            'template_name' => 'required|string',
            'template_type' => 'required|string',
            'template_url' => 'required|url',
            'description' => 'nullable|string'
        ]);

        \App\Models\Template::create($request->all());
        return redirect()->route('admin.asset')->with('success', __('Tautan baru berhasil ditambahkan.'));
    }

    public function destroyTemplate($id)
    {
        \App\Models\Template::findOrFail($id)->delete();
        return redirect()->back()->with('success', __('Tautan berhasil dihapus.'));
    }

    public function assignPIC(Request $request, $id)
    {
        $request->validate([
            'pic_id' => ['required', $this->picRule()],
            'deadline' => 'required|date',
            'template_id' => 'nullable|integer',
            'coverage_date' => 'nullable|date',
            'content_name' => 'nullable|string'
        ]);

        $contentReq = ContentRequest::findOrFail($id);
        
        \App\Models\Content::updateOrCreate(
            ['request_id' => $id],
            [
                'pic_id' => $request->pic_id,
                'deadline' => $request->deadline,
                'template_id' => $request->template_id,
                'coverage_date' => $request->coverage_date,
                'content_name' => $request->content_name ?: $contentReq->event_name,
                'content_description' => $contentReq->description,
            ]
        );

        $contentReq->update(['status' => 'in_progress']);
        $this->notifyPic($contentReq, (int) $request->pic_id);

        return redirect()->back()->with('success', __('PIC ditugaskan, status berubah menjadi Berjalan.'));
    }

    // PRD R18: the new PIC gets a bell notification, unless the admin assigned themselves
    private function notifyPic(ContentRequest $contentReq, int $picId): void
    {
        if ($picId !== auth()->id()) {
            User::find($picId)?->notify(new \App\Notifications\TaskAssignedNotification($contentReq->loadMissing('user')));
        }
    }

    // Reassign only: keeps deadline, template, coverage date and status untouched (unlike assignPIC)
    public function changePIC(Request $request, $id)
    {
        $request->validate(['pic_id' => ['required', $this->picRule()]]);

        $content = \App\Models\Content::where('request_id', $id)->firstOrFail();
        $changed = (int) $content->pic_id !== (int) $request->pic_id;
        $content->update(['pic_id' => $request->pic_id]);
        if ($changed) {
            $this->notifyPic(ContentRequest::findOrFail($id), (int) $request->pic_id);
        }

        return redirect()->back()->with('success', __('PIC berhasil diganti.'));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'output_url' => 'nullable|url',
            'reject_reason' => 'nullable|string'
        ]);

        $contentReq = ContentRequest::findOrFail($id);
        $contentReq->update([
            'status' => $request->status,
            'reject_reason' => $request->reject_reason
        ]);

        if ($request->output_url) {
            \App\Models\Content::where('request_id', $id)->update(['output_url' => $request->output_url]);
        }

        return redirect()->back()->with('success', __('Status berhasil diperbarui.'));
    }
    public function masterStaf()
    {
        return Inertia::render('PageAdmin/MasterStaf', [
            'users' => User::orderBy('name')->get(['id', 'name', 'email', 'role', 'is_active']),
        ]);
    }

    public function updateStaf(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => 'required|in:user,staff,admin',
            'is_active' => 'required|boolean',
        ]);

        if ($user->id === auth()->id() && ($data['role'] !== 'admin' || ! $data['is_active'])) {
            return redirect()->back()->with('error', __('Anda tidak bisa menurunkan role atau menonaktifkan akun sendiri.'));
        }

        $user->update($data);
        return redirect()->back()->with('success', __('Data staf :name diperbarui.', ['name' => $user->name]));
    }

    private const MASTER_MODELS = [
        'project-types' => \App\Models\ProjectType::class,
        'platforms' => \App\Models\Platform::class,
    ];

    public function masterData()
    {
        return Inertia::render('PageAdmin/MasterData', [
            'projectTypes' => \App\Models\ProjectType::orderBy('name')->get(['id', 'name', 'description', 'is_active']),
            'platforms' => \App\Models\Platform::orderBy('name')->get(['id', 'name', 'is_active']),
        ]);
    }

    // Create (no $id) or update one project type / platform. No hard delete: rows are referenced by old requests, so they get deactivated instead.
    public function saveMaster(Request $request, string $kind, ?int $id = null)
    {
        $model = self::MASTER_MODELS[$kind] ?? abort(404);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique((new $model)->getTable())->ignore($id)],
            'description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ], ['name.unique' => __('Nama ini sudah ada.')]);

        if ($kind === 'platforms') {
            unset($data['description']);
        }

        $id ? $model::findOrFail($id)->update($data) : $model::create($data);

        return redirect()->back()->with('success', __('Data ":name" disimpan.', ['name' => $data['name']]));
    }

    // PRD R10: PIC may only be an active staff/admin
    private function picRule()
    {
        return Rule::exists('users_simaco', 'id')->whereIn('role', ['staff', 'admin'])->where('is_active', true);
    }

    public function storeCoverage(Request $request)
    {
        $request->validate(['name' => 'required|string', 'date' => 'required|date', 'pic_id' => ['nullable', $this->picRule()]]);
        
        $data = $request->only('name', 'date', 'time', 'pic_id');
        if (empty($data['time'])) $data['time'] = null;
        if (empty($data['pic_id'])) $data['pic_id'] = null;
        
        \App\Models\Coverage::create($data);
        return redirect()->back();
    }

    public function updateCoverage(Request $request, $id)
    {
        $request->validate(['name' => 'required|string', 'date' => 'required|date', 'pic_id' => ['nullable', $this->picRule()]]);
        
        $data = $request->only('name', 'date', 'time', 'pic_id');
        if (empty($data['time'])) $data['time'] = null;
        if (empty($data['pic_id'])) $data['pic_id'] = null;

        \App\Models\Coverage::findOrFail($id)->update($data);
        return redirect()->back();
    }

    public function destroyCoverage($id)
    {
        \App\Models\Coverage::findOrFail($id)->delete();
        return redirect()->back()->with('success', __('Jadwal liputan berhasil dihapus.'));
    }
}
