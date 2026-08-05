use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

#[tauri::command]
pub async fn create_color(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorCreateModel,
    parent_palette_id: Option<i64>,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let block_id = color_create_repo::create_block_color(parent_palette_id, &mut *tx).await?;
    let color_id = color_create_repo::create_color(&color, block_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(color_id)
}

#[tauri::command]
pub async fn get_color(
    state: tauri::State<'_, DbState>,
    color_id: i64,
) -> Result<color_data_model::ColorDataModel, TauriError> {
    let color = color_get_repo::get_color_by_id(color_id, &state.pool).await?;
    Ok(color)
}
