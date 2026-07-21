use crate::feat::gradient_service::gradient_service_request::GradientRequest;
use crate::feat::gradient_service::gradient_service_response::{GradientLayerResponse, GradientResponse, GradientStopResponse};
use crate::state::DbState;
use crate::repo;

#[tauri::command]
pub async fn get_gradient(
    state: tauri::State<'_, DbState>,
    gradient_id: i64) -> Result<GradientResponse, String>{
    let mut tx: sqlx::Transaction<'_, sqlx::Sqlite> = state.pool.begin().await.map_err(|e| e.to_string())?;

    let gradient = repo::gradient::get_gradient_by_id(gradient_id, &mut tx).await.map_err(|e| e.to_string())?;
    let gradient_layers = repo::gradient::get_gradient_layers_by_gradient_id(gradient_id, &mut tx).await.map_err(|e| e.to_string())?;
    let gradient_stops = repo::gradient::get_gradient_stops_by_gradient_id(gradient_id, &mut tx).await.map_err(|e| e.to_string())?;
    
    tx.commit().await.map_err(|e| e.to_string())?;
   
    let layers_response: Vec<GradientLayerResponse> = gradient_layers
        .into_iter()
        .map(|layer| {
            // Find and map all stops belonging to this specific layer
            let layer_stops: Vec<GradientStopResponse> = gradient_stops
                .iter()
                .filter(|stop| stop.layer_id == layer.id)
                .map(|stop| GradientStopResponse {
                    gradient_order: stop.gradient_order,
                    r: stop.r,
                    g: stop.g,
                    b: stop.b,
                    a: stop.a.unwrap_or(1.0),
                    position: stop.position,
                })
                .collect();

            GradientLayerResponse {
                gradient_order: layer.gradient_order,
                gradient_type: layer.gradient_type,
                rotation_degree: layer.rotation_degree,
                pattern_repeat_number: layer.pattern_repeat_number,
                color_space: layer.color_space,
                easing_function: layer.easing_function,
                stops: layer_stops,
            }
        })
        .collect();

    let response = GradientResponse {
        name: gradient.name,
        layers: layers_response,
    };


    Ok(response)
} 

#[tauri::command]
pub async fn save_gradient(
    state: tauri::State<'_, DbState>,
    gradient: GradientRequest,
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
