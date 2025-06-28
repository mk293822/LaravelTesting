import { cn } from '@/lib/utils';
import { useEffect, useState, type HTMLAttributes } from 'react';

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {

    const match = message?.match(/\d+(?= seconds)/);

    const initialSeconds = match ? parseInt(match[0]) : null;
    const [displayMessage, setDisplayMessage] = useState<string | undefined>(message);

    useEffect(() => {
        if (!initialSeconds) {
            setDisplayMessage(message);
            return;
        }

        setDisplayMessage(`Too many login attempts. Please try again in ${initialSeconds} seconds.`);

        let seconds = initialSeconds;

        const interval = setInterval(() => {
            if (seconds && seconds > 1) {
                seconds -= 1;
                setDisplayMessage(`Too many login attempts. Please try again in ${seconds} seconds.`);
            } else {
                clearInterval(interval);
                setDisplayMessage('You can try again now.');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [message, initialSeconds]);



    return message ? (
        <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)}>
            {displayMessage}
        </p>
    ) : null;
}
