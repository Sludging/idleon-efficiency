"use client"

import { Box, CheckBox, Text, Select, DataTable, TextInput } from "grommet";
import { useMemo, useState } from "react";
import { PrismaBubbleTesseractUpgrade, Tesseract, TesseractType, TesseractUpgrade } from "../../data/domain/tesseract";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { ImageData } from "../../data/domain/imageData";
import { EfficiencyAnalysis } from "./shared/EfficiencyAnalysis";

interface TesseractTableData {
    name: string;
    tachyonType: string;
    level: number;
    maxLevel: number;
    bonus: string;
    nextCost: number;
    goalCost: number;
    type: string;
    maxed: boolean;
    locked: boolean;
    id: number;
    upgrade: TesseractUpgrade;
}

// Simple tachyon display without tooltip
function TachyonDisplay({ cost, canAfford, tachyonImageData, textSize = "xsmall", showTooltip = false }: {
    cost: number,
    canAfford?: boolean,
    tachyonImageData: ImageData,
    textSize?: string,
    showTooltip?: boolean
}) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={tachyonImageData} scale={0.7} />
            <TipDisplay
                heading="Exact Tachyon Count"
                body={
                    <Text size="small">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                }
                direction={TipDirection.Down}
                visibility={showTooltip ? undefined : 'none'}
            >
                <Text size={textSize} color={canAfford ? "green-1" : undefined}>
                    {nFormatter(cost)}
                </Text>
            </TipDisplay>
        </Box>
    );
}

