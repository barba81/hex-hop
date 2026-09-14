-- Add migration script here

CREATE TABLE copy_formula (
    id TEXT PRIMARY KEY,
    formula TEXT NOT NULL,
    formula_order INTEGER NOT NULL,
    formula_name TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
    deleted INTEGER NOT NULL DEFAULT 0 CHECK (deleted IN (0, 1)),
    icon_id INTEGER
);