export const preprocessImage = (imageData: string): Promise<string> => {
    const img = new Image();
    img.src = imageData;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise(resolve => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx?.drawImage(img, 0, 0);

            if (ctx) {
                const imageDataObj = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
                const data = imageDataObj.data;

                // grayscale + threshold
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const gray = 0.3 * r + 0.59 * g + 0.11 * b;
                    const val = gray > 128 ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = val;
                }
                ctx.putImageData(imageDataObj, 0, 0);
            }

            resolve(canvas.toDataURL('image/png'));
        };
    });
};
