<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// PRD Revisi v1.1 (R11). Guarded with hasColumn because some DBs were built by hand, not by migrations.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users_simaco', function (Blueprint $table) {
            if (! Schema::hasColumn('users_simaco', 'sso_id')) $table->string('sso_id')->nullable()->unique();
            if (! Schema::hasColumn('users_simaco', 'is_active')) $table->boolean('is_active')->default(true);
            if (! Schema::hasColumn('users_simaco', 'email_verified_at')) $table->timestamp('email_verified_at')->nullable();
            if (! Schema::hasColumn('users_simaco', 'remember_token')) $table->rememberToken();
            $table->string('password_hash')->nullable()->change();
            $table->string('role')->default('user')->change(); // hand-built DBs have enum('user','admin'), no room for 'staff'
        });

        Schema::create('project_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('request_platform', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained('requests')->cascadeOnDelete();
            $table->foreignId('platform_id')->constrained('platforms');
            $table->unsignedSmallInteger('order')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->unique(['request_id', 'platform_id']);
        });

        // requests: project_type (text) -> project_type_id (FK), keeping existing values as master data
        Schema::table('requests', function (Blueprint $table) {
            $table->foreignId('project_type_id')->nullable()->after('additional_notes')->constrained('project_types');
            $table->string('serial_name')->nullable()->after('content_type');
            if (! Schema::hasColumn('requests', 'deleted_at')) $table->softDeletes();
        });

        $now = now();
        DB::table('requests')->whereNotNull('project_type')->where('project_type', '!=', '')
            ->distinct()->pluck('project_type')
            ->each(fn ($name) => DB::table('project_types')->insertOrIgnore(['name' => $name, 'created_at' => $now, 'updated_at' => $now]));
        DB::statement('UPDATE requests SET project_type_id = (SELECT id FROM project_types WHERE project_types.name = requests.project_type)');

        Schema::table('requests', fn (Blueprint $table) => $table->dropColumn('project_type'));

        if (Schema::hasColumn('requests', 'deadline')) {
            Schema::table('requests', fn (Blueprint $table) => $table->renameColumn('deadline', 'content_deadline'));
        } else {
            Schema::table('requests', fn (Blueprint $table) => $table->date('content_deadline')->nullable()->after('event_end_date'));
        }

        Schema::table('requests', fn (Blueprint $table) => $table->string('content_type')->change()); // was an enum in hand-built DBs
        DB::table('requests')->where('content_type', 'sehari')->update(['content_type' => 'single']);
        DB::table('requests')->where('content_type', 'lebih_dari_sehari')->update(['content_type' => 'series']);

        Schema::table('contents', function (Blueprint $table) {
            if (! Schema::hasColumn('contents', 'deleted_at')) $table->softDeletes();
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->string('drive_url')->nullable()->change();
            $table->string('file_path')->nullable()->after('drive_url');
            $table->unsignedInteger('file_size')->nullable()->after('file_path');
            $table->string('mime_type')->nullable()->after('file_size');
            if (! Schema::hasColumn('assets', 'deleted_at')) $table->softDeletes();
        });
        DB::table('assets')->whereNull('asset_type')->update(['asset_type' => 'drive_link']);
    }

    public function down(): void
    {
        Schema::table('assets', fn (Blueprint $table) => $table->dropColumn(['file_path', 'file_size', 'mime_type']));

        DB::table('requests')->where('content_type', 'single')->update(['content_type' => 'sehari']);
        DB::table('requests')->where('content_type', 'series')->update(['content_type' => 'lebih_dari_sehari']);

        Schema::table('requests', function (Blueprint $table) {
            $table->renameColumn('content_deadline', 'deadline');
            $table->string('project_type')->nullable()->after('additional_notes');
        });
        DB::statement('UPDATE requests SET project_type = (SELECT name FROM project_types WHERE project_types.id = requests.project_type_id)');
        Schema::table('requests', function (Blueprint $table) {
            $table->dropConstrainedForeignId('project_type_id');
            $table->dropColumn('serial_name');
        });

        Schema::dropIfExists('request_platform');
        Schema::dropIfExists('platforms');
        Schema::dropIfExists('project_types');

        Schema::table('users_simaco', function (Blueprint $table) {
            $table->dropUnique(['sso_id']);
            $table->dropColumn(['sso_id', 'is_active']);
        });
    }
};
