export const validateColor = async (color: string) => {
    const state = useColorStore.getState();
    const result = ColorValidator.validateAndConvert(color);

    state.setIsColorValid(result.isValid)
    if (result.isValid) {
        state.setLastValidColor(ColorFormatTranslation.toHex(result.entity));
        state.setFormat(result.format as ColorFormat);
    }
}