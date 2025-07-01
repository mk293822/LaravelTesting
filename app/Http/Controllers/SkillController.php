<?php

namespace App\Http\Controllers;

use App\Enums\SkillLevelEnum;
use App\Models\Skill;
use App\Models\UserSkill;
use App\services\SkillServices;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class SkillController extends Controller
{

    public $skillServices;

    public function __construct(SkillServices $skill_services)
    {
        $this->skillServices = $skill_services;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $skills = $request->user()->skills;

        return Inertia('Skills', compact('skills'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store_user_skill(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => ['required', new Enum(SkillLevelEnum::class)],
        ]);

        $this->skillServices->storeSkills($validated, $request->user());

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy_user_skill(Request $request, string $skill_id)
    {
        $request->user()->skills()->detach($skill_id);

        return redirect()->back();
    }
}
