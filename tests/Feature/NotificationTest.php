<?php

namespace Tests\Feature;

use App\Models\ContentRequest;
use App\Models\Platform;
use App\Models\ProjectType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $role, bool $active = true): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "notif-$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role, 'is_active' => $active]);
    }

    private function submitRequest(User $requester, string $eventName = 'Seminar AI'): ContentRequest
    {
        Mail::fake();
        $this->actingAs($requester)->post('/request-form', [
            'event_name' => $eventName,
            'description' => 'Poster',
            'project_type_id' => ProjectType::firstOrCreate(['name' => 'Video'])->id,
            'content_type' => 'single',
            'event_start_date' => now()->addDays(10)->toDateString(),
            'event_end_date' => now()->addDays(10)->toDateString(),
            'content_deadline' => now()->addDays(5)->toDateString(),
            'platform_ids' => [Platform::firstOrCreate(['name' => 'Instagram'])->id],
            'drive_url' => 'https://example.com/brief',
        ])->assertSessionHasNoErrors();

        return ContentRequest::latest('id')->first();
    }

    public function test_new_request_notifies_only_active_admins(): void
    {
        $admin = $this->makeUser('admin');
        $inactiveAdmin = $this->makeUser('admin', false);
        $staff = $this->makeUser('staff');
        $requester = $this->makeUser('user');

        $req = $this->submitRequest($requester);

        $this->assertSame(1, $admin->notifications()->count());
        $this->assertSame(['kind' => 'new_request', 'request_id' => $req->id, 'event_name' => 'Seminar AI', 'requester' => $requester->name], $admin->notifications()->first()->data);
        $this->assertSame(0, $inactiveAdmin->notifications()->count());
        $this->assertSame(0, $staff->notifications()->count());
    }

    public function test_bell_data_is_shared_with_admins_only(): void
    {
        $admin = $this->makeUser('admin');
        $this->submitRequest($this->makeUser('user'), 'Satu');
        $this->travel(1)->minutes(); // newest-first ordering needs distinct timestamps
        $this->submitRequest($this->makeUser('user'), 'Dua');

        $this->actingAs($admin)->get('/admin/dashboard')->assertInertia(fn ($page) => $page
            ->where('notifications.unread', 2)
            ->has('notifications.items', 2)
            ->where('notifications.items.0.data.event_name', 'Dua')); // newest first

        $this->actingAs($this->makeUser('user'))->get('/my-requests')->assertInertia(fn ($page) => $page->where('notifications', null));
    }

    public function test_opening_a_notification_marks_it_read_and_goes_to_the_request(): void
    {
        $admin = $this->makeUser('admin');
        $otherAdmin = $this->makeUser('admin');
        $req = $this->submitRequest($this->makeUser('user'));
        $notification = $admin->notifications()->first();

        $this->actingAs($otherAdmin)->post("/notifications/{$notification->id}")->assertNotFound();
        $this->assertNull($notification->fresh()->read_at);

        $this->actingAs($admin)->post("/notifications/{$notification->id}")
            ->assertRedirect(route('admin.detail-permintaan', $req->id));
        $this->assertNotNull($notification->fresh()->read_at);
        $this->assertSame(0, $admin->unreadNotifications()->count());
    }

    public function test_mark_all_as_read(): void
    {
        $admin = $this->makeUser('admin');
        $this->submitRequest($this->makeUser('user'), 'Satu');
        $this->submitRequest($this->makeUser('user'), 'Dua');

        $this->actingAs($admin)->post('/notifications/read-all');

        $this->assertSame(0, $admin->unreadNotifications()->count());
        $this->assertSame(2, $admin->notifications()->count());
    }

    public function test_staff_is_notified_when_assigned_and_opens_it_from_my_requests(): void
    {
        $admin = $this->makeUser('admin');
        $staff = $this->makeUser('staff');
        $req = $this->submitRequest($this->makeUser('user'), 'Video Lab');

        $this->actingAs($admin)->post("/admin/request/{$req->id}/assign", ['pic_id' => $staff->id, 'deadline' => now()->addDays(5)->toDateString()])
            ->assertSessionHasNoErrors();

        $notification = $staff->notifications()->sole();
        $this->assertSame('assigned', $notification->data['kind']);
        $this->assertSame('Video Lab', $notification->data['event_name']);

        // staff sees the bell on their pages, and opening the notification leads to their request view
        $this->actingAs($staff)->get('/my-requests')->assertInertia(fn ($page) => $page->where('notifications.unread', 1));
        $this->actingAs($staff)->post("/notifications/{$notification->id}")->assertRedirect(route('request-detail', $req->id));
        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_change_pic_notifies_only_a_new_pic_and_self_assignment_is_silent(): void
    {
        $admin = $this->makeUser('admin');
        $staffA = $this->makeUser('staff');
        $staffB = $this->makeUser('staff');
        $req = $this->submitRequest($this->makeUser('user'));
        $admin->notifications()->delete(); // ignore the "new request" one

        // admin assigns themselves: no notification for anyone
        $this->actingAs($admin)->post("/admin/request/{$req->id}/assign", ['pic_id' => $admin->id, 'deadline' => now()->addDays(5)->toDateString()]);
        $this->assertSame(0, $admin->notifications()->count());

        $this->actingAs($admin)->post("/admin/request/{$req->id}/pic", ['pic_id' => $staffA->id]);
        $this->actingAs($admin)->post("/admin/request/{$req->id}/pic", ['pic_id' => $staffA->id]); // same PIC again
        $this->actingAs($admin)->post("/admin/request/{$req->id}/pic", ['pic_id' => $staffB->id]);

        $this->assertSame(1, $staffA->notifications()->count());
        $this->assertSame(1, $staffB->notifications()->count());
    }
}
