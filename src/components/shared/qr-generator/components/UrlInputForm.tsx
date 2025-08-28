import { Input } from '@/components/ui/input';

export function UrlInputForm({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <Input
            type="url"
            placeholder="https://example.com"
            value={value}
            onChange={e => onChange(e.target.value)}
            maxLength={500}
        />
    );
}