// Main Tesseract Table View
function TesseractTableView() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const tesseract = theData.get("tesseract") as Tesseract;

    // Filter and sort state
    const [hideLocked, setHideLocked] = useState(true);
    const [hideMaxed, setHideMaxed] = useState(true);
    const [tachyonTypeFilter, setTachyonTypeFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'cost' | 'default'>('cost');
    const [searchText, setSearchText] = useState<string>('');

    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (data: TesseractTableData) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: data.locked ? 0.5 : 1 }}>
                    <IconImage data={data.upgrade.getImageData()} scale={0.4} />
                    <Text size="xsmall">{data.name}</Text>
                </Box>
            )
        },
        {
            property: 'tachyonType',
            header: 'Tachyon',
            render: (data: TesseractTableData) => (
                <Box direction="row" gap="small" align="center" title={data.tachyonType}>
                    <IconImage data={tesseract.getTachyonImageData(data.upgrade.data.x1)} scale={0.6} />
                </Box>
            )
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: TesseractTableData) => (
                <Text size="xsmall">{`${data.level}${data.maxLevel >= 999999 ? '' : `/${data.maxLevel}`}`}</Text>
            )
        },
        {
            property: 'bonus',
            header: 'Bonus',
            render: (data: TesseractTableData) => (
                <Text size="xsmall">{data.bonus}</Text>
            )
        },
        {
            property: 'nextCost',
            header: 'Next Cost',
            render: (data: TesseractTableData) => {
                if (data.upgrade.level >= data.upgrade.data.max_level) {
                    return <Text size="xsmall">-</Text>;
                }

                // For locked upgrades, show unlock requirement
                if (!data.upgrade.unlocked) {
                    return (
                        <TipDisplay
                            heading="Unlock Requirement"
                            body={
                                <Text size="small">Unlock at {data.upgrade.data.unlock_req} total level</Text>
                            }
                            direction={TipDirection.Down}
                        >
                            <Text size="xsmall" color="grey-2">
                                Unlock at {data.upgrade.data.unlock_req}
                            </Text>
                        </TipDisplay>
                    );
                }

                return (
                    <TachyonDisplay
                        cost={data.nextCost}
                        canAfford={tesseract.canAffordUpgrade(data.upgrade)}
                        tachyonImageData={tesseract.getTachyonImageData(data.upgrade.data.x1)}
                    />
                );
            }
        },
        {
            property: 'goalCost',
            header: 'Goal Cost',
            render: (data: TesseractTableData) => {
                if (data.upgrade.level >= data.upgrade.data.max_level) {
                    return <Text size="small">-</Text>;
                }

                // For locked upgrades, show the cost to unlock
                if (!data.upgrade.unlocked) {
                    return (
                        <TipDisplay
                            heading="Cost to Unlock"
                            body={
                                <Text size="small">Cost to reach total level {data.upgrade.data.unlock_req}</Text>
                            }
                            direction={TipDirection.Down}
                        >
                            <Text size="xsmall" color="grey-2">
                                Level {data.upgrade.data.unlock_req}
                            </Text>
                        </TipDisplay>
                    );
                }

                // For unlocked upgrades, show cost to max or 10 levels
                const tooltipText = data.upgrade.data.max_level >= 999999
                    ? "Cost for the next 10 levels"
                    : "Cost to reach maximum level";

                return (
                    <TipDisplay
                        heading={data.upgrade.data.max_level >= 999999 ? "Cost for 10 Levels" : "Cost to Max"}
                        body={
                            <Text size="small">{tooltipText}</Text>
                        }
                        direction={TipDirection.Down}
                    >
                        <TachyonDisplay
                            cost={data.goalCost}
                            canAfford={tesseract.canAffordUpgrade(data.upgrade, data.goalCost)}
                            tachyonImageData={tesseract.getTachyonImageData(data.upgrade.data.x1)}
                        />
                    </TipDisplay>
                );
            }
        }
    ];

    const filteredAndSortedData = useMemo(() => {
        if (!tesseract) return [];

        let data = tesseract.upgrades.map(upgrade => {
            // Calculate goal cost (cost to max or 10 levels for unlocked, unlock requirement for locked)
            const goalCost = !upgrade.unlocked
                ? 0 // Locked upgrades don't have a direct cost, they need level requirements
                : (upgrade.data.max_level >= 999999 ? upgrade.getCostForNextNLevels(tesseract.upgrades, 10) : upgrade.costToMax);

            return {
                name: upgrade.data.name,
                tachyonType: TesseractType[upgrade.data.x1],
                level: upgrade.level,
                maxLevel: upgrade.data.max_level,
                bonus: upgrade.getDescription(),
                nextCost: upgrade.level === upgrade.data.max_level ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                goalCost: upgrade.level === upgrade.data.max_level ? Number.MAX_SAFE_INTEGER : goalCost,
                type: 'Tesseract',
                maxed: upgrade.level >= upgrade.data.max_level,
                locked: !upgrade.unlocked,
                id: upgrade.id,
                upgrade
            };
        });

        // Apply filters
        if (hideLocked) {
            data = data.filter(item => !item.locked);
        }
        if (hideMaxed) {
            data = data.filter(item => !item.maxed);
        }
        if (tachyonTypeFilter !== 'All') {
            data = data.filter(item => item.tachyonType === tachyonTypeFilter);
        }
        if (searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            data = data.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                item.bonus.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        data.sort((a, b) => {
            // Always put locked and maxed items at the bottom
            if ((a.locked || a.maxed) && !(b.locked || b.maxed)) return 1;
            if (!(a.locked || a.maxed) && (b.locked || b.maxed)) return -1;

            if (sortBy === 'default') {
                // Default order by ID
                return a.id - b.id;
            } else {
                // Sort by cost (ascending)
                return a.nextCost - b.nextCost;
            }
        });

        return data;
    }, [tesseract, lastUpdated, hideLocked, hideMaxed, tachyonTypeFilter, sortBy, searchText]);

    // Get unique values for filters
    const uniqueTachyonTypes = useMemo(() => {
        if (!tesseract) return [];
        const tachyonTypes = [...new Set(tesseract.upgrades.map(upgrade => upgrade.data.x1))];
        return tachyonTypes.sort().map(tachyonType => TesseractType[tachyonType]);
    }, [tesseract]);

    return (
        <ShadowBox background="dark-1" pad="medium">
            {/* Custom filters and controls */}
            <Box direction="row" gap="medium" margin={{ bottom: 'medium' }} wrap align="center">
                <CheckBox
                    checked={hideLocked}
                    label="Hide locked"
                    onChange={(event) => setHideLocked(event.target.checked)}
                />
                <CheckBox
                    checked={hideMaxed}
                    label="Hide maxed"
                    onChange={(event) => setHideMaxed(event.target.checked)}
                />

                <Box direction="row" gap="small" align="center">
                    <Text size="small">Tachyon:</Text>
                    <Select
                        value={tachyonTypeFilter}
                        options={['All', ...uniqueTachyonTypes]}
                        onChange={({ option }) => setTachyonTypeFilter(option)}
                    />
                </Box>

                <Box direction="row" gap="small" align="center">
                    <Text size="small">Sort by:</Text>
                    <Select
                        value={sortBy}
                        options={[
                            { label: 'Cost (ascending)', value: 'cost' },
                            { label: 'Default Order', value: 'default' }
                        ]}
                        labelKey="label"
                        valueKey={{ key: 'value', reduce: true }}
                        onChange={({ value }) => setSortBy(value)}
                    />
                </Box>
            </Box>
            <Box>
                <Box direction="row" gap="small" align="center">
                    <Text size="small">Search:</Text>
                    <TextInput
                        placeholder="Search name or bonus..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        size="small"
                        style={{ width: '200px' }}
                    />
                </Box>
            </Box>

            <DataTable
                fill
                columns={columns}
                data={filteredAndSortedData}
            />
        </ShadowBox>
    );
}

