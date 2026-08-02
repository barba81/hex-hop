use serde::Serialize;

use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_service_response::{GradientLayerResponse, GradientResponse},
    palette_service::model::palette_data_model::PaletteDataModel,
};

#[derive(Debug, Serialize, Clone)]
#[serde(tag = "kind")]
pub enum BlockResponse {
    #[serde(rename = "palette")]
    Palette(PaletteDataModel),
    #[serde(rename = "color")]
    Color(ColorDataModel),
    #[serde(rename = "gradient")]
    Gradient(GradientResponse),
}
