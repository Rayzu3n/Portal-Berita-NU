<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ResidentController;
use App\Http\Controllers\PublicNewsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicNewsController::class, 'home'])->name('home');
Route::get('/berita', [PublicNewsController::class, 'index'])->name('public.news.index');
Route::get('/berita/{news:slug}', [PublicNewsController::class, 'show'])->name('public.news.show');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])
        ->name('admin.dashboard');

    Route::resource('berita', NewsController::class);

    Route::resource('warga', ResidentController::class);
});
