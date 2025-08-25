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
                const gray = new cv.Mat();
                const resized = new cv.Mat();
                const denoise = new cv.Mat();
                const thresh = new cv.Mat();

                cv.resize(
                    src,
                    resized,
                    new cv.Size(src.cols * 2, src.rows * 2),
                    0,
                    0,
                    cv.INTER_CUBIC,
                );

                cv.cvtColor(resized, gray, cv.COLOR_RGBA2GRAY);

                cv.bilateralFilter(gray, denoise, 9, 75, 75);

                cv.threshold(
                    denoise,
                    thresh,
                    0,
                    255,
                    cv.THRESH_BINARY + cv.THRESH_OTSU,
                );

                const kernel = cv.getStructuringElement(
                    cv.MORPH_RECT,
                    new cv.Size(2, 2),
                );
                cv.morphologyEx(thresh, thresh, cv.MORPH_CLOSE, kernel);

                cv.imshow(canvas, thresh);

                src.delete();
                gray.delete();
                resized.delete();
                denoise.delete();
                kernel.delete();
                thresh.delete();

                resolve(canvas.toDataURL('image/png'));
            } catch (err) {
                reject(err);
            }
        };

        img.onerror = err => reject(err);
    });
};
