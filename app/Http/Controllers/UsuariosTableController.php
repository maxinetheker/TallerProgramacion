<?php

namespace App\Http\Controllers;

use App\Models\Historial;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosTableController extends Controller
{
    //
    public function RutaUsuarios(){
        $usuarios = User::all();
        $historial = Historial::all();
        return Inertia::render('Usuarios/Main'
    , [
       'usuarios' => $usuarios,
       'historial' => $historial]);
    }

    public function ActualizarHistorial(Request $request, $id){
        $usuarioActual = auth()->user()->usuario;
        $permisos = $request->permisos;
        $estado = $request->estado;
        $user = User::find($id);
        $user->permisos = $permisos;
        $user->save();
        $historial = Historial::where('id_usuario', $id)->first();
        $historial->estado = $estado;
        $historial->modificado_por = $usuarioActual;
        $historial->fec_modificacion= now()->toDateString();
        $historial->hora_modificacion = now()->toTimeString();
        $historial->save();
        return redirect()->back();
    }

    public function BorrarUsuario(Request $request, $id) {
        $user = User::find($id);
        $historial = Historial::where('id_usuario', $id)->first();
        $historial->eliminado_por = auth()->user()->usuario;
        $historial->fec_eliminacion = now()->toDateString();
        $historial->hora_eliminacion = now()->toTimeString();
        $historial->estado = '0';
        $historial->save();
        return redirect()->back();
    }
}
