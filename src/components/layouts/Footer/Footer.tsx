import { Shield, Smartphone, Zap } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Process images and generate QR codes in seconds',
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'All processing happens locally in your browser',
    },
    {
        icon: Smartphone,
        title: 'Mobile Ready',
        description: 'Works perfectly on all devices and screen sizes',
    },
];

const Footer = () => {
    return (
        <section className="bg-muted/50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-bold text-3xl mb-4">
                        Why Choose Scan Pro?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Built with modern technology and user experience in mind
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <div key={feature.title} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Footer;
