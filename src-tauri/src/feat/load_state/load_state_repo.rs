use crate::feat::gradient_service::model::gradient_data_model::{Gradient, GradientLayer,GradientStop};

pub async fn get_all_gradient<'a, E> ( executor: E ) -> Result<Vec<Gradient>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let gradient = sqlx::query_as!(Gradient, "
        SELECT 
            g.id as \"id!\",
            g.name as \"name!\"
        FROM gradient g 
        WHERE g.deleted = 0
        ",
        )
        .fetch_all(executor) 
        .await?;

    Ok(gradient)
}

pub async fn get_all_gradient_layer<'a, E> ( executor: E ) -> Result<Vec<GradientLayer>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let layers = sqlx::query_as!(
           GradientLayer, 
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

pub async fn get_all_gradient_stops<'a, E> ( executor: E ) -> Result<Vec<GradientStop>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
      let stops = sqlx::query_as!(
            GradientStop, 
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


