use serde::{Deserialize};
use oklab::{Rgb, Oklab, srgb_to_oklab};
use tauri::{App,Manager};

const COLOR_NAMES_CSV: &str = include_str!("../../data/color-name.csv");

pub async fn init(app: &App)-> Result<(), Box<dyn std::error::Error>> {
  
    load_color_names(app)?;

    Ok(())
}

#[derive(Debug, Deserialize, Clone)]
struct ColorItem {
    name: String,
    hex: String,
}

#[derive(Debug, Clone)]
pub struct NamedColor {
    name: String,
    hex: String,
    lab: Oklab,
}

fn parse_hex(hex: &str) -> Result<Rgb<u8> , String> {
    let hex = hex.trim_start_matches('#');
    if hex.len() != 6 {
        return Err(format!("invalid hex color: {hex}"));
    }
    let r = u8::from_str_radix(&hex[0..2], 16).map_err(|e| e.to_string())?;
    let g = u8::from_str_radix(&hex[2..4], 16).map_err(|e| e.to_string())?;
    let b = u8::from_str_radix(&hex[4..6], 16).map_err(|e| e.to_string())?;
    Ok(Rgb{ r, g, b })
}

fn load_color_names(app: &App) -> Result<(), String> {
    let mut rdr = csv::Reader::from_reader(COLOR_NAMES_CSV.as_bytes());

     let colors: Vec<NamedColor> = rdr
        .deserialize::<ColorItem>()
        .filter_map(|r| r.ok())
        .filter_map(|item| {
            let rgb = parse_hex(&item.hex).ok()?;
            let lab = srgb_to_oklab(rgb);
            Some(NamedColor { name: item.name, hex: item.hex, lab })
        })
        .collect();
    
    app.manage(colors);
    Ok(())
}