import { Outlet } from "react-router";
import SettingsNavigator from "./settings-navigator";

export const SettingsPage = () => {
  return (
    <div className="flex flex-col h-full">
      <SettingsNavigator />
      <div className="flex-1 h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;