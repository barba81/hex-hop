use super::super::model::*;

pub async fn create_palette<'a, E>(
    palette: &palette_create_model::PaletteCreateModel,
    block_id: i64,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id = sqlx::query_scalar!(
        r#"
        INSERT INTO palette (block_id, name) 
        VALUES ($1, $2)   
        RETURNING id AS "id!"
        "#,
        block_id,
        palette.name,
    )
    .fetch_one(executor)
    .await?;

    Ok(id)
}
