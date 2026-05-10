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
  Settings,
  SwatchBook,
} from "lucide-react";
import MyCustomIcon from "../icons/MyIcon";
import { PagesTypes, useAppStore } from "@/store/useThemeStore";
import { Button } from "../ui/button";

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
      <MyCustomIcon
        size={size}
        strokeWidth={2.5}
        className="dark:text-gray-300"
      />
    ),
    label: "Gradient Creator",
    shortLabel: "Gradient",
  },
  "palette-generator": {
    icon: (
      <SwatchBook
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
    label: "Contrast",
    shortLabel: "Contrast",
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
  const activePage = useAppStore().activePage;
  const setActivePage = useAppStore().setActivePage;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="relative  active:scale-95 select-none hover:cursor-pointer  text-xs rounded-md h-7"
          >
            {ICON_MAP[activePage]?.icon || <Clipboard />}
            {ICON_MAP[activePage]?.shortLabel }
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-[160px]  text-stone-200 border-stone-700">
          <DropdownMenuGroup>
            {Object.entries(ICON_MAP).map(([key, { icon, label }]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setActivePage(key as PagesTypes)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-stone-700 cursor-pointer rounded-sm"
              >
                <span className="text-stone-400">{icon}</span>
                <span className="text-xs font-medium text-stone-400">
                  {label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownHeader;
