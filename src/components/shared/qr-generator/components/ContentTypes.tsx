import { Type, Link, IdCard } from 'lucide-react';

export const contentTypes = [
    {
        value: 'text',
        label: 'Plain Text',
        icon: Type,
    },
    {
        value: 'url',
        label: 'URL / Website',
        icon: Link,
    },
    {
        value: 'contact',
        label: 'Contact Card',
        icon: IdCard,
    },
] as const;

export type ContentType = (typeof contentTypes)[number]['value'];
