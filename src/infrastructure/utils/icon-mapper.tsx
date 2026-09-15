import { CSSIcon, TailwindIcon } from "@/components/icons/css-icon";
import { BlendIcon } from "lucide-react";

// number form db to icon 

const ICON_MAP: Record<number, React.ReactElement> = {
  0: <TailwindIcon />,
  1: <BlendIcon />,
  2: <CSSIcon />,
};