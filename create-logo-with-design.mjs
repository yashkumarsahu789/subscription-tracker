import { createCanvas } from 'canvas';
import fs from 'fs';

const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Create gradient background
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#4f46e5'); // indigo-600
gradient.addColorStop(1, '#9333ea'); // purple-600

// Draw rounded rectangle background
const radius = 100;
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.moveTo(radius, 0);
ctx.lineTo(size - radius, 0);
ctx.quadraticCurveTo(size, 0, size, radius);
ctx.lineTo(size, size - radius);
ctx.quadraticCurveTo(size, size, size - radius, size);
ctx.lineTo(radius, size);
ctx.quadraticCurveTo(0, size, 0, size - radius);
ctx.lineTo(0, radius);
ctx.quadraticCurveTo(0, 0, radius, 0);
ctx.closePath();
ctx.fill();

// Add shadow effect
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;

// Draw dollar sign circle icon (similar to the SVG in the app)
ctx.strokeStyle = 'white';
ctx.lineWidth = 20;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Reset shadow for icon
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

// Draw outer circle
const centerX = size / 2;
const centerY = size / 2;
const circleRadius = 160;

ctx.beginPath();
ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
ctx.stroke();

// Draw dollar sign
// Vertical line
ctx.beginPath();
ctx.moveTo(centerX, centerY - 80);
ctx.lineTo(centerX, centerY + 80);
ctx.stroke();

// Top curve (S shape upper part)
ctx.beginPath();
ctx.arc(centerX, centerY - 40, 50, Math.PI, Math.PI * 0.3, true);
ctx.stroke();

// Bottom curve (S shape lower part)
ctx.beginPath();
ctx.arc(centerX, centerY + 40, 50, 0, Math.PI * 1.7, false);
ctx.stroke();

// Top extension line
ctx.beginPath();
ctx.moveTo(centerX, centerY - 90);
ctx.lineTo(centerX, centerY - 70);
ctx.stroke();

// Bottom extension line
ctx.beginPath();
ctx.moveTo(centerX, centerY + 90);
ctx.lineTo(centerX, centerY + 70);
ctx.stroke();

// Save to multiple locations
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/logo.png', buffer);
fs.writeFileSync('./dist/logo.png', buffer);

console.log('Logo created successfully with subscription tracker icon design!');
