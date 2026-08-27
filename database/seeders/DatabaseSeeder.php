<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@simaco.com'],
            [
                'name' => 'Admin Branding',
                'password_hash' => bcrypt('admin123'),
                'role' => 'admin',
                'phone_number' => '081234567890',
            ]
        );

        // Regular User / Pemohon
        User::updateOrCreate(
            ['email' => 'user@telkomuniversity.ac.id'],
            [
                'name' => 'Mahasiswa / Dosen',
                'password_hash' => bcrypt('user123'),
                'role' => 'user',
                'phone_number' => '089876543210',
            ]
        );

        User::updateOrCreate(
            ['email' => 'yeyenthamrie@gmail.com'],
            [
                'name' => 'Yeyen Hamidah',
                'password_hash' => bcrypt('Alvin150214!'),
                'role' => 'admin',
                'phone_number' => '085711945328',
            ]
        );

        User::updateOrCreate(
            ['email' => 'mharsyasadin656@gmail.com'],
            [
                'name' => 'Harsya Sadin',
                'password_hash' => bcrypt('Gehuenak12345.'),
                'role' => 'admin',
                'phone_number' => '089603059913',
            ]
        );

        User::updateOrCreate(
            ['email' => 'adminFIF@gmail.com'],
            [
                'name' => 'Admin FIF',
                'password_hash' => bcrypt('adminfif123'),
                'role' => 'admin',
                'phone_number' => '081234567',
            ]
        );
    }
}
