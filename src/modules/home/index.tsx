import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Scan, QrCode, ArrowRight, ScanQrCode } from 'lucide-react';

const Home = () => {
    const services = [
        {
            title: 'Image to Text',
            description:
                'Extract text from images, books, and documents using advanced OCR technology',
            icon: Scan,
            href: '/text-scanner',
            color: 'text-cyan-500',
        },
        {
            title: 'QR Generator',
            description:
                'Generate QR codes from text, URLs, and other data with customizable options',
            icon: QrCode,
            href: '/qr-generator',
            color: 'text-emerald-500',
        },
        {
            title: 'QR & Barcode Scanner',
            description:
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            icon: ScanQrCode,
            href: '/code-scanner',
            color: 'text-purple-500',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 text-balance">
                        Scan, Edit, and Generate with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                            Scan Pro
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 text-pretty">
                        Simplify your workflow with fast, flexible tools for
                        scanning, editing, and generating — all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/text-scanner">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#services">Explore Services</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-bold text-3xl mb-4">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Choose from our suite of powerful tools designed to
                        streamline your text processing needs
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map(service => (
                        <Card
                            key={service.href}
                            className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                            <CardHeader>
                                <div
                                    className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <service.icon
                                        className={`h-6 w-6 ${service.color}`}
                                    />
                                </div>
                                <CardTitle className="text-xl">
                                    {service.title}
                                </CardTitle>
                                <CardDescription className="text-pretty">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild className="w-full">
                                    <Link href={service.href}>
                                        Try {service.title}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
