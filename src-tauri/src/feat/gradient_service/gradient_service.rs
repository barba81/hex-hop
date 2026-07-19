use crate::feat::gradient_service::gradient_data_model::Gradient;
use crate::feat::gradient_service::gradient_service_request::GradientRequest;
use crate::state::DbState;
use crate::repo;

#[tauri::command]
pub async fn get_gradient(
    state: tauri::State<'_, DbState>,
    id: i64) -> Result<Gradient, String>{
    let mut tx: sqlx::Transaction<'_, sqlx::Sqlite> = state.pool.begin().await.map_err(|e| e.to_string())?;

    let gradient = repo::gradient::get_gradient(id, &mut tx).await.map_err(|e| e.to_string())?;
    
    tx.commit().await.map_err(|e| e.to_string())?;

    Ok(gradient)
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
