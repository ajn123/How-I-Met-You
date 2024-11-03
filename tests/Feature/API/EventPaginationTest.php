<?php

use App\Models\Event;
use Illuminate\Testing\Fluent\AssertableJson;

beforeEach(function () {
    Event::factory()->count(1000)->create();
});

test('pagination works on first page', function () {
    $response = $this->get('/api/events');
    $response->assertJson(fn (AssertableJson $json) => $json->has('data', Event::PAGINATION_SIZE)->etc());

    $response->assertJson(fn (AssertableJson $json) => $json->has('current_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->where('current_page', 1)->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('last_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('per_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('total')->etc());
});

test('pagination works on second page', function () {
    $response = $this->get('/api/events?page=2');
    $response->assertJson(fn (AssertableJson $json) => $json->has('data', Event::PAGINATION_SIZE)->etc());

    $response->assertJson(fn (AssertableJson $json) => $json->has('current_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->where('current_page', 2)->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('last_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('per_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('total')->etc());
});

test('pagination works on third page', function () {
    $response = $this->get('/api/events?page=3');
    $response->assertJson(fn (AssertableJson $json) => $json->has('data', Event::PAGINATION_SIZE)->etc());

    $response->assertJson(fn (AssertableJson $json) => $json->has('current_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->where('current_page', 3)->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('last_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('per_page')->etc());
    $response->assertJson(fn (AssertableJson $json) => $json->has('total')->etc());
});

test('separate pages return different events', function () {
    \App\Models\Event::factory()->count(30)->create();
    $response1 = $this->get('/api/events?page=1');
    $response2 = $this->get('/api/events?page=2');

    $response1->assertJson(fn (AssertableJson $json) => $json->has('data', Event::PAGINATION_SIZE)->etc());
    $response2->assertJson(fn (AssertableJson $json) => $json->has('data', Event::PAGINATION_SIZE)->etc());
    foreach ($response1->json('data') as $event1) {
        foreach ($response2->json('data') as $event2) {
            $this->assertNotEquals($event1, $event2);
        }
    }
});
