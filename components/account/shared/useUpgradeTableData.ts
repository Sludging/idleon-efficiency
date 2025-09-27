import { useMemo } from "react";
import { FilterOptions } from "./UpgradeTableFilters";

export interface BaseUpgradeData {
    name: string;
    level: number;
    maxLevel: number;
    bonus: string;
    nextCost: number;
    goalCost: number;
    type: string;
    maxed: boolean;
    locked: boolean;
    id: number;
    upgrade: any;
}

export interface UpgradeTableData extends BaseUpgradeData {
    resourceType?: string;
    pathIndex?: number;
}

export function useUpgradeTableData<T extends UpgradeTableData>(
    upgrades: T[],
    filters: FilterOptions,
    resourceFilterKey?: keyof T,
    pathFilterKey?: keyof T
) {
    return useMemo(() => {
        if (!upgrades || upgrades.length === 0) return [];

        let data = [...upgrades];

        // Apply filters
        if (filters.hideLocked) {
            data = data.filter(item => !item.locked);
        }
        if (filters.hideMaxed) {
            data = data.filter(item => !item.maxed);
        }
        if (filters.resourceFilter && filters.resourceFilter !== 'All' && resourceFilterKey) {
            data = data.filter(item => item[resourceFilterKey] === filters.resourceFilter);
        }
        if (filters.pathFilter && filters.pathFilter !== 'All' && pathFilterKey) {
            data = data.filter(item => item[pathFilterKey] === filters.pathFilter);
        }
        if (filters.searchText.trim() !== '') {
            const searchLower = filters.searchText.toLowerCase().trim();
            data = data.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                item.bonus.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        data.sort((a, b) => {
            // Always put locked and maxed items at the bottom
            const aIsDisabled = a.locked || a.maxed;
            const bIsDisabled = b.locked || b.maxed;
            
            if (aIsDisabled && !bIsDisabled) return 1;
            if (!aIsDisabled && bIsDisabled) return -1;
            
            // If both have the same disabled status, apply the selected sort criteria
            let sortResult = 0;
            
            if (filters.sortBy === 'cost' && !aIsDisabled) {
                // Only sort by cost for enabled items
                sortResult = a.nextCost - b.nextCost;
            } else if (filters.sortBy === 'path' && 'pathIndex' in a && 'pathIndex' in b) {
                // Sort by path first, then by path index
                if (a.type !== b.type) {
                    sortResult = a.type.localeCompare(b.type);
                } else {
                    sortResult = (a as any).pathIndex - (b as any).pathIndex;
                }
            }
            
            // Fall back to ID sorting if primary sort is equal or for default/disabled items
            return sortResult !== 0 ? sortResult : a.id - b.id;
        });

        return data;
    }, [upgrades, filters, resourceFilterKey]);
} 
