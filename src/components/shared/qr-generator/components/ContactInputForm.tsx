import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

export function ContactInputForm({
    onChange,
}: {
    onChange: (val: string) => void;
}) {
    const [fullName, setFullName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [socialMedia, setSocialMedia] = useState('');

    useEffect(() => {
        const prefixFullName = [prefix, fullName].filter(Boolean).join('. ');

        const vcardLines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN: ${prefixFullName}`,
        ];

        const fields = [
            { key: 'title', value: title },
            { key: 'organization', value: organization },
            { key: 'email', value: email },
            { key: 'phone', value: phone },
            { key: 'mobilePhone', value: mobilePhone },
            { key: 'address', value: address },
            { key: 'city', value: city },
            { key: 'region', value: region },
            { key: 'country', value: country },
            { key: 'postCode', value: postCode },
            { key: 'socialMedia', value: socialMedia },
        ];

        fields.forEach(({ key, value }) => {
            if (!value) return;

            switch (key) {
                case 'title':
                    vcardLines.push(`TITLE: ${value}`);
                    break;
                case 'organization':
                    vcardLines.push(`ORG: ${value}`);
                    break;
                case 'email':
                    vcardLines.push(`EMAIL:${value}`);
                    break;
                case 'phone':
                    vcardLines.push(`TEL;TYPE=HOME,VOICE:${value}`);
                    break;
                case 'mobilePhone':
                    vcardLines.push(`TEL;TYPE=CELL,VOICE:${value}`);
                    break;
                case 'address':
                case 'city':
                case 'region':
                case 'country':
                case 'postCode': {
                    break;
                }
                case 'socialMedia':
                    vcardLines.push(`URL:${value}`);
                    break;
            }
        });

        if (address || city || region || postCode || country) {
            const adrParts = [
                '',
                '',
                address || '',
                city || '',
                region || '',
                postCode || '',
                country || '',
            ];
            vcardLines.push(`ADR:;;${adrParts.slice(2).join(';')}`);
        }

        vcardLines.push('END:VCARD');

        onChange(vcardLines.join('\n'));
    }, [
        fullName,
        prefix,
        title,
        organization,
        email,
        phone,
        mobilePhone,
        address,
        city,
        region,
        postCode,
        country,
        socialMedia,
        onChange,
    ]);

    const forms = [
        {
            label: 'Full Name',
            value: fullName,
            onChange: (e: any) => setFullName(e.target.value),
            placeholders: 'John Doe',
        },
        {
            label: 'Prefix',
            value: prefix,
            onChange: (e: any) => setPrefix(e.target.value),
            placeholders: 'E.g., Mr, Mrs, Miss.',
        },
        {
            label: 'Title',
            value: title,
            onChange: (e: any) => setTitle(e.target.value),
            placeholders: '',
        },
        {
            label: 'Organization',
            value: organization,
            onChange: (e: any) => setOrganization(e.target.value),
            placeholders: '',
        },
        {
            label: 'Email',
            value: email,
            onChange: (e: any) => setEmail(e.target.value),
            placeholders: 'johndoe@email.com',
        },
        {
            label: 'Phone',
            value: phone,
            onChange: (e: any) => setPhone(e.target.value),
            placeholders: '',
        },
        {
            label: 'Mobile Phone',
            value: mobilePhone,
            onChange: (e: any) => setMobilePhone(e.target.value),
            placeholders: '',
        },
        {
            label: 'Address',
            value: address,
            onChange: (e: any) => setAddress(e.target.value),
            placeholders: '',
        },
        {
            label: 'City',
            value: city,
            onChange: (e: any) => setCity(e.target.value),
            placeholders: '',
        },
        {
            label: 'Region',
            value: region,
            onChange: (e: any) => setRegion(e.target.value),
            placeholders: '',
        },
        {
            label: 'Country',
            value: country,
            onChange: (e: any) => setCountry(e.target.value),
            placeholders: '',
        },
        {
            label: 'PostCode',
            value: postCode,
            onChange: (e: any) => setPostCode(e.target.value),
            placeholders: '',
        },
        {
            label: 'Website/Social Media/URL',
            value: socialMedia,
            onChange: (e: any) => setSocialMedia(e.target.value),
            placeholders: '',
        },
    ];

    return (
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
            {forms.map((items, i) => (
                <div key={i} className="grid gap-1">
                    <Label>{items.label}</Label>
                    <Input
                        value={items.value}
                        onChange={items.onChange}
                        placeholder={items.placeholders}
                    />
                </div>
            ))}
        </div>
    );
}
