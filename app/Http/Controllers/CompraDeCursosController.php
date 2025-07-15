<?php

namespace App\Http\Controllers;

use App\Models\Cursos;
use Illuminate\Http\Request;

class CompraDeCursosController extends Controller
{
    //
    public function Registrar(Request $request)
    {
        $carro = $request->input('carro');
        foreach ($carro as $item) {
            Cursos::create([
                'id_users' => auth()->user()->id,         // usuario autenticado
                'curso'    => $item['id'],    // o puedes usar $item['id'] si prefieres guardar ID del curso original
            ]);
        }

        return back()->with('success', 'Pago registrado correctamente');
    }
}
