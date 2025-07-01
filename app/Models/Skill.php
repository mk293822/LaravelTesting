<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ["name"];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_skill')->using(UserSkill::class)->withPivot('level')->withTimestamps();
    }

    public function userSkills()
    {
        return $this->hasMany(UserSkill::class, 'skill_id');
    }
}
