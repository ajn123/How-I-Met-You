<?php

use App\Models\User;

beforeEach(function () {
    $this->withoutMiddleware();
});

test('can signup', function () {
    $response = $this->post('/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response->assertStatus(302);
    $response->assertRedirect('/');
});

test('can not signup with duplicate email', function () {
    $response = $this->post('/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response = $this->post('/signup', [
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
    $response = $this->post('/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('password');
});

test('can signup wrong password confirmation', function () {
    $response = $this->post('/signup', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('password');
});

test('can login', function () {
    $user = User::factory()->create();


    $this->startSession();
    $response = $this->actingAs($user)->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertStatus(302);
});

test('can logout', function () {
    $user = User::factory()->create();

    $this->startSession();
    $this->actingAs($user);
    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);
    $response = $this->actingAs($user)->post('/logout');
    $response->assertStatus(302);
});
