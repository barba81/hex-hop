use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

/// Retrieves a gradient stop by its identifier.
///
/// # Arguments
///
/// * `stop_id` - The identifier of the gradient stop to retrieve.
///
/// # Returns
///
/// The gradient stop response for the specified identifier.
///
/// # Examples
///
/// ```no_run
/// # async fn example(state: tauri::State<'_, DbState>) -> Result<(), TauriError> {
/// let stop = get_stop(state, 42).await?;
/// # Ok(())
/// # }
/// ```
pub async fn get_stop(
    state: tauri::State<'_, DbState>,
    stop_id: i64,
) -> Result<gradient_service_response::GradientStopResponse, TauriError> {
    let stop = gradient_get_repo::get_gradient_stops_by_stop_id(stop_id, &state.pool).await?;
    Ok(gradient_data_mapper::build_stop_response(&stop))
}

/// Retrieves a gradient layer and its stops by layer ID.
///
/// # Arguments
///
/// * `layer_id` - The ID of the layer to retrieve.
///
/// # Returns
///
/// The layer response containing the layer data and its gradient stops.
///
/// # Errors
///
/// Returns `TauriError` if retrieving the layer or its stops fails.
///
/// # Examples
///
/// ```no_run
/// # async fn example(
/// #     state: tauri::State<'_, DbState>,
/// # ) -> Result<(), TauriError> {
/// let layer = get_layer(state, 42).await?;
/// # let _ = layer;
/// # Ok(())
/// # }
/// ```
pub async fn get_layer(
    state: tauri::State<'_, DbState>,
    layer_id: i64,
) -> Result<gradient_service_response::GradientLayerResponse, TauriError> {
    let layer = gradient_get_repo::get_gradient_layers_by_layer_id(layer_id, &state.pool).await?;
    let stops = gradient_get_repo::get_gradient_stops_by_layer_id(layer_id, &state.pool).await?;
    Ok(gradient_data_mapper::build_layer_response(&layer, &stops))
}

/// Retrieves a gradient and its associated layers and stops.
///
/// # Arguments
///
/// * `gradient_id` - The identifier of the gradient to retrieve.
///
/// # Returns
///
/// The gradient response containing the gradient, its layers, and their stops.
///
/// # Examples
///
/// ```ignore
/// let response = get_gradient(state, gradient_id).await?;
/// assert_eq!(response.id, gradient_id);
/// ```
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

