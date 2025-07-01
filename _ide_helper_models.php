<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PersonalLinks whereUserId($value)
 */
	class PersonalLinks extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserSkill> $userSkills
 * @property-read int|null $user_skills_count
 * @property-read \App\Models\UserSkill|null $pivot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereUpdatedAt($value)
 */
	class Skill extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $username
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string|null $bio
 * @property string|null $profile_photo_path
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $filtered_personal_links
 * @property-read mixed $profile_photo_url
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PersonalLinks> $personal_links
 * @property-read int|null $personal_links_count
 * @property-read \App\Models\UserSkill|null $pivot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Skill> $skills
 * @property-read int|null $skills_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfilePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $user_id
 * @property int $skill_id
 * @property SkillLevelEnum $level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkill whereUserId($value)
 * @mixin \Eloquent
 */
	class UserSkill extends \Eloquent {}
}

