'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Copy, Smartphone } from 'lucide-react';
import Instructions from './components/Instructions';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ContentType, contentTypes } from './components/ContentTypes';
import { TextInputForm } from './components/TextInputForm';
import { UrlInputForm } from './components/UrlInputForm';
import { ContactInputForm } from './components/ContactInputForm';

interface QRGeneratorProps {
    initialText?: string;
}

export function QRGenerator({ initialText }: QRGeneratorProps) {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<
        'L' | 'M' | 'Q' | 'H'
    >('M');
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const [downloadSize, setDownloadSize] = useState(256);
    const [transparentBg, setTransparentBg] = useState(false);
    const [inputType, setInputType] = useState<ContentType>('text');
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setInputText('');
    }, [inputType]);

    const generateQRCode = async (text: string) => {
        if (!text.trim()) {
            setQrCodeDataUrl('');
            return;
        }

        setIsGenerating(true);
        try {
            // Dynamic import to avoid SSR issues
            const QRCode = (await import('qrcode')).default;

            const canvas = canvasRef.current;
            if (canvas) {
                await QRCode.toCanvas(canvas, text, {
                    errorCorrectionLevel,
                    width: 256,
                    margin: 2,
                    color: {
                        dark: '#0F172A',
                        light: '#0000',
                    },
                });
                setQrCodeDataUrl(canvas.toDataURL());
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (initialText) {
            setInputText(initialText);
        }
    }, [initialText]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            generateQRCode(inputText);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [inputText, errorCorrectionLevel]);

    const handleDownload = async () => {
        if (!inputText.trim()) return;

        try {
            const QRCode = (await import('qrcode')).default;
            const tempCanvas = document.createElement('canvas');

            await QRCode.toCanvas(tempCanvas, inputText, {
                errorCorrectionLevel,
                width: downloadSize,
                margin: 2,
                color: {
                    dark: '#0F172A',
                    light: transparentBg ? '#0000' : '#FFFFFF',
                },
            });

            const dataUrl = tempCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            setDownloadOpen(false);
        } catch (err) {
            console.error('Error generating QR for download:', err);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inputText);
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const getQRStats = () => {
        const charCount = inputText.length;
        const urlValid = inputType === 'url' ? isValidUrl(inputText) : null;

        return {
            charCount,
            urlValid,
            estimatedSize:
                charCount < 50 ? 'Small' : charCount < 200 ? 'Medium' : 'Large',
        };
    };

    const stats = getQRStats();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        QR Code Generator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Input Type Selection */}
                    <div className="space-y-2">
                        <Label>Content Type</Label>
                        <Select
                            value={inputType}
                            onValueChange={(val: ContentType) =>
                                setInputType(val)
                            }>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {contentTypes.map(
                                    ({ value, label, icon: Icon }) => (
                                        <SelectItem key={value} value={value}>
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                {label}
                                            </div>
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Text Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="qr-input">
                                {inputType === 'url'
                                    ? 'Website URL'
                                    : 'Text Content'}
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyToClipboard}
                                disabled={!inputText.trim()}>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                            </Button>
                        </div>
                        {inputType === 'text' && (
                            <TextInputForm
                                value={inputText}
                                onChange={setInputText}
                            />
                        )}
                        {inputType === 'url' && (
                            <UrlInputForm
                                value={inputText}
                                onChange={setInputText}
                            />
                        )}
                        {inputType === 'contact' && (
                            <ContactInputForm onChange={setInputText} />
                        )}

                        {/* Input Stats */}
                        <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="text-xs">
                                {stats.charCount} characters
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {stats.estimatedSize} QR
                            </Badge>
                            {inputType === 'url' && inputText.trim() && (
                                <Badge
                                    variant={
                                        stats.urlValid
                                            ? 'default'
                                            : 'destructive'
                                    }
                                    className="text-xs">
                                    {stats.urlValid
                                        ? 'Valid URL'
                                        : 'Invalid URL'}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* QR Code Settings */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Error Correction</Label>
                            <Select
                                value={errorCorrectionLevel}
                                onValueChange={(value: 'L' | 'M' | 'Q' | 'H') =>
                                    setErrorCorrectionLevel(value)
                                }>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Low (7%)</SelectItem>
                                    <SelectItem value="M">
                                        Medium (15%)
                                    </SelectItem>
                                    <SelectItem value="Q">
                                        Quartile (25%)
                                    </SelectItem>
                                    <SelectItem value="H">
                                        High (30%)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* QR Code Preview */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        QR Code Preview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {inputText.trim() ? (
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <canvas
                                        ref={canvasRef}
                                        className="border rounded-lg bg-white max-w-full h-auto"
                                        style={{ maxWidth: '1000px' }}
                                    />
                                    {isGenerating && (
                                        <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                                Generating...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    onClick={() => setDownloadOpen(true)}
                                    disabled={!qrCodeDataUrl || isGenerating}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download QR Code
                                </Button>

                                <Dialog
                                    open={downloadOpen}
                                    onOpenChange={setDownloadOpen}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Download Options
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Size</Label>
                                                <Select
                                                    value={downloadSize.toString()}
                                                    onValueChange={value =>
                                                        setDownloadSize(
                                                            Number.parseInt(
                                                                value,
                                                            ),
                                                        )
                                                    }>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="128">
                                                            Small (128px)
                                                        </SelectItem>
                                                        <SelectItem value="256">
                                                            Medium (256px)
                                                        </SelectItem>
                                                        <SelectItem value="512">
                                                            Large (512px)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="transparent-bg"
                                                    checked={transparentBg}
                                                    onCheckedChange={checked =>
                                                        setTransparentBg(
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="transparent-bg">
                                                    Transparent background
                                                </Label>
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button onClick={handleDownload}>
                                                Download
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <QrCode className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">
                                Enter text or URL above
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                QR code will appear here automatically
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Instructions */}
            <Instructions />
        </div>
    );
}
