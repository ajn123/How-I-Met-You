<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();

        // Super-Admin allows access to any permissions
        Gate::before(function ($user, $ability) {
            if ($user->hasRole('Super-Admin')) {
                return true;
            }
        });
    }
}
