const ColorFormulaTitle = () => {
    return (
        <div className="w-full h-10  border-b-2 border-black">
        </div>
    );
};

const ColorFormulaInputList = () => {
    return (
        <div className=" h-full w-[30%] border-l-2 border-black">
        </div>
    );
};

const ColorFormula = () => {
    return (
        <div className=" h-full w-[70%]">
        </div>
    );
};

export const ColorFormulaCreator = () => {
    return (
        <div className="flex flex-col flex-1  rounded-md overflow-hidden border border-black">
            
            <ColorFormulaTitle />

            <div className="flex flex-1 min-h-0">
                <ColorFormula />
                <ColorFormulaInputList />
            </div>

        </div>
    );
};