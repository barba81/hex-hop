use sqlx::{Connection, SqliteConnection};

const DATABASE_URL: &'static str = "sqlite://data/seed.db";

pub async fn init()-> Result<(), Box<dyn std::error::Error>> {
    
    let mut conn = SqliteConnection::connect(&DATABASE_URL).await?;
    let points: Vec<Point> = sqlx::query_as::<_, Point>("SELECT x, y FROM point")
    .fetch_all(&mut conn)
    .await?;

for point in points {
    println!("Parsed point: x = {}, y = {}", point.x, point.y);
}

Ok(())
}

#[derive(sqlx::FromRow, Debug)]
struct Point {
    x: i32,
    y: i32,
}
