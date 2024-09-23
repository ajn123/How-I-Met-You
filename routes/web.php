<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return \Inertia\Inertia::render('Welcome', []);
})->name('welcome');

Route::post('/signup', [App\Http\Controllers\AuthController::class, 'signup']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);

Route::inertia('/signup', 'SignUp')->name('signup');

Route::get('/login', function () {
    return \Inertia\Inertia::render('Login', []);
})->name('login');

Route::inertia('/about', 'About')->name('about');

Route::group(['middleware' => ['web']], function () {
    // your routes here
});
