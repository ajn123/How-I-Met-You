<?php

test('example', function () {
    \App\Models\Location::create([
        'name' => 'test',
        'latitude' => 0,
        'longitude' => 0,
        'location' => [
            'lat' => 0,
            'lng' => 0,
        ],
    ]);

    $this->assertDatabaseHas('locations', [
        'latitude' => 0,
        'longitude' => 0,
    ]);
});
