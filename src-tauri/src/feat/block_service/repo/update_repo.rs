use sqlx::{QueryBuilder, Sqlite};

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

pub async fn set_up_blocks_to_palette<'a, E>(
    palette_id: i64,
    block_ids: &[i64],
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if block_ids.is_empty() {
        return Ok(());
    }

    let mut builder: QueryBuilder<Sqlite> =
        QueryBuilder::new("UPDATE block SET parent_palette_id = ");

    builder.push_bind(palette_id);

    builder.push(" WHERE block.id IN (");

    let mut separated = builder.separated(", ");
    for id in block_ids {
        separated.push_bind(id);
    }
    separated.push_unseparated(")");

    builder.build().execute(executor).await?;

    Ok(())
}
