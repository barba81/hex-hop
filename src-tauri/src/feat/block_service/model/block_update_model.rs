use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BlockUpdateModel {
    pub block_id: i64,
    pub order: i64,
    pub parent_palette_id: Option<i64>,
}
