<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'bio',
        'profile_photo_path'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'links' => 'array',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'user_skill')->using(UserSkill::class)->withPivot('level')->withTimestamps();
    }

    public function getProfilePhotoUrlAttribute()
    {
        return $this->profile_photo_path ? Storage::url($this->profile_photo_path) : null;
    }

    public function personal_links()
    {
        return $this->hasMany(PersonalLinks::class, 'user_id');
    }

    public function getFilteredPersonalLinksAttribute()
    {
        return $this->personal_links->filter(function ($link) {
            return isset($link->name, $link->link) && filter_var($link->link, FILTER_VALIDATE_URL);
        })->values();
    }
}
