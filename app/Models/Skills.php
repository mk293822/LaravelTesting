<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    protected $fillable = ["name"];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_skills')->using(UserSkills::class)->withPivot('level')->withTimestamps();
    }
}
