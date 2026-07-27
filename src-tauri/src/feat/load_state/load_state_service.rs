use std::collections::HashMap;

use crate::{feat::gradient_service::model::{gradient_data_mapper::build_stop_response, gradient_data_model::{Gradient, GradientLayer, GradientStop}, gradient_service_response::{GradientLayerResponse, GradientResponse}}, infra::error::TauriError, state::DbState};
use super::load_state_repo;

#[tauri::command]
pub async fn get_all_gradient(
    state: tauri::State<'_, DbState>,
) -> Result< Vec<GradientResponse>, TauriError> {
    let mut tx = state.pool.begin().await?;

    let gradients = load_state_repo::get_all_gradients(&mut *tx).await?;
    let layers = load_state_repo::get_all_gradient_layers(&mut *tx).await?;
    let stops = load_state_repo::get_all_gradient_stops(&mut *tx).await?;
    tx.commit().await?;

    let response = build_all_gradients_response_fast(&gradients, &layers, &stops);

    Ok(response)
}

pub fn build_all_gradients_response_fast(
    gradients: &[Gradient],
    layers: &[GradientLayer],
    stops: &[GradientStop],
) -> Vec<GradientResponse> {
    // 1. Group stops by layer_id
    let mut stops_by_layer: HashMap<i64, Vec<&GradientStop>> = HashMap::new();
    for stop in stops {
        stops_by_layer.entry(stop.layer_id).or_default().push(stop);
    }

    // 2. Group layers by gradient_id
    let mut layers_by_gradient: HashMap<i64, Vec<&GradientLayer>> = HashMap::new();
    for layer in layers {
        layers_by_gradient.entry(layer.gradient_id).or_default().push(layer);
    }

    // 3. Assemble response efficiently
    gradients
        .iter()
        .map(|gradient| {
            let empty_layers = Vec::new();
            let gradient_layers = layers_by_gradient.get(&gradient.id).unwrap_or(&empty_layers);

            let layer_responses = gradient_layers
                .iter()
                .map(|layer| {
                    let empty_stops = Vec::new();
                    let layer_stops = stops_by_layer.get(&layer.id).unwrap_or(&empty_stops);

                    GradientLayerResponse {
                        id: layer.id,
                        gradient_order: layer.gradient_order,
                        gradient_type: layer.gradient_type.clone(),
                        rotation_degree: layer.rotation_degree,
                        pattern_repeat_number: layer.pattern_repeat_number,
                        color_space: layer.color_space.clone(),
                        easing_function: layer.easing_function.clone(),
                        stops: layer_stops.iter().map(|s| build_stop_response(s)).collect(),
                    }
                })
                .collect();

            GradientResponse {
                id: gradient.id,
                name: gradient.name.clone(),
                layers: layer_responses,
            }
        })
        .collect()
}