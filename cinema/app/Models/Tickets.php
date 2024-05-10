<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;

    protected $fillable = ['uuid', 'date', 'sessions_id', 'seats_id', 'created_at', 'updated_at'];
}
