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

const size = 17;

const ICON_MAP = {
  'color-list': { icon: <Clipboard size={size} strokeWidth={2.5}  className="text-gray-300"/>, label: 'Color List' },
  'gradient-creator': { icon: <MyCustomIcon size={size} strokeWidth={2.5} className="text-gray-300" />, label: 'Gradient Creator' },
  'palette-generator': { icon: <SwatchBook size={size} strokeWidth={2.5}  className="text-gray-300" />, label: 'Palette' },
  'color-contrast': { icon: <Eye size={size} strokeWidth={2.5} className="text-gray-300" />, label: 'Contrast' },
  'import-export': { icon: <Import size={size} strokeWidth={2.5}  className="text-gray-300"/>, label: 'Import/Export' },
  'settings': { icon: <Settings size={size} strokeWidth={2.5} className="text-gray-300"/>, label: 'Settings' },
};

const DropDownHeader = () => {
  const activePage = useAppStore().activePage;
  const setActivePage = useAppStore().setActivePage;

return <>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="rounded-sm hover:cursor-pointer
           dark:bg-foreground/10
          hover:bg-foreground/25
          outline-2
        text-gray-900 
        dark:text-white 
      flex items-center justify-center gap-1  cursor-pointer p-1.25 ">
        {ICON_MAP[activePage]?.icon || <Clipboard />}
        <ChevronDown className="text-gray-300" size={12}  strokeWidth={4}/>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="min-w-[160px]  text-stone-200 border-stone-700">
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