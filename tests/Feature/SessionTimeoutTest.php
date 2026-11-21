<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SessionTimeoutTest extends TestCase
{
    use RefreshDatabase;

    private function user(): User
    {
        return User::create(['name' => 'Sesi', 'email' => 'sesi@test.id', 'password_hash' => 'secret123', 'role' => 'user']);
    }

    public function test_login_is_ended_after_the_absolute_limit_even_when_active(): void
    {
        $this->post('/login', ['login' => 'sesi@test.id', 'password' => 'secret123'] + ['_' => $this->user()->id]);
        $this->assertAuthenticated();

        $this->travel(7 * 60 + 59)->minutes();
        $this->get('/my-requests')->assertOk();

        $this->travel(2)->minutes(); // now past 8 hours since login
        $this->get('/my-requests')->assertRedirect(route('login'))->assertSessionHas('status');
        $this->assertGuest();
    }

    public function test_remember_me_is_ignored(): void
    {
        $this->user();
        $this->post('/login', ['login' => 'sesi@test.id', 'password' => 'secret123', 'remember' => 'on'])
            ->assertCookieMissing(auth()->guard()->getRecallerName());
        $this->assertAuthenticated();
    }

    public function test_session_cookie_rules(): void
    {
        $this->assertSame(120, config('session.lifetime'));
        $this->assertTrue(config('session.http_only'));
        $this->assertSame('lax', config('session.same_site'));
        $this->assertSame(480, config('simaco.session_absolute_minutes'));
    }
}
