<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Coverage extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'date', 'time', 'pic_id'];

    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
