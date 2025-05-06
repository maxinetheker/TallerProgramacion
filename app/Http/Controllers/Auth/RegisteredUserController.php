<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Historial;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate(
            [
                'nombres' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:' . User::class,
                'usuario' => ['required', 'string', 'max:255', 'unique:' . User::class, 'alpha_dash'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ],
            [
                'nombres.required' => 'El campo nombres es obligatorio.',
                'apellidos.required' => 'El campo apellidos es obligatorio.',
                'email.required' => 'El campo correo electrónico es obligatorio.',
                'usuario.required' => 'El campo usuario es obligatorio.',
                'email.email' => 'El campo correo electrónico debe ser una dirección de correo válida.',
                'password.required' => 'El campo contraseña es obligatorio.',
                'password.confirmed' => 'Las contraseñas no coinciden.',
                'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
                'password.regex' => 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                'password_confirmation.required' => 'El campo confirmar contraseña es obligatorio.',
                'usuario.alpha_dash' => 'El campo usuario solo puede contener letras, números y guiones bajos.',
                'usuario.unique' => 'El usuario ya está en uso.',
                'email.unique' => 'El correo electrónico ya está en uso.',
                'nombres.max' => 'El campo nombres no puede contener más de 255 caracteres.',
                'apellidos.max' => 'El campo apellidos no puede contener más de 255 caracteres.',
            ]
        );

        $codUsuario = "UTP-" . str_pad(mt_rand(100000000, 999999999), 8, '0', STR_PAD_LEFT);
        if ($request->usuario == 'administrador') {
            $permisos = 'Administrador';
        } else {
            $permisos = 'UsuarioNormal';
        }


        $ItemAi = User::max('ItemAi') + 1;
        $user = User::create([
            'ItemAi' => $ItemAi,
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'codUsuario' => $codUsuario,
            'email' => $request->email,
            'usuario' => $request->usuario,
            'password' => Hash::make($request->password),
            'permisos' => $permisos,
        ]);

        $id = $user->id;
        $historial = new Historial();

        $historial->id_usuario = $user->id; // Asumiendo que $user es el usuario recién creado
        $historial->estado = 'Activo'; // Estado inicial
        $historial->enlinea = 1; // Al crearlo está en sesión (o 0 si quieres que esté fuera)
        $historial->num_ingresos = 1; // Primer ingreso

        $fechaActual = now()->toDateString(); // Fecha actual
        $horaActual = now()->toTimeString();  // Hora actual

        $historial->fec_creacion = $fechaActual;
        $historial->hora_creacion = $horaActual;
        $historial->fec_ultimo_acceso = $fechaActual;
        $historial->hora_ultimo_acceso = $horaActual;

        $historial->creado_por = $user->usuario; // Quien crea puede ser el mismo usuario

        $historial->save();

        event(new Registered($user));


        Auth::login($user);




        return redirect(route('dashboard', absolute: false));
    }
}
