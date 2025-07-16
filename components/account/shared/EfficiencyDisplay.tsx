import React from 'react';
import { Box, Text, DataTable } from 'grommet';
import { nFormatter } from '../../../data/utility';
import ShadowBox from '../../base/ShadowBox';
import IconImage from '../../base/IconImage';
import TipDisplay, { TipDirection } from '../../base/TipDisplay';
import { EfficiencyPathInfo, EfficiencyUpgrade } from '../../../lib/efficiencyEngine/efficiencyEngine';
import { ImageData } from '../../../data/domain/imageData';

// Simple resource display component
function ResourceDisplay({ 
    cost, 
    canAfford, 
    resourceImageData, 
    textSize = "xsmall", 
    showTooltip = false 
}: {
    cost: number,
    canAfford?: boolean,
    resourceImageData: ImageData,
    textSize?: string,
    showTooltip?: boolean
}) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={resourceImageData} scale={0.7} />
            <TipDisplay
                heading="Exact Resource Count"
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

interface EfficiencyDisplayProps {
    efficiencyData: EfficiencyPathInfo;
    getResourceImageData: (resourceType: number) => ImageData;
    canAffordResource: (resourceType: number, cost: number) => boolean;
    valueHeader: string;
    valueColor: string;
    formatValue: (value: number) => string;
    noResultsText: string;
    consolidateUpgrades?: boolean;
    sortByResource: boolean;
}

interface DataTableUpgradeData {
    upgrade: EfficiencyUpgrade;
    currentLevel: number;
    targetLevel: number;
    totalValueIncrease: number;
    totalResourceCost: number;
    individualCosts: {
        fromLevel: number;
        toLevel: number;
        cost: number;
        valueIncrease: number;
    }[];
    efficiency?: number;
}

