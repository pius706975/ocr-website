import TextDiffPage from '@/modules/services/text-diff-checker';
import { Metadata } from 'next';

const Page = () => {
    return <TextDiffPage />;
};

export default Page;

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Text Diff Checker',
        description: 'Text difference checker',
        openGraph: {
            title: 'Diffchecker',
            description: 'Free text difference checker',
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
            'Text diff checker',
            'Text comparison',
            'Free text checker',
            'Free text difference checker',
            'Free compare text'
        ],
    };
};
