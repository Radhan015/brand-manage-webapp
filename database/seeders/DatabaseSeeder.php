<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     * Real staff accounts are not seeded: they log in (later via SSO) and an admin sets their role in Master Data Staf.
     */
    public function run(): void
    {
        $this->call(MasterDataSeeder::class);

        // Never keep real passwords in the repo: take it from .env, or generate one and print it once.
        $password = env('SEED_DEFAULT_PASSWORD') ?: Str::random(16);

        User::updateOrCreate(
            ['email' => 'admin@simaco.com'],
            ['name' => 'Admin Branding', 'password_hash' => $password, 'role' => 'admin']
        );

        User::updateOrCreate(
            ['email' => 'user@telkomuniversity.ac.id'],
            ['name' => 'Mahasiswa / Dosen', 'password_hash' => $password, 'role' => 'user']
        );

        if (! env('SEED_DEFAULT_PASSWORD')) {
            $this->command?->warn("Password akun seed (admin@simaco.com & user@telkomuniversity.ac.id): {$password}");
        }
    }
}
