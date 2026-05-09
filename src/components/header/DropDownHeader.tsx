import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Clipboard, Eye, Import, Settings, SwatchBook } from "lucide-react";
import MyCustomIcon from "../icons/MyIcon";
import { PagesTypes, useAppStore } from "@/store/useThemeStore";

const ICON_MAP = {
  'color-list': { icon: <Clipboard  />, label: 'Color List' },
  'gradient-creator': { icon: <MyCustomIcon  />, label: 'Gradient Creator' },
  'palette-generator': { icon: <SwatchBook  />, label: 'Palette' },
  'color-contrast': { icon: <Eye  />, label: 'Contrast' },
  'import-export': { icon: <Import  />, label: 'Import/Export' },
  'settings': { icon: <Settings  />, label: 'Settings' },
};

const DropDownHeader = () => {
  const activePage = useAppStore().activePage;
  const setActivePage = useAppStore().setActivePage;

return <>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="rounded-md hover:cursor-pointer flex items-center justify-center gap-1 dark:text-white cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-500/50 p-1">
        {ICON_MAP[activePage]?.icon || <Clipboard />}
        <ChevronDown size={21}/>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="min-w-[160px] bg-stone-800 text-stone-200 border-stone-700">
      <DropdownMenuGroup>
        {Object.entries(ICON_MAP).map(([key, { icon, label }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setActivePage(key as PagesTypes )}
            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-stone-700 cursor-pointer rounded-sm"
          >
            <span className="text-stone-400">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</>
}

export default DropDownHeader;