
import TextScanner from '@/modules/services/text-scanner';
import { Metadata } from 'next';

const Page = () => {
    return <TextScanner />;
};

export default Page;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Text Scanner',
        description: 'Text Scanner Pro',
        openGraph: {
            title: 'Text scanner service',
            description:
                'Scan your document and get the text',
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
            'Text scanner',
            'Free text scanner',
            'Free image to text',
            'Image to text',
            'Scan image to text',
        ],
    };
};
