use tauri::AppHandle;

#[cfg(target_os = "macos")]
use block::ConcreteBlock;
#[cfg(target_os = "macos")]
use objc::{class, msg_send, runtime::Object, sel, sel_impl};

#[tauri::command]
pub async fn eye_drop_mack(_app_handle: AppHandle) -> Result<Option<String>, String> {
    #[cfg(target_os = "macos")]
    {
        // Channel to send the color back from the Objective-C block to our async Rust task
        let (tx, rx) = oneshot::channel();
        let tx = Arc::new(Mutex::new(Some(tx)));

        // NSColorSampler interacts with UI and MUST run on the main thread
        _app_handle
            .run_on_main_thread(move || {
                unsafe {
                    let sampler_class = class!(NSColorSampler);
                    // if sampler_class.is_null() {
                    //     if let Some(tx) = tx.lock().unwrap().take() {
                    //         let _ = tx.send(Err("NSColorSampler requires macOS 10.15+".to_string()));
                    //     }
                    //     return;
                    // }

                    // Initialize: [[NSColorSampler alloc] init]
                    let sampler: *mut Object = msg_send![sampler_class, alloc];
                    let sampler: *mut Object = msg_send![sampler, init];

                    let block_tx = tx.clone();

                    // Create the callback block triggered when the user clicks a color
                    let block = ConcreteBlock::new(move |color: *mut Object| {
                        let mut locked_tx = block_tx.lock().unwrap();
                        if let Some(tx) = locked_tx.take() {
                            if color.is_null() {
                                // User pressed ESC or cancelled
                                let _ = tx.send(Ok(None));
                            } else {
                                // Convert the selected color to the sRGB color space
                                let color_space_class = class!(NSColorSpace);
                                let srgb_space: *mut Object =
                                    msg_send![color_space_class, sRGBColorSpace];
                                let srgb_color: *mut Object =
                                    msg_send![color, colorUsingColorSpace: srgb_space];

                                if srgb_color.is_null() {
                                    let _ =
                                        tx.send(Err("Failed to convert color space".to_string()));
                                    return;
                                }

                                // Extract RGB components
                                let r: f64 = msg_send![srgb_color, redComponent];
                                let g: f64 = msg_send![srgb_color, greenComponent];
                                let b: f64 = msg_send![srgb_color, blueComponent];

                                // Format as #RRGGBB Hex
                                let hex = format!(
                                    "#{:02X}{:02X}{:02X}",
                                    (r * 255.0).round() as u8,
                                    (g * 255.0).round() as u8,
                                    (b * 255.0).round() as u8
                                );

                                let _ = tx.send(Ok(Some(hex)));
                            }
                        }
                    });

                    // Objective-C blocks executed asynchronously must be copied to the heap
                    let block = block.copy();

                    // Call [sampler showSamplerWithSelectionHandler: block]
                    let () = msg_send![sampler, showSamplerWithSelectionHandler: &*block];
                }
            })
            .map_err(|e| e.to_string())?;

        // Wait for the Objective-C block to complete
        match rx.await {
            Ok(result) => result,
            Err(_) => Err("Color picker closed unexpectedly".to_string()),
        }
    }

    #[cfg(not(target_os = "macos"))]
    {
        // Fallback or Error for Windows/Linux
        Err("NSColorSampler is only available on macOS".to_string())
    }
}
