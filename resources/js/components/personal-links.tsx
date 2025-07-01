import React, { useEffect, useState } from 'react';
import { Button } from '@headlessui/react';
import HeadingSmall from './heading-small';
import LinkAddForm from './link-add-form';
import TextLink from './text-link';
import Modal from './ui/modal';
import { X } from 'lucide-react';
import axios from 'axios';
import { isAxiosError } from 'axios';

interface PersonalLinks {
    name: string;
    link: string;
    id: number;
}
interface Props {
    personal_links: PersonalLinks[];
}
const PersonalLinks = ({ personal_links }: Props) => {
    const [showAddLink, setShowAddLink] = useState(false);
    const [personalLinks, setPersonalLinks] = useState<PersonalLinks[] | []>(personal_links ?? []);

    useEffect(() => {
        if (personal_links) setPersonalLinks(personal_links);
    }, [personal_links]);

    const handleDeleteLink = async (id: number) => {
        try {
            await axios.post(route('profile.delete_link', id));
            setPersonalLinks((pre) => pre.filter((link) => link.id !== id));
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.message);
            }
            console.log('Unknown Error: ', error);
        }
    };

    return (
        <>
            <div className="min-h-36 space-y-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall title="Personal Links" description="Update Or Add Your Personal Links." />
                    <Button onClick={() => setShowAddLink(true)}>Add Link</Button>
                </div>
                <div>
                    {personalLinks.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {personalLinks.map((p_link) => (
                                <div
                                    key={p_link.id}
                                    className="flex items-center gap-1 rounded-full border border-gray-700 bg-gray-800 py-1 ps-3 pr-2 text-sm text-white shadow-sm transition hover:bg-gray-700"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                        <span className="font-medium">{p_link.name}:</span>
                                        <TextLink href={p_link.link} target="_blank" rel="noopener noreferrer">
                                            {p_link.link}
                                        </TextLink>
                                    </div>
                                    <button onClick={() => handleDeleteLink(p_link.id)} className="rounded-full p-1 hover:bg-gray-600">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full py-1 text-center text-lg text-gray-500">No Personal Links Yet</div>
                    )}
                </div>
            </div>
            {/* Personal Link Modal */}
            <Modal show={showAddLink} onClose={() => setShowAddLink(false)}>
                <div className="space-y-6 px-4 py-6">
                    <HeadingSmall title="Add Personal Links" description="Add your Personal Links." />
                    <LinkAddForm onClose={() => setShowAddLink(false)} />
                </div>
            </Modal>
        </>
    );
};

export default PersonalLinks;
