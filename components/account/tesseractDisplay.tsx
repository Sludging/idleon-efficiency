"use client"

import { Box, Text } from "grommet";
import { useState } from "react";
import { PrismaBubbleTesseractUpgrade, Tesseract, TesseractType, TesseractUpgrade } from "../../data/domain/tesseract";
import ShadowBox from "../base/ShadowBox";
import { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { EfficiencyAnalysis } from "./shared/EfficiencyAnalysis";
import { ResourceDisplay } from "./shared/ResourceDisplay";
import { EfficiencyUpgradeTable } from "./shared/EfficiencyUpgradeTable";
import { nFormatter } from "../../data/utility";
import ResourceWeightModal from "./shared/ResourceWeightModal";
import SmallButton from "../base/SmallButton";
import { Configure } from "grommet-icons";

export function TesseractDisplay() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const tesseract = theData.get("tesseract") as Tesseract;
    const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

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
            id: 'Unlock Path',
            label: 'Unlock Path',
            showCountSelector: false,
            showConsolidation: true,
            currentValues: nextUnlock && levelsNeeded > 0 ? [
                {
                    label: "Next Unlock",
                    value: (
                        <Box direction="row" gap="small" align="center">
                            <IconImage data={nextUnlock.getImageData()} scale={0.4} />
                            <Text size="small">{nextUnlock.getName()}</Text>
                        </Box>
                    )
                },
                {
                    label: "Levels Needed",
                    value: `${levelsNeeded} more levels to reach ${(nextUnlock.getUnlockRequirement?.() ?? 0)}`
                }
            ] : undefined
        },
        {
            id: 'Arcane Damage',
            label: 'Arcane Damage',
            showCountSelector: true,
            showConsolidation: true,
            currentValues: [{
                label: "Current Arcane Damage",
                value: nFormatter(tesseract.currentArcaneDamage, "CommaNotation")
            }]
        },
        {
            id: 'Tachyon Drop Rate',
            label: 'Tachyon Drop Rate',
            showCountSelector: true,
            showConsolidation: true,
            currentValues: [{
                label: "Current Tachyon Drop Rate",
                value: `${tesseract.currentTachyonDropRate.toFixed(2)}x`
            }]
        },
        {
            id: 'Arcane Accuracy',
            label: 'Arcane Accuracy',
            showCountSelector: true,
            showConsolidation: true,
            currentValues: [{
                label: "Current Arcane Accuracy",
                value: nFormatter(tesseract.currentArcaneAccuracy, "CommaNotation")
            }]
        },
        {
            id: 'Arcane Defense',
            label: 'Arcane Defense',
            showCountSelector: true,
            showConsolidation: true,
            currentValues: [{
                label: "Current Arcane Defense",
                value: nFormatter(tesseract.currentArcaneDefense, "CommaNotation")
            }]
        }
    ];

    // Configuration for value display
    const valueConfigs = {
        "Unlock Path": {
            valueHeader: '',
            valueColor: 'accent-2',
            formatValue: (_: number) => ``,
            noResultsText: 'No efficient upgrades available'
        },
        'Arcane Damage': { valueHeader: 'Damage +', valueColor: 'accent-2', formatValue: (value: number) => `${nFormatter(value, "CommaNotation")}`, noResultsText: 'No efficient damage upgrades available' },
        'Tachyon Drop Rate': { valueHeader: 'Multiplier +', valueColor: 'accent-2', formatValue: (value: number) => `${(value).toFixed(2)}x`, noResultsText: 'No efficient tachyon drop upgrades available' },
        'Arcane Accuracy': { valueHeader: 'Accuracy +', valueColor: 'accent-2', formatValue: (value: number) => `${nFormatter(value, "CommaNotation")}`, noResultsText: 'No efficient accuracy upgrades available' },
        'Arcane Defense': { valueHeader: 'Defense +', valueColor: 'accent-2', formatValue: (value: number) => `${nFormatter(value, "CommaNotation")}`, noResultsText: 'No efficient defense upgrades available' }
    };

    // Create efficiency results map
    const defaultPathInfo = { goal: "", pathUpgrades: [], totalValue: 0, resourceCosts: {} };
    const efficiencyResults = new Map([
        ['Unlock Path', tesseract.efficiencyResults.get('Cheapest Path') || defaultPathInfo],
        ['Arcane Damage', tesseract.efficiencyResults.get('Arcane Damage') || defaultPathInfo],
        ['Tachyon Drop Rate', tesseract.efficiencyResults.get('Tachyon Drop Rate') || defaultPathInfo],
        ['Arcane Accuracy', tesseract.efficiencyResults.get('Arcane Accuracy') || defaultPathInfo],
        ['Arcane Defense', tesseract.efficiencyResults.get('Arcane Defense') || defaultPathInfo]
    ]);

    // Prepare data for filtering
    const upgradeData = tesseract.upgrades
        // Boundless Energy are filler upgrades, ignore them.
        .filter(upgrade => upgrade.data.name !== "Boundless Energy")
        .map(upgrade => {
            // Calculate goal cost (cost to max or 10 levels for unlocked, unlock requirement for locked)
            const goalCost = !upgrade.unlocked
                ? 0 // Locked upgrades don't have a direct cost, they need level requirements
                : (upgrade.data.max_level >= 999999 ? upgrade.getCostForNextNLevels(tesseract.upgrades, 10) : upgrade.costToMax);

            return {
                name: upgrade.getName(),
                tachyonType: TesseractType[upgrade.data.x1],
                level: upgrade.getLevel(),
                maxLevel: upgrade.getMaxLevel(),
                bonus: upgrade.getDescription(),
                nextCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : upgrade.cost,
                goalCost: upgrade.getLevel() === upgrade.getMaxLevel() ? Number.MAX_SAFE_INTEGER : goalCost,
                type: 'Tesseract',
                maxed: upgrade.getLevel() >= upgrade.getMaxLevel(),
                locked: !upgrade.isUnlocked(),
                id: upgrade.getId(),
                upgrade
            };
        });

    // Get unique values for filters
    const resourceTypes = tesseract.getResourceTypes();
    const uniqueTachyonTypes = Object.keys(resourceTypes).sort((a, b) => resourceTypes[a] - resourceTypes[b]);

    if (!tesseract) {
        return <Text>Loading Tesseract data...</Text>;
    }

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
                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap align="center">
                    <ComponentAndLabel
                        label={availableTachyonsLabel}
                        component={
                            <Box direction="row" gap="medium" wrap>
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Purple] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Purple)} tooltipHeading="Exact Tachyon Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Brown] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Brown)} tooltipHeading="Exact Tachyon Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Green] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Green)} tooltipHeading="Exact Tachyon Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Red] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Red)} tooltipHeading="Exact Tachyon Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Silver] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Silver)} tooltipHeading="Exact Tachyon Count" />
                                <ResourceDisplay resourceImageScale={1} showTooltip={true} cost={tesseract?.resources[TesseractType.Gold] || 0} resourceImageData={tesseract.getTachyonImageData(TesseractType.Gold)} tooltipHeading="Exact Tachyon Count" />
                            </Box>
                        }
                    />
                    <Box pad={{ top: 'small' }}>
                        <SmallButton
                            icon={<Configure size="small" />}
                            label="Resource Weights"
                            secondary
                            size="small"
                            color="accent-3"
                            onClick={() => setIsWeightModalOpen(true)}
                        />
                    </Box>
                </Box>

                <Box margin={{ top: 'medium' }} direction="row" justify="between" align="center">
                    <Text size="small">
                        <strong>Note:</strong> Tesseract upgrades are purchased with Tachyons collected while in Arcanist Form using the Arcane Cultist class.
                    </Text>
                </Box>
            </ShadowBox>

            {/* Display the unlock path if enabled */}
            <EfficiencyAnalysis
                efficiencyResults={efficiencyResults}
                optimizationTypes={optimizationTypes}
                getResourceImageData={(resourceType: number) => tesseract.getTachyonImageData(resourceType)}
                canAffordResource={(resourceType: number, cost: number) => tesseract.getResourceCount(resourceType) >= cost}
                valueConfigs={valueConfigs}
                title="Tesseract Efficiency Analysis"
            />

            <EfficiencyUpgradeTable
                upgradeData={upgradeData}
                resourceFilterLabel={tesseract.getResourceGeneralName()}
                resourceFilterOptions={uniqueTachyonTypes}
                resourceFilterKey="tachyonType"
                getResourceImageData={(upgrade: TesseractUpgrade) => tesseract.getTachyonImageData(upgrade.data.x1)}
                canAffordUpgrade={(upgrade: TesseractUpgrade, cost?: number) => tesseract.canAffordUpgrade(upgrade, cost)}
                getDescription={(upgrade: TesseractUpgrade) => upgrade.getDescription()}
                tooltipHeading="Exact Tachyon Count"
            />

            <ResourceWeightModal
                isOpen={isWeightModalOpen}
                onClose={() => setIsWeightModalOpen(false)}
                onRecalculate={(weights) => {
                    tesseract.saveResourceWeights(weights);
                    tesseract.calculateAllEfficiencies();
                }}
                currentWeights={tesseract?.loadResourceWeights() || { 0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.0 }}
                domain={tesseract}
            />
        </Box>
    )
} 
