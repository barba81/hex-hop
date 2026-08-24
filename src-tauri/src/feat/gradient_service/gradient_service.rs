use crate::feat::block_service::repo::create_repo::create_block;
use crate::feat::block_service::repo::delete_repo::soft_delete_block;
use crate::feat::gradient_service::model::gradient_data_model::GradientDataModel;
use crate::feat::gradient_service::model::gradient_service_request::GradientUpdateRequest;
use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

#[tauri::command]
pub async fn get_stop(
    state: tauri::State<'_, DbState>,
    stop_id: i64,
) -> Result<gradient_service_response::GradientStopResponse, TauriError> {
    let stop = gradient_get_repo::get_gradient_stops_by_stop_id(stop_id, &state.pool).await?;
    Ok(gradient_data_mapper::build_stop_response(&stop))
}

#[tauri::command]
pub async fn get_layer(
    state: tauri::State<'_, DbState>,
    layer_id: i64,
) -> Result<gradient_service_response::GradientLayerResponse, TauriError> {
    let layer = gradient_get_repo::get_gradient_layers_by_layer_id(layer_id, &state.pool).await?;
    let stops = gradient_get_repo::get_gradient_stops_by_layer_id(layer_id, &state.pool).await?;
    Ok(gradient_data_mapper::build_layer_response(&layer, &stops))
}

#[tauri::command]
pub async fn get_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64,
) -> Result<gradient_service_response::GradientResponse, TauriError> {
    let gradient = gradient_get_repo::get_gradient_by_id(gradient_id, &state.pool).await?;
    let layers =
        gradient_get_repo::get_gradient_layers_by_gradient_id(gradient_id, &state.pool).await?;
    let stops =
        gradient_get_repo::get_gradient_stops_by_gradient_id(gradient_id, &state.pool).await?;
    Ok(gradient_data_mapper::build_gradient_response(
        &gradient, &layers, &stops,
    ))
}

#[tauri::command]
pub async fn create_gradient(
    state: tauri::State<'_, DbState>,
    gradient: gradient_service_request::GradientRequest,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let block_id = create_block(gradient.parent_palette_id, &mut *tx).await?;
    let gradient_id = gradient_create_repo::create_gradient(&gradient, block_id, &mut *tx).await?;

    let layers: Vec<gradient_create_model::GradientLayerCreateModel> = gradient
        .layers
        .iter()
        .map(|layer| gradient_data_mapper::build_layer_model(&layer, gradient_id))
        .collect();

    let layer_ids = gradient_create_repo::create_layers(&layers, &mut *tx).await?;

    let all_stops: Vec<gradient_create_model::GradientStopCreateModel> = gradient
        .layers
        .iter()
        .zip(layer_ids.iter()) // Pair each original layer with its generated layer_id
        .flat_map(|(layer, &layer_id)| {
            layer
                .stops
                .iter()
                .map(move |stop| gradient_data_mapper::build_creation_stop_model(&stop, layer_id))
        })
        .collect();

    gradient_create_repo::create_stops(&all_stops, &mut *tx).await?;

    tx.commit().await?;

    Ok(gradient_id)
}

#[tauri::command]
pub async fn create_layer(
    state: tauri::State<'_, DbState>,
    layer: gradient_service_request::GradientLayerRequest,
    gradient_id: i64,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let layer_id = gradient_create_repo::create_layer(&layer, gradient_id, &mut *tx).await?;

    let stops: Vec<gradient_create_model::GradientStopCreateModel> = layer
        .stops
        .iter()
        .map(|stop| gradient_data_mapper::build_creation_stop_model(&stop, layer_id))
        .collect();

    gradient_create_repo::create_stops(&stops, &mut *tx).await?;

    tx.commit().await?;

    Ok(layer_id)
}

#[tauri::command]
pub async fn create_stop(
    state: tauri::State<'_, DbState>,
    stop: gradient_service_request::GradientStopRequest,
    layer_id: i64,
) -> Result<i64, TauriError> {
    Ok(gradient_create_repo::create_stop(&stop, layer_id, &state.pool).await?)
}

#[tauri::command]
pub async fn update_gradient(
    state: tauri::State<'_, DbState>,
    gradient: GradientUpdateRequest,
) -> Result<gradient_service_response::GradientResponse, TauriError> {
    let mut tx = state.pool.begin().await?;
    gradient_update_repo::update_gradient_async(&gradient, &mut *tx).await?;

    let gradient = gradient_get_repo::get_gradient_by_id(gradient.id, &mut *tx).await?;
    let layers =
        gradient_get_repo::get_gradient_layers_by_gradient_id(gradient.id, &mut *tx).await?;
    let stops = gradient_get_repo::get_gradient_stops_by_gradient_id(gradient.id, &mut *tx).await?;

    tx.commit().await?;

    Ok(gradient_data_mapper::build_gradient_response(
        &gradient, &layers, &stops,
    ))
}

#[tauri::command]
pub async fn update_gradient_layer(
    state: tauri::State<'_, DbState>,
    layer: gradient_data_model::GradientLayerDataModel,
) -> Result<(), TauriError> {
    Ok(gradient_update_repo::update_gradient_layer_async(&layer, &state.pool).await?)
}

#[tauri::command]
pub async fn update_stop(
    state: tauri::State<'_, DbState>,
    stop: gradient_data_model::GradientStopDataModel,
) -> Result<(), TauriError> {
    Ok(gradient_update_repo::update_stop(&stop, &state.pool).await?)
}

#[tauri::command]
pub async fn delete_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64,
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    let gradient = gradient_get_repo::get_gradient_by_id(gradient_id, &state.pool).await?;
    soft_delete_block(gradient.block_id, true, &mut *tx).await?;
    gradient_delete_repo::soft_delete_gradient_layer_by_gradient_id(gradient_id, &mut *tx).await?;
    gradient_delete_repo::soft_delete_stop_by_gradient_id(gradient_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}

#[tauri::command]
pub async fn delete_layer(
    state: tauri::State<'_, DbState>,
    layer_id: i64,
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    gradient_delete_repo::soft_delete_gradient_layer_by_id(layer_id, &mut *tx).await?;
    gradient_delete_repo::soft_delete_stop_by_layer_id(layer_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}

#[tauri::command]
pub async fn delete_stop(state: tauri::State<'_, DbState>, stop_id: i64) -> Result<(), TauriError> {
    gradient_delete_repo::soft_delete_stop_by_id(stop_id, &state.pool).await?;
    Ok(())
}

#[tauri::command]
pub async fn update_gradient_summary(
    state: tauri::State<'_, DbState>,
    gradient_request: GradientUpdateRequest,
) -> Result<GradientDataModel, TauriError> {
    let mut tx = state.pool.begin().await?;

    gradient_update_repo::update_gradient_async(&gradient_request, &mut *tx).await?;
    let gradient = gradient_get_repo::get_gradient_by_id(gradient_request.id, &mut *tx).await?;

    tx.commit().await?;

    Ok(gradient)
}
