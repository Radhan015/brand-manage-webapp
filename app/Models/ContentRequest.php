<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentRequest extends Model
{
    protected $table = 'requests';

    protected $fillable = [
        'user_id', 'event_name', 'description', 'additional_notes', 
        'project_type', 'content_type', 'event_start_date', 'event_end_date', 
        'theme_category_group', 'priority', 'location', 'status', 'deadline',
        'reject_reason'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'request_id');
    }

    public function content()
    {
        return $this->hasOne(Content::class, 'request_id');
    }
}
