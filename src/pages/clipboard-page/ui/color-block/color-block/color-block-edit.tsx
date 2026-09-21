import type { ColorEntity } from "@/infrastructure/models/entity";
import { Check, RefreshCw, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { colorEntityToColor, hexaToRgbaNormalized, toHex8 } from "@/infrastructure/utils/color-format-changer";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { setEditBlock } from "@/pages/clipboard-page/features/clipboard-store-actions";
import { updateColorBlock } from "@/pages/clipboard-page/features/update-block";
import { getSmartColorName } from "@/pages/clipboard-page/features/get-color-name";

type ColorBlockEditParams = {
    colorEntity: ColorEntity
};
type ColorNameInputProps = {
    value: string;
    onChange: (value: string) => void;
    onRefresh: () => Promise<void>;
};

const ColorNameInput = ({
    value,
    onChange,
    onRefresh,
}: ColorNameInputProps) => {
    return (
        <InputGroup className="h-6">
            <InputGroupInput
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-xs"
                placeholder="Color Name"
            />

            <InputGroupAddon align="inline-end">
                <Tooltip>
                    <TooltipTrigger >
                        <Button
                            onClick={onRefresh}
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                        >
                            <RefreshCw />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        Generate name
                    </TooltipContent>
                </Tooltip>
            </InputGroupAddon>
        </InputGroup>
    );
};

type ColorInputChannelProps = {
    channel: string;
    textColor?: string;
    value:  number | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
};

const ColorInputChannel = ({
    channel,
    textColor = "",
    value,
    onChange,
    name,
    ...props
}: ColorInputChannelProps) => {
    const label = channel.toUpperCase();

    return (
        <InputGroup className="h-6 w-19 shrink-0">
            <InputGroupAddon
                align="inline-end"
                className={textColor}
                {...props}
            >
                {channel}
            </InputGroupAddon>

            <InputGroupInput
                type="text"
                name={name}
                value={value?.toFixed(3) ?? ""}
                onChange={onChange}
                placeholder={label}
                className="text-xs transition-colors"
            />
        </InputGroup>
    );
};

type ColorBoxPreviewProps = {
    color: string;
    onChange: (color: string) => void;
};

const ColorBoxPreview = ({
    color,
    onChange,
}: ColorBoxPreviewProps) => {
    const handleColorBox = (newColor: string) => {
        onChange(newColor);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <div className="overflow-hidden bg-checkerboard w-12 h-12 rounded-md">
                    <div
                        className="transition-opacity w-full h-full"
                        style={{
                            backgroundColor: color,
                        }}
                    />
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-3">
                <HexAlphaColorPicker
                    color={color}
                    onChange={handleColorBox}
                />
            </PopoverContent>
        </Popover>
    );
};


const ColorBlockEdit = ({ colorEntity }: ColorBlockEditParams) => {
    const [colorUpdateEntity, setColorUpdateEntity] = useState(
        () => ({ ...colorEntity })
    );

    useEffect(() => {
        setColorUpdateEntity({ ...colorEntity });
    }, [colorEntity]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let parsedValue: string | number | null = value;

        if (["r", "g", "b"].includes(name)) {
            const num = parseFloat(value);

            const clamped = isNaN(num)
                ? null
                : Math.min(255, Math.max(0, num)) / 255;

            parsedValue = clamped;
        } else if (name === "a") {
            const num = parseFloat(value);
            parsedValue = isNaN(num) ? null : num;
        }

        setColorUpdateEntity((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleRefreshName = async () => {
        const newName = await getSmartColorName(
            colorEntityToColor(colorUpdateEntity)
        );

        setColorUpdateEntity((prev) => ({
            ...prev,
            name: newName,
        }));
    };

    const handleColorBox = (newColor: string) => {
        const color = hexaToRgbaNormalized(newColor);

        setColorUpdateEntity((prev) => ({
            ...prev,
            ...color,
        }));
    };

    const handleEdit = async () => {
        await updateColorBlock(
            {
                ...colorEntity,
                ...colorUpdateEntity,
            },
            colorEntity
        );

        setEditBlock(null);
    };

    return (
        <div className="h-15 p-2 gap-2 shrink-0 rounded-md relative flex flex-row items-center outline-1 overflow-hidden bg-background">

            <ColorBoxPreview
                color={toHex8(colorUpdateEntity)}
                onChange={handleColorBox}
            />

            <div className="flex flex-col gap-1">

                <div className="flex-1 flex justify-between items-top gap-1">
                    <div className="flex gap-1">

                        <ColorInputChannel
                            channel="R"
                            textColor="text-red-400"
                            name="r"
                            value={colorUpdateEntity.r}
                            onChange={handleChange}
                        />

                        <ColorInputChannel
                            channel="G"
                            textColor="text-green-400"
                            name="g"
                            value={colorUpdateEntity.g}
                            onChange={handleChange}
                        />

                        <ColorInputChannel
                            channel="B"
                            textColor="text-blue-400"
                            name="b"
                            value={colorUpdateEntity.b}
                            onChange={handleChange}
                        />

                    </div>

                    <Button
                        variant="destructive"
                        size="icon-xs"
                        onClick={() => setEditBlock(null)}
                    >
                        <X />
                    </Button>
                </div>

                <div className="flex items-center justify-end gap-1">

                    <ColorInputChannel
                        channel="A"
                        name="a"
                        value={colorUpdateEntity.alpha ?? 1}
                        onChange={handleChange}
                    />

                    <ColorNameInput
                        value={colorUpdateEntity.name ?? "Color name"}
                        onChange={(value) =>
                            setColorUpdateEntity((prev) => ({
                                ...prev,
                                name: value,
                            }))
                        }
                        onRefresh={handleRefreshName}
                    />

                    <Button
                        onClick={handleEdit}
                        size="icon-xs"
                        className="bg-green-900"
                    >
                        <Check />
                    </Button>

                </div>
            </div>
        </div>
    );
};
export default ColorBlockEdit;

