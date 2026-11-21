<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('PageUser/Homepage', [
        'canLogin' => Route::has('Login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/locale/{locale}', function (string $locale) {
    session(['locale' => $locale]);
    return redirect()->back();
})->whereIn('locale', \App\Http\Middleware\SetLocale::LOCALES)->name('locale');

Route::middleware(['auth'])->group(function () {
    // Breeze's confirm-password and email-verification controllers redirect to route('dashboard'); send users on by role
    Route::get('/dashboard', fn () => redirect(auth()->user()->role === 'admin' ? route('admin.dashboard') : '/'))->name('dashboard');

    // PRD R18: bell notifications (admins and staff). Users can only open their own notifications.
    Route::post('/notifications/read-all', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return redirect()->back();
    })->name('notifications.read-all');
    Route::post('/notifications/{id}', function (string $id) {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        $requestId = $notification->data['request_id'] ?? null;
        if (! $requestId) {
            return redirect()->back();
        }
        return redirect()->route(auth()->user()->role === 'admin' ? 'admin.detail-permintaan' : 'request-detail', $requestId);
    })->name('notifications.open');

    Route::get('/request-form', function () {
        if (\Illuminate\Support\Facades\Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return Inertia::render('PageUser/RequestForm', [
            'projectTypes' => \App\Models\ProjectType::where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'platforms' => \App\Models\Platform::where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'rules' => \Illuminate\Support\Arr::only(config('simaco'), ['event_name_max', 'min_lead_days', 'upload_max_kb', 'upload_max_files']),
        ]);
    })->name('request-form');

    Route::post('/request-form', [\App\Http\Controllers\RequestController::class, 'store']);

    Route::get('/my-requests', [\App\Http\Controllers\RequestController::class, 'index'])->name('my-requests');
    Route::get('/my-requests/{id}', [\App\Http\Controllers\RequestController::class, 'show'])->name('request-detail');
    Route::get('/assets/{asset}/file', [\App\Http\Controllers\RequestController::class, 'file'])->name('asset.file');
});

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('/asset', function () {
        return Inertia::render('PageAdmin/Asset', [
            'templatesData' => \App\Models\Template::latest()->get(),
            'kontenData' => \App\Models\Content::latest()->get()
        ]);
    })->name('admin.asset');

    Route::get('/tambah-tautan', function () {
        return Inertia::render('PageAdmin/TambahTautan');
    })->name('admin.tambah-tautan');

    Route::get('/permintaan', function () {
        $requests = \App\Models\ContentRequest::with(['user', 'projectType'])->latest()->get();
        return Inertia::render('PageAdmin/Permintaan', ['requests' => $requests]);
    })->name('admin.permintaan');

    Route::get('/detail-permintaan/{id}', function ($id) {
        $requestData = \App\Models\ContentRequest::with(['user', 'assets', 'projectType', 'platforms'])->findOrFail($id);
        return Inertia::render('PageAdmin/DetailPermintaan', [
            'requestData' => $requestData, 
            'users' => \App\Models\User::whereIn('role', ['staff', 'admin'])->where('is_active', true)->get(['id', 'name', 'role']),
            'templates' => \App\Models\Template::all()
        ]);
    })->name('admin.detail-permintaan');

    Route::get('/manajemen-konten', [\App\Http\Controllers\AdminController::class, 'manajemenKonten'])->name('admin.manajemen-konten');

    Route::get('/edit-template/{id}', [\App\Http\Controllers\AdminController::class, 'editTemplate'])->name('admin.edit-template');
    Route::put('/template/{id}', [\App\Http\Controllers\AdminController::class, 'updateTemplate'])->name('admin.template.update');
    Route::delete('/template/{id}', [\App\Http\Controllers\AdminController::class, 'destroyTemplate'])->name('admin.template.destroy');
    Route::post('/template', [\App\Http\Controllers\AdminController::class, 'storeTemplate'])->name('admin.template.store');

    Route::post('/request/{id}/assign', [\App\Http\Controllers\AdminController::class, 'assignPIC']);
    Route::post('/request/{id}/pic', [\App\Http\Controllers\AdminController::class, 'changePIC']);
    Route::post('/request/{id}/status', [\App\Http\Controllers\AdminController::class, 'updateStatus']);

    Route::get('/master-staf', [\App\Http\Controllers\AdminController::class, 'masterStaf'])->name('admin.master-staf');
    Route::put('/master-staf/{user}', [\App\Http\Controllers\AdminController::class, 'updateStaf'])->name('admin.master-staf.update');

    Route::get('/kalender',[\App\Http\Controllers\AdminController::class, 'calendar'])->name('admin.kalender');
    Route::get('/master-data',[\App\Http\Controllers\AdminController::class, 'masterData'])->name('admin.master-data');
    Route::post('/master-data/{kind}', [\App\Http\Controllers\AdminController::class, 'saveMaster'])->whereIn('kind', ['project-types', 'platforms']);
    Route::put('/master-data/{kind}/{id}', [\App\Http\Controllers\AdminController::class, 'saveMaster'])->whereIn('kind', ['project-types', 'platforms'])->whereNumber('id');

    // Coverages
    Route::post('/coverages', [\App\Http\Controllers\AdminController::class, 'storeCoverage']);
    Route::post('/coverages/{id}', [\App\Http\Controllers\AdminController::class, 'updateCoverage']); 
    Route::delete('/coverages/{id}', [\App\Http\Controllers\AdminController::class, 'destroyCoverage']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
