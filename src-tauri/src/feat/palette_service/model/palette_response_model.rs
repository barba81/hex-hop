use serde::Serialize;

use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_service_response::GradientResponse,
};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PaletteResponseModel {
    pub id: i64,
    pub name: String,
    pub block_order: i64,
    pub block_id: i64,
    pub kind: String,
    pub blocks: Option<Vec<BlockChildResponse>>,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
#[serde(untagged)]
pub enum BlockChildResponse {
    Color(ColorDataModel),
    Gradient(GradientResponse),
}
