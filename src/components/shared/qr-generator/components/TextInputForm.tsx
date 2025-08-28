import { Textarea } from '@/components/ui/textarea';

export function TextInputForm({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <Textarea
            placeholder="Enter any text..."
            value={value}
            onChange={e => onChange(e.target.value)}
            className="min-h-24 resize-none"
            maxLength={1000}
        />
    );
}
