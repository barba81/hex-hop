use sqlx::QueryBuilder;

use crate::feat::gradient_service::{gradient_create_model::{GradientLayerCreateModel, GradientStopCreateModel}, gradient_data_model::{Gradient, GradientLayer, GradientStop}, gradient_service_request::{GradientLayerRequest, GradientRequest, GradientStopRequest}};

pub async  fn get_gradient_by_id<'a, E>(
    id: i64, 
    executor: E
) -> Result<Gradient, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
  let gradient = sqlx::query_as!(Gradient, "
           SELECT 
                g.id as \"id!\",
                g.name as \"name!\"
            FROM gradient g 
            WHERE g.id = ?1",
            id
        )
        .fetch_one(executor) 
        .await?;

    Ok(gradient)
}

pub async fn get_gradient_layers_by_gradient_id<'a, E>(
    gradient_id: i64, 
    executor: E
) -> Result<Vec<GradientLayer>, sqlx::Error> 
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
            WHERE gl.gradient_id = ?1
            ORDER BY gl.gradient_order ASC
            ",
            gradient_id
        )
        .fetch_all(executor) 
        .await?;

    Ok(layers)
}

pub async fn get_gradient_layers_by_layer_id<'a, E>(
    layer_id: i64, 
    executor: E
) -> Result<GradientLayer, sqlx::Error>
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
            WHERE gl.id = ?1
            ",
            layer_id
        )
        .fetch_one(executor) 
        .await?;

    Ok(layers)
}


pub async fn get_gradient_stops_by_gradient_id<'a, E>(
    gradient_id: i64, 
    executor: E
) -> Result<Vec<GradientStop>, sqlx::Error> 
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
            INNER JOIN gradient_layer gl ON gl.id = gs.layer_id 
            WHERE gl.gradient_id = ?1
            ",
            gradient_id
        )
        .fetch_all(executor) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_stop_id<'a, E>(
    stop_id: i64, 
    executor: E
) -> Result<GradientStop, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>, {
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
            WHERE gs.id = ?1
            ",
            stop_id
        )
        .fetch_one(executor) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_layer_id<'a, E>(
    layer_id: i64, 
    executor: E
) -> Result<Vec<GradientStop>, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,{
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
            WHERE gs.layer_id = ?1
            ",
            layer_id
        )
        .fetch_all(executor) 
        .await?;

    Ok(stops)
}

pub async fn create_gradient<'a, E>(
    gradient: & GradientRequest, 
    executor: E
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient (name) VALUES ($1) RETURNING id", gradient.name)
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async  fn create_layer<'a, E>(
    layer: & GradientLayerRequest, 
    gradient_id: i64, 
    executor: E
)  -> Result<i64, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
       
    let id: i64 = sqlx::query_scalar!(
            r#"
            INSERT INTO gradient_layer 
            (
                gradient_order, 
                gradient_id,
                gradient_type,
                rotation_degree,
                pattern_repeat_number,
                color_space,
                easing_function 
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id as "id!" 
            "#, 
             layer.gradient_order,
             gradient_id,
             layer.gradient_type,
             layer.rotation_degree,
             layer.pattern_repeat_number,
             layer.color_space,
             layer.easing_function
            )
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async fn create_layers<'a, E>(
    layers: &[GradientLayerCreateModel],
    executor: E,
) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if layers.is_empty() {
        return Ok(Vec::new());
    }

    let mut qb: QueryBuilder<sqlx::Sqlite> = QueryBuilder::new(
        "INSERT INTO gradient_layer ( gradient_order, 
                gradient_id,
                gradient_type,
                rotation_degree,
                pattern_repeat_number,
                color_space,
                easing_function ) "
    );

    qb.push_values(layers, |mut b, layer| {
        b.push_bind(layer.gradient_order)
            .push_bind(layer.gradient_id)
            .push_bind(layer.gradient_type.clone())
            .push_bind(layer.rotation_degree)
            .push_bind(layer.pattern_repeat_number)
            .push_bind(layer.color_space.clone())
            .push_bind(layer.easing_function.clone());
    });

       qb.push(" RETURNING id");

    let ids: Vec<i64> = qb
        .build_query_scalar()
        .fetch_all(executor)
        .await?;

    Ok(ids)
}



pub async  fn create_stop<'a, E>(
    stop :& GradientStopRequest, 
    layer_id: i64, 
    executor: E
) ->  Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
     let id: i64 = sqlx::query_scalar!("INSERT INTO gradient_stop 
            (gradient_order, 
            layer_Id,
            r,g,b,a,position
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING id as \"id!\" ", 
             stop.gradient_order,
             layer_id,
             stop.r,
             stop.g,
             stop.b,
             stop.a,
             stop.position
            )
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async fn create_stops<'a, E>(
    stops: &[GradientStopCreateModel],
    executor: E,
) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if stops.is_empty() {
        return Ok(Vec::new());
    }

    let mut qb: QueryBuilder<sqlx::Sqlite> = QueryBuilder::new(
        "INSERT INTO gradient_stop (gradient_order, layer_id, r, g, b, a, position) "
    );

    qb.push_values(stops, |mut b, stop| {
        b.push_bind(stop.gradient_order)
            .push_bind(stop.layer_id)
            .push_bind(stop.r)
            .push_bind(stop.g)
            .push_bind(stop.b)
            .push_bind(stop.a)
            .push_bind(stop.position);
    });

    qb.push(" RETURNING id");

    let ids: Vec<i64> = qb
        .build_query_scalar()
        .fetch_all(executor)
        .await?;

    Ok(ids)
}


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