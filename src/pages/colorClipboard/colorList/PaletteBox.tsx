import ColorBlock from "../colorBoxes/ColorBlock";
import { DragDots } from "./DragDots";

export const PaletteBox = () => {
  return (
    <>
      <div className="flex flex-col ">
        <div
          className={`h-7 rounded-md w-full shrink-0 relative flex items-center justify-between outline-2`}
        >
          <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden flex">
            <div
              className="w-full h-full"
              style={{
                background: `
              repeating-linear-gradient(
                45deg,
                transparent 0px 68px,
                #6dcae4 68px 70px,
                transparent 70px 78px,
                #6dcae4 78px 80px,
                transparent 80px 150px
                ),
                repeating-linear-gradient(
                  315deg,
                  transparent 0px 68px,
                  #6dcae4 68px 70px,
                  transparent 70px 78px,
                  #6dcae4 78px 80px,
                  transparent 80px 150px
                  ),
                  repeating-linear-gradient(45deg, #3ec1edbb 0px 60px, transparent 60px 150px),
                  repeating-linear-gradient(315deg, #91dff5 0px 60px, #fefefb 60px 150px)
                  `,
              }}
            />
            <div
              className="w-full h-full"
              style={{
                background: `red`,
              }}
            />
            <div
              className="w-full h-full"
              style={{
                background: `blue`,
              }}
            />
          </div>

          <DragDots />
        </div>
        <div className="flex flex-col p-2 gap-2 bg-gray-100/10 rounded-b-2xl ">
          <ColorBlock color={""} />
        </div>
      </div>
    </>
  );
};
