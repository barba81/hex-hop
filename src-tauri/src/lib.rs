#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use window_vibrancy::*;
use tauri::{Manager};

#[cfg(target_os = "macos")]
use objc::{class, msg_send, sel, sel_impl, runtime::Object};
#[cfg(target_os = "macos")]
use block::ConcreteBlock;

#[path = "data/migrations.rs"]
pub mod migrations;

#[path = "feat/color_picker.rs"]
pub mod color_picker;

#[path = "feat/gradient-service.rs"]
pub mod gradient_service;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![color_picker::pick_color_mack, gradient_service::save_gradient])
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            mack_background();
        })
      
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

