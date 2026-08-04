use crate::{feat::block_service::repo::delete_repo, infra::error::TauriError, state::DbState};

#[tauri::command]
pub async fn soft_delete_block(
    state: tauri::State<'_, DbState>,
    block_id: i64,
) -> Result<(), TauriError> {
    delete_repo::soft_delete_block(block_id, &state.pool).await?;
    Ok(())
}

#[tauri::command]
pub async fn soft_delete_clipboard(state: tauri::State<'_, DbState>) -> Result<(), TauriError> {
    delete_repo::soft_delete_clipboard(&state.pool).await?;
    Ok(())
}
