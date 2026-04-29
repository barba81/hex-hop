import { ColorEntity } from "@/model/color";
import { ColorFormat } from "@/model/colorFormat";
import { ColorPallet } from "@/service/colorPallet";
import { Hash, X } from "lucide-react";
import { toast } from "sonner";
import "./ColorBlock.css";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";

type ColorBlockComponentParams = {
  color: ColorEntity;
  fontClass: string;
};

type ColorBlockParams = {
  color: ColorEntity;
};

const CopyLogo = ({ color, fontClass }: ColorBlockComponentParams) => {
  const commonStyles =
    "opacity-60 hover:opacity-100 select-none hover:cursor-pointer transition-opacity";

  const handleCopy = (type: ColorFormat) => {
    ColorPallet.CopyToClipboard(color, type);
    toast(`Copied color to clipboard!`, {
      duration: 750,
      position: "top-center",
      style: {
        background: "#171812",
        color: "#fff",
        border: "1px solid #333",
        fontSize: "11px",
        borderRadius: "8px",
        padding: "8px 12px",
      },
    });
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
        <div
          key={f.type}
          className={`${commonStyles} ${!f.isIcon ? "font-mono font-semibold" : ""}`}
          onClick={() => handleCopy(f.type)}
        >
          {f.isIcon ? <Hash size={18} strokeWidth={2.5} /> : f.label}
        </div>
      ))}
    </div>
  );
};

const CloseButton = ({ color }: ColorBlockParams) => {
  return (
    <>
      <div
        onClick={() => {
          ColorPallet.DeleteById(color);
        }}
        className="absolute top-0.5 right-0 hover:cursor-pointer hover:bg-amber-50/20 p-0.5 rounded-full"
      >
        <X size={15} />
      </div>
    </>
  );
};

const ColorText = ({ color }: ColorBlockParams) => {
  return (
    <div className="absolute bottom-1.5 left-1 select-none cursor-default  antialiased">
      <div className="flex gap-2 opacity-80 text-[13px] uppercase tracking-wider font-semibold">
        <span>
          <span className="opacity-50 mr-1">R</span>
          {color.r}
        </span>
        <span>
          <span className="opacity-50 mr-1">G</span>
          {color.g}
        </span>
        <span>
          <span className="opacity-50 mr-1">B</span>
          {color.b}
        </span>

        {color.a && (
          <span>
            <span className="opacity-50 mr-1">A</span>
            {color.a.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

const ColorBlock = ({ color }: { color: ColorEntity }) => {
  const { isDark: isAppDarkMode } = useTheme();
  const isLight = useMemo(() => {
    const { r, g, b, a = 1.0 } = color;

    const bgLuma = isAppDarkMode ? 30 : 255;

    // 2. Calculate the color's raw luminance
    const colorLuma = 0.299 * r + 0.587 * g + 0.114 * b;

    // 3. Blend them based on Alpha
    // Formula: (Color * Alpha) + (Background * (1 - Alpha))
    var A = a ?? 1;
    const apparentLuma = colorLuma * A + bgLuma * (1 - A);

    // 4. Return true if we should use dark text
    return apparentLuma > 150;
  }, [color, isAppDarkMode]); // <--- CRITICAL: Depends on isDark
  const fontColor = isLight ? "text-gray-900" : "text-gray-100";

  return (
    <div
      className={`group h-14 rounded-md w-full shrink-0 relative flex items-center justify-between px-1 overflow-hidden ${fontColor} outline-1`}
    >
      <div className="absolute inset-0 bg-checkerboard overflow-hidden rounded-md">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1.0})`,
          }}
        />
      </div>

      <div className=" w-full h-full relative">
        <ColorText color={color} />
        <CopyLogo color={color} fontClass={fontColor} />
        <CloseButton color={color} />
      </div>
    </div>
  );
};

export default ColorBlock;
