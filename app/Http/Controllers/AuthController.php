<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\SignUpUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignUpUserRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validatedData = $request->validated();
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);
        $token = $user->createToken('apiToken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        auth()->login($user);

        return redirect()->intended(route('welcome', absolute: false));
    }

    public function login(LoginUserRequest $request)
    {
        Log::debug("trying to login");
        if (auth()->attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('apiToken')->plainTextToken;

            auth()->login($user);

            Log::debug('User logged in', ['csrf_token' => csrf_token()]);
            session()->flash('message', 'Login successful');

            return redirect()->intended(route('welcome', absolute: false));
        }

        return redirect('/login')->withErrors(['email' => 'Invalid Login Credentials']);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        session()->invalidate();
        session()->regenerateToken();
        session()->flash('message', 'You have logged out.');

        return redirect()->intended(route('welcome', absolute: false));
    }
}
