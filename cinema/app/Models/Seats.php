<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seats extends Model
{
    use HasFactory;

    protected $fillable = ['halls_id', 'row', 'seat', 'types_id', 'created_at', 'updated_at'];
    protected $visible = ['id', 'halls_id', 'row', 'seat', 'types_id'];
}
