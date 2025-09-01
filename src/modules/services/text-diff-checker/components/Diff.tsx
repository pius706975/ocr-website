'use client';

import { useState } from 'react';
import CompareText from './Compare';
import ResultText from './Result';

const Diff = () => {
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    
    return (
        <main>
            <CompareText
                onCompare={(o, m) => {
                    setOriginal(o);
                    setModified(m);
                }}
            />

            <ResultText original={original} modified={modified} />
        </main>
    );
};

export default Diff;
