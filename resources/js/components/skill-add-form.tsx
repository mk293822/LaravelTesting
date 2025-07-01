import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SkillProps } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import Fuse from 'fuse.js';
import CustomComboBox from './ui/custom-combo-box';

interface Props {
    levels: string[];
    all_skills: SkillProps[];
    onClose: () => void;
}

const SkillAddForm = ({ levels, all_skills, onClose }: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState<SkillProps[] | []>(all_skills);
    const { setData, data, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: '',
        level: levels[0],
    });

    useEffect(() => {
        if (all_skills.length === 0) return;

        const fuse = new Fuse(all_skills, {
            keys: ['name'],
            threshold: 0.5, // adjust for fuzzy strength: lower = stricter
        });

        if (data.name.trim()) {
            const result = fuse.search(data.name);
            const filtered = result.map((res) => res.item);

            setFilteredSkills(filtered);
            setShowDropdown(filtered.length > 0);
        } else {
            setFilteredSkills(all_skills);
            setShowDropdown(false);
        }
    }, [all_skills, data]);

    const addSkills: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user_skill.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
        onClose();
    };

    return (
        <form onSubmit={addSkills} className="space-y-6">
            <div className="grid gap-2">
                <Label>Skill Name</Label>

                <CustomComboBox value={data.name} onChange={(val) => setData('name', val)} onToggleDropdown={() => setShowDropdown(!showDropdown)} />
                {showDropdown && (
                    <div className="scrollbar-custom mt-1 max-h-44 scroll-m-0 overflow-y-auto rounded-md bg-gray-700 p-2 shadow">
                        {filteredSkills.length > 0 &&
                            filteredSkills.map((s) => (
                                <button
                                    type='button'
                                    key={s.id}
                                    className="w-full cursor-pointer rounded px-2 py-1 text-start text-white hover:bg-gray-800"
                                    onClick={() => {
                                        setData('name', s.name);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {s.name}
                                </button>
                            ))}
                    </div>
                )}
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <select
                    name="level"
                    id="level"
                    value={data.level}
                    onChange={(e) => setData('level', e.target.value)}
                    className="rounded-lg border border-white/10 p-2"
                >
                    {levels.map((level) => (
                        <option value={level} key={level} className="bg-gray-700">
                            {level}
                        </option>
                    ))}
                </select>

                <InputError message={errors.level} />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button type='submit' disabled={processing}>Save Skill</Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-neutral-600">Saved</p>
                </Transition>
            </div>
        </form>
    );
};

export default SkillAddForm;
