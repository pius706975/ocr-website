'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';
import ScannerHeader from './Header';
import Instruction from './Instruction';
import Tesseract from 'tesseract.js';
import CameraModal from './CameraModal';
import { preprocessImage } from './utils';

interface ScanResult {
    id: string;
    text: string;
    timestamp: Date;
    confidence: number;
}

interface TextScannerProps {
    onTextScanned?: (text: string) => void;
}

const TextScanner = ({ onTextScanned }: TextScannerProps) => {
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cameraModalOpen, setCameraModalOpen] = useState(false);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    const runOCR = async (imageData: string): Promise<ScanResult> => {
        const { data } = await Tesseract.recognize(imageData, 'eng');
        return {
            id: Date.now().toString(),
            text: data.text.trim(),
            timestamp: new Date(),
            confidence: Math.round(data.confidence),
        };
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async e => {
                const imageData = e.target?.result as string;
                await processImage(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = async (imageData: string) => {
        setIsScanning(true);
        try {
            setOriginalImage(imageData);

            const cleaned = await preprocessImage(imageData);
            setProcessedImage(cleaned);

            const result = await runOCR(cleaned);

            if (onTextScanned) {
                onTextScanned(result.text);
            }
        } catch (error) {
            console.error('OCR failed:', error);
        } finally {
            setIsScanning(false);
        }
    };

    const handleCapture = async (imageData: string) => {
        await processImage(imageData);
    };

    return (
        <div className="min-h-screen bg-background">
            <ScannerHeader />

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-1 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-heading flex items-center gap-2">
                                    <Camera className="h-5 w-5" />
                                    Scan Text
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {originalImage && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <img
                                                src={originalImage}
                                                alt="Original"
                                                className="w-full rounded-lg max-h-64 object-contain bg-muted"
                                            />
                                            <p className="text-center text-xs text-muted-foreground mt-1">
                                                Original
                                            </p>
                                        </div>

                                        {processedImage && (
                                            <div className="relative">
                                                <img
                                                    src={processedImage}
                                                    alt="Processed"
                                                    className="w-full rounded-lg max-h-64 object-contain bg-muted"
                                                />
                                                <p className="text-center text-xs text-muted-foreground mt-1">
                                                    Auto Cleaned
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <>
                                        <Button
                                            onClick={() =>
                                                setCameraModalOpen(true)
                                            }
                                            className="flex-1"
                                            disabled={isScanning}>
                                            <Camera className="h-4 w-4 mr-2" />
                                            Open Camera
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="flex-1"
                                            disabled={isScanning}>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Image
                                        </Button>
                                    </>
                                </div>

                                <CameraModal
                                    open={cameraModalOpen}
                                    onClose={() => setCameraModalOpen(false)}
                                    onCapture={handleCapture}
                                />

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </CardContent>
                        </Card>

                        <Instruction />
                    </div>
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default TextScanner;
