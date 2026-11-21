<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LocaleTest extends TestCase
{
    use RefreshDatabase;

    public function test_default_is_indonesian_and_choice_is_kept_in_session(): void
    {
        $this->get('/login')->assertInertia(fn ($page) => $page->where('locale', 'id'));

        $this->from('/login')->post('/locale/en')->assertRedirect('/login');
        $this->get('/login')->assertInertia(fn ($page) => $page->where('locale', 'en'));

        $this->post('/locale/id');
        $this->get('/login')->assertInertia(fn ($page) => $page->where('locale', 'id'));
    }

    public function test_unknown_locale_is_rejected(): void
    {
        $this->post('/locale/fr')->assertNotFound();
        $this->get('/login')->assertInertia(fn ($page) => $page->where('locale', 'id'));
    }

    public function test_admin_messages_follow_the_locale(): void
    {
        $admin = User::create(['name' => 'Adm', 'email' => 'adm@test.id', 'password_hash' => 'secret123', 'role' => 'admin']);
        \App\Models\Platform::create(['name' => 'Instagram']);

        $this->actingAs($admin)->post('/admin/master-data/platforms', ['name' => 'Instagram'])->assertSessionHasErrors(['name' => 'Nama ini sudah ada.']);
        $this->actingAs($admin)->post('/locale/en');
        $this->actingAs($admin)->post('/admin/master-data/platforms', ['name' => 'Instagram'])->assertSessionHasErrors(['name' => 'This name already exists.']);
        $this->actingAs($admin)->post('/admin/master-data/platforms', ['name' => 'TikTok'])->assertSessionHas('success', '"TikTok" saved.');
    }

    public function test_validation_and_flash_messages_follow_the_locale(): void
    {
        // Indonesian (default): framework rule message translated too, not Laravel's English
        $this->post('/login', [])->assertSessionHasErrors(['login' => 'Email atau nama wajib diisi.']);

        $this->post('/locale/en');
        $this->post('/login', [])->assertSessionHasErrors(['login' => 'The email or name field is required.']);

        User::create(['name' => 'Off', 'email' => 'off@test.id', 'password_hash' => 'secret123', 'role' => 'staff', 'is_active' => false]);
        $this->post('/login', ['login' => 'off@test.id', 'password' => 'secret123'])
            ->assertSessionHasErrors(['login' => 'Your account is deactivated. Please contact an admin.']);
    }
}
