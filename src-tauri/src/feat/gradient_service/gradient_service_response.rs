use serde::{Deserialize,Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientResponse {
    pub name: String,
    pub layers: Vec<GradientLayerResponse>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientLayerResponse {
    pub gradient_order: i64,
    pub gradient_type: String,
    pub rotation_degree: f64,
    pub pattern_repeat_number: i64,
    pub color_space: String,
    pub easing_function: String,
    pub stops: Vec<GradientStopResponse>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientStopResponse {
    pub gradient_order: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: f64,
    pub position: f64,
}


