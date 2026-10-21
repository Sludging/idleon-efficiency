"use client"

import { Box, CheckBox, Text, Select, TextInput } from "grommet";
import type { ReactNode } from "react";

export interface FilterOptions {
    hideLocked: boolean;
    hideMaxed: boolean;
    searchText: string;
    sortBy: string;
    resourceFilter?: string;
    pathFilter?: string;
    resourceFilterOptions?: string[];
    sortOptions?: Array<{ label: string; value: string }>;
}

interface UpgradeTableFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    resourceFilterLabel?: string;
    resourceFilterOptions?: string[];
    pathFilterLabel?: string;
    pathFilterOptions?: string[];
    sortOptions?: Array<{ label: string; value: string }>;
    searchPlaceholder?: string;
    additionalFilters?: ReactNode;
    layout?: "default" | "toolbar";
    showLockedAndMaxedFilters?: boolean;
    showSearch?: boolean;
}

export function UpgradeTableFilters({
    filters,
    onFiltersChange,
    resourceFilterLabel,
    resourceFilterOptions = [],
    pathFilterLabel,
    pathFilterOptions = [],
    sortOptions = [
        { label: 'Cost (ascending)', value: 'cost' },
        { label: 'Default Order', value: 'default' }
    ],
    searchPlaceholder = "Search name or bonus...",
    additionalFilters,
    layout = "default",
    showLockedAndMaxedFilters = true,
    showSearch = true
}: UpgradeTableFiltersProps) {
    const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    const leftControls = [
        showLockedAndMaxedFilters ? (
            <CheckBox
                key="hide-locked"
                checked={filters.hideLocked}
                label="Hide locked"
                onChange={(event) => updateFilter('hideLocked', event.target.checked)}
            />
        ) : null,
        showLockedAndMaxedFilters ? (
            <CheckBox
                key="hide-maxed"
                checked={filters.hideMaxed}
                label="Hide maxed"
                onChange={(event) => updateFilter('hideMaxed', event.target.checked)}
            />
        ) : null,
        resourceFilterLabel && resourceFilterOptions.length > 0 ? (
            <Box key="resource-filter" direction="row" gap="small" align="center">
                <Text size="small">{resourceFilterLabel}:</Text>
                <Select
                    value={filters.resourceFilter || 'All'}
                    options={['All', ...resourceFilterOptions]}
                    onChange={({ option }) => updateFilter('resourceFilter', option)}
                />
            </Box>
        ) : null,
        pathFilterLabel && pathFilterOptions.length > 0 ? (
            <Box key="path-filter" direction="row" gap="small" align="center">
                <Text size="small">{pathFilterLabel}:</Text>
                <Select
                    value={filters.pathFilter || 'All'}
                    options={['All', ...pathFilterOptions]}
                    onChange={({ option }) => updateFilter('pathFilter', option)}
                />
            </Box>
        ) : null
    ];
    const sortControl = sortOptions.length > 1 ? (
        <Box direction="row" gap="small" align="center">
            <Text size="small">Sort by:</Text>
            <Select
                value={filters.sortBy}
                options={sortOptions}
                labelKey="label"
                valueKey={{ key: 'value', reduce: true }}
                onChange={({ value }) => updateFilter('sortBy', value)}
            />
        </Box>
    ) : null;
    const searchControl = (
        <Box direction="row" gap="small" align="center">
            <Text size="small">Search:</Text>
            <TextInput
                placeholder={searchPlaceholder}
                value={filters.searchText}
                onChange={(event) => updateFilter('searchText', event.target.value)}
                size="small"
                style={{ width: '200px' }}
            />
        </Box>
    );

    if (layout === "toolbar") {
        return (
            <Box
                direction="row"
                justify="between"
                gap="small"
                margin={{ bottom: "small" }}
                pad={{ bottom: "small" }}
                border={{ side: "bottom", color: "grey-1", size: "xsmall" }}
                wrap
                align="center"
            >
                <Box direction="row" gap="medium" wrap align="center">
                    {leftControls}
                    {additionalFilters}
                </Box>
                <Box direction="row" gap="medium" wrap align="center">
                    {showSearch && searchControl}
                    {sortControl}
                </Box>
            </Box>
        );
    }

    return (
        <>
            {/* Filter checkboxes and dropdowns */}
            <Box direction="row" gap="medium" margin={{ bottom: 'medium' }} wrap align="center">
                {leftControls}
                {additionalFilters}
                {sortControl}
            </Box>

            {showSearch && (
                <Box>
                    {/* Search input */}
                    {searchControl}
                </Box>
            )}
        </>
    );
}
