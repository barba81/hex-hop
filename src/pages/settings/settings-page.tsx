import { Outlet } from "react-router";
import SettingsNavigator from "./settings-navigator";

export const SettingsPage = () => {
  return (
    <div>
      <SettingsNavigator />

      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;