export function EfficiencyDisplay({
    efficiencyData,
    getResourceImageData,
    canAffordResource,
    valueHeader,
    valueColor,
    formatValue,
    noResultsText,
    consolidateUpgrades = true,
    sortByResource = false
}: EfficiencyDisplayProps) {
    // Process the efficiency data based on consolidation setting
    const processedData = React.useMemo(() => {
        if (!consolidateUpgrades) {
            // Return individual upgrades with efficiency calculation
            return efficiencyData.pathUpgrades.map(effUpgrade => ({
                upgrade: effUpgrade.upgrade,
                currentLevel: effUpgrade.upgrade.getLevel(),
                targetLevel: effUpgrade.upgrade.getLevel() + 1, // Show the level after purchase
                totalValueIncrease: effUpgrade.valueIncrease,
                totalResourceCost: effUpgrade.resourceCost,
                efficiency: effUpgrade.efficiency,
                individualCosts: [{
                    fromLevel: effUpgrade.upgrade.getLevel(),
                    toLevel: effUpgrade.upgrade.getLevel() + 1,
                    cost: effUpgrade.resourceCost,
                    valueIncrease: effUpgrade.valueIncrease
                }]
            }));
        }

        // Combine duplicate upgrades into single entries with target levels
        const combinedUpgrades = new Map<number, DataTableUpgradeData>();

        efficiencyData.pathUpgrades.forEach(effUpgrade => {
            const upgradeId = effUpgrade.upgrade.getId();

            if (combinedUpgrades.has(upgradeId)) {
                const existing = combinedUpgrades.get(upgradeId);
                if (!existing) {
                    return;
                }
                existing.targetLevel = effUpgrade.upgrade.getLevel() + 1;
                existing.totalValueIncrease += effUpgrade.valueIncrease;
                existing.totalResourceCost += effUpgrade.resourceCost;
                existing.individualCosts.push({
                    fromLevel: effUpgrade.upgrade.getLevel(),
                    toLevel: effUpgrade.upgrade.getLevel() + 1,
                    cost: effUpgrade.resourceCost,
                    valueIncrease: effUpgrade.valueIncrease
                });
            } else {
                combinedUpgrades.set(upgradeId, {
                    upgrade: effUpgrade.upgrade,
                    currentLevel: effUpgrade.upgrade.getLevel(),
                    targetLevel: effUpgrade.upgrade.getLevel() + 1,
                    totalValueIncrease: effUpgrade.valueIncrease,
                    totalResourceCost: effUpgrade.resourceCost,
                    individualCosts: [{
                        fromLevel: effUpgrade.upgrade.getLevel(),
                        toLevel: effUpgrade.upgrade.getLevel() + 1,
                        cost: effUpgrade.resourceCost,
                        valueIncrease: effUpgrade.valueIncrease
                    }]
                });
            }
        });

        // Calculate average efficiency for each consolidated upgrade and sort
        const consolidatedArray = Array.from(combinedUpgrades.values()).map(combined => ({
            ...combined,
            efficiency: combined.totalValueIncrease / combined.totalResourceCost
        }));

        // Sort by resource type or efficiency
        if (sortByResource) {
            consolidatedArray.sort((a, b) => a.upgrade.getCostType() - b.upgrade.getCostType());
        } else {
            consolidatedArray.sort((a, b) => b.efficiency - a.efficiency);
        }

        return consolidatedArray;
    }, [efficiencyData, consolidateUpgrades]);

    // Calculate total resource costs for all combined upgrades
    const totalResourceCosts = React.useMemo(() => {
        const costs: Record<number, number> = {};

        processedData.forEach(combinedUpgrade => {
            const resourceType = combinedUpgrade.upgrade.getCostType();
            costs[resourceType] = (costs[resourceType] || 0) + combinedUpgrade.totalResourceCost;
        });

        return costs;
    }, [processedData]);

    if (processedData.length === 0) {
        return (
            <Box align="center" pad="medium">
                <Text size="small" color="grey-2">
                    {noResultsText}
                </Text>
            </Box>
        );
    }

    return (
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
                                <Text size="xsmall">{data.upgrade.getName()}</Text>
                            </Box>
                        )
                    },
                    {
                        property: 'targetLevel',
                        header: consolidateUpgrades ? 'Target Level' : 'Level',
                        render: (data: any) => (
                            <Text size="xsmall">
                                {
                                    consolidateUpgrades ? (
                                        <Box direction="row" gap="xsmall">
                                            <Text size="xsmall">+{data.targetLevel - data.currentLevel}</Text>
                                            <Text size="xsmall">({data.currentLevel} → {data.targetLevel})</Text>
                                        </Box>
                                    ) : (
                                        <Text size="xsmall">{data.currentLevel} → {data.targetLevel}</Text>
                                    )
                                }
                            </Text>
                        )
                    },
                    {
                        property: 'totalValueIncrease',
                        header: valueHeader,
                        render: (data: any) => (
                            <Text size="xsmall" color={valueColor}>
                                {formatValue(data.totalValueIncrease)}
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
                                                        <ResourceDisplay
                                                            cost={cost.cost}
                                                            resourceImageData={getResourceImageData(data.upgrade.getCostType())}
                                                            textSize="xsmall"
                                                            showTooltip={false}
                                                        />
                                                        { formatValue(cost.valueIncrease).length > 0 && (
                                                            <Text size="xsmall" color={valueColor}>
                                                                ({formatValue(cost.valueIncrease)})
                                                            </Text>
                                                        )}
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    }
                                    direction={TipDirection.Down}
                                >
                                    <ResourceDisplay
                                        cost={data.totalResourceCost}
                                        canAfford={canAffordResource(data.upgrade.getCostType(), data.totalResourceCost)}
                                        resourceImageData={getResourceImageData(data.upgrade.getCostType())}
                                    />
                                </TipDisplay>
                            ) : (
                                <ResourceDisplay
                                    cost={data.totalResourceCost}
                                    canAfford={canAffordResource(data.upgrade.getCostType(), data.totalResourceCost)}
                                    resourceImageData={getResourceImageData(data.upgrade.getCostType())}
                                />
                            )
                        )
                    }
                ]}
                data={processedData}
                background={{
                    body: ["dark-1", "grey-4"]
                }}
            />
            <Box direction="row" justify="between" align="center" pad={{ horizontal: 'small' }}>
                <Box direction="row" gap="medium" align="center" justify="end" fill>
                    <Text size="small" weight="bold">Total Cost:</Text>
                    <Box direction="row" gap="small">
                        {Object.entries(totalResourceCosts).map(([resourceType, cost]) => {
                            if (cost === 0) return null;
                            const resourceTypeKey = parseInt(resourceType);
                            const canAffordThis = canAffordResource(resourceTypeKey, cost);
                            return (
                                <ResourceDisplay
                                    key={resourceType}
                                    cost={cost}
                                    canAfford={canAffordThis}
                                    resourceImageData={getResourceImageData(resourceTypeKey)}
                                    textSize="small"
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
} 
