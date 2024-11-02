<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\Event;
use App\Models\Location;
use App\Models\Social;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Role::where('id', '>', 0)->delete();
        Permission::where('id', '>', 0)->delete();

        // create permissions
        Permission::create(['name' => RolesEnum::CREATE_EVENTS]);
        Permission::create(['name' => RolesEnum::DELETE_EVENTS]);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'user']);

        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo(RolesEnum::CREATE_EVENTS);
        $role2->givePermissionTo(RolesEnum::DELETE_EVENTS);

        $role3 = Role::create(['name' => 'Super-Admin']);

        $user = User::factory()->create([
            'name' => 'Example User',
            'email' => 'tester@example.com',
        ]);
        $user->assignRole($role1);

        $user = User::factory()->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole($role2);

        $user = User::factory()->create([
            'name' => 'Example Super-Admin User',
            'email' => 'superadmin@example.com',
        ]);
        $user->assignRole($role3);

        $users = User::factory()->count(4)->create();

        Event::factory()->has(Location::factory())->forEachSequence(
            ...Collection::times(250, function () use ($users) {
                return [
                    'user_id' => $users->random(),
                    'image_url' => 'https://kicking-grass-touch-dc.s3.amazonaws.com/events/ACaUh06NFHBNDmw2kKJ696OM8xVEwOJgeSu7Jyqo.jpg',
                    'enabled' => true,
                ];
            })
        )->create();

        Tag::factory()->create([
            'name' => 'Free',
        ]);

        Tag::factory()->create([
            'name' => 'Outside',
        ]);

        Tag::factory()->create([
            'name' => 'Paid',
        ]);

        Tag::factory()->create([
            'name' => 'Active',
        ]);

        Tag::factory()->create([
            'name' => 'DC',
        ]);

        Tag::factory()->create([
            'name' => 'Maryland',
        ]);

        Tag::factory()->create([
            'name' => 'Virginia',
        ]);


        Event::all()->each(function (Event $event) {
            $event->tags()->sync(
                Tag::all()->random(2)->pluck('id')->toArray()
            );
            Social::factory()->count(rand(1, 3))->create(['event_id' => $event->id]);
        });
    }
}
