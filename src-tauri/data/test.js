const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_JSON_FILE = path.join(__dirname, 'colorsOptimized.json'); // path to your source JSON
const OUTPUT_SQL_FILE = path.join(__dirname, 'seed.sql');     // where to save the sql script

function generateSqlSeed() {
    try {
        console.log('Reading JSON file...');
        const rawData = fs.readFileSync(INPUT_JSON_FILE, 'utf8');
        const colorArray = JSON.parse(rawData);

        if (!Array.isArray(colorArray)) {
            throw new Error('Root elements of JSON must be an array.');
        }

        console.log(`Processing ${colorArray.length} items...`);
        
        const sqlLines = [];

        // 1. Begin SQL Transaction and setup table
        sqlLines.push('BEGIN TRANSACTION;');
        sqlLines.push('CREATE TABLE IF NOT EXISTS color_names (');
        sqlLines.push('    val1 REAL,');
        sqlLines.push('    val2 REAL,');
        sqlLines.push('    val3 REAL,');
        sqlLines.push('    name TEXT');
        sqlLines.push(');');

        // 2. Loop through each color coordinate array
        for (const row of colorArray) {
            // Basic validation to ensure the row has exactly what we expect
            if (Array.isArray(row) && row.length >= 4) {
                const val1 = Number(row[0]);
                const val2 = Number(row[1]);
                const val3 = Number(row[2]);
                
                // Escape single quotes in names (e.g., "Don't Blink" -> 'Don''t Blink')
                const name = String(row[3]).replace(/'/g, "''");

                sqlLines.push(`INSERT INTO color_names (val1, val2, val3, name) VALUES (${val1}, ${val2}, ${val3}, '${name}');`);
            }
        }

        // 3. Commit the transaction
        sqlLines.push('COMMIT;');

        // 4. Write everything to the output file
        console.log('Writing SQL file...');
        fs.writeFileSync(OUTPUT_SQL_FILE, sqlLines.join('\n'), 'utf8');
        
        console.log(`Success! Pre-compiled seed saved to: ${OUTPUT_SQL_FILE}`);

    } catch (error) {
        console.error('Failed to generate SQL script:', error.message);
    }
}

generateSqlSeed();