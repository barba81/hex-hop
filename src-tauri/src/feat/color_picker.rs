use tauri::AppHandle;

#[cfg(target_os = "macos")]
use block::ConcreteBlock;
use std::sync::Arc;
use std::sync::Mutex;
#[cfg(target_os = "macos")]
use objc::{class, msg_send, runtime::Object, sel, sel_impl};

#[tauri::command]
pub async fn eye_drop_mack(_app_handle: AppHandle) -> Result<Option<String>, String> {
    #[cfg(target_os = "macos")]
    {
             Err("NSColorSampler is only available on macOS".to_string())
  
    }

    #[cfg(not(target_os = "macos"))]
    {
        // Fallback or Error for Windows/Linux
        Err("NSColorSampler is only available on macOS".to_string())
    }
}
