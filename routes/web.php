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

Route::get('/request-form', function () {
    return Inertia::render('PageUser/RequestForm');
});

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
});

Route::get('/dashboard', function () {
    return Inertia::render('PageAdmin/Dashboard');
})->name('dashboard');

Route::get('/asset', function () {
    return Inertia::render('PageAdmin/Asset');
})->name('asset');

Route::get('/tambah-tautan', function () {
    return Inertia::render('PageAdmin/TambahTautan');
})->name('tambah-tautan');

Route::get('/permintaan', function () {
    return Inertia::render('PageAdmin/Permintaan');
})->name('permintaan');

Route::get('/detail-permintaan', function () {
    return Inertia::render('PageAdmin/DetailPermintaan');
})->name('detail-permintaan');

Route::get('/manajemen-konten', function () {
    return Inertia::render('PageAdmin/ManajemenKonten');
})->name('manajemen-konten');

Route::get('/edit-template', function () {
    return Inertia::render('PageAdmin/EditTemplate');
})->name('edit-template');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
