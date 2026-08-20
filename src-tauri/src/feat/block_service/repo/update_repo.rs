use sqlx::{QueryBuilder, Sqlite};

use crate::feat::block_service::model::block_update_model::ReorderBlockUpdateModel;

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

pub async fn update_block_order<'a, E>(
    reorder_blocks: &[ReorderBlockUpdateModel],
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if reorder_blocks.is_empty() {
        return Ok(());
    }

    let mut builder: QueryBuilder<Sqlite> = QueryBuilder::new("WITH data(id, block_order) AS (");

    builder.push_values(reorder_blocks, |mut b, elem| {
        b.push_bind(elem.block_id).push_bind(elem.block_order);
    });

    builder.push(
        ") UPDATE block SET block_order = data.block_order FROM data WHERE block.id = data.id;",
    );

    builder.build().execute(executor).await?;

    Ok(())
}

pub async fn get_block_ids<'a, E>(
    parent_palette_id: Option<i64>,
    executor: E,
) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let ids = sqlx::query_scalar!(
        r#"
        SELECT b.id AS "id!"
        FROM block b
        WHERE b.parent_palette_id IS ?1
          AND b.deleted = 0
        ORDER BY block_order DESC
    "#,
        parent_palette_id
    )
    .fetch_all(executor)
    .await?;

    Ok(ids)
}
