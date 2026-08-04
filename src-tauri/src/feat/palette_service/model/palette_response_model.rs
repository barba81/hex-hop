use serde::{Deserialize, Serialize};

use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_service_response::GradientResponse,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaletteResponseModel {
    pub id: i64,
    pub name: String,
    pub block_order: i64,
    pub block_id: i64,
    pub kind: String,
    pub blocks: Vec<BlockChildResponse>,
}

#[derive(Debug, Serialize, Clone)]
pub enum BlockChildResponse {
    #[serde(rename = "color")]
    Color(ColorDataModel),
    #[serde(rename = "gradient")]
    Gradient(GradientResponse),
}
