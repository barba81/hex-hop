use crate::feat::palette_service::model::palette_create_model::PaletteUpdateRequest;

use super::super::model::*;

pub async fn create_palette<'a, E>(
    palette: &palette_create_model::PaletteCreateModel,
    block_id: i64,
    executor: E,
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id = sqlx::query_scalar!(
        r#"
        INSERT INTO palette (block_id, name) 
        VALUES ($1, $2)   
        RETURNING id AS "id!"
        "#,
        block_id,
        palette.name,
    )
    .fetch_one(executor)
    .await?;

    Ok(id)
}

pub async fn update_palette_repo<'a, E>(
    palette_block: &PaletteUpdateRequest,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        UPDATE palette 
        SET name = $1
        WHERE id = $2
        "#,
        palette_block.name,
        palette_block.id
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn restore_palette_async<'a, E>(palette_id: i64, executor: E) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        UPDATE block
        SET deleted = 0
        WHERE id = (
            SELECT block_id FROM palette WHERE id = ?
        )
        "#,
        palette_id,
    )
    .execute(executor)
    .await?;

    Ok(())
}
