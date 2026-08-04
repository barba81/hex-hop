use std::collections::HashMap;

use crate::feat::gradient_service::model::{
    gradient_data_mapper::build_stop_response,
    gradient_data_model::{GradientDataModel, GradientLayerDataModel, GradientStopDataModel},
    gradient_service_response::{GradientLayerResponse, GradientResponse},
};

pub fn build_all_gradients_response_fast(
    gradients: &[GradientDataModel],
    layers: &[GradientLayerDataModel],
    stops: &[GradientStopDataModel],
) -> Vec<GradientResponse> {
    let mut stops_by_layer: HashMap<i64, Vec<&GradientStopDataModel>> = HashMap::new();
    for stop in stops {
        stops_by_layer.entry(stop.layer_id).or_default().push(stop);
    }

    let mut layers_by_gradient: HashMap<i64, Vec<&GradientLayerDataModel>> = HashMap::new();
    for layer in layers {
        layers_by_gradient
            .entry(layer.gradient_id)
            .or_default()
            .push(layer);
    }

    gradients
        .iter()
        .map(|gradient| {
            let empty_layers = Vec::new();
            let gradient_layers = layers_by_gradient
                .get(&gradient.id)
                .unwrap_or(&empty_layers);

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
                block_order: gradient.block_order,
                parent_palette_id: gradient.parent_palette_id,
            }
        })
        .collect()
}
