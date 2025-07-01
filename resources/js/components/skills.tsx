import { SkillProps } from '@/types';
import axios, { isAxiosError } from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import HeadingSmall from './heading-small';
import SkillAddForm from './skill-add-form';
import { Button } from './ui/button';
import Modal from './ui/modal';

interface Props {
    all_skills: SkillProps[];
    levels: string[];
    skills: SkillProps[];
}

const Skills = ({ all_skills, skills, levels }: Props) => {
    const [showAddSkill, setShowAddSkill] = useState(false);
    const [userSkills, setUserSkills] = useState<SkillProps[] | []>(skills ?? []);

    useEffect(() => {
        if (skills) setUserSkills(skills);
    }, [skills]);

    const deleteSkill = async (id: number) => {
        try {
            await axios.post(route('user_skill.destroy', id));
            setUserSkills((pre) => pre.filter((skill) => skill.id !== id));
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
                    <HeadingSmall title="Skills" description="Update Or Add Your Skills." />
                    <Button onClick={() => setShowAddSkill(true)}>Add Skill</Button>
                </div>
                <div className="flex flex-wrap justify-start gap-2">
                    {userSkills.length > 0 ? (
                        userSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="flex max-w-max flex-nowrap items-center justify-between gap-2 rounded-full border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-white shadow-sm transition duration-200 hover:bg-gray-700"
                            >
                                <div className="flex flex-nowrap items-center">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-gray-400"> – {skill.pivot?.level}</span>
                                </div>
                                <button onClick={() => deleteSkill(skill.id)} className="rounded-full p-1 hover:cursor-pointer hover:bg-gray-600">
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="w-full py-1 text-center text-lg text-gray-500">No Skills Yet</div>
                    )}
                </div>
            </div>

            {/* Skill Modal */}
            <Modal show={showAddSkill} onClose={() => setShowAddSkill(false)}>
                <div className="space-y-6 px-4 py-6">
                    <HeadingSmall title="Add Skill" description="Add your proficient skill." />
                    <SkillAddForm onClose={() => setShowAddSkill(false)} levels={levels} all_skills={all_skills} />
                </div>
            </Modal>
        </>
    );
};

export default Skills;
