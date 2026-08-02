use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

#[tauri::command]
pub async fn create_palette(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorCreateModel,
    parent_palette_id: Option<i64>,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let color_id = palette_create_repo::create_palette(&color, &mut *tx).await?;
    palette_create_repo::create_block_palette(color_id, parent_palette_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(color_id)
}

#[tauri::command]
pub async fn get_palette(
    state: tauri::State<'_, DbState>,
    color_id: i64,
) -> Result<color_data_model::Color, TauriError> {
    let color = palette_get_repo::get_palette_by_id(color_id, &state.pool).await?;
    Ok(color)
}
