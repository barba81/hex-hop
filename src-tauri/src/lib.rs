#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::{Manager};

pub mod feat;
pub mod infra;
pub mod state;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![feat::color_picker::pick_color_mack])
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {

            tauri::async_runtime::block_on(async {
                infra::db::init_database(app)
                    .await
                    .expect("Failed to initialize database and migrations");
            });

            let window = app.get_webview_window("main").unwrap();

            infra::mac_background::mack_background(window).unwrap();
          
            Ok(())
        })
      
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

