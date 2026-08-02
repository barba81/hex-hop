use super::gradient_create_model::*;
use super::gradient_data_model::*;
use super::gradient_service_request::*;
use super::gradient_service_response::*;

/// Converts a gradient stop into its response model.

///

/// # Examples

///

/// ```

/// let response = build_stop_response(&stop);

/// assert_eq!(response.id, stop.id);

/// assert_eq!(response.position, stop.position);

/// ```
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

/// Builds a gradient response from a gradient and its layers and stops.
///
/// Each layer includes the stops associated with that layer.
///
/// # Arguments
///
/// * `gradient` - The gradient to convert.
/// * `layers` - The gradient layers to include.
/// * `stops` - The stops to associate with their matching layers.
///
/// # Returns
///
/// A response containing the gradient's identity, name, and converted layers.
///
/// # Examples
///
/// ```
/// # let gradient: Gradient = todo!();
/// # let layers: Vec<GradientLayer> = Vec::new();
/// # let stops: Vec<GradientStop> = Vec::new();
/// let response = build_gradient_response(&gradient, &layers, &stops);
/// assert_eq!(response.id, gradient.id);
/// ```
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

/// Builds a creation model for a gradient stop and assigns it to a layer.
///
/// # Arguments
///
/// * `stop_request` - The requested stop properties to copy into the model.
/// * `layer_id` - The identifier of the layer that owns the stop.
///
/// # Returns
///
/// A creation model containing the stop properties and assigned layer identifier.
///
/// # Examples
///
/// ```
/// let request = GradientStopRequest {
///     gradient_order: 0,
///     r: 255,
///     g: 128,
///     b: 64,
///     a: 255,
///     position: 0.5,
/// };
/// let model = build_creation_stop_model(&request, 7);
///
/// assert_eq!(model.layer_id, 7);
/// assert_eq!(model.position, 0.5);
/// ```
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

/// Builds a gradient layer creation model from a layer request and gradient identifier.
///
/// # Examples
///
/// ```
/// let request = GradientLayerRequest::default();
/// let model = build_layer_model(&request, 42);
///
/// assert_eq!(model.gradient_id, 42);
/// ```
///
/// # Arguments
///
/// * `layer_request` - The layer configuration to convert.
/// * `gradient_id` - The identifier of the gradient containing the layer.
///
/// # Returns
///
/// A creation model containing the gradient identifier and copied layer configuration.
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

/// Builds a gradient creation model from a gradient request.
///
/// # Examples
///
/// ```
/// let request = GradientRequest {
///     name: "Sunset".to_owned(),
/// };
/// let model = build_gradient_model(&request);
///
/// assert_eq!(model.name, "Sunset");
/// ```
pub fn build_gradient_model(gradient_request: &GradientRequest) -> GradientCreateModel {
    GradientCreateModel {
        name: gradient_request.name.clone(),
    }
}
