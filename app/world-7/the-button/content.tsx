"use client";

import { Box, Grid, Heading, Text } from "grommet";
import { useEffect, useState } from "react";
import IconImage from "../../../components/base/IconImage";
import ShadowBox from "../../../components/base/ShadowBox";
import TextAndLabel from "../../../components/base/TextAndLabel";
import { Button as ButtonDomain, UPCOMING_BUTTON_TASK_COUNT } from "../../../data/domain/world-7/button";
import { commaNotation, notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";
import { useShallow } from "zustand/react/shallow";

const getTaskText = (description: string, requiredValue: number): string => {
    const requirement = notateNumber(requiredValue, "Smaller");
    if (description.includes("{")) return description.replace("{", requirement);
    if (/\bx\b/.test(description)) return description.replace(/\bx\b/, requirement);
    if (description.includes("/hr")) return description.replace("/hr", ` ${requirement}/hr`);
    return `${description} ${requirement}`;
};

export default function ButtonContent() {
    const [hydrated, setHydrated] = useState(false);
    const { theData, dataStatus } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })
    ));
    const button = theData.get("button") as ButtonDomain | undefined;

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !button) {
        return <>Loading...</>;
    }

    const nextBonusIndex = button.getNextBonusIndex();
    const upcomingTasks = button.getUpcomingTasks();

    return (
        <Box gap="small">
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Button</Heading>
            <Box direction="row" gap="large" wrap>
                <TextAndLabel
                    label="Total presses"
                    text={commaNotation(button.pressCount)}
                    textSize="small"
                />
                <TextAndLabel
                    label="Bonus multiplier"
                    text={`${notateNumber(button.getBonusMultiplier(), "Smaller")}x`}
                    textSize="small"
                />
            </Box>
            <Box role="region" aria-label="Upcoming Button tasks" gap="small">
                <Heading level="3" size="small" margin="none">Upcoming Button tasks</Heading>
                <Text size="xsmall">Task order is account-wide; character tasks use the character with the most progress.</Text>
                <Grid columns={{ size: "auto", count: UPCOMING_BUTTON_TASK_COUNT }} gap="small">
                    {upcomingTasks.map((task) => (
                        <ShadowBox key={`${task.pressCount}-${task.index}`} background="dark-1" pad="small" gap="xsmall">
                            <Text size="xsmall">Press {commaNotation(task.pressNumber)}</Text>
                            <Text size="small">{getTaskText(task.description, task.requiredValue)}</Text>
                            {task.index === 50 && (
                                <Text size="xsmall">Persistent normal-world power; temporary active delve-elixir effects are excluded.</Text>
                            )}
                            {task.progress.kind === "available" ? (
                                <>
                                    <Text size="small" color={task.progress.isReady ? "green-2" : "status-critical"}>
                                        {notateNumber(task.progress.currentValue, "Smaller")} / {notateNumber(task.requiredValue, "Smaller")}
                                    </Text>
                                    {task.progress.characterName && (
                                        <Text size="xsmall">Best character: {task.progress.characterName}</Text>
                                    )}
                                </>
                            ) : (
                                <Text size="xsmall">Progress unavailable: {task.progress.reason}</Text>
                            )}
                        </ShadowBox>
                    ))}
                </Grid>
            </Box>
            <Box role="region" aria-label="Button bonuses">
                <Heading level="3" size="small" margin="none">Button bonuses</Heading>
                <Grid columns={{ size: "260px", count: "fill" }} gap="small">
                {button.bonuses.map((bonus) => {
                    const isNextBonus = bonus.index === nextBonusIndex;

                    return (
                        <ShadowBox
                            key={bonus.index}
                            background={isNextBonus ? "#29271f" : "#1e2127"}
                            pad="small"
                            gap="small"
                            style={{ border: isNextBonus ? "2px solid #e1b454" : "1px solid #30333a" }}
                        >
                            <Box direction="row" align="center" gap="small" height="64px">
                                <IconImage data={bonus.getImageData()} />
                                <Box gap="xxsmall">
                                    <Text weight={500}>{bonus.data.name}</Text>
                                    {isNextBonus && <Text size="xsmall" weight={500} color="#ffe09a">Next press</Text>}
                                </Box>
                            </Box>
                            <Text size="large" style={{ lineHeight: "32px" }}>{bonus.index === 8 ? "+" : ""}{notateNumber(bonus.getBonus(), "Smaller")}%</Text>
                            <Box direction="row" justify="between" align="center" gap="small" wrap>
                                <Text size="xsmall">{commaNotation(bonus.categoryPresses)} applied presses</Text>
                                <Text size="xsmall">Base bonus: +{notateNumber(bonus.data.bonusPerPress)}% per press</Text>
                            </Box>
                        </ShadowBox>
                    );
                })}
                </Grid>
            </Box>
        </Box>
    );
}
