use crate::{
    feat::{block_service::{
        model::block_update_model::{BlockUpdateModel, ReorderBlockUpdateModel},
        repo::{delete_repo, update_repo},
    }, color_formula_service::color_formula_model::{ColorCopyFormulaModel}, color_service::model::color_create_model::ColorCreateModel}, infra::error::TauriError, state::DbState,
};

#[tauri::command]
pub async fn create_color_copy_formul(
    state: tauri::State<'_, DbState>,
    color_copy_formul: ColorCopyFormulaModel,
) -> Result<ColorCopyFormulaModel, TauriError> {
    Ok(())
}


#[tauri::command]
pub async fn get_all_color_copy_formul(
    state: tauri::State<'_, DbState>,
) -> Result<Vec<ColorCopyFormulaModel>, TauriError> {
    Ok(())
}


#[tauri::command]
pub async fn delete_color_copy_formul(
    state: tauri::State<'_, DbState>,
    color_formula_id: i64,
) -> Result<(), TauriError> {
    // delete_repo::soft_delete_block(block_id, true, &state.pool).await?;
    Ok(())
}


#[tauri::command]
pub async fn update_color_copy_formul(
    state: tauri::State<'_, DbState>,
     color_copy_formul: ColorCopyFormulaModel,
) -> Result<ColorCopyFormulaModel, TauriError> {
    // delete_repo::soft_delete_block(block_id, true, &state.pool).await?;
    Ok(())
}
