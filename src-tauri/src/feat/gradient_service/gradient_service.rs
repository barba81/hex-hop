use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::gradient_service_request::{*};
use super::model::gradient_service_response::{*};
use super::model::gradient_data_mapper::{*};
use super::model::gradient_data_model::{*};


#[tauri::command]
pub async fn get_stop(
    state: tauri::State<'_, DbState>,
    stop_id: i64,
) -> Result<GradientStopResponse, TauriError> {
    let stop = repo::gradient::get_gradient_stops_by_stop_id(stop_id, &state.pool).await?;
    Ok(build_stop_response(&stop))
}

#[tauri::command]
pub async fn get_layer(
    state: tauri::State<'_, DbState>,
    layer_id: i64,
) -> Result<GradientLayerResponse, TauriError> {
    let layer = repo::gradient::get_gradient_layers_by_layer_id(layer_id, &state.pool).await?;
    let stops = repo::gradient::get_gradient_stops_by_layer_id(layer_id, &state.pool).await?;
    Ok(build_layer_response(&layer, &stops))
}

#[tauri::command]
pub async fn get_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64,
) -> Result<GradientResponse, TauriError> {
    let gradient = repo::gradient::get_gradient_by_id(gradient_id, &state.pool).await?;
    let layers = repo::gradient::get_gradient_layers_by_gradient_id(gradient_id, &state.pool).await?;
    let stops = repo::gradient::get_gradient_stops_by_gradient_id(gradient_id, &state.pool).await?;
    Ok(build_gradient_response(&gradient, &layers, &stops))
}

#[tauri::command]
pub async fn save_gradient(
    state: tauri::State<'_, DbState>,
    gradient: GradientRequest,
) -> Result<i64, TauriError> {

    let mut tx = state.pool.begin().await?;

    let gradient_id = repo::gradient::create_gradient(&gradient, &mut *tx).await?;

    let layers: Vec<GradientLayerCreateModel> = gradient
        .layers
        .iter()
        .map(|layer| build_layer_model(& layer, gradient_id))
        .collect();

    let layer_ids = repo::gradient::create_layers(&layers, &mut *tx).await?;

    let all_stops: Vec<GradientStopCreateModel> = gradient
        .layers
        .iter()
        .zip(layer_ids.iter()) // Pair each original layer with its generated layer_id
        .flat_map(|(layer, &layer_id)| {
            layer.stops.iter().map(move |stop| build_creation_stop_model(&stop, layer_id))
        })
        .collect();

     repo::gradient::create_stops(&all_stops, &mut *tx).await?;

   tx.commit().await?;

   Ok(gradient_id)
}

#[tauri::command]
pub async fn save_layer(
    state: tauri::State<'_, DbState>,
    layer: GradientLayerRequest,
    gradient_id: i64 
) -> Result<i64, TauriError> {

    let mut tx = state.pool.begin().await?;

    let layer_id = repo::gradient::create_layer(&layer, gradient_id, &mut *tx).await?;

    let stops: Vec<GradientStopCreateModel> = layer
        .stops
        .iter()
        .map(|stop|build_creation_stop_model(&stop, layer_id))
        .collect();

    repo::gradient::create_stops(&stops, &mut *tx).await?;
    
    tx.commit().await?;

    Ok(layer_id)
}

#[tauri::command]
pub async fn save_stop(
    state: tauri::State<'_, DbState>,
    stop: GradientStopRequest,
    layer_id: i64 
) -> Result<i64, TauriError> {
    Ok(repo::gradient::create_stop(&stop, layer_id, &state.pool).await?)
}


#[tauri::command]
pub async fn update_gradient(
    state: tauri::State<'_, DbState>,
    gradient: Gradient,
) -> Result<(), TauriError> {
    Ok(repo::gradient::update_gradient_async(&gradient, &state.pool).await?)
}


#[tauri::command]
pub async fn update_gradient_layer(
    state: tauri::State<'_, DbState>,
    layer: GradientLayer,
) -> Result<(), TauriError> {
    Ok(repo::gradient::update_gradient_layer_async(&layer, &state.pool).await?)
}


#[tauri::command]
pub async fn update_stop(
    state: tauri::State<'_, DbState>,
    stop: GradientStop,
) -> Result<(), TauriError> {
    Ok(repo::gradient::update_stop(&stop, &state.pool).await?)
}

#[tauri::command]
pub async fn delete_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64 
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    repo::gradient::soft_delete_gradient_by_id(gradient_id, &mut *tx).await?;
    repo::gradient::soft_delete_gradient_layer_by_gradient_id(gradient_id, &mut *tx).await?;
    repo::gradient::soft_delete_stop_by_gradient_id(gradient_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}


#[tauri::command]
pub async fn delete_layer(
    state: tauri::State<'_, DbState>,
    layer_id: i64 
) -> Result<(), TauriError> {
  let mut tx = state.pool.begin().await?;

    repo::gradient::soft_delete_gradient_layer_by_id(layer_id, &mut *tx).await?;
    repo::gradient::soft_delete_stop_by_layer_id(layer_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}


#[tauri::command]
pub async fn delete_stop(
    state: tauri::State<'_, DbState>,
    stop_id: i64 
) -> Result<(), TauriError> {
    repo::gradient::soft_delete_stop_by_id(stop_id, &state.pool).await?;
    Ok(())
}
