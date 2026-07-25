use crate::{feat::gradient_service::gradient_service_response::{GradientLayerResponse, GradientResponse, GradientStopResponse}, repo};
use crate::{feat::gradient_service::gradient_data_model::{GradientStop, GradientLayer, Gradient}};

pub fn build_stop_response(stop: &GradientStop) -> GradientStopResponse {
    GradientStopResponse {
        id: stop.id,
        gradient_order: stop.gradient_order,
        r: stop.r,
        g: stop.g,
        b: stop.b,
        a: stop.a,
        position: stop.position,
    }
}

pub fn build_layer_response(
    layer: &GradientLayer,
    all_stops: &[GradientStop],
) -> GradientLayerResponse {
    let stops = all_stops
        .iter()
        .filter(|stop| stop.layer_id == layer.id)
        .map(build_stop_response)
        .collect();

    GradientLayerResponse {
        id: layer.id,
        gradient_order: layer.gradient_order,
        gradient_type: layer.gradient_type.clone(),
        rotation_degree: layer.rotation_degree,
        pattern_repeat_number: layer.pattern_repeat_number,
        color_space: layer.color_space.clone(),
        easing_function: layer.easing_function.clone(),
        stops,
    }
}

pub fn build_gradient_response(
    gradient: &Gradient,
    layers: &[GradientLayer],
    stops: &[GradientStop],
) -> GradientResponse {
    let layers_response = layers
        .iter()
        .map(|layer| build_layer_response(layer, stops))
        .collect();

    GradientResponse {
        id: gradient.id,
        name: gradient.name.clone(),
        layers: layers_response,
    }
}