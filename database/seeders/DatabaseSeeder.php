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
        
        // PIC / Staf Desain
        User::updateOrCreate(
            ['email' => 'pic@simaco.com'],
            [
                'name' => 'Staf Desain PIC',
                'password_hash' => bcrypt('pic123'),
                'role' => 'staff', // Asumsikan role staff/PIC
                'phone_number' => '082222222222',
            ]
        );
    }
}
