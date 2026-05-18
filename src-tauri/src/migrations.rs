use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_color_tables",
            sql: "
            CREATE TABLE palette (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]     INTEGER, 
                name        TEXT
            );

            CREATE TABLE colors (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]     INTEGER, 
                paletteId   INTEGER,
                r           REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1),
                g           REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1),
                b           REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1),
                a           REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
                name        TEXT,
                
                FOREIGN KEY (paletteId) REFERENCES palette(id) ON DELETE CASCADE
            );
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 2,
            description: "gradients_v2",
            sql: "
            -- 1. The Top-Level Gradient Asset
            CREATE TABLE gradient (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]     INTEGER, 
                paletteId   INTEGER,
                name        TEXT,

                FOREIGN KEY (paletteId) REFERENCES palette(id) ON DELETE CASCADE
            );

            -- 2. The Individual Layers (A gradient can have multiple linear/radial layers)
            CREATE TABLE gradient_layer (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]             INTEGER, 
                gradientId          INTEGER,
                gradientType        INTEGER, -- e.g., 0 = Linear, 1 = Radial
                rotationDegree      REAL,
                patternRepeatNumber INTEGER,
                colorSpace          INTEGER,
                easingFunction      INTEGER,
               
                FOREIGN KEY (gradientId) REFERENCES gradient(id) ON DELETE CASCADE 
            );

            -- 3. The Color Stops inside a specific layer
            CREATE TABLE gradient_stop (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]         INTEGER, 
                layerId         INTEGER, -- Fixed: Now correctly points to the layer
                r               REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1),
                g               REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1),
                b               REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1),
                a               REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
                position        REAL  DEFAULT 1 CHECK(position BETWEEN 0 AND 1), 

                -- Fixed: References gradient_layer(id)
                FOREIGN KEY (layerId) REFERENCES gradient_layer(id) ON DELETE CASCADE
            ); 
            ",
            kind: MigrationKind::Up,
        },
    ]
}