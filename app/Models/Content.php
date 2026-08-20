<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'request_id', 'template_id', 'pic_id', 'content_name', 
        'content_description', 'deadline', 'revision_notes', 'output_url', 'coverage_date'
    ];
}
