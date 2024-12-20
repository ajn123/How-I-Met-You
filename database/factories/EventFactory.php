<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'description' => fake()->text,
            'date' => fake()->dateTimeBetween('-1 year', '+2 year'),
            'url' => fake()->url,
            // Because we create users with events, this was creating uncessary users, uncomment at your own risk
            // 'user_id' => User::factory()->create(),
        ];
    }

    public function enabled(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'enabled' => true,
            ];
        });
    }

    public function futureDates(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'date' => fake()->dateTimeBetween('+1 year', '+2 year'),
            ];
        });
    }

    public function withUser($user = null): Factory
    {
        return $this->state(function (array $attributes) use ($user) {
            return [
                'user_id' => $user ?? User::factory()->create(),
            ];
        });
    }
}
