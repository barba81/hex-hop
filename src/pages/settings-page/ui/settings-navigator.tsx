import GradientIcon from "@/components/icons/gradient-icon";
import { Palette, TriangleAlert, TvMinimal } from "lucide-react";
import { NavLink } from "react-router";


export const SettingsNavigator = () => {
  return (
    <div className="flex w-full dark:bg-zinc-900 px-1 py-1 h-8 gap-2">
      <NavLink
        to="/settings/color-block"
         className={({ isActive }) =>
          `flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer   ${isActive ? "bg-accent" : ""
          }`
        }
      >
        <TvMinimal size={15} />
        Color
      </NavLink>

      <NavLink
        to="/settings/gradient-block"
          className={({ isActive }) =>
          `flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer   ${isActive ? "bg-accent" : ""
          }`
        }
      >
        <GradientIcon size={15} />
        Gradient
      </NavLink>

      <NavLink
        to="/settings/palette-block"
        className={({ isActive }) =>
          `flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer   ${isActive ? "bg-accent" : ""
          }`
        }
      >
        <Palette size={15} />
        Palette
      </NavLink>

      <NavLink
        to="/settings/danger-settings"
        className={({ isActive }) =>
          `flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer text-destructive hover:bg-destructive/20  ${isActive ? "bg-destructive/20" : ""
          }`
        }
      >
        <TriangleAlert size={15} />
        Danger
      </NavLink>
    </div>
  );
};

export default SettingsNavigator;