export function TesseractDisplay() {
    const [showUnlockPath, setShowUnlockPath] = useState(false);
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const tesseract = theData.get("tesseract") as Tesseract;

    if (!tesseract) {
        return <Text>Loading Tesseract data...</Text>;
    }

    // Calculate summary stats
    const totalUpgrades = tesseract.upgrades.length;
    const unlockedUpgrades = tesseract.upgrades.filter(u => u.unlocked).length;
    const maxedUpgrades = tesseract.upgrades.filter(u => u.level >= u.data.max_level).length;

    const totalLevelLabel = "Total Tesseract Level";
    const availableTachyonsLabel = "Available Tachyons";

    // Prism Bubble Upgrade
    const prismBubbleUpgrade = tesseract.upgrades[3] as PrismaBubbleTesseractUpgrade;

    // Get the next unlock and levels needed
    const nextUnlock = tesseract?.getNextLockedUpgrade();
    const levelsNeeded = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - (tesseract?.totalTesseractLevel || 0)) : 0;

    // Define optimization types for efficiency analysis
    const optimizationTypes = [
        {
            id: 'unlock_path',
            label: 'Unlock Path',
            showCountSelector: false,
            showConsolidation: true
        }
    ];

    // Configuration for value display
    const valueConfigs = {
        unlock_path: {
            valueHeader: '',
            valueColor: 'accent-1',
            formatValue: (value: number) => ``,
            noResultsText: 'No efficient upgrades available'
        }
    };

    // Create efficiency results map
    const efficiencyResults = new Map([
        ['unlock_path', tesseract?.unlockPathInfo || { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} }]
    ]);

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
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Purple] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Purple)} />
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Brown] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Brown)} />
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Green] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Green)} />
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Red] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Red)} />
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Silver] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Silver)} />
                                <TachyonDisplay cost={tesseract?.resources[TesseractType.Gold] || 0} tachyonImageData={tesseract.getTachyonImageData(TesseractType.Gold)} />
                            </Box>
                        }
                    />
                </Box>

                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <CheckBox
                        checked={showUnlockPath}
                        label="Show unlock path"
                        onChange={(event) => setShowUnlockPath(event.target.checked)}
                    />
                </Box>
                <Box margin={{ top: 'medium' }}>
                    <Text size="small">
                        <strong>Note:</strong> Tesseract upgrades are purchased with Tachyons collected while in Arcanist Form using the Arcane Cultist class.
                    </Text>
                </Box>
            </ShadowBox>

            {/* Display the unlock path if enabled */}
            {showUnlockPath && nextUnlock && levelsNeeded > 0 && (
                <EfficiencyAnalysis
                    efficiencyResults={efficiencyResults}
                    optimizationTypes={optimizationTypes}
                    getResourceImageData={(resourceType: number) => tesseract?.getTachyonImageData(resourceType) || { location: "", height: 36, width: 36 }}
                    canAffordResource={(resourceType: number, cost: number) => tesseract?.getResourceCount(resourceType) >= cost || false}
                    valueConfigs={valueConfigs}
                    title="Cheapest Path to Next Upgrade"
                    currentValues={{
                        nextUnlock: {
                            label: "Next Unlock",
                            value: (
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={nextUnlock.getImageData()} scale={0.4} />
                                    <Text size="small">{nextUnlock.getName()}</Text>
                                </Box>
                            )
                        },
                        levelsNeeded: {
                            label: "Levels Needed",
                            value: `${levelsNeeded} more levels to reach ${nextUnlock.getUnlockRequirement?.() ?? 0}`
                        }
                    }}
                />
            )}

            <TesseractTableView />
        </Box>
    )
} 
