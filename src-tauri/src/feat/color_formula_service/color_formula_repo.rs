use crate::feat::color_formula_service::color_formula_model::ColorCopyFormulaModel;

pub async fn create_color_formula<'a, E>(
    color_formula_model: &ColorCopyFormulaModel,
    executor: E,
) -> Result<String, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    let id = sqlx::query_scalar!(
        r#"
        INSERT INTO color_copy_formula (id, formula, formula_order, formula_name, enabled, icon_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id AS "id!"
        "#,
        color_formula_model.id,
        color_formula_model.formula,
        color_formula_model.formula_order,
        color_formula_model.formula_name,
        color_formula_model.enabled,
        color_formula_model.icon_id,
    )
    .fetch_one(executor) // Use .execute instead of .fetch_one
    .await?;

    Ok(id)
}


pub async fn get_all_color_formula<'a, E>(
    executor: E,
) -> Result<Vec<ColorCopyFormulaModel>, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let formulas: Vec<ColorCopyFormulaModel> = sqlx::query_as!(
        ColorCopyFormulaModel,
        r#"
        SELECT 
            ccf.id as "id!",
            ccf.formula as "formula!",
            ccf.formula_order as "formula_order!",
            ccf.formula_name as "formula_name!",
            ccf.icon_id as "icon_id",
            ccf.enabled as "enabled!"
        FROM color_copy_formula ccf
        WHERE deleted = 0
        "#
        )
        .fetch_all(executor)
        .await?;

    Ok(formulas)
}




pub async fn get_color_formula<'a, E>(
    color_formula_id: &str,
    executor: E,
) -> Result<ColorCopyFormulaModel, sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
        let formulas: ColorCopyFormulaModel = sqlx::query_as!(
        ColorCopyFormulaModel,
        r#"
        SELECT 
            ccf.id as "id!",
            ccf.formula as "formula!",
            ccf.formula_order as "formula_order!",
            ccf.formula_name as "formula_name!",
            ccf.icon_id as "icon_id",
            ccf.enabled as "enabled!"
        FROM color_copy_formula ccf
        WHERE deleted = 0
        and ccf.id=$1
        "#,
        color_formula_id,
        )
        .fetch_one(executor)
        .await?;

    Ok(formulas)
}


pub async fn update_color_formula<'a, E>(
    color_formula_model: &ColorCopyFormulaModel,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        UPDATE color_copy_formula
        SET
            formula = $1,
            formula_order = $2,
            formula_name = $3,
            icon_id = $4,
            enabled = $5
        WHERE id = $6
          AND deleted = 0
        "#,
        color_formula_model.formula,
        color_formula_model.formula_order,
        color_formula_model.formula_name,
        color_formula_model.icon_id,
        color_formula_model.enabled,
        color_formula_model.id,
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn delete_color_formula<'a, E>(
    color_formula_model: &ColorCopyFormulaModel,
    executor: E,
) -> Result<(), sqlx::Error>
where
    E: sqlx::Executor<'a, Database = sqlx::Sqlite>,
{
    sqlx::query!(
        r#"
        UPDATE color_copy_formula
        SET deleted = 1
        WHERE id = $1
          AND deleted = 0
        "#,
        color_formula_model.id,
    )
    .execute(executor)
    .await?;

    Ok(())
}