

pub async fn soft_delete_gradient_by_id<'e, E>(
    gradient_id: i64, 
    executor: E,
) -> Result<bool, sqlx::Error> 
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
    let result = sqlx::query!(
        "UPDATE gradient SET deleted = 1 WHERE id = ?", 
        gradient_id
    )
    .execute(executor) 
    .await?;

    Ok(result.rows_affected() > 0)
}

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

pub async fn soft_delete_stop_by_id<'e, E>(
    stop_id: i64, 
    executor: E,
) -> Result<bool, sqlx::Error> 
where
    E: sqlx::Executor<'e, Database = sqlx::Sqlite>,
{
let result = sqlx::query!(
        "UPDATE gradient_stop SET deleted = 1 WHERE id = ?", 
        stop_id
    )
    .execute(executor) 
    .await?;

    Ok(result.rows_affected() > 0)
}
