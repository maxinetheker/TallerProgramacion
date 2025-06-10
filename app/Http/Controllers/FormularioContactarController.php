<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class FormularioContactarController extends Controller
{
    //
    public function Registrar(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'email' => 'required|email',
            'telefono' => 'required',
            'curso' => 'required',
        ], [
            'nombre.required' => 'El nombre es obligatorio',
            'email.required' => 'El email es obligatorio',
            'email.email' => 'El email no es válido',
            'telefono.required' => 'El teléfono es obligatorio',
            'curso.required' => 'El curso es obligatorio',
        ]);

        $contacto = new Contacto();
        $contacto->name = $request->nombre;
        $contacto->email = $request->email;
        $contacto->phone = $request->telefono;
        $contacto->curso = $request->curso;
        
        //validar si se guarda correctamente
        if (!$contacto->save()) {
            $errors = new MessageBag([
                'form' => 'Error al almacenar los datos en la base de datos',
            ]);
            return redirect()->back()->withErrors($errors);
        }
        return redirect()->back()->with('success', 'Datos guardados correctamente'); 
    }

}
