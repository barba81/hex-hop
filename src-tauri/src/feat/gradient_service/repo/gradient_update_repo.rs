pub async fn update_gradient_async<'e, E>(
    gradient: & Gradient, 
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



pub async fn update_gradient_layer_async<'e, E>(
    gradient_layer: & GradientLayer, 
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



pub async fn update_stop<'e, E>(
    stop: & GradientStop, 
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