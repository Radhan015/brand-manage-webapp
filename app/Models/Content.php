<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Content extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'request_id', 'template_id', 'pic_id', 'content_name', 
        'content_description', 'deadline', 'revision_notes', 'output_url', 'coverage_date'
    ];

    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
