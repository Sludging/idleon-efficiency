"use client";

import { Box, Grid, Text } from "grommet";
import IconImage from "../../../components/base/IconImage";
import TipDisplay from "../../../components/base/TipDisplay";
import type {
    Cooking as CookingDomain,
    CookingMastery,
    CookingMasteryExperienceBreakdown,
    CookingMasteryPointPool,
    CookingMasteryUpgrade,
} from "../../../data/domain/world-4/cooking";
import { commaNotation, notateNumber, toTime } from "../../../data/utility";

const amount = (value: number) => notateNumber(value, "Smaller");
const signedPercent = (value: number) => `${value >= 0 ? "+" : ""}${amount(value)}%`;
const sourceNames: Record<
    CookingMasteryExperienceBreakdown["factors"][number]["source"]
    | CookingMasteryExperienceBreakdown["additiveBonuses"][number]["source"],
    string
> = {
    salty: "Cooking Mastery: Salty",
    spicy: "Cooking Mastery: Spicy",
    sweet: "Cooking Mastery: Sweet",
    menagerie: "Menagerie: Cooking Mastery EXP",
    sour: "Cooking Mastery: Sour",
    research: "Research: Masterius Cookerius",
    superbit: "Gaming Superbit: Cooking Master",
    savory: "Cooking Mastery: Savory",
    companion: "Companion: Rift Spooker",
    fountain: "The Hole Fountain: Cook Maxxing",
    vial: "Alchemy vial: Canteen Read",
    arcade: "Arcade: Cooking Mastery EXP",
    saltLick: "Salt Lick: Cooking Mastery EXP",
};

function MasteryExperienceSources({ mastery }: { mastery: CookingMastery }) {
    const breakdown = mastery.experienceBreakdown;

    return <Box gap="small" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
        <Box gap="xxsmall">
            <Text size="xsmall" weight="bold">Base</Text>
            <Text size="xsmall">{amount(breakdown.base)} EXP / hour</Text>
        </Box>
        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="medium">
            <Box gap="xsmall">
                <Text size="xsmall" weight="bold">Multipliers</Text>
                <Box gap="xxsmall">
                    {breakdown.factors.map(factor => <Text key={factor.source} size="xsmall" style={{ opacity: factor.active ? 1 : 0.6 }}>
                        {sourceNames[factor.source]}: ×{amount(factor.multiplier)}
                        {!factor.active && " — Inactive"}
                    </Text>)}
                </Box>
            </Box>
            <Box gap="xsmall">
                <Text size="xsmall" weight="bold">Additive bonuses</Text>
                <Box gap="xxsmall">
                    {breakdown.additiveBonuses.map(bonus => <Text key={bonus.source} size="xsmall" style={{ opacity: bonus.active ? 1 : 0.6 }}>
                        {sourceNames[bonus.source]}: {signedPercent(bonus.percent)}{!bonus.active && " — Inactive"}
                    </Text>)}
                    <Text size="xsmall">Combined: {signedPercent(breakdown.additivePercent)} (×{amount(breakdown.additiveMultiplier)})</Text>
                </Box>
            </Box>
        </Grid>
    </Box>;
}

function MasteryExperienceValue({ mastery }: { mastery: CookingMastery }) {
    if (!mastery.unlocked) {
        return <Text size="large" weight="normal">Locked</Text>;
    }

    return <TipDisplay heading="Cooking Mastery EXP" body={<MasteryExperienceSources mastery={mastery} />} maxWidth="620px" size="small">
        <Text
            tabIndex={0}
            size="large"
            weight="normal"
            style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}
        >
            {amount(mastery.getExperienceRate())} / hour
        </Text>
    </TipDisplay>;
}

function MasteryPointValue({ mastery, kind, pool }: {
    mastery: CookingMastery;
    kind: "purple" | "yellow";
    pool: CookingMasteryPointPool;
}) {
    return <Box gap="small">
        <Box direction="row" align="center" gap="xsmall" height="34px">
            <IconImage data={mastery.getPointImageData(kind)} />
            <Text size="small">{kind === "purple" ? "Purple points" : "Yellow points"}</Text>
        </Box>
        <Box gap="xxsmall">
            <Text size="large" weight="normal">{commaNotation(pool.available)} / {commaNotation(pool.total)}</Text>
            <Text size="xsmall" color="accent-2">Available / total</Text>
        </Box>
    </Box>;
}

