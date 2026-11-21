<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Not in PRD v1.1: airing period of a content series, agreed with the team lead on 2026-11-21.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->date('series_start_date')->nullable()->after('serial_name');
            $table->date('series_end_date')->nullable()->after('series_start_date');
        });
    }

    public function down(): void
    {
        Schema::table('requests', fn (Blueprint $table) => $table->dropColumn(['series_start_date', 'series_end_date']));
    }
};
