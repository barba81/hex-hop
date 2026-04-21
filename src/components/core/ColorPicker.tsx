import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pipette } from "lucide-react";
import { HexColorPicker } from "react-colorful";



declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}





const ColorPicker = () => {
  const [, setSelectedColor] = useState('#ffffff');

  const handlePickColor = async () => {
    // 1. Check if the browser supports the EyeDropper API
    if (!window.EyeDropper) {
      alert("Your browser does not support the EyeDropper API.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      // 2. Open the pipette tool
      const result = await eyeDropper.open();
      // 3. The result returns an object: { sRGBHex: '#000000' }
      setSelectedColor(result.sRGBHex);
    } catch (e) {
      console.log("Color selection cancelled or failed");
    }
  };

  return (
    <div className="flex items-center p-2 gap-2 border-t-2 bg-black/20">
      
              {/* <HexColorPicker color={color} onChange={setColor} /> */}

      <Button  onClick={handlePickColor} >  <Pipette size={24} /></Button>

      <Input placeholder="Enter text" />
    </div>
  );
};

export default ColorPicker;