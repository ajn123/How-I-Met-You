<?php

use App\Models\Event;
use App\Models\Tag;
use App\Models\User;

test('create tag', function () {

    Tag::create([
        'name' => 'test',
    ]);

    $this->assertDatabaseHas('tags', [
        'name' => 'test',
    ]);
});


test('can\'t create multiple tags of the same name', function () {

    Tag::create([
        'name' => 'test',
    ]);

    Tag::create([
        'name' => 'test',
    ]);

    $this->assertDatabaseHasNot('tags', [
        'name' => 'test',
    ]);
})->throws(\Illuminate\Database\UniqueConstraintViolationException::class);


test('tag has many events', function () {
    $tag = Tag::factory()->create();
    $event = Event::factory()->withUser(User::factory()->create())->create();
    $event->tags()->attach($tag);
    expect($tag->events())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\MorphToMany::class);
});
