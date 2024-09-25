<?php

use App\Models\User;


beforeEach(function () {
   $this->user = User::factory()->create();
});

test('Can make request acting as user', function () {

    \Laravel\Sanctum\Sanctum::actingAs($this->user);
    $this->json('GET', '/api/events')
        ->assertStatus(200);
});

test('Can NOT make request', function () {
    $this->json('GET', '/api/events')
        ->assertStatus(401);
});

test('can use sanctum through bearer token to make request', function () {
    $this->withHeaders([
        'Authorization' => 'Bearer '.$this->user->createToken('apiToken')->plainTextToken,
    ])->json('GET', '/api/events')
        ->assertStatus(200);
});


test('can make requests without session', function () {

    $data = [
        'email' => $this->user->email,
        'password' => 'password',
    ];

    $response = $this->json('POST', '/api/tokens/create', $data);

    $response->assertStatus(200);
});

test('can make invalid requests without session', function () {

    $data = [
        'email' => $this->user->email,
        'password' => 'WRONG PASSWORD',
    ];

    $response = $this->json('POST', '/api/tokens/create', $data);

    $response->assertStatus(401);
});

test('can logout and destroy token', function () {

    \Laravel\Sanctum\Sanctum::actingAs($this->user);
    $response = $this->json('POST', '/api/tokens/destroy');

    $response->assertStatus(200);
});
