#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use window_vibrancy::*;

use tauri::{AppHandle, Manager};

#[cfg(target_os = "macos")]
use objc::{class, msg_send, sel, sel_impl, runtime::Object};
#[cfg(target_os = "macos")]
use block::ConcreteBlock;

#[path = "data/migrations.rs"]
pub mod migrations;

#[path = "feat/color_picker.rs"]
pub mod color_picker;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ color_picker::pick_color_mack])
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:hexHop.db", migrations::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {

                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(16.0))
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

                apply_liquid_glass(&window, NSGlassEffectViewStyle::Clear, None, Some(26.0))
                    .expect(
                        "Unsupported platform! 'apply_liquid_glass' is only supported on macOS 26+",
                    );
            }

            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
