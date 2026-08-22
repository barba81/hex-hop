use crate::feat::block_service::repo::update_repo::set_up_blocks_to_palette;
use crate::feat::block_service::repo::update_repo::update_block;
use crate::feat::load_state::model::load_sate_data_mapper::build_all_gradients_response_fast;
use crate::feat::palette_service::model::palette_create_model::PaletteCreateModel;
use crate::feat::palette_service::model::palette_create_model::PaletteUpdateRequest;
use crate::feat::palette_service::model::palette_response_model::BlockChildResponse;
use crate::feat::palette_service::model::palette_response_model::PaletteResponseModel;
use crate::feat::palette_service::repo::palette_create_repo::update_palette_repo;
use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

#[tauri::command]
pub async fn create_palette(
    state: tauri::State<'_, DbState>,
    palette: palette_create_model::PaletteCreateRequest,
    parent_palette_id: Option<i64>,
) -> Result<i64, TauriError> {
    let palette_create_model = PaletteCreateModel { name: palette.name };

    let mut tx = state.pool.begin().await?;

    let block_id =
        crate::feat::block_service::repo::create_repo::create_block(parent_palette_id, &mut *tx)
            .await?;
    let palette_id =
        palette_create_repo::create_palette(&palette_create_model, block_id, &mut *tx).await?;

    set_up_blocks_to_palette(palette_id, &palette.block_ids, &mut *tx).await?;

    tx.commit().await?;

    Ok(palette_id)
}

#[tauri::command]
pub async fn get_palette(
    state: tauri::State<'_, DbState>,
    palette_id: i64,
) -> Result<PaletteResponseModel, TauriError> {
    let mut tx = state.pool.begin().await?;

    let palette = palette_get_repo::get_palette_by_id(palette_id, &mut *tx).await?;

    let colors_data = palette_get_repo::get_colors_by_palette_id(palette.id, &mut *tx).await?;
    let gradients_data = palette_get_repo::get_gradients_palette_id(palette.id, &mut *tx).await?;
    let layers = palette_get_repo::get_gradient_layers_palette_id(palette.id, &mut *tx).await?;

    let stops = palette_get_repo::get_gradient_stops_palette_id(palette.id, &mut *tx).await?;

    tx.commit().await?;
    let gradients = build_all_gradients_response_fast(&gradients_data, &layers, &stops);

    let mut palette_response = PaletteResponseModel {
        id: palette.id,
        name: palette.name,
        block_order: palette.block_order,
        block_id: palette.block_id,
        kind: palette.kind,
        blocks: None,
    };

    for color in colors_data {
        palette_response
            .blocks
            .get_or_insert_with(Vec::new)
            .push(BlockChildResponse::Color(color));
    }

    for gradient in gradients {
        palette_response
            .blocks
            .get_or_insert_with(Vec::new)
            .push(BlockChildResponse::Gradient(gradient));
        continue;
    }

    Ok(palette_response)
}

#[tauri::command]
pub async fn get_palette_meta_data(
    state: tauri::State<'_, DbState>,
    palette_id: i64,
) -> Result<PaletteResponseModel, TauriError> {
    let palette = palette_get_repo::get_palette_by_id(palette_id, &state.pool).await?;

    let palette_response = PaletteResponseModel {
        id: palette.id,
        name: palette.name,
        block_order: palette.block_order,
        block_id: palette.block_id,
        kind: palette.kind,
        blocks: None,
    };

    Ok(palette_response)
}

#[tauri::command]
pub async fn update_palette(
    state: tauri::State<'_, DbState>,
    palette_update: PaletteUpdateRequest,
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    update_block(
        palette_update.block_id,
        palette_update.block_order,
        palette_update.parent_palette_id,
        &mut *tx,
    )
    .await?;

    update_palette_repo(&palette_update, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}
