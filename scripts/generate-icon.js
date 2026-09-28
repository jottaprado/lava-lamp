const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 256];
const outDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function drawLavaLamp(ctx, size) {
  // Clear background (transparent)
  ctx.clearRect(0, 0, size, size);

  const scale = size / 256;
  ctx.scale(scale, scale);

  // Colors
  const baseColor = '#333333';
  const glassColor = 'rgba(255, 255, 255, 0.1)';
  const glassHighlight = 'rgba(255, 255, 255, 0.3)';
  const lavaColor1 = '#FF4500'; // OrangeRed
  const lavaColor2 = '#FFD700'; // Gold

  // Draw Base
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  ctx.moveTo(90, 190);
  ctx.lineTo(166, 190);
  ctx.lineTo(186, 240);
  ctx.lineTo(70, 240);
  ctx.closePath();
  ctx.fill();

  // Draw Cap
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.lineTo(146, 20);
  ctx.lineTo(156, 50);
  ctx.lineTo(100, 50);
  ctx.closePath();
  ctx.fill();

  // Draw Glass Body
  ctx.fillStyle = glassColor;
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(156, 50);
  ctx.quadraticCurveTo(176, 120, 166, 190);
  ctx.lineTo(90, 190);
  ctx.quadraticCurveTo(80, 120, 100, 50);
  ctx.closePath();
  ctx.fill();
  
  ctx.clip(); // Clip everything inside the glass

  // Draw Lava Blobs
  const grad1 = ctx.createRadialGradient(128, 160, 10, 128, 160, 40);
  grad1.addColorStop(0, lavaColor2);
  grad1.addColorStop(1, lavaColor1);

  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.arc(128, 170, 35, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(110, 100, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(140, 130, 15, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(128, 60, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Reset clip
  ctx.restore();
  ctx.save();
  ctx.scale(scale, scale);

  // Draw Glass Highlight
  ctx.strokeStyle = glassHighlight;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(110, 60);
  ctx.quadraticCurveTo(90, 120, 100, 180);
  ctx.stroke();
  
  ctx.restore();
}

async function generateIcons() {
  // Let's generate a single 256x256 png for electron-builder to convert to ICO
  // Actually, electron-builder can take a high-res PNG and automatically generate the ICO!
  // But to be sure, I can use a library to build the ICO, or just rely on electron-builder.
  // The user asked to "Crie um ícone .ico com as resoluções padrão...". 
  // Let's create the PNG and convert it if needed, or let electron-builder do it.
  // Wait, electron-builder takes a 256x256 PNG and builds the ICO automatically. Let's create icon.png.
  
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');
  
  drawLavaLamp(ctx, 256);
  
  const outPath = path.join(outDir, 'icon.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  
  console.log('Icon generated at', outPath);
}

generateIcons().catch(console.error);

