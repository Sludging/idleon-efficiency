"use client"

import {
    Box,
    Text,
    DataTable,
    Grid,
    CheckBox,
    Select,
    TextInput
} from "grommet";
import { useMemo, useState } from "react";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { Compass, CompassUpgrade, DustType } from "../../data/domain/compass";
import React from "react";
import { CircleInformation } from "grommet-icons";

interface CompassTableData {
    name: string;
    dustType: string;
    level: number;
    maxLevel: number;
    bonus: string;
    nextCost: number;
    goalCost: number;
    firstLevelCost: number;
    type: string;
    maxed: boolean;
    locked: boolean;
    id: number;
    pathIndex: number;
    upgrade: CompassUpgrade;
}

// Simple dust display without tooltip
function DustDisplay({ cost, canAfford, dustImageData, textSize = "xsmall", showTooltip = false }: {
    cost: number,
    canAfford?: boolean,
    dustImageData: any,
    textSize?: string,
    showTooltip?: boolean
}) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={dustImageData} scale={0.7} />
            <TipDisplay
                heading="Exact Dust Count"
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

// Path Upgrades Section
function PathUpgradesSection() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;

    // Extract path-unlocking upgrades (special treatment)
    const pathUpgrades = useMemo(() => {
        if (!compass) return [];

        // Path-unlocking upgrade IDs: Elemental(1), Fighter(13), Survival(27), Nomadic(40)
        const pathUpgradeIds = [1, 13, 27, 40];
        const pathNames = ['Elemental', 'Fighter', 'Survival', 'Nomadic'];

        return pathUpgradeIds.map((id, index) => {
            const upgrade = compass.upgrades.find(u => u.id === id);
            if (!upgrade) return null;

            const pathName = pathNames[index];
            const pathMetadata = compass.upgradeMetadata[pathName];

            // Find the next locked upgrade in this path
            let nextLockedUpgrade = null;
            if (pathMetadata && pathMetadata.pathUpgrades) {
                const nextLockedId = pathMetadata.pathUpgrades.find(upgradeId => {
                    const pathUpgrade = compass.upgrades.find(u => u.id === upgradeId);
                    return pathUpgrade && !pathUpgrade.unlocked;
                });
                if (nextLockedId !== undefined) {
                    nextLockedUpgrade = compass.upgrades.find(u => u.id === nextLockedId);
                }
            }

            return {
                upgrade,
                pathName,
                nextLockedUpgrade,
                pathLevel: pathMetadata?.pathLevel || 0
            };
        }).filter(Boolean);
    }, [compass, lastUpdated]);

    return (
        <Box gap="small">
            <Box justify="between" direction="row">
                <Text size="medium" weight="bold" margin={{ bottom: 'xsmall' }}>Path Upgrades</Text>
                <Box direction="row" gap="small">
                    <DustDisplay
                        cost={compass.availableDust[DustType.Stardust] || 0}
                        dustImageData={compass.getDustImageData(DustType.Stardust)}
                        textSize="small"
                        showTooltip={true}
                    />
                    <DustDisplay
                        cost={compass.availableDust[DustType.Moondust] || 0}
                        dustImageData={compass.getDustImageData(DustType.Moondust)}
                        textSize="small"
                        showTooltip={true}
                    />
                    <DustDisplay
                        cost={compass.availableDust[DustType.Solardust] || 0}
                        dustImageData={compass.getDustImageData(DustType.Solardust)}
                        textSize="small"
                        showTooltip={true}
                    />
                    <DustDisplay
                        cost={compass.availableDust[DustType.Cooldust] || 0}
                        dustImageData={compass.getDustImageData(DustType.Cooldust)}
                        textSize="small"
                        showTooltip={true}
                    />
                    <DustDisplay
                        cost={compass.availableDust[DustType.Novadust] || 0}
                        dustImageData={compass.getDustImageData(DustType.Novadust)}
                        textSize="small"
                        showTooltip={true}
                    />
                </Box>
            </Box>
            <Grid
                columns={['repeat(auto-fill, minmax(300px, 1fr))']}
                gap="small"
            >
                {pathUpgrades.map((pathData, index) => {
                    if (!pathData) return null;
                    const { upgrade, pathName, nextLockedUpgrade, pathLevel } = pathData;
                    return (
                        <ShadowBox
                            key={index}
                            background="dark-1"
                            pad="medium"
                            height="100%"
                        >
                            <Box gap="small" fill justify="between">
                                <Box gap="small">
                                    <Box direction="row" justify="between" align="center">
                                        <Box direction="row" gap="small" align="center">
                                            <IconImage data={upgrade.getImageData()} scale={0.5} />
                                            <Text size="small" weight="bold">{upgrade.data.name}</Text>
                                        </Box>
                                        <Box direction="row" gap="small">
                                            <Text size="xsmall">{upgrade.level} / {upgrade.data.maxLevel}</Text>
                                        </Box>
                                    </Box>
                                    {nextLockedUpgrade && (
                                        <Box>
                                            <TextAndLabel
                                                label="Next Unlock"
                                                text={`${nextLockedUpgrade.data.name} (${nextLockedUpgrade.data.description}`}
                                                labelSize="xsmall"
                                                textSize="xsmall"
                                                textColor="grey-2"
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <Box gap="small">
                                    <Box>
                                        <ComponentAndLabel
                                            labelSize="xsmall"
                                            label="Next level:"
                                            component={
                                                <DustDisplay
                                                    cost={upgrade.cost}
                                                    canAfford={compass.canAffordUpgrade(upgrade)}
                                                    dustImageData={compass.getDustImageData(upgrade.data.dustType)}
                                                />
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </ShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
}

// Efficiency Section with toggle between attributes
function EfficiencySection() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;
    const [selectedAttribute, setSelectedAttribute] = useState<'damage' | 'dust'>('damage');
    const [upgradeCount, setUpgradeCount] = useState<number>(50);
    const [consolidateUpgrades, setConsolidateUpgrades] = useState<boolean>(true);

    const isDamageMode = selectedAttribute === 'damage';
    const topEfficiencyUpgrades = useMemo(() => {
        if (!compass || compass.currentTempestDamage === 0) {
            return [];
        }
        const rawUpgrades = isDamageMode
            ? compass.getTopDamageEfficiencyUpgrades(upgradeCount)
            : compass.getTopDustEfficiencyUpgrades(upgradeCount);

        if (!consolidateUpgrades) {
            // Return individual upgrades with efficiency calculation
            return rawUpgrades.map(effUpgrade => ({
                upgrade: effUpgrade.upgrade,
                currentLevel: compass.upgrades.find(u => u.id === effUpgrade.upgrade.id)?.level || 0,
                targetLevel: effUpgrade.upgrade.level,
                totalValueIncrease: effUpgrade.valueIncrease,
                totalDustCost: effUpgrade.dustCost,
                efficiency: effUpgrade.valueIncrease / effUpgrade.dustCost,
                individualCosts: [{
                    fromLevel: effUpgrade.upgrade.level - 1,
                    toLevel: effUpgrade.upgrade.level,
                    cost: effUpgrade.dustCost,
                    valueIncrease: effUpgrade.valueIncrease
                }]
            }));
        }

        // Combine duplicate upgrades into single entries with target levels
        const combinedUpgrades = new Map();

        rawUpgrades.forEach(effUpgrade => {
            const upgradeId = effUpgrade.upgrade.id;

            if (combinedUpgrades.has(upgradeId)) {
                const existing = combinedUpgrades.get(upgradeId);
                existing.targetLevel = effUpgrade.upgrade.level;
                existing.totalValueIncrease += effUpgrade.valueIncrease;
                existing.totalDustCost += effUpgrade.dustCost;
                existing.individualCosts.push({
                    fromLevel: effUpgrade.upgrade.level - 1,
                    toLevel: effUpgrade.upgrade.level,
                    cost: effUpgrade.dustCost,
                    valueIncrease: effUpgrade.valueIncrease
                });
            } else {
                combinedUpgrades.set(upgradeId, {
                    upgrade: effUpgrade.upgrade,
                    currentLevel: compass.upgrades.find(u => u.id === upgradeId)?.level || 0,
                    targetLevel: effUpgrade.upgrade.level,
                    totalValueIncrease: effUpgrade.valueIncrease,
                    totalDustCost: effUpgrade.dustCost,
                    individualCosts: [{
                        fromLevel: effUpgrade.upgrade.level - 1,
                        toLevel: effUpgrade.upgrade.level,
                        cost: effUpgrade.dustCost,
                        valueIncrease: effUpgrade.valueIncrease
                    }]
                });
            }
        });

        // Calculate average efficiency for each consolidated upgrade and sort
        const consolidatedArray = Array.from(combinedUpgrades.values()).map(combined => ({
            ...combined,
            efficiency: combined.totalValueIncrease / combined.totalDustCost
        }));

        // Sort by efficiency (highest first)
        consolidatedArray.sort((a, b) => b.efficiency - a.efficiency);

        return consolidatedArray;
    }, [compass, isDamageMode, lastUpdated, upgradeCount, consolidateUpgrades]);

    const attributeConfig = {
        damage: {
            valueHeader: "Damage +",
            valueColor: "accent-1",
            noResultsText: "No efficient damage upgrades available (insufficient dust, all upgrades maxed, or all locked)",
            formatValue: (value: number) => `+${value.toFixed(2)}`
        },
        dust: {
            valueHeader: "Multiplier +",
            valueColor: "accent-2",
            noResultsText: "No efficient dust upgrades available (insufficient dust, all upgrades maxed, or all locked)",
            formatValue: (value: number) => `+${value.toFixed(4)}x`
        }
    };

    const config = attributeConfig[selectedAttribute];

    // Calculate total dust costs for all combined upgrades
    const totalDustCosts = useMemo(() => {
        const costs: Record<DustType, number> = {
            [DustType.Stardust]: 0,
            [DustType.Moondust]: 0,
            [DustType.Solardust]: 0,
            [DustType.Cooldust]: 0,
            [DustType.Novadust]: 0
        };

        topEfficiencyUpgrades.forEach(combinedUpgrade => {
            const dustType = combinedUpgrade.upgrade.data.dustType as DustType;
            costs[dustType] += combinedUpgrade.totalDustCost;
        });

        return costs;
    }, [topEfficiencyUpgrades]);

    // Early return after all hooks
    if (!compass || compass.currentTempestDamage === 0) {
        return null; // No Wind Walker or damage calculation failed
    }

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box gap="medium">
                <Box>
                    <Box direction="row" gap="medium" justify="between"  align="center">
                        <Text size="medium" weight="bold">Upgrade Efficiency Analysis</Text>
                        <Box direction="row" gap="medium" align="center">
                        <TextAndLabel
                            label="Current Tempest Damage"
                            text={nFormatter(compass.currentTempestDamage)}
                            labelSize="small"
                            textSize="medium"
                        />
                        <TextAndLabel
                            label="Current Dust Multiplier"
                            text={`${compass.currentDustMultiplier.toFixed(2)}x`}
                            labelSize="small"
                            textSize="medium"
                        />
                        </Box>
                    </Box>
                    <Box direction="row" gap="medium" align="center">
                        <Box direction="row" gap="small" align="center">
                            <Text size="small">Optimize for:</Text>
                            <Select
                                value={selectedAttribute}
                                options={[
                                    { label: 'Tempest Damage', value: 'damage' },
                                    { label: 'Dust Multiplier', value: 'dust' }
                                ]}
                                labelKey="label"
                                valueKey={{ key: 'value', reduce: true }}
                                onChange={({ value }) => setSelectedAttribute(value)}
                            />
                        </Box>
                        <Box direction="row" gap="small" align="center">
                            <Text size="small">Show top:</Text>
                            <Select
                                value={upgradeCount}
                                options={[10, 25, 50, 100]}
                                onChange={({ option }) => setUpgradeCount(option)}
                            />
                        </Box>
                        <Box direction="row" gap="xsmall" align="center">
                            <CheckBox
                                checked={consolidateUpgrades}
                                label="Consolidate upgrades"
                                onChange={(event) => setConsolidateUpgrades(event.target.checked)}
                            />
                            <TipDisplay
                                heading="Consolidation Mode"
                                body={
                                    <Box gap="small">
                                        <Text size="small" weight="bold">Consolidated (Checked):</Text>
                                        <Text size="small">Groups multiple levels of the same upgrade together, sorted by average efficiency. Better for bulk upgrading and seeing total costs.</Text>
                                        <Text size="small" weight="bold">Individual (Unchecked):</Text>
                                        <Text size="small">Shows each upgrade level separately in exact efficiency order. Better for precise optimization and upgrading one level at a time.</Text>
                                    </Box>
                                }
                                direction={TipDirection.Down}
                            >
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    </Box>
                </Box>

                {topEfficiencyUpgrades.length > 0 ? (
                    <Box gap="small">
                        <Text size="small" weight="bold">Most Efficient Upgrades</Text>
                        <DataTable
                            columns={[
                                {
                                    property: 'name',
                                    header: 'Upgrade',
                                    render: (data: any) => (
                                        <Box direction="row" gap="small" align="center">
                                            <IconImage data={data.upgrade.getImageData()} scale={0.4} />
                                            <Text size="xsmall">{data.upgrade.data.name}</Text>
                                        </Box>
                                    )
                                },
                                {
                                    property: 'targetLevel',
                                    header: consolidateUpgrades ? 'Target Level' : 'Level',
                                    render: (data: any) => (
                                        <Text size="xsmall">
                                            {consolidateUpgrades 
                                                ? `${data.currentLevel} → ${data.targetLevel}`
                                                : `${data.currentLevel} → ${data.targetLevel}`
                                            }
                                        </Text>
                                    )
                                },
                                {
                                    property: 'totalValueIncrease',
                                    header: config.valueHeader,
                                    render: (data: any) => (
                                        <Text size="xsmall" color={config.valueColor}>
                                            {config.formatValue(data.totalValueIncrease)}
                                        </Text>
                                    )
                                },
                                {
                                    property: 'totalCost',
                                    header: consolidateUpgrades ? 'Total Cost' : 'Cost',
                                    render: (data: any) => (
                                        consolidateUpgrades ? (
                                            <TipDisplay
                                                heading="Individual Level Costs"
                                                body={
                                                    <Box gap="xsmall">
                                                        {data.individualCosts.map((cost: any, index: number) => (
                                                            <Box key={index} direction="row" justify="between" gap="medium" align="end">
                                                                <Text size="xsmall">{`Level ${cost.fromLevel} → ${cost.toLevel}:`}</Text>
                                                                <Box direction="row" gap="small" align="center">
                                                                    <DustDisplay
                                                                        cost={cost.cost}
                                                                        dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                                                                        textSize="xsmall"
                                                                    />
                                                                    <Text size="xsmall" color={config.valueColor}>
                                                                        ({config.formatValue(cost.valueIncrease)})
                                                                    </Text>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                }
                                                direction={TipDirection.Down}
                                            >
                                                <DustDisplay
                                                    cost={data.totalDustCost}
                                                    canAfford={compass.availableDust[data.upgrade.data.dustType as DustType] >= data.totalDustCost}
                                                    dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                                                />
                                            </TipDisplay>
                                        ) : (
                                            <DustDisplay
                                                cost={data.totalDustCost}
                                                canAfford={compass.availableDust[data.upgrade.data.dustType as DustType] >= data.totalDustCost}
                                                dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                                            />
                                        )
                                    )
                                }
                            ]}
                            data={topEfficiencyUpgrades}
                        />
                        <Box direction="row" justify="between" align="center" pad={{ horizontal: 'small' }}>
                            <Box direction="row" gap="medium" align="center" justify="end" fill>
                                <Text size="small" weight="bold">Total Cost:</Text>
                                <Box direction="row" gap="small">
                                    {Object.entries(totalDustCosts).map(([dustType, cost]) => {
                                        if (cost === 0) return null;
                                        const dustTypeKey = parseInt(dustType) as DustType;
                                        const canAffordThis = compass.availableDust[dustTypeKey] >= cost;
                                        return (
                                            <DustDisplay
                                                key={dustType}
                                                cost={cost}
                                                canAfford={canAffordThis}
                                                dustImageData={compass.getDustImageData(dustTypeKey)}
                                                textSize="small"
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box align="center" pad="medium">
                        <Text size="small" color="grey-2">
                            {config.noResultsText}
                        </Text>
                    </Box>
                )}
            </Box>
        </ShadowBox>
    );
}

// Main Compass Table View
function CompassTableView() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;

    // Filter and sort state
    const [hideLocked, setHideLocked] = useState(true);
    const [hideMaxed, setHideMaxed] = useState(true);
    const [pathFilter, setPathFilter] = useState<string>('All');
    const [dustFilter, setDustFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'cost' | 'path'>('cost');
    const [searchText, setSearchText] = useState<string>('');

    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (data: CompassTableData) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: data.locked ? 0.5 : 1 }}>
                    <IconImage data={data.upgrade.getImageData()} scale={0.4} />
                    <Text size="xsmall">{data.name}</Text>
                </Box>
            )
        },
        {
            property: 'dustType',
            header: 'Dust',
            render: (data: CompassTableData) => (
                <Box direction="row" gap="small" align="center" title={data.dustType}>
                    <IconImage data={compass.getDustImageData(data.upgrade.data.dustType)} scale={0.6} />
                </Box>
            )
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: CompassTableData) => (
                <Text size="xsmall">{`${data.level}${data.maxLevel >= 999999 ? '' : `/${data.maxLevel}`}`}</Text>
            )
        },
        {
            property: 'bonus',
            header: 'Bonus',
            render: (data: CompassTableData) => (
                <Text size="xsmall">{data.bonus}</Text>
            )
        },
        {
            property: 'nextCost',
            header: 'Next Cost',
            render: (data: CompassTableData) => {
                if (data.upgrade.level >= data.upgrade.data.maxLevel) {
                    return <Text size="xsmall">-</Text>;
                }

                // For locked upgrades, show the first level cost
                if (!data.upgrade.unlocked) {
                    return (
                        <TipDisplay
                            heading="First Level Cost"
                            body={
                                <Text size="small">Cost for the first level of this upgrade after unlocking</Text>
                            }
                            direction={TipDirection.Down}
                        >
                            <DustDisplay
                                cost={data.firstLevelCost}
                                canAfford={false} // Always show as unaffordable since it's locked
                                dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                            />
                        </TipDisplay>
                    );
                }

                return (
                    <DustDisplay
                        cost={data.nextCost}
                        canAfford={compass.canAffordUpgrade(data.upgrade)}
                        dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                    />
                );
            }
        },
        {
            property: 'goalCost',
            header: 'Goal Cost',
            render: (data: CompassTableData) => {
                if (data.upgrade.level >= data.upgrade.data.maxLevel) {
                    return <Text size="small">-</Text>;
                }

                // For locked upgrades, show the cost to unlock
                if (!data.upgrade.unlocked) {
                    if (data.upgrade.costToUnlock === 0) {
                        return <Text size="xsmall">Kill Abom</Text>;
                    }

                    // All path upgrades use stardust to unlock
                    let unlockDustType = DustType.Stardust

                    return (
                        <TipDisplay
                            heading="Cost to Unlock"
                            body={
                                <Text size="small">Cost to level up the path upgrade to unlock this upgrade</Text>
                            }
                            direction={TipDirection.Down}
                        >
                            <DustDisplay
                                cost={data.goalCost}
                                canAfford={compass.canAffordUpgrade(data.upgrade, data.goalCost)}
                                dustImageData={compass.getDustImageData(unlockDustType)}
                            />
                        </TipDisplay>
                    );
                }

                // For unlocked upgrades, show cost to max or 10 levels
                const tooltipText = data.upgrade.data.maxLevel >= 999999
                    ? "Cost for the next 10 levels"
                    : "Cost to reach maximum level";

                return (
                    <TipDisplay
                        heading={data.upgrade.data.maxLevel >= 999999 ? "Cost for 10 Levels" : "Cost to Max"}
                        body={
                            <Text size="small">{tooltipText}</Text>
                        }
                        direction={TipDirection.Down}
                    >
                        <DustDisplay
                            cost={data.goalCost}
                            canAfford={compass.canAffordUpgrade(data.upgrade, data.goalCost)}
                            dustImageData={compass.getDustImageData(data.upgrade.data.dustType)}
                        />
                    </TipDisplay>
                );
            }
        }
    ];

    const filteredAndSortedData = useMemo(() => {
        if (!compass) return [];

        let data = compass.upgrades
            .filter(upgrade => upgrade.data.upgradeType !== "Unknown")
            .map(upgrade => {
                // Calculate cost to max or 10 levels
                const costToMax = upgrade.data.maxLevel >= 999999
                    ? upgrade.getCostForNextNLevels(compass.upgrades, 10, compass.upgradeMetadata)
                    : upgrade.costToMax;

                // Calculate goal cost (unlock cost for locked, cost to max/10 for unlocked)
                const goalCost = !upgrade.unlocked
                    ? upgrade.costToUnlock
                    : costToMax;

                // Calculate first level cost for locked upgrades
                let firstLevelCost = 0;
                if (!upgrade.unlocked) {
                    const tempUpgrade = compass.copyUpgrade(upgrade);
                    tempUpgrade.unlocked = true;
                    tempUpgrade.level = 0;
                    firstLevelCost = tempUpgrade.getCost(compass.upgrades, compass.upgradeMetadata);
                }

                return {
                    name: upgrade.data.name,
                    dustType: DustType[upgrade.data.dustType],
                    level: upgrade.level,
                    maxLevel: upgrade.data.maxLevel,
                    bonus: upgrade.getDescription(),
                    nextCost: upgrade.level === upgrade.data.maxLevel ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                    goalCost: upgrade.level === upgrade.data.maxLevel ? Number.MAX_SAFE_INTEGER : goalCost,
                    firstLevelCost: upgrade.level === upgrade.data.maxLevel ? Number.MAX_SAFE_INTEGER : firstLevelCost,
                    type: upgrade.data.upgradeType,
                    maxed: upgrade.level >= upgrade.data.maxLevel,
                    locked: !upgrade.unlocked,
                    id: upgrade.id,
                    pathIndex: upgrade.indexInPath,
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
        if (pathFilter !== 'All') {
            data = data.filter(item => item.type === pathFilter);
        }
        if (dustFilter !== 'All') {
            data = data.filter(item => item.dustType === dustFilter);
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

            if (sortBy === 'path') {
                // Sort by path first, then by path index
                if (a.type !== b.type) {
                    return a.type.localeCompare(b.type);
                }
                return a.pathIndex - b.pathIndex;
            } else {
                // Sort by cost (ascending)
                return a.nextCost - b.nextCost;
            }
        });

        return data;
    }, [compass, lastUpdated, hideLocked, hideMaxed, pathFilter, dustFilter, sortBy, searchText]);

    // Get unique values for filters
    const uniquePaths = useMemo(() => {
        if (!compass) return [];
        const paths = [...new Set(compass.upgrades
            .filter(upgrade => upgrade.data.upgradeType !== "Unknown")
            .map(upgrade => upgrade.data.upgradeType))];
        return paths.sort();
    }, [compass]);

    const uniqueDustTypes = useMemo(() => {
        if (!compass) return [];
        const dustTypes = [...new Set(compass.upgrades
            .map(upgrade => DustType[upgrade.data.dustType]))];
        return dustTypes.sort();
    }, [compass]);

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
                    <Text size="small">Path:</Text>
                    <Select
                        value={pathFilter}
                        options={['All', ...uniquePaths]}
                        onChange={({ option }) => setPathFilter(option)}
                    />
                </Box>

                <Box direction="row" gap="small" align="center">
                    <Text size="small">Dust:</Text>
                    <Select
                        value={dustFilter}
                        options={['All', ...uniqueDustTypes]}
                        onChange={({ option }) => setDustFilter(option)}
                    />
                </Box>

                <Box direction="row" gap="small" align="center">
                    <Text size="small">Sort by:</Text>
                    <Select
                        value={sortBy}
                        options={[
                            { label: 'Cost (ascending)', value: 'cost' },
                            { label: 'Path', value: 'path' }
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

// Main CompassDisplay Component
function CompassDisplay() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    return (
        <Box gap="medium">
            <PathUpgradesSection />
            <EfficiencySection />
            <CompassTableView />
        </Box>
    );
}

export default CompassDisplay;