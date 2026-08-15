use crate::feat::block_service::repo::create_repo::create_block;
use crate::feat::block_service::repo::update_repo::update_block;
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

    let block_id = create_block(parent_palette_id, &mut *tx).await?;
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

#[tauri::command]
pub async fn update_color(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorUpdateModel,
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    update_block(
        color.block_id,
        color.block_order,
        color.parent_palette_id,
        &mut *tx,
    )
    .await?;
    color_update_repo::update_color(&color, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}
