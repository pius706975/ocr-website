'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, FileText, QrCode, ArrowLeft } from 'lucide-react';
import ScanProLogo from '@/components/shared/svg/ScanProLogo';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <ScanProLogo className="h-16 w-16 text-primary" />
                        </div>

                        <h1 className="font-heading font-bold text-6xl mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            404
                        </h1>

                        <h2 className="font-heading font-bold text-3xl mb-4 text-foreground">
                            Page Not Found
                        </h2>

                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            {`Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.`}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90"
                                onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Previous Page
                            </Button>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground">
                            Need help? Contact us or visit our{' '}
                            <Link
                                href="/"
                                className="text-primary hover:underline font-medium">
                                homepage
                            </Link>{' '}
                            to explore all features.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
