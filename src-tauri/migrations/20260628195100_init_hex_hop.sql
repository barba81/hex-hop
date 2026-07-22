-- Add migration script here
CREATE TABLE palette (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT  NOT NULL,
    deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1)
);

CREATE TABLE color (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    r       REAL DEFAULT 1 CHECK(r BETWEEN 0 AND 1),
    g       REAL DEFAULT 1 CHECK(g BETWEEN 0 AND 1),
    b       REAL DEFAULT 1 CHECK(b BETWEEN 0 AND 1),
    a       REAL DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
    name    TEXT  NOT NULL,
    deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1)
);

CREATE TABLE gradient (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1)
);

CREATE TABLE block (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_palette_id    INTEGER NOT NULL, 
    block_order   INTEGER NOT NULL, 
    color_id      INTEGER,
    gradient_id   INTEGER,
    sub_palette_id INTEGER,
    
    FOREIGN KEY (parent_palette_id) REFERENCES palette(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES color(id) ON DELETE CASCADE,
    FOREIGN KEY (gradient_id) REFERENCES gradient(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_palette_id) REFERENCES palette(id) ON DELETE CASCADE,
    
    CHECK (
        (color_id IS NOT NULL AND gradient_id IS NULL AND sub_palette_id IS NULL) OR
        (color_id IS NULL AND gradient_id IS NOT NULL AND sub_palette_id IS NULL) OR
        (color_id IS NULL AND gradient_id IS NULL AND sub_palette_id IS NOT NULL)
    )
);

CREATE TABLE gradient_layer (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    gradient_order          INTEGER NOT NULL, 
    gradient_id          INTEGER NOT NULL,
    gradient_type         TEXT  NOT NULL,  
    rotation_degree      REAL NOT NULL,
    pattern_repeat_number INTEGER NOT NULL,
    color_space          TEXT  NOT NULL,
    easing_function      TEXT  NOT NULL,
    deleted         INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1),
    
    FOREIGN KEY (gradient_id) REFERENCES gradient(id) ON DELETE CASCADE 
);

CREATE TABLE gradient_stop (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    gradient_order      INTEGER NOT NULL, 
    layer_id         INTEGER NOT NULL, 
    r               REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1) NOT NULL,
    g               REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1) NOT NULL,
    b               REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1) NOT NULL,
    a               REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
    position        REAL  DEFAULT 1 CHECK(position BETWEEN 0 AND 1)  NOT NULL, 
    deleted         INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1) ,

    FOREIGN KEY (layer_id) REFERENCES gradient_layer(id) ON DELETE CASCADE
); 

