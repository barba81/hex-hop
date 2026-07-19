use sqlx::{Sqlite, Transaction};

use crate::feat::gradient_service::{gradient_data_model::Gradient, gradient_service_request::{GradientLayerRequest, GradientRequest, GradientStopRequest}};

pub async  fn get_gradient(
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
       
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient_layer 
            (gradient_order, 
            gradient_id,
            gradient_type,
            rotation_degree,
            pattern_repeat_number,
            color_space,
            easing_function 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", 
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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", 
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