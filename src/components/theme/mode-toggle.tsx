import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { Button } from "../ui/button"


export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Button 
      variant="outline" 
      size="icon-xs" 
      onClick={cycleTheme}
      className="relative overflow-hidden"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
        theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
      }`} />

      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
        theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
      }`} />

      <SunMoon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
        theme === "system" ? "scale-100 rotate-0" : "scale-0 rotate-90"
      }`} />

    </Button>
  );
};
