<?php

namespace App\Http\Controllers\Settings;

use App\Enums\SkillLevelEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\PersonalLinks;
use App\Models\Skill;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function user_skills_and_links(Request $request)
    {
        $user = $request->user();
        $all_skills = Skill::all();
        $skills = $user->skills;
        $levels = array_map(fn($case) => $case->value, SkillLevelEnum::cases());
        $personal_links = $user->personal_links->toArray();

        return Inertia('settings/skills_and_links', compact('skills', 'levels', 'all_skills', 'personal_links'));
    }

    public function add_personal_link(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url',
        ]);

        PersonalLinks::updateOrCreate(
            ['user_id' => $request->user()->id, 'link' => $validated['link']],
            ['name' => $validated['name']]
        );


        return redirect()->back();
    }

    public function delete_personal_link(Request $request, $link_id)
    {
        $link = PersonalLinks::findOrFail($link_id);
        $link->delete();
        return redirect()->back();
    }


    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */

    public function deleteAccount(): Response
    {
        return Inertia::render('settings/delete-account');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
