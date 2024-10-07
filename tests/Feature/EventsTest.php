<?php

use App\Models\Event;
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

test('inFuture scope gets future events', function () {

    Event::where('id', '>', 0)->delete();

    Event::factory()->withUser()->count(1)->create([
        'date' => now()->addDay(),
    ]);

    Event::factory()->withUser()->count(1)->create([
        'date' => now()->subDay(),
    ]);
    $events = \App\Models\Event::inFuture()->get();
    $this->assertCount(1, $events);
})->repeat(12);
