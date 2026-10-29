"use client";

import { Box, Text } from "grommet";
import type { Speedrun, SpeedrunRunner } from "../../../data/domain/speedrun";
import { notateNumber } from "../../../data/utility";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";

const difficultyNames = ["Normal", "Chaotic", "Nightmare"];
const bossNames = ["Amarok", "Efaunt", "Chizoar", "Troll", "Kattlekruk", "Emperor"];

export function SpeedrunBosses({ speedrun, runner }: { speedrun: Speedrun; runner: SpeedrunRunner }) {
    const context = { trialActive: runner.trialTalentAvailable, alreadyAwarded: false };
    const difficultyAwards = difficultyNames.map((name, difficulty) => ({
        name,
        award: speedrun.bosses[0].getAward(runner, context, difficulty),
    }));
    const emperor = speedrun.bosses[5];
    const emperorAward = emperor.getAward(runner, context);
    const emperorImage = emperor.getImageData();
    const awardsAvailable = difficultyAwards.some(({ award }) => award.portalCount > 0);

    return (
        <Box gap="medium">
            <Box gap="small">
                <Text size="small">Each boss awards portals once per run with Void Trial Rerun and Bossing Vain.</Text>
                <Text size="small" color="accent-2">
                    Defeating Normal first uses that boss&apos;s award. Harder difficulties cannot award it again during the same run.
                </Text>
                {!awardsAvailable && <Text size="small">Boss portal awards require Void Trial Rerun and Bossing Vain.</Text>}
            </Box>
            <Box gap="small">
                <Box direction="row" align="center" gap="medium" wrap>
                    {speedrun.bosses.slice(0, 5).map(boss => {
                        const image = boss.getImageData();
                        return (
                            <Box key={boss.index} direction="row" align="center" gap="small">
                                <Box width="48px" height="48px" align="center" justify="center">
                                    <IconImage data={image} scale={48 / Math.max(image.width, image.height)} />
                                </Box>
                                <Text size="small">{bossNames[boss.index]}</Text>
                            </Box>
                        );
                    })}
                </Box>
                {difficultyAwards.map(({ name, award }) => (
                    <DataRow
                        key={name}
                        opacity={awardsAvailable ? 1 : 0.6}
                        columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]}
                        fields={[
                            { key: "difficulty", kind: "text", label: "Difficulty", value: name },
                            { key: "portals", kind: "text", label: "Portals if defeated", value: `+${award.portalCount}` },
                            {
                                key: "respawn",
                                kind: "text",
                                label: "Added monster respawn speed",
                                value: `+${notateNumber(award.respawnSpeedBonusPercent, "MultiplierInfo").replace("#", "")}%`,
                            },
                        ]}
                    />
                ))}
                <Text size="xsmall" color="accent-2">
                    Respawn bonuses add for every awarded portal and last for the rest of the run.
                </Text>
            </Box>
            <DataRow
                opacity={awardsAvailable ? 1 : 0.6}
                columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]}
                fields={[
                    {
                        key: "identity",
                        kind: "identity",
                        name: bossNames[emperor.index],
                        artwork: <IconImage data={emperorImage} scale={48 / Math.max(emperorImage.width, emperorImage.height)} />,
                    },
                    { key: "portals", kind: "text", label: "Portals if defeated", value: `+${emperorAward.portalCount}` },
                    {
                        key: "respawn",
                        kind: "text",
                        label: "Added monster respawn speed",
                        value: `+${notateNumber(emperorAward.respawnSpeedBonusPercent, "MultiplierInfo").replace("#", "")}%`,
                    },
                ]}
                details={[{
                    key: "emperor-difficulty",
                    label: null,
                    content: <Text size="small" color="accent-2">Emperor uses Kattlekruk&apos;s selected difficulty: {difficultyNames[emperor.awardDifficulty]}. Emperor&apos;s own difficulty does not change this award.</Text>,
                }]}
            />
        </Box>
    );
}
