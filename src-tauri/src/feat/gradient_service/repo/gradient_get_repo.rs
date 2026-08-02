use super::super::model::*;

/// Retrieves an active gradient by its identifier.
///
/// # Arguments
///
/// * `id` - The identifier of the gradient to retrieve.
///
/// # Returns
///
/// The matching active gradient.
///
/// # Examples
///
/// ```rust,no_run
/// let pool = sqlx::SqlitePool::connect("sqlite://gradients.db").await?;
/// let gradient = get_gradient_by_id(1, &pool).await?;
/// println!("{}", gradient.name);
/// # Ok::<(), Box<dyn std::error::Error>>(())
/// ```
pub async fn get_gradient_by_id<'a, E>(
    id: i64,
    executor: E,
) -> Result<gradient_data_model::Gradient, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let gradient = sqlx::query_as!(
        gradient_data_model::Gradient,
        "
           SELECT 
                g.id as \"id!\",
                g.name as \"name!\"
            FROM gradient g 
            WHERE g.id = ?1
            AND g.deleted = 0
            ",
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(gradient)
}

/// Retrieves the active layers associated with a gradient, ordered by gradient order.
///
/// # Parameters
///
/// * `gradient_id` - The ID of the gradient whose layers are retrieved.
/// * `executor` - The SQLite executor used to run the query.
///
/// # Errors
///
/// Returns a [`sqlx::Error`] if the query fails.
///
/// # Examples
///
/// ```no_run
/// # async fn example() -> Result<(), sqlx::Error> {
/// let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// let layers = get_gradient_layers_by_gradient_id(1, &pool).await?;
/// # assert!(layers.is_empty() || !layers.is_empty());
/// # Ok(())
/// # }
/// ```
pub async fn get_gradient_layers_by_gradient_id<'a, E>(
    gradient_id: i64,
    executor: E,
) -> Result<Vec<gradient_data_model::GradientLayer>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
        gradient_data_model::GradientLayer,
        "
            SELECT 
                gl.id as \"id!\",
                gl.color_space as \"color_space!\",
                gl.easing_function as \"easing_function!\",
                gl.gradient_id as \"gradient_id!\",
                gl.gradient_order as \"gradient_order\",
                gl.gradient_type as \"gradient_type\",
                gl.pattern_repeat_number as \"pattern_repeat_number\",
                gl.rotation_degree as \"rotation_degree\"
            FROM gradient_layer gl 
            WHERE gl.gradient_id = ?1
            AND gl.deleted = 0
            ORDER BY gl.gradient_order ASC
            ",
        gradient_id
    )
    .fetch_all(executor)
    .await?;

    Ok(layers)
}

/// Retrieves an active gradient layer by its layer ID.
///
/// # Errors
///
/// Returns a `sqlx::Error` if the query fails or no active layer matches the ID.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let layer = get_gradient_layers_by_layer_id(1, &pool).await?;
/// assert_eq!(layer.id, 1);
/// # Ok(())
/// # }
/// ```
pub async fn get_gradient_layers_by_layer_id<'a, E>(
    layer_id: i64,
    executor: E,
) -> Result<gradient_data_model::GradientLayer, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
        gradient_data_model::GradientLayer,
        "
            SELECT 
                gl.id as \"id!\",
                gl.color_space as \"color_space!\",
                gl.easing_function as \"easing_function!\",
                gl.gradient_id as \"gradient_id!\",
                gl.gradient_order as \"gradient_order\",
                gl.gradient_type as \"gradient_type\",
                gl.pattern_repeat_number as \"pattern_repeat_number\",
                gl.rotation_degree as \"rotation_degree\"
            FROM gradient_layer gl 
            WHERE gl.id = ?1
            AND gl.deleted = 0
            ",
        layer_id
    )
    .fetch_one(executor)
    .await?;

    Ok(layers)
}

