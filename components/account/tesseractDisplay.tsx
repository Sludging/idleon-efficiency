"use client"

import { Box, CheckBox, Grid, Text, Tip, Select } from "grommet";
import { useMemo, useState } from "react";
import { PrismaBubbleTesseractUpgrade, Tesseract, TesseractUpgrade } from "../../data/domain/tesseract";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import { CircleInformation, Tooltip } from "grommet-icons";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { ImageData } from "../../data/domain/imageData";
import { UnlockPathDisplay } from "./shared/UnlockPathDisplay";

// Simple tachyon display without tooltip
function TachyonDisplay({ cost, canAfford, tachyonImageData, scale = 0.7 }: { cost: number, canAfford?: boolean, tachyonImageData: ImageData, scale?: number }) {
    return (
        <Box direction="row" gap="small" align="center">
            <IconImage data={tachyonImageData} scale={scale} />
            <TipDisplay
                heading="Exact Tachyon Count"
                body={
                    <Text size="small">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                }
                direction={TipDirection.Down}
            >
                <Text color={canAfford ? "green-1" : undefined}>
                    {nFormatter(cost)}
                </Text>
            </TipDisplay>
        </Box>
    );
}

function UpgradeCostColumns(props: {
    upgrade: TesseractUpgrade,
    tesseract: Tesseract
}) {
    const { upgrade, tesseract } = props;
    const isMaxLevel = upgrade.level >= upgrade.data.max_level;
    const isVeryHighMaxLevel = upgrade.data.max_level >= 999999;

    // If the upgrade is maxed, we don't need to show the cost columns
    if (isMaxLevel) {
        return (
            <Box fill justify="center" align="center">
                <Text size="large" color="status-ok">Maxed</Text>
            </Box>
        )
    }

    // Recalculate costs with current cost reduction factor for accurate display
    const nextLevelCost = upgrade.getCost(tesseract.upgrades);
    const costToMax = upgrade.getCostToMax(tesseract.upgrades);
    const costForNext10Levels = isVeryHighMaxLevel ? upgrade.getCostForNextNLevels(tesseract.upgrades, 10) : 0;

    // Check if player can afford the upgrade
    const canAffordNextLevel = tesseract.canAffordUpgrade(upgrade, nextLevelCost);
    const canAffordCostToMax = tesseract.canAffordUpgrade(upgrade, isVeryHighMaxLevel ? costForNext10Levels : costToMax);

    // Get tachyon type from the upgrade's x1 property
    const tachyonType = upgrade.data.x1;

    // Otherwise, we show the cost and cost to max columns
    return (
        <>
            <ComponentAndLabel
                labelSize="xsmall"
                label="Next level cost"
                component={
                    <TachyonDisplay
                        cost={nextLevelCost}
                        canAfford={canAffordNextLevel}
                        tachyonImageData={tesseract.getTachyonImageData(tachyonType)}
                    />
                }
            />
            <ComponentAndLabel
                labelSize="xsmall"
                label={isVeryHighMaxLevel ? "Cost for 10 levels" : "Cost to max"}
                component={
                    <TachyonDisplay
                        cost={isVeryHighMaxLevel ? costForNext10Levels : costToMax}
                        canAfford={canAffordCostToMax}
                        tachyonImageData={tesseract.getTachyonImageData(tachyonType)}
                    />
                }
            />
        </>
    )
}

