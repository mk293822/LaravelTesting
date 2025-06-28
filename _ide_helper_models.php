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
 * @property int $user_id
 * @property int $skill_id
 * @property SkillLevelEnum $level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserSkills whereUserId($value)
 * @mixin \Eloquent
 */
	class UserSkills extends \Eloquent {}
}

