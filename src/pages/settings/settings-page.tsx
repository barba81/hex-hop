import { useSettingStore } from "./store/use-setting-store";
import SettingsNavigator from "./settings-navigator";
import { SettingsView } from "./settings-view";
import { SettingsColorBlock } from "./settings-color-box";
import { SettingsDanger } from "./settings-danger";

export const SettingsPage = () => {
  const activeSettingPage = useSettingStore((store) => store.activeSettingPage);
  return (
    <div className="  ">
      <SettingsNavigator/>
      <div className="p-3">
      {activeSettingPage === 'view' && <SettingsView/>}
      {activeSettingPage === 'color-block' && <SettingsColorBlock/>}
      {activeSettingPage === 'danger' && <SettingsDanger/>}
      </div>
    </div>
  )
}