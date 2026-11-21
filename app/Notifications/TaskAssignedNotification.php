<?php

namespace App\Notifications;

use App\Models\ContentRequest;
use Illuminate\Notifications\Notification;

// PRD R18: tells a staff member (or admin) that they were made PIC of a request.
class TaskAssignedNotification extends Notification
{
    public function __construct(public ContentRequest $contentRequest) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'assigned',
            'request_id' => $this->contentRequest->id,
            'event_name' => $this->contentRequest->event_name,
            'requester' => $this->contentRequest->user?->name,
        ];
    }
}
