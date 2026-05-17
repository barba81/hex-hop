import GradientList from "./GradientList";
import GradientPreview from "./GradientPreview";

const GradientGeneratorPage = () => {
  return <>
    <div className="flex flex-col gap-3 p-2">
      <GradientPreview/>
      <GradientList/>
      <GradientList/>
      <GradientList/>
      <GradientList/>
      <GradientList/>
    </div>
  </>
};

export default GradientGeneratorPage;
