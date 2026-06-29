use sqlx::SqlitePool;
use tauri::{App, Manager};
use sqlx::sqlite::{SqliteConnectOptions};
use std::str::FromStr;

use crate::state::DbState;


pub async fn init_database(app: &App) -> Result<(), Box<dyn std::error::Error>> {
  let app_dir = app.path().app_data_dir()?;
    if !app_dir.exists() {
        std::fs::create_dir_all(&app_dir)?;
    }
    
    let db_path = app_dir.join("test_database.db");
    println!("{}",db_path.to_string_lossy());
    let database_url = format!("sqlite:{}", db_path.to_string_lossy());

  let connection_options = SqliteConnectOptions::from_str(&database_url)?
        .create_if_missing(true);

    let pool = SqlitePool::connect_with(connection_options).await?;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;

    app.manage(DbState { pool });

    Ok(())
}