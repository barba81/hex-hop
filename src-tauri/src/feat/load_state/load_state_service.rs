use super::load_state_repo;
use crate::{
    feat::{
        load_state::model::{
            load_sate_data_mapper::build_all_gradients_response_fast,
            load_state_response::BlockResponse,
        },
        palette_service::model::palette_response_model::{
            BlockChildResponse, PaletteResponseModel,
        },
    },
    infra::error::TauriError,
    state::DbState,
};
use std::collections::HashMap;

#[tauri::command]
pub async fn load_state(
    state: tauri::State<'_, DbState>,
) -> Result<Vec<BlockResponse>, TauriError> {
    let mut tx = state.pool.begin().await?;

    let colors_data = load_state_repo::get_all_colors(&mut *tx).await?;
    let palettes_data = load_state_repo::get_all_palette(&mut *tx).await?;

    let gradients_data = load_state_repo::get_all_gradients(&mut *tx).await?;
    let layers = load_state_repo::get_all_gradient_layers(&mut *tx).await?;
    let stops = load_state_repo::get_all_gradient_stops(&mut *tx).await?;
    tx.commit().await?;

    let gradients = build_all_gradients_response_fast(&gradients_data, &layers, &stops);

    let mut palette_map: HashMap<i64, PaletteResponseModel> = HashMap::new();
    let mut root: Vec<BlockResponse> = Vec::new();

    for palette in palettes_data {
        palette_map.insert(
            palette.id,
            PaletteResponseModel {
                id: palette.id,
                name: palette.name,
                block_order: palette.block_order,
                block_id: palette.block_id,
                kind: palette.kind,
                blocks: None,
            },
        );
    }

    for color in colors_data {
        if let Some(parent_palette_id) = color.parent_palette_id {
            if let Some(palette) = palette_map.get_mut(&parent_palette_id) {
                palette
                    .blocks
                    .get_or_insert_with(Vec::new)
                    .push(BlockChildResponse::Color(color));
                continue;
            }
        }

        root.push(BlockResponse::Color(color));
    }

    for gradient in gradients {
        if let Some(parent_palette_id) = gradient.parent_palette_id {
            if let Some(palette) = palette_map.get_mut(&parent_palette_id) {
                palette
                    .blocks
                    .get_or_insert_with(Vec::new)
                    .push(BlockChildResponse::Gradient(gradient));
                continue;
            }
        }

        root.push(BlockResponse::Gradient(gradient));
    }

    root.extend(palette_map.into_values().map(BlockResponse::Palette));
    root.sort_by_key(|block| block.block_order());
    for item in &mut root {
        if let BlockResponse::Palette(palette) = item {
            if let Some(blocks) = &mut palette.blocks {
                blocks.sort_by_key(|block| block.block_order());
            }
        }
    }

    Ok(root)
}

impl BlockResponse {
    pub fn block_order(&self) -> i64 {
        match self {
            BlockResponse::Palette(p) => p.block_order,
            BlockResponse::Color(c) => c.block_order,
            BlockResponse::Gradient(g) => g.block_order,
        }
    }
}

impl BlockChildResponse {
    pub fn block_order(&self) -> i64 {
        match self {
            BlockChildResponse::Color(c) => c.block_order,
            BlockChildResponse::Gradient(g) => g.block_order,
        }
    }
}
