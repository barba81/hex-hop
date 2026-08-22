use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaletteCreateModel {
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaletteCreateRequest {
    pub name: String,
    pub block_ids: Vec<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaletteUpdateRequest {
    pub id: i64,
    pub name: String,
    pub block_id: i64,
    pub block_order: i64,
    pub parent_palette_id: Option<i64>,
}
