<?php

use App\Enums\RolesEnum;
use App\Models\Event;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;
use Spatie\Permission\Models\Permission;

uses(Tests\TestCase::class)->in('Feature');

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->event = Event::factory()->withUser($this->user)->create();

    $this->event->tags()->attach(Tag::factory()->count(1)->create());
});

test('guest can retrieve all events with tags', function () {
    $user = User::factory()->has(Event::factory()->count(5))->create();
    $response = $this->actingAs($user)->get('/api/events');
    $response->assertOk();
    $response->assertJson(fn (AssertableJson $json) => $json->has('data', 6)->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->where('data.0.tags.0.name', $this->event->tags()->first()->name)->etc());
});

test('guest can retrieve single event', function () {
    $response = $this->actingAs($this->user)->get('/api/events/'.$this->event->id);
    $response->assertOk();
    $response->assertJson(fn (AssertableJson $json) => $json->where('name', $this->event->name)->where('description', $this->event->description)
        ->etc()
    );
});

test('user with permission can create event', function () {
    $this->assertCount(1, Event::all());
    Permission::create(['name' => \App\Enums\RolesEnum::CREATE_EVENTS]);
    $this->user->givePermissionTo(RolesEnum::CREATE_EVENTS);
    $data = [
        'name' => fake()->sentence,
        'description' => fake()->paragraph,
        'date' => fake()->date,
        'url' => fake()->url,
    ];
    $response = $this->actingAs($this->user)->post('/api/events', $data);
    $response->assertCreated();
    $this->assertCount(2, Event::all());
    $this->assertDatabaseHas('events', [
        'name' => $data['name'],
        'description' => $data['description'],
        'date' => $data['date'],
        'url' => $data['url'],
    ]);
});

test('user can NOT create event', function () {
    // The permission must exist for you to check against it
    Permission::create(['name' => \App\Enums\RolesEnum::CREATE_EVENTS]);
    $data = [
        'name' => fake()->sentence,
        'description' => fake()->paragraph,
        'date' => fake()->date,
        'user_id' => $this->user->id,
    ];
    $response = $this->actingAs($this->user)->post('/api/events', $data);
    $this->assertEquals(401, $response->getStatusCode());
    $this->assertDatabaseMissing('events', [
        'name' => $data['name'],
        'description' => $data['description'],
        'date' => $data['date'],
    ]);
});

test('user can update event', function () {
    $data = [
        'name' => fake()->sentence,
        'description' => fake()->paragraph(3),
    ];
    $response = $this->actingAs($this->user)->put('/api/events/'.$this->event->id, $data);
    $response->assertOk();
    $response->assertJson(fn (AssertableJson $json) => $json->where('name', $data['name'])
        ->where('description', $data['description'])->etc());
});

test('user can delete event', function () {
    Permission::create(['name' => \App\Enums\RolesEnum::DELETE_EVENTS]);
    $this->user->givePermissionTo(RolesEnum::DELETE_EVENTS);
    $this->assertDatabaseCount('events', 1);
    $response = $this->actingAs($this->user)->delete('/api/events/'.$this->event->id);
    $response->assertNoContent();
    $this->assertDatabaseCount('events', 0);
});

test('user can Not delete event because they don\'t have permission', function () {
    Permission::create(['name' => \App\Enums\RolesEnum::DELETE_EVENTS]);
    $this->assertDatabaseCount('events', 1);
    $response = $this->actingAs($this->user)->delete('/api/events/'.$this->event->id);
    $response->assertStatus(401);
    $this->assertDatabaseCount('events', 1);
});
