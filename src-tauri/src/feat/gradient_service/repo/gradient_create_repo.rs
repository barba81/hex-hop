use super::super::model::{*};

pub async fn create_gradient<'a, E>(
    gradient: & gradient_service_request::GradientRequest, 
    executor: E
) -> Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    
    let id: i64 = sqlx::query_scalar!("INSERT INTO gradient (name) VALUES ($1) RETURNING id", gradient.name)
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async  fn create_layer<'a, E>(
    layer: & gradient_service_request::GradientLayerRequest, 
    gradient_id: i64, 
    executor: E
)  -> Result<i64, sqlx::Error> 
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
       
    let id: i64 = sqlx::query_scalar!(
            r#"
            INSERT INTO gradient_layer 
            (
                gradient_order, 
                gradient_id,
                gradient_type,
                rotation_degree,
                pattern_repeat_number,
                color_space,
                easing_function 
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id as "id!" 
            "#, 
             layer.gradient_order,
             gradient_id,
             layer.gradient_type,
             layer.rotation_degree,
             layer.pattern_repeat_number,
             layer.color_space,
             layer.easing_function
            )
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async fn create_layers<'a, E>(
    layers: &[gradient_create_model::GradientLayerCreateModel],
    executor: E,
) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if layers.is_empty() {
        return Ok(Vec::new());
    }

    let mut qb: sqlx::QueryBuilder<sqlx::Sqlite> = sqlx::QueryBuilder::new(
        "INSERT INTO gradient_layer ( gradient_order, 
                gradient_id,
                gradient_type,
                rotation_degree,
                pattern_repeat_number,
                color_space,
                easing_function ) "
    );

    qb.push_values(layers, |mut b, layer| {
        b.push_bind(layer.gradient_order)
            .push_bind(layer.gradient_id)
            .push_bind(layer.gradient_type.clone())
            .push_bind(layer.rotation_degree)
            .push_bind(layer.pattern_repeat_number)
            .push_bind(layer.color_space.clone())
            .push_bind(layer.easing_function.clone());
    });

       qb.push(" RETURNING id");

    let ids: Vec<i64> = qb
        .build_query_scalar()
        .fetch_all(executor)
        .await?;

    Ok(ids)
}



pub async  fn create_stop<'a, E>(
    stop :& gradient_service_request::GradientStopRequest, 
    layer_id: i64, 
    executor: E
) ->  Result<i64, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
     let id: i64 = sqlx::query_scalar!("INSERT INTO gradient_stop 
            (gradient_order, 
            layer_Id,
            r,g,b,a,position
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING id as \"id!\" ", 
             stop.gradient_order,
             layer_id,
             stop.r,
             stop.g,
             stop.b,
             stop.a,
             stop.position
            )
        .fetch_one(executor) 
        .await?;

    Ok(id)
}

pub async fn create_stops<'a, E>(
    stops: &[ gradient_create_model::GradientStopCreateModel],
    executor: E,
) -> Result<Vec<i64>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    if stops.is_empty() {
        return Ok(Vec::new());
    }

    let mut qb: sqlx::QueryBuilder<sqlx::Sqlite> = sqlx::QueryBuilder::new(
        "INSERT INTO gradient_stop (gradient_order, layer_id, r, g, b, a, position) "
    );

    qb.push_values(stops, |mut b, stop| {
        b.push_bind(stop.gradient_order)
            .push_bind(stop.layer_id)
            .push_bind(stop.r)
            .push_bind(stop.g)
            .push_bind(stop.b)
            .push_bind(stop.a)
            .push_bind(stop.position);
    });

    qb.push(" RETURNING id");

    let ids: Vec<i64> = qb
        .build_query_scalar()
        .fetch_all(executor)
        .await?;

    Ok(ids)
}
