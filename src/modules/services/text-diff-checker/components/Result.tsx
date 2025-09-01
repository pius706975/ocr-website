'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { createTwoFilesPatch } from 'diff';
import { html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import { useEffect, useState } from 'react';

interface ResultTextProps {
    original: string;
    modified: string;
}

const ResultText = ({ original, modified }: ResultTextProps) => {
    const hasComparison = original || modified;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const generateDiffHtml = () => {
        const diffString = createTwoFilesPatch(
            'Original',
            'Modified',
            original || '',
            modified || '',
        );

        return html(diffString, {
            drawFileList: false,
            matching: 'words',
            outputFormat: isMobile ? 'line-by-line' : 'side-by-side',
        });
    };

    return (
        <section id="result-text">
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Comparison Results</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {hasComparison ? (
                        <div
                            className="diff-container"
                            dangerouslySetInnerHTML={{
                                __html: generateDiffHtml(),
                            }}
                        />
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium mb-2">
                                No comparison yet
                            </p>
                            <p>
                                {`Enter text in both fields and click "Compare Texts" to see the differences.`}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default ResultText;
