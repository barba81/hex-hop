import "@/globals.css";

const GradientPreviewBox = ({gradientBackground} : {gradientBackground: string}) => {
  return (
    <div className="bg-checkerboard   h-35 rounded-md w-full  overflow-hidden outline-1">
        <div
          className="  h-full w-full "
          style={{
            background : gradientBackground,
          }}
        ></div>
      </div>
  );
};

export default GradientPreviewBox;
