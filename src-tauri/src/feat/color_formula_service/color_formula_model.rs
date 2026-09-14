use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct ColorCopyFormulaModel {
    pub id: String,
    pub formula: String,
    pub formula_order: i64,
    pub formula_name: String,
    pub enabled: i64,
    pub icon_id: Option<i64>,
}
