import { CSSIcon, TailwindIcon } from "@/components/icons/custom-icon";
import type React from 'react';

const ICON_COMPONENT_MAP: Record<number, React.ReactElement> = {
  0: <TailwindIcon />,
  1: <CSSIcon />,
};

interface DynamicIconProps {
  iconId: number;
}

export const DynamicIconMapper: React.FC<DynamicIconProps> = ({ iconId }) => {
  const iconElement = ICON_COMPONENT_MAP[iconId];
  return iconElement; 
};