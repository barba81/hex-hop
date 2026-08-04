use tauri::http::response;

use super::load_state_repo;
use crate::{
    feat::{
        gradient_service::model::gradient_service_response::GradientResponse,
        load_state::model::{
            load_sate_data_mapper::build_all_gradients_response_fast,
            load_state_response::BlockResponse,
        },
    },
    infra::error::TauriError,
    state::DbState,
};

#[tauri::command]
pub async fn load_state(
    state: tauri::State<'_, DbState>,
) -> Result<Vec<BlockResponse>, TauriError> {
    let mut tx = state.pool.begin().await?;

    // load all colors
    let colors_data = load_state_repo::get_all_colors(&mut *tx).await?;
    // load all palettes
    let palettes_data = load_state_repo::get_all_palette(&mut *tx).await?;

    let gradients_data = load_state_repo::get_all_gradients(&mut *tx).await?;
    let layers = load_state_repo::get_all_gradient_layers(&mut *tx).await?;
    let stops = load_state_repo::get_all_gradient_stops(&mut *tx).await?;
    tx.commit().await?;

    let gradients = build_all_gradients_response_fast(&gradients_data, &layers, &stops);

    let mut root: Vec<BlockResponse> =
        Vec::with_capacity(palettes_data.len() + colors_data.len() + gradients.len());

    root.extend(palettes_data.into_iter().map(BlockResponse::Palette));
    root.extend(colors_data.into_iter().map(BlockResponse::Color));
    root.extend(gradients.into_iter().map(BlockResponse::Gradient));

    println!("{:?}", root);
    Ok(root)
}
