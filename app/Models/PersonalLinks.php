<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalLinks extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'link'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
