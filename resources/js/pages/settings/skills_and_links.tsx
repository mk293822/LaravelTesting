import PersonalLinks from '@/components/personal-links';
import Skills from '@/components/skills';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem, SkillProps } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skills & Personal Links settings',
        href: '/settings/userSkillsAndLinks',
    },
];

interface PersonalLink {
    name: string;
    link: string;
    id: number;
}
interface Props {
    skills: SkillProps[];
    levels: string[];
    all_skills: SkillProps[];
    personal_links: PersonalLink[];
}

const SkillsAndLinks = ({ skills, levels, all_skills, personal_links }: Props) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills & Personal Links" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Skills */}
                    <Skills skills={skills} all_skills={all_skills} levels={levels} />
                    {/* Personal Links */}
                    <PersonalLinks personal_links={personal_links} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default SkillsAndLinks;
