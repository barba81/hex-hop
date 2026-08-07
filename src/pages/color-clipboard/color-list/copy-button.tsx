import { Hash } from "lucide-react";
import { useState } from "react";
import CopyUx from "./copy-ux";
import type { ColorEntity } from "@/infrastructure/models/entity";
import type { ColorSpaceType } from "@/infrastructure/models/enum";
import { copyToClipboard } from "../features/copy-to-clipboard";

export type CopyLogoParam = {
  color: ColorEntity;
  fontClass: string;
};

const commonStyles =
  "opacity-60 hover:opacity-100 select-none hover:cursor-pointer transition-opacity";

const CopyLogo = ({ color, fontClass }: CopyLogoParam) => {
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const [selectedType, setSelectedType] = useState<ColorSpaceType | null>(null);
 
  const handleCopy = (
    e: React.MouseEvent<HTMLDivElement>,
    type: ColorSpaceType,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords(rect);

    setSelectedType(type);
    setTimeout(() => {
      setSelectedType(null);
      setCoords(null);
    }, 600);

    copyToClipboard(color, type);
  };
  const formats: { type: ColorSpaceType; label: string; isIcon?: boolean }[] = [
    { label: "#", type: "oklab", isIcon: true },
    { label: "RGB", type: "oklab", isIcon: false },
    { label: "OKLAB", type: "oklab", isIcon: false },
    { label: "HVS", type: "oklab", isIcon: false },
  ];

  return (
    <div
      className={`flex items-center gap-2 ${fontClass} `}
    >
      {formats.map((f) => (
        <div key={f.type} className="relative">
          <div
            className={`${commonStyles} ${!f.isIcon ? "font-mono font-semibold" : ""}`}
            onClick={(e) => handleCopy(e, f.type)}
          >
            {f.isIcon ? <Hash size={18} strokeWidth={2.5} /> : f.label}
          </div>

          {f.type === selectedType && coords ? <CopyUx anchorRect={coords} /> : null}
        </div>
      ))}
    </div>
  );
};

export default CopyLogo;
