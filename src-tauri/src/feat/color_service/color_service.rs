use crate::infra::error::TauriError;
use crate::state::DbState;

use super::model::*;
use super::repo::*;

/// Creates a color and associates it with an optional parent palette in a single transaction.
///
/// # Returns
///
/// The identifier of the newly created color.
///
/// # Examples
///
/// ```no_run
/// # async fn example(
/// #     state: tauri::State<'_, DbState>,
/// #     color: color_create_model::ColorCreateModel,
/// # ) -> Result<(), TauriError> {
/// let color_id = create_color(state, color, None).await?;
/// assert!(color_id > 0);
/// # Ok(())
/// # }
/// ```
pub async fn create_color(
    state: tauri::State<'_, DbState>,
    color: color_create_model::ColorCreateModel,
    parent_palette_id: Option<i64>,
) -> Result<i64, TauriError> {
    let mut tx = state.pool.begin().await?;

    let color_id = color_create_repo::create_gradient(&color, &mut *tx).await?;
    color_create_repo::create_block_color(color_id, parent_palette_id, &mut *tx).await?;

    tx.commit().await?;

    Ok(color_id)
}

/// Retrieves a color by its identifier.
///
/// # Examples
///
/// ```no_run
/// # async fn example(state: tauri::State<'_, DbState>) -> Result<(), TauriError> {
/// let color = get_color(state, 42).await?;
/// # let _ = color;
/// # Ok(())
/// # }
/// ```
///
/// # Returns
///
/// The color associated with `color_id`.
///
/// # Arguments
///
/// * `color_id` - The identifier of the color to retrieve.
pub async fn get_color(
    state: tauri::State<'_, DbState>,
    color_id: i64,
) -> Result<color_data_model::Color, TauriError> {
    let color = color_get_repo::get_color_by_id(color_id, &state.pool).await?;
    Ok(color)
}
