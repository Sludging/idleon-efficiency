'use client'

import { Box, Grid, Heading, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { useContext } from "react";
import styled from "styled-components";
import type { Gaming } from "../../../data/domain/world-5/gaming";
import { toTime } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import BitsDisplay from "../../bitsDisplay";

const FertilizerCost = styled(Box)<{ $textColor: string }>`
    span { color: ${({ $textColor }) => $textColor}; }
`;

export function GamingFertilizer({ gaming }: { gaming: Gaming }) {
    const theme = useContext(ThemeContext);

    return (
        <Box gap="small">
            <Heading level={3} size="small" margin="none">Fertilizer</Heading>
            <Grid columns={{ size: "medium", count: "fill" }} gap="medium" fill="horizontal">
                {gaming.fertilizer.map(upgrade => {
                    const affordable = gaming.bits >= upgrade.costBits;

                    return (
                        <ShadowBox key={upgrade.index} background="dark-1" pad="medium" gap="small">
                            <Box direction="row" align="center" gap="small">
                                <IconImage data={upgrade.getImageData()} scale={0.5} />
                                <Box gap="xxsmall">
                                    <Text size="small">{upgrade.name}</Text>
                                    <Text size="xsmall" color="accent-2">Level {upgrade.level}</Text>
                                </Box>
                            </Box>
                            {upgrade.effect.harvestBits !== undefined && (
                                <>
                                    <ComponentAndLabel
                                        label="Base harvest value"
                                        component={<BitsDisplay value={upgrade.effect.harvestBits} />}
                                    />
                                    <Text size="xsmall" color="accent-2">
                                        Sprout value before account bonuses and active modes.
                                    </Text>
                                </>
                            )}
                            {upgrade.effect.growthCycleSeconds !== undefined && (
                                <>
                                    <TextAndLabel
                                        label="Average initial growth time"
                                        text={toTime(upgrade.effect.growthCycleSeconds, true)}
                                        textSize="small"
                                    />
                                    <Text size="xsmall" color="accent-2">
                                        Average time for a plant to appear, with current bonuses and active modes. This is not a countdown.
                                    </Text>
                                </>
                            )}
                            {upgrade.effect.additionalSlots !== undefined && (
                                <>
                                    <TextAndLabel
                                        label="Slots from Fertilizer"
                                        text={`+${upgrade.effect.additionalSlots} plants`}
                                        textSize="small"
                                    />
                                    <TextAndLabel
                                        label="Current capacity"
                                        text={`${gaming.garden.capacity} plants`}
                                        textSize="small"
                                        tooltip="Sprout Capacity and Lava Sprouts from the Gem Shop increase garden capacity. They share the same limit."
                                    />
                                </>
                            )}
                            <ComponentAndLabel
                                label="Next level cost"
                                component={
                                    <FertilizerCost $textColor={normalizeColor(affordable ? "green-1" : "text", theme, true)}>
                                        <BitsDisplay value={upgrade.costBits} />
                                    </FertilizerCost>
                                }
                            />
                        </ShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
}
