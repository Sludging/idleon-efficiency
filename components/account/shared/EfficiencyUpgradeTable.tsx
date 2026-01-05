"use client"

import { Box, DataTable, Text } from "grommet";
import { useState } from "react";
import { UpgradeTableFilters, FilterOptions } from "./UpgradeTableFilters";
import { useUpgradeTableData, UpgradeTableData } from "./useUpgradeTableData";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { ResourceDisplay } from "./ResourceDisplay";
import { EfficiencyUpgrade } from "../../../lib/efficiencyEngine/efficiencyEngine";
import { CompassUpgrade } from "../../../data/domain/compass";

const isCompassUpgrade = (x: EfficiencyUpgrade): x is CompassUpgrade => "indexInPath" in x

interface EfficiencyUpgradeTableProps<T extends UpgradeTableData> {
    // Data and configuration
    upgradeData: T[];

    // Filter configuration
    resourceFilterLabel?: string;
    resourceFilterOptions?: string[];
    pathFilterLabel?: string;
    pathFilterOptions?: string[];
    sortOptions?: Array<{ label: string; value: string }>;
    searchPlaceholder?: string;

    // Data filtering keys
    resourceFilterKey?: keyof T;
    pathFilterKey?: keyof T;

    // Domain-specific functions
    getResourceImageData: (upgrade: any) => any;
    canAffordUpgrade: (upgrade: any, cost?: number) => boolean;
    getDescription: (upgrade: any) => string;
    tooltipHeading?: string;
}

export function EfficiencyUpgradeTable<T extends UpgradeTableData>({
    upgradeData,
    resourceFilterLabel,
    resourceFilterOptions = [],
    pathFilterLabel,
    pathFilterOptions = [],
    sortOptions = [
        { label: 'Cost (ascending)', value: 'cost' },
        { label: 'Default Order', value: 'default' }
    ],
    searchPlaceholder = "Search name or bonus...",
    resourceFilterKey,
    pathFilterKey,
    getResourceImageData,
    canAffordUpgrade,
    getDescription,
    tooltipHeading = "Exact Resource Count"
}: EfficiencyUpgradeTableProps<T>) {

    // Manage filter state internally
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: true,
        hideMaxed: true,
        searchText: '',
        sortBy: 'cost',
        resourceFilter: 'All'
    });

    // Apply filters and sorting
    const filteredAndSortedData = useUpgradeTableData(upgradeData, filters, resourceFilterKey, pathFilterKey);

    // All path upgrades use stardust to unlock,
    // so cheat this by getting a stardust upgrade
    const starDustUpgrade = upgradeData.find(tableUpgrade => tableUpgrade.upgrade.getCostType() === 0)!.upgrade;

    // Define columns using EfficiencyUpgrade interface
    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (data: any) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: data.locked ? 0.5 : 1 }}>
                    <IconImage data={data.upgrade.getImageData()} scale={0.4} />
                    <Text size="xsmall">{data.upgrade.getName()}</Text>
                </Box>
            )
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: any) => (
                <Text size="xsmall">{`${data.upgrade.getLevel()}${data.upgrade.getMaxLevel() >= 999999 ? '' : `/${data.upgrade.getMaxLevel()}`}`}</Text>
            )
        },
        {
            property: 'bonus',
            header: 'Bonus',
            render: (data: any) => (
                <Text size="xsmall">{getDescription(data.upgrade)}</Text>
            )
        },
        {
            property: 'nextCost',
            header: 'Next Cost',
            render: (data: any) => {
                if (data.upgrade.getLevel() >= data.upgrade.getMaxLevel()) {
                    return <Text size="xsmall">-</Text>;
                }

                // For locked compass upgrades, show the first level cost
                if (!data.upgrade.isUnlocked()) {
                    return (
                        <Box style={{ opacity: 0.7 }}>
                            <TipDisplay
                                heading="First Level Cost"
                                body={
                                    <Text size="small">Cost for the first level of this upgrade after unlocking</Text>
                                }
                                direction={TipDirection.Down}
                            >
                                <ResourceDisplay
                                    cost={data.nextCost}
                                    canAfford={false} // Always show as unaffordable since it's locked
                                    resourceImageData={getResourceImageData(data.upgrade)}
                                />
                            </TipDisplay>
                        </Box>
                    );
                }

                return (
                    <ResourceDisplay
                        cost={data.nextCost}
                        canAfford={canAffordUpgrade(data.upgrade)}
                        resourceImageData={getResourceImageData(data.upgrade)}
                        tooltipHeading={tooltipHeading}
                    />
                );
            }
        },
        {
            property: 'goalCost',
            header: 'Goal Cost',
            render: (data: any) => {
                if (data.upgrade.getLevel() >= data.upgrade.getMaxLevel()) {
                    return <Text size="small">-</Text>;
                }

                // For locked upgrades, show the cost to unlock
                if (!data.upgrade.isUnlocked()) {
                    // If the upgrade has a unlock requirement, show the cost to unlock
                    if (data.upgrade.getUnlockRequirement()) {
                        const unlockReq = data.upgrade.getUnlockRequirement();
                        return (
                            <Text size="xsmall" color="grey-2">
                                Unlock at {unlockReq}
                            </Text>
                        );
                    }

                    // If the upgrade is a compass upgrade, show the cost to unlock
                    if (isCompassUpgrade(data.upgrade)) {
                        const compassUpgrade = data.upgrade as CompassUpgrade;
                        if (compassUpgrade.costToUnlock === 0) {
                            return <Text size="xsmall">Kill Abom</Text>;
                        }

                        return (
                            <TipDisplay
                                heading="Cost to Unlock"
                                body={
                                    <Text size="small">Cost to level up the path upgrade to unlock this upgrade</Text>
                                }
                                direction={TipDirection.Down}
                            >
                                <ResourceDisplay
                                    cost={data.goalCost}
                                    canAfford={canAffordUpgrade(compassUpgrade, data.goalCost)}
                                    resourceImageData={getResourceImageData(starDustUpgrade)}
                                />
                            </TipDisplay>
                        );
                    }
                }

                // For unlocked upgrades, show cost to max or 10 levels
                const tooltipText = data.upgrade.getMaxLevel() >= 999999
                    ? "Cost for the next 10 levels"
                    : "Cost to reach maximum level";

                return (
                    <TipDisplay
                        heading={data.upgrade.getMaxLevel() >= 999999 ? "Cost for 10 Levels" : "Cost to Max"}
                        body={
                            <Text size="small">{tooltipText}</Text>
                        }
                        direction={TipDirection.Down}
                    >
                        <ResourceDisplay
                            cost={data.goalCost}
                            canAfford={canAffordUpgrade(data.upgrade, data.goalCost)}
                            resourceImageData={getResourceImageData(data.upgrade)}
                            tooltipHeading={tooltipHeading}
                        />
                    </TipDisplay>
                );
            }
        }
    ];

    return (
        <ShadowBox background="dark-1" pad="medium">
            <UpgradeTableFilters
                filters={filters}
                onFiltersChange={setFilters}
                resourceFilterLabel={resourceFilterLabel}
                resourceFilterOptions={resourceFilterOptions}
                pathFilterLabel={pathFilterLabel}
                pathFilterOptions={pathFilterOptions}
                sortOptions={sortOptions}
                searchPlaceholder={searchPlaceholder}
            />

            <DataTable
                fill
                columns={columns}
                data={filteredAndSortedData}
                primaryKey="id"
                background={{
                    body: ["dark-1", "grey-4"]
                }}
            />
        </ShadowBox>
    );
} 
