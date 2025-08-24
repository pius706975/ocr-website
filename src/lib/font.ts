import { Geist, Geist_Mono, Commissioner } from 'next/font/google';

export const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const commissioner = Commissioner({
    variable: '--font-commissioner',
    subsets: ['latin'],
});
