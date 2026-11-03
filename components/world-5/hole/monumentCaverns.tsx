import { useState } from "react";
import { Box, Text } from "grommet";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel from "../../base/TextAndLabel";
import ContentTabs from "../../base/ContentTabs";
import { Item } from "../../../data/domain/items";
import { JusticeMonument, BraveryMonument, type Hole, type Monument, WisdomMonument } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, notateNumber, toTime } from "../../../data/utility";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";
import type { CavernMetric } from "./cavernLayout";

type MonumentCavern = 3 | 9 | 12;
type MonumentTab = "Story" | "Starting upgrades" | "Bonuses";

function formatStoryTime(seconds: number): string {
    return toTime(seconds).replace(/days/g, "d").replace(/hour/g, "h").replace(/min/g, "m").replace(/sec/g, "s").replace(/\s+/g, "");
}

function startingStats(monument: Monument, cavern: MonumentCavern): CavernMetric[] {
    if (cavern === 3) {
        const bravery = monument as BraveryMonument;
        return [
            { label: "Starting damage", value: `${commaNotation(bravery.minimumDamage)} – ${commaNotation(bravery.maximumDamage)}`, image: BraveryMonument.getStartingStatImageData("damage") },
            { label: "Starting swords", value: commaNotation(bravery.swords), image: BraveryMonument.getStartingStatImageData("swords") },
            { label: "Max rethrows", value: commaNotation(bravery.rethrows), image: BraveryMonument.getStartingStatImageData("rethrows") },
            { label: "Max retellings", value: commaNotation(bravery.retellings), image: BraveryMonument.getStartingStatImageData("retellings") },
        ];
    }

    if (cavern === 9) {
        const justice = monument as JusticeMonument;
        return [
            { label: "Starting Mental Health", value: commaNotation(justice.mentalHealth), image: JusticeMonument.getStartingStatImageData("mentalHealth") },
            { label: "Starting Court Coins", value: commaNotation(justice.coins), image: JusticeMonument.getStartingStatImageData("coins") },
            { label: "Starting Popularity", value: commaNotation(justice.popularity), image: JusticeMonument.getStartingStatImageData("popularity") },
            { label: "Starting Dismissals", value: commaNotation(justice.dismissals), image: JusticeMonument.getStartingStatImageData("dismissals") },
        ];
    }

    const wisdom = monument as WisdomMonument;
    return [
        { label: "Starting attempts", value: commaNotation(wisdom.attempts), image: WisdomMonument.getStartingStatImageData("attempts") },
        { label: "Attempts per round", value: commaNotation(wisdom.attemptsPerRound), image: WisdomMonument.getStartingStatImageData("attemptsPerRound") },
        { label: "Seconds per match", value: notateNumber(wisdom.secondsPerMatch, "Smaller") },
        { label: "Starting instant matches", value: commaNotation(wisdom.instantMatches), image: WisdomMonument.getStartingStatImageData("instantMatches") },
    ];
}

function startingUpgradeDescription(description: string, monument: Monument, cavern: MonumentCavern): string {
    if (cavern === 3) {
        const bravery = monument as BraveryMonument;
        return description.replace("{~}", `${commaNotation(bravery.minimumDamage)} – ${commaNotation(bravery.maximumDamage)}`);
    }

    if (cavern === 9) {
        return description.replace("$", commaNotation((monument as JusticeMonument).coins));
    }

    return description.replace("#", commaNotation((monument as WisdomMonument).attempts));
}

