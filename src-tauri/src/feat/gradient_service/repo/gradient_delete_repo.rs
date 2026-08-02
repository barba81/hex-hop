/// Marks a gradient as deleted by its identifier.
///
/// # Examples
///
/// ```
/// # #[tokio::test]
/// # async fn example() -> Result<(), sqlx::Error> {
/// # let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// # sqlx::query!("CREATE TABLE gradient (id INTEGER PRIMARY KEY, deleted INTEGER)")
/// #     .execute(&pool)
/// #     .await?;
/// # sqlx::query!("INSERT INTO gradient (id, deleted) VALUES (1, 0)")
/// #     .execute(&pool)
/// #     .await?;
/// let deleted = soft_delete_gradient_by_id(1, &pool).await?;
/// assert!(deleted);
/// # Ok(())
/// # }
/// ```
///
/// # Arguments
///
/// * `gradient_id` - The identifier of the gradient to mark as deleted.
///
/// # Returns
///
/// `true` if a matching gradient was updated, `false` otherwise.
pub async fn soft_delete_gradient_by_id<'e, E>(
    gradient_id: i64,
    executor: E,
) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!("UPDATE gradient SET deleted = 1 WHERE id = ?", gradient_id)
        .execute(executor)
        .await?;

    Ok(result.rows_affected() > 0)
}

/// Marks all layers belonging to a gradient as deleted.
///
/// # Arguments
///
/// * `gradient_id` - The ID of the gradient whose layers should be deleted.
///
/// # Returns
///
/// `true` if one or more layers matched the gradient ID, `false` otherwise.
///
/// # Examples
///
/// ```
/// # #[tokio::main]
/// # async fn main() -> Result<(), sqlx::Error> {
/// # let pool = sqlx::SqlitePool::connect(":memory:").await?;
/// # sqlx::query!("CREATE TABLE gradient_layer (gradient_id INTEGER, deleted INTEGER)")
/// #     .execute(&pool)
/// #     .await?;
/// # sqlx::query!("INSERT INTO gradient_layer (gradient_id, deleted) VALUES (1, 0)")
/// #     .execute(&pool)
/// #     .await?;
/// let deleted = soft_delete_gradient_layer_by_gradient_id(1, &pool).await?;
/// assert!(deleted);
/// # Ok(())
/// # }
/// ```
pub async fn soft_delete_gradient_layer_by_gradient_id<'e, E>(
    gradient_id: i64,
    executor: E,
) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!(
        "UPDATE gradient_layer SET deleted = 1 WHERE gradient_id = ?",
        gradient_id
    )
    .execute(executor)
    .await?;

    Ok(result.rows_affected() > 0)
}

/// Marks all stops belonging to a gradient as deleted.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let updated = soft_delete_stop_by_gradient_id(42, &pool).await?;
/// assert!(updated);
/// # Ok(())
/// # }
/// ```
///
/// # Arguments
///
/// * `gradient_id` - The ID of the gradient whose stops should be deleted.
///
/// # Returns
///
/// `Ok(true)` if at least one stop was updated, `Ok(false)` if no matching stops were found, or an error if the database operation fails.
pub async fn soft_delete_stop_by_gradient_id<'e, E>(
    gradient_id: i64,
    executor: E,
) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!(
        "UPDATE gradient_stop
        SET deleted = 1
        WHERE layer_id IN (
            SELECT id 
            FROM gradient_layer 
            WHERE gradient_id = ?
        );",
        gradient_id
    )
    .execute(executor)
    .await?;

    Ok(result.rows_affected() > 0)
}

/// Marks a gradient layer as deleted by its identifier.
///
/// # Arguments
///
/// * `layer_id` - The identifier of the gradient layer to delete.
///
/// # Returns
///
/// `true` if a layer was updated, or `false` if no matching layer exists.
///
/// # Errors
///
/// Returns `sqlx::Error` if the update fails.
///
/// # Examples
///
/// ```
/// # async fn example(pool: sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let deleted = soft_delete_gradient_layer_by_id(42, &pool).await?;
/// assert!(deleted);
/// # Ok(())
/// # }
/// ```
pub async fn soft_delete_gradient_layer_by_id<'e, E>(
    layer_id: i64,
    executor: E,
) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!(
        "UPDATE gradient_layer SET deleted = 1 WHERE id = ?",
        layer_id
    )
    .execute(executor)
    .await?;

    Ok(result.rows_affected() > 0)
}

/// Marks all stops belonging to a layer as deleted.
///
/// # Parameters
///
/// * `layer_id` - The ID of the layer whose stops should be deleted.
///
/// # Returns
///
/// `true` if at least one stop was affected, `false` otherwise.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let deleted = soft_delete_stop_by_layer_id(42, &pool).await?;
/// assert!(deleted);
/// # Ok(())
/// # }
/// ```
pub async fn soft_delete_stop_by_layer_id<'e, E>(
    layer_id: i64,
    executor: E,
) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!(
        "UPDATE gradient_stop SET deleted = 1 WHERE layer_id = ?",
        layer_id
    )
    .execute(executor)
    .await?;

    Ok(result.rows_affected() > 0)
}

/// Marks a gradient stop as deleted by its ID.
///
/// # Returns
///
/// `true` if a matching stop was updated, `false` otherwise.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let updated = soft_delete_stop_by_id(42, pool).await?;
/// assert!(updated);
/// # Ok(())
/// # }
/// ```
pub async fn soft_delete_stop_by_id<'e, E>(stop_id: i64, executor: E) -> Result<bool, sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!("UPDATE gradient_stop SET deleted = 1 WHERE id = ?", stop_id)
        .execute(executor)
        .await?;

    Ok(result.rows_affected() > 0)
}
