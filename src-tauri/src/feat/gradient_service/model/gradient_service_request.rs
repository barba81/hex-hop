use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientRequest {
    pub name: String,
    pub layers: Vec<GradientLayerRequest>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientLayerRequest {
    pub gradient_order: i64,
    pub gradient_type: String,
    pub rotation_degree: f64,
    pub pattern_repeat_number: i64,
    pub color_space: String,
    pub easing_function: String,
    pub stops: Vec<GradientStopRequest>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientStopRequest {
    pub gradient_order: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: Option<f64>,
    pub position: f64,
}
