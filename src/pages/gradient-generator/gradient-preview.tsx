import "@/style/EmptyCheckerBoard.css";

const GradientPreview = () => {
  return (
    <>
      <div className="bg-checkerboard   h-30 rounded-md w-full  overflow-hidden outline-3">
        <div
          className="  h-full w-full "
          style={{
            background: `
            linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)
                `,
          }}
        ></div>
      </div>
    </>
  );
};

export default GradientPreview;
