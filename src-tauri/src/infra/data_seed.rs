use serde::{Deserialize};
const COLOR_NAMES_CSV: &str = include_str!("../../data/color-name.csv");

pub async fn init()-> Result<(), Box<dyn std::error::Error>> {
  
    load_color_names()?;

    Ok(())
}

#[derive(Debug, Deserialize, Clone)]
pub struct ColorItem {
    pub name: String,
    pub hex: String,
}

fn load_color_names() -> Result<(), String> {
    let mut rdr = csv::Reader::from_reader(COLOR_NAMES_CSV.as_bytes());

    let records: Vec<ColorItem> = rdr.deserialize().filter_map(|r| r.ok()).collect();
    
    Ok(())
}