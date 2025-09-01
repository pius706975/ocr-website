import QRGeneratorPage from '@/modules/services/qr-generator';
import { Metadata } from 'next';

const Page = () => {
    return <QRGeneratorPage />;
};

export default Page;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'QR Generator',
        description: 'QR Generator by Scan Pro',
        openGraph: {
            title: 'QR Generator',
            description: 'Create your QR code with your data',
            images: {
                url: '',
                width: 1200,
                height: 630,
                alt: '',
                type: 'image/png',
            },
            type: 'website',
            url: '',
            siteName: 'Scan Pro',
            locale: 'en-EN',
            countryName: 'Indonesia',
        },
        alternates: {
            canonical: ``,
            languages: {
                'en-US': `baseUrl/en`,
            },
        },
        keywords: [
            'QR Generator',
            'Free QR Generator',
            'Free QR Code Generator',
        ],
    };
};
