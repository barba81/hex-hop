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
import type { PagesTypes} from "@/store/use-app-store";
import { useAppStore } from "@/store/use-app-store";
import GradientIcon from "@/components/icons/gradient-icon";
import { defaultButtonBackground } from "@/components/common/micro-button";

const size = 15;

const ICON_MAP = {
  "color-list": {
    icon: (
      <Clipboard size={size} strokeWidth={2.5} className="dark:text-gray-300" />
    ),
    label: "Color List",
    shortLabel: "Clipboard",
  },
  "gradient-creator": {
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
  "palette-generator": {
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
  "color-contrast": {
    icon: <Eye size={size} strokeWidth={2.5} className="dark:text-gray-300" />,
    label: "Accessibility",
    shortLabel: "Accessibility",
  },
  "import-export": {
    icon: (
      <Import size={size} strokeWidth={2.5} className="dark:text-gray-300" />
    ),
    label: "Import/Export",
    shortLabel: "Export",
  },
  settings: {
    icon: (
      <Settings size={size} strokeWidth={2.5} className="dark:text-gray-300" />
    ),
    label: "Settings",
    shortLabel: "Settings",
  },
};

const DropDownHeader = () => {
  const activePage = useAppStore((state)=>state.activePage);
  const setActivePage = useAppStore((state)=>state.setActivePage);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`          ${defaultButtonBackground} gap-2   h-6 px-2 font-semibold  select-none outline-1  text-xs `}
          >
            {ICON_MAP[activePage]?.icon || <Clipboard />}
            {ICON_MAP[activePage]?.shortLabel }
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-40 ">
          <DropdownMenuGroup >
            {Object.entries(ICON_MAP).map(([key, { icon, label }]) => (
              <DropdownMenuItem
                
                key={key}
                onClick={() => setActivePage(key as PagesTypes)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm  cursor-pointer rounded-sm "
              >
                <span className="">{icon}</span>
                <span className="text-xs font-medium ">
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
