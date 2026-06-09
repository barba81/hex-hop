import { getContext } from "../infrastructure/client";

export const addNewGradient = () => {
    try {
        const db = getContext();

    } catch (error) {
        console.error("Error adding gradient:", error);
    }
}