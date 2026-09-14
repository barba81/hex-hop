-- Add migration script here
CREATE TABLE copy_formula (
    id TEXT PRIMARY KEY,
    formula TEXT NOT NULL,
    formula_order INTEGER NOT NULL, 
    formula_name TEXT NOT NULL
    enabled  INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1),
    deleted INTEGER DEFAULT 0 CHECK(deleted BETWEEN 0 AND 1),
    icond_id INTEGER,
);