<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_location', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Event::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Location::class)->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_location');
    }
};