export default function MonumentCavernView({ hole, cavern, onOpenStudies }: {
    hole: Hole;
    cavern: MonumentCavern;
    onOpenStudies: () => void;
}) {
    const [tab, setTab] = useState<MonumentTab>("Story");
    const name = cavern === 3 ? "Bravery" : cavern === 9 ? "Justice" : "Wisdom";
    const monument = hole.monuments.monuments[name];
    const study = hole.studies[cavern];
    const nextUpgrade = monument.nextStartingUpgrade;
    const metrics: CavernMetric[] = [
        {
            label: "Next story",
            value: !study.access ? "Locked" : monument.ready ? "Ready" : `About ${toTime(monument.secondsUntilReady).trim()}`,
        },
        { label: "Opal chance", value: `${monument.opalChancePercent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` },
        { label: "Opals found", value: commaNotation(hole.cavernOpalSources[cavern].opals), image: Item.getImageData("Opal") },
    ];
    const rewardMetrics: CavernMetric[] = [
        { label: "Stored story time", value: formatStoryTime(monument.storedAttemptSeconds) },
        { label: "Reward multiplier", value: `${notateNumber(monument.rewardMultiplier, "MultiplierInfo").replace("#", "")}×` },
        { label: "Full-rate rewards", value: formatStoryTime(monument.rewardLinearLimitSeconds) },
    ];

    if (cavern !== 12) {
        rewardMetrics.push({ label: "Permanent bonus levels", value: commaNotation(monument.totalBonusLevels) });
    }

    return <Box gap="medium">
        <CavernMetricStrip metrics={metrics} />
        <Box gap="small">
            <ContentTabs<MonumentTab>
                options={[
                    { value: "Story", label: "Story" },
                    { value: "Starting upgrades", label: "Starting upgrades" },
                    { value: "Bonuses", label: "Bonuses" },
                ]}
                value={tab}
                onChange={setTab}
            />
            {tab === "Story" && <Box gap="medium">
                <Box gap="small">
                    <Text size="medium" weight={500}>{cavern === 9 ? "Starting trial stats" : "Starting story stats"}</Text>
                    <CavernMetricStrip metrics={startingStats(monument, cavern)} />
                </Box>
                <Box gap="small">
                    <Text size="medium" weight={500}>Story rewards</Text>
                    <CavernMetricStrip metrics={rewardMetrics} />
                    <Text size="small" color="accent-2">
                        Waiting increases the bonus levels offered. Rewards keep growing after the full-rate window, but more slowly.
                        {" "}A normal story uses all stored story time.
                    </Text>
                </Box>
            </Box>}
            {tab === "Starting upgrades" && <Box gap="small">
                <TextAndLabel label="Respect hours" text={commaNotation(monument.hours)} textSize="small" labelSize="xsmall" />
                <Text size="small" color="accent-2">
                    Pay respect while AFK to unlock starting upgrades.
                </Text>
                {nextUpgrade && <Text size="small">
                    {nextUpgrade.claimable
                        ? "Remove the next brick in the game."
                        : `${commaNotation(nextUpgrade.hoursRemaining)} more respect ${nextUpgrade.hoursRemaining === 1 ? "hour" : "hours"} for the next brick.`}
                </Text>}
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", minWidth: 0 }}>
                    {monument.unlocks.map(unlock => {
                        const image = unlock.getImageData();
                        const description = startingUpgradeDescription(unlock.data.description, monument, cavern).replace(/_/g, " ");
                        return <RoundedShadowBox key={unlock.index} background="dark-1" pad="medium" gap="small" style={{ opacity: unlock.unlocked ? 1 : 0.6 }}>
                            <Box direction="row" gap="small" align="center">
                                {image && <IconImage data={image} scale={0.5} />}
                                <Text size="small" style={{ overflowWrap: "anywhere", minWidth: 0 }}>{description}</Text>
                            </Box>
                            <Text size="xsmall" color="accent-2">{commaNotation(unlock.data.hours_required)} respect {unlock.data.hours_required === 1 ? "hour" : "hours"}</Text>
                        </RoundedShadowBox>;
                    })}
                </Box>
            </Box>}
            {tab === "Bonuses" && <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", minWidth: 0 }}>
                {monument.bonuses.map(bonus => {
                    const increment = bonus.perLevelIncrement;
                    const cap = bonus.bonusCap;
                    const targetLevel = bonus.capTargetLevel;
                    const progress = bonus.progressPercent;
                    const description = bonus.getDescription().replace(/_/g, " ");
                    const image = bonus.getImageData();
                    return <RoundedShadowBox key={bonus.index} background="dark-1" pad="none" gap="none" overflow="hidden" style={{
                        display: "grid",
                        gridRow: "span 2",
                        gridTemplateRows: "subgrid",
                        rowGap: 0,
                        minWidth: 0,
                        opacity: bonus.level > 0 ? 1 : 0.6,
                    }}>
                        <Box direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: "medium", vertical: "small" }}>
                            <Box direction="row" gap="small" align="center" style={{ flex: "1 1 0", minWidth: 0 }}>
                                {image && (bonus.index === 3
                                    ? <Box width="56px" height="64px" flex={false} style={{ overflow: "hidden" }}>
                                        <IconImage data={image} />
                                    </Box>
                                    : <IconImage data={image} scale={Math.min(0.5, 56 / image.width, 40 / image.height)} style={{ flexShrink: 0 }} />)}
                                <Text size="small" weight={500} style={{ overflowWrap: "anywhere", minWidth: 0 }}>{description}</Text>
                            </Box>
                            <Text size="xsmall" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>Lv. {commaNotation(bonus.level)}</Text>
                        </Box>
                        <Box pad="medium" gap="small">
                            {increment !== null && <TextAndLabel
                                label="Base increase per level"
                                text={`+${notateNumber(increment, "Smaller")}`}
                                textSize="small"
                                labelSize="xsmall"
                            />}
                            {cap !== null && targetLevel !== null && progress !== null && <>
                                <Box direction="row" gap="medium" wrap>
                                    <TextAndLabel label="Bonus increase cap" text={`+${notateNumber(cap, "Smaller")}%`} textSize="small" labelSize="xsmall" />
                                    <TextAndLabel label="Cap target level" text={commaNotation(targetLevel)} textSize="small" labelSize="xsmall" />
                                </Box>
                                <Box gap="xxsmall">
                                    <Text size="xsmall" color="accent-2">{progress.toLocaleString("en-US", { maximumFractionDigits: 2 })}% of bonus cap</Text>
                                    <Box background="grey-1" height="6px" overflow="hidden" role="progressbar" aria-label={`${name} reward ${bonus.index + 1} progress to bonus cap`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                                        <Box background="brand" height="6px" flex={false} style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
                                    </Box>
                                </Box>
                            </>}
                        </Box>
                    </RoundedShadowBox>;
                })}
            </Box>}
        </Box>

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}
