import { Box, Text } from "grommet";
import { useState } from "react";
import type { GambitBonus } from "../../../data/domain/world-5/hole/gambit";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import type { Summoning } from "../../../data/domain/world-6/summoning";
import { commaNotation, notateNumber, toTime } from "../../../data/utility";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

type GambitViewProps = {
    hole: Hole;
    summoning: Summoning;
    onOpenStudies: () => void;
};

function rewardName(bonus: GambitBonus): string {
    const name = bonus.data.name
        .replace(/TAP ME/gi, "")
        .replace(/_/g, " ")
        .replace("Wiz Max LV", "Wizard Tower max level")
        .replace("daily particle bubble upg", "daily Particle bubble upgrades")
        .trim();
    if (bonus.index === 0) return "Summoning Doublers";
    if (bonus.index === 1) return "Opals";
    if (bonus.index === 5) return "Summoning Essence Gain";
    if (bonus.index >= 16) return name.replace(/\.{3}.*$/, "");
    if (bonus.data.x1 === 1) return name.replace(/\+?\{%?|\}/g, "").trim();
    return name.replace("{", notateNumber(bonus.data.x0));
}

function rewardValue(bonus: GambitBonus, score: number, preview: boolean): string {
    if (bonus.data.name.includes("}")) {
        const multiplier = preview ? bonus.getMultiplierAtScore(score) : bonus.getMultiplier(score);
        return `${notateNumber(multiplier, "MultiplierInfo").replace("#", "")}×`;
    }

    const value = preview ? bonus.getBonusAtScore(score) : bonus.getBonus(score);
    return bonus.index === 0 ? commaNotation(value) : `+${notateNumber(value)}%`;
}

function rewardDescription(bonus: GambitBonus): string {
    if (bonus.index === 0) return "Double a Summoning upgrade with its star button. Reset Doublers at The Lamp.";
    if (bonus.index === 1) return "Higher point milestones award 1 Opal each.";
    if (bonus.index >= 16) return "Future reward";
    if (bonus.data.description === "no") return "";
    return bonus.data.description
        .replace(/Also, this bonus INCREASES the more Gambit Points you have!/gi, "")
        .replace(/This bonus INCREASES the more Gambit Points you have!/gi, "")
        .replace(/TAP ME/gi, "")
        .replace(/_/g, " ")
        .trim();
}

export default function GambitView({ hole, summoning, onOpenStudies }: GambitViewProps) {
    const [tab, setTab] = useState<"Rewards" | "Times">("Rewards");
    const gambit = hole.gambit;
    const totalScore = gambit.getGambitTotalScore();
    const foundOpals = hole.cavernOpalSources[13].opals;
    const nextOpalScore = gambit.getNextOpalScore(foundOpals);

    return <Box gap="medium">
        <CavernMetricStrip metrics={[
            { label: "Points", value: commaNotation(totalScore) },
            { label: "Points multiplier", value: `${notateNumber(gambit.gambitPointsMulti, "MultiplierInfo").replace("#", "")}×` },
            { label: "Total time", value: toTime(gambit.getGambitTotalTime(), true) },
            {
                label: "Summoning Doublers",
                value: `${commaNotation(summoning.summoningDoublersAvailable)} / ${commaNotation(summoning.summoningDoublersOwned)}`,
            },
            { label: "Opals found", value: commaNotation(foundOpals) },
        ]} />
        <Box gap="small">
            <ContentTabs
                options={[{ value: "Rewards", label: "Rewards" }, { value: "Times", label: "Times" }]}
                value={tab}
                onChange={setTab}
            />
            {tab === "Rewards"
                ? <Box gap="medium">
                    <Text size="small" color="accent-2">At next Opal: {commaNotation(nextOpalScore)} points</Text>
                    <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                        {gambit.bonuses.map(bonus => {
                            const scalingReward = bonus.data.x1 === 1 && bonus.index !== 1;
                            const description = rewardDescription(bonus);
                            const image = bonus.getImageData();
                            const doublerChange = bonus.index === 0
                                ? bonus.getBonusAtScore(nextOpalScore) - bonus.getBonus(totalScore)
                                : 0;

                            return <RoundedShadowBox
                                key={bonus.index}
                                background="dark-1"
                                pad="none"
                                gap="none"
                                overflow="hidden"
                                style={{ opacity: bonus.unlocked ? 1 : 0.6 }}
                            >
                                <Box background="grey-1" pad={{ horizontal: "medium", vertical: "small" }}>
                                    <Box direction="row" align="center" justify="between" gap="small">
                                        <Box direction="row" align="center" gap="small">
                                            {image && <IconImage data={image} scale={Math.min(1, 32 / image.height)} />}
                                            <Text size="small" weight={500}>{rewardName(bonus)}</Text>
                                        </Box>
                                        {!bonus.unlocked && <Text size="xsmall" color="accent-2">
                                            {notateNumber(bonus.getScoreThreshold())} points
                                        </Text>}
                                    </Box>
                                </Box>
                                {(description || scalingReward) && <Box pad="medium" gap="small">
                                    {description && <Text size="xsmall" color={bonus.index >= 16 ? "accent-2" : undefined}>
                                        {description}
                                    </Text>}
                                    {scalingReward && <Box
                                        direction="row"
                                        align="center"
                                        justify="between"
                                        gap="small"
                                        background="dark-3"
                                        pad="small"
                                        round="xsmall"
                                    >
                                        <Text size="xsmall" color="accent-2">
                                            {bonus.index === 0 ? "From Gambit" : "Current → next"}
                                        </Text>
                                        <Box align="end" gap="xxsmall">
                                            <Text size="small">
                                                <Text as="span" weight="bold">{rewardValue(bonus, totalScore, false)}</Text>
                                                <Text as="span" color="accent-2">
                                                    {" → "}{rewardValue(bonus, nextOpalScore, true)}
                                                </Text>
                                            </Text>
                                            {bonus.index === 0 && doublerChange !== 0 && <Text size="xsmall" color="accent-2">
                                                {doublerChange > 0 ? "+" : ""}{commaNotation(doublerChange)} {Math.abs(doublerChange) === 1 ? "Doubler" : "Doublers"}
                                            </Text>}
                                        </Box>
                                    </Box>}
                                </Box>}
                            </RoundedShadowBox>;
                        })}
                    </Box>
                </Box>
                : <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                    {gambit.challenges.map(challenge => {
                        const image = challenge.getImageData();
                        return <RoundedShadowBox key={challenge.index} background="dark-1" pad="medium" gap="small">
                            <Box direction="row" justify="between" align="center" gap="small">
                                <Box direction="row" align="center" gap="small">
                                    {image && <IconImage data={image} scale={0.5} />}
                                    <Text size="small" weight={500}>{challenge.name}</Text>
                                </Box>
                                <Text size="xsmall" color="accent-2">Challenge {challenge.index + 1}</Text>
                            </Box>
                            <TextAndLabel label="Best time" text={challenge.getDisplayTime()} textSize="small" />
                            <Text size="xsmall" color="accent-2">{challenge.description}</Text>
                        </RoundedShadowBox>;
                    })}
                </Box>}
        </Box>
        <CavernStudySummary study={hole.studies[13]} onOpenStudies={onOpenStudies} />
    </Box>;
}
