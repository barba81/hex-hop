use super::gradient_create_model::*;
use super::gradient_data_model::*;
use super::gradient_service_request::*;
use super::gradient_service_response::*;

pub fn build_stop_response(stop: &GradientStopDataModel) -> GradientStopResponse {
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
    layer: &GradientLayerDataModel,
    all_stops: &[GradientStopDataModel],
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
    gradient: &GradientDataModel,
    layers: &[GradientLayerDataModel],
    stops: &[GradientStopDataModel],
) -> GradientResponse {
    let layers_response = layers
        .iter()
        .map(|layer| build_layer_response(layer, stops))
        .collect();

    GradientResponse {
        id: gradient.id,
        name: gradient.name.clone(),
        block_order: gradient.block_order,
        layers: layers_response,
        block_id: gradient.block_id,
        parent_palette_id: gradient.parent_palette_id,
        kind: gradient.kind.clone(),
    }
}

pub fn build_creation_stop_model(
    stop_request: &GradientStopRequest,
    layer_id: i64,
) -> GradientStopCreateModel {
    GradientStopCreateModel {
        gradient_order: stop_request.gradient_order,
        layer_id: layer_id,
        r: stop_request.r,
        g: stop_request.g,
        b: stop_request.b,
        a: stop_request.a,
        position: stop_request.position,
    }
}

pub fn build_layer_model(
    layer_request: &GradientLayerRequest,
    gradient_id: i64,
) -> GradientLayerCreateModel {
    GradientLayerCreateModel {
        gradient_id: gradient_id,
        gradient_order: layer_request.gradient_order,
        gradient_type: layer_request.gradient_type.clone(),
        rotation_degree: layer_request.rotation_degree,
        pattern_repeat_number: layer_request.pattern_repeat_number,
        color_space: layer_request.color_space.clone(),
        easing_function: layer_request.easing_function.clone(),
    }
}

pub fn build_gradient_model(gradient_request: &GradientRequest) -> GradientCreateModel {
    GradientCreateModel {
        name: gradient_request.name.clone(),
    }
}
