<?php


use App\Models\Event;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

uses(Tests\TestCase::class)->in('Feature');

test('guest can retrieve all events', function () {
    Event::factory()->count(5)->create();
    $response = $this->get('/api/events');
    $response->assertOk();
    $response->assertJsonCount(5);
});

test('guest can retrieve single event', function () {
    $event = Event::factory()->create();
    $response = $this->get('/api/events/' . $event->id);
    $response->assertOk();
    $response->assertJson(fn (AssertableJson $json) =>
        $json->where('name', $event->name)->where('description', $event->description)
            ->etc()
    );
});

test('user can create event', function () {
    $user = User::factory()->create();
    $data = [
        'name' => fake()->sentence,
        'description' => fake()->paragraph,
        'date' => fake()->date,
        'user_id' => $user->id
    ];
    $response = $this->post('/api/events', $data);
    $response->assertCreated();
    $this->assertCount(1, Event::all());
    $this->assertDatabaseHas('events', [
        'name' => $data['name'],
        'description' => $data['description'],
        'date' => $data['date']
    ]);
});

test('user can update event', function () {
    $this->actingAs(User::factory()->create());
    $event = Event::factory()->create();
    $data = [
        'name' => fake()->sentence,
        'description' => fake()->paragraph
    ];
    $response = $this->put('/api/events/' . $event->id, $data);
    $response->assertOk();
    $response->assertJson(fn(AssertableJson $json) => $json->where('name', $data['name'])
        ->where('description', $data['description'])->etc());
});

test('user can delete event', function () {
    $this->actingAs(User::factory()->create());
    $event = Event::factory()->create();
    $this->assertDatabaseCount('events', 1);
    $response = $this->delete('/api/events/' . $event->id);
    $response->assertNoContent();
    $this->assertDatabaseCount('events', 0);
});
