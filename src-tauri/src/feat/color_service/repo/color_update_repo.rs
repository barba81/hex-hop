use crate::feat::color_service::model::color_create_model;

pub async fn update_color<'a, E>(
    color_block: &color_create_model::ColorUpdateModel,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        UPDATE color 
        SET r = $1,
            g = $2,
            b = $3,
            alpha = $4,
            name = $5
        WHERE id = $6
        "#,
        color_block.r,
        color_block.g,
        color_block.b,
        color_block.alpha,
        color_block.name,
        color_block.id
    )
    .execute(executor)
    .await?;

    Ok(())
}
