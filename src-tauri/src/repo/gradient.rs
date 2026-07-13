use sqlx::{Sqlite, Transaction};

use crate::feat::gradient_service::GradientInput;

pub async fn create_gradient(
    gradient: GradientInput, 
    tx: &mut  Transaction<'_, Sqlite> 
) -> Result<(), sqlx::Error> {
    

    Ok(())
}