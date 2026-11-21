<?php

namespace Tests\Feature;

use App\Models\Content;
use App\Models\ContentRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StaffRoleTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $role, bool $active = true): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role, 'is_active' => $active]);
    }

    private function makeRequest(User $owner): ContentRequest
    {
        return ContentRequest::create([
            'user_id' => $owner->id, 'event_name' => 'Event', 'description' => 'desc',
            'content_type' => 'single', 'event_start_date' => '2026-12-01', 'event_end_date' => '2026-12-01', 'status' => 'new_request',
        ]);
    }

    public function test_pic_must_be_active_staff_or_admin(): void
    {
        $admin = $this->makeUser('admin');
        $req = $this->makeRequest($this->makeUser('user'));
        $assign = fn ($pic) => $this->actingAs($admin)->post("/admin/request/{$req->id}/assign", ['pic_id' => $pic->id, 'deadline' => '2026-12-05']);

        $assign($this->makeUser('user'))->assertSessionHasErrors('pic_id');
        $assign($this->makeUser('staff', false))->assertSessionHasErrors('pic_id');
        $assign($staff = $this->makeUser('staff'))->assertSessionHasNoErrors();

        $this->assertSame($staff->id, $req->content()->first()->pic_id);
        $this->assertSame('in_progress', $req->fresh()->status);
    }

    public function test_change_pic_keeps_deadline_and_status(): void
    {
        $admin = $this->makeUser('admin');
        $req = $this->makeRequest($this->makeUser('user'));
        $req->update(['status' => 'review']);
        Content::create(['request_id' => $req->id, 'pic_id' => $admin->id, 'content_name' => 'x', 'deadline' => '2026-12-05', 'coverage_date' => '2026-12-03']);

        $this->actingAs($admin)->post("/admin/request/{$req->id}/pic", ['pic_id' => $this->makeUser('user')->id])->assertSessionHasErrors('pic_id');
        $this->actingAs($admin)->post("/admin/request/{$req->id}/pic", ['pic_id' => ($staff = $this->makeUser('staff'))->id])->assertSessionHasNoErrors();

        $content = $req->content()->first();
        $this->assertSame($staff->id, $content->pic_id);
        $this->assertSame('2026-12-05', substr($content->deadline, 0, 10));
        $this->assertSame('2026-12-03', substr($content->coverage_date, 0, 10));
        $this->assertSame('review', $req->fresh()->status);
    }

    public function test_admin_can_set_role_but_not_demote_self(): void
    {
        $admin = $this->makeUser('admin');
        $user = $this->makeUser('user');

        $this->actingAs($admin)->put("/admin/master-staf/{$user->id}", ['role' => 'staff', 'is_active' => true])->assertSessionHas('success');
        $this->assertSame('staff', $user->fresh()->role);

        $this->actingAs($admin)->put("/admin/master-staf/{$admin->id}", ['role' => 'user', 'is_active' => true])->assertSessionHas('error');
        $this->actingAs($admin)->put("/admin/master-staf/{$admin->id}", ['role' => 'admin', 'is_active' => false])->assertSessionHas('error');
        $this->assertSame('admin', $admin->fresh()->role);
        $this->assertTrue($admin->fresh()->is_active);
    }

    public function test_non_admin_cannot_manage_staff(): void
    {
        $staff = $this->makeUser('staff');
        $user = $this->makeUser('user');

        $this->actingAs($staff)->get('/admin/master-staf')->assertRedirect(route('request-form'));
        $this->actingAs($staff)->put("/admin/master-staf/{$user->id}", ['role' => 'admin', 'is_active' => true]);
        $this->assertSame('user', $user->fresh()->role);
    }

    public function test_staff_sees_only_own_and_assigned_requests(): void
    {
        $staff = $this->makeUser('staff');
        $owner = $this->makeUser('user');
        $assigned = $this->makeRequest($owner);
        $other = $this->makeRequest($owner);
        Content::create(['request_id' => $assigned->id, 'pic_id' => $staff->id, 'content_name' => 'x']);

        $this->actingAs($staff)->get("/my-requests/{$assigned->id}")->assertOk();
        $this->actingAs($staff)->get("/my-requests/{$other->id}")->assertNotFound();
        $this->actingAs($owner)->get("/my-requests/{$other->id}")->assertOk();
        $this->actingAs($this->makeUser('user'))->get("/my-requests/{$assigned->id}")->assertNotFound();
    }

    public function test_inactive_user_cannot_log_in(): void
    {
        $staff = $this->makeUser('staff', false);

        $this->post('/login', ['login' => $staff->email, 'password' => 'secret123'])
            ->assertSessionHasErrors(['login' => 'Akun Anda sedang dinonaktifkan. Hubungi admin.']);
        $this->assertGuest();

        $staff->update(['is_active' => true]);
        $this->post('/login', ['login' => $staff->email, 'password' => 'secret123']);
        $this->assertAuthenticatedAs($staff);
    }
}