export function CookingMasterySummary({ mastery }: { mastery: CookingMastery }) {
    const timeToNextLevel = mastery.getTimeToNextLevelSeconds();

    return <Box direction="row" flex={false} wrap gap="medium" style={{ fontVariantNumeric: "tabular-nums", minWidth: 0, maxWidth: "100%" }}>
        <Box gap="small" style={{ minWidth: 0 }}>
            <Box direction="row" align="center" gap="xsmall" height="34px">
                <IconImage data={mastery.getImageData()} />
                <Text size="small">Cooking Mastery</Text>
            </Box>
            <Box direction="row" wrap gap="medium" style={{ alignItems: "baseline" }}>
                <Box gap="xxsmall">
                    <Text size="xxlarge" weight="normal">{commaNotation(mastery.getLevel())}</Text>
                    <Text size="xsmall" color="accent-2">Mastery level</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="large" weight="normal">{amount(mastery.experience)} / {amount(mastery.getExperienceRequired())}</Text>
                    <Text size="xsmall" color="accent-2">EXP / required for next level</Text>
                </Box>
                <Box gap="xxsmall">
                    <MasteryExperienceValue mastery={mastery} />
                    <Text size="xsmall" color="accent-2">EXP rate</Text>
                </Box>
            </Box>
            <Text size="xsmall" color="accent-2">
                {mastery.unlocked
                    ? `Next level: ${timeToNextLevel === null ? "—" : toTime(timeToNextLevel).replace("days", "d").replace("hour", "h").replace("min", "m").replace("sec", "s").trim()}`
                    : "Unlock through the Rift or the Rift Spooker companion."}
            </Text>
        </Box>
        <Box direction="row" wrap gap="medium" pad={{ left: "medium" }} border={{ side: "left", color: "grey-1" }}>
            <MasteryPointValue mastery={mastery} kind="purple" pool={mastery.purplePoints} />
            <MasteryPointValue mastery={mastery} kind="yellow" pool={mastery.yellowPoints} />
        </Box>
    </Box>;
}

function UpgradeContext({ upgrade }: { upgrade: CookingMasteryUpgrade }) {
    const context = upgrade.context;
    const coefficient = signedPercent(upgrade.getBonus());

    switch (upgrade.index) {
        case 0:
            return <>
                <Text size="xsmall" color="accent-2">Total ladles used: {amount(context.totalLadles)}</Text>
                <Text size="xsmall" color="accent-2">{coefficient} EXP per power of 10 ladles used.</Text>
            </>;
        case 1:
            return <>
                <Text size="xsmall" color="accent-2">Total Cooking levels: {commaNotation(context.totalCookingLevels)}</Text>
                <Text size="xsmall" color="accent-2">{coefficient} EXP per Cooking level above 1,000.</Text>
            </>;
        case 2:
            return <>
                <Text size="xsmall" color="accent-2">Divorce Cake level: {commaNotation(context.divorceCakeLevel)}</Text>
                <Text size="xsmall" color="accent-2">{coefficient} EXP per Divorce Cake level above 75.</Text>
            </>;
        case 3:
            return <Text size="xsmall" color="accent-2">Applies to daily ribbon ranks. Each full 100% guarantees one additional rank.</Text>;
        case 4:
            return <>
                <Text size="xsmall" color="accent-2">Total ribbon ranks: {commaNotation(context.totalRibbonRanks)}</Text>
                <Text size="xsmall" color="accent-2">{coefficient} EXP per ribbon rank.</Text>
            </>;
        case 5:
            return <>
                <Text size="xsmall" color="accent-2">Mastery rank: {commaNotation(context.nativeRank)}</Text>
                <Text size="xsmall" color="accent-2">{coefficient} EXP per Mastery rank.</Text>
            </>;
    }
}

export default function CookingMasteryPanel({ cooking }: { cooking: CookingDomain }) {
    const mastery = cooking.mastery;

    return <Box gap="medium" margin={{ top: "medium" }} style={{ fontVariantNumeric: "tabular-nums" }}>
        <Grid columns={{ count: "fit", size: "medium" }} gap="medium">
            {mastery.upgrades.map(upgrade => {
                const locked = !mastery.unlocked || !upgrade.unlocked;

                return <Box key={upgrade.index} background="dark-1" pad="medium" gap="small">
                    <Box direction="row" align="center" gap="small">
                        <IconImage data={upgrade.getImageData()} style={{ opacity: locked ? 0.6 : 1 }} />
                        <Box gap="xxsmall">
                            <Text size="small">{upgrade.data.name.charAt(0) + upgrade.data.name.slice(1).toLowerCase()}</Text>
                            <Text size="xsmall" color="accent-2">Level {commaNotation(upgrade.level)}</Text>
                        </Box>
                    </Box>
                    {locked && <Text size="xsmall" color="accent-2">
                        {!mastery.unlocked
                            ? "Requires Cooking Mastery."
                            : `Requires Mastery level ${commaNotation(upgrade.data.requiredMasteryLevel)}.`}
                    </Text>}
                    <Box gap="xxsmall">
                        <Text size="large" weight="normal">{signedPercent(upgrade.getContextualBonus())}</Text>
                        <Text size="xsmall" color="accent-2">
                            {upgrade.index === 3 ? "Additional-rank chance" : "Mastery EXP bonus"}
                        </Text>
                    </Box>
                    <Box gap="xxsmall"><UpgradeContext upgrade={upgrade} /></Box>
                </Box>;
            })}
        </Grid>
    </Box>;
}
