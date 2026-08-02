use super::super::model::*;

/// Inserts a gradient color record and returns its generated identifier.
///
/// # Examples
///
/// ```no_run
/// # async fn example() -> Result<(), sqlx::Error> {
/// let gradient: color_create_model::ColorCreateModel = todo!();
/// let pool: sqlx::SqlitePool = todo!();
///
/// let id = create_gradient(&gradient, &pool).await?;
/// # let _ = id;
/// # Ok(())
/// # }
/// ```
///
/// # Returns
///
/// The generated database identifier for the inserted color.
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

/// Creates a block for a color and assigns the next order within its parent palette.
///
/// # Arguments
///
/// * `color_id` - ID of the color associated with the block.
/// * `parent_palette_id` - Optional ID of the block's parent palette.
///
/// # Errors
///
/// Returns a database error if the block cannot be inserted.
///
/// # Examples
///
/// ```no_run
/// # async fn example() -> Result<(), sqlx::Error> {
/// let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// create_block_color(42, Some(7), &pool).await?;
/// # Ok(())
/// # }
/// ```
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
            (SELECT COALESCE(MAX(block_order), 0) + 1 FROM block WHERE parent_palette_id IS $2)
        );",
        color_id,
        parent_palette_id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
