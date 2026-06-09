import GradientList from "./gradient-layer-list";
import GradientPreview from "./gradient-preview";
import { AllGradientsList } from "./all-gradients-list/all-gradient-list";

const GradientGeneratorPage = () => {
  return (
    <>
      <div className="flex flex-col w-full flex-1 p-1">
        <AllGradientsList />
        <div>Gradient name</div>
        <GradientPreview gradientBackground=" linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)" />
        <GradientList />
      </div>
    </>
  );
};

export default GradientGeneratorPage;
