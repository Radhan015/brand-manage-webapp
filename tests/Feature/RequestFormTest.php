<?php

namespace Tests\Feature;

use App\Models\Content;
use App\Models\ContentRequest;
use App\Models\Platform;
use App\Models\ProjectType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RequestFormTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private ProjectType $type;
    private Platform $ig;
    private Platform $tiktok;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->user = $this->makeUser('user');
        $this->type = ProjectType::create(['name' => 'Video']);
        $this->ig = Platform::create(['name' => 'Instagram']);
        $this->tiktok = Platform::create(['name' => 'TikTok']);
    }

    private function makeUser(string $role): User
    {
        static $n = 0;
        $n++;
        return User::create(['name' => "$role $n", 'email' => "rf-$role$n@test.id", 'password_hash' => 'secret123', 'role' => $role]);
    }

    private function payload(array $override = []): array
    {
        return array_merge([
            'event_name' => 'Seminar AI',
            'description' => 'Poster promosi',
            'project_type_id' => $this->type->id,
            'content_type' => 'single',
            'event_start_date' => now()->addDays(10)->toDateString(),
            'event_end_date' => now()->addDays(11)->toDateString(),
            'content_deadline' => now()->addDays(5)->toDateString(),
            'platform_ids' => [$this->tiktok->id, $this->ig->id],
            'drive_url' => "https://drive.google.com/a\nhttps://docs.google.com/b",
        ], $override);
    }

    public function test_valid_request_saves_every_field_in_its_own_column(): void
    {
        $this->actingAs($this->user)->post('/request-form', $this->payload([
            'files' => [UploadedFile::fake()->image('poster.png')->size(1000)],
            'serial_name' => 'ignored for single',
        ]))->assertSessionHasNoErrors();

        $req = ContentRequest::with(['platforms', 'assets'])->sole();
        $this->assertSame(now()->addDays(10)->toDateString(), $req->event_start_date);
        $this->assertSame(now()->addDays(11)->toDateString(), $req->event_end_date);
        $this->assertSame(now()->addDays(5)->toDateString(), $req->content_deadline);
        $this->assertNull($req->serial_name);
        $this->assertSame(['TikTok', 'Instagram'], $req->platforms->pluck('name')->all(), 'platform order follows the selection order');

        $this->assertSame(['drive_link', 'drive_link', 'upload'], $req->assets->pluck('asset_type')->all());
        $upload = $req->assets->firstWhere('asset_type', 'upload');
        $this->assertSame('poster.png', $upload->asset_name);
        $this->assertMatchesRegularExpression('#^request-assets/[0-9a-f-]{36}\.png$#', $upload->file_path);
        Storage::disk('local')->assertExists($upload->file_path);
    }

    public function test_series_requires_serial_name_and_airing_period(): void
    {
        $this->actingAs($this->user)->post('/request-form', $this->payload(['content_type' => 'series']))
            ->assertSessionHasErrors(['serial_name', 'series_start_date', 'series_end_date']);

        $this->actingAs($this->user)->post('/request-form', $this->payload([
            'content_type' => 'series', 'serial_name' => 'Kenalan Lab',
            'series_start_date' => now()->addDays(12)->toDateString(), 'series_end_date' => now()->addDays(40)->toDateString(),
        ]))->assertSessionHasNoErrors();
        $this->assertSame('Kenalan Lab', ContentRequest::sole()->serial_name);
    }

    public function test_invalid_input_is_rejected(): void
    {
        $cases = [
            'event_name' => ['event_name' => str_repeat('a', 101)],
            'event_start_date' => ['event_start_date' => now()->subDay()->toDateString()],
            'event_end_date' => ['event_end_date' => now()->addDays(9)->toDateString()],
            'content_deadline' => ['content_deadline' => now()->addDays(2)->toDateString()],
            'platform_ids' => ['platform_ids' => []],
        ];
        foreach ($cases as $field => $override) {
            $this->actingAs($this->user)->post('/request-form', $this->payload($override))->assertSessionHasErrors($field);
        }
        $this->assertSame(0, ContentRequest::count());
    }

    public function test_any_http_or_https_link_is_accepted_but_other_schemes_are_not(): void
    {
        foreach (['javascript:alert(1)', 'JAVASCRIPT://x%0Aalert(1)', 'data:text/html,hi', 'ftp://files.example.com/a', 'bukan-link'] as $bad) {
            $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => $bad]))->assertSessionHasErrors('drive_url');
        }
        $this->assertSame(0, ContentRequest::count());

        $links = "https://www.canva.com/design/abc\nhttp://youtu.be/xyz\nhttps://1drv.ms/f/s!abc";
        $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => $links]))->assertSessionHasNoErrors();
        $this->assertSame(
            ['https://www.canva.com/design/abc', 'http://youtu.be/xyz', 'https://1drv.ms/f/s!abc'],
            ContentRequest::sole()->assets()->pluck('drive_url')->all()
        );
    }

    public function test_needs_at_least_one_asset_and_valid_files(): void
    {
        $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => '']))->assertSessionHasErrors('drive_url');
        $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => '', 'files' => [UploadedFile::fake()->create('big.pdf', 5121, 'application/pdf')]]))->assertSessionHasErrors('files.0');
        $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => '', 'files' => [UploadedFile::fake()->create('virus.exe', 10)]]))->assertSessionHasErrors('files.0');
        $this->assertSame(0, ContentRequest::count());

        $this->actingAs($this->user)->post('/request-form', $this->payload(['drive_url' => '', 'files' => [UploadedFile::fake()->create('brief.pdf', 100, 'application/pdf')]]))->assertSessionHasNoErrors();
        $this->assertSame(1, ContentRequest::count());
    }

    public function test_uploaded_file_is_only_visible_to_owner_pic_and_admin(): void
    {
        $this->actingAs($this->user)->post('/request-form', $this->payload(['files' => [UploadedFile::fake()->image('a.png')]]));
        $req = ContentRequest::sole();
        $asset = $req->assets()->where('asset_type', 'upload')->sole();
        $staff = $this->makeUser('staff');
        Content::create(['request_id' => $req->id, 'pic_id' => $staff->id, 'content_name' => 'x']);

        $this->actingAs($this->user)->get("/assets/{$asset->id}/file")->assertOk();
        $this->actingAs($staff)->get("/assets/{$asset->id}/file")->assertOk();
        $this->actingAs($this->makeUser('admin'))->get("/assets/{$asset->id}/file")->assertOk();
        $this->actingAs($this->makeUser('user'))->get("/assets/{$asset->id}/file")->assertNotFound();
        $this->actingAs($this->makeUser('staff'))->get("/assets/{$asset->id}/file")->assertNotFound();
        $this->assertArrayNotHasKey('file_path', $asset->toArray());
    }
}
