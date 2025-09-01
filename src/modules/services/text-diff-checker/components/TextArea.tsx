import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ClipboardPaste, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    type?: 'original' | 'modified';
    text: string;
    onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickClear: () => void;
}

const TextAreaCard = ({
    type = 'original',
    text,
    onChangeTextArea,
    onClickClear,
}: Props) => {
    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (clipboardText) {
                onChangeTextArea({
                    target: { value: text + clipboardText },
                } as React.ChangeEvent<HTMLTextAreaElement>);
                toast.success('Pasted from clipboard!');
            } else {
                toast.error('Clipboard is empty!');
            }
        } catch (err) {
            toast.error(`Failed to read clipboard!: ${err}`);
        }
    };

    return (
        <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div
                        className={cn(
                            'w-3 h-3 rounded-full',
                            type === 'original'
                                ? 'bg-red-500 '
                                : 'bg-green-500',
                        )}
                    />
                    {type === 'original' ? 'Original' : 'Modified'} Text
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    placeholder="Paste your original text here..."
                    className="min-h-[300px] resize-none font-mono text-sm"
                    value={text}
                    onChange={onChangeTextArea}
                />
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePaste}>
                            <ClipboardPaste className="h-4 w-4 mr-2" />
                            Paste
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClickClear}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                    <Badge variant="secondary">{text.length} characters</Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default TextAreaCard;
