<?php

namespace App\Notifications;

use App\Models\ContentRequest;
use Illuminate\Notifications\Notification;

// PRD R18: in-app (bell) notification for admins when a request is submitted. Stored in the `notifications` table.
class NewRequestNotification extends Notification
{
    public function __construct(public ContentRequest $contentRequest) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'new_request',
            'request_id' => $this->contentRequest->id,
            'event_name' => $this->contentRequest->event_name,
            'requester' => $this->contentRequest->user?->name,
        ];
    }
}
