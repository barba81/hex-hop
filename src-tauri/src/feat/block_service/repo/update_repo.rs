pub async fn update_block<'a, E>(
    block_id: i64,
    block_order: i64,
    parent_palette_id: Option<i64>,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE block 
        SET parent_palette_id = $1 ,  
            block_order = $2
        WHERE id = $3",
        parent_palette_id,
        block_order,
        block_id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
