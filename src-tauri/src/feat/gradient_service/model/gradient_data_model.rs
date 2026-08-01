use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Gradient {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GradientLayer {
    pub id: i64,
    pub gradient_order: i64,
    pub gradient_id: i64,
    pub gradient_type: String,
    pub rotation_degree: f64,
    pub pattern_repeat_number: i64,
    pub color_space: String,
    pub easing_function: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GradientStop {
    pub id: i64,
    pub gradient_order: i64,
    pub layer_id: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: Option<f64>,
    pub position: f64,
}
