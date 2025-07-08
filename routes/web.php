<?php

use App\Http\Controllers\ProfileController;
use App\Models\Contacto;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $contacto = Contacto::all();

    return Inertia::render('Dashboard', [
        'contacto' => $contacto,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cursos', function () {
        return Inertia::render('CursosPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('cursos');


Route::get('/mis-cursos', function () {
    return Inertia::render('MisCursos/Main');
})->middleware(['auth', 'verified'])->name('mis-cursos');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/formularios.php';