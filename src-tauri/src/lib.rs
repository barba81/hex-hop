#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};
use window_vibrancy::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_color_tables",
            sql: "
            CREATE TABLE colors (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                r           INTEGER NOT NULL CHECK(r BETWEEN 0 AND 255),
                g           INTEGER NOT NULL CHECK(g BETWEEN 0 AND 255),
                b           INTEGER NOT NULL CHECK(b BETWEEN 0 AND 255),
                a           REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
                created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            ",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:hexHop.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
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
