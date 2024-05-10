<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{
    use HasFactory;

    protected $fillable = ['halls_id', 'movies_id', 'sessionStart', 'duration', 'sessionEnd', 'created_at', 'updated_at'];
    protected $visible = ['id', 'halls_id', 'movies_id', 'sessionStart', 'sessionEnd', 'duration'];
}
