use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ColorCreateModel {
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub alpha: Option<f64>,
    pub name: String,
}
