use super::super::model::*;

pub async fn get_color_by_id<'a, E>(
    id: i64,
    executor: E,
) -> Result<color_data_model::Color, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let color: color_data_model::Color = sqlx::query_as!(
        color_data_model::Color,
        "
           SELECT 
                c.id as \"id\",
                c.r as \"r!\",
                c.g as \"g!\",
                c.b as \"b!\",
                c.a as \"a\",
                c.name as \"name\"
            FROM color c 
            WHERE c.id = ?1
            AND c.deleted = 0
            ",
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(color)
}
