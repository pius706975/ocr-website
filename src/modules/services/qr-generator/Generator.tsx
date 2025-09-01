'use client'

import { QRGenerator } from "@/components/shared/qr-generator/QRGenerator";
import { useState } from "react";

const Generator = () => {
    const [initialText] = useState('');

    return (
        <main className="min-h-screen">
            <div className="container mx-auto sm:px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <QRGenerator initialText={initialText} />
                </div>
            </div>
        </main>
    );
};

export default Generator;
