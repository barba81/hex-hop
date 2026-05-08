import { ColorEntity } from "@/model/color";

type ColorBlockParams = {
  color: ColorEntity;
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


export default ColorText;