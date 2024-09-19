<?php

beforeEach(function () {
    $this->event = \App\Models\Event::factory()->create();
});


test('events have a name', function () {

    expect($this->event->name)->toBeString();
});

test('events have a description', function () {
    $event = new \App\Models\Event;

    expect($this->event->description)->toBeString();
});

test('events have a date', function () {
    $event = new \App\Models\Event;

    expect($this->event->date)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});

test('events have a user', function () {
    $event = new \App\Models\Event;

    expect($this->event->user)->toBeInstanceOf(\App\Models\User::class);
});
