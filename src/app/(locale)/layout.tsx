import Script from 'next/script';
import ClientProvider from '../ClientProvider';

interface LayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
    return (
        <ClientProvider>
            <div className="bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px]">
                {children}
            </div>

            <Script
                src="https://docs.opencv.org/4.x/opencv.js"
                strategy="beforeInteractive"
            />
        </ClientProvider>
    );
};

export default PageLayout;
