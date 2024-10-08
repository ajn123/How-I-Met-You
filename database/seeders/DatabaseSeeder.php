<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Tag;
use App\Models\Taggable;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::truncate();

        Event::where('id', '>', 0)->delete();
        Taggable::truncate();
        Tag::where('id', '>', 0)->delete();

        $user = User::factory()->has(Event::factory(10))->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(PermissionsUsersSeeder::class);

    }
}
