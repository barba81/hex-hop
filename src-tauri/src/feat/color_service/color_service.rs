use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::{*};
use super::repo::{*};

#[tauri::command]
pub async fn create_color(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorCreateModel,
) -> Result<i64, TauriError> {

    let mut tx = state.pool.begin().await?;

    let color_id = color_create_repo::create_gradient(&color, &mut *tx).await?;
    color_create_repo::create_block_color(color_id, Some(0), &mut *tx).await?;
    tx.commit().await?;

    Ok(color_id)
}
#[tauri::command]
pub async fn get_color(
    state: tauri::State<'_, DbState>,
    color_id: i64,
) -> Result<color_data_model::Color, TauriError> {

    let color = color_get_repo::get_color_by_id(color_id, &state.pool).await?;
    Ok(color)
}