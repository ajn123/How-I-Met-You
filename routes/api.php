<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('events', App\Http\Controllers\EventsController::class);
});
