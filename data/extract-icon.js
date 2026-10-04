#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const graphicsDir = path.resolve(__dirname, '../apk/assets/assets/graphics/1x');
const defaultOutputDir = path.resolve(__dirname, 'icons/assets/data');
const usage = `Usage:
  node data/extract-icon.js font <font-id> <numeric-glyph-id> <output-name.png> [--output-dir <directory>]
  node data/extract-icon.js crop <atlas-filename> <x> <y> <width> <height> <output-name.png> [--output-dir <directory>]
  node data/extract-icon.js --help

Font glyphs and crop rectangles are copied from graphics/1x without scaling or offsets.
Output names must be plain .png filenames. Existing files are overwritten.
--output-dir may be relative to the current working directory (default: data/icons/assets/data).`;

function fail(message) {
    throw new Error(message);
}

function integer(value, label, minimum) {
    if (!/^-?\d+$/.test(value)) fail(`${label} must be an integer: ${value}`);
    const result = Number(value);
    if (!Number.isSafeInteger(result) || result < minimum) {
        fail(`${label} must be an integer >= ${minimum}: ${value}`);
    }
    return result;
}

function plainPngName(value, label) {
    if (!value || path.basename(value) !== value || value.includes('\\') || !value.endsWith('.png')) {
        fail(`${label} must be a plain .png filename: ${value}`);
    }
    return value;
}

function attributes(tag) {
    const result = {};
    const pattern = /([A-Za-z_][\w.-]*)\s*=\s*"([^"]*)"/g;
    let match;
    while ((match = pattern.exec(tag)) !== null) result[match[1]] = match[2];
    return result;
}

function metadataInteger(attrs, name, description, minimum) {
    if (attrs[name] === undefined) fail(`${description} is missing ${name}`);
    return integer(attrs[name], `${description} ${name}`, minimum);
}

function readFontGlyph(fontId, glyphId) {
    const fontPath = path.join(graphicsDir, `font-${fontId}.fnt`);
    let xml;
    try {
        xml = fs.readFileSync(fontPath, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') fail(`Font metadata not found: ${fontPath}`);
        throw error;
    }

    const pages = new Map();
    for (const match of xml.matchAll(/<page\b([^>]*)\/?\s*>/g)) {
        const attrs = attributes(match[1]);
        const id = metadataInteger(attrs, 'id', 'Font page', 0);
        if (attrs.file === undefined || !attrs.file) fail(`Font page ${id} is missing file`);
        pages.set(id, attrs.file);
    }

    for (const match of xml.matchAll(/<char\b([^>]*)\/?\s*>/g)) {
        const attrs = attributes(match[1]);
        if (attrs.id === undefined || integer(attrs.id, 'Character id', 0) !== glyphId) continue;
        const rect = {
            x: metadataInteger(attrs, 'x', `Glyph ${glyphId}`, 0),
            y: metadataInteger(attrs, 'y', `Glyph ${glyphId}`, 0),
            width: metadataInteger(attrs, 'width', `Glyph ${glyphId}`, 0),
            height: metadataInteger(attrs, 'height', `Glyph ${glyphId}`, 0),
        };
        if (rect.width === 0 || rect.height === 0) fail(`Glyph ${glyphId} has an empty rectangle`);
        const pageId = metadataInteger(attrs, 'page', `Glyph ${glyphId}`, 0);
        const pageFile = pages.get(pageId);
        if (!pageFile) fail(`Glyph ${glyphId} references missing font page ${pageId}`);
        if (path.basename(pageFile) !== pageFile || pageFile.includes('\\')) {
            fail(`Font page ${pageId} has an invalid filename: ${pageFile}`);
        }
        return { source: path.join(graphicsDir, pageFile), rect };
    }
    fail(`Glyph ${glyphId} not found in font-${fontId}.fnt`);
}

function saveCrop(sourcePath, rect, outputName, outputDir) {
    const source = PNG.sync.read(fs.readFileSync(sourcePath));
    const { x, y, width, height } = rect;
    if (x + width > source.width || y + height > source.height) {
        fail(`Crop rectangle ${x},${y} ${width}x${height} exceeds source ${source.width}x${source.height}`);
    }

    const output = new PNG({ width, height });
    for (let row = 0; row < height; row++) {
        const sourceStart = ((y + row) * source.width + x) * 4;
        const outputStart = row * width * 4;
        source.data.copy(output.data, outputStart, sourceStart, sourceStart + width * 4);
    }

    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, outputName);
    fs.writeFileSync(outputPath, PNG.sync.write(output));
    console.log(`Source: ${sourcePath}`);
    console.log(`Rectangle: x=${x}, y=${y}, width=${width}, height=${height}`);
    console.log(`Output: ${outputPath} (${width}x${height})`);
}

function parseOutputDir(args) {
    const index = args.indexOf('--output-dir');
    if (index === -1) return { args, outputDir: defaultOutputDir };
    if (index !== args.length - 2 || !args[index + 1]) fail('--output-dir must be followed by a directory at the end');
    return { args: args.slice(0, index), outputDir: path.resolve(process.cwd(), args[index + 1]) };
}

function main(args) {
    if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
        console.log(usage);
        return;
    }
    const parsed = parseOutputDir(args);
    const commandArgs = parsed.args;
    if (commandArgs[0] === 'font' && commandArgs.length === 4) {
        const fontId = integer(commandArgs[1], 'Font id', 0);
        const glyphId = integer(commandArgs[2], 'Glyph id', 0);
        const outputName = plainPngName(commandArgs[3], 'Output name');
        const glyph = readFontGlyph(fontId, glyphId);
        saveCrop(glyph.source, glyph.rect, outputName, parsed.outputDir);
        return;
    }
    if (commandArgs[0] === 'crop' && commandArgs.length === 7) {
        const atlasName = commandArgs[1];
        if (!atlasName || path.basename(atlasName) !== atlasName || atlasName.includes('\\')) {
            fail(`Atlas filename must be a plain filename: ${atlasName}`);
        }
        const x = integer(commandArgs[2], 'x', 0);
        const y = integer(commandArgs[3], 'y', 0);
        const width = integer(commandArgs[4], 'width', 1);
        const height = integer(commandArgs[5], 'height', 1);
        const outputName = plainPngName(commandArgs[6], 'Output name');
        saveCrop(path.join(graphicsDir, atlasName), { x, y, width, height }, outputName, parsed.outputDir);
        return;
    }
    fail(`Invalid arguments.\n\n${usage}`);
}

try {
    main(process.argv.slice(2));
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}
