'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import TextAreaCard from './TextArea';
import { toast } from 'sonner';

interface CompareTextProps {
    onCompare: (original: string, modified: string) => void;
}

const CompareText = ({ onCompare }: CompareTextProps) => {
    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');

    const clearMessage = (text: string) => {
        return text !== ''
            ? toast.success('Clipboard cleared')
            : toast.info('Clipboard is already cleared');
    };

    return (
        <section className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <TextAreaCard
                    text={originalText}
                    onChangeTextArea={e => setOriginalText(e.target.value)}
                    onClickClear={() => {
                        setOriginalText('');
                        clearMessage(originalText);
                    }}
                />

                <TextAreaCard
                    type="modified"
                    text={modifiedText}
                    onChangeTextArea={e => setModifiedText(e.target.value)}
                    onClickClear={() => {
                        setModifiedText('');
                        clearMessage(modifiedText);
                    }}
                />
            </div>

            <div className="text-center mb-8">
                <Button
                    size="lg"
                    className="px-8 cursor-pointer active:bg-gray-500"
                    onClick={() => onCompare(originalText, modifiedText)}>
                    <FileText className="h-5 w-5 mr-2" />
                    Compare Texts
                </Button>
            </div>
        </section>
    );
};

export default CompareText;
