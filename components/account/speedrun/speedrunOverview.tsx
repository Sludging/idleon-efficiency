"use client";

import { Box, ResponsiveContext, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useContext } from "react";
import type { Speedrun, SpeedrunRunner } from "../../../data/domain/speedrun";
import { notateNumber, toTime } from "../../../data/utility";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";

export function SpeedrunOverview({ speedrun, runner }: {
    speedrun: Speedrun;
    runner: SpeedrunRunner | undefined;
}) {
    const size = useContext(ResponsiveContext);
    const compact = size === "small";
    const nextPortalTarget = speedrun.highscore + speedrun.portalsToNextStep;
    const equinoxUnmet = !speedrun.equinoxGoalReached && !speedrun.equinoxChallengeComplete;
    const nextTargetReason = equinoxUnmet && nextPortalTarget === speedrun.equinoxGoal
        ? "Family bonus and Equinox" : "Family bonus";
    const futureEquinoxGoal = equinoxUnmet && speedrun.equinoxGoal > nextPortalTarget;

    return (
        <Box direction={compact ? "column" : "row"} wrap={!compact} gap="medium" pad={{ vertical: "small" }}>
            <Box gap="small" flex={false}>
                <Text size="small">Progress</Text>
                <Box direction="row" gap="medium" wrap align="baseline">
                    <Box>
                        <Text size="xxlarge" weight="normal">{notateNumber(speedrun.highscore, "Big")}</Text>
                        <Text size="xsmall" color="accent-2">Current best portals</Text>
                    </Box>
                    <Box>
                        <Text size="large">{notateNumber(nextPortalTarget, "Big")} portals</Text>
                        <Box direction="row" gap="xxsmall" align="center">
                            <Text size="xsmall" color="accent-2">Next target</Text>
                            {futureEquinoxGoal && (
                                <TipDisplay
                                    heading="Future Equinox goal"
                                    body={`Equinox needs a best of ${notateNumber(speedrun.equinoxGoal, "Big")} portals.`}
                                >
                                    <CircleInformation size="small" />
                                </TipDisplay>
                            )}
                        </Box>
                        <Text size="xsmall" color="accent-2">{nextTargetReason}</Text>
                    </Box>
                </Box>
            </Box>
            <Box
                gap="small"
                flex={false}
                pad={compact ? undefined : { left: "medium" }}
                border={compact ? undefined : { side: "left", color: "grey-1" }}
            >
                <Text size="small">Rewards</Text>
                <Box direction="row" gap="medium" wrap align="baseline">
                    {runner ? (
                        <Box>
                            <Text size="xxlarge" weight="normal">{notateNumber(runner.talentPointEntitlement, "Big")}</Text>
                            <Box direction="row" gap="xxsmall" align="center">
                                <Text size="xsmall" color="accent-2">Talent points from best</Text>
                                <TipDisplay
                                    heading="Talent points from best"
                                    body={`Each portal in your best grants ${notateNumber(runner.talentPointsPerPortal, "Big")} talent points. These points are not added again after each run.`}
                                >
                                    <CircleInformation size="small" />
                                </TipDisplay>
                            </Box>
                        </Box>
                    ) : <Text size="small">No eligible character</Text>}
                    <TextAndLabel
                        label="Family multikill per tier"
                        text={`+${notateNumber(speedrun.accountMultikillPerTierBonus, "MultiplierInfo").replace("#", "")}%`}
                        textSize="small"
                        labelSize="xsmall"
                    />
                </Box>
            </Box>
            <Box
                gap="small"
                flex={false}
                pad={compact ? undefined : { left: "medium" }}
                border={compact ? undefined : { side: "left", color: "grey-1" }}
            >
                <Text size="small">Trial</Text>
                {runner ? (
                    <Box>
                        <Text size="large">{runner.trialTalentAvailable ? toTime(runner.durationSeconds, true).trim() : "Talent not learned"}</Text>
                        <Text size="xsmall" color="accent-2">Time budget</Text>
                    </Box>
                ) : <Text size="small">No eligible character</Text>}
            </Box>
        </Box>
    );
}
