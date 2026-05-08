import { ColorEntity, ColorFormat } from "@/model/color";
import { ColorPallet } from "@/service/colorPallet";
import { Hash } from "lucide-react";
import { useState } from "react";
import CopyUx from "./CopyUx";

export type CopyLogoParam = {
  color: ColorEntity;
  fontClass: string;
};

const commonStyles =
  "opacity-60 hover:opacity-100 select-none hover:cursor-pointer transition-opacity";

const CopyLogo = ({ color, fontClass }: CopyLogoParam) => {
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const [selectedType, setSelectedType] = useState<ColorFormat | null>(null);
  const handleCopy = (
    e: React.MouseEvent<HTMLDivElement>,
    type: ColorFormat,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords(rect);

    setSelectedType(type);
    setTimeout(() => {
      setSelectedType(null);
      setCoords(null);
    }, 600);

    ColorPallet.CopyToClipboard(color, type);
  };
  const formats: { type: ColorFormat; label: string; isIcon?: boolean }[] = [
    { label: "#", type: "#", isIcon: true },
    { label: "RGB", type: "RBG" },
    { label: "HSL", type: "HSL" },
    { label: "OK", type: "OK" },
    { label: "VEC", type: "VEC" },
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

          {/* Only render if we have coordinates */}
          {f.type === selectedType && coords && <CopyUx anchorRect={coords} />}
        </div>
      ))}
    </div>
  );
};

export default CopyLogo;
