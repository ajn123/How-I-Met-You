<?php

use App\Models\User;


test('can signup', function () {
    $response = $this->post('/api/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response->assertRedirect('/');
});

test('can not signup with duplicate email', function () {
    $response = $this->post('/api/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response = $this->post('/api/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('email');
    $response->assertRedirect('/');
});


test('can signup no password confirmation', function () {
    $response = $this->post('/api/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('password');
});


test('can signup wrong password confirmation', function () {
    $response = $this->post('/api/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('password');
});


test('can login', function () {
    $user = User::factory()->create();
    $response = $this->post('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertStatus(201);
    $response->assertRedirect('/');
});



test('can logout', function () {
    $user = User::factory()->create();

    $this->startSession();
    $this->actingAs($user);
    $response = $this->post('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);
    $response = $this->post('/api/logout');
    $response->assertStatus(200);
});
