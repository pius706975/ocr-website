'use client';

import { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Scan, X } from 'lucide-react';

interface CameraModalProps {
    open: boolean;
    onClose: () => void;
    onCapture: (image: string) => void;
}

const CameraModal = ({ open, onClose, onCapture }: CameraModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (open) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [open]);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                await videoRef.current.play();
            }
        } catch (err) {
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureImage = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg');
            onCapture(imageData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" /> Scan with Camera
                    </DialogTitle>
                </DialogHeader>

                <div className="relative w-full">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none" />
                </div>

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="outline" onClick={onClose}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button onClick={captureImage}>
                        <Scan className="h-4 w-4 mr-1" /> Capture
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CameraModal;
