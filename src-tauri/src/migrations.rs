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
            description: "gradients",
            sql: "
            CREATE TABLE gradient (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]     INTEGER, 
                paletteId   INTEGER,
                name        TEXT, -- Fixed: changed 'string' to 'TEXT'

                FOREIGN KEY (paletteId) REFERENCES palette(id) ON DELETE CASCADE
            );

            CREATE TABLE gradientColorList (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]             INTEGER, 
                gradientId          INTEGER,
                gradientType        INTEGER,
                rotationDegree      REAL,
                patternRepeatNumber INTEGER,
                colorSpace          TEXT,
                easingFunction      INTEGER,
               
                FOREIGN KEY (gradientId) REFERENCES gradient(id) ON DELETE CASCADE 
            );

            CREATE TABLE gradientColor (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                [order]     INTEGER, 
                gradientColorListId INTEGER,
                r                   REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1),
                g                   REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1),
                b                   REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1),
                a                   REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
                position            REAL  DEFAULT 1 CHECK(position BETWEEN 0 AND 1), 

                FOREIGN KEY (gradientColorListId) REFERENCES gradientColorList(id) ON DELETE CASCADE
            ); 
            ",
            kind: MigrationKind::Up,
        },
    ]
}