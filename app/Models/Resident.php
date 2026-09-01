<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'full_name',
        'nik',
        'gender',
        'address',
        'phone',
        'position',
        'organization',
        'status',
    ];
}
