use serde::Deserialize;
use crate::state::DbState;
use crate::repo;

#[tauri::command]
pub async fn save_gradient(
    state: tauri::State<'_, DbState>,
    gradient: GradientInput,
) -> Result<i64, String> {

    let mut tx = state.pool.begin().await.map_err(|e| e.to_string())?;

    let gradient_id = repo::gradient::create_gradient(&gradient, &mut tx)
        .await
        .map_err(|e| e.to_string())?;

    for layer in gradient.layers{
        let layer_id = repo::gradient::create_layer(&layer, gradient_id, &mut tx)
        .await
        .map_err(|e| e.to_string())?;
        
        for stop in layer.stops{
            repo::gradient::create_stop(&stop, layer_id, &mut tx)
            .await
            .map_err(|e| e.to_string())?;
        }
    }

   tx.commit().await.map_err(|e| e.to_string())?;

    Ok(gradient_id)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientStopInput {
    pub order: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: f64,
    pub position: f64,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientLayerInput {
    pub order: i64,
    pub gradient_type: String,
    pub rotation_degree: f64,
    pub pattern_repeat_number: f64,
    pub color_space: String,
    pub easing_function: String,
    pub stops: Vec<GradientStopInput>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GradientInput {
    pub order: i64,
    pub name: String,
    pub palette_id: Option<i64>,
    pub layers: Vec<GradientLayerInput>,
}

