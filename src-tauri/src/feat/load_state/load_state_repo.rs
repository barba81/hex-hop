pub async fn get_all_gradient<'a, E> ( executor: E ) -> Result<Vec<gradient_data_model::Gradient>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let gradient = sqlx::query_as!(gradient_data_model::Gradient, "
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


pub async fn get_all_colors<'a, E> ( executor: E ) -> Result<Vec<gradient_data_model::Gradient>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let gradient = sqlx::query_as!(gradient_data_model::Gradient, "
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
