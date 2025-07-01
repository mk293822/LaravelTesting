<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePhotoController extends Controller
{
    public function deleteProfilePhoto(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->profile_photo_path && Storage::disk('public')->exists($user->profile_photo_path)) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $user->profile_photo_path = null;
        $user->save();

        return to_route('profile.edit');
    }


    public function uploadProfilePhoto(Request $request): RedirectResponse
    {
        $request->validate(['profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20480']);

        $old_photo_path = $request->user()->profile_photo_path;

        if ($old_photo_path && Storage::disk('public')->exists($old_photo_path)) {
            Storage::disk('public')->delete($old_photo_path);
        }
        $file_name = $request->file('profile_photo')->hashName();
        $path = $request->file('profile_photo')->storeAs('profile_photos', $file_name, 'public');
        $validated['profile_photo_path'] = $path;

        $request->user()->fill($validated);

        $request->user()->save();

        return to_route('profile.edit');
    }
}
