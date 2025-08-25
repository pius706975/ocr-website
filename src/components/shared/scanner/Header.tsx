import { ModeToggle } from '@/components/layouts/DarkLightToogle';
import { Scan } from 'lucide-react';

const ScannerHeader = () => {
    return (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Scan className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-xl">
                                Scan Pro
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                OCR Text Scanner
                            </p>
                        </div>
                    </div>

                    <ModeToggle className='hidden sm:block' />
                </div>
            </div>
        </header>
    );
};

export default ScannerHeader;
