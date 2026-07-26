use super::super::model::{*};

pub async  fn get_gradient_by_id<'a, E>(
    id: i64, 
    executor: E
) -> Result<gradient_data_model::Gradient, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
  let gradient = sqlx::query_as!(gradient_data_model::Gradient, "
           SELECT 
                g.id as \"id!\",
                g.name as \"name!\"
            FROM gradient g 
            WHERE g.id = ?1",
            id
        )
        .fetch_one(executor) 
        .await?;

    Ok(gradient)
}

pub async fn get_gradient_layers_by_gradient_id<'a, E>(
    gradient_id: i64, 
    executor: E
) -> Result<Vec<gradient_data_model::GradientLayer>, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
           gradient_data_model::GradientLayer, 
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
        .fetch_all(executor) 
        .await?;

    Ok(layers)
}

pub async fn get_gradient_layers_by_layer_id<'a, E>(
    layer_id: i64, 
    executor: E
) -> Result<gradient_data_model::GradientLayer, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let layers = sqlx::query_as!(
            gradient_data_model::GradientLayer, 
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
        .fetch_one(executor) 
        .await?;

    Ok(layers)
}


pub async fn get_gradient_stops_by_gradient_id<'a, E>(
    gradient_id: i64, 
    executor: E
) -> Result<Vec<gradient_data_model::GradientStop>, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let stops = sqlx::query_as!(
            gradient_data_model::GradientStop, 
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
        .fetch_all(executor) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_stop_id<'a, E>(
    stop_id: i64, 
    executor: E
) -> Result<gradient_data_model::GradientStop, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>, {
    let stops = sqlx::query_as!(
            gradient_data_model::GradientStop, 
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
        .fetch_one(executor) 
        .await?;

    Ok(stops)
}

pub async fn get_gradient_stops_by_layer_id<'a, E>(
    layer_id: i64, 
    executor: E
) -> Result<Vec<gradient_data_model::GradientStop>, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,{
    let stops = sqlx::query_as!(
            gradient_data_model::GradientStop, 
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
        .fetch_all(executor) 
        .await?;

    Ok(stops)
}
