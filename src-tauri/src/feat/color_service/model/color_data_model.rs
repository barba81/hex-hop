use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Color {
    pub id: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: Option<f64>,
    pub name: String,
}
