"use client"

import {
    Box,
    Text,
    Grid,
} from "grommet";
import { useMemo } from "react";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import { Compass, CompassUpgrade, DustType } from "../../data/domain/compass";
import React from "react";
import { EfficiencyAnalysis } from "./shared/EfficiencyAnalysis";
import { UpgradeTableData } from "./shared/useUpgradeTableData";
import { ResourceDisplay } from "./shared/ResourceDisplay";
import { EfficiencyUpgradeTable } from "./shared/EfficiencyUpgradeTable";
import { nFormatter } from "../../data/utility";

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
                    <ResourceDisplay
                        cost={compass.availableDust[DustType.Stardust] || 0}
                        resourceImageData={compass.getDustImageData(DustType.Stardust)}
                        textSize="small"
                        showTooltip={true}
                        tooltipHeading="Exact Dust Count"
                    />
                    <ResourceDisplay
                        cost={compass.availableDust[DustType.Moondust] || 0}
                        resourceImageData={compass.getDustImageData(DustType.Moondust)}
                        textSize="small"
                        showTooltip={true}
                        tooltipHeading="Exact Dust Count"
                    />
                    <ResourceDisplay
                        cost={compass.availableDust[DustType.Solardust] || 0}
                        resourceImageData={compass.getDustImageData(DustType.Solardust)}
                        textSize="small"
                        showTooltip={true}
                        tooltipHeading="Exact Dust Count"
                    />
                    <ResourceDisplay
                        cost={compass.availableDust[DustType.Cooldust] || 0}
                        resourceImageData={compass.getDustImageData(DustType.Cooldust)}
                        textSize="small"
                        showTooltip={true}
                        tooltipHeading="Exact Dust Count"
                    />
                    <ResourceDisplay
                        cost={compass.availableDust[DustType.Novadust] || 0}
                        resourceImageData={compass.getDustImageData(DustType.Novadust)}
                        textSize="small"
                        showTooltip={true}
                        tooltipHeading="Exact Dust Count"
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
                                                <ResourceDisplay
                                                    cost={upgrade.cost}
                                                    canAfford={compass.canAffordUpgrade(upgrade)}
                                                    resourceImageData={compass.getDustImageData(upgrade.data.dustType)}
                                                    tooltipHeading="Exact Dust Count"
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

// Efficiency Section with consolidated component
function EfficiencySection() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;

    // Early return if no compass data
    if (!compass || compass.currentTempestDamage === 0) {
        return null; // No Wind Walker or damage calculation failed
    }

    // Define optimization types
    const optimizationTypes = [
        {
            id: 'Tempest Damage',
            label: 'Tempest Damage',
            showCountSelector: true,
            showConsolidation: true
        },
        {
            id: 'Dust Multiplier',
            label: 'Dust Multiplier',
            showCountSelector: true,
            showConsolidation: true
        }
    ];

    // Configuration for value display
    const valueConfigs = {
        'Tempest Damage': {
            valueHeader: "Damage +",
            valueColor: "accent-1",
            formatValue: (value: number) => `+${value.toFixed(2)}`,
            noResultsText: "No efficient damage upgrades available (insufficient dust, all upgrades maxed, or all locked)"
        },
        'Dust Multiplier': {
            valueHeader: "Multiplier +",
            valueColor: "accent-2",
            formatValue: (value: number) => `+${value.toFixed(4)}x`,
            noResultsText: "No efficient dust upgrades available (insufficient dust, all upgrades maxed, or all locked)"
        }
    };

    return (
        <EfficiencyAnalysis
            efficiencyResults={compass.efficiencyResults}
            optimizationTypes={optimizationTypes}
            getResourceImageData={(resourceType) => compass.getDustImageData(resourceType as DustType)}
            canAffordResource={(resourceType, cost) => compass.availableDust[resourceType as DustType] >= cost}
            valueConfigs={valueConfigs}
            currentValues={{
                tempestDamage: {
                    label: "Current Tempest Damage",
                    value: nFormatter(compass.currentTempestDamage, "CommaNotation")
                },
                dustMultiplier: {
                    label: "Current Dust Multiplier", 
                    value: `${compass.currentDustMultiplier.toFixed(2)}x`
                }
            }}
        />
    );
}

// Main CompassDisplay Component
function CompassDisplay() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;

    // Prepare data for filtering
    const upgradeData = useMemo(() => {
        if (!compass) return [];

        return compass.upgrades
            .filter(upgrade => upgrade.data.upgradeType !== "Unknown" && upgrade.data.description != "Titan doesnt exist")
            .map(upgrade => {
                // Calculate cost to max or 10 levels
                const costToMax = upgrade.data.maxLevel >= 999999
                    ? upgrade.getCostForNextNLevels(compass.upgrades, 10, compass.upgradeMetadata)
                    : upgrade.costToMax;

                // Calculate goal cost (unlock cost for locked, cost to max/10 for unlocked)
                const goalCost = !upgrade.unlocked
                    ? upgrade.costToUnlock
                    : costToMax;

                return {
                    name: upgrade.getName(),
                    dustType: DustType[upgrade.data.dustType],
                    level: upgrade.getLevel(),
                    maxLevel: upgrade.getMaxLevel(),
                    bonus: upgrade.getDescription(),
                    nextCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                    goalCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : goalCost,
                    type: upgrade.data.upgradeType,
                    maxed: upgrade.getLevel() >= upgrade.getMaxLevel(),
                    locked: !upgrade.isUnlocked(),
                    id: upgrade.getId(),
                    pathIndex: upgrade.indexInPath,
                    upgrade
                };
            });
    }, [compass, lastUpdated]);

    // Get unique values for filters
    const uniquePaths = useMemo(() => {
        if (!compass) return [];
        const paths = [...new Set(compass.upgrades
            .filter(upgrade => upgrade.data.upgradeType !== "Unknown")
            .map(upgrade => upgrade.data.upgradeType))];
        return paths.sort();
    }, [compass]);

    // Get unique values for filters
    const uniqueDustTypes = useMemo(() => {
        const resourceTypes = compass.getResourceTypes();
        return Object.keys(resourceTypes).sort((a, b) => resourceTypes[a] - resourceTypes[b]);
    }, [compass]);

    return (
        <Box gap="medium">
            <PathUpgradesSection />
            <EfficiencySection />
            <EfficiencyUpgradeTable
                upgradeData={upgradeData}
                resourceFilterLabel={compass.getResourceGeneralName()}
                resourceFilterOptions={uniqueDustTypes}
                pathFilterLabel="Path"
                pathFilterOptions={uniquePaths}
                sortOptions={[
                    { label: 'Cost (ascending)', value: 'cost' },
                    { label: 'Path', value: 'path' }
                ]}
                resourceFilterKey="dustType"
                pathFilterKey="type"
                getResourceImageData={(upgrade: CompassUpgrade) => compass.getDustImageData(upgrade.data.dustType)}
                canAffordUpgrade={(upgrade: CompassUpgrade, cost?: number) => compass.canAffordUpgrade(upgrade, cost)}
                getDescription={(upgrade: CompassUpgrade) => upgrade.getDescription()}
                tooltipHeading="Exact Dust Count"
            />
        </Box>
    );
}

export default CompassDisplay;
