import Home from '@/modules';
import { Metadata } from 'next';

const Page = () => {
    return <Home />;
};

export default Page;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Scan Pro',
        description: 'Text Scan Pro',
        openGraph: {
            title: 'Scan Pro App',
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
