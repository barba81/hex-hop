import { buttonStyle } from "./ColorPicker";

const PipetButton = () => {
    return <>
     {/* Pipet button */}
      <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
        dark:bg-foreground/10
        bg-stone-200
        hover:bg-foreground/25
          text-gray-900 dark:text-white `}
        onClick={() => {
          handlePickColor();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </div>
    </>
}

export default PipetButton;