/// Creates a gradient and its layers and stops in a single transaction.
///
/// # Parameters
///
/// - `gradient`: The gradient definition, including its layers and stops.
///
/// # Returns
///
/// The ID assigned to the created gradient.
///
/// # Examples
///
/// ```no_run
/// let gradient_id = create_gradient(state, gradient).await?;
/// assert!(gradient_id > 0);
/// # Ok::<(), TauriError>(())
/// ```
#[tauri::command]
pub async fn create_gradient(
    state: tauri::State<'_, DbState>,
    gradient: gradient_service_request::GradientRequest,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let gradient_id = gradient_create_repo::create_gradient(&gradient, &mut *tx).await?;

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

/// Creates a gradient layer and its stops within a single transaction.
///
/// # Examples
///
/// ```no_run
/// # async fn example(
/// #     state: tauri::State<'_, DbState>,
/// #     layer: gradient_service_request::GradientLayerRequest,
/// #     gradient_id: i64,
/// # ) -> Result<(), TauriError> {
/// let layer_id = create_layer(state, layer, gradient_id).await?;
/// assert!(layer_id > 0);
/// # Ok(())
/// # }
/// ```
///
/// Returns the identifier of the newly created layer.
///
/// # Errors
///
/// Returns `TauriError` if the transaction or any repository operation fails.
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

/// Creates a gradient stop for a layer and returns its identifier.
///
/// # Arguments
///
/// * `stop` - The stop data to persist.
/// * `layer_id` - The identifier of the layer that owns the stop.
///
/// # Returns
///
/// The identifier assigned to the created stop.
///
/// # Examples
///
/// ```rust,ignore
/// let stop_id = create_stop(state, stop, layer_id).await?;
/// ```
pub async fn create_stop(
    state: tauri::State<'_, DbState>,
    stop: gradient_service_request::GradientStopRequest,
    layer_id: i64,
) -> Result<i64, TauriError> {
    Ok(gradient_create_repo::create_stop(&stop, layer_id, &state.pool).await?)
}

/// Updates a persisted gradient.
///
/// # Arguments
///
/// * `gradient` - The gradient data to persist.
///
/// # Examples
///
/// ```no_run
/// # async fn example() {
/// # let state = todo!();
/// # let gradient = todo!();
/// let result = update_gradient(state, gradient).await;
/// assert!(result.is_ok());
/// # }
/// ```
pub async fn update_gradient(
    state: tauri::State<'_, DbState>,
    gradient: gradient_data_model::Gradient,
) -> Result<(), TauriError> {
    Ok(gradient_update_repo::update_gradient_async(&gradient, &state.pool).await?)
}

/// Updates a persisted gradient layer.
///
/// # Examples
///
/// ```no_run
/// # async fn example(
/// #     state: tauri::State<'_, DbState>,
/// #     layer: gradient_data_model::GradientLayer,
/// # ) -> Result<(), TauriError> {
/// update_gradient_layer(state, layer).await?;
/// # Ok(())
/// # }
/// ```
#[tauri::command]
pub async fn update_gradient_layer(
    state: tauri::State<'_, DbState>,
    layer: gradient_data_model::GradientLayer,
) -> Result<(), TauriError> {
    Ok(gradient_update_repo::update_gradient_layer_async(&layer, &state.pool).await?)
}

/// Updates a persisted gradient stop.
///
/// # Arguments
///
/// * `stop` - The gradient stop containing the updated values.
///
/// # Returns
///
/// `Ok(())` when the stop is updated successfully; otherwise, the repository error is returned as a `TauriError`.
///
/// # Examples
///
/// ```no_run
/// let state: tauri::State<'_, DbState> = todo!();
/// let stop: gradient_data_model::GradientStop = todo!();
///
/// let result = tauri::async_runtime::block_on(update_stop(state, stop));
/// assert!(result.is_ok());
/// ```
pub async fn update_stop(
    state: tauri::State<'_, DbState>,
    stop: gradient_data_model::GradientStop,
) -> Result<(), TauriError> {
    Ok(gradient_update_repo::update_stop(&stop, &state.pool).await?)
}

/// Soft-deletes a gradient and all of its layers and stops in one transaction.
///
/// # Examples
///
/// ```no_run
/// # async fn example(state: tauri::State<'_, DbState>) -> Result<(), TauriError> {
/// delete_gradient(state, 42).await?;
/// # Ok(())
/// # }
/// ```
pub async fn delete_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64,
) -> Result<(), TauriError> {
    let mut tx = state.pool.begin().await?;

    gradient_delete_repo::soft_delete_gradient_by_id(gradient_id, &mut *tx).await?;
    gradient_delete_repo::soft_delete_gradient_layer_by_gradient_id(gradient_id, &mut *tx).await?;
    gradient_delete_repo::soft_delete_stop_by_gradient_id(gradient_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(())
}

/// Soft-deletes a layer and all stops associated with it.
///
/// # Examples
///
/// ```ignore
/// delete_layer(state, layer_id).await?;
/// ```
///
/// # Errors
///
/// Returns an error if the transaction, deletion operations, or commit fails.
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

/// Soft-deletes a gradient stop by its identifier.
///
/// # Examples
///
/// ```no_run
/// # async fn example(state: tauri::State<'_, DbState>) {
/// let result = delete_stop(state, 42).await;
/// assert!(result.is_ok());
/// # }
/// ```
pub async fn delete_stop(state: tauri::State<'_, DbState>, stop_id: i64) -> Result<(), TauriError> {
    gradient_delete_repo::soft_delete_stop_by_id(stop_id, &state.pool).await?;
    Ok(())
}
