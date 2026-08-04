pub async fn soft_delete_block<'a, E>(block_id: i64, executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    // sqlx::query!(
    //     "INSERT INTO block (sub_palette_id, parent_palette_id, block_order)
    //         VALUES (
    //             $1,
    //             $2,
    //             (SELECT COALESCE(MAX(block_order), 0) + 1 FROM block WHERE parent_palette_id IS $2)
    //         );",

    // )
    // .execute(executor)
    // .await?;

    Ok(())
}
