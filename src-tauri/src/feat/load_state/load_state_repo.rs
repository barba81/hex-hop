use crate::feat::{
    color_service::model::color_data_model::ColorDataModel,
    gradient_service::model::gradient_data_model::{
        GradientDataModel, GradientLayerDataModel, GradientStopDataModel,
    },
    palette_service::model::palette_data_model::PaletteDataModel,
};

pub async fn get_all_colors<'a, E>(executor: E) -> Result<Vec<ColorDataModel>, sqlx::Error>
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
        c.a                 AS "a",       
        c.name              AS "name!",
        c.block_id          AS "block_id!",
        b.block_order       AS "block_order!",
        b.parent_palette_id AS "parent_palette_id", 
        "color"             AS "kind!"   
    FROM color c 
    INNER JOIN block b ON b.id = c.block_id
    WHERE b.deleted = 0
    "#
    )
    .fetch_all(executor)
    .await?;

    Ok(colors)
}

pub async fn get_all_palette<'a, E>(executor: E) -> Result<Vec<PaletteDataModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let palettes = sqlx::query_as!(
        PaletteDataModel,
        r#"
        SELECT 
            p.id                AS "id!",
            p.name              AS "name!",
            p.block_id          AS "block_id!",
            b.block_order       AS "block_order!",
            "palette"           AS "kind!"              
        FROM palette p 
        INNER JOIN block b ON b.id = p.block_id
        WHERE b.deleted = 0
        "#
    )
    .fetch_all(executor)
    .await?;

    Ok(palettes)
}

pub async fn get_all_gradients<'a, E>(executor: E) -> Result<Vec<GradientDataModel>, sqlx::Error>
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
            "gradient" as kind
        FROM gradient g 
        INNER JOIN  block b ON b.id = g.block_id
        AND b.deleted = 0
        "#
    )
    .fetch_all(executor)
    .await?;

    Ok(gradients)
}

pub async fn get_all_gradient_layers<'a, E>(
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
            WHERE  gl.deleted = 0
            ",
    )
    .fetch_all(executor)
    .await?;

    Ok(layers)
}

pub async fn get_all_gradient_stops<'a, E>(
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
                gs.a as \"a\",
                gs.position as \"position\"
            FROM gradient_stop gs
            WHERE gs.deleted = 0
            ",
    )
    .fetch_all(executor)
    .await?;

    Ok(stops)
}
