/**
 * Icon Generator Script for eXeViewer PWA
 *
 * This script generates PNG icons and favicon from SVG sources.
 *
 * Requirements:
 *   npm install sharp png-to-ico
 *
 * Usage:
 *   node scripts/generate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '..', 'img');

// Icon sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];
const faviconSizes = [16, 32, 48];

async function generateIcons() {
    console.log('Generating PWA icons...\n');

    // Read SVG files
    const iconSvg = fs.readFileSync(path.join(imgDir, 'icon.svg'));
    const maskableSvg = fs.readFileSync(path.join(imgDir, 'icon-maskable.svg'));

    // Generate regular icons
    for (const size of sizes) {
        const outputPath = path.join(imgDir, `icon-${size}.png`);
        await sharp(iconSvg)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        console.log(`Created: icon-${size}.png`);
    }

    // Generate maskable icons
    for (const size of maskableSizes) {
        const outputPath = path.join(imgDir, `icon-maskable-${size}.png`);
        await sharp(maskableSvg)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        console.log(`Created: icon-maskable-${size}.png`);
    }

    // Generate favicon PNGs
    const faviconPngs = [];
    for (const size of faviconSizes) {
        const outputPath = path.join(imgDir, `favicon-${size}.png`);
        await sharp(iconSvg)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        faviconPngs.push(outputPath);
        console.log(`Created: favicon-${size}.png`);
    }

    // Generate favicon.ico from PNGs
    console.log('\nGenerating favicon.ico...');
    const icoBuffer = await pngToIco(faviconPngs);
    fs.writeFileSync(path.join(imgDir, 'favicon.ico'), icoBuffer);
    console.log('Created: favicon.ico');

    // Clean up temporary favicon PNGs
    for (const pngPath of faviconPngs) {
        fs.unlinkSync(pngPath);
    }

    console.log('\nAll icons generated successfully!');
}

generateIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
