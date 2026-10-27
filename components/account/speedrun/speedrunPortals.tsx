"use client";

import { Box, Select, Text, TextInput } from "grommet";
import { CircleInformation, Search } from "grommet-icons";
import { useState } from "react";
import type { MapDataBase } from "../../../data/domain/data/MapDataRepo";
import type { EnemyData } from "../../../data/domain/enemies";
import type { SpeedrunCombatEstimate, SpeedrunPortalComparison, SpeedrunRunner } from "../../../data/domain/speedrun";
import { notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay from "../../base/TipDisplay";
import { UpgradeTable } from "../shared/UpgradeTable";
import type { FilterOptions } from "../shared/UpgradeTableFilters";

type PortalRow = SpeedrunPortalComparison & {
    id: string;
    mapName: string;
    enemy: EnemyData;
};

type PortalGoal = "all" | "normalOneKill" | "radiusOneKillOnly" | "radiusReducesKills";

const goalOptions: { value: PortalGoal; label: string }[] = [
    { value: "all", label: "All portals" },
    { value: "normalOneKill", label: "One kill normally" },
    { value: "radiusOneKillOnly", label: "One kill only with Radius" },
    { value: "radiusReducesKills", label: "Radius reduces kills" },
];

function compareKills(left: number | undefined, right: number | undefined): number {
    if (left === undefined) return right === undefined ? 0 : 1;
    if (right === undefined) return -1;
    return left - right;
}

export function SpeedrunPortals({ runner, maps, enemies }: {
    runner: SpeedrunRunner;
    maps: ReadonlyMap<number, MapDataBase>;
    enemies: ReadonlyMap<string, EnemyData>;
}) {
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default",
    });
    const [world, setWorld] = useState(0);
    const [goal, setGoal] = useState<PortalGoal>("all");
    const worldOptions = [
        { value: 0, label: "All worlds" },
        ...Array.from(new Set(runner.portalComparisons.map(row => row.world)))
            .sort((left, right) => left - right)
            .map(value => ({ value, label: `World ${value}` })),
    ];
    const query = filters.searchText.trim().toLocaleLowerCase();
    const portalCounts = new Map<number, number>();
    for (const row of runner.portalComparisons) {
        portalCounts.set(row.mapId, (portalCounts.get(row.mapId) ?? 0) + 1);
    }
    const rows: PortalRow[] = runner.portalComparisons
        .filter(row => world === 0 || row.world === world)
        .filter(row => {
            switch (goal) {
                case "normalOneKill":
                    return row.normal.killsNeeded === 1;
                case "radiusOneKillOnly":
                    return runner.radiusAvailable && row.radius.killsNeeded === 1 && row.normal.killsNeeded !== 1;
                case "radiusReducesKills":
                    return runner.radiusAvailable && row.radius.killsNeeded !== undefined
                        && (row.normal.killsNeeded === undefined || row.radius.killsNeeded < row.normal.killsNeeded);
                default:
                    return true;
            }
        })
        .map(row => ({
            ...row,
            id: `${row.mapId}:${row.portalIndex}`,
            mapName: maps.get(row.mapId)!.data.map.name,
            enemy: enemies.get(row.enemyId)!,
        }))
        .filter(row => !query || row.mapName.toLocaleLowerCase().includes(query))
        .sort((left, right) => {
            let comparison = 0;
            if (filters.sortBy === "normalKills") {
                comparison = compareKills(left.normal.killsNeeded, right.normal.killsNeeded);
            } else if (filters.sortBy === "radiusKills") {
                comparison = compareKills(left.radius.killsNeeded, right.radius.killsNeeded);
            }
            return comparison || left.mapId - right.mapId || left.portalIndex - right.portalIndex;
        });

    const estimateText = (row: PortalRow, estimate: SpeedrunCombatEstimate, radius = false) => (
        <Text size="small" style={{ opacity: row.locked ? 0.6 : 1, fontVariantNumeric: "tabular-nums" }}>
            {radius && !runner.radiusAvailable ? "Not learned"
                : estimate.killsNeeded === undefined ? "Out of reach" : notateNumber(estimate.killsNeeded, "Big")}
        </Text>
    );
    const radiusKillsHeading = (
        <TipDisplay
            heading="Void Radius"
            body={`This comparison uses the ${runner.voidRadiusDurationSeconds}s Radius buff. It does not predict how many monsters each cast hits.`}
            maxWidth="360px"
        >
            <Box direction="row" align="center" gap="xsmall">
                <Text size="small">Radius kills needed</Text>
                <CircleInformation size="small" />
            </Box>
        </TipDisplay>
    );
    const columns = [
        {
            property: "mapName",
            header: "Map",
            render: (row: PortalRow) => (
                <TipDisplay
                    heading="Portal details"
                    body={
                        <Box gap="small">
                            {row.locked && <Text size="small">More characters must clear this first door. After this character clears it, {row.clearedCharacters} of {row.requiredCharacters} characters qualify.</Text>}
                            <Text size="small">Base portal requirement: {notateNumber(row.requiredKills, "Big")} credited kills.</Text>
                            <Text size="small">Normal: {notateNumber(row.normal.portalProgressPerKill, "Smaller")} portal credit per defeated monster.</Text>
                            {runner.radiusAvailable && <Text size="small">Radius: {notateNumber(row.radius.portalProgressPerKill, "Smaller")} portal credit per defeated monster.</Text>}
                        </Box>
                    }
                    maxWidth="390px"
                >
                    <Box direction="row" gap="small" align="center" style={{ minWidth: "260px", opacity: row.locked ? 0.6 : 1 }}>
                        <IconImage data={row.enemy.getImageData()} />
                        <Box gap="xxsmall">
                            <Text size="small">{row.mapName}</Text>
                            <Text size="xsmall" color="accent-2">
                                World {row.world}{portalCounts.get(row.mapId)! > 1 && ` · Portal ${row.portalIndex + 1}`}
                            </Text>
                        </Box>
                    </Box>
                </TipDisplay>
            ),
        },
        {
            property: "normalKills",
            header: "Normal kills needed",
            render: (row: PortalRow) => estimateText(row, row.normal),
        },
        {
            property: "radiusKills",
            header: radiusKillsHeading,
            render: (row: PortalRow) => estimateText(row, row.radius, true),
        },
    ];

    return (
        <Box gap="small">
            <Text size="small" color="accent-2">
                Kills needed counts defeated monsters, not attacks. Normal excludes Void Radius; the Radius comparison includes its buff.
            </Text>
            <Text size="xsmall" color="accent-2">
                Radius comparisons use its {runner.voidRadiusDurationSeconds}s buff, not the whole run. Dimmed doors need more characters to clear them.
            </Text>
            <UpgradeTable<PortalRow>
                tableName="Speedrun portal comparisons"
                columns={columns}
                data={rows}
                primaryKey="id"
                filters={filters}
                onFiltersChange={setFilters}
                sortOptions={[
                    { label: "World and map", value: "default" },
                    { label: "Normal kills needed", value: "normalKills" },
                    { label: "Radius kills needed", value: "radiusKills" },
                ]}
                showLockedAndMaxedFilters={false}
                showSearch={false}
                additionalFilters={
                    <>
                        <Box width="300px">
                            <TextInput
                                aria-label="Search maps"
                                placeholder="Search map"
                                icon={<Search size="small" />}
                                value={filters.searchText}
                                onChange={event => setFilters({ ...filters, searchText: event.target.value })}
                            />
                        </Box>
                        <Box width="180px">
                            <Select
                                aria-label="World"
                                options={worldOptions}
                                labelKey="label"
                                valueKey={{ key: "value", reduce: true }}
                                value={world}
                                onChange={({ value }) => setWorld(value)}
                            />
                        </Box>
                        <Box width="280px">
                            <Select
                                aria-label="Portal goal"
                                options={goalOptions}
                                labelKey="label"
                                valueKey={{ key: "value", reduce: true }}
                                value={goal}
                                onChange={({ value }) => setGoal(value)}
                            />
                        </Box>
                    </>
                }
                emptyMessage="No portals match these filters. Try another goal, world, or search."
                minWidth="650px"
                variant="panel"
            />
        </Box>
    );
}
