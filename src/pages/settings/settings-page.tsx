import { ModeToggle } from "@/components/theme/mode-toggle";
import { DangerSettings } from "./danger-settings";

export function SettingsPage() {
  return (
    <div className="px-5 py-2  ">
      <DangerSettings />
      <ModeToggle/>
    </div>
  )
}