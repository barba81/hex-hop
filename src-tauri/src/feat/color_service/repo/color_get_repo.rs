use super::super::model::*;

/// Retrieves an active color and its associated block order by ID.
///
/// # Arguments
///
/// * `id` - The color ID to retrieve.
/// * `executor` - The SQLite executor used to perform the query.
///
/// # Returns
///
/// The matching color, including its block order, or a SQLx error if the query fails.
///
/// # Examples
///
/// ```no_run
/// # async fn example() -> Result<(), sqlx::Error> {
/// let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// let color = get_color_by_id(1, &pool).await?;
/// # Ok(())
/// # }
/// ```
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
                c.name as \"name\",
                b.block_order as \"block_order\"
            FROM color c 
            INNER JOIN  block b ON b.color_id = c.id
            WHERE c.id = ?1
            AND c.deleted = 0
            ",
        id
    )
    .fetch_one(executor)
    .await?;
    println!("{:?}", color);
    Ok(color)
}
