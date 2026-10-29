import { Box, CheckBox, Text } from "grommet";
import { useState } from "react";
import { Building } from "../../../data/domain/world-3/construction/buildings";
import { Construction } from "../../../data/domain/world-3/construction/construction";
import { Item } from "../../../data/domain/items";
import { Storage } from "../../../data/domain/storage";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TextAndLabel from "../../base/TextAndLabel";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { StaticTime, TimeDisplaySize } from "../../base/TimeDisplay";
import { UpgradeTable } from "../../account/shared/UpgradeTable";
import type { FilterOptions } from "../../account/shared/UpgradeTableFilters";

const sortOptions = [
    { label: "In-game order", value: "default" },
    { label: "Shortest normal ETA", value: "normalETA" },
    { label: "Shortest trimmed ETA", value: "trimmedETA" }
];

export function BuildingsDisplay() {
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: true,
        searchText: "",
        sortBy: "default"
    });
    const [onlyCurrentlyBuilding, setOnlyCurrentlyBuilding] = useState(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const itemData = theData.get("itemsData") as Item[];
    const storage = theData.get("storage") as Storage;
    const constructionData = theData.get("construction") as Construction;
    const costCruncher = constructionData.buildings.find(building => building.index === 5) as Building;
    const timing = constructionData.bestBuildingTiming;
    const otherTimings = timing
        ? constructionData.buildingTimingComparison.filter(entry => entry.playerID !== timing.playerID)
        : [];
    const otherRatesMatch = otherTimings.length > 1 &&
        otherTimings.every(entry => entry.normalBuildSpeed === otherTimings[0].normalBuildSpeed);
    const search = filters.searchText.trim().toLocaleLowerCase();
    const buildingsToShow = constructionData.buildings.filter(building =>
        (!filters.hideMaxed || !building.maxed) &&
        (!onlyCurrentlyBuilding || building.currentlyBuilding) &&
        building.name.toLocaleLowerCase().includes(search)
    );
    if (filters.sortBy === "normalETA" || filters.sortBy === "trimmedETA") {
        const field = filters.sortBy === "normalETA" ? "normalCompletionSeconds" : "trimmedCompletionSeconds";
        buildingsToShow.sort((left, right) => {
            const leftTime = timing?.buildings[left.index]?.[field] ?? null;
            const rightTime = timing?.buildings[right.index]?.[field] ?? null;
            if (leftTime === null) return rightTime === null ? left.index - right.index : 1;
            if (rightTime === null) return -1;
            return leftTime - rightTime || left.index - right.index;
        });
    }

    const renderCosts = (building: Building, max: boolean) => {
        if (building.maxed) return <Text size="xsmall">—</Text>;
        const costs = max ? building.getMaxLevelCosts(costCruncher) : building.getLevelCosts(building.level, costCruncher);
        return (
            <Box gap="xsmall">
                {costs.map(cost => {
                    const item = itemData?.find(candidate => candidate.internalName === cost.item);
                    if (!item) return null;
                    const amount = storage?.amountInStorage(cost.item) ?? 0;
                    return (
                        <Box key={cost.item} direction="row" align="center" title={item.displayName}>
                            <IconImage data={item.getImageData()} />
                            <Text color={amount > cost.quantity ? "green-1" : "white"} size="xsmall">
                                {nFormatter(cost.quantity)}{max && ` (${nFormatter(amount)})`}
                            </Text>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const renderTime = (seconds: number | null | undefined) => {
        if (seconds == null) return <Text size="xsmall">Unavailable</Text>;
        if (seconds === 0) return <Text size="xsmall">Complete</Text>;
        return <StaticTime fromSeconds={seconds} size={TimeDisplaySize.XSmall} />;
    };

    const columns = [
        {
            property: "name",
            header: "Building",
            render: (building: Building) => (
                <Box direction="row" gap="small" align="center" style={{ minWidth: "160px" }}>
                    <IconImage data={building.getImageData()} scale={0.8} />
                    <Box>
                        <Text size="xsmall" weight={building.currentlyBuilding ? "bold" : "normal"}>{building.name}</Text>
                        {building.currentlyBuilding && (
                            <Text size="xsmall" color="accent-2">
                                {building.currentlyTrimmed ? "Trimmed slot" : "Normal slot"}
                            </Text>
                        )}
                        {!building.unlocked && <Text size="xsmall" color="accent-2">Locked</Text>}
                    </Box>
                </Box>
            )
        },
        {
            property: "level",
            header: "Level",
            render: (building: Building) => <Text size="xsmall">{building.level}/{building.maxLvl}</Text>
        },
        {
            property: "progress",
            header: "Progress",
            render: (building: Building) => building.maxed ? <Text size="xsmall">—</Text> : (
                <Box width="small" gap="xxsmall">
                    <Text size="xsmall">{nFormatter(Math.floor(Math.min(building.currentXP, building.getBuildCost())))}/{nFormatter(Math.floor(building.getBuildCost()))} ({building.buildPercentage}%)</Text>
                    <Box background="grey-1" height="8px" overflow="hidden" role="progressbar"
                        aria-label={`${building.name} construction progress`} aria-valuemin={0}
                        aria-valuemax={building.getBuildCost()}
                        aria-valuenow={Math.max(0, Math.min(building.currentXP, building.getBuildCost()))}>
                        <Box background="brand" height="8px" flex={false} style={{
                            width: `${building.getBuildCost() > 0 ? 100 * Math.max(0, Math.min(1, building.currentXP / building.getBuildCost())) : 0}%`,
                        }} />
                    </Box>
                </Box>
            )
        },
        {
            property: "normalETA",
            header: "Normal ETA",
            render: (building: Building) => building.maxed ? <Text size="xsmall">—</Text> : renderTime(timing?.buildings[building.index]?.normalCompletionSeconds)
        },
        {
            property: "trimmedETA",
            header: "Trimmed ETA",
            render: (building: Building) => building.maxed ? <Text size="xsmall">—</Text> : renderTime(timing?.buildings[building.index]?.trimmedCompletionSeconds)
        },
        { property: "nextCost", header: "Next level costs", render: (building: Building) => renderCosts(building, false) },
        { property: "maxCost", header: "Cost to max level", render: (building: Building) => renderCosts(building, true) }
    ];

    const styledColumns = columns.map(column => ({
        ...column,
        render: (building: Building) => (
            <Box style={{ opacity: !building.unlocked ? 0.6 : building.currentlyBuilding ? 1 : 0.8 }}>
                {column.render(building)}
            </Box>
        )
    }));

    return (
        <Box gap="medium" pad="large">
            <Box direction="row">
                <TextAndLabel label="Total Levels" text={constructionData.buildings.reduce((sum, building) => sum + building.level, 0).toString()} margin={{ right: "medium" }} />
                <TextAndLabel
                    label="Normal Build Rate / hour"
                    text={timing ? nFormatter(timing.normalBuildSpeed) : "Unavailable"}
                    margin={{ right: "medium" }}
                    tooltip={timing && otherTimings.length > 0
                        ? <Box gap="xsmall">
                            <Text size="small">Best: {timing.playerName}</Text>
                            {otherRatesMatch
                                ? <Text size="small">
                                    {otherTimings.length} other characters: {nFormatter(otherTimings[0].normalBuildSpeed)}/hr · {otherTimings[0].lowerBuildRatePercent.toFixed(1)}% lower build rate
                                </Text>
                                : otherTimings.map(entry =>
                                    <Text key={entry.playerID} size="small">
                                        {entry.playerName}: {nFormatter(entry.normalBuildSpeed)}/hr · {entry.lowerBuildRatePercent.toFixed(1)}% lower build rate
                                    </Text>
                                )}
                        </Box>
                        : undefined}
                />
                <TextAndLabel label="Trimmed Build Rate / hour" text={timing ? nFormatter(timing.trimmedBuildSpeed) : "Unavailable"} margin={{ right: "medium" }} />
                <TextAndLabel
                    label="Trimmed slots"
                    text={`${constructionData.trimmedSlotCount}/${constructionData.buildingSlots.length}`}
                    tooltip={
                        <>
                            Minehead: {constructionData.trimmedSlotContributions.minehead}<br />
                            Lab: {constructionData.trimmedSlotContributions.lab}<br />
                            Atom Collider: {constructionData.trimmedSlotContributions.atom}<br />
                            Legend talent: {constructionData.trimmedSlotContributions.legendTalent}<br />
                            Gambit: {constructionData.trimmedSlotContributions.gambit}<br />
                            Event shop: {constructionData.trimmedSlotContributions.eventShop}
                        </>
                    }
                />
            </Box>
            <Text size="small" color="accent-2">
                {timing ? `Rates use ${timing.playerName}'s board. ` : ""}ETAs assume a constant rate in each slot type.
            </Text>
            <UpgradeTable
                tableName="Buildings"
                columns={styledColumns}
                data={buildingsToShow}
                primaryKey="index"
                filters={filters}
                onFiltersChange={setFilters}
                sortOptions={sortOptions}
                searchPlaceholder="Search buildings..."
                showLockedAndMaxedFilters={false}
                additionalFilters={
                    <Box direction="row" gap="small" wrap>
                        <CheckBox checked={filters.hideMaxed} label="Hide max level buildings"
                            onChange={event => setFilters({ ...filters, hideMaxed: event.target.checked })} />
                        <CheckBox checked={onlyCurrentlyBuilding} label="Show only buildings in progress"
                            onChange={event => setOnlyCurrentlyBuilding(event.target.checked)} />
                    </Box>
                }
                variant="panel"
                minWidth="1200px"
            />
        </Box>
    );
}
