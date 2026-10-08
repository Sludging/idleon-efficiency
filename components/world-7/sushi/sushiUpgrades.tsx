"use client";

import { useState } from "react";
import { Box, Text } from "grommet";
import IconImage from "../../base/IconImage";
import { UpgradeTable } from "../../account/shared/UpgradeTable";
import type { FilterOptions } from "../../account/shared/UpgradeTableFilters";
import { SushiUpgrade } from "../../../data/domain/world-7/sushiUpgrade";
import { notateNumber } from "../../../data/utility";
import { sushiBucksImage } from "./sushiImages";

type SushiUpgradeRow = {
    id: number;
    upgrade: SushiUpgrade;
    displayOrder: number;
    level: number;
    nextCost: number | undefined;
    currentEffect: string;
    nextEffect: string | undefined;
    locked: boolean;
    maxed: boolean;
};

const sortOptions = [
    { label: "In-game order", value: "default" },
    { label: "Name", value: "name" },
    { label: "Level", value: "level" },
    { label: "Next cost", value: "nextCost" }
];

export const SushiUpgrades = ({ upgrades, bucks }: { upgrades: SushiUpgrade[]; bucks: number }) => {
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default"
    });

    const rows: SushiUpgradeRow[] = upgrades
        .filter(upgrade => upgrade.index !== 45)
        .map(upgrade => {
            const maxed = upgrade.isMaxed();
            return {
                id: upgrade.index,
                upgrade,
                displayOrder: upgrade.data.displayOrder,
                level: upgrade.level,
                nextCost: maxed ? undefined : upgrade.getCost(upgrade.level),
                currentEffect: upgrade.getDescription(upgrade.level),
                nextEffect: maxed ? undefined : upgrade.getDescription(upgrade.level + 1),
                locked: !upgrade.isUnlocked(),
                maxed
            };
        });

    const search = filters.searchText.trim().toLocaleLowerCase();
    const displayedRows = rows
        .filter(row => {
            if (filters.hideLocked && row.locked) return false;
            if (filters.hideMaxed && row.maxed) return false;
            if (!search) return true;
            return `${row.upgrade.data.name} ${row.currentEffect} ${row.nextEffect ?? ""}`
                .toLocaleLowerCase()
                .includes(search);
        })
        .sort((left, right) => {
            let comparison = 0;
            switch (filters.sortBy) {
                case "name":
                    comparison = left.upgrade.data.name.localeCompare(right.upgrade.data.name);
                    break;
                case "level":
                    comparison = left.level - right.level;
                    break;
                case "nextCost":
                    if (left.nextCost === undefined) comparison = right.nextCost === undefined ? 0 : 1;
                    else if (right.nextCost === undefined) comparison = -1;
                    else comparison = left.nextCost - right.nextCost;
                    break;
                default:
                    break;
            }
            return comparison || left.displayOrder - right.displayOrder || left.id - right.id;
        });

    const columns = [
        {
            property: "name",
            header: "Upgrade",
            render: (row: SushiUpgradeRow) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: row.locked ? 0.5 : 1, minWidth: "180px" }}>
                    <IconImage data={row.upgrade.getImageData()} scale={0.5} />
                    <Text size="xsmall">{row.upgrade.data.name}</Text>
                </Box>
            )
        },
        {
            property: "level",
            header: "Level",
            render: (row: SushiUpgradeRow) => (
                <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>
                    {row.upgrade.data.maxLevel >= 9999
                        ? notateNumber(row.level, "Big")
                        : `${notateNumber(row.level, "Big")}/${notateNumber(row.upgrade.data.maxLevel, "Big")}`}
                </Text>
            )
        },
        {
            property: "currentEffect",
            header: "Current effect",
            render: (row: SushiUpgradeRow) => (
                <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>{row.currentEffect}</Text>
            )
        },
        {
            property: "nextEffect",
            header: "Next effect",
            render: (row: SushiUpgradeRow) => (
                <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>{row.nextEffect ?? "—"}</Text>
            )
        },
        {
            property: "nextCost",
            header: "Next cost",
            render: (row: SushiUpgradeRow) => {
                if (row.nextCost === undefined) {
                    return <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>—</Text>;
                }
                const canAfford = !row.locked && bucks >= row.nextCost;
                return (
                    <Box gap="xsmall" style={{ opacity: row.locked ? 0.5 : 1, whiteSpace: "nowrap" }}>
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={sushiBucksImage} scale={0.5} />
                            <Text style={{ fontSize: "14px" }} color={row.locked ? undefined : canAfford ? "green-1" : "red"}>
                                {notateNumber(row.nextCost, "Big")} Bucks
                            </Text>
                        </Box>
                        {row.locked && <Text size="xsmall">Needs previous upgrade</Text>}
                    </Box>
                );
            }
        }
    ];

    return (
        <UpgradeTable
            tableName="Sushi upgrades"
            filters={filters}
            onFiltersChange={setFilters}
            sortOptions={sortOptions}
            searchPlaceholder="Search upgrade or effect..."
            columns={columns}
            data={displayedRows}
            primaryKey="id"
        />
    );
};
