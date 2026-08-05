pub async fn soft_delete_block<'a, E>(block_id: i64, executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE block
            SET deleted = 1
            WHERE block.id = $1",
        block_id
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

pub async fn hard_delete_colors<'a, E>(executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "DELETE FROM color 
        WHERE id IN (
            SELECT color_id 
            FROM block 
            WHERE deleted = 1
        );",
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn hard_delete_palette<'a, E>(executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "DELETE FROM palette 
        WHERE id IN (
            SELECT sub_palette_id 
            FROM block 
            WHERE deleted = 1
        );",
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn hard_delete_gradients<'a, E>(executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "DELETE FROM gradient 
        WHERE id IN (
            SELECT gradient_id
            FROM block 
            WHERE deleted = 1
        );",
    )
    .execute(executor)
    .await?;

    Ok(())
}
