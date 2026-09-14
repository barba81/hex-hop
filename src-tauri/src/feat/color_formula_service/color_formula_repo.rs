use crate::feat::color_formula_service::color_formula_model::ColorCopyFormulaModel;

pub async fn create_color<'a, E>(
    color_formula_model: &ColorCopyFormulaModel,
    block_id: i64,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id = sqlx::query_scalar!(
        r#"
        INSERT INTO color (block_id, r, g, b, alpha, name)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id AS "id!"
        "#,
        block_id,
        color_block.r,
        color_block.g,
        color_block.b,
        color_block.alpha,
        color_block.name
    )
    .fetch_one(executor)
    .await?;

    Ok(id)
}
