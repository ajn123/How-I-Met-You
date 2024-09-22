<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{

    public function signup(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],

        ]);
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);
        $token = $user->createToken('apiToken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

        if ($request->wantsJson()) {
            return $request->json($response, 201);
        }

        return redirect()->intended(route('welcome', absolute: false));
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);


        $user = User::where('email', $request->email)->first();

        if (auth()->attempt($credentials)) {
            $token = $user->createToken('apiToken')->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token
            ];
            $request->session()->regenerate();
            return redirect()->intended(route('welcome', absolute: false));
        }
        return redirect('/login')->withErrors(['email' => 'Invalid Login Credentials']);
    }

    public function logout(Request $request)
    {
        if (auth()->check()) {
            auth()->user()->tokens()->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        if($request->wantsJson()) {
            return response(['message' => 'Logged out'], 200);
        }

        return redirect()->intended(route('welcome', absolute: false));
    }
}
