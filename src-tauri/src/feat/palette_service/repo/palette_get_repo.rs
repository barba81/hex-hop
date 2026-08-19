use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_data_model::{
        GradientDataModel, GradientLayerDataModel, GradientStopDataModel,
    },
};

use super::super::model::*;

pub async fn get_palette_by_id<'a, E>(
    id: i64,
    executor: E,
) -> Result<palette_data_model::PaletteDataModel, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let color: palette_data_model::PaletteDataModel = sqlx::query_as!(
        palette_data_model::PaletteDataModel,
        r#"
            SELECT 
                    p.id as "id",
                    p.name as "name",
                    p.block_id as "block_id",
                    b.block_order as "block_order",
                    "palette" as kind
                FROM palette p 
                INNER JOIN  block b ON b.id = p.block_id
                WHERE p.id = ?1
                AND b.deleted = 0
                "#,
        id
    )
    .fetch_one(executor)
    .await?;

    Ok(color)
}

pub async fn get_colors_by_palette_id<'a, E>(
    palette_id: i64,
    executor: E,
) -> Result<Vec<ColorDataModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let colors = sqlx::query_as!(
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
            "color"             AS "kind!"   
        FROM color c 
        INNER JOIN block b ON b.id = c.block_id 
        WHERE b.deleted = 0 and b.parent_palette_id = ?
        "#,
        palette_id
    )
    .fetch_all(executor)
    .await?;
    Ok(colors)
}

pub async fn get_gradients_palette_id<'a, E>(
    palette_id: i64,
    executor: E,
) -> Result<Vec<GradientDataModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let gradients = sqlx::query_as!(
        GradientDataModel,
        r#"
            SELECT 
                g.id as "id!",
                g.name as "name!",
                g.block_id as "block_id",
                b.block_order as "block_order",
                b.parent_palette_id as "parent_palette_id",
                "gradient" as  "kind!" 
            FROM gradient g 
            INNER JOIN  block b ON b.id = g.block_id
            AND b.deleted = 0  and b.parent_palette_id = ?
            "#,
        palette_id
    )
    .fetch_all(executor)
    .await?;

    Ok(gradients)
}

// INNER JOIN block b ON b.id = c.block_id
// WHERE b.deleted = 0 and b.parent_palette_id = ?

pub async fn get_gradient_layers_palette_id<'a, E>(
    palette_id: i64,
    executor: E,
) -> Result<Vec<GradientLayerDataModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
        GradientLayerDataModel,
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
                INNER JOIN gradient g on g.id = gl.gradient_id
                INNER JOIN block b on b.id = g.block_id
                WHERE  
                gl.deleted = 0
                and b.deleted = 0
                AND b.parent_palette_id=?
                ",
        palette_id
    )
    .fetch_all(executor)
    .await?;

    Ok(layers)
}

pub async fn get_gradient_stops_palette_id<'a, E>(
    palette_id: i64,
    executor: E,
) -> Result<Vec<GradientStopDataModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
        GradientStopDataModel,
        "
                SELECT 
                    gs.id as \"id!\",
                    gs.gradient_order as \"gradient_order!\",
                    gs.layer_id as \"layer_id!\",
                    gs.r as \"r!\",
                    gs.g as \"g\",
                    gs.b as \"b\",
                    gs.alpha as \"alpha\",
                    gs.position as \"position\"
                FROM gradient_stop gs
                INNER JOIN gradient_layer gl on gs.layer_id = gl.id
                INNER JOIN gradient g on g.id = gl.gradient_id
                INNER JOIN block b on b.id = g.block_id
                WHERE 
                    gs.deleted = 0
                    AND b.deleted = 0
                    AND gl.deleted = 0 
                    AND b.parent_palette_id = ?
                ",
        palette_id
    )
    .fetch_all(executor)
    .await?;

    Ok(stops)
}
