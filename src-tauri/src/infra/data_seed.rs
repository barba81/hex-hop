const COLOR_NAMES_CSV: &str = include_str!("../../data/color-name.csv");

/// Provides the embedded color-name CSV data.
///
/// # Examples
///
/// ```
/// let data = tauri::async_runtime::block_on(get_color_name_data());
/// assert!(!data.is_empty());
/// ```
///
/// # Returns
///
/// The embedded color-name CSV contents.
pub async fn get_color_name_data() -> &'static str {
    COLOR_NAMES_CSV
}

/// Initializes the data-seeding subsystem.
///
/// # Returns
///
/// `Ok(())` after initialization completes.
///
/// # Examples
///
/// ```
/// let result = tauri::async_runtime::block_on(init());
/// assert!(result.is_ok());
/// ```
pub async fn init() -> Result<(), Box<dyn std::error::Error>> {
    Ok(())
}
