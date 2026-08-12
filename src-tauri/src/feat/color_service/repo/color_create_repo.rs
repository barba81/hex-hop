use super::super::model::*;

pub async fn create_color<'a, E>(
    color_block: &color_create_model::ColorCreateModel,
    block_id: i64,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id = sqlx::query_scalar!(
        r#"
        INSERT INTO color (block_id, r, g, b, a, name)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id AS "id!"
        "#,
        block_id,
        color_block.r,
        color_block.g,
        color_block.b,
        color_block.a,
        color_block.name
    )
    .fetch_one(executor)
    .await?;
    println!("{:?}", color_block);
    Ok(id)
}
