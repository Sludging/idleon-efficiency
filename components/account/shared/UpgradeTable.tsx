"use client";

import { Box, DataTable, Text, ThemeContext } from "grommet";
import type { DataTableProps, ThemeType } from "grommet";
import type { ReactNode } from "react";
import { normalizeColor } from "grommet/utils";
import ShadowBox from "../../base/ShadowBox";
import RoundedShadowBox from "../../base/RoundedShadowBox";
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
    variant?: "default" | "panel";
    showLockedAndMaxedFilters?: boolean;
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
    minWidth = "1100px",
    variant = "default",
    showLockedAndMaxedFilters = true
}: UpgradeTableProps<T>) {
    const filterControls = (
        <UpgradeTableFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            sortOptions={sortOptions}
            searchPlaceholder={searchPlaceholder}
            additionalFilters={additionalFilters}
            showLockedAndMaxedFilters={showLockedAndMaxedFilters}
            layout={variant === "panel" ? "toolbar" : "default"}
        />
    );
    const tableContent = data.length === 0 ? (
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
                    background={variant === "panel" ? { body: "dark-1" } : { body: ["dark-1", "grey-4"] }}
                />
            </Box>
        </Box>
    );

    if (variant === "panel") {
        return (
            <Box gap="small">
                {filterControls}
                <RoundedShadowBox
                    background="dark-1"
                    pad="none"
                    gap="none"
                    width="100%"
                    style={{ overflow: "hidden" }}
                >
                    <ThemeContext.Extend
                        value={{
                            dataTable: {
                                body: {
                                    extend: ({ theme }: { theme: ThemeType }) => `
                                        tbody td {
                                            border-bottom: 1px solid ${normalizeColor("grey-1", theme)};
                                            padding: 10px 12px;
                                        }
                                    `
                                },
                                header: {
                                    border: { color: "grey-1", side: "bottom", size: "xsmall" },
                                    font: { size: "14px", weight: "400" },
                                    pad: { horizontal: "small", vertical: "small" }
                                }
                            }
                        }}
                    >
                        {tableContent}
                    </ThemeContext.Extend>
                </RoundedShadowBox>
            </Box>
        );
    }

    return (
        <ShadowBox background="dark-1" pad="medium">
            {filterControls}
            {tableContent}
        </ShadowBox>
    );
}
