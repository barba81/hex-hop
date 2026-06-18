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

type Db = Pool<Sqlite>;

// Make this public so your command functions can see it
pub struct AppState {
    pub db: Db,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![color_picker::pick_color_mack, add_gradient])
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

// Changed parameter to &tauri::AppHandle to make async scoping safer
async fn setup_db(app: &tauri::AppHandle) -> Db {
    let mut path = app.path().app_data_dir().expect("failed to get data_dir");

    // Ensure the folder path exists
    std::fs::create_dir_all(&path).expect("failed to create directory");

    // 1. FIX: Push only the clean filename to the directory path
    path.push("hexHop.db");
    
    let db_url = format!("sqlite:{}", path.to_str().expect("invalid path"));

    // Create the database file if it doesn't exist
    if !Sqlite::database_exists(&db_url).await.unwrap_or(false) {
        Sqlite::create_database(&db_url)
            .await
            .expect("failed to create database");
    }

    // 2. FIX: Connect using the full sqlite: prefix URL string
    let db = SqlitePoolOptions::new()
        .connect(&db_url)
        .await
        .unwrap();

    db
}
#[tauri::command]
async fn add_gradient(state: tauri::State<'_, AppState>) -> Result<(), String> {
    let db = &state.db;

    // 1. Begin the global transaction
    let mut tx = db.begin()
        .await
        .map_err(|e| format!("Failed to start transaction: {}", e))?;

    // 2. First separate function call (Succeeds)
    insert_block(&mut tx, 1)
        .await
        .map_err(|e| format!("Error saving block 1: {}", e))?;

    // 3. Second separate function call (Succeeds)
    insert_block(&mut tx, 2)
        .await
        .map_err(|e| format!("Error saving block 2: {}", e))?;

    // --- HOW TO TEST AN INTENTIONAL FAILURE AND ROLLBACK ---
    // If you want to watch the transaction fail right here, uncomment the line below.
    // Because your column is likely an INTEGER, passing a completely wrong type or 
    // trying a broken query manually will trigger an error.
    //
    // sqlx::query("INSERT INTO block (`order`) VALUES ('NOT_AN_INT')").execute(&mut *tx).await.map_err(|e| format!("Forced Error: {}", e))?;
    // --------------------------------------------------------

    // 4. If nothing returned an Error up to this point, commit everything!
    tx.commit()
        .await
        .map_err(|e| format!("Failed to commit transaction: {}", e))?;

    Ok(())
}
async fn insert_block(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>, 
    order_val: i32
) -> Result<(), sqlx::Error> {
    sqlx::query("INSERT INTO block (`order`) VALUES (?1)")
        .bind(order_val)
        .execute(&mut **tx) 
        .await?;
        
    Ok(())
}