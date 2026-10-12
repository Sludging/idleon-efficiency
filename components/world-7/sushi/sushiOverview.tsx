'use client';

import { Box, Grid, ResponsiveContext, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useContext } from "react";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import { commaNotation, notateNumber } from "../../../data/utility";
import type { SushiStation, SushiShaker } from "../../../data/domain/world-7/sushi";
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
    const bonusFuelChance = station.getShakerBonusFuelChance();
    const groupColumns = { size: "auto" as const, count: size === "small" ? 1 : 3 };
    const shakerColumns = { size: "auto" as const, count: size === "small" ? 1 : 3 };

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
        <Box gap="small">
            <Grid columns={groupColumns} gap="small" fill>
                <MetricGroup title="Bucks">
                    <MetricCard label="Balance" value={station.bucks < 1e8 ? commaNotation(station.bucks) : notateNumber(station.bucks, "Big")} icon={sushiBucksImage} />
                    <MetricCard label="Rate" value={`${bucksPerHour < 1e8 ? commaNotation(bucksPerHour) : notateNumber(bucksPerHour, "Big")}/hr`} icon={sushiBucksImage} />
                </MetricGroup>
                <MetricGroup title="Fuel">
                    <MetricCard label="Balance / capacity" value={`${formatAmount(station.fuel)} / ${formatAmount(station.getFuelCapacity())}`} icon={sushiFuelBalanceImage} />
                    <MetricCard label="Rate" value={`${formatAmount(station.getFuelPerHour())}/hr`} icon={sushiFuelBalanceImage} />
                    <MetricCard label="Overflow" value={formatAmount(station.fuelOverflow)} icon={sushiFuelBalanceImage} tooltip="When Fuel is generated at capacity, 1 fuel overflow is gained. Current overflow provides a Bucks multiplier." />
                </MetricGroup>
                <MetricGroup title="Other">
                    <MetricCard label="Fireplace Sparks" value={formatAmount(station.fireplaceSparks)} tooltip="Purple Fireplaces generate 1 Fireplace Spark per second; sparks multiply all Fireplace bonuses." />
                    <MetricCard label="Best combo" value={formatAmount(station.bestComboScore)} tooltip="The best combo grants a permanent Bucks multiplier." />
                </MetricGroup>
            </Grid>
            {!station.dailyKnowledgeEnabled && <Text size="xsmall">Daily Knowledge gains are not active.</Text>}

            <Grid columns={shakerColumns} gap="small" fill>
                {station.shakers.map(shaker => {
                    const effect = shakerEffect(shaker);
                    return (
                        <ShadowBox
                            key={shaker.kind}
                            background="dark-1"
                            pad="xsmall"
                            gap="xsmall"
                            style={{ opacity: shaker.unlocked ? 1 : 0.55, minWidth: 0 }}
                        >
                            <Box direction="row" wrap gap="small" align="center" justify="between">
                                <Box direction="row" wrap gap="xsmall" align="center" style={{ minWidth: 0 }}>
                                    <Box direction="row" gap="xsmall" align="center" style={{ minWidth: 0 }}>
                                        <IconImage data={station.getShakerImageData(shaker.kind)} scale={0.6} />
                                        <Text size="xsmall">{shakerNames[shaker.kind]}</Text>
                                    </Box>
                                    <Text size="xsmall">{formatAmount(shaker.remainingUses)} uses{!shaker.unlocked ? " · Locked" : ""}</Text>
                                </Box>
                                <TextAndLabel
                                    label={effect.label}
                                    text={effect.value}
                                    textSize="xsmall"
                                    labelSize="xsmall"
                                    tooltip={effect.tooltip}
                                />
                            </Box>
                            <Box direction="row" wrap gap={{ column: "small", row: "xsmall" }}>
                                <Text size="xsmall">Free-use: {formatPercent(station.getFreeShakerChance())}</Text>
                                {shakerFuel > 0 && (
                                    <Box direction="row" gap="xxsmall" align="center">
                                        <IconImage data={sushiFuelCostImage} scale={0.75} />
                                        <Text size="xsmall">Fuel/use: {formatAmount(shakerFuel)}</Text>
                                    </Box>
                                )}
                                {bonusFuelChance > 0 && <Text size="xsmall">Bonus fuel: {formatPercent(bonusFuelChance)}</Text>}
                            </Box>
                        </ShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
};

const MetricGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <ShadowBox background="dark-1" pad="xsmall" gap="xsmall" style={{ minWidth: 0 }}>
        <Text size="xsmall" color="accent-2">{title}</Text>
        <Grid columns={{ size: "auto", count: 2 }} gap="xsmall">
            {children}
        </Grid>
    </ShadowBox>
);

const MetricCard = ({ label, value, icon, tooltip }: { label: string; value: string; icon?: typeof sushiBucksImage; tooltip?: string }) => (
    <ShadowBox background="dark-2" pad="xsmall" gap="xxsmall" style={{ minWidth: 0 }}>
        <ComponentAndLabel
            label={tooltip ? (
                <Box direction="row" gap="xxsmall" align="center">
                    <Text size="xsmall" color="accent-2">{label}</Text>
                    <TipDisplay heading={label} body={tooltip}><CircleInformation size="small" /></TipDisplay>
                </Box>
            ) : (
                <Text size="xsmall" color="accent-2">{label}</Text>
            )}
            component={<Box direction="row" gap="xxsmall" align="center" style={{ minWidth: 0 }}>
                {icon && <IconImage data={icon} scale={icon === sushiFuelBalanceImage ? 1.5 : 0.75} />}
                <Text size="xsmall">{value}</Text>
            </Box>}
        />
    </ShadowBox>
);

export { SushiOverview };
