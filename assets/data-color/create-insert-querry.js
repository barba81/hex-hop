import { writeFile } from 'fs/promises';

async function loadColorNames() {
  const url = 'https://unpkg.com/color-name-list@14.45.0/dist/colornames.min.json';
  
  try {
    // 1. Fetch the response envelope
    const response = await fetch(url);
    
    // Check if the network request actually succeeded (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // 2. Extract and parse the JSON body
    const colorData = await response.json();
    // Now you can read and use it!
    let sqlScript = "";
    for (const [hex, name] of Object.entries(colorData)) {
    const r = parseInt(hex.substring(0, 2), 16); // 255
    const g = parseInt(hex.substring(2, 4), 16); // 51
    const b = parseInt(hex.substring(4, 6), 16); // 163

        sqlScript += `INSERT INTO color (r,g,b,name) VALUES (${r}, ${g}, ${b}, '${name}'); \n`;
    } 
    await writeFile('insert-query.sql', sqlScript, 'utf-8');
  } catch (error) {
    console.error("Failed to load the JSON:", error);
  }
}

// Run the function
loadColorNames();