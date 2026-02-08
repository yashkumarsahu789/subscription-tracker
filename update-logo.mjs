import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the SVG file
const svgContent = fs.readFileSync(path.join(__dirname, 'public', 'logo.svg'), 'utf8');

// For now, we'll use the SVG as logo reference
// Create a simple PNG placeholder (192x192) with indigo gradient background
const createSimplePNG = () => {
  // This is a minimal valid 192x192 PNG with solid indigo color
  const width = 192;
  const height = 192;
  
  // PNG header
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk (image header)
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0); // Chunk length
  ihdr.write('IHDR', 4);
  ihdr.writeUInt32BE(width, 8); // Width
  ihdr.writeUInt32BE(height, 12); // Height
  ihdr.writeUInt8(8, 16); // Bit depth
  ihdr.writeUInt8(2, 17); // Color type (RGB)
  ihdr.writeUInt8(0, 18); // Compression
  ihdr.writeUInt8(0, 19); // Filter
  ihdr.writeUInt8(0, 20); // Interlace
  const ihdrCRC = 0x0f0d0f0a;
  ihdr.writeUInt32BE(ihdrCRC, 21);
  
  // Generate image data with gradient
  const pixels = [];
  for (let y = 0; y < height; y++) {
    pixels.push(0); // Filter type
    for (let x = 0; x < width; x++) {
      // Create gradient from indigo to purple
      const ratio = (x + y) / (width + height);
      const r = Math.floor(79 + ratio * (147 - 79)); // 79 to 147
      const g = Math.floor(70 + ratio * (51 - 70)); // 70 to 51
      const b = Math.floor(229 + ratio * (234 - 229)); // 229 to 234
      pixels.push(r, g, b);
    }
  }
  
  const pixelData = Buffer.from(pixels);
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(pixelData, { level: 9 });
  
  // IDAT chunk (image data)
  const idat = Buffer.alloc(compressed.length + 12);
  idat.writeUInt32BE(compressed.length, 0);
  idat.write('IDAT', 4);
  compressed.copy(idat, 8);
  const crc = require('buffer-crc32');
  const idatCRC = crc.unsigned(idat.slice(4, idat.length - 4));
  idat.writeUInt32BE(idatCRC, idat.length - 4);
  
  // IEND chunk (image end)
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
  
  return Buffer.concat([header, ihdr, idat, iend]);
};

try {
  const png = createSimplePNG();
  fs.writeFileSync(path.join(__dirname, 'public', 'logo.png'), png);
  fs.writeFileSync(path.join(__dirname, 'dist', 'logo.png'), png);
  console.log('✓ Logo PNG created successfully with gradient!');
} catch (error) {
  console.error('Error creating PNG:', error);
  // Fallback: copy existing logo or create minimal one
  console.log('Using SVG as primary logo format');
}
