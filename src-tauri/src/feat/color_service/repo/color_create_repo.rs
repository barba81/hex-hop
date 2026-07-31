use super::super::model::{*};

pub async fn create_gradient<'a, E>(
    gradient: &  color_create_model::ColorCreateModel,
    executor: E
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
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let id = sqlx::query_scalar!(
            "INSERT INTO block (color_id, parent_palette_id) VALUES ($1, $2) RETURNING id", 
            color_id,
            parent_palette_id,
        )
        .fetch_one(executor) 
        .await?
        .expect("INTEGER PRIMARY KEY cannot be null");

    Ok(id)
}