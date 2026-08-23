<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->unsignedBigInteger('template_id')->nullable();
            $table->unsignedBigInteger('pic_id')->nullable();
            $table->string('content_name');
            $table->text('content_description')->nullable();
            $table->date('deadline')->nullable();
            $table->text('revision_notes')->nullable();
            $table->string('output_url')->nullable();
            $table->timestamps();
            
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            // Assuming users table is the standard name
            $table->foreign('pic_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
