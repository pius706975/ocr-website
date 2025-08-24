'use client';

import * as React from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

export function ModeToggle({ className }: Props) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={className}>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    'bg-white dark:bg-black rounded-full shadow-md cursor-pointer',
                    'active:bg-black active:text-white dark:active:bg-white dark:active:text-black',
                )}
                onClick={toggleTheme}>
                <SunMedium className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <MoonStar className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}
