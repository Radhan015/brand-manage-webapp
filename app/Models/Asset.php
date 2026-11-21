<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
    use SoftDeletes;

    protected $hidden = ['file_path'];

    protected $fillable = [
        'request_id', 'asset_name', 'asset_type', 'drive_url', 'file_path', 'file_size', 'mime_type'
    ];
}
