<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Types extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'color', 'created_at', 'updated_at'];
    protected $visible = ['id', 'type', 'color'];
}
