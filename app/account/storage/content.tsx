"use client"

import {
    Box,
    Text,
    Heading,
    CheckBox,
    Select,
    ResponsiveContext
} from "grommet"
import { useContext, useState, useMemo } from 'react';
import ShadowBox from "../../../components/base/ShadowBox";
import { Storage } from "../../../data/domain/storage";
import { nFormatter, notUndefined } from "../../../data/utility";
import IconImage from "../../../components/base/IconImage";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import TipDisplay from "../../../components/base/TipDisplay";
import { Item } from "../../../data/domain/items";
import { UpgradeTable } from "../../../components/account/shared/UpgradeTable";
import type { FilterOptions } from "../../../components/account/shared/UpgradeTableFilters";
import useHydrated from "../../../lib/hooks/useHydrated";

type StorageView = 'Stored items' | 'Greenstacks';
type GreenstackFilter = 'Missing' | 'Credited' | 'Unrealistic' | 'All';
type GreenstackRow = {
    id: string;
    item: Item;
    credited: boolean;
    missing: boolean;
    unrealistic: boolean;
    chestAmount: number;
};

const greenstackTarget = 10_000_000;
const greenstackSortOptions = [
    { label: "Default order", value: "default" },
    { label: "Name", value: "name" },
    { label: "Chest amount", value: "amount" }
];

