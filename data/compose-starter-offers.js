#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const PNG = require('pngjs').PNG;

const assetDir = path.resolve(__dirname, '../apk/assets/assets');
const defaultOutputDir = path.resolve(__dirname, 'icons/assets/data');
const usage = `Usage:
  node data/compose-starter-offers.js [--output-dir <directory>]
  node data/compose-starter-offers.js --help

Compose APK layers at their native positions when the pointer is not over the offer.
Output files are StarterOfferBabyTroll.png, StarterOfferBalloonfish.png, and StarterOfferBubba.png.
Existing files are overwritten. --output-dir is relative to the current working directory.
Print one JSON evidence record per output. Bounds and cropOffset use card-local coordinates.`;

// Coordinates and frames: docs/plans/bundles-starter-native-composition-research.md.
// This still uses native counter zero, not a captured simultaneous animation frame.
const sine = degrees => Math.sin(degrees * Math.PI / 180);
const offers = [
    {
        key: 'StarterOfferBabyTroll', spriteId: 161,
        sheetSize: [372, 300], frameSize: [62, 50], origin: [31, 50],
        largePosition: [109, 273], smallPosition: [161, 404],
        movingFrame: 9, buyCropX: 1, glowAlpha: 0.5, discountRotation: 0,
    },
    {
        key: 'StarterOfferBalloonfish', spriteId: 233,
        sheetSize: [564, 624], frameSize: [94, 104], origin: [47, 104],
        largePosition: [121, 270], smallPosition: [142, 390],
        movingFrame: 9, buyCropX: 86, glowAlpha: 0.5 + 0.3 * sine(72), discountRotation: 0,
    },
    {
        key: 'StarterOfferBubba', spriteId: 205,
        sheetSize: [720, 350], frameSize: [120, 70], origin: [60, 70],
        largePosition: [116, 263], smallPosition: [141, 395],
        movingFrame: 12, buyCropX: 170, glowAlpha: 0.5 + 0.2 * sine(144),
        discountRotation: 18 * sine(-36),
    },
];

const images = new Map();

function loadPng(relativePath, expectedSize) {
    const sourcePath = path.join(assetDir, relativePath);
    if (!images.has(sourcePath)) {
        let image;
        try {
            image = PNG.sync.read(fs.readFileSync(sourcePath));
        } catch (error) {
            throw new Error(`Cannot read APK PNG ${sourcePath}: ${error.message}`);
        }
        images.set(sourcePath, image);
    }
    const image = images.get(sourcePath);
    if (expectedSize && (image.width !== expectedSize[0] || image.height !== expectedSize[1])) {
        throw new Error(`Unexpected APK PNG dimensions for ${sourcePath}: ${image.width}x${image.height}; expected ${expectedSize.join('x')}`);
    }
    return image;
}

function layer(image, x, y, { crop = [0, 0, image.width, image.height], scale = 1, alpha = 1, rotation = 0 } = {}) {
    const [cropX, cropY, width, height] = crop;
    if (cropX < 0 || cropY < 0 || width <= 0 || height <= 0 || cropX + width > image.width || cropY + height > image.height) {
        throw new Error(`Crop ${crop.join(',')} exceeds APK PNG dimensions ${image.width}x${image.height}`);
    }
    const radians = rotation * Math.PI / 180;
    const cosine = Math.cos(radians);
    const sine = Math.sin(radians);
    const centerX = x + width * scale / 2;
    const centerY = y + height * scale / 2;
    const halfWidth = scale * (Math.abs(width * cosine) + Math.abs(height * sine)) / 2;
    const halfHeight = scale * (Math.abs(width * sine) + Math.abs(height * cosine)) / 2;
    return {
        image, cropX, cropY, width, height, scale, alpha, cosine, sine, centerX, centerY,
        left: Math.floor(centerX - halfWidth), top: Math.floor(centerY - halfHeight),
        right: Math.ceil(centerX + halfWidth), bottom: Math.ceil(centerY + halfHeight),
    };
}

