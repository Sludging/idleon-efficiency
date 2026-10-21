import { useState } from "react";
import { Box, Text } from "grommet";
import type { DataTableProps } from "grommet";
import IconImage from "../../base/IconImage";
import { UpgradeTable } from "../../account/shared/UpgradeTable";
import type { FilterOptions } from "../../account/shared/UpgradeTableFilters";
import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import { JellyOperator, JellyOperatorUpgrade } from "../../../data/domain/world-7/jellyOperator";
import { commaNotation } from "../../../data/utility";

type JellyUpgradeRow = {
    id: number;
    upgrade: JellyOperatorUpgrade;
    description: string;
    locked: boolean;
    maxed: boolean;
    flavor: boolean;
    unlimited: boolean;
};

const sortOptions = [
    { label: "In-game order", value: "default" },
    { label: "Name", value: "name" },
    { label: "Level", value: "level" }
];

export function JellyUpgrades({ jelly }: { jelly: JellyOperator }) {
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default"
    });

    const search = filters.searchText.trim().toLocaleLowerCase();
    const rows = jelly.upgrades
        .map((upgrade): JellyUpgradeRow => {
            const flavor = upgrade.data.maxLevel === 0;
            return {
                id: upgrade.index,
                upgrade,
                description: upgrade.getDescription(),
                locked: !upgrade.isAvailable(),
                maxed: !flavor && upgrade.isMaxed(),
                flavor,
                unlimited: upgrade.data.maxLevel > 998
            };
        })
        .filter(row => !filters.hideLocked || !row.locked)
        .filter(row => !filters.hideMaxed || !row.maxed)
        .filter(row => search.length === 0
            || row.upgrade.data.name.toLocaleLowerCase().includes(search)
            || row.description.toLocaleLowerCase().includes(search))
        .sort((left, right) => {
            if (filters.sortBy === "name") {
                return left.upgrade.data.name.localeCompare(right.upgrade.data.name)
                    || left.upgrade.data.displayIndex - right.upgrade.data.displayIndex;
            }
            if (filters.sortBy === "level") {
                return right.upgrade.level - left.upgrade.level
                    || left.upgrade.data.displayIndex - right.upgrade.data.displayIndex;
            }
            return left.upgrade.data.displayIndex - right.upgrade.data.displayIndex;
        });

    const columns: NonNullable<DataTableProps<JellyUpgradeRow>['columns']> = [
        {
            property: "upgrade",
            header: "Upgrade",
            size: "190px",
            render: (row: JellyUpgradeRow) => (
                <Box direction="row" gap="small" align="center" style={{ opacity: row.locked || row.flavor ? 0.6 : 1, minWidth: "180px" }}>
                    <IconImage data={row.upgrade.getImageData()} scale={0.6} />
                    <Text size="xsmall" weight={700}>{row.upgrade.data.name}</Text>
                </Box>
            )
        },
        {
            property: "level",
            header: "Level",
            size: "130px",
            render: (row: JellyUpgradeRow) => (
                <Text size="xsmall" style={{ opacity: row.locked || row.flavor ? 0.6 : 1 }}>
                    {row.flavor
                        ? "—"
                        : row.unlimited
                            ? commaNotation(row.upgrade.level)
                            : `${commaNotation(row.upgrade.level)} / ${commaNotation(row.upgrade.data.maxLevel)}`}
                </Text>
            )
        },
        {
            property: "description",
            header: "Effect",
            size: "40%",
            render: (row: JellyUpgradeRow) => (
                <Text size="xsmall" style={{ whiteSpace: "pre-line", opacity: row.locked || row.flavor ? 0.6 : 1, minWidth: "300px" }}>
                    {row.description}
                </Text>
            )
        },
        {
            property: "cost",
            header: "Next / unlock cost",
            size: "180px",
            align: "end",
            render: (row: JellyUpgradeRow) => {
                if (row.flavor || row.maxed) {
                    return <Text size="xsmall" style={{ opacity: row.locked ? 0.6 : 1 }}>{row.maxed ? "Maxed" : "Not purchasable"}</Text>;
                }

                return (
                    <Box style={{ opacity: row.locked ? 0.6 : 1 }}>
                        <ResourceDisplay
                            cost={row.upgrade.getUpgradeCost()}
                            resourceImageData={JellyOperator.getBloodcellImageData()}
                            resourceImageScale={0.75}
                            textSize="xsmall"
                            canAfford={!row.locked && jelly.canAffordUpgrade(row.upgrade.index)}
                            showTooltip
                        />
                    </Box>
                );
            }
        }
    ];

    return (
        <UpgradeTable
            tableName="Jelly Operator upgrades"
            columns={columns}
            data={rows}
            primaryKey="id"
            filters={filters}
            onFiltersChange={setFilters}
            sortOptions={sortOptions}
            searchPlaceholder="Search upgrades or effects..."
            minWidth="850px"
            variant="panel"
        />
    );
}
