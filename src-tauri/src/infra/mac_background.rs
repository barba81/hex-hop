use tauri::{ WebviewWindow};
#[cfg(target_os = "windows")]
use window_vibrancy::apply_acrylic;

pub fn mack_background(window:   WebviewWindow) -> Result<(), String> {

    #[cfg(target_os = "macos")]
    {

        apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(16.0))
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        apply_liquid_glass(&window, NSGlassEffectViewStyle::Clear, None, Some(26.0))
            .expect(
                "Unsupported platform! 'apply_liquid_glass' is only supported on macOS 26+",
            );
    }

    #[cfg(target_os = "windows")]
    apply_acrylic(&window, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    Ok(())
}