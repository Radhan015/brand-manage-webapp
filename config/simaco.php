<?php

// Values from PRD R14 open questions, kept here so the team can change them without touching code (R15).
return [
    'event_name_max' => (int) env('SIMACO_EVENT_NAME_MAX', 100),

    // Content deadline must be at least this many days from today ("request tidak bisa dadakan").
    'min_lead_days' => (int) env('SIMACO_MIN_LEAD_DAYS', 3),

    'upload_max_kb' => 5120,
    'upload_max_files' => 5,
    'upload_mimes' => ['jpg', 'jpeg', 'png', 'webp', 'pdf'],

    // PRD R3: absolute session limit. The idle limit is SESSION_LIFETIME (minutes) in .env.
    'session_absolute_minutes' => (int) env('SIMACO_SESSION_ABSOLUTE_MINUTES', 480),
];
