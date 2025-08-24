import type { Metadata } from 'next';
import { ChildrenProps } from '@/interfaces/components';
import Root from '@/components/layouts/Root';
import { ThemeProvider } from '@/components/layouts/ThemeProvider';

export const metadata: Metadata = {
    icons: '/scan.svg',
    title: {
        default: 'Scan Pro App',
        template: '%s - By Pius Restiantoro',
    },
    description: 'Scan Pro App',
    authors: {
        name: 'Scan Pro App',
    },
    applicationName: 'Scan Pro App',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    publisher: 'Scan Pro App',
};

export default function RootLayout({ children }: ChildrenProps) {
    return (
        <Root className="flex flex-col min-h-screen w-full scroll-smooth snap-y snap-mandatory">
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </Root>
    );
}
