import { ColorRepository } from "@/features/color-block/service/ColorRepository";
import { ColorService } from "@/features/color-block/service/ColorService";

const colorRepository = new ColorRepository();
export const colorManager = new ColorService(colorRepository);