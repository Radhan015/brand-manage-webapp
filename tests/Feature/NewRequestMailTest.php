<?php

namespace Tests\Feature;

use App\Mail\NewRequestSubmitted;
use App\Models\ContentRequest;
use App\Models\Platform;
use App\Models\ProjectType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class NewRequestMailTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(string $role, bool $active = true): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "mail-$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role, 'is_active' => $active]);
    }

    private function submit(User $user, array $override = [])
    {
        return $this->actingAs($user)->post('/request-form', array_merge([
            'event_name' => 'Seminar AI',
            'description' => 'Poster promosi seminar',
            'project_type_id' => ProjectType::firstOrCreate(['name' => 'Video'])->id,
            'content_type' => 'single',
            'event_start_date' => now()->addDays(10)->toDateString(),
            'event_end_date' => now()->addDays(10)->toDateString(),
            'content_deadline' => now()->addDays(5)->toDateString(),
            'platform_ids' => [Platform::firstOrCreate(['name' => 'Instagram'])->id],
            'drive_url' => 'https://drive.google.com/a',
        ], $override));
    }

    public function test_every_active_admin_gets_one_queued_email(): void
    {
        Mail::fake();
        $admins = [$this->makeUser('admin'), $this->makeUser('admin')];
        $inactiveAdmin = $this->makeUser('admin', false);
        $staff = $this->makeUser('staff');

        $this->submit($this->makeUser('user'))->assertSessionHasNoErrors();

        Mail::assertQueuedCount(2);
        foreach ($admins as $admin) {
            Mail::assertQueued(NewRequestSubmitted::class, fn ($mail) => $mail->hasTo($admin->email) && count($mail->to) === 1);
        }
        Mail::assertNotQueued(NewRequestSubmitted::class, fn ($mail) => $mail->hasTo($inactiveAdmin->email) || $mail->hasTo($staff->email));
    }

    public function test_no_email_when_request_is_invalid(): void
    {
        Mail::fake();
        $this->makeUser('admin');

        $this->submit($this->makeUser('user'), ['event_name' => ''])->assertSessionHasErrors('event_name');

        Mail::assertNothingQueued();
    }

    public function test_email_contains_forwardable_summary_and_detail_link(): void
    {
        Mail::fake();
        $this->makeUser('admin');
        $requester = $this->makeUser('user');
        $this->submit($requester);

        $req = ContentRequest::sole();
        $mail = new NewRequestSubmitted($req);

        $mail->assertHasSubject('[SiMaCo] Request baru: Seminar AI');
        $mail->assertSeeInHtml('Seminar AI');
        $mail->assertSeeInHtml($requester->email);
        $mail->assertSeeInHtml('Video');
        $mail->assertSeeInHtml('Instagram');
        $mail->assertSeeInHtml(route('admin.detail-permintaan', $req->id));
    }
}
