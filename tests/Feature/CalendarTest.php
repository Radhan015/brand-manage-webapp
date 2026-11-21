<?php

namespace Tests\Feature;

use App\Models\Content;
use App\Models\ContentRequest;
use App\Models\Coverage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalendarTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $role): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "cal-$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role]);
    }

    private function makeRequest(User $owner, array $attrs = []): ContentRequest
    {
        return ContentRequest::create(array_merge([
            'user_id' => $owner->id, 'event_name' => 'Event', 'description' => 'd', 'content_type' => 'single',
            'event_start_date' => '2026-12-01', 'event_end_date' => '2026-12-02', 'content_deadline' => '2026-11-28', 'status' => 'new_request',
        ], $attrs));
    }

    public function test_admin_calendar_gets_dated_items_without_rejected_requests(): void
    {
        $owner = $this->makeUser('user');
        $active = $this->makeRequest($owner, ['event_name' => 'Seminar', 'content_type' => 'series', 'series_start_date' => '2026-12-05', 'series_end_date' => '2026-12-30']);
        Content::create(['request_id' => $active->id, 'content_name' => 'x', 'deadline' => '2026-11-30', 'coverage_date' => '2026-12-01']);
        $this->makeRequest($owner, ['event_name' => 'Ditolak', 'status' => 'rejected']);
        Coverage::create(['name' => 'Liputan Wisuda', 'date' => '2026-12-10']);

        $this->actingAs($this->makeUser('admin'))->get('/admin/kalender')->assertInertia(fn ($page) => $page
            ->component('PageAdmin/Kalender')
            ->has('requests', 1)
            ->where('requests.0.event_name', 'Seminar')
            ->where('requests.0.series_end_date', '2026-12-30')
            ->where('requests.0.content.deadline', '2026-11-30')
            ->where('requests.0.content.coverage_date', '2026-12-01')
            ->has('coverages', 1)
            ->where('coverages.0.name', 'Liputan Wisuda'));
    }

    public function test_non_admin_cannot_open_calendar(): void
    {
        foreach (['staff', 'user'] as $role) {
            $this->actingAs($this->makeUser($role))->get('/admin/kalender')->assertRedirect(route('request-form'));
        }
    }
}
