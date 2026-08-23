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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('event_name');
            $table->text('description');
            $table->text('additional_notes')->nullable();
            $table->string('project_type');
            $table->string('content_type');
            $table->date('event_start_date');
            $table->date('event_end_date');
            $table->string('theme_category_group')->nullable();
            $table->string('priority')->nullable();
            $table->string('location')->nullable();
            $table->string('status')->default('new_request');
            $table->timestamps();
            
            // Assuming users table exists
            $table->foreign('user_id')->references('id')->on('users_simaco')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
