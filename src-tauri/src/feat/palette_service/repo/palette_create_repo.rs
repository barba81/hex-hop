use super::super::model::*;

pub async fn create_palette<'a, E>(
    gradient: &palette_create_model::PaletteCreateModel,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id: i64 = sqlx::query_scalar!(
        "INSERT INTO palette (name) VALUES ($1) RETURNING id",
        gradient.name
    )
    .fetch_one(executor)
    .await?;

    Ok(id)
}

pub async fn create_block_palette<'a, E>(
    sub_palette_id: i64,
    parent_palette_id: Option<i64>,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "INSERT INTO block (sub_palette_id, parent_palette_id, block_order) 
        VALUES (
            $1, 
            $2, 
            (SELECT COALESCE(MAX(block_order), 0) + 1 FROM block WHERE parent_palette_id IS $2)
        );",
        sub_palette_id,
        parent_palette_id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
