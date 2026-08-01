const COLOR_NAMES_CSV: &str = include_str!("../../data/color-name.csv");

#[tauri::command]
pub async fn get_color_name_data() -> &'static str {
    COLOR_NAMES_CSV
}

pub async fn init() -> Result<(), Box<dyn std::error::Error>> {
    Ok(())
}
