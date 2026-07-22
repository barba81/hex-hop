use sqlx::{Sqlite, Transaction};

use crate::feat::gradient_service::{gradient_data_model::{Gradient, GradientLayer, GradientStop}, gradient_service_request::{GradientLayerRequest, GradientRequest, GradientStopRequest}};

pub async  fn get_gradient_by_id(
    id: i64, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<Gradient, sqlx::Error> {
  let gradient = sqlx::query_as!(Gradient, "
           SELECT 
                g.id as \"id!\",
                g.name as \"name!\"
            FROM gradient g 
            WHERE g.id = ?1",
            id
        )
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(gradient)
}

pub async fn get_gradient_layers_by_gradient_id(
    gradient_id: i64, 
    tx: &mut Transaction<'_, Sqlite> 
) -> Result<Vec<GradientLayer>, sqlx::Error> {
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
        .fetch_all(tx.as_mut()) 
        .await?;

    Ok(layers)
}

pub async fn get_gradient_layers_by_layer_id(
    layer_id: i64, 
    tx: &mut Transaction<'_, Sqlite> 
) -> Result<GradientLayer, sqlx::Error> {
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
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(layers)
}


pub async fn get_gradient_stops_by_gradient_id(
    gradient_id: i64, 
    tx: &mut Transaction<'_, Sqlite> 
) -> Result<Vec<GradientStop>, sqlx::Error> {
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
        .fetch_all(tx.as_mut()) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_stop_id(
    stop_id: i64, 
    tx: &mut Transaction<'_, Sqlite> 
) -> Result<GradientStop, sqlx::Error> {
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
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_layer_id(
    layer_id: i64, 
    tx: &mut Transaction<'_, Sqlite> 
) -> Result<Vec<GradientStop>, sqlx::Error> {
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
        .fetch_all(tx.as_mut()) 
        .await?;

    Ok(stops)
}

pub async fn create_gradient(
    gradient: & GradientRequest, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<i64, sqlx::Error> {
    
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient (name) VALUES ($1) RETURNING id", gradient.name)
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(id)
}

pub async  fn create_layer(
    layer: & GradientLayerRequest, 
    gradient_id: i64, 
    tx: &mut Transaction<'_, Sqlite>
)  -> Result<i64, sqlx::Error> {
       
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
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(id)
}

pub async  fn create_stop(
    stop :& GradientStopRequest, 
    layer_id: i64, 
    tx: &mut Transaction<'_, Sqlite>
) ->  Result<i64, sqlx::Error> {
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
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(id)
}