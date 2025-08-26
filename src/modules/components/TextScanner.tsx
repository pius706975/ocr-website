'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, FileText } from 'lucide-react';
import TextScanner from '@/components/shared/scanner/TextScanner';
import SlateEditor from '@/components/shared/text.editor/SlateEditor';
import { ModeToggle } from '@/components/layouts/DarkLightToogle';

const Scanner = () => {
    const [scannedText, setScannedText] = useState<string>('');
    const [activeTab, setActiveTab] = useState('scanner');

    const handleTextScanned = (text: string) => {
        setScannedText(text);
        setActiveTab('editor');
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile*/}
            <div className="block lg:hidden">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="h-screen flex flex-col">
                    <div className="border-b bg-card/50 backdrop-blur-sm px-4 py-2">
                        <div className="flex items-center justify-between">
                            <TabsList className="grid grid-cols-2 w-[80%]">
                                <TabsTrigger
                                    value="scanner"
                                    className="flex items-center gap-2">
                                    <Camera className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Scanner
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="editor"
                                    className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Editor
                                    </span>
                                </TabsTrigger>
                            </TabsList>

                            <ModeToggle />
                        </div>
                    </div>

                    <TabsContent value="scanner" className="flex-1 m-0">
                        <TextScanner onTextScanned={handleTextScanned} />
                    </TabsContent>

                    <TabsContent value="editor" className="flex-1 m-0 p-4">
                        <SlateEditor
                            initialText={scannedText}
                            onChangeText={setScannedText}
                            editorTitle="Scanned Results"
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="grid lg:grid-cols-2 h-screen">
                    <div className="border-r">
                        <TextScanner onTextScanned={handleTextScanned} />
                    </div>
                    <div className="p-6">
                        <SlateEditor
                            initialText={scannedText}
                            onChangeText={setScannedText}
                            editorTitle="Scanned Results"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
