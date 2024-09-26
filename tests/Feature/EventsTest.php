<?php

use App\Models\Tag;

beforeEach(function () {
    $user = \App\Models\User::factory()->create();
    $this->event = \App\Models\Event::factory()->withUser()->create();
    $this->event->tags()->attach(Tag::factory()->count(3)->create());
});

test('events have a name', function () {

    expect($this->event->name)->toBeString();
});

test('events have a description', function () {

    expect($this->event->description)->toBeString();
});

test('events have a date', function () {

    expect($this->event->date)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});

test('events have a user', function () {

    expect($this->event->user)->toBeInstanceOf(\App\Models\User::class);
});

test('events can have many tags', function () {

    expect($this->event->tags)->toBeInstanceOf(\Illuminate\Database\Eloquent\Collection::class)
        ->and($this->event->tags->count($this->event->tags))->toBe(3);
});
