<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prices extends Model
{
    use HasFactory;

    protected $fillable = ['halls_id', 'types_id', 'price', 'created_at', 'updated_at'];
    protected $visible = ['types_id', 'price'];
}
