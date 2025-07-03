import ChatSideBar from '@/components/chat-sidebar';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-full">
            <div className="h-full flex-1">{children}</div>
            <ChatSideBar />
        </div>
    );
}
