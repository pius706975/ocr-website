import { Card, CardContent } from '@/components/ui/card';

const Instructions = () => {
    const instructions = [
        {
            index: 1,
            text: 'Choose content type (text or URL) and enter your content',
        },
        {
            index: 2,
            text: 'Adjust error correction and size settings as needed',
        },
        {
            index: 3,
            text: 'Download the generated QR code or scan it with any QR reader',
        },
    ];

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-3">
                    <h3 className="font-heading font-semibold">How to use:</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        {instructions.map(items => (
                            <div
                                key={items.index}
                                className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-medium text-primary">
                                        {items.index}
                                    </span>
                                </div>
                                <span>{items.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Instructions;
