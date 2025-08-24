import Loader from 'nextjs-toploader';
import '@/styles/globals.css';
import type { ChildrenProps } from '@/interfaces/components';
import { cn } from '@/lib/utils';
import 'aos/dist/aos.css';
import Init from './Init';
import { commissioner } from '@/lib/font';
import { Toaster } from '../ui/sonner';

export interface RootProps extends ChildrenProps {
    className?: string;
}

export default function Root({ children, className }: RootProps) {
    return (
        <html
            lang="en"
            suppressContentEditableWarning
            suppressHydrationWarning
            translate="no"
            className="scroll-smooth notranslate">
            <body
                className={cn(
                    commissioner.variable,
                    'antialiased scroll-smooth',
                    className,
                    commissioner.className,
                )}>
                <Loader
                    color="#05b6d3"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl
                    showSpinner
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
                />
                <Init />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
