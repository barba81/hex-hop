import GradientEmptyPage from "./gradient-empty-page";
import { useGradientStore } from "./store/use-gradient-store";

const GradientGeneratorPage = () => {
  const gradients = useGradientStore((state)=>state.gradients);
  return {};
};

export default GradientGeneratorPage;
