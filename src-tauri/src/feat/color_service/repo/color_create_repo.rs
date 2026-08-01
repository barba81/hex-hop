use super::super::model::*;

pub async fn create_gradient<'a, E>(
    gradient: &color_create_model::ColorCreateModel,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id: i64 = sqlx::query_scalar!(
        "INSERT INTO color (r,g,b,a,name) VALUES ($1,$2,$3,$4,$5) RETURNING id",
        gradient.r,
        gradient.g,
        gradient.b,
        gradient.a,
        gradient.name
    )
    .fetch_one(executor)
    .await?;

    Ok(id)
}

pub async fn create_block_color<'a, E>(
    color_id: i64,
    parent_palette_id: Option<i64>,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "INSERT INTO block (color_id, parent_palette_id, block_order) 
        VALUES (
            $1, 
            $2, 
            (SELECT COALESCE(MAX(block_order), 0) + 1 FROM block WHERE parent_palette_id = $2)
        );",
        color_id,
        parent_palette_id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
