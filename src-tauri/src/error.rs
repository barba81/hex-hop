use serde::Serialize;

#[derive(Debug)]
pub struct TauriError(pub String);

impl std::fmt::Display for TauriError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for TauriError {}

impl From<sqlx::Error> for TauriError {
    fn from(err: sqlx::Error) -> Self {
        TauriError(err.to_string())
    }
}

impl Serialize for TauriError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.0)
    }
}