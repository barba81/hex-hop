use serde::Serialize;

use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_service_response::GradientResponse,
    palette_service::model::palette_response_model::PaletteResponseModel,
};

#[derive(Debug, Serialize, Clone)]
#[serde(tag = "kind")]
pub enum BlockResponse {
    #[serde(rename = "palette")]
    Palette(PaletteResponseModel),
    #[serde(rename = "color")]
    Color(ColorDataModel),
    #[serde(rename = "gradient")]
    Gradient(GradientResponse),
}
