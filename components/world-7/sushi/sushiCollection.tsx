import { Box, Select, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { useContext } from "react";
import { notateNumber, toTime } from "../../../data/utility";
import type { SushiStation } from "../../../data/domain/world-7/sushi";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";

export type SushiKnowledgeCategory = "all" | number;

const knowledgeCategories = [
    { value: "all", label: "All" },
    { value: 0, label: "Bucks" },
    { value: 1, label: "Knowledge XP" },
    { value: 2, label: "Cooked tier bonus" },
    { value: 3, label: "Fuel capacity" },
    { value: 4, label: "Fuel generation" },
    { value: 5, label: "Free shaker chance" },
    { value: 6, label: "Cheaper upgrades" },
    { value: 7, label: "Faster Fuel" },
    { value: 8, label: "Plate effects" },
    { value: 9, label: "Fireplace effects" },
    { value: 10, label: "Perfecto chance" },
];

function getSelectedKnowledgeBenefit(station: SushiStation, category: SushiKnowledgeCategory) {
    if (category === "all") return undefined;

    const total = notateNumber(station.getKnowledgeBonusTotal(category), "Smaller");

    switch (category) {
        case 0:
            return {
                label: "Bucks from Knowledge",
                text: `+${total}%`,
                tooltip: "Current Bucks/hour includes all active bonuses and the Sushi on your board.",
                result: { label: "Current Bucks/hour", text: notateNumber(station.getBucksPerHour(), "Big") },
            };
        case 1:
            return {
                label: "Collection Knowledge XP",
                text: `+${total}% · ${notateNumber(station.getKnowledgeExperienceCollectionMultiplier(), "Smaller")}×`,
                tooltip: "This factor applies to collection Knowledge XP. Full XP also depends on upgrades, the slot's fireplace, and the XP source.",
            };
        case 2: {
            const outcome = station.getCookedTierOutcome();
            const tiers = notateNumber(outcome.guaranteedExtraTiers, "Big");
            const chance = notateNumber(outcome.additionalTierChance * 100, "Smaller");

            return {
                label: "Cooked tier bonus",
                text: `${tiers} guaranteed extra ${outcome.guaranteedExtraTiers === 1 ? "tier" : "tiers"} · ${chance}% for one more`,
                tooltip: `Knowledge adds ${total} percentage points. This result also includes the cooked-tier upgrade.`,
            };
        }
        case 3:
            return {
                label: "Fuel capacity",
                text: notateNumber(station.getFuelCapacity(), "Big"),
                tooltip: `Knowledge adds ${total} base Fuel capacity before the other capacity bonuses apply.`,
            };
        case 4:
            return {
                label: "Fuel generation from Knowledge",
                text: `+${total}%`,
                tooltip: "This is the collection's Fuel generation bonus. Current Fuel/hour also includes the other active bonuses.",
                result: { label: "Current Fuel/hour", text: notateNumber(station.getFuelPerHour(), "Big") },
            };
        case 5:
            return {
                label: "Free shaker chance",
                text: `${notateNumber(station.getFreeShakerChance() * 100, "Smaller")}% · 60% cap`,
                tooltip: `Knowledge adds ${total} percentage points. Upgrades and research share the same 60% cap.`,
            };
        case 6:
            return {
                label: "Upgrade cost from Knowledge",
                text: `${notateNumber(station.getKnowledgeUpgradeCostFactor(), "Smaller")}×`,
                tooltip: "This factor multiplies upgrade cost. Actual prices also depend on the upgrade, its level, and other cost bonuses.",
            };
        case 7:
            return {
                label: "Faster Fuel from Knowledge",
                text: `${notateNumber(station.getFasterFuelKnowledgeFactor(), "Smaller")}×`,
                tooltip: "This is the applied Knowledge factor. The current game does not apply Leviathan Roll's Knowledge bonus to Fuel generation.",
                result: { label: "Current Fuel/hour", text: notateNumber(station.getFuelPerHour(), "Big") },
            };
        case 8:
            return {
                label: "Plate effect scale",
                text: `${notateNumber(station.getSlotEffect(99), "Smaller")}×`,
                tooltip: "The result depends on the plate. Hot Plate boosts Bucks; Cold Plate and Milktoast give daily Knowledge XP.",
            };
        case 9:
            return {
                label: "Fireplace effect scale with Sparks",
                text: `${notateNumber(station.getFireplaceEffect(99), "Smaller")}×`,
                tooltip: `Knowledge adds ${total}% to fireplace effects. This scale includes Sparks, but does not increase Potassium Sparks generation.`,
            };
        case 10:
            return {
                label: "Perfecto chance from Knowledge",
                text: `${notateNumber(station.getKnowledgePerfectoChanceMultiplier(), "Smaller")}×`,
                tooltip: "This factor multiplies Perfecto chance. The final probability depends on the Sushi tier.",
            };
    }
}

export function SushiCollection({ station, category, onCategoryChange }: {
    station: SushiStation;
    category: SushiKnowledgeCategory;
    onCategoryChange: (category: SushiKnowledgeCategory) => void;
}) {
    const theme = useContext(ThemeContext);
    const sushi = category === "all"
        ? station.sushi
        : station.sushi.filter(entry => entry.getKnowledgeBonusCategory() === category);
    const knowledgeBenefit = getSelectedKnowledgeBenefit(station, category);

    return (
        <Box gap="small">
            <Box direction="row" wrap align="center" gap="medium">
                <Box direction="row" align="center" gap="small">
                    <Text size="small">Filter by Knowledge bonus</Text>
                    <Select
                        aria-label="Filter by Knowledge bonus"
                        options={knowledgeCategories}
                        value={category}
                        labelKey="label"
                        valueKey={{ key: "value", reduce: true }}
                        onChange={({ value }) => onCategoryChange(value)}
                    />
                </Box>
                {knowledgeBenefit && (
                    <TextAndLabel
                        label={knowledgeBenefit.label}
                        text={knowledgeBenefit.text}
                        textSize="small"
                        labelSize="xsmall"
                        tooltip={knowledgeBenefit.tooltip}
                    />
                )}
                {knowledgeBenefit?.result && (
                    <TextAndLabel
                        label={knowledgeBenefit.result.label}
                        text={knowledgeBenefit.result.text}
                        textSize="small"
                        labelSize="xsmall"
                    />
                )}
            </Box>
            <Text size="xsmall" color="accent-2">
                Unlock rewards are separate from Knowledge bonuses and do not affect this filter.
            </Text>
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
                const categoryID = entry.getKnowledgeBonusCategory();
                const rawInputLabel = categoryID === 3 ? "Capacity input" : categoryID === 7 ? "Fuel contributions" : undefined;
                const currentBonus = rawInputLabel
                    ? { label: rawInputLabel, value: notateNumber(entry.getKnowledgeBonus(), "Smaller") }
                    : entry.getKnowledgeBonusPresentation();
                const nextBonus = rawInputLabel
                    ? { label: rawInputLabel, value: notateNumber(entry.getKnowledgeBonus(entry.getKnowledgeLevel() + 1), "Smaller") }
                    : entry.getKnowledgeBonusPresentation(entry.getKnowledgeLevel() + 1);
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
                            {!entry.unlocked && (
                                <Text size="xsmall" color="accent-2" textAlign="end">
                                    Tier {entry.index + 1}
                                </Text>
                            )}
                        </Box>

                        <Box gap="xxsmall" style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xsmall" color="accent-2">Unlock reward</Text>
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
                            <Text size="xsmall" color="accent-2">{currentBonus?.label ?? "Unknown"}</Text>
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

                        <TipDisplay
                            heading="Next Knowledge level"
                            body={
                                <Box gap="small">
                                    <Box direction="row" align="baseline" justify="between" gap="small">
                                        <Text size="small">Passive EXP/day</Text>
                                        <Text size="small" weight="bold">{notateNumber(entry.getPassiveKnowledgeExperiencePerDay(), "Smaller")}</Text>
                                    </Box>
                                    <Text size="small">Daily gains use the current board, plates, fireplaces, and active bonuses.</Text>
                                    <Text size="small">Daily Knowledge gains must be active.</Text>
                                    <Text size="small">The estimate uses the next daily reset and excludes manual XP gains.</Text>
                                </Box>
                            }
                        >
                            <Box direction="row" justify="between" gap="xsmall" style={{ minWidth: 0 }}>
                                <Text size="xsmall" color="accent-2">Next Knowledge level</Text>
                                <Text size="xsmall" color={isReadyToLevel ? "status-ok" : 'accent-2'} textAlign="end">
                                    {isReadyToLevel
                                        ? "Ready to level"
                                        : timeToNextLevel === null
                                            ? "No passive gain"
                                            : toTime(timeToNextLevel)}
                                </Text>
                            </Box>
                        </TipDisplay>
                    </RoundedShadowBox>
                );
            })}
        </Box>
        </Box>
    );
}
