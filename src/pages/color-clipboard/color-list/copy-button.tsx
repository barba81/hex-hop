import { Hash } from "lucide-react";
import { useState } from "react";
import CopyUx from "./copy-ux";
import { ColorSpace } from "@/features/infrastructure/enum/color-space.enum";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { copyToClipboard } from "@/features/colors/copy-to-clipboard";

export type CopyLogoParam = {
  color: ColorEntity;
  fontClass: string;
};

const commonStyles =
  "opacity-60 hover:opacity-100 select-none hover:cursor-pointer transition-opacity";

const CopyLogo = ({ color, fontClass }: CopyLogoParam) => {
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const [selectedType, setSelectedType] = useState<ColorSpace | null>(null);
 
  const handleCopy = (
    e: React.MouseEvent<HTMLDivElement>,
    type: ColorSpace,
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
  const formats: { type: ColorSpace; label: string; isIcon?: boolean }[] = [
    { label: "#", type: "oklab", isIcon: true },
    { label: "RGB", type: "oklab" },
    { label: "HSL", type: "oklab" },
    { label: "OK", type: "oklab" },
    { label: "VEC", type: "oklab" },
  ];

  return (
    <div
      className={`flex absolute top-1.5 left-0 items-center gap-2 ${fontClass}`}
    >
      {formats.map((f) => (
        <div key={f.type} className="relative">
          <div
            className={`${commonStyles} ${!f.isIcon ? "font-mono font-semibold" : ""}`}
            onClick={(e) => handleCopy(e, f.type)}
          >
            {f.isIcon ? <Hash size={18} strokeWidth={2.5} /> : f.label}
          </div>

          {f.type === selectedType && coords && <CopyUx anchorRect={coords} />}
        </div>
      ))}
    </div>
  );
};

export default CopyLogo;
