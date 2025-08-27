export const preprocessImage = (imageData: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageData;

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);

                const src = cv.imread(canvas);

                let processed;
                try {
                    processed = deskew(src);
                } catch (deskewError) {
                    console.warn('Deskew failed, using original:', deskewError);
                    processed = src.clone();
                }

                const gray = new cv.Mat();
                const thresh = new cv.Mat();
                const opened = new cv.Mat();
                const closed = new cv.Mat();
                const sharpened = new cv.Mat();
                const resized = new cv.Mat();

                cv.cvtColor(processed, gray, cv.COLOR_RGBA2GRAY);

                cv.adaptiveThreshold(
                    gray,
                    thresh,
                    255,
                    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                    cv.THRESH_BINARY,
                    35,
                    15,
                );

                const kernel = cv.getStructuringElement(
                    cv.MORPH_RECT,
                    new cv.Size(2, 2),
                );
                cv.morphologyEx(thresh, opened, cv.MORPH_OPEN, kernel);

                cv.morphologyEx(opened, closed, cv.MORPH_CLOSE, kernel);

                const kernelSharpen = cv.matFromArray(
                    3,
                    3,
                    cv.CV_32F,
                    [0, -1, 0, -1, 5, -1, 0, -1, 0],
                );
                cv.filter2D(closed, sharpened, cv.CV_8U, kernelSharpen);

                cv.resize(
                    sharpened,
                    resized,
                    new cv.Size(0, 0),
                    3,
                    3,
                    cv.INTER_CUBIC,
                );

                cv.imshow(canvas, resized);

                src.delete();
                processed.delete();
                gray.delete();
                thresh.delete();
                opened.delete();
                closed.delete();
                sharpened.delete();
                resized.delete();
                kernel.delete();
                kernelSharpen.delete();

                resolve(canvas.toDataURL('image/png'));
            } catch (err) {
                reject(err);
            }
        };

        img.onerror = err => reject(err);
    });
};

const deskew = (src: any): any => {
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    const binary = new cv.Mat();
    cv.threshold(gray, binary, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);

    const edges = new cv.Mat();
    cv.Canny(binary, edges, 50, 200, 3, false);

    const lines = new cv.Mat();
    cv.HoughLines(edges, lines, 1, Math.PI / 180, 150);

    const angles: number[] = [];
    for (let i = 0; i < lines.rows; i++) {
        const theta = lines.data32F[i * 2 + 1];
        if (theta > Math.PI / 4 && theta < (3 * Math.PI) / 4) {
            const angleDeg = (theta * 180) / Math.PI - 90;
            angles.push(angleDeg);
        }
    }

    let angle = 0;
    if (angles.length > 0) {
        angles.sort((a, b) => a - b);
        angle = angles[Math.floor(angles.length / 2)];
    }

    const center = new cv.Point(src.cols / 2, src.rows / 2);
    const M = cv.getRotationMatrix2D(center, angle, 1.0);
    const rotated = new cv.Mat();
    cv.warpAffine(
        src,
        rotated,
        M,
        new cv.Size(src.cols, src.rows),
        cv.INTER_CUBIC,
        cv.BORDER_REPLICATE,
    );

    gray.delete();
    binary.delete();
    edges.delete();
    lines.delete();
    M.delete();
    return rotated;
};
