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
        Schema::table('coverages', function (Blueprint $table) {
            $table->time('time')->nullable();
            $table->foreignId('pic_id')->nullable()->constrained('users_simaco')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coverages', function (Blueprint $table) {
            //
        });
    }
};
