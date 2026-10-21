import { Box, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { useContext } from "react";
import { notateNumber, toTime } from "../../../data/utility";
import type { Sushi } from "../../../data/domain/world-7/sushi";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";

export function SushiCollection({ sushi }: { sushi: Sushi[] }) {
    const theme = useContext(ThemeContext);

    return (
        <Box
            role="list"
            aria-label="Sushi collection"
            width="100%"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gridAutoRows: "auto",
                gap: "24px",
                minWidth: 0,
            }}
        >
            {sushi.map((entry) => {
                const experience = entry.getKnowledgeExperience();
                const required = entry.getKnowledgeExperienceRequired();
                const timeToNextLevel = entry.getTimeToNextKnowledgeLevel();
                const currentBonus = entry.getKnowledgeBonusPresentation();
                const nextBonus = entry.getKnowledgeBonusPresentation(entry.getKnowledgeLevel() + 1);
                const isReadyToLevel = experience >= required;

                return (
                    <RoundedShadowBox
                        key={entry.index}
                        role="listitem"
                        aria-label={entry.data.name}
                        background="dark-1"
                        pad="medium"
                        gap="small"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            opacity: entry.unlocked ? 1 : 0.55,
                        }}
                    >
                        <Box direction="row" justify="between" align="start" gap="small" style={{ minWidth: 0 }}>
                            <Box direction="row" align="center" gap="small" style={{ flex: 1, minWidth: 0 }}>
                                <IconImage data={entry.getImageData()} scale={32 / 47} />
                                <Box style={{ minWidth: 0 }}>
                                    <Text size="medium" weight="bold">{entry.data.name}</Text>
                                    <Text size="xsmall" color="accent-2">
                                        Knowledge {notateNumber(entry.getKnowledgeLevel(), "Big")}
                                    </Text>
                                </Box>
                            </Box>
                            <Text
                                size="xsmall"
                                color={isReadyToLevel ? "status-ok" : "accent-2"}
                                textAlign="end"
                                style={{ maxWidth: "42%", flexShrink: 0, overflowWrap: "anywhere" }}
                            >
                                {isReadyToLevel
                                    ? "Ready to level"
                                    : timeToNextLevel === null
                                        ? "No passive gain"
                                        : toTime(timeToNextLevel)}
                            </Text>
                        </Box>

                        <Box gap="xxsmall" style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xsmall" color="accent-2">Unlock</Text>
                            <Text size="small">{entry.getUnlockBonusText()}</Text>
                        </Box>

                        <Box
                            direction="row"
                            justify="between"
                            align="center"
                            gap="small"
                            pad="small"
                            background="dark-3"
                            round="xsmall"
                            style={{ minWidth: 0 }}
                        >
                            <Text size="xsmall" color="accent-2">{currentBonus?.label ?? "Bonus"}</Text>
                            <Text size="small" textAlign="end">
                                <Text as="span" weight="bold">{currentBonus?.value ?? "—"}</Text>
                                {currentBonus && nextBonus && (
                                    <Text as="span" color="accent-2"> → </Text>
                                )}
                                <Text as="span" color="accent-2">{nextBonus?.value ?? ""}</Text>
                            </Text>
                        </Box>

                        <Box gap="xxsmall" style={{ minWidth: 0 }}>
                            <Box direction="row" justify="between" gap="xsmall" style={{ minWidth: 0 }}>
                                <Text size="xsmall" color="accent-2">Knowledge EXP</Text>
                                <Text size="xsmall">
                                    {notateNumber(experience, "Smaller")} / {notateNumber(required, "Smaller")}
                                </Text>
                            </Box>
                            <progress
                                aria-label={`${entry.data.name} Knowledge EXP progress`}
                                value={experience}
                                max={required}
                                style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }}
                            />
                        </Box>

                        <Box direction="row" justify="between" gap="xsmall" style={{ minWidth: 0 }}>
                            <Text size="xsmall" color="accent-2">Passive</Text>
                            <Text size="xsmall">
                                {notateNumber(entry.getPassiveKnowledgeExperiencePerDay(), "Smaller")} EXP/day
                            </Text>
                        </Box>
                    </RoundedShadowBox>
                );
            })}
        </Box>
    );
}
