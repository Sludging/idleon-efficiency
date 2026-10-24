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
    const sparksPerHour = station.getSparksPerHour();
    const nextSparkThresholds = station.getNextSparkThresholds();

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
                            <Text size="xxlarge" weight="normal" style={{ overflowWrap: "anywhere" }}>{station.bucks < 1e8 ? commaNotation(station.bucks) : notateNumber(station.bucks, "Big")}</Text>
                            <Text size="xsmall" color="accent-2">Balance</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text size="large" color="status-ok" weight="normal" style={{ overflowWrap: "anywhere" }}>{bucksPerHour >= 0 ? "+" : ""}{bucksPerHour < 1e8 ? commaNotation(bucksPerHour) : notateNumber(bucksPerHour, "Big")}/hr</Text>
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
                            <Text size="xxlarge" weight="normal" style={{ overflowWrap: "anywhere" }}>{formatAmount(station.fuel)}</Text>
                            <Text size="xsmall" color="accent-2" style={{ overflowWrap: "anywhere" }}>Balance, of {formatAmount(station.getFuelCapacity())} capacity</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text size="large" color="status-warning" weight="normal" style={{ overflowWrap: "anywhere" }}>{fuelPerHour >= 0 ? "+" : ""}{formatAmount(fuelPerHour)}/hr</Text>
                            <Text size="xsmall" color="accent-2">Rate</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Box direction="row" wrap align="baseline" gap="xsmall">
                                <Text size="large" weight="normal" style={{ overflowWrap: "anywhere" }}>{formatAmount(station.fuelOverflow)}</Text>
                                <Text size="small" color="accent-2">{station.getOvertunedBucksFactor().toFixed(2)}x Bucks</Text>
                            </Box>
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Overflow</Text>
                                <TipDisplay heading="Overtuned" body="Overtuned banks Fuel generated above capacity when its upgrade is owned. Stored overflow multiplies Bucks gained."><CircleInformation size="small" /></TipDisplay>
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
                                <TipDisplay heading="Best combo" body={
                                    <Box gap="small">
                                        <Text size="small">The best combo grants a permanent Bucks multiplier.</Text>
                                        <Box direction="row" align="baseline" justify="between" gap="small">
                                            <Text size="small">Current multiplier</Text>
                                            <Text size="small" weight="bold">{station.getComboMultiplier().toFixed(2)}x Bucks</Text>
                                        </Box>
                                    </Box>
                                }><CircleInformation size="small" /></TipDisplay>
                            </Box>
                            <Box align="end" style={{ minWidth: 0 }}>
                                <Text size="large" weight="bold" textAlign="end" style={{ overflowWrap: "anywhere" }}>{formatAmount(station.bestComboScore)}</Text>
                            </Box>
                        </Box>
                        <Box direction="row" align="baseline" justify="between" gap="small">
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Fireplace sparks</Text>
                                <TipDisplay heading="Fireplace sparks" body={
                                    <Box gap="small">
                                        <Text size="small">Each Potassium Fireplace generates 1 Spark per second.</Text>
                                        <Text size="small">Total Sparks multiply all Fireplace bonuses.</Text>
                                        <Box direction="row" align="baseline" justify="between" gap="small">
                                            <Text size="small">Current multiplier</Text>
                                            <Text size="small" weight="bold">{station.getFireplaceSparkFactor().toFixed(2)}x Fireplace effects</Text>
                                        </Box>
                                    </Box>
                                }><CircleInformation size="small" /></TipDisplay>
                            </Box>
                            <Box align="end" style={{ minWidth: 0 }}>
                                <Text size="large" weight="bold" textAlign="end" style={{ overflowWrap: "anywhere" }}>{formatAmount(station.fireplaceSparks)}</Text>
                            </Box>
                        </Box>
                        <Box direction="row" align="baseline" justify="between" gap="small">
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Sparks/hour</Text>
                                <TipDisplay
                                    heading="Next Spark goals"
                                    body={
                                        <Box gap="xxsmall">
                                            <Text size="small">Total Sparks needed for the next three multiplier goals.</Text>
                                            {nextSparkThresholds.map(threshold => (
                                                <Box key={threshold.targetFactor} direction="row" align="baseline" justify="between" gap="small">
                                                    <Text size="xsmall">{threshold.targetFactor.toFixed(2)}x</Text>
                                                    <Text size="xsmall" textAlign="end">{notateNumber(threshold.totalSparksRequired, "Smaller")} total Sparks</Text>
                                                </Box>
                                            ))}
                                        </Box>
                                    }
                                >
                                    <CircleInformation size="small" />
                                </TipDisplay>
                            </Box>
                            <Text size="xsmall" textAlign="end">
                                {formatAmount(sparksPerHour)}{sparksPerHour === 0 ? " · Not generating" : ""}
                            </Text>
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
