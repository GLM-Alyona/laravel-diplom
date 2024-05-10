<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Halls extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rows', 'seats', 'isActive'];

    protected $visible = ['name', 'rows', 'seats', 'isActive'];
}
