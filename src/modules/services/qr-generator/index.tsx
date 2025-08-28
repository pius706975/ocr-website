'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRGenerator } from '@/components/shared/qr-generator/QRGenerator';

export default function QRGeneratorPage() {
    const [initialText, setInitialText] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const text = searchParams.get('text');
        if (text) {
            setInitialText(decodeURIComponent(text));
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="font-heading font-bold text-3xl mb-4">
                            QR Code Generator
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Generate QR codes from text, URLs, and other data
                            with customizable options
                        </p>
                    </div>

                    <QRGenerator initialText={initialText} />
                </div>
            </div>
        </div>
    );
}
