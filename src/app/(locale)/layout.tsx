import { Navbar } from '@/components/layouts/Navbar/Navbar';
import ClientProvider from '../ClientProvider';
import OpencvProvider from './OpenCVProvider';
import Footer from '@/components/layouts/Footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
    return (
        <ClientProvider>
            <Navbar />
            <div className="bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px] px-10">
                {children}
            </div>
            <Footer />

            <OpencvProvider />
        </ClientProvider>
    );
};

export default PageLayout;
