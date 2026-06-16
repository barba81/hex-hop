import { ColorSpace } from "@/features/infrastructure/enum/color-space.enum";
import { GradientTypes } from "@/features/infrastructure/enum/gradient-types.enum";
import { GradientDto, GradientLayerDto, GradientStopsDto } from "./gradient-dto";
import { GradientEntity, GradientLayerEntity, GradientStopEntity } from "@/features/infrastructure/entity/gradient.entity";

const GRADIENT_TYPE_MAP: Record<GradientTypes, number> = {
    "linear": 0,
    "radial": 1,
    "conic":  2
};

const COLOR_SPACE_MAP: Record<ColorSpace, number> = {
    "oklab":       0,
    "oklch":       1,
    "srgb":        2,
    "shorter hue": 3,
    "longer hue":  4
};

const REVERSE_GRADIENT_TYPE_MAP = Object.fromEntries(
    Object.entries(GRADIENT_TYPE_MAP).map(([key, val]) => [val, key as GradientTypes])
);

const REVERSE_COLOR_SPACE_MAP = Object.fromEntries(
    Object.entries(COLOR_SPACE_MAP).map(([key, val]) => [val, key as ColorSpace])
);

const getGradientTypeFromDto = (value: number): GradientTypes => REVERSE_GRADIENT_TYPE_MAP[value] ?? "linear";
const getGradientTypeToDto = (value: GradientTypes): number => GRADIENT_TYPE_MAP[value] ?? 0;

const getColorSpaceFromDto = (value: number): ColorSpace => REVERSE_COLOR_SPACE_MAP[value] ?? "srgb";
const getColorSpaceToDto = (value: ColorSpace): number => COLOR_SPACE_MAP[value] ?? 2;

// ==========================================
// 1. STOPS MAPPER
// ==========================================
export const GradientStopMapper = {
    toDto: (entity: GradientStopEntity): GradientStopsDto => ({
        id: entity.id,
        order: entity.order,
        layerId: entity.layerId,
        r: entity.r,
        g: entity.g,
        b: entity.b,
        a: entity.a,
        position: entity.position,
    }),

    fromDto: (dto: GradientStopsDto): GradientStopEntity => ({
        id: dto.id,
        order: dto.order,
        layerId: dto.layerId,
        r: dto.r,
        g: dto.g,
        b: dto.b,
        a: dto.a,
        position: dto.position,
    })
};

// ==========================================
// 2. LAYER MAPPER
// ==========================================
export const GradientLayerMapper = {
    toDto: (entity: GradientLayerEntity, gradientId: number): GradientLayerDto => ({
        id: entity.id,
        order: entity.order,
        gradientId: gradientId,
        gradientType: getGradientTypeToDto(entity.gradientType),
        rotationDegree: entity.rotationDegree,
        patternRepeatNumber: entity.patternRepeatNumber,
        colorSpace: getColorSpaceToDto(entity.colorSpace),
        easingFunction: entity.easingFunction,
    }),

    fromDto: (dto: GradientLayerDto, stopDtos: GradientStopsDto[] = []): GradientLayerEntity => ({
        id: dto.id,
        order: dto.order,
        gradientType: getGradientTypeFromDto(dto.gradientType),
        rotationDegree: dto.rotationDegree,
        patternRepeatNumber: dto.patternRepeatNumber,
        colorSpace: getColorSpaceFromDto(dto.colorSpace),
        easingFunction: dto.easingFunction,
        stops: stopDtos
            .map(GradientStopMapper.fromDto)
            .sort((a, b) => a.order - b.order)
    })
};

// ==========================================
// 3. GRADIENT MAPPER
// ==========================================
export const GradientMapper = {
    toDto: (entity: GradientEntity): GradientDto => ({
        id: entity.id,
        blockId: entity.blockId,
        order: entity.order,
        paletteId: entity.paletteId ?? 0,
        name: entity.name,
    }),

    fromDto: (
        gradientDto: GradientDto, 
        layerDtos: GradientLayerDto[] = [], 
        allStopDtos: GradientStopsDto[] = []
    ): GradientEntity => {
        
        const layers: GradientLayerEntity[] = layerDtos
            .sort((a, b) => a.order - b.order)
            .map(layerDto => {
                const layerStops = allStopDtos.filter(stop => stop.layerId === layerDto.id);
                return GradientLayerMapper.fromDto(layerDto, layerStops);
            });

        return {
            kind: "gradient",
            id: gradientDto.id,
            blockId: gradientDto.blockId,
            order: gradientDto.order,
            name: gradientDto.name,
            paletteId: gradientDto.paletteId === 0 ? null : gradientDto.paletteId,
            layers: layers
        };
    }
};