/// Retrieves all active stops associated with a gradient.
///
/// # Parameters
///
/// * `gradient_id` - The identifier of the gradient whose stops are retrieved.
/// * `executor` - The SQLite executor used to run the query.
///
/// # Returns
///
/// The active gradient stops associated with the gradient, or a SQL error.
///
/// # Examples
///
/// ```
/// # async fn example() -> Result<(), Box<dyn std::error::Error>> {
/// let pool = sqlx::SqlitePool::connect(":memory:").await?;
/// let stops = get_gradient_stops_by_gradient_id(1, &pool).await?;
///
/// assert!(stops.is_empty());
/// # Ok(())
/// # }
/// ```
pub async fn get_gradient_stops_by_gradient_id<'a, E>(
    gradient_id: i64,
    executor: E,
) -> Result<Vec<gradient_data_model::GradientStop>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
        gradient_data_model::GradientStop,
        "
            SELECT 
                gs.id as \"id!\",
                gs.gradient_order as \"gradient_order!\",
                gs.layer_id as \"layer_id!\",
                gs.r as \"r!\",
                gs.g as \"g\",
                gs.b as \"b\",
                gs.a as \"a\",
                gs.position as \"position\"
            FROM gradient_stop gs
            INNER JOIN gradient_layer gl ON gl.id = gs.layer_id 
            WHERE gl.gradient_id = ?1
            AND gs.deleted = 0
            ",
        gradient_id
    )
    .fetch_all(executor)
    .await?;

    Ok(stops)
}

/// Retrieves an active gradient stop by its identifier.
///
/// # Errors
///
/// Returns a `sqlx::Error` if the query fails or no active stop matches `stop_id`.
///
/// # Examples
///
/// ```rust,no_run
/// #[tokio::test]
/// async fn retrieves_a_gradient_stop() -> Result<(), sqlx::Error> {
///     let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
///     let stop = get_gradient_stops_by_stop_id(1, &pool).await?;
///     assert_eq!(stop.id, 1);
///     Ok(())
/// }
/// ```
pub async fn get_gradient_stops_by_stop_id<'a, E>(
    stop_id: i64,
    executor: E,
) -> Result<gradient_data_model::GradientStop, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
        gradient_data_model::GradientStop,
        "
            SELECT 
                gs.id as \"id!\",
                gs.gradient_order as \"gradient_order!\",
                gs.layer_id as \"layer_id!\",
                gs.r as \"r!\",
                gs.g as \"g\",
                gs.b as \"b\",
                gs.a as \"a\",
                gs.position as \"position\"
            FROM gradient_stop gs
            WHERE gs.id = ?1
            AND gs.deleted = 0
            ",
        stop_id
    )
    .fetch_one(executor)
    .await?;

    Ok(stops)
}

/// Retrieves all active gradient stops associated with a layer.
///
/// # Arguments
///
/// * `layer_id` - The ID of the layer whose stops should be retrieved.
/// * `executor` - The SQLite executor used to run the query.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let stops = get_gradient_stops_by_layer_id(1, &pool).await?;
/// println!("Found {} gradient stops", stops.len());
/// # Ok(())
/// # }
/// ```
///
/// # Returns
///
/// A vector of active gradient stops associated with the layer.
pub async fn get_gradient_stops_by_layer_id<'a, E>(
    layer_id: i64,
    executor: E,
) -> Result<Vec<gradient_data_model::GradientStop>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
        gradient_data_model::GradientStop,
        "
            SELECT 
                gs.id as \"id!\",
                gs.gradient_order as \"gradient_order!\",
                gs.layer_id as \"layer_id!\",
                gs.r as \"r!\",
                gs.g as \"g\",
                gs.b as \"b\",
                gs.a as \"a\",
                gs.position as \"position\"
            FROM gradient_stop gs
            WHERE gs.layer_id = ?1
            AND gs.deleted = 0
            ",
        layer_id
    )
    .fetch_all(executor)
    .await?;

    Ok(stops)
}
