use serde::{Serialize, Deserialize};
use sqlx::prelude::FromRow;


#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ColorCopyFormulaModel {
    pub id: String,
    pub formula: String,
    pub formula_order: i32,
    pub formula_name: String,
    pub enabled: bool,
    pub deleted: bool,
    pub icon_id: Option<i32>,
}