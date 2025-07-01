import React, { FormEventHandler, useMemo, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Input } from './ui/input';
import debounce from "lodash.debounce";

interface Props {
    onClose: () => void;
}

const LinkAddForm = ({ onClose }: Props) => {
    const { setData, data, errors, post, reset, processing, recentlySuccessful } = useForm({
        name: '',
        link: '',
    });
    const [isValidLink, setIsValidLink] = useState(true);

    // Simple URL validation function
    const validateLink = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const addSkills: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profile.add_link'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
        onClose();
    };

    const debouncedValidate = useMemo(
        () =>
            debounce((val: string) => {
                setIsValidLink(val.trim() ? validateLink(val) : true);
            }, 500),
        [],
    );

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('link', value);
        setIsValidLink(true);
        debouncedValidate(value);
    }

    return (
        <form onSubmit={addSkills} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Link Name</Label>
                <Input
                    onChange={(e) => setData('name', e.target.value)}
                    value={data.name}
                    id="name"
                    className="border border-white/10"
                    placeholder="Link Name"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="link">Link</Label>
                <Input
                    aria-label="link"
                    onChange={handleLinkChange}
                    value={data.link}
                    id="link"
                    type="text"
                    className="border border-white/10"
                    placeholder="Link"
                />
                {!isValidLink && <InputError message='Please enter a valid URL' />}
                <InputError message={errors.link} />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button type="submit" disabled={processing}>
                    Save Link
                </Button>

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

export default LinkAddForm;
