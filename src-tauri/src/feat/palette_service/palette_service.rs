use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

#[tauri::command]
pub async fn create_palette(
    state: tauri::State<'_, DbState>,
    palette: palette_create_model::PaletteCreateModel,
    parent_palette_id: Option<i64>,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let block_id =
        crate::feat::block_service::repo::create_repo::create_block(parent_palette_id, &mut *tx)
            .await?;
    let palette_id = palette_create_repo::create_palette(&palette, block_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(palette_id)
}

#[tauri::command]
pub async fn get_palette(
    state: tauri::State<'_, DbState>,
    palette_id: i64,
) -> Result<palette_data_model::PaletteDataModel, TauriError> {
    let color = palette_get_repo::get_palette_by_id(palette_id, &state.pool).await?;
    Ok(color)
}
