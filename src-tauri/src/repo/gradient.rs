use sqlx::{Sqlite, Transaction};

use crate::{feat::gradient_service::{GradientInput, GradientLayerInput, GradientStopInput, GradientInput2}, repo::gradient};

pub async  fn get_gradient(
    id: i64, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<GradientInput2, sqlx::Error> {
  let gradient = sqlx::query_as!(GradientInput2, "SELECT g.name as \"name!\" FROM gradient g WHERE id = ?1", id)
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(gradient)
}

pub async fn create_gradient(
    gradient: & GradientInput, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<i64, sqlx::Error> {
    
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient (name) VALUES ($1) RETURNING id", gradient.name)
        .fetch_one(tx.as_mut()) 
        .await?;

    Ok(id)
}

pub async  fn create_layer(
    layer: & GradientLayerInput, 
    gradient_id: i64, 
    tx: &mut Transaction<'_, Sqlite>
)  -> Result<i64, sqlx::Error> {
       
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient_layer 
            ([order], 
            gradientId,
            gradientType,
            rotationDegree,
            patternRepeatNumber,
            colorSpace,
            easingFunction 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", 
             layer.order,
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
    stop :& GradientStopInput, 
    layer_id: i64, 
    tx: &mut Transaction<'_, Sqlite>
) ->  Result<i64, sqlx::Error> {
     let id: i64 = sqlx::query_scalar!("INSERT INTO gradient_stop 
            ([order], 
            layerId,
            r,g,b,a,position
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", 
             stop.order,
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