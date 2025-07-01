<?php

namespace App\services;

use App\Models\Skill;
use App\Models\User;
use App\Models\UserSkill;
use Error;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class SkillServices
{

    public function storeSkills($validated, User $user)
    {
        try {
            DB::beginTransaction();
            $name = Str::title(trim($validated['name']));
            $level = $validated['level'];

            $skill = Skill::firstOrCreate(
                ['name' => $name],
                ['created_at' => now()]
            );

            UserSkill::updateOrCreate(
                ['user_id' => $user->id, 'skill_id' => $skill->id],
                ['level' => $level]
            );

            DB::commit();

            return $skill;
        } catch (Error $error) {
            DB::rollBack();
            Log::error($error);
        }
    }
}
