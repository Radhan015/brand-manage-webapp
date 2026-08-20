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

Route::middleware(['auth'])->group(function () {
    Route::get('/request-form', function () {
        return Inertia::render('PageUser/RequestForm');
    })->name('request-form');

    Route::post('/request-form', [\App\Http\Controllers\RequestController::class, 'store']);

    Route::get('/my-requests', [\App\Http\Controllers\RequestController::class, 'index'])->name('my-requests');
    Route::get('/my-requests/{id}', [\App\Http\Controllers\RequestController::class, 'show'])->name('request-detail');
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
        $requests = \App\Models\ContentRequest::with('user')->latest()->get();
        return Inertia::render('PageAdmin/Permintaan', ['requests' => $requests]);
    })->name('admin.permintaan');

    Route::get('/detail-permintaan/{id}', function ($id) {
        $requestData = \App\Models\ContentRequest::with(['user', 'assets'])->findOrFail($id);
        return Inertia::render('PageAdmin/DetailPermintaan', [
            'requestData' => $requestData, 
            'users' => \App\Models\User::all(),
            'templates' => \App\Models\Template::all()
        ]);
    })->name('admin.detail-permintaan');

    Route::get('/manajemen-konten', [\App\Http\Controllers\AdminController::class, 'manajemenKonten'])->name('admin.manajemen-konten');

    Route::get('/edit-template/{id}', [\App\Http\Controllers\AdminController::class, 'editTemplate'])->name('admin.edit-template');
    Route::put('/template/{id}', [\App\Http\Controllers\AdminController::class, 'updateTemplate'])->name('admin.template.update');
    Route::delete('/template/{id}', [\App\Http\Controllers\AdminController::class, 'destroyTemplate'])->name('admin.template.destroy');
    Route::post('/template', [\App\Http\Controllers\AdminController::class, 'storeTemplate'])->name('admin.template.store');

    Route::post('/request/{id}/assign', [\App\Http\Controllers\AdminController::class, 'assignPIC']);
    Route::post('/request/{id}/status', [\App\Http\Controllers\AdminController::class, 'updateStatus']);

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
