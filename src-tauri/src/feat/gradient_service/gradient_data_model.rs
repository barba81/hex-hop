use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Gradient {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GradientLayer {
    pub id: i64,
    pub gradient_order: i32,
    pub gradient_id: i64,
    pub gradient_type: i32,
    pub rotation_degree: f64,
    pub pattern_repeat_number: i32,
    pub color_space: i32,
    pub easing_function: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GradientStop {
    pub id: i64,
    pub gradient_order: i32,
    pub layer_id: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: f64,
    pub position: f64,
}