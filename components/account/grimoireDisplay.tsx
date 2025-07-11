"use client"

import { Box, CheckBox, Text, Select, DataTable, TextInput } from "grommet";
import { useMemo, useState } from "react";
import { BoneType, Grimoire, GrimoireUpgrade } from "../../data/domain/grimoire";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import { CircleInformation } from "grommet-icons";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { ImageData } from "../../data/domain/imageData";
import { EfficiencyAnalysis } from "./shared/EfficiencyAnalysis";

interface GrimoireTableData {
    name: string;
    boneType: string;
    level: number;
    maxLevel: number;
    bonus: string;
    nextCost: number;
    goalCost: number;
    type: string;
    maxed: boolean;
    locked: boolean;
    id: number;
    upgrade: GrimoireUpgrade;
}

// Simple bone display without tooltip
function BoneDisplay({ cost, canAfford, boneImageData, textSize = "xsmall", showTooltip = false }: { 
    cost: number, 
    canAfford?: boolean, 
    boneImageData: ImageData, 
    textSize?: string,
    showTooltip?: boolean 
}) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={boneImageData} scale={0.7} />
            <TipDisplay
                heading="Exact Bone Count"
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

// Main Grimoire Table View
function GrimoireTableView() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const grimoire = theData.get("grimoire") as Grimoire;

    // Filter and sort state
    const [hideLocked, setHideLocked] = useState(true);
    const [hideMaxed, setHideMaxed] = useState(true);
    const [boneTypeFilter, setBoneTypeFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'cost' | 'default'>('cost');
    const [searchText, setSearchText] = useState<string>('');

    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (data: GrimoireTableData) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: data.locked ? 0.5 : 1 }}>
                    <IconImage data={data.upgrade.getImageData()} scale={0.4} />
                    <Text size="xsmall">{data.name}</Text>
                </Box>
            )
        },
        {
            property: 'boneType',
            header: 'Bone',
            render: (data: GrimoireTableData) => (
                <Box direction="row" gap="small" align="center" title={data.boneType}>
                    <IconImage data={grimoire.getBoneImageData(data.upgrade.data.x1)} scale={0.6} />
                </Box>
            )
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: GrimoireTableData) => (
                <Text size="xsmall">{`${data.level}${data.maxLevel >= 999999 ? '' : `/${data.maxLevel}`}`}</Text>
            )
        },
        {
            property: 'bonus',
            header: 'Bonus',
            render: (data: GrimoireTableData) => (
                <Text size="xsmall">{data.bonus}</Text>
            )
        },
        {
            property: 'nextCost',
            header: 'Next Cost',
            render: (data: GrimoireTableData) => {
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
                    <BoneDisplay
                        cost={data.nextCost}
                        canAfford={grimoire.canAffordUpgrade(data.upgrade)}
                        boneImageData={grimoire.getBoneImageData(data.upgrade.data.x1)}
                    />
                );
            }
        },
        {
            property: 'goalCost',
            header: 'Goal Cost',
            render: (data: GrimoireTableData) => {
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
                        <BoneDisplay
                            cost={data.goalCost}
                            canAfford={grimoire.canAffordUpgrade(data.upgrade, data.goalCost)}
                            boneImageData={grimoire.getBoneImageData(data.upgrade.data.x1)}
                        />
                    </TipDisplay>
                );
            }
        }
    ];

    const filteredAndSortedData = useMemo(() => {
        if (!grimoire) return [];

        let data = grimoire.upgrades.map(upgrade => {
            // Calculate cost for next 10 levels if max level is very high
            const costForNext10Levels = upgrade.data.max_level >= 999999 ? upgrade.getCostForNextNLevels([], 10) : 0;
            
            // Calculate goal cost (cost to max or 10 levels for unlocked, unlock requirement for locked)
            const goalCost = !upgrade.unlocked
                ? 0 // Locked upgrades don't have a direct cost, they need level requirements
                : (upgrade.data.max_level >= 999999 ? costForNext10Levels : upgrade.costToMax);

            return {
                name: upgrade.data.name,
                boneType: BoneType[upgrade.data.x1],
                level: upgrade.level,
                maxLevel: upgrade.data.max_level,
                bonus: upgrade.getDescription(),
                nextCost: upgrade.level === upgrade.data.max_level ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                goalCost: upgrade.level === upgrade.data.max_level ? Number.MAX_SAFE_INTEGER : goalCost,
                type: 'Grimoire',
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
        if (boneTypeFilter !== 'All') {
            data = data.filter(item => item.boneType === boneTypeFilter);
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
    }, [grimoire, lastUpdated, hideLocked, hideMaxed, boneTypeFilter, sortBy, searchText]);

    // Get unique values for filters
    const uniqueBoneTypes = useMemo(() => {
        if (!grimoire) return [];
        const boneTypes = [...new Set(grimoire.upgrades.map(upgrade => upgrade.data.x1))];
        return boneTypes.sort().map(boneType => BoneType[boneType]);
    }, [grimoire]);

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
                    <Text size="small">Bone:</Text>
                    <Select
                        value={boneTypeFilter}
                        options={['All', ...uniqueBoneTypes]}
                        onChange={({ option }) => setBoneTypeFilter(option)}
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

export function GrimoireDisplay() {
    const [showUnlockPath, setShowUnlockPath] = useState(false);
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const grimoire = theData.get("grimoire") as Grimoire;

    // Calculate stats for summary
    const totalUpgrades = grimoire?.upgrades.length || 0;
    const maxedUpgrades = grimoire?.upgrades.filter(u => u.level >= u.data.max_level).length || 0;
    const unlockedUpgrades = grimoire?.upgrades.filter(u => u.unlocked).length || 0;

    // Create the tooltip label for Total Grimoire Level
    const totalLevelLabel = (
        <Box direction="row" gap="xsmall" align="center">
            <Text size="small" color="accent-2">Total Grimoire Level</Text>
            <TipDisplay
                heading="Total Grimoire Level"
                body={
                    <Text size="small">The sum of all your Grimoire upgrade levels. Higher levels unlock more upgrades.</Text>
                }
                direction={TipDirection.Down}
            >
                <CircleInformation size="small" />
            </TipDisplay>
        </Box>
    );

    // Create the tooltip label for Available Bones
    const availableBonesLabel = (
        <Box direction="row" gap="xsmall" align="center">
            <Text size="small" color="accent-2">Available Bones</Text>
            <TipDisplay
                heading="Bone Currency"
                body={
                    <Box>
                        <Text size="small">Bones are collected while in Wraith Form using the Death Bringer class.</Text>
                        <Text size="small">There are 4 types of bones with increasing rarity:</Text>
                        <Text size="small">• Femur: Basic bone type</Text>
                        <Text size="small">• Ribcage: Used for intermediate upgrades</Text>
                        <Text size="small">• Cranium: Used for advanced upgrades</Text>
                        <Text size="small">• Bovinae: Used for the most powerful upgrades</Text>
                    </Box>
                }
                direction={TipDirection.Down}
            >
                <CircleInformation size="small" />
            </TipDisplay>
        </Box>
    );

    // Get the next unlock and levels needed
    const nextUnlock = grimoire?.getNextLockedUpgrade();
    const levelsNeeded = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - (grimoire?.totalGrimoireLevel || 0)) : 0;

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
        ['unlock_path', grimoire?.unlockPathInfo || { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} }]
    ]);

    return (
        <Box gap="small">
            <ShadowBox background="dark-2" pad="medium" margin={{ bottom: 'medium' }}>
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel
                        label={totalLevelLabel}
                        component={
                            <Box direction="row" gap="small">
                                <Text size="large">{(grimoire?.totalGrimoireLevel || 0).toLocaleString()}</Text>
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
                </Box>

                {/* Display current bone counts */}
                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <ComponentAndLabel
                        label={availableBonesLabel}
                        component={
                            <Box direction="row" gap="medium" wrap>
                                <BoneDisplay cost={grimoire?.resources[BoneType.Femur] || 0} boneImageData={grimoire.getBoneImageData(BoneType.Femur)} />
                                <BoneDisplay cost={grimoire?.resources[BoneType.Ribcage] || 0} boneImageData={grimoire.getBoneImageData(BoneType.Ribcage)} />
                                <BoneDisplay cost={grimoire?.resources[BoneType.Cranium] || 0} boneImageData={grimoire.getBoneImageData(BoneType.Cranium)} />
                                <BoneDisplay cost={grimoire?.resources[BoneType.Bovinae] || 0} boneImageData={grimoire.getBoneImageData(BoneType.Bovinae)} />
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
                        <strong>Note:</strong> Grimoire upgrades are purchased with bones collected while in Wraith Form using the Death Bringer class.
                    </Text>
                </Box>
            </ShadowBox>

            {/* Display the unlock path if enabled */}
            {showUnlockPath && nextUnlock && levelsNeeded > 0 && (
                <EfficiencyAnalysis
                    efficiencyResults={efficiencyResults}
                    optimizationTypes={optimizationTypes}
                    getResourceImageData={(resourceType: number) => grimoire?.getBoneImageData(resourceType) || { location: "", height: 20, width: 20 }}
                    canAffordResource={(resourceType: number, cost: number) => grimoire?.getResourceCount(resourceType) >= cost || false}
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
                            value: `${levelsNeeded} more levels to reach ${(nextUnlock.getUnlockRequirement?.() ?? 0)}`
                        }
                    }}
                />
            )}

            <GrimoireTableView />
        </Box>
    )
} 
