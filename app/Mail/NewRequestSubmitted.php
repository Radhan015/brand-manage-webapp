<?php

namespace App\Mail;

use App\Models\ContentRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

// PRD R7: tells admins about a new request; the summary is written so it can be forwarded to the staff as is.
class NewRequestSubmitted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public ContentRequest $contentRequest)
    {
        $this->afterCommit();
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: "[SiMaCo] Request baru: {$this->contentRequest->event_name}");
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.new-request', with: [
            'req' => $this->contentRequest->loadMissing(['user', 'projectType', 'platforms']),
            'url' => route('admin.detail-permintaan', $this->contentRequest->id),
        ]);
    }
}
