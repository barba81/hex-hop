const AddColorButton = () =>{
    return <>
    <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
      ${isValidColor && "bg-green-400/60 hover:bg-green-400/40"} text-gray-900 dark:text-white `}
        onClick={() => addColor(currentColor)}
      >
        <Check strokeWidth={3} size={16} />
      </div>
    </>
}

export default AddColorButton;