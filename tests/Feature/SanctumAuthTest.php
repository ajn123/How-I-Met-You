<?php

use App\Models\User;

test('Can make request acting as user', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->json('GET', '/api/events')
        ->assertStatus(200);
});

test('Can NOT make request', function () {
    $this->json('GET', '/api/events')
        ->assertStatus(401);
});

test('can use sanctum through bearer token to make request', function () {
    $user = User::factory()->create();
    $this->withHeaders([
        'Authorization' => 'Bearer '.$user->createToken('apiToken')->plainTextToken,
    ])->json('GET', '/api/events')
        ->assertStatus(200);
});
