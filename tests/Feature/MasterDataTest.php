<?php

namespace Tests\Feature;

use App\Models\Platform;
use App\Models\ProjectType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MasterDataTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $role): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "md-$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role]);
    }

    public function test_admin_can_add_rename_and_deactivate(): void
    {
        $admin = $this->makeUser('admin');

        $this->actingAs($admin)->post('/admin/master-data/project-types', ['name' => 'Liputan', 'description' => 'Foto + berita', 'is_active' => true])->assertSessionHasNoErrors();
        $this->actingAs($admin)->post('/admin/master-data/platforms', ['name' => 'Instagram', 'description' => 'ignored', 'is_active' => true])->assertSessionHasNoErrors();

        $type = ProjectType::sole();
        $this->assertSame('Foto + berita', $type->description);
        $this->assertTrue(Platform::sole()->is_active);

        $this->actingAs($admin)->put("/admin/master-data/project-types/{$type->id}", ['name' => 'Liputan Acara', 'description' => '', 'is_active' => false])->assertSessionHasNoErrors();
        $type->refresh();
        $this->assertSame('Liputan Acara', $type->name);
        $this->assertFalse($type->is_active);
    }

    public function test_duplicate_name_is_rejected_but_keeping_own_name_is_fine(): void
    {
        $admin = $this->makeUser('admin');
        $video = ProjectType::create(['name' => 'Video']);

        $this->actingAs($admin)->post('/admin/master-data/project-types', ['name' => 'Video'])->assertSessionHasErrors(['name' => 'Nama ini sudah ada.']);
        $this->actingAs($admin)->put("/admin/master-data/project-types/{$video->id}", ['name' => 'Video', 'is_active' => false])->assertSessionHasNoErrors();
        $this->assertSame(1, ProjectType::count());
    }

    public function test_non_admin_cannot_change_master_data(): void
    {
        foreach (['staff', 'user'] as $role) {
            $this->actingAs($this->makeUser($role))->post('/admin/master-data/platforms', ['name' => "Hack $role"]);
        }
        $this->assertSame(0, Platform::count());
        $this->actingAs($this->makeUser('admin'))->post('/admin/master-data/unknown', ['name' => 'x'])->assertNotFound();
    }

    public function test_inactive_items_are_hidden_from_request_form(): void
    {
        ProjectType::create(['name' => 'Aktif']);
        ProjectType::create(['name' => 'Lama', 'is_active' => false]);
        Platform::create(['name' => 'TikTok', 'is_active' => false]);

        $this->actingAs($this->makeUser('user'))->get('/request-form')
            ->assertInertia(fn ($page) => $page->has('projectTypes', 1)->where('projectTypes.0.name', 'Aktif')->has('platforms', 0));
    }
}
