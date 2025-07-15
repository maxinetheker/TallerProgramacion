<?php

use App\Http\Controllers\CompraDeCursosController;
use App\Http\Controllers\ProfileController;
use App\Models\Contacto;
use App\Models\Cursos;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//PAGINA PRINCIPAL
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

//VER DASHBOARD DE USUARIOS
Route::get('/dashboard', function () {
    $contacto = Contacto::all();

    return Inertia::render('Dashboard', [
        'contacto' => $contacto,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

//VER PAGINA PARA COMPRAR CURSOS
Route::get('/cursos', function () {

    $cursos = Cursos::where('id_users', auth()->user()->id)->get();
    return Inertia::render('CursosPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'miscursos' => $cursos
    ]);
})->name('cursos');

//VER CURSOS DE USUARIO
Route::get('/mis-cursos', function () {
    return Inertia::render('MisCursos/Main');
})->middleware(['auth', 'verified'])->name('mis-cursos');

//PERFIL
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Carrito de Compras Curso
Route::get('/pasarela', function () {
    return Inertia::render('PasarelaDePago', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('pasarela');

Route::post('/pasarela/registro', [CompraDeCursosController::class, 'Registrar'])->middleware(['auth', 'verified'])->name('registrarcompra');

require __DIR__ . '/auth.php';
require __DIR__ . '/formularios.php';
