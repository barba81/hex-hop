import { useEffect } from "react";
import GradientEmptyPage from "./gradient-empty-page";
import GradientList from "./gradient-list";
import { useShallow } from "zustand/shallow";
import { useGradientStore } from "../feature/store/use-gradient-store";

const GradientGeneratorPage = () => {
  const { gradientsIds, initGradient } = useGradientStore(
    useShallow((state) => ({
      gradientsIds: state.gradientsIds,
      initGradient: state.initGradient,
    }))
  );

  useEffect(() => {
    initGradient();
  }, [initGradient]);

  return (
    <>
      {gradientsIds.length === 0 && <GradientEmptyPage />}
      {gradientsIds.length > 0 && <GradientList />}
    </>
  );
};

export default GradientGeneratorPage;