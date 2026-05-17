import "@/style/EmptyCheckerBoard.css";

const GradientPreview = () => {
  return (
    <>
      <div className="bg-checkerboard   h-30 rounded-md w-full  overflow-hidden outline-3">
        <div
          className="  h-full w-full "
          style={{
            background: `
            radial-gradient(red 0 8%, yellow 8% 16%, blue 16% 100%)
                `,
          }}
        ></div>
      </div>
    </>
  );
};

export default GradientPreview;
