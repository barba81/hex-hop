import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Clipboard,
  Import,
  Palette,
  Settings,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router";

import GradientIcon from "@/components/icons/gradient-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "../theme/mode-toggle";

const size = 15;

const ICON_MAP = {
  "/": {
    icon: (
      <Clipboard
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Color List",
    shortLabel: "Clipboard",
  },

  "/gradient": {
    icon: (
      <GradientIcon
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Gradient",
    shortLabel: "Gradient",
  },

  "/palette": {
    icon: (
      <Palette
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Palette",
    shortLabel: "Palette",
  },




  "/settings": {
    icon: (
      <Settings
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Settings",
    shortLabel: "Settings",
  },
  "/import-export": {
    icon: (
      <Import
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Export",
    shortLabel: "Export",
  },
};

const DropDownHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePath = () => {
    if (location.pathname.startsWith("/settings")) {
      return "/settings";
    }

    return location.pathname;
  };

  const activePath = getActivePath();
  const activePage = ICON_MAP[activePath as keyof typeof ICON_MAP];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="text-xs gap-1 items-center" variant='outline' size='xs'>
          {activePage?.icon || <Clipboard  />}
          {activePage?.shortLabel || "Color List"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto">
        <DropdownMenuGroup>
          {Object.entries(ICON_MAP).map(([path, { icon, label }]) => (
            <DropdownMenuItem
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm "
            >
              <span>{icon}</span>

              <span className="text-xs font-medium">
                {label}
              </span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownHeader;