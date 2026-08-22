import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Clipboard,
  Eye,
  Import,
  Palette,
  Settings,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router";

import GradientIcon from "@/components/icons/gradient-icon";
import { defaultButtonBackground } from "@/components/common/custom-button";

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

  "/color-contrast": {
    icon: (
      <Eye
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Accessibility",
    shortLabel: "Accessibility",
  },

  "/import-export": {
    icon: (
      <Import
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Import/Export",
    shortLabel: "Export",
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
      <DropdownMenuTrigger asChild>
        <button
          className={`${defaultButtonBackground} gap-2 h-6 px-2 font-semibold select-none outline-1 text-xs`}
        >
          {activePage?.icon || <Clipboard size={size} />}
          {activePage?.shortLabel || "Color List"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40">
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownHeader;