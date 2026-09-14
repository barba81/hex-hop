use crate::{
    feat::color_formula_service::{
        color_formula_model::ColorCopyFormulaModel,
        color_formula_repo::{
            create_color_formula, delete_color_formula_repo, get_all_color_formula_repo,
            get_color_formula_repo, update_color_formula,
        },
    },
    infra::error::TauriError,
    state::DbState,
};

#[tauri::command]
pub async fn create_color_copy_formula(
    state: tauri::State<'_, DbState>,
    color_copy_formula: ColorCopyFormulaModel,
) -> Result<ColorCopyFormulaModel, TauriError> {
    create_color_formula(&color_copy_formula, &state.pool).await?;
    let formula = get_color_formula_repo(&color_copy_formula.id, &state.pool).await?;

    Ok(formula)
}

#[tauri::command]
pub async fn get_all_color_copy_formula(
    state: tauri::State<'_, DbState>,
) -> Result<Vec<ColorCopyFormulaModel>, TauriError> {
    let formulas = get_all_color_formula_repo(&state.pool).await?;
    Ok(formulas)
}

#[tauri::command]
pub async fn delete_color_copy_formula(
    state: tauri::State<'_, DbState>,
    color_formula_id: String,
) -> Result<(), TauriError> {
    delete_color_formula_repo(&color_formula_id, &state.pool).await?;
    Ok(())
}

#[tauri::command]
pub async fn update_color_copy_formula(
    state: tauri::State<'_, DbState>,
    color_copy_formula: ColorCopyFormulaModel,
) -> Result<ColorCopyFormulaModel, TauriError> {
    update_color_formula(&color_copy_formula, &state.pool).await?;
    let formula = get_color_formula_repo(&color_copy_formula.id, &state.pool).await?;

    Ok(formula)
}
