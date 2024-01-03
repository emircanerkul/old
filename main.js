import './style.css'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.outerWidth * 4;
let height = window.outerHeight * 4;
const ratio = 2684 / 1668;
width = height * ratio;
height = width / ratio;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

const img1 = new Image();
const img2 = new Image();

img1.onload = function () {
  ctx.drawImage(img1, 0, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, width / 2, height);

  ctx.drawImage(img2, width / 2, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(width / 2, 0, width / 2, height);
};

img1.src = 'text.png';
img2.src = 'text.png';

const slider = document.getElementById("slider");
slider.addEventListener("input", function () {
  const sliderValue = parseInt(slider.value);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img1, 0 - sliderValue, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, width / 2, height);

  ctx.drawImage(img2, (width / 2) + sliderValue, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(width / 2, 0, width / 2, height);
});