use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientResponse {
    pub id: i64,
    pub name: String,
    pub parent_palette_id: Option<i64>,
    pub block_order: i64,
    pub block_id: i64,
    pub layers: Vec<GradientLayerResponse>,
    pub kind: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientLayerResponse {
    pub id: i64,
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
    pub id: i64,
    pub gradient_order: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub alpha: Option<f64>,
    pub position: f64,
}
