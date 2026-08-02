use super::super::model::*;

/// Updates a gradient's name in the database using its ID.
///
/// # Examples
///
/// ```no_run
/// # async fn example(
/// #     gradient: &gradient_data_model::Gradient,
/// #     pool: &sqlx::SqlitePool,
/// # ) -> Result<(), sqlx::Error> {
/// update_gradient_async(gradient, pool).await?;
/// # Ok(())
/// # }
/// ```
pub async fn update_gradient_async<'e, E>(
    gradient: &gradient_data_model::Gradient,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE gradient SET name = ? WHERE id = ?",
        gradient.name,
        gradient.id,
    )
    .execute(executor)
    .await?;

    Ok(())
}

/// Updates a gradient layer's persisted properties by its identifier.
///
/// # Examples
///
/// ```no_run
/// # async fn example<'e, E>(
/// #     gradient_layer: &'e gradient_data_model::GradientLayer,
/// #     executor: E,
/// # ) -> Result<(), sqlx::Error>
/// # where
/// #     E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
/// # {
/// update_gradient_layer_async(gradient_layer, executor).await?;
/// # Ok(())
/// # }
/// ```
///
/// # Errors
///
/// Returns a [`sqlx::Error`] if the database update fails.
pub async fn update_gradient_layer_async<'e, E>(
    gradient_layer: &gradient_data_model::GradientLayer,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE gradient_layer SET 
        gradient_order = ?, 
        gradient_type = ?,
        rotation_degree = ?,
        pattern_repeat_number = ?,
        color_space = ?,
        easing_function = ?
        WHERE id = ?",
        gradient_layer.gradient_order,
        gradient_layer.gradient_type,
        gradient_layer.rotation_degree,
        gradient_layer.pattern_repeat_number,
        gradient_layer.color_space,
        gradient_layer.easing_function,
        gradient_layer.id,
    )
    .execute(executor)
    .await?;

    Ok(())
}

/// Updates a gradient stop's order, color components, and position in the database.
///
/// # Examples
///
/// ```no_run
/// # async fn example<E>(
/// #     stop: &gradient_data_model::GradientStop,
/// #     executor: E,
/// # ) -> Result<(), sqlx::Error>
/// # where
/// #     E: sqlx::Executor<'static, Database = sqlx::Sqlite>,
/// # {
/// update_stop(stop, executor).await?;
/// # Ok(())
/// # }
/// ```
///
/// Returns an error if the database update fails.
pub async fn update_stop<'e, E>(
    stop: &gradient_data_model::GradientStop,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        "UPDATE gradient_stop SET 
        gradient_order = ?, 
        r = ?,
        g = ?,
        b = ?,
        a = ?,
        position = ?
        WHERE id = ?",
        stop.gradient_order,
        stop.r,
        stop.g,
        stop.b,
        stop.a,
        stop.position,
        stop.id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
