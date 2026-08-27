<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContentRequest;
use App\Models\Asset;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'event_name' => 'required|string|max:255',
            'description' => 'required|string',
            'project_type' => 'required|string',
            'content_type' => 'required|in:sehari,lebih_dari_sehari',
            'event_start_date' => 'required|date|after_or_equal:' . now()->addDays(3)->toDateString(),
            'event_end_date' => 'required|date',
            'drive_url' => ['required', 'string'],
        ], [
            'event_start_date.after_or_equal' => 'Maaf, request tidak bisa dadakan. Tanggal (tenggat) minimal adalah H-3 (3 hari dari sekarang).',
        ]);

        $contentReq = ContentRequest::create([
            'user_id' => Auth::id() ?? 1,
            'event_name' => $request->event_name,
            'description' => $request->description,
            'project_type' => $request->project_type,
            'content_type' => $request->content_type,
            'event_start_date' => $request->event_start_date,
            'event_end_date' => $request->event_end_date,
            'theme_category_group' => $request->theme_category_group,
            'additional_notes' => $request->additional_notes,
            'status' => 'new_request',
        ]);

        Asset::create([
            'request_id' => $contentReq->id,
            'asset_name' => 'Media - ' . $request->event_name,
            'drive_url' => $request->drive_url,
        ]);

        return redirect()->back()->with('success', 'Request submitted!');
    }

    public function index()
    {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        
        $requests = ContentRequest::where('user_id', Auth::id())->latest()->get();
        return \Inertia\Inertia::render('PageUser/MyRequests', ['requests' => $requests]);
    }

    public function show($id)
    {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $request = ContentRequest::with('content', 'assets')->where('user_id', Auth::id())->findOrFail($id);
        return \Inertia\Inertia::render('PageUser/RequestDetail', ['req' => $request]);
    }
}
