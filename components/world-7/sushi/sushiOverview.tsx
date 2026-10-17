'use client';

import { Box, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useContext } from "react";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import { commaNotation, notateNumber } from "../../../data/utility";
import type { SushiStation, SushiShaker } from "../../../data/domain/world-7/sushi";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import { sushiBucksImage, sushiFuelBalanceImage, sushiFuelCostImage } from "./sushiImages";

const formatPercent = (value: number): string => `${(value * 100).toLocaleString(undefined, { maximumSignificantDigits: 3 })}%`;
const formatAmount = (value: number): string => notateNumber(value, "Big");
const shakerNames: Record<SushiShaker["kind"], string> = {
    salt: "Salt shaker",
    pepper: "Pepper shaker",
    saffron: "Saffron shaker",
};

const SushiOverview = ({ station }: { station: SushiStation }) => {
    const size = useContext(ResponsiveContext);
    const placedSushi = station.board.flatMap(slot => slot.sushi ? [slot.sushi] : []);
    const saltTiers = placedSushi.map(sushi => sushi.index);
    const pepperTiers = placedSushi.filter(sushi => !sushi.perfected).map(sushi => sushi.index);
    const saltChances = saltTiers.map(tier => station.getSaltTierUpChance(tier));
    const perfectoChances = pepperTiers.map(tier => station.getPerfectoChance(tier));
    const chanceRange = (chances: number[]): string | undefined => {
        if (chances.length === 0) return undefined;
        const low = Math.min(...chances);
        const high = Math.max(...chances);
        return low === high ? formatPercent(low) : `${formatPercent(low)}–${formatPercent(high)}`;
    };
    const shakerFuel = station.getShakerFuelPerUse();
    const bucksPerHour = station.getBucksPerHour();
    const fuelPerHour = station.getFuelPerHour();
    const bonusFuelChance = station.getShakerBonusFuelChance();

    const shakerEffect = (shaker: SushiShaker): { label: string; value: string; tooltip?: string } => {
        switch (shaker.kind) {
            case "salt": {
                const range = chanceRange(saltChances);
                return {
                    label: "Tier-up",
                    value: range ?? "—",
                    tooltip: range ? "Chance range on placed Sushi" : "No placed Sushi for a tier-up chance",
                };
            }
            case "pepper": {
                const range = chanceRange(perfectoChances);
                return {
                    label: "Perfecto",
                    value: range ?? "—",
                    tooltip: range ? "Chance range on eligible placed Sushi" : "No eligible placed Sushi for a Perfecto chance",
                };
            }
            case "saffron":
                return { label: "Bucks/use", value: formatAmount(station.getSaffronBucksPerUse()) };
        }
    };

    return (
        <Box gap="medium">
            <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 34fr)", "minmax(0, 44fr)", "minmax(0, 22fr)"]} pad={{ vertical: "small" }} gap={size === "small" ? "medium" : undefined} fill>
                <Box gap="small" pad={size === "small" ? undefined : { right: "medium" }} style={{ minWidth: 0 }}>
                    <Box direction="row" gap="xsmall" align="center" height="32px">
                        <IconImage data={sushiBucksImage} scale={0.75} />
                        <Text size="small">Bucks</Text>
                    </Box>
                    <Box direction="row" wrap gap="medium" style={{ alignItems: "baseline", minWidth: 0 }}>
                        <Box style={{ minWidth: 0 }}>
                            <Text weight="normal" style={{ fontSize: "40px", lineHeight: "44px", overflowWrap: "anywhere" }}>{station.bucks < 1e8 ? commaNotation(station.bucks) : notateNumber(station.bucks, "Big")}</Text>
                            <Text size="xsmall" color="accent-2">Balance</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text color="status-ok" weight="normal" style={{ fontSize: "22px", lineHeight: "28px", overflowWrap: "anywhere" }}>{bucksPerHour >= 0 ? "+" : ""}{bucksPerHour < 1e8 ? commaNotation(bucksPerHour) : notateNumber(bucksPerHour, "Big")}/hr</Text>
                            <Text size="xsmall" color="accent-2">Rate</Text>
                        </Box>
                    </Box>
                </Box>
                <Box gap="small" pad={size === "small" ? undefined : { horizontal: "medium" }} border={size === "small" ? undefined : { side: "left", color: "grey-1" }} style={{ minWidth: 0 }}>
                    <Box direction="row" gap="xsmall" align="center" height="32px">
                        <IconImage data={sushiFuelBalanceImage} scale={1.5} />
                        <Text size="small">Fuel</Text>
                    </Box>
                    <Box direction="row" wrap gap="medium" style={{ alignItems: "baseline", minWidth: 0 }}>
                        <Box style={{ minWidth: 0 }}>
                            <Text weight="normal" style={{ fontSize: "40px", lineHeight: "44px", overflowWrap: "anywhere" }}>{formatAmount(station.fuel)}</Text>
                            <Text size="xsmall" color="accent-2">Balance, of {formatAmount(station.getFuelCapacity())} capacity</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text color="status-warning" weight="normal" style={{ fontSize: "22px", lineHeight: "28px", overflowWrap: "anywhere" }}>{fuelPerHour >= 0 ? "+" : ""}{formatAmount(fuelPerHour)}/hr</Text>
                            <Text size="xsmall" color="accent-2">Rate</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text weight="normal" style={{ fontSize: "22px", lineHeight: "28px", overflowWrap: "anywhere" }}>{formatAmount(station.fuelOverflow)}</Text>
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Overflow</Text>
                                <TipDisplay heading="Overflow" body="When Fuel is generated at capacity, 1 fuel overflow is gained. Current overflow provides a Bucks multiplier."><CircleInformation size="small" /></TipDisplay>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box gap="small" pad={size === "small" ? undefined : { left: "medium" }} border={size === "small" ? undefined : { side: "left", color: "grey-1" }} style={{ minWidth: 0 }}>
                    <Box justify="center" height="32px">
                        <Text size="small">Other</Text>
                    </Box>
                    <Box gap="xsmall">
                        <Box direction="row" align="baseline" justify="between" gap="small">
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Best combo</Text>
                                <TipDisplay heading="Best combo" body="The best combo grants a permanent Bucks multiplier."><CircleInformation size="small" /></TipDisplay>
                            </Box>
                            <Text weight="bold" textAlign="end" style={{ fontSize: "22px", lineHeight: "28px", overflowWrap: "anywhere", minWidth: 0 }}>{formatAmount(station.bestComboScore)}</Text>
                        </Box>
                        <Box direction="row" align="baseline" justify="between" gap="small">
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Fireplace sparks</Text>
                                <TipDisplay heading="Fireplace sparks" body="Purple Fireplaces generate 1 Fireplace Spark per second; sparks multiply all Fireplace bonuses."><CircleInformation size="small" /></TipDisplay>
                            </Box>
                            <Text weight="bold" textAlign="end" style={{ fontSize: "22px", lineHeight: "28px", overflowWrap: "anywhere", minWidth: 0 }}>{formatAmount(station.fireplaceSparks)}</Text>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            {!station.dailyKnowledgeEnabled && <Text size="xsmall">Daily Knowledge gains are not active.</Text>}

            <Heading level="3" size="small" margin={{ top: "small", bottom: "none" }}>Shakers</Heading>
            <Grid columns={{ size: "auto", count: size === "small" ? 1 : 3 }} gap="medium" fill>
                {station.shakers.map(shaker => {
                    const effect = shakerEffect(shaker);
                    return (
                        <RoundedShadowBox key={shaker.kind} background="dark-1" pad="medium" gap="small" style={{ opacity: shaker.unlocked ? 1 : 0.55 }}>
                            <Box direction="row" wrap gap="small" align="center" justify="between">
                                <Box direction="row" wrap gap="small" align="center" style={{ minWidth: 0 }}>
                                    <IconImage data={station.getShakerImageData(shaker.kind)} scale={0.8} />
                                    <Box gap="xxsmall">
                                        <Text size="small" weight="bold">{shakerNames[shaker.kind]}</Text>
                                        <Text size="xsmall">{formatAmount(shaker.remainingUses)} uses{!shaker.unlocked ? " · Locked" : ""}</Text>
                                    </Box>
                                </Box>
                                <TextAndLabel
                                    label={effect.label}
                                    text={effect.value}
                                    textSize="small"
                                    labelSize="xsmall"
                                    tooltip={effect.tooltip}
                                />
                            </Box>
                            <Box height="1px" background="grey-1" />
                            <Grid columns={{ size: "auto", count: 3 }} gap="small">
                                <TextAndLabel label="Free use" text={formatPercent(station.getFreeShakerChance())} textSize="xsmall" labelSize="xsmall" />
                                <ComponentAndLabel
                                    label="Fuel per use"
                                    labelSize="xsmall"
                                    component={shakerFuel > 0 ? (
                                        <Box direction="row" gap="xxsmall" align="center">
                                            <IconImage data={sushiFuelCostImage} scale={0.75} />
                                            <Text size="xsmall">{formatAmount(shakerFuel)}</Text>
                                        </Box>
                                    ) : <Text size="xsmall">—</Text>}
                                />
                                <TextAndLabel label="Bonus fuel" text={bonusFuelChance > 0 ? formatPercent(bonusFuelChance) : "—"} textSize="xsmall" labelSize="xsmall" />
                            </Grid>
                        </RoundedShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
};


export { SushiOverview };
