import ClientProvider from '../ClientProvider';
import OpencvProvider from './OpenCVProvider';

interface LayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
    return (
        <ClientProvider>
            <div className="bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px]">
                {children}
            </div>

            <OpencvProvider />
        </ClientProvider>
    );
};

export default PageLayout;
