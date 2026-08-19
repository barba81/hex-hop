pub async fn create_block<'a, E>(
    parent_palette_id: Option<i64>,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let block_id: i64 = sqlx::query_scalar!(
        "INSERT INTO block (parent_palette_id, block_order) 
        VALUES (
            $1, 
            (SELECT COALESCE(MAX(block_order), 0) + 1 FROM block WHERE parent_palette_id IS $1 AND deleted=0)
        ) RETURNING id",
        parent_palette_id
    )
    .fetch_one(executor)
    .await?;

    Ok(block_id)
}
