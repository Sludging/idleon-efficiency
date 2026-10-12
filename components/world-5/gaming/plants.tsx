'use client'

import { Box, CheckBox, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { CircleInformation } from "grommet-icons";
import { useContext, useState } from "react";
import styled from "styled-components";
import type { Gaming } from "../../../data/domain/world-5/gaming";
import { notateNumber, toTime } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import BitsDisplay from "../../bitsDisplay";

const EvolutionCost = styled(Box)<{ $textColor: string }>`
    span { color: ${({ $textColor }) => $textColor}; }
`;

function formatChance(probability: number): string {
    if (probability <= 0) {
        return "No chance";
    }
    if (probability >= 1) {
        return "Guaranteed";
    }

    // Domain probabilities are fractions, not percentage points.
    const denominator = 1 / probability;
    let formattedDenominator = denominator < 1000
        ? denominator.toLocaleString(undefined, { maximumFractionDigits: 6 })
        : notateNumber(denominator, "Smaller");
    if (formattedDenominator === "1") {
        formattedDenominator = denominator.toString();
    }

    return `1 in ${formattedDenominator}`;
}

export function GamingPlants({ gaming }: { gaming: Gaming }) {
    const [hideComplete, setHideComplete] = useState(false);
    const theme = useContext(ThemeContext);
    const { garden, mutations, logbook } = gaming;
    const maximumRecordedStages = logbook.entries.reduce((total, entry) => total + entry.maximumStage, 0);
    const unavailablePlants = logbook.entries.filter(entry => !entry.plant.unlocked);
    const entries = logbook.entries.filter(entry => !hideComplete
        || !entry.plant.unlocked || (entry.highestStage ?? 0) < entry.maximumStage);
    const evolutionAffordable = gaming.bits >= garden.evolutionUpgradeCostBits;

    return (
        <Box gap="medium">
            <Box gap="small">
                <Heading level={3} size="small" margin="none">Garden</Heading>
                <ShadowBox background="dark-1" pad="medium" gap="small">
                    <Box direction="row" wrap gap="large">
                        <TextAndLabel
                            label="Growth cycle"
                            text={toTime(garden.growthCycleSeconds, true)}
                            textSize="small"
                            tooltip="Each growth cycle gives plants a chance to appear or reach the next stage. This is not a countdown for each plant."
                        />
                        <ComponentAndLabel
                            label="Sprout harvest value"
                            component={<BitsDisplay value={garden.harvestBits} />}
                        />
                        <TextAndLabel
                            label="Current capacity"
                            text={`${garden.capacity} plants`}
                            textSize="small"
                        />
                        <TextAndLabel
                            label="Current maximum stage"
                            text={garden.maximumStage.toString()}
                            textSize="small"
                        />
                    </Box>
                    <Text size="xsmall" color="accent-2">
                        Sprout harvest value includes current bonuses and active modes. Other plant types have different harvest effects.
                    </Text>
                </ShadowBox>
            </Box>

            {mutations.discoveredCount < mutations.maximumDiscoveries && (
                <Box gap="small">
                    <Heading level={3} size="small" margin="none">Mutation</Heading>
                    <ShadowBox background="dark-1" pad="medium" gap="small">
                        <Box direction="row" wrap gap="large" align="center">
                            <TextAndLabel
                                label="Discovered plant types"
                                text={`${mutations.discoveredCount} / ${mutations.maximumDiscoveries}`}
                                textSize="small"
                            />
                            <TextAndLabel label="DNA" text={notateNumber(mutations.dna, "Smaller")} textSize="small" />
                            <TextAndLabel
                                label="DNA spent on failed attempts"
                                text={notateNumber(mutations.pityDna, "Smaller")}
                                textSize="small"
                            />
                            {mutations.nextPlant && (
                                <ComponentAndLabel
                                    label="Next plant type"
                                    component={
                                        <Box direction="row" gap="small" align="center">
                                            <IconImage data={mutations.nextPlant.getImageData()} scale={0.4} />
                                            <Text size="small">{mutations.nextPlant.name}</Text>
                                        </Box>
                                    }
                                />
                            )}
                            <TextAndLabel
                                label="Next mutation chance"
                                text={formatChance(mutations.attemptProbability)}
                                textSize="small"
                                tooltip="This is the chance to discover the next plant type in one mutation attempt with the saved DNA. Failed attempts improve later chances."
                            />
                        </Box>
                        <Text size="xsmall" color="accent-2">
                            {mutations.canAttempt ? "Mutation attempt available in the game." : "Mutation attempt unavailable."}
                        </Text>
                    </ShadowBox>
                </Box>
            )}

            <Box gap="small">
                <Heading level={3} size="small" margin="none">Evolution</Heading>
                <ShadowBox background="dark-1" pad="medium" gap="small">
                    <Box direction="row" wrap gap="large">
                        <TextAndLabel label="Upgrade level" text={garden.evolutionUpgradeLevel.toString()} textSize="small" />
                        <TextAndLabel label="Current maximum stage" text={garden.maximumStage.toString()} textSize="small" />
                        <ComponentAndLabel
                            label="Next level cost"
                            component={
                                <EvolutionCost $textColor={normalizeColor(evolutionAffordable ? "green-1" : "text", theme, true)}>
                                    <BitsDisplay value={garden.evolutionUpgradeCostBits} />
                                </EvolutionCost>
                            }
                        />
                    </Box>
                    <Text size="xsmall" color="accent-2">
                        The upgrade improves the chance to reach the next stage. Superbits, Gaming to the MAX in the Jade Emporium, and Zuperbits raise the stage limit.
                    </Text>
                </ShadowBox>
            </Box>

            <Box gap="small">
                <Box direction="row" gap="small" align="center">
                    <IconImage data={logbook.getImageData()} />
                    <Heading level={3} size="small" margin="none">Logbook</Heading>
                </Box>
                <Box direction="row" wrap gap="large" align="center">
                    <TextAndLabel
                        label="Recorded stages"
                        text={`${logbook.totalRecordedStages} / ${maximumRecordedStages}`}
                        textSize="small"
                        tooltip="The Logbook keeps the highest recorded stage for each plant type. All lower stages count toward the total. The maximum uses your current stage limit for every plant type."
                    />
                    <TextAndLabel
                        label="Bits multiplier"
                        text={`${notateNumber(logbook.bitsMultiplier, "MultiplierInfo").replace(/#$/, "")}x`}
                        textSize="small"
                    />
                    <CheckBox
                        label="Hide complete records"
                        checked={hideComplete}
                        onChange={event => setHideComplete(event.target.checked)}
                    />
                </Box>
                <Text size="xsmall" color="accent-2">
                    Stages start at 1. The Logbook records stages reached during garden interactions, not only harvested plants.
                </Text>
                {entries.length === 0 ? (
                    <Text size="small">All plant records are complete within the current stage limit. Turn off Hide complete records to show them.</Text>
                ) : (
                    <Table aria-label="Plant Logbook" style={{ tableLayout: "fixed", width: "100%" }}>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope="col" size="18%"><Text size="small" weight="bold">Plant</Text></TableCell>
                                <TableCell scope="col" size="31%"><Text size="small" weight="bold">Effect</Text></TableCell>
                                <TableCell scope="col" size="13%"><Text size="small" weight="bold">Recorded stages</Text></TableCell>
                                <TableCell scope="col" size="16%"><Text size="small" weight="bold">Missing stages</Text></TableCell>
                                <TableCell scope="col" size="22%">
                                    <Box direction="row" gap="xxsmall" align="center">
                                        <Text size="small" weight="bold">Next-stage chance</Text>
                                        <TipDisplay
                                            heading="Next-stage chance"
                                            maxWidth="250px"
                                            body="Chance per growth cycle for this plant type at the shown stage. It includes current bonuses. A plant at the current maximum cannot reach another stage."
                                        >
                                            <CircleInformation size="small" />
                                        </TipDisplay>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {entries.map(entry => {
                                const recordedStage = entry.highestStage ?? 0;
                                const complete = recordedStage >= entry.maximumStage;
                                const nextStage = recordedStage + 1;
                                const nextChance = garden.evolutionChances.find(chance => chance.plant.speciesId === entry.plant.speciesId
                                    && chance.fromStage === recordedStage && chance.toStage === nextStage);
                                const missingStages = !entry.plant.unlocked
                                    ? "Plant type locked"
                                    : complete ? "Complete" : nextStage === entry.maximumStage
                                        ? `Stage ${nextStage}` : `Stages ${nextStage}–${entry.maximumStage}`;
                                const chanceText = !entry.plant.unlocked
                                    ? "Plant type locked"
                                    : complete ? "Current maximum reached"
                                        : recordedStage === 0 ? "Record stage 1 first"
                                            : `Stage ${recordedStage} → ${nextStage}: ${formatChance(nextChance!.probability)}`;

                                return (
                                    <TableRow
                                        key={entry.plant.speciesId}
                                        aria-label={entry.plant.name}
                                        style={{ opacity: entry.plant.unlocked ? 1 : 0.6 }}
                                    >
                                        <TableCell background="dark-1">
                                            <Box direction="row" gap="small" align="center">
                                                <Box flex={false}>
                                                    <IconImage data={entry.plant.getImageData()} scale={0.5} />
                                                </Box>
                                                <Text size="small">{entry.plant.name}</Text>
                                            </Box>
                                        </TableCell>
                                        <TableCell background="dark-1">
                                            <Text size="xsmall">{entry.plant.getBonusText()?.replace(/\|/g, " ").replace(/₣/g, "Bits") ?? "—"}</Text>
                                        </TableCell>
                                        <TableCell background="dark-1">
                                            <Text size="small">{`${recordedStage} / ${entry.maximumStage}`}</Text>
                                        </TableCell>
                                        <TableCell background="dark-1">
                                            <Text size="small">{missingStages}</Text>
                                        </TableCell>
                                        <TableCell background="dark-1">
                                            <Text size="small">{chanceText}</Text>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </Box>

            {unavailablePlants.length > 0 && (
                <Box gap="small">
                    <Heading level={3} size="small" margin="none">Unavailable discoveries</Heading>
                    <Text size="small">
                        {unavailablePlants.map(entry => entry.plant.name).join(", ")}.
                    </Text>
                    <Text size="xsmall" color="accent-2">
                        Unlock plant types through Mutation. Royale unlocks when you buy King Rat of Olde.
                    </Text>
                </Box>
            )}
        </Box>
    );
}
