import { Copy, TriangleAlert, TvMinimal } from "lucide-react";
import { NavLink } from "react-router";

export const SettingsNavigator = () => {
  return (
    <div className="flex w-full dark:bg-zinc-800 px-1 py-1 h-8">
      <NavLink
        to="/settings"
        end
        className={({ isActive }) =>
          `flex px-2 rounded-md gap-1.5 text-sm items-center cursor-pointer hover:bg-accent ${
            isActive ? "bg-accent" : ""
          }`
        }
      >
        <TvMinimal size={15} />
        View
      </NavLink>

      <NavLink
        to="/settings/general"
        className={({ isActive }) =>
          `flex px-2 rounded-md gap-1.5 text-sm items-center cursor-pointer hover:bg-accent ${
            isActive ? "bg-accent" : ""
          }`
        }
      >
        <Copy size={15} />
        Color block
      </NavLink>

      <NavLink
        to="/settings/danger"
        className={({ isActive }) =>
          `flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer text-destructive hover:bg-destructive/20 transition-colors ${
            isActive ? "bg-destructive/20" : ""
          }`
        }
      >
        <TriangleAlert size={15} />
        Danger settings
      </NavLink>
    </div>
  );
};

export default SettingsNavigator;