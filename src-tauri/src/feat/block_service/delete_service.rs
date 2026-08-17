use crate::{feat::block_service::repo::delete_repo, infra::error::TauriError, state::DbState};

#[tauri::command]
pub async fn soft_delete_block(
    state: tauri::State<'_, DbState>,
    block_id: i64,
) -> Result<(), TauriError> {
    delete_repo::soft_delete_block(block_id, true, &state.pool).await?;
    Ok(())
}

#[tauri::command]
pub async fn soft_delete_clipboard(
    state: tauri::State<'_, DbState>,
) -> Result<Vec<i64>, TauriError> {
    let ids = delete_repo::soft_delete_clipboard(&state.pool).await?;
    Ok(ids)
}

#[tauri::command]
pub async fn hard_delete_blocks(state: tauri::State<'_, DbState>) -> Result<(), TauriError> {
    delete_repo::hard_delete_blocks(&state.pool).await?;

    Ok(())
}

#[tauri::command]
pub async fn restore_block(
    state: tauri::State<'_, DbState>,
    block_id: i64,
) -> Result<(), TauriError> {
    delete_repo::soft_delete_block(block_id, false, &state.pool).await?;
    Ok(())
}

#[tauri::command]
pub async fn restore_blocks(
    state: tauri::State<'_, DbState>,
    block_ids: Vec<i64>,
) -> Result<(), TauriError> {
    delete_repo::soft_delete_blocks(&block_ids, false, &state.pool).await?;
    Ok(())
}
