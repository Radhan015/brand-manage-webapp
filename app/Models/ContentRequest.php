<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContentRequest extends Model
{
    use SoftDeletes;

    protected $table = 'requests';

    protected $fillable = [
        'user_id', 'event_name', 'description', 'additional_notes',
        'project_type_id', 'content_type', 'serial_name', 'series_start_date', 'series_end_date', 'event_start_date', 'event_end_date',
        'content_deadline', 'theme_category_group', 'priority', 'location', 'status',
        'reject_reason'
    ];

    // Owner or assigned PIC (PRD R2: staff see requests assigned to them)
    public function scopeVisibleTo($query, $userId)
    {
        return $query->where(fn ($q) => $q->where('user_id', $userId)
            ->orWhereHas('content', fn ($c) => $c->where('pic_id', $userId)));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projectType()
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function platforms()
    {
        return $this->belongsToMany(Platform::class, 'request_platform', 'request_id')->withPivot('order')->orderByPivot('order');
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
