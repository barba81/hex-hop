#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::Manager;

pub mod feat;
pub mod infra;
pub mod state;

use feat::block_service::delete_service::*;
use feat::color_picker::pick_color_mack;
use feat::color_service::color_service::*;
use feat::gradient_service::gradient_service::*;
use feat::load_state::load_state_service::*;
use feat::palette_service::palette_service::*;
use infra::data_seed::get_color_name_data;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()),
        )
        .init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_color_name_data,
            pick_color_mack,
            create_color,
            get_color,
            create_gradient,
            create_layer,
            create_stop,
            get_gradient,
            get_layer,
            get_stop,
            delete_gradient,
            delete_layer,
            delete_stop,
            update_gradient,
            update_gradient_layer,
            update_stop,
            create_palette,
            get_palette,
            load_state,
            soft_delete_block,
            soft_delete_clipboard,
            hard_delete_blocks,
            update_color
        ])
        .plugin(tauri_plugin_prevent_default::debug())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_positioner::init())
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                infra::data_seed::init()
                    .await
                    .expect("Error setting up seed");

                infra::db::init_database(app)
                    .await
                    .expect("Failed to initialize database and migrations");
            });

            let window = app.get_webview_window("main").unwrap();
            infra::mac_background::transparent_background(window).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
