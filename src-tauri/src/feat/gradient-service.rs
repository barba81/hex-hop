use serde::{Deserialize};
use sqlx::Sqlite;

use crate::AppState;


// #[tauri::command]
// async fn save_gradient_layer(entity: GradientEntity) -> Result<i64, String> {
    
// }

#[tauri::command]
pub async fn save_gradient(
    state: tauri::State<'_, AppState>,
    gradient: GradientInput,
) -> Result<(), String> {
    let db = &state.db;

       let mut tx = db.begin()
         .await
         .map_err(|e| format!("Failed to start transaction: {}", e))?;


         let block_id = insert_block(&mut tx, gradient.order)
            .await
            .map_err(|e| format!("Error inserting block: {}", e))?;
   
          dbg!(&gradient.palette_id);


        let gradient_id = insert_gradient(&mut tx, block_id, &gradient)
            .await
            .map_err(|e| format!("Error inserting gradient: {}", e))?;
        println!("{}", gradient_id);

        for layer in &gradient.layers {
            let layer_id = insert_gradient_layer(&mut tx, gradient_id, layer)
                .await
                .map_err(|e| format!("Error inserting layer: {}", e))?;
        println!("{}", layer_id);

            for stop in &layer.stops {
                insert_gradient_stop(&mut tx, layer_id, stop)
                    .await
                    .map_err(|e| format!("Error inserting stop: {}", e))?;
            }
        }
     tx.commit()
                .await
                .map_err(|e| format!("Failed to commit: {}", e))?;
    Ok(())

}

async fn insert_block(
    tx: &mut sqlx::Transaction<'_, Sqlite>,
    order_val: i64,
) -> Result<i64, sqlx::Error> {
    println!( "{}",order_val);
    let block_id = sqlx::query("INSERT INTO block (`order`) VALUES (?1)")
        .bind(order_val)
        .execute(&mut **tx) 
        .await?
         .last_insert_rowid();
    Ok(block_id)
}

async fn insert_gradient(
    tx: &mut sqlx::Transaction<'_, Sqlite>,
    block_id: i64,
    gradient: &GradientInput,
) -> Result<i64, sqlx::Error> {
    let id = sqlx::query(
        "INSERT INTO gradient (name, paletteId, blockId) VALUES (?1, ?2, ?3)",
    )
    .bind(&gradient.name)
    .bind(gradient.palette_id)
    .bind(block_id)
    .execute(&mut **tx)
    .await?
    .last_insert_rowid();

    Ok(id)
}

async fn insert_gradient_layer(
    tx: &mut sqlx::Transaction<'_, Sqlite>,
    gradient_id: i64,
    layer: &GradientLayerInput,
) -> Result<i64, sqlx::Error> {
    let id = sqlx::query(
        "INSERT INTO gradient_layer ([order], gradientId, gradientType, rotationDegree, patternRepeatNumber, colorSpace, easingFunction)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    )
    .bind(layer.order)
    .bind(gradient_id)
    .bind(&layer.gradient_type)
    .bind(layer.rotation_degree)
    .bind(layer.pattern_repeat_number)
    .bind(&layer.color_space)
    .bind(layer.easing_function)
    .execute(&mut **tx)
    .await?
    .last_insert_rowid();

    Ok(id)
}

async fn insert_gradient_stop(
    tx: &mut sqlx::Transaction<'_, Sqlite>,
    layer_id: i64,
    stop: &GradientStopInput,
) -> Result<i64, sqlx::Error> {
    let id = sqlx::query(
        "INSERT INTO gradient_stop ([order], layerId, r, g, b, a, position)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    )
    .bind(stop.order)
    .bind(layer_id)
    .bind(stop.r)
    .bind(stop.g)
    .bind(stop.b)
    .bind(stop.a)
    .bind(stop.position)
    .execute(&mut **tx)
    .await?
    .last_insert_rowid();

    Ok(id)
}


#[derive(Debug, Deserialize)]
pub struct GradientStopInput {
    pub order: i64,
    pub r: f64,
    pub g: f64,
    pub b: f64,
    pub a: f64,
    pub position: f64,
}

#[derive(Debug, Deserialize)]
pub struct GradientLayerInput {
    pub order: i64,
    pub gradient_type: String,
    pub rotation_degree: f64,
    pub pattern_repeat_number: f64,
    pub color_space: String,
    pub easing_function: i64,
    pub stops: Vec<GradientStopInput>,
}

#[derive(Debug, Deserialize)]
pub struct GradientInput {
    pub order: i64,
    pub name: String,
    pub palette_id: Option<i64>,
    pub layers: Vec<GradientLayerInput>,
}

