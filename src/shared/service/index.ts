import { ColorRepository } from "@/shared/service/ColorRepository";
import { ColorService } from "@/shared/service/ColorService";

const colorRepository = new ColorRepository();
export const colorService = new ColorService(colorRepository);