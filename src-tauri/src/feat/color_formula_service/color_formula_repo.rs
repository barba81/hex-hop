use crate::feat::color_formula_service::color_formula_model::ColorCopyFormulaModel;

pub async fn create_color<'a, E>(
    color_formula_model: &ColorCopyFormulaModel,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        INSERT INTO color_copy_formula (id, formula, formula_order, formula_name, enabled, icon_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        "#,
        color_formula_model.id,
        color_formula_model.formula,
        color_formula_model.formula_order,
        color_formula_model.formula_name,
        color_formula_model.enabled,
        color_formula_model.icon_id,
    )
    .execute(executor) // Use .execute instead of .fetch_one
    .await?;

    Ok(id)
}
