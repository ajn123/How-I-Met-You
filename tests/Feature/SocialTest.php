<?php

test('can create social type', function () {

    \App\Models\Social::create([
        'type' => \App\Enums\SocialMediaTypes::FACEBOOK,
        'url' => 'https://facebook.com',
        'event_id' => \App\Models\Event::factory()->create()->id,
    ]);

    $this->assertDatabaseHas('socials', [
        'type' => \App\Enums\SocialMediaTypes::FACEBOOK,
        'url' => 'https://facebook.com',
    ]);
});
