<?php

use App\Http\Controllers\UsuariosTableController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/usuarios', [UsuariosTableController::class, 'RutaUsuarios'])
->middleware(['auth', 'verified', 'admin'])->name('usuarios');

Route::post('historial/{id}/update', [UsuariosTableController::class, 'ActualizarHistorial'])->middleware(['auth','verified', 'admin'])->name(
    'historial.update');

Route::post('historial/{id}/delete', [UsuariosTableController::class, 'BorrarUsuario'])->middleware(['auth','verified', 'admin'])->name(
        'usuarios.delete');