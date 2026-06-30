use sqlx::{Connection, SqliteConnection, Row};


#[derive(sqlx::FromRow, Debug)]
struct Point {
    x: i32,
    y: i32,
}

pub async fn init()-> Result<(), Box<dyn std::error::Error>> {
   let database_url = "sqlite://data/seed.db";
    
    let mut conn = SqliteConnection::connect(database_url).await?;
   let points: Vec<Point> = sqlx::query_as::<_, Point>("SELECT x, y FROM point")
        .fetch_all(&mut conn)
        .await?;
        
    for point in points {
        println!("Parsed point: x = {}, y = {}", point.x, point.y);
    }
   
    Ok(())
}