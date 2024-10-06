<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TokenAuthController extends Controller
{
    public function register(Request $request)
    {
        $token = User::first()->createToken('my-app-token')->plainTextToken;

        return response()->json(['token' => $token], 200);

    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful'], 200);
    }
}
