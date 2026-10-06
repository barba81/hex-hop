import { ColorRepository } from "@/features/clipboard-page/service/ColorRepository";
import { ColorService } from "@/features/clipboard-page/service/ColorService";

const colorRepository = new ColorRepository();
export const colorManager = new ColorService(colorRepository);