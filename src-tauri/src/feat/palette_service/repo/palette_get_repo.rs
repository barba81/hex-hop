use super::super::model::*;

pub async fn get_palette_by_id<'a, E>(
    id: i64,
    executor: E,
) -> Result<palette_data_model::PaletteDataModel, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let color: palette_data_model::PaletteDataModel = sqlx::query_as!(
        palette_data_model::PaletteDataModel,
        r#"
           SELECT 
                p.id as "id",
                p.name as "name",
                p.block_id as "block_id",
                b.block_order as "block_order",
                "palette" as kind
            FROM palette p 
            INNER JOIN  block b ON b.id = p.block_id
            WHERE p.id = ?1
            AND b.deleted = 0
            "#,
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(color)
}
