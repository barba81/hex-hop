CREATE TABLE palette (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    [order]     INTEGER, 
    name        TEXT
);

CREATE TABLE color (
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




CREATE TABLE gradient (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    [order]     INTEGER, 
    paletteId   INTEGER,
    name        TEXT,

    FOREIGN KEY (paletteId) REFERENCES palette(id) ON DELETE CASCADE
);

CREATE TABLE gradient_layer (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    [order]             INTEGER, 
    gradientId          INTEGER,
    gradientType        INTEGER, 
    rotationDegree      REAL,
    patternRepeatNumber INTEGER,
    colorSpace          INTEGER,
    easingFunction      INTEGER,
    
    FOREIGN KEY (gradientId) REFERENCES gradient(id) ON DELETE CASCADE 
);

CREATE TABLE gradient_stop (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    [order]         INTEGER, 
    layerId         INTEGER, 
    r               REAL  DEFAULT 1 CHECK(r BETWEEN 0 AND 1),
    g               REAL  DEFAULT 1 CHECK(g BETWEEN 0 AND 1),
    b               REAL  DEFAULT 1 CHECK(b BETWEEN 0 AND 1),
    a               REAL  DEFAULT 1 CHECK(a BETWEEN 0 AND 1),
    position        REAL  DEFAULT 1 CHECK(position BETWEEN 0 AND 1), 

    FOREIGN KEY (layerId) REFERENCES gradient_layer(id) ON DELETE CASCADE
); 


CREATE TABLE block (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    [order] INTEGER
);

ALTER TABLE color DROP COLUMN [order];
ALTER TABLE color ADD COLUMN blockId INTEGER REFERENCES block(id);

ALTER TABLE gradient DROP COLUMN [order];
ALTER TABLE gradient ADD COLUMN blockId INTEGER REFERENCES block(id);

ALTER TABLE palette DROP COLUMN [order];
ALTER TABLE palette ADD COLUMN blockId INTEGER REFERENCES block(id);


ALTER TABLE palette ADD COLUMN deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1);
ALTER TABLE color ADD COLUMN deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1);
ALTER TABLE gradient ADD COLUMN deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1);
ALTER TABLE gradient_layer ADD COLUMN deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1);
ALTER TABLE gradient_stop ADD COLUMN deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1);
