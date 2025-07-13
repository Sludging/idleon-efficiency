"use client"

import { Box, Text, Button, Layer, TextInput, Grid } from "grommet";
import { useMemo, useState } from "react";
import { BoneType, Grimoire, GrimoireUpgrade } from "../../data/domain/grimoire";
import ShadowBox from "../base/ShadowBox";
import { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import { CircleInformation } from "grommet-icons";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { EfficiencyAnalysis } from "./shared/EfficiencyAnalysis";
import { ResourceDisplay } from "./shared/ResourceDisplay";
import { EfficiencyUpgradeTable } from "./shared/EfficiencyUpgradeTable";
import { nFormatter } from "../../data/utility";
import ResourceWeightModal from "./shared/ResourceWeightModal";

// Efficiency Section with consolidated component
function EfficiencySection() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const grimoire = theData.get("grimoire") as Grimoire;

    // Early return if no grimoire data or no Death Bringer
    if (!grimoire || grimoire.currentWraithDamage === 0) {
        return null; // No Death Bringer or damage calculation failed
    }

    // Get the next unlock and levels needed
    const nextUnlock = grimoire?.getNextLockedUpgrade();
    const levelsNeeded = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - (grimoire?.totalGrimoireLevel || 0)) : 0;

    // Define optimization types
    const optimizationTypes = [
        {
            id: 'Wraith Damage',
            label: 'Wraith Damage',
            showCountSelector: true,
            showConsolidation: true
        },
        {
            id: 'Bone Drop Rate',
            label: 'Bone Drop Rate',
            showCountSelector: true,
            showConsolidation: true
        },
        {
            id: 'Cheapest Path',
            label: 'Unlock Path',
            showCountSelector: false,
            showConsolidation: true
        }
    ];

    // Configuration for value display
    const valueConfigs = {
        'Wraith Damage': {
            valueHeader: "Damage +",
            valueColor: "accent-2",
            formatValue: (value: number) => `${value.toFixed(2)}`,
            noResultsText: "No efficient damage upgrades available (insufficient bones, all upgrades maxed, or all locked)"
        },
        'Bone Drop Rate': {
            valueHeader: "Multiplier +",
            valueColor: "accent-2",
            formatValue: (value: number) => `${value.toFixed(4)}x`,
            noResultsText: "No efficient bone drop upgrades available (insufficient bones, all upgrades maxed, or all locked)"
        },
        "Cheapest Path": {
            valueHeader: '',
            valueColor: 'accent-2',
            formatValue: (value: number) => ``,
            noResultsText: 'No efficient upgrades available'
        }
    };

    // Create efficiency results map including unlock path
    const efficiencyResults = new Map([
        ['Wraith Damage', grimoire.efficiencyResults.get('Wraith Damage') || { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} }],
        ['Bone Drop Rate', grimoire.efficiencyResults.get('Bone Drop Rate') || { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} }],
        ['Cheapest Path', grimoire.efficiencyResults.get('Cheapest Path') || { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} }]
    ]);

    return (
        <EfficiencyAnalysis
            efficiencyResults={efficiencyResults}
            optimizationTypes={optimizationTypes}
            getResourceImageData={(resourceType) => grimoire.getBoneImageData(resourceType as BoneType)}
            canAffordResource={(resourceType, cost) => grimoire.getResourceCount(resourceType) >= cost}
            valueConfigs={valueConfigs}
            currentValues={{
                wraithDamage: {
                    label: "Current Wraith Damage",
                    value: nFormatter(grimoire.currentWraithDamage, "CommaNotation")
                },
                boneDropRate: {
                    label: "Current Bone Drop Rate", 
                    value: `${grimoire.currentBoneDropRate.toFixed(2)}x`
                },
                ...(nextUnlock && levelsNeeded > 0 ? {
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
                } : {})
            }}
        />
    );
}

