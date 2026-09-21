import CSSLogo from "@/assets/icons/Official_CSS_Logo.svg";
import Blender from "@/assets/icons/Blender_logo_no_text.svg";
import Tailwind from "@/assets/icons/Tailwind_CSS_Logo.svg";


export const CSSIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={CSSLogo} alt="CSS" />
  );
}

export const BlenderIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={Blender} alt="Blender" />
  );
}

export const TailwindIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={Tailwind} alt="Tailwind" />
  );
}