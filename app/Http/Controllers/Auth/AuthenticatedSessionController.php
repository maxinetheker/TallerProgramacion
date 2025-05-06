<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Historial;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException as ValidationValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $request->authenticate();

        $request->session()->regenerate();
        $user = Auth::user();
        $historial = Historial::where('id_usuario',$user->id)->first();
        if($historial->estado == "0") {
            $historial->enlinea = 0;
            $historial->save();
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            throw ValidationException::withMessages([
                /*  'usuario' => trans('auth.failed'), */
                'usuario' => 'El usuario se encuentra inactivo'
            ]);
            
        }
        $historial->fec_ultimo_acceso = now()->toDateString();
        $historial->num_ingresos++;
        $historial->hora_ultimo_acceso = now()->toTimeString();
        $historial->enlinea = 1;
        $historial->save();
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $historial = Historial::where('id_usuario',$user->id)->first();
        $historial->enlinea = 0;
        $historial->save();
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
