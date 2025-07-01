<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\ProfilePhotoController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix('settings')->group(function () {
    Route::redirect('settings', 'profile');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('deleteAccount', [ProfileController::class, 'deleteAccount'])->name('account.delete');

    // Profile Photo
    Route::post('profile', [ProfilePhotoController::class, 'uploadProfilePhoto'])->name('profile.photo');
    Route::delete('profile', [ProfilePhotoController::class, 'deleteProfilePhoto'])->name('profile.photo_delete');

    // Skills
    Route::get('userSkillsAndLinks', [ProfileController::class, 'user_skills_and_links'])->name('profile.skills_and_links');
    Route::post('createUserSkill', [SkillController::class, 'store_user_skill'])->name('user_skill.create');
    Route::post('destroyUserSkill/{skill_id}', [SkillController::class, 'destroy_user_skill'])->name('user_skill.destroy');

    // Personal Link
    Route::post('addPersonalLink', [ProfileController::class, 'add_personal_link'])->name('profile.add_link');
    Route::post('deletePersonalLink/{link_id}', [ProfileController::class, 'delete_personal_link'])->name('profile.delete_link');

    // Password
    Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // Appearance
    Route::get('appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