function renderPasses(offer, index) {
    const attachedImages = [
        layer(loadPng(`data/OffersBG${index}.png`, [320, 446]), 0, 27),
        layer(loadPng(`data/OffersBGb${index}.png`, [268, 446]), 0, 27, { alpha: offer.glowAlpha }),
        layer(loadPng(`data/OffersBGc${index}.png`, [268, 446]), 0, 27),
        layer(loadPng(`data/OffersTop${index}.png`, [170, 27]), 48, 0),
    ];
    if (index > 0) {
        attachedImages.push(layer(loadPng(`data/OffersD${index - 1}.png`, [59, 40]), -80, 93, {
            rotation: offer.discountRotation,
        }));
    }

    const sheet = loadPng(`graphics/1x/sprite-2-${offer.spriteId}.png`, offer.sheetSize);
    const [width, height] = offer.frameSize;
    const movingCrop = [offer.movingFrame % 6 * width, Math.floor(offer.movingFrame / 6) * height, width, height];
    // Native scale 3 preserves each actor's bottom-center origin, not the frame center.
    const pets = [
        layer(sheet, offer.largePosition[0] - 2 * offer.origin[0], offer.largePosition[1] - 2 * offer.origin[1], {
            crop: [0, 0, width, height], scale: 3,
        }),
        layer(sheet, offer.smallPosition[0], offer.smallPosition[1], { crop: movingCrop }),
    ];

    const font = loadPng('graphics/1x/font-746.png');
    const fontOverlays = [
        layer(font, 27 - 4 * index, 423, { crop: [offer.buyCropX, 625, 79, 37] }),
    ];
    if (index === 1) {
        fontOverlays.push(layer(font, 109, 62, { crop: [146, 593, 91, 31] }));
    }

    return [attachedImages, pets, fontOverlays];
}

function drawLayer(output, bounds, source) {
    for (let y = source.top; y < source.bottom; y++) {
        for (let x = source.left; x < source.right; x++) {
            const dx = x + 0.5 - source.centerX;
            const dy = y + 0.5 - source.centerY;
            // Inverse mapping keeps transparent rotation and pet scaling nearest-neighbor.
            const sourceX = Math.floor((dx * source.cosine + dy * source.sine) / source.scale + source.width / 2);
            const sourceY = Math.floor((-dx * source.sine + dy * source.cosine) / source.scale + source.height / 2);
            if (sourceX < 0 || sourceY < 0 || sourceX >= source.width || sourceY >= source.height) continue;

            const inputOffset = ((source.cropY + sourceY) * source.image.width + source.cropX + sourceX) * 4;
            const sourceAlpha = source.image.data[inputOffset + 3] / 255 * source.alpha;
            if (sourceAlpha === 0) continue;

            const outputOffset = ((y - bounds.y) * output.width + x - bounds.x) * 4;
            const remainingAlpha = output.data[outputOffset + 3] / 255 * (1 - sourceAlpha);
            const outputAlpha = sourceAlpha + remainingAlpha;
            for (let channel = 0; channel < 3; channel++) {
                output.data[outputOffset + channel] = Math.round((
                    source.image.data[inputOffset + channel] * sourceAlpha
                    + output.data[outputOffset + channel] * remainingAlpha
                ) / outputAlpha);
            }
            output.data[outputOffset + 3] = Math.round(outputAlpha * 255);
        }
    }
}

function compose(offer, index) {
    const passes = renderPasses(offer, index);
    const layers = passes.flat();
    const left = Math.min(...layers.map(source => source.left));
    const top = Math.min(...layers.map(source => source.top));
    const right = Math.max(...layers.map(source => source.right));
    const bottom = Math.max(...layers.map(source => source.bottom));
    const bounds = { x: left, y: top, width: right - left, height: bottom - top };
    const output = new PNG({ width: bounds.width, height: bounds.height });
    output.data.fill(0);
    for (const pass of passes) {
        for (const source of pass) drawLayer(output, bounds, source);
    }
    const png = PNG.sync.write(output);
    return {
        png,
        evidence: {
            key: offer.key, width: output.width, height: output.height,
            sha256: crypto.createHash('sha256').update(png).digest('hex'),
            bounds, cropOffset: { x: left, y: top }, nativeOrigin: { x: 109 + 289 * index, y: 0 },
            phaseCounter: 0, glowAlpha: offer.glowAlpha, discountRotation: offer.discountRotation,
            petFrames: { large: 0, small: offer.movingFrame },
        },
    };
}

function main(args) {
    if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
        console.log(usage);
        return;
    }
    let outputDir = defaultOutputDir;
    if (args.length !== 0) {
        if (args.length !== 2 || args[0] !== '--output-dir' || !args[1] || args[1].startsWith('--')) {
            throw new Error(`Invalid arguments.\n\n${usage}`);
        }
        outputDir = path.resolve(process.cwd(), args[1]);
    }

    // Load every required source before writing any output.
    const results = offers.map(compose);
    fs.mkdirSync(outputDir, { recursive: true });
    for (const { png, evidence } of results) {
        const outputPath = path.join(outputDir, `${evidence.key}.png`);
        fs.writeFileSync(outputPath, png);
        console.log(JSON.stringify({ ...evidence, outputPath }));
    }
}

try {
    main(process.argv.slice(2));
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}
