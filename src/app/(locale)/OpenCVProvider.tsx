'use client';

import { useEffect } from 'react';

const OpencvProvider = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://docs.opencv.org/4.x/opencv.js';
        script.async = true;

        script.onload = () => {
            console.log('OpenCV loaded ✅');
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default OpencvProvider;
