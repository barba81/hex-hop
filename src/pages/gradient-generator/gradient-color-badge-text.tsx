
const GradientColorSpaceBadgeText= ({ 
  colorSpace = 'OKLAB' 
}) => {
  return (
    <>
      <div className="font-mono text-xs bg-foreground/30 px-1 p-0.5 rounded-md inline-block">
        {colorSpace.toUpperCase()}
      </div>
    </>
  );
};

export default GradientColorSpaceBadgeText;