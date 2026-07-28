use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::{*};
use super::repo::{*};

#[tauri::command]
pub async fn create_color(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorCreateModel,
) -> Result<i64, TauriError> {

    let mut tx = state.pool.begin().await?;

    let color_id = color_create_repo::create_gradient(&color, &mut *tx).await?;
    
    tx.commit().await?;

    Ok(color_id)
}