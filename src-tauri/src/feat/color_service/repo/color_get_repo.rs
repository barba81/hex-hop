use super::super::model::*;

pub async fn get_color_by_id<'a, E>(
    id: i64,
    executor: E,
) -> Result<color_data_model::ColorDataModel, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let color: color_data_model::ColorDataModel = sqlx::query_as!(
        color_data_model::ColorDataModel,
        "
           SELECT 
                c.id as \"id\",
                c.r as \"r!\",
                c.g as \"g!\",
                c.b as \"b!\",
                c.a as \"a\",
                c.name as \"name\",
                b.id as \"block_id\",
                b.block_order as \"block_order\",
                b.parent_palette_id as \"parent_palette_id\",
                \"color\" as kind
            FROM color c 
            INNER JOIN  block b ON b.color_id = c.id
            WHERE c.id = ?1
            AND c.deleted = 0
            ",
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(color)
}
