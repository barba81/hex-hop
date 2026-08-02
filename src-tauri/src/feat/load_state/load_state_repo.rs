use crate::feat::gradient_service::model::gradient_data_model::{
    Gradient, GradientLayer, GradientStop,
};

/// Loads all gradients that have not been marked as deleted.
///
/// # Errors
///
/// Returns a database error if the query cannot be executed or its rows cannot be mapped.
///
/// # Examples
///
/// ```
/// # async fn example() -> Result<(), sqlx::Error> {
/// let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// sqlx::query(
///     "CREATE TABLE gradient (id INTEGER PRIMARY KEY, name TEXT NOT NULL, deleted INTEGER NOT NULL)",
/// )
/// .execute(&pool)
/// .await?;
/// sqlx::query("INSERT INTO gradient (id, name, deleted) VALUES (1, 'Sunset', 0)")
///     .execute(&pool)
///     .await?;
///
/// let gradients = get_all_gradients(&pool).await?;
///
/// assert_eq!(gradients.len(), 1);
/// # Ok(())
/// # }
/// ```
pub async fn get_all_gradients<'a, E>(executor: E) -> Result<Vec<Gradient>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let gradient = sqlx::query_as!(
        Gradient,
        "
        SELECT 
            g.id as \"id!\",
            g.name as \"name!\"
        FROM gradient g 
        WHERE g.deleted = 0
        ",
    )
    .fetch_all(executor)
    .await?;

    Ok(gradient)
}

/// Loads all non-deleted gradient layers from the database.
///
/// # Returns
///
/// A collection of gradient layers, or the database error encountered while loading them.
///
/// # Examples
///
/// ```no_run
/// # async fn example() -> Result<(), sqlx::Error> {
/// let pool = sqlx::SqlitePool::connect("sqlite::memory:").await?;
/// let layers = get_all_gradient_layers(&pool).await?;
/// # let _ = layers;
/// # Ok(())
/// # }
/// ```
pub async fn get_all_gradient_layers<'a, E>(executor: E) -> Result<Vec<GradientLayer>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
        GradientLayer,
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
            WHERE  gl.deleted = 0
            ",
    )
    .fetch_all(executor)
    .await?;

    Ok(layers)
}

/// Loads all active gradient stops from the database.
///
/// # Examples
///
/// ```no_run
/// # async fn example(pool: sqlx::SqlitePool) -> Result<(), sqlx::Error> {
/// let stops = get_all_gradient_stops(&pool).await?;
/// println!("Loaded {} gradient stops", stops.len());
/// # Ok(())
/// # }
/// ```
///
/// # Errors
///
/// Returns the database error produced while querying the gradient stops.
pub async fn get_all_gradient_stops<'a, E>(executor: E) -> Result<Vec<GradientStop>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
        GradientStop,
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
            WHERE gs.deleted = 0
            ",
    )
    .fetch_all(executor)
    .await?;

    Ok(stops)
}
