"use client"

import { Box, CheckBox, Text, Select, TextInput } from "grommet";
import { useState } from "react";

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
    searchPlaceholder = "Search name or bonus..."
}: UpgradeTableFiltersProps) {
    const updateFilter = (key: keyof FilterOptions, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <>
            {/* Filter checkboxes and dropdowns */}
            <Box direction="row" gap="medium" margin={{ bottom: 'medium' }} wrap align="center">
                <CheckBox
                    checked={filters.hideLocked}
                    label="Hide locked"
                    onChange={(event) => updateFilter('hideLocked', event.target.checked)}
                />
                <CheckBox
                    checked={filters.hideMaxed}
                    label="Hide maxed"
                    onChange={(event) => updateFilter('hideMaxed', event.target.checked)}
                />

                {resourceFilterLabel && resourceFilterOptions.length > 0 && (
                    <Box direction="row" gap="small" align="center">
                        <Text size="small">{resourceFilterLabel}:</Text>
                        <Select
                            value={filters.resourceFilter || 'All'}
                            options={['All', ...resourceFilterOptions]}
                            onChange={({ option }) => updateFilter('resourceFilter', option)}
                        />
                    </Box>
                )}

                {pathFilterLabel && pathFilterOptions.length > 0 && (
                    <Box direction="row" gap="small" align="center">
                        <Text size="small">{pathFilterLabel}:</Text>
                        <Select
                            value={filters.pathFilter || 'All'}
                            options={['All', ...pathFilterOptions]}
                            onChange={({ option }) => updateFilter('pathFilter', option)}
                        />
                    </Box>
                )}

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
            </Box>

            {/* Search input */}
            <Box>
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
            </Box>
        </>
    );
} 
