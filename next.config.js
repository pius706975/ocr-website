/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        // domains: ['res.cloudinary.com']
    },

    productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
