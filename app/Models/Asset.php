<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = [
        'request_id', 'asset_name', 'asset_type', 'drive_url'
    ];
}
