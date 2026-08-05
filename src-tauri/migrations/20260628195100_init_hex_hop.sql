-- Add migration script here
CREATE TABLE block (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_palette_id INTEGER, 
    block_order       INTEGER NOT NULL, 
    deleted           INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1),
    
    FOREIGN KEY (parent_palette_id) REFERENCES palette(id) ON DELETE CASCADE
);

CREATE TABLE color (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    block_id INTEGER UNIQUE NOT NULL,
    r               REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1) NOT NULL,
    g               REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1) NOT NULL,
    b               REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1) NOT NULL,
    a               REAL  DEFAULT NULL CHECK(a BETWEEN 0 AND 1),
    name     TEXT NOT NULL,
    
    FOREIGN KEY (block_id) REFERENCES block(id) ON DELETE CASCADE
);

CREATE TABLE palette (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    block_id INTEGER UNIQUE NOT NULL,
    name     TEXT NOT NULL,
    
    FOREIGN KEY (block_id) REFERENCES block(id) ON DELETE CASCADE
);

CREATE TABLE gradient (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    block_id INTEGER UNIQUE NOT NULL,
    name     TEXT NOT NULL,
    
    FOREIGN KEY (block_id) REFERENCES block(id) ON DELETE CASCADE
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
    a               REAL  DEFAULT NULL CHECK(a BETWEEN 0 AND 1),
    position        REAL  DEFAULT 1 CHECK(position BETWEEN 0 AND 1)  NOT NULL, 
    deleted         INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1) ,

    FOREIGN KEY (layer_id) REFERENCES gradient_layer(id) ON DELETE CASCADE
); 

