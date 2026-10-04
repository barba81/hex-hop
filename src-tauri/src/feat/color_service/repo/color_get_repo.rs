use crate::feat::color_service::model::color_data_model::ColorDataModel;

use super::super::model::*;

pub async fn get_color_by_id<'a, E>(
    id: &str,
    executor: E,
) -> Result<color_data_model::ColorDataModel, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let color = sqlx::query_as!(
        ColorDataModel,
        r#"
    SELECT 
        c.id                AS "id!",
        c.r                 AS "r!",
        c.g                 AS "g!",
        c.b                 AS "b!",
        c.alpha             AS "alpha",       
        c.name              AS "name!",
        c.block_id          AS "block_id!",
        b.block_order       AS "block_order!",
        b.parent_palette_id AS "parent_palette_id",
        'color'             AS "kind!: String"
    FROM color c 
    INNER JOIN block b ON b.id = c.block_id
    WHERE b.deleted = 0 AND c.id = ?1
    "#,
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(color)
}
