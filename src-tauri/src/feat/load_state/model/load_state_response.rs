use serde::Serialize;

use crate::feat::gradient_service::model::gradient_service_response::GradientLayerResponse;

#[derive(Debug, Serialize, Clone)]
#[serde(tag = "kind")]
pub enum BlockResponse {
    #[serde(rename = "palette")]
    Palette(PaletteResponse),
    #[serde(rename = "color")]
    Color(ColorResponse),
    #[serde(rename = "gradient")]
    Gradient(GradientBlockResponse),
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PaletteResponse {
    pub id: i64,
    pub block_id: i64,
    pub block_order: i64,
    pub name: String,
    pub blocks: Vec<BlockResponse>,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ColorResponse {
    pub id: i64,
    pub block_id: i64,
    pub block_order: i64,
    pub name: String,
    pub r: i32,
    pub g: i32,
    pub b: i32,
    pub a: Option<i32>,
    pub palette_id: Option<i64>,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct GradientBlockResponse {
    pub id: i64,
    pub block_id: i64,
    pub block_order: i64,
    pub name: String,
    pub palette_id: Option<i64>,
    pub layers: Vec<GradientLayerResponse>,
}
