<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\Event;
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

        Event::factory()->forEachSequence(
            ...Collection::times(250, function () use ($users) {
                return ['user_id' => $users->random()];
            })
        )->create();
    }
}
