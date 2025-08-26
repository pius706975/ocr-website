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
                const thresh = new cv.Mat();
                const opened = new cv.Mat();
                const closed = new cv.Mat();
                const sharpened = new cv.Mat();
                const resized = new cv.Mat();

                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

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
