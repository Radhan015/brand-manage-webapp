<?php

namespace Database\Seeders;

use App\Models\Platform;
use App\Models\ProjectType;
use Illuminate\Database\Seeder;

// shortcut: placeholder list, replace once the team agrees on the real master data (PRD R14 #7)
class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Graphic Design', 'Video', 'Photography'] as $name) {
            ProjectType::firstOrCreate(['name' => $name]);
        }

        foreach (['Instagram', 'TikTok', 'YouTube', 'Website FIF', 'LinkedIn'] as $name) {
            Platform::firstOrCreate(['name' => $name]);
        }
    }
}
