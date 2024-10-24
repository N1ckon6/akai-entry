const input = document.querySelector('#imageUpload');
const button = document.querySelector('#convertGrayscale');
const imgElement = document.querySelector('#uploadedImage');
const canvasElement = document.querySelector('#grayscaleImage');

input.addEventListener('change', () => {
    const fr = new FileReader();
    fr.readAsDataURL(input.files[0]);

    fr.addEventListener('load', () => {
        imgElement.src = fr.result;
    });
});

button.addEventListener('click', () => {
        convertWithCanvas();
});

function convertWithCanvas() {
    const ctx = canvasElement.getContext('2d');
    const width = imgElement.naturalWidth;
    const height = imgElement.naturalHeight;
    canvasElement.width = width;
    canvasElement.height = height;
    ctx.drawImage(imgElement, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const grayscale = red * .3 + green * .59 + blue * .11;
        pixels[i] = grayscale;
        pixels[i + 1] = grayscale;
        pixels[i + 2] = grayscale;
    }
    ctx.putImageData(imageData, 0, 0);
    canvasElement.src = canvasElement.toDataURL();
}