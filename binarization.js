const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext('2d', {willReadFrequently: true});

const THRESHOLD = document.querySelector(".set-threshold");
THRESHOLD.value = 100;

const IMG = new Image();
IMG.src = "./assets/Sample1.jpg";

const download_button = document.querySelector("#download-image");
// The name of the downloaded file:
download_button.download = 'Image.png';

IMG.addEventListener('load', () => resizeToImgSize());
THRESHOLD.addEventListener('change', () => {
    ctx.drawImage(IMG, 0, 0, canvas.width, canvas.height);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for(let i=0; i<data.length; i+=4){
        const R = data[i];
        const G = data[i+1];
        const B = data[i+2];
        const Gray = 0.299*R + 0.587*G + 0.144*B;
        data[i] = Gray > THRESHOLD.value ? 255 : 0;
        data[i+1] = Gray > THRESHOLD.value ? 255 : 0;
        data[i+2] = Gray > THRESHOLD.value ? 255 : 0;
    }
    ctx.putImageData(imageData, 0, 0);
    download_button.href = canvas.toDataURL('image/png');
})

const input_image = document.querySelector('.input-image');
input_image.addEventListener('change', () => {
    const file = input_image.files[0];
    if(file) IMG.src = URL.createObjectURL(file);
    console.log(file);

})


// Resizing: -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.querySelector(".fit.height").addEventListener('click', () => {
    let ratio = IMG.width/IMG.height;
    if(IMG.height > window.innerHeight) {
        canvas.height = window.innerHeight;
    }
    else {
        canvas.height = IMG.height;
    }
    canvas.width = ratio * canvas.height;
    ctx.drawImage(IMG, 0, 0, canvas.width, canvas.height);
    download_button.href = canvas.toDataURL('image/png');
})

document.querySelector(".fit.width").addEventListener('click', () => {
    let ratio = IMG.width/IMG.height;
    if(IMG.width > window.innerWidth) {
        canvas.width = window.innerWidth;
    }
    else {
        canvas.width = IMG.width;
    }
    canvas.height = canvas.width/ratio;
    ctx.drawImage(IMG, 0, 0, canvas.width, canvas.height);
    download_button.href = canvas.toDataURL('image/png');
})

document.querySelector(".fit.initial").addEventListener('click', () => resizeToImgSize())

function resizeToImgSize(){
    canvas.width = IMG.width;
    canvas.height = IMG.height;
    ctx.drawImage(IMG, 0, 0, canvas.width, canvas.height);
    download_button.href = canvas.toDataURL('image/png');
}
