pub async fn soft_delete_block<'a, E>(
    block_id: i64,
    delete: bool,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE block
            SET deleted = $2
            WHERE block.id = $1",
        block_id,
        delete
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn soft_delete_clipboard<'a, E>(executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE block
            SET deleted = 1",
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn hard_delete_blocks<'a, E>(executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!("DELETE FROM block WHERE deleted = 1")
        .execute(executor)
        .await?;

    Ok(())
}
