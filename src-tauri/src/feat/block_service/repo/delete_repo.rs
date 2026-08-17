use sqlx::{QueryBuilder, Sqlite};

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

pub async fn soft_delete_clipboard<'a, E>(executor: E) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let ids = sqlx::query_scalar!(
        "UPDATE block
         SET deleted = 1
         WHERE deleted = 0
         RETURNING id",
    )
    .fetch_all(executor)
    .await?;

    Ok(ids)
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

pub async fn soft_delete_blocks<'a, E>(
    block_ids: &[i64],
    delete: bool,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = Sqlite>,
{
    if block_ids.is_empty() {
        return Ok(());
    }

    let mut builder: QueryBuilder<Sqlite> = QueryBuilder::new("UPDATE block SET deleted = ");

    builder.push_bind(delete);

    builder.push(" WHERE block.id IN (");

    let mut separated = builder.separated(", ");
    for id in block_ids {
        separated.push_bind(id);
    }
    separated.push_unseparated(")");

    builder.build().execute(executor).await?;

    Ok(())
}