export function TesseractDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [hideLocked, setHideLocked] = useState(false);
    const [tachyonTypeFilter, setTachyonTypeFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('default');
    const [showUnlockPath, setShowUnlockPath] = useState(false);
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const tesseract = theData.get("tesseract") as Tesseract;

    // Calculate counts for each tachyon type
    const tachyonTypeCounts = useMemo(() => {
        if (!tesseract) {
            return { all: 0, purple: 0, brown: 0, green: 0, red: 0, silver: 0, gold: 0 };
        }

        const counts = {
            all: tesseract.upgrades.length,
            purple: tesseract.upgrades.filter(u => u.data.x1 === 0).length,
            brown: tesseract.upgrades.filter(u => u.data.x1 === 1).length,
            green: tesseract.upgrades.filter(u => u.data.x1 === 2).length,
            red: tesseract.upgrades.filter(u => u.data.x1 === 3).length,
            silver: tesseract.upgrades.filter(u => u.data.x1 === 4).length,
            gold: tesseract.upgrades.filter(u => u.data.x1 === 5).length
        };

        return counts;
    }, [tesseract]);

    const upgradesToShow = useMemo(() => {
        if (!tesseract) {
            return [];
        }

        let filteredUpgrades = tesseract.upgrades;

        if (hideMaxed) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.level < upgrade.data.max_level
            );
        }

        if (hideLocked) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.unlocked
            );
        }

        if (tachyonTypeFilter !== 'All') {
            const tachyonTypeIndex = parseInt(tachyonTypeFilter);
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.data.x1 === tachyonTypeIndex
            );
        }

        // Apply sorting
        if (sortBy === 'cheapest') {
            // Sort by cost to next level (cheapest first)
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // First sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }

                // If both are locked, maintain original order
                if (!a.unlocked && !b.unlocked) {
                    return a.id - b.id;
                }

                // Handle maxed upgrades (they have cost 0)
                if (a.level >= a.data.max_level) return 1;
                if (b.level >= b.data.max_level) return -1;

                return a.cost - b.cost;
            });
        } else if (sortBy === 'affordable') {
            // Sort by affordability first, then by cost
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // First sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }

                // If both are locked, maintain original order
                if (!a.unlocked && !b.unlocked) {
                    return a.id - b.id;
                }

                // Handle maxed upgrades (they have cost 0)
                if (a.level >= a.data.max_level) return 1;
                if (b.level >= b.data.max_level) return -1;

                const aAffordable = tesseract.canAffordUpgrade(a) ? 1 : 0;
                const bAffordable = tesseract.canAffordUpgrade(b) ? 1 : 0;

                // First sort by affordability (affordable first)
                if (aAffordable !== bAffordable) {
                    return bAffordable - aAffordable;
                }

                // Then sort by cost (cheapest first)
                return a.cost - b.cost;
            });
        } else {
            // Default order, but with locked upgrades at the bottom
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // Sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }
                return a.id - b.id;
            });
        }

        return filteredUpgrades;
    }, [tesseract, hideMaxed, hideLocked, tachyonTypeFilter, sortBy]);

    if (!tesseract) {
        return <Text>Loading Tesseract data...</Text>;
    }

    // Calculate summary stats
    const totalUpgrades = tesseract.upgrades.length;
    const unlockedUpgrades = tesseract.upgrades.filter(u => u.unlocked).length;
    const maxedUpgrades = tesseract.upgrades.filter(u => u.level >= u.data.max_level).length;

    const totalLevelLabel = "Total Tesseract Level";
    const availableTachyonsLabel = "Available Tachyons";

    // Filter options for tachyon types
    const tachyonTypeOptions = [
        { label: `All (${tachyonTypeCounts.all})`, value: 'All' },
        { label: `Purple (${tachyonTypeCounts.purple})`, value: '0' },
        { label: `Brown (${tachyonTypeCounts.brown})`, value: '1' },
        { label: `Green (${tachyonTypeCounts.green})`, value: '2' },
        { label: `Red (${tachyonTypeCounts.red})`, value: '3' },
        { label: `Silver (${tachyonTypeCounts.silver})`, value: '4' },
        { label: `Gold (${tachyonTypeCounts.gold})`, value: '5' },
    ];

    const sortOptions = [
        { label: 'Default Order', value: 'default' },
        { label: 'Cheapest First', value: 'cheapest' },
        { label: 'Affordable First', value: 'affordable' }
    ];

    const renderTachyonOption = (option: any) => {
        return (
            <Box direction="row" gap="small" align="center">
                <Text size="small">{option.label}</Text>
            </Box>
        );
    };

    const renderSortOption = (option: any) => {
        return (
            <Box direction="row" gap="small" align="center">
                <Text size="small">{option.label}</Text>
            </Box>
        );
    };

    // Prism Bubble Upgrade
    const prismBubbleUpgrade = tesseract.upgrades[3] as PrismaBubbleTesseractUpgrade;

    // Calculate unlock path info
    const unlockPathInfo = tesseract.unlockPathInfo || {
        nextUnlock: null,
        pathUpgrades: [],
        levelsNeeded: 0,
        totalCost: 0,
        resourceCosts: [0, 0, 0, 0, 0, 0],
        remainingLevels: 0
    };

    return (
        <Box gap="small">
            <ShadowBox background="dark-2" pad="medium" margin={{ bottom: 'medium' }}>
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel
                        label={totalLevelLabel}
                        component={
                            <Box direction="row" gap="small">
                                <Text size="large">{(tesseract?.totalTesseractLevel || 0).toLocaleString()}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Upgrades"
                        component={
                            <Box direction="row" gap="small">
                                <Text>{unlockedUpgrades} / {totalUpgrades} unlocked</Text>
                                <Text>({maxedUpgrades} maxed)</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Prisma Bubbles Found"
                        component={
                            <Box>
                                <TipDisplay
                                    heading="Prisma Bubble Chance"
                                    body={<Text>{prismBubbleUpgrade.getDescription()}</Text>}
                                    direction={TipDirection.Down}
                                >
                                    <Box direction="row" gap="small" align="center">
                                        <IconImage data={tesseract.getPrismaBubbleImageData()} scale={0.7} />
                                        <Text>{(tesseract?.prismaBubblesFound || 0).toLocaleString()}</Text>
                                    </Box>
                                </TipDisplay>
                            </Box>
                        }
                    />
                </Box>

                {/* Display current tachyon counts */}
                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <ComponentAndLabel
                        label={availableTachyonsLabel}
                        component={
                            <Box direction="row" gap="medium" wrap>
                                <TachyonDisplay cost={tesseract?.purpleTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(0)} />
                                <TachyonDisplay cost={tesseract?.brownTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(1)} />
                                <TachyonDisplay cost={tesseract?.greenTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(2)} />
                                <TachyonDisplay cost={tesseract?.redTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(3)} />
                                <TachyonDisplay cost={tesseract?.silverTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(4)} />
                                <TachyonDisplay cost={tesseract?.goldTachyons || 0} tachyonImageData={tesseract.getTachyonImageData(5)} />
                            </Box>
                        }
                    />
                </Box>

                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <CheckBox
                        checked={hideMaxed}
                        label="Hide maxed upgrades"
                        onChange={(event) => setHideMaxed(event.target.checked)}
                    />
                    <CheckBox
                        checked={hideLocked}
                        label="Hide locked upgrades"
                        onChange={(event) => setHideLocked(event.target.checked)}
                    />
                    <CheckBox
                        checked={showUnlockPath}
                        label="Show unlock path"
                        onChange={(event) => setShowUnlockPath(event.target.checked)}
                    />
                    <Box direction="row" align="center" gap="small">
                        <Select
                            placeholder="Filter by Tachyon Type"
                            value={tachyonTypeFilter}
                            options={tachyonTypeOptions}
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setTachyonTypeFilter(value)}
                        >
                            {renderTachyonOption}
                        </Select>
                    </Box>
                    <Box direction="row" align="center" gap="small">
                        <Select
                            placeholder="Sort by"
                            value={sortBy}
                            options={sortOptions}
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setSortBy(value)}
                        >
                            {renderSortOption}
                        </Select>
                        <TipDisplay
                            heading="Sorting Options"
                            body={
                                <Box>
                                    <Text size="small">• Default Order: Original game order</Text>
                                    <Text size="small">• Cheapest First: Sorts by lowest cost to next level</Text>
                                    <Text size="small">• Affordable First: Shows upgrades you can afford first</Text>
                                </Box>
                            }
                            direction={TipDirection.Down}
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                </Box>
                <Box margin={{ top: 'medium' }}>
                    <Text size="small">
                        <strong>Note:</strong> Tesseract upgrades are purchased with Tachyons collected while in Arcanist Form using the Arcane Cultist class.
                    </Text>
                </Box>
            </ShadowBox>

            {/* Display the unlock path if enabled */}
            <UnlockPathDisplay
                unlockPathInfo={unlockPathInfo}
                resourceName="Tachyons"
                getResourceImageData={(resourceType) => tesseract.getTachyonImageData(resourceType)}
                showUnlockPath={showUnlockPath}
                title="Cheapest Path to Next Upgrade"
                targetLabel="Next Unlock"
            />

            {upgradesToShow.length === 0 && (
                <ShadowBox background="dark-1" pad="medium" align="center">
                    <Text>No upgrades to display with current filters</Text>
                </ShadowBox>
            )}

            {upgradesToShow.map((upgrade, index) => {
                const isLocked = !upgrade.unlocked;
                return (
                    <ShadowBox
                        style={{ opacity: isLocked ? 0.6 : 1 }}
                        key={index}
                        background={isLocked ? "dark-3" : "dark-1"}
                        pad="small"
                        direction="row"
                        align="center"
                        justify="between"
                        margin={{ bottom: 'xxsmall' }}
                    >
                        <Grid columns={["25%", "30%", "10%", "15%", "15%"]} gap="small" align="center" fill>
                            <ComponentAndLabel
                                labelSize="xsmall"
                                label="Name"
                                component={
                                    <Box direction="row" gap="small" align="center">
                                        <IconImage data={upgrade.getImageData()} scale={0.7} />
                                        <Text size="xsmall">{upgrade.data.name}</Text>
                                    </Box>
                                }
                            />
                            <TextAndLabel
                                labelSize="xsmall"
                                textSize='xsmall'
                                text={upgrade.getDescription()}
                                label="Bonus"
                            />
                            <TextAndLabel
                                labelSize="xsmall"
                                textSize='small'
                                text={`${upgrade.level} / ${upgrade.data.max_level}`}
                                label="Level"
                            />
                            {upgrade.unlocked && <UpgradeCostColumns upgrade={upgrade} tesseract={tesseract} />}
                            {!upgrade.unlocked && (
                                <Box fill>
                                    <TextAndLabel
                                        labelSize="xsmall"
                                        textSize='xsmall'
                                        text={`Unlock at ${upgrade.data.unlock_req} total level (${upgrade.data.unlock_req - tesseract.totalTesseractLevel} more)`}
                                        label="Locked"
                                    />
                                </Box>
                            )}
                        </Grid>
                    </ShadowBox>
                )
            })}
        </Box>
    )
} 
