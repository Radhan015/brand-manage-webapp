<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContentRequest;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $requests = ContentRequest::with(['user', 'content'])->latest()->get();
        $coverages = \App\Models\Coverage::with('pic')->orderBy('date', 'asc')->get();
        return Inertia::render('PageAdmin/Dashboard', [
            'requests' => $requests,
            'coverages' => $coverages
        ]);
    }

    public function manajemenKonten()
    {
        $projects = ContentRequest::with(['user', 'content'])->orderBy('created_at', 'desc')->get();
        $users = \App\Models\User::all();
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
        return redirect()->route('admin.asset')->with('success', 'Update link berhasil');
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
        return redirect()->route('admin.asset')->with('success', 'Tautan baru berhasil ditambahkan');
    }

    public function destroyTemplate($id)
    {
        \App\Models\Template::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Link berhasil dihapus');
    }

    public function assignPIC(Request $request, $id)
    {
        $request->validate([
            'pic_id' => 'required|integer',
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

        return redirect()->back()->with('success', 'PIC Assigned and Status moved to In Progress');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'output_url' => 'nullable|url'
        ]);

        $contentReq = ContentRequest::findOrFail($id);
        $contentReq->update(['status' => $request->status]);

        if ($request->output_url) {
            \App\Models\Content::where('request_id', $id)->update(['output_url' => $request->output_url]);
        }

        return redirect()->back()->with('success', 'Status Updated');
    }
    public function storeCoverage(Request $request)
    {
        $request->validate(['name' => 'required|string', 'date' => 'required|date']);
        
        $data = $request->only('name', 'date', 'time', 'pic_id');
        if (empty($data['time'])) $data['time'] = null;
        if (empty($data['pic_id'])) $data['pic_id'] = null;
        
        \App\Models\Coverage::create($data);
        return redirect()->back();
    }

    public function updateCoverage(Request $request, $id)
    {
        $request->validate(['name' => 'required|string', 'date' => 'required|date']);
        
        $data = $request->only('name', 'date', 'time', 'pic_id');
        if (empty($data['time'])) $data['time'] = null;
        if (empty($data['pic_id'])) $data['pic_id'] = null;

        \App\Models\Coverage::findOrFail($id)->update($data);
        return redirect()->back();
    }

    public function destroyCoverage($id)
    {
        \App\Models\Coverage::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Jadwal liputan berhasil dihapus!');
    }
}
