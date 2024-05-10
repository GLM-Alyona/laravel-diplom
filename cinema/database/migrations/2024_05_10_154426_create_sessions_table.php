<?php

use App\Models\Halls;
use App\Models\Movies;
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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Movies::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Halls::class)->constrained()->onDelete('cascade');
            $table->time('sessionStart');
            $table->time('sessionEnd');
            $table->smallInteger('duration');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
