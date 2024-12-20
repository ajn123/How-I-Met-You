<?php

use Illuminate\Support\Facades\Route;

Route::get('/tokens/create', [App\Http\Controllers\TokenAuthController::class, 'register']);

Route::post('/tokens/destroy', [App\Http\Controllers\TokenAuthController::class, 'destroy']);
Route::apiResource('events', App\Http\Controllers\EventsController::class);
Route::apiResource('tags', \App\Http\Controllers\TagsController::class)->only('index');

Route::post('/events/image', [App\Http\Controllers\EventsController::class, 'uploadImage']);
