'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Home, Menu, QrCode, Scan } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ModeToggle } from '../DarkLightToogle';
import ScanProLogo from '@/components/shared/svg/ScanProLogo';

const NavContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const services = [
        {
            name: 'Image to Text',
            href: '/text-scanner',
            icon: Scan,
            description: 'OCR text scanning from images',
        },
        {
            name: 'QR Generator',
            href: '/qr-generator',
            icon: QrCode,
            description: 'Generate QR codes from text and URLs',
        },
        {
            name: 'QR & Barcode Scanner',
            href: '/code-scanner',
            icon: QrCode,
            description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
        },
    ];

    return (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ScanProLogo/>
                                    </div>
                                    <div>
                                        <h1 className="font-heading font-bold text-xl">
                                            Scan Pro
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <ModeToggle />
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                pathname === '/'
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                            }`}>
                            Home
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1">
                                    Services
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {services.map(service => (
                                    <DropdownMenuItem
                                        key={service.href}
                                        asChild>
                                        <Link
                                            href={service.href}
                                            className="flex items-center gap-3 p-3">
                                            <service.icon className="h-4 w-4 text-primary" />
                                            <div>
                                                <div className="font-medium">
                                                    {service.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {service.description}
                                                </div>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex items-center justify-between mb-6">
                                <ModeToggle />
                            </div>

                            <nav className="space-y-4">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                        pathname === '/'
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-muted'
                                    }`}>
                                    <Home className="h-5 w-5" />
                                    <span className="font-medium">Home</span>
                                </Link>

                                <div className="space-y-2">
                                    <h3 className="font-medium text-sm text-muted-foreground px-3">
                                        Services
                                    </h3>
                                    {services.map(service => (
                                        <Link
                                            key={service.href}
                                            href={service.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                                pathname === service.href
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'hover:bg-muted'
                                            }`}>
                                            <service.icon className="h-5 w-5" />
                                            <div>
                                                <div className="font-medium">
                                                    {service.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {service.description}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default NavContent;