export function GrimoireDisplay() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const grimoire = theData.get("grimoire") as Grimoire;
    const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

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

    // Prepare data for filtering
    const upgradeData = useMemo(() => {
        if (!grimoire) return [];

        return grimoire.upgrades.map(upgrade => {
            // Calculate cost for next 10 levels if max level is very high
            const costForNext10Levels = upgrade.data.max_level >= 999999 ? upgrade.getCostForNextNLevels([], 10) : 0;
            
            // Calculate goal cost (cost to max or 10 levels for unlocked, unlock requirement for locked)
            const goalCost = !upgrade.unlocked
                ? 0 // Locked upgrades don't have a direct cost, they need level requirements
                : (upgrade.data.max_level >= 999999 ? costForNext10Levels : upgrade.costToMax);

            return {
                name: upgrade.getName(),
                boneType: BoneType[upgrade.data.x1],
                level: upgrade.getLevel(),
                maxLevel: upgrade.getMaxLevel(),
                bonus: upgrade.getDescription(),
                nextCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                goalCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : goalCost,
                type: 'Grimoire',
                maxed: upgrade.getLevel() >= upgrade.getMaxLevel(),
                locked: !upgrade.isUnlocked(),
                id: upgrade.getId(),
                upgrade
            };
        });
    }, [grimoire, lastUpdated]);

    // Get unique values for filters
    const uniqueBoneTypes = useMemo(() => {
        const resourceTypes = grimoire.getResourceTypes();
        return Object.keys(resourceTypes).sort((a, b) => resourceTypes[a] - resourceTypes[b]);
    }, [grimoire]);

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
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={grimoire?.resources[BoneType.Femur] || 0} resourceImageData={grimoire.getBoneImageData(BoneType.Femur)} tooltipHeading="Exact Bone Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={grimoire?.resources[BoneType.Ribcage] || 0} resourceImageData={grimoire.getBoneImageData(BoneType.Ribcage)} tooltipHeading="Exact Bone Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={grimoire?.resources[BoneType.Cranium] || 0} resourceImageData={grimoire.getBoneImageData(BoneType.Cranium)} tooltipHeading="Exact Bone Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={grimoire?.resources[BoneType.Bovinae] || 0} resourceImageData={grimoire.getBoneImageData(BoneType.Bovinae)} tooltipHeading="Exact Bone Count" />
                            </Box>
                        }
                    />
                </Box>

                <Box margin={{ top: 'medium' }} direction="row" justify="between" align="center">
                    <Text size="small">
                        <strong>Note:</strong> Grimoire upgrades are purchased with bones collected while in Wraith Form using the Death Bringer class.
                    </Text>
                    <Button 
                        label="Configure Resource Weights" 
                        size="small"
                        onClick={() => setIsWeightModalOpen(true)}
                    />
                </Box>
            </ShadowBox>

            <EfficiencySection />

            <EfficiencyUpgradeTable
                upgradeData={upgradeData}
                resourceFilterLabel={grimoire.getResourceGeneralName()}
                resourceFilterOptions={uniqueBoneTypes}
                resourceFilterKey="boneType"
                getResourceImageData={(upgrade: GrimoireUpgrade) => grimoire.getBoneImageData(upgrade.data.x1)}
                canAffordUpgrade={(upgrade: GrimoireUpgrade, cost?: number) => grimoire.canAffordUpgrade(upgrade, cost)}
                getDescription={(upgrade: GrimoireUpgrade) => upgrade.getDescription()}
                tooltipHeading="Exact Bone Count"
            />

            <ResourceWeightModal<Grimoire>
                isOpen={isWeightModalOpen}
                onClose={() => setIsWeightModalOpen(false)}
                onRecalculate={(weights) => {
                    grimoire.saveResourceWeights(weights);
                    grimoire.calculateAllEfficiencies();
                }}
                currentWeights={grimoire.loadResourceWeights()}
                domain={grimoire}
            />
        </Box>
    )
} 
