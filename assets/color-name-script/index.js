import fs from 'node:fs/promises';
import { converter } from 'culori';

const toLab = converter('lab');

/**
 * Generates a compact JSON palette of color names and rounded CIELAB coordinates.
 * Fetches color data, converts valid hexadecimal colors, and writes the result to
 * `./color-name-lab.min.json`.
 */
async function generateLabPalette() {
    // Example of your data format: {"100438": "Congressional Navy", "102030": "The Count"}
    // If loading from a file locally, use:
    // const rawData = JSON.parse(await fs.readFile('./my-colors.json', 'utf-8'));
    
    // Or fetch it if hosted on a URL:
    console.log('Fetching color dictionary...');
    const response = await fetch('https://unpkg.com/color-name-list@14.47.0/dist/colornames.short.json');
    const rawData = await response.json(); 

    // Handle both object dictionary {"100438":"Name"} AND array formats [{hex, name}]
    const colorEntries = Array.isArray(rawData) 
        ? rawData.map(item => [item.hex, item.name])
        : Object.entries(rawData);

    console.log(`Processing ${colorEntries.length} colors...`);

    const compactLabData = colorEntries
        .map(([hex, name]) => {
            // Ensure hex has '#' prefix for culori
            const formattedHex = hex.startsWith('#') ? hex : `#${hex}`;
            const lab = toLab(formattedHex);
            
            if (!lab) return null;

            return [
                name,
                Number(lab.l.toFixed(2)),
                Number(lab.a.toFixed(2)),
                Number(lab.b.toFixed(2))
            ];
        })
        .filter(Boolean);

    const minifiedJson = JSON.stringify(compactLabData);

    const outputPath = './color-name-lab.min.json';
    await fs.writeFile(outputPath, minifiedJson, 'utf-8');

    console.log(`\nSuccess! Generated: ${outputPath}`);
    console.log(`Total colors: ${compactLabData.length}`);
    console.log(`File size: ${(Buffer.byteLength(minifiedJson) / 1024).toFixed(2)} KB`);
}

generateLabPalette().catch(console.error);