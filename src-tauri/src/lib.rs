#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use window_vibrancy::*;
use sqlx::{migrate::MigrateDatabase, sqlite::SqlitePoolOptions, Pool, Sqlite};
use tauri::{App, Manager};

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

type Db = Pool<Sqlite>;

// Make this public so your command functions can see it
pub struct AppState {
    pub db: Db,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![color_picker::pick_color_mack, gradient_service::save_gradient])
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:hexHop.db", migrations::get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .setup(|app| {
            // Fix: Capture the database instance correctly inside the async runtime loop
            let handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                let db = setup_db(&handle).await;
                handle.manage(AppState { db }); 
            });

            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(16.0))
                .expect("Unsupported platform!");

                apply_liquid_glass(&window, NSGlassEffectViewStyle::Clear, None, Some(26.0))
                    .expect("Unsupported platform!");
            }

            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform!");

            Ok(())
        })
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn setup_db(app: &tauri::AppHandle) -> Db {
    let mut path = app.path().app_data_dir().expect("failed to get data_dir");

    std::fs::create_dir_all(&path).expect("failed to create directory");

    path.push("hexHop.db");
    
    let db_url = format!("sqlite:{}", path.to_str().expect("invalid path"));

    if !Sqlite::database_exists(&db_url).await.unwrap_or(false) {
        Sqlite::create_database(&db_url)
            .await
            .expect("failed to create database");
    }

    let db = SqlitePoolOptions::new()
        .connect(&db_url)
        .await
        .unwrap();

    db
}

