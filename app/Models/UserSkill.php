<?php

namespace App\Models;

use App\Enums\SkillLevelEnum;
use Illuminate\Database\Eloquent\Relations\Pivot;

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
class UserSkill extends Pivot
{
    protected $fillable = [
        "user_id",
        "skill_id",
        "level"
    ];

    protected $casts = [
        "level" => SkillLevelEnum::class
    ];
}
