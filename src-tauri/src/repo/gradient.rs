use sqlx::{Sqlite, Transaction};

use crate::feat::gradient_service::GradientInput;

pub async fn create_gradient(
    gradient: GradientInput, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<(), sqlx::Error> {
    
    let id: i64 = sqlx::query_scalar("INSERT INTO gradient (name) VALUES ($1) RETURNING id")
        .bind(gradient.name)
        .fetch_one(tx.as_mut()) // <-
        .await?;

    Ok(())
}