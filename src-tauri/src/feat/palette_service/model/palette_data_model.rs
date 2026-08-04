use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaletteDataModel {
    pub id: i64,
    pub name: String,
    pub block_order: i64,
    pub block_id: i64,
    pub kind: String,
}
