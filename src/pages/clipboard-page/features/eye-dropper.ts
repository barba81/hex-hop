import { addNewColorToClipboard } from "./add-block";
import { useHexHopStore } from "@/store/hex-hop-store";
import { setColorValidityAndMode } from "./set-color-validity-and-mode";

export const eyeDropperColorPicker = async () => {

  // mack implementation 
  // const hexColor = await invoke<string | null>('pick_color');


  if (!window.EyeDropper) {
    return;
  }

  const eyeDropper = new window.EyeDropper();

  try {
    const result = await eyeDropper.open();
  } catch (e) {
    console.error(e);
  }
};
const setInputColor = useHexHopStore.getState().setInputColor;

useHexHopStore.setState((state) => {

  return {
    history: {

    },
  };
});


// setInputColor(result.sRGBHex);
// setColorValidityAndMode(result.sRGBHex);
// await addNewColorToClipboard(result.sRGBHex, null);



declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}
