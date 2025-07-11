"use client"

import { Box, Text } from "grommet";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { ImageData } from "../../../data/domain/imageData";

interface ResourceDisplayProps {
    cost: number;
    canAfford?: boolean;
    resourceImageData: ImageData;
    resourceImageScale?: number;
    textSize?: string;
    showTooltip?: boolean;
    tooltipHeading?: string;
}

export function ResourceDisplay({
    cost,
    canAfford,
    resourceImageData,
    resourceImageScale = 0.7,
    textSize = "xsmall",
    showTooltip = false,
    tooltipHeading = "Exact Resource Count"
}: ResourceDisplayProps) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={resourceImageData} scale={resourceImageScale} />
            <TipDisplay
                heading={tooltipHeading}
                body={
                    <Text size="small">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                }
                direction={TipDirection.Down}
                visibility={showTooltip ? undefined : 'none'}
            >
                <Text size={textSize} color={canAfford ? "green-1" : undefined}>
                    {nFormatter(cost)}
                </Text>
            </TipDisplay>
        </Box>
    );
} 
