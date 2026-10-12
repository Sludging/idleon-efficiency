"use client";

import { Box, DataTable, Text } from "grommet";
import type { DataTableProps } from "grommet";
import type { ReactNode } from "react";
import ShadowBox from "../../base/ShadowBox";
import { UpgradeTableFilters } from "./UpgradeTableFilters";
import type { FilterOptions } from "./UpgradeTableFilters";

export interface UpgradeTableProps<T> {
    tableName: string;
    columns: NonNullable<DataTableProps<T>["columns"]>;
    data: NonNullable<DataTableProps<T>["data"]>;
    primaryKey: NonNullable<DataTableProps<T>["primaryKey"]>;
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    sortOptions: Array<{ label: string; value: string }>;
    searchPlaceholder?: string;
    additionalFilters?: ReactNode;
    emptyMessage?: string;
    minWidth?: string;
}

export function UpgradeTable<T>({
    tableName,
    columns,
    data,
    primaryKey,
    filters,
    onFiltersChange,
    sortOptions,
    searchPlaceholder,
    additionalFilters,
    emptyMessage = "No upgrades match these filters. Try changing the filters or search.",
    minWidth = "1100px"
}: UpgradeTableProps<T>) {
    return (
        <ShadowBox background="dark-1" pad="medium">
            <UpgradeTableFilters
                filters={filters}
                onFiltersChange={onFiltersChange}
                sortOptions={sortOptions}
                searchPlaceholder={searchPlaceholder}
                additionalFilters={additionalFilters}
            />
            {data.length === 0 ? (
                <Box pad={{ vertical: "medium" }}>
                    <Text size="small">{emptyMessage}</Text>
                </Box>
            ) : (
                <Box style={{ overflowX: "auto" }}>
                    <Box style={{ minWidth }}>
                        <DataTable<T>
                            aria-label={tableName}
                            fill
                            columns={columns}
                            data={data}
                            step={data.length}
                            primaryKey={primaryKey}
                            background={{ body: ["dark-1", "grey-4"] }}
                        />
                    </Box>
                </Box>
            )}
        </ShadowBox>
    );
}
