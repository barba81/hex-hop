#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::Manager;

pub mod feat;
pub mod infra;
pub mod state;

/// Initializes and starts the Tauri application with its commands, plugins, and database.
///
/// # Examples
///
/// ```no_run
/// run();
/// ```
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()),
        )
        .init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            infra::data_seed::get_color_name_data,
            feat::color_picker::pick_color_mack,
            feat::color_service::color_service::create_color,
            feat::color_service::color_service::get_color,
            feat::gradient_service::gradient_service::create_gradient,
            feat::gradient_service::gradient_service::create_layer,
            feat::gradient_service::gradient_service::create_stop,
            feat::gradient_service::gradient_service::get_gradient,
            feat::gradient_service::gradient_service::get_layer,
            feat::gradient_service::gradient_service::get_stop,
            feat::gradient_service::gradient_service::delete_gradient,
            feat::gradient_service::gradient_service::delete_layer,
            feat::gradient_service::gradient_service::delete_stop,
            feat::gradient_service::gradient_service::update_gradient,
            feat::gradient_service::gradient_service::update_gradient_layer,
            feat::gradient_service::gradient_service::update_stop,
            feat::load_state::load_state_service::get_all_gradient,
        ])
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
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
