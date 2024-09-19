<?php

test('a user has many events', function () {
    $user = new \App\Models\User;

    expect($user->events())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
});


test('a user has many events and all events belong to the user', function () {
    $user = \App\Models\User::factory()->create();
    $events = \App\Models\Event::factory()->count(3)->create(['user_id' => $user->id]);

    foreach ($events as $event) {
        expect($event->user_id)->toEqual($user->id);
    }
});
