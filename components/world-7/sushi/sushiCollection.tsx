import { Box, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { notateNumber, toTime } from "../../../data/utility";
import type { Sushi } from "../../../data/domain/world-7/sushi";
import IconImage from "../../base/IconImage";
import TextAndLabel from "../../base/TextAndLabel";

export function SushiCollection({ sushi }: { sushi: Sushi[] }) {
    const size = useContext(ResponsiveContext);
    const columnCount = size === "small" ? 1 : size === "medium" ? 2 : 3;
    return (
        <Box
            role="list"
            aria-label="Sushi collection"
            width="100%"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                gridAutoRows: "auto",
                gridAutoFlow: "row dense",
                gap: "8px",
                minWidth: 0,
            }}
        >
            {sushi.map((entry) => {
                const experience = entry.getKnowledgeExperience();
                const required = entry.getKnowledgeExperienceRequired();
                const timeToNextLevel = entry.getTimeToNextKnowledgeLevel();
                const currentBonus = entry.getKnowledgeBonusPresentation();
                const nextBonus = entry.getKnowledgeBonusPresentation(entry.getKnowledgeLevel() + 1);

                return (
                    <Box
                        key={entry.index}
                        role="listitem"
                        aria-label={entry.data.name}
                        background="dark-1"
                        pad="small"
                        style={{
                            display: "grid",
                            gridTemplateRows: "subgrid",
                            gridRow: "span 5",
                            opacity: entry.unlocked ? 1 : 0.55,
                            border: "1px solid #30333A",
                            borderRadius: "8px",
                            minWidth: 0,
                        }}
                    >
                        <Box direction="row" align="center" gap="xsmall" style={{ minWidth: 0 }}>
                            <IconImage data={entry.getImageData()} scale={32 / 47} />
                            <Box style={{ minWidth: 0 }}>
                                <Text size="small" weight="bold">{entry.data.name}</Text>
                                <Text size="xsmall" color="#BEC2CC">Knowledge {notateNumber(entry.getKnowledgeLevel(), "Big")}</Text>
                            </Box>
                        </Box>

                        <TextAndLabel
                            label="Unlock"
                            labelSize="xsmall"
                            textSize="xsmall"
                            text={entry.getUnlockBonusText()}
                        />

                        <TextAndLabel
                            label={currentBonus?.label ?? "Bonus"}
                            labelSize="xsmall"
                            textSize="xsmall"
                            text={currentBonus && nextBonus
                                ? `${currentBonus.value} → ${nextBonus.value}`
                                : "—"}
                        />

                        <Box gap="xxsmall" style={{ minWidth: 0 }}>
                            <Box direction="row" justify="between" gap="xsmall" style={{ minWidth: 0 }}>
                                <Text size="xsmall" color="#BEC2CC">Knowledge EXP</Text>
                                <Text size="xsmall">
                                    {notateNumber(experience, "Smaller")} / {notateNumber(required, "Smaller")}
                                </Text>
                            </Box>
                            <progress
                                aria-label={`${entry.data.name} Knowledge EXP progress`}
                                value={experience}
                                max={required}
                                style={{ width: "100%", height: "6px", accentColor: "#FF3E82" }}
                            />
                        </Box>

                        <Box direction="row" justify="between" gap="xsmall" style={{ minWidth: 0 }}>
                            <Box direction="row" gap="xxsmall" style={{ minWidth: 0 }}>
                                <Text size="xsmall" color="#BEC2CC">Passive:</Text>
                                <Text size="xsmall">
                                    {notateNumber(entry.getPassiveKnowledgeExperiencePerDay(), "Smaller")}/day
                                </Text>
                            </Box>
                            <Box direction="row" gap="xxsmall" align="center" style={{ minWidth: 0 }}>
                                <Text size="xsmall" color="#BEC2CC">ETA:</Text>
                                <Text size="xsmall">
                                    {timeToNextLevel === null ? "No passive gain" : toTime(timeToNextLevel)}
                                </Text>
                            </Box>
                        </Box>

                    </Box>
                );
            })}
        </Box>
    );
}