function StorageDisplay() {
    const hydrated = useHydrated();
    const size = useContext(ResponsiveContext);
    const [typeFilter, setTypeFilter] = useState<string>('None');
    const [subTypeFilter, setSubTypeFilter] = useState<string>('None');
    const [grouped, setGrouped] = useState<boolean>(false);
    const [view, setView] = useState<StorageView>('Stored items');
    const [greenstackFilter, setGreenstackFilter] = useState<GreenstackFilter>('Missing');
    const [greenstackType, setGreenstackType] = useState('All');
    const [greenstackFilters, setGreenstackFilters] = useState<FilterOptions>({
        hideLocked: false, hideMaxed: false, searchText: '', sortBy: 'default'
    });
    const { data, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ data: state.data, lastUpdated: state.lastUpdated })
    ));
    const theData = data.getData();
    const storage = theData.get("storage") as Storage;
    const allItems = theData.get("itemsData") as Item[];

    const greenstackItems = useMemo(() => {
        if (!allItems || !storage) return [];

        const eligible = new Set(storage.getEligibleGreenstackItems());
        const missing = new Set(storage.getMissingGreenstackItems());
        const unrealistic = new Set(storage.getUnrealisticGreenstackItems());
        const ids = new Set([...eligible, ...unrealistic]);
        const itemsById = new Map(allItems.map(item => [item.internalName, item]));
        const credited = new Set(storage.creditedGreenStackItems);
        const chestAmounts = new Map<string, number>();
        storage.chest.forEach(item => {
            chestAmounts.set(item.internalName, (chestAmounts.get(item.internalName) ?? 0) + item.count);
        });
        return Array.from(ids).flatMap((id): GreenstackRow[] => {
            const item = itemsById.get(id);
            if (!item) return [];
            return [{
                id, item,
                credited: credited.has(id),
                missing: missing.has(id),
                unrealistic: unrealistic.has(id),
                chestAmount: chestAmounts.get(id) ?? 0
            }];
        });
    }, [allItems, storage, data, lastUpdated]);

    const greenstackTypes = useMemo(
        () => Array.from(new Set(greenstackItems.map(row => row.item.getArchType()))).sort(),
        [greenstackItems]
    );
    const search = greenstackFilters.searchText.trim().toLocaleLowerCase();
    const visibleGreenstacks = greenstackItems.filter(row => {
        if (greenstackFilter === 'Missing' && !row.missing) return false;
        if (greenstackFilter === 'Unrealistic' && !row.unrealistic) return false;
        if (greenstackFilter === 'Credited' && !row.credited) return false;
        if (greenstackType !== 'All' && row.item.getArchType() !== greenstackType) return false;
        return row.item.displayName.toLocaleLowerCase().includes(search);
    }).sort((left, right) => {
        if (greenstackFilters.sortBy === 'name') return left.item.displayName.localeCompare(right.item.displayName);
        if (greenstackFilters.sortBy === 'amount') return right.chestAmount - left.chestAmount;
        return 0;
    });

    const greenstackColumns = [
        {
            property: 'item',
            header: 'Item',
            render: (row: GreenstackRow) => (
                <TipDisplay heading={row.item.displayName}>
                    <Box style={{ opacity: row.credited ? 0.6 : 1 }}>
                        <IconImage data={row.item.getImageData()} scale={row.item.getImageData().width > 36 ? 0.5 : 1} />
                    </Box>
                </TipDisplay>
            )
        },
        {
            property: 'category',
            header: 'Category',
            render: (row: GreenstackRow) => (
                <Text size="small" style={{ opacity: row.credited ? 0.6 : 1 }}>
                    {row.unrealistic ? 'Unrealistic' : 'Eligible'}
                </Text>
            )
        },
        {
            property: 'progress',
            header: 'In chest / 10M',
            render: (row: GreenstackRow) => (
                <Box width="small" gap="xxsmall" style={{ opacity: row.credited ? 0.6 : 1 }}>
                    {row.credited ? <Text size="small">Credited</Text> : (
                        <>
                            <Text size="xsmall" color="accent-2">{nFormatter(row.chestAmount)} / 10M</Text>
                            <Box background="grey-1" height="8px" overflow="hidden"
                                role="progressbar" aria-label={`${row.item.displayName} chest progress`}
                                aria-valuemin={0} aria-valuemax={greenstackTarget}
                                aria-valuenow={Math.min(row.chestAmount, greenstackTarget)}>
                                <Box background="brand" height="8px" flex={false}
                                    style={{ width: `${100 * Math.min(1, row.chestAmount / greenstackTarget)}%` }} />
                            </Box>
                        </>
                    )}
                </Box>
            )
        }
    ];

    const chestItemsToShow = useMemo(() => {
        let filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank") ?? [];
        if (typeFilter != 'None') {
            filteredItems = filteredItems.filter((item) => item.getArchType() == typeFilter);
            if (subTypeFilter != "None") {
                filteredItems = filteredItems.filter((item) => item.type == subTypeFilter);
            }
        }

        return filteredItems;
    }, [storage?.chest, typeFilter, subTypeFilter])

    const storageTypes = useMemo(() => {
        const filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank") ?? [];
        return Array.from(new Set(filteredItems.map(x => x.getArchType())));
    }, [storage?.chest])

    const storageSubTypes = useMemo(() => {
        if (typeFilter == 'None') {
            return [];
        }

        const filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank" && item.getArchType() == typeFilter) ?? [];
        return Array.from(new Set(filteredItems.map(x => x.type)));
    }, [storage?.chest, typeFilter])

    if (!hydrated || !storage || !allItems) {
        return <>Loading Storage data</>;
    }

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Storage</Heading>
            {storage && (
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel label="Greenstacks" component={
                        <Box direction="row" align="center" gap="xxsmall">
                            <IconImage data={{ location: "GreenstackIcon", width: 39, height: 30 }} />
                            <Text size={size == "small" ? "xsmall" : "medium"}>
                                {storage.getGreenstackCount()} / {storage.getEligibleGreenstackCount()}
                            </Text>
                        </Box>
                    } />
                </Box>
            )}
            <ContentTabs
                options={[
                    { value: 'Stored items', label: 'Stored items' },
                    { value: 'Greenstacks', label: 'Greenstacks' }
                ]}
                value={view}
                onChange={setView}
            />
            {view === 'Greenstacks' ? (
                <UpgradeTable
                    tableName="Greenstacks"
                    columns={greenstackColumns}
                    data={visibleGreenstacks}
                    primaryKey="id"
                    filters={greenstackFilters}
                    onFiltersChange={setGreenstackFilters}
                    sortOptions={greenstackSortOptions}
                    searchPlaceholder="Search item name..."
                    showLockedAndMaxedFilters={false}
                    minWidth="700px"
                    variant="panel"
                    pageSize={50}
                    emptyMessage="No greenstacks match these filters."
                    additionalFilters={
                        <>
                            <Box direction="row" gap="small" align="center">
                                <Text size="small">Show:</Text>
                                <Select value={greenstackFilter} options={['Missing', 'Credited', 'Unrealistic', 'All']}
                                    onChange={({ option }) => setGreenstackFilter(option)} />
                            </Box>
                            <Box direction="row" gap="small" align="center">
                                <Text size="small">Type:</Text>
                                <Select value={greenstackType} options={['All', ...greenstackTypes]}
                                    onChange={({ option }) => setGreenstackType(option)} />
                            </Box>
                        </>
                    }
                />
            ) : (
                <>
            <Box pad="small" gap="small">
                <Box>
                    <Text>Filters</Text>
                </Box>
                <Box direction="row" gap="medium">
                    <CheckBox
                        checked={grouped}
                        label="Group by type"
                        onChange={(event) => { setGrouped(event.target.checked); }}
                    />
                    <Select
                        placeholder="Filter by Type"
                        clear
                        value={typeFilter}
                        options={[...storageTypes]}
                        onChange={({ value: nextValue }) => { setTypeFilter(nextValue != '' ? nextValue : 'None'); setSubTypeFilter('None'); }}
                    />
                    {storageSubTypes.length > 0 &&
                        <Select
                            placeholder="Filter by Sub type"
                            clear
                            value={subTypeFilter}
                            options={[...storageSubTypes]}
                            onChange={({ value: nextValue }) => { setSubTypeFilter(nextValue != '' ? nextValue : 'None') }}
                        />
                    }
                </Box>
            </Box>
            {
                grouped ? (typeFilter == "None" ? storageTypes : storageSubTypes).map((type) => {
                    if (chestItemsToShow.filter(x => (typeFilter == "None" ? x.getArchType() : x.type) == type).length == 0) {
                        return undefined;
                    }
                    return (<ShadowBox key={type} background="dark-1" pad="medium" gap="small">
                        <Text>{type}</Text>
                        <Box direction="row" wrap>
                            {
                                chestItemsToShow.filter(x => (typeFilter == "None" ? x.getArchType() : x.type) == type).map((item, index) => (
                                    <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                        <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                            <Box>
                                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                            </Box>
                                            <Text color={item.count > 1e7 ? 'green-1' : ''} size="small">{nFormatter(item.count)}</Text>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>)
                }).filter(notUndefined)
                    :
                    <ShadowBox background="dark-1" pad="medium" gap="small">
                        {typeFilter != "None" && <Text>{subTypeFilter == "None" ? typeFilter : subTypeFilter}</Text>}
                        <Box direction="row" wrap>
                            {
                                chestItemsToShow.map((item, index) => (
                                    <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                        <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                            <Box>
                                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                            </Box>
                                            <Text color={item.count > 1e7 ? 'green-1' : ''} size="small">{nFormatter(item.count)}</Text>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>
            }
                </>
            )}
        </Box>
    )
}

export default StorageDisplay;