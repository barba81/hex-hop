use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ColorDataModel {
    pub id: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: Option<f64>,
    pub name: String,
    pub block_order: i64,
    pub block_id: i64,
    pub parent_palette_id: Option<i64>,
    pub kind: String,
}
