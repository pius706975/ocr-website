'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    ChevronDown,
    Home,
    LucideGitCompareArrows,
    Menu,
    QrCode,
    Scan,
    ToolCase,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ModeToggle } from '../DarkLightToogle';
import ScanProLogo from '@/components/shared/svg/ScanProLogo';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const NavContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            name: 'Home',
            href: '/',
            icon: Home,
        },
        {
            name: 'Services',
            icon: ToolCase,
            children: [
                {
                    name: 'Image to Text (Beta)',
                    href: '/services/text-scanner',
                    icon: Scan,
                    description: 'OCR text scanning from images',
                },
                {
                    name: 'QR Generator',
                    href: '/services/qr-generator',
                    icon: QrCode,
                    description: 'Generate QR codes from text and URLs',
                },
                {
                    name: 'Text Diff Checker',
                    href: '/services/text-diff-checker',
                    icon: LucideGitCompareArrows,
                    description:
                        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
                },
            ],
        },
    ];

    return (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto sm:px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ScanProLogo />
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
                        {navItems.map(item =>
                            item.children ? (
                                <DropdownMenu key={item.name}>
                                    <DropdownMenuTrigger asChild>
                                        <span
                                            // variant="ghost"
                                            className="flex items-center gap-1 cursor-pointer hover:text-gray-700 dark:hover:text-[#737ED9]">
                                            {item.name}
                                            <ChevronDown className="h-4 w-4" />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56">
                                        {item.children.map(sub => (
                                            <DropdownMenuItem
                                                key={sub.href}
                                                asChild>
                                                <Link
                                                    href={sub.href}
                                                    className="flex items-center gap-3 p-3">
                                                    <sub.icon className="h-4 w-4 text-primary" />
                                                    <div>
                                                        <div className="font-medium">
                                                            {sub.name}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {sub.description}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href!}
                                    className={`text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-[#737ED9] ${
                                        pathname === item.href
                                            ? 'text-primary'
                                            : 'text-primary'
                                    }`}>
                                    {item.name}
                                </Link>
                            ),
                        )}
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <ModeToggle className="sm:hidden" />
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex items-center justify-between mb-6" />

                            <nav className="space-y-4">
                                {navItems.map(item =>
                                    item.children ? (
                                        <Accordion
                                            key={item.name}
                                            type="single"
                                            collapsible>
                                            <AccordionItem value={item.name}>
                                                <AccordionTrigger className="px-3 py-2 font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="h-5 w-5" />
                                                        {item.name}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="space-y-2 bg-gray-100 dark:bg-gray-900">
                                                    {item.children.map(sub => (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            onClick={() =>
                                                                setIsOpen(false)
                                                            }
                                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                                                pathname ===
                                                                sub.href
                                                                    ? 'bg-primary/10 text-primary'
                                                                    : 'hover:bg-muted'
                                                            }`}>
                                                            <sub.icon className="h-5 w-5" />
                                                            <div>
                                                                <div className="font-medium">
                                                                    {sub.name}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {
                                                                        sub.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Link
                                            key={item.href}
                                            href={item.href!}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                                pathname === item.href
                                                    ? 'text-primary'
                                                    : 'hover:bg-muted'
                                            }`}>
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">
                                                {item.name}
                                            </span>
                                        </Link>
                                    ),
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default NavContent;
