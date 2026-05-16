import "@/style/EmptyCheckerBoard.css";

const GradientPreview = () => {
  return (
    <>
      <div className="bg-checkerboard   h-30 rounded-md w-full bg-amber-100 outline-3">
        <div
          className="  h-full w-full "
          style={{
            background: `
            repeating-linear-gradient(
                transparent,
                transparent 50%,
                #9198e5 50%,
                #9198e5 100%
                )
                `,
          }}
        ></div>
      </div>
    </>
  );
};

export default GradientPreview;
