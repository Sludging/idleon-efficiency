"use client";

import { Box, Button, Select, Text, TextInput } from "grommet";
import type { DataTableProps } from "grommet";
import { Checkmark, CircleInformation } from "grommet-icons";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ResourceDisplay } from "../../../components/account/shared/ResourceDisplay";
import { UpgradeTable } from "../../../components/account/shared/UpgradeTable";
import type { FilterOptions } from "../../../components/account/shared/UpgradeTableFilters";
import IconImage from "../../../components/base/IconImage";
import { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import TipDisplay from "../../../components/base/TipDisplay";
import { GemPurchase, GemStore } from "../../../data/domain/gemPurchases";
import { Item } from "../../../data/domain/items";
import { commaNotation } from "../../../data/utility";
import useHydrated from "../../../lib/hooks/useHydrated";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

// Native 1.24 hides purchase limits at this cutoff (idleon1.24.txt:483279-483286).
const purchaseLimitDisplayCutoff = 50_000;
const groups = [
    { id: 0, name: "Oddities" },
    { id: 1, name: "Usables" },
    { id: 2, name: "Bonuses" },
];
const gemImage = Item.getImageData("PremiumGem");
const costToMaxHelp = "Gems needed for remaining purchases.";
const initialFilters: FilterOptions = {
    hideLocked: false,
    hideMaxed: false,
    searchText: "",
    sortBy: "default",
};
const sortOptions = [
    { label: "In-game order", value: "default" },
    { label: "Current price (ascending)", value: "price" },
    { label: "Cost to max (ascending)", value: "costToMax" },
];
type CompletionFilter = "All" | "Uncompleted" | "Completed";
type OfferRow = {
    id: number;
    purchase: GemPurchase;
    description: string;
    repeatable: boolean;
    completed: boolean;
    currentPrice: number;
    costToMax: number | undefined;
};

function sectionName(purchase: GemPurchase): string {
    // These two native section images have no text title.
    if (purchase.groupId === 0 && purchase.sectionId === 2) return "Premium Stones";
    if (purchase.groupId === 0 && purchase.sectionId === 5) return "Chat Rings";
    return purchase.section;
}

export default function GemShopContent() {
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);
    const [category, setCategory] = useState("All");
    const [section, setSection] = useState("All");
    const [completion, setCompletion] = useState<CompletionFilter>("All");
    const hydrated = useHydrated();
    const { gems } = useAppDataStore(useShallow(state => ({
        gems: state.data.getData().get("gems") as GemStore | undefined,
        lastUpdated: state.lastUpdated,
    })));

    if (!hydrated || !gems) {
        return <Box><Text>Waiting for imported account data.</Text></Box>;
    }

    const offers = gems.purchases.filter(purchase => purchase.isOffer);
    const categoryId = groups.find(group => group.name === category)?.id;
    const sectionOptions = [...new Set(offers
        .filter(purchase => categoryId === undefined || purchase.groupId === categoryId)
        .map(sectionName))];
    const search = filters.searchText.trim().toLocaleLowerCase();
    const rows = offers
        .filter(purchase => categoryId === undefined || purchase.groupId === categoryId)
        .filter(purchase => section === "All" || sectionName(purchase) === section)
        .map((purchase): OfferRow => {
            const repeatable = purchase.maxPurchases >= purchaseLimitDisplayCutoff;
            return {
                id: purchase.index,
                purchase,
                description: purchase.desc.replace(/_/g, " ").replace(/\s*@\s*/g, " ").trim(),
                repeatable,
                completed: !repeatable && purchase.pucrhased >= purchase.maxPurchases,
                currentPrice: purchase.getCurrentCost(),
                costToMax: repeatable ? undefined : purchase.getCostToMax(),
            };
        })
        .filter(row => completion === "All" || (completion === "Completed" ? row.completed : !row.completed))
        .filter(row => search.length === 0
            || row.purchase.mtxName.toLocaleLowerCase().includes(search)
            || row.description.toLocaleLowerCase().includes(search))
        .sort((left, right) => {
            if (filters.sortBy === "price") return left.currentPrice - right.currentPrice || left.id - right.id;
            if (filters.sortBy === "costToMax") {
                if (left.costToMax === undefined) return right.costToMax === undefined ? left.id - right.id : 1;
                if (right.costToMax === undefined) return -1;
                return left.costToMax - right.costToMax || left.id - right.id;
            }
            return left.id - right.id;
        });
    const columns: NonNullable<DataTableProps<OfferRow>["columns"]> = [
        {
            property: "purchase",
            header: "Offer",
            size: "210px",
            render: row => <Box direction="row" gap="small" align="center"
                data-gem-offer={row.id} data-gem-category={row.purchase.groupId}
                data-gem-section={`${row.purchase.groupId}-${row.purchase.sectionId}`}
                style={{ opacity: row.completed ? 0.6 : 1 }}>
                <IconImage data={row.purchase.getImageData()} scale={0.7} />
                <Text size="xsmall" weight={700}>{row.purchase.mtxName}</Text>
            </Box>,
        },
        {
            property: "description",
            header: "Description",
            size: "40%",
            render: row => <Text size="xsmall" data-gem-description={row.id}
                style={{ opacity: row.completed ? 0.6 : 1, overflowWrap: "anywhere" }}>{row.description}</Text>,
        },
        {
            property: "purchased",
            header: "Purchased",
            size: "140px",
            render: row => <Box gap="xxsmall" data-gem-purchased={row.id} data-gem-completed={row.completed}>
                <Box direction="row" gap="xsmall" align="center">
                    <Text size="xsmall" color={row.completed ? "green-1" : undefined} weight={row.completed ? 700 : 400}>
                        {row.repeatable ? commaNotation(row.purchase.pucrhased)
                            : `${commaNotation(row.purchase.pucrhased)} / ${commaNotation(row.purchase.maxPurchases)}`}
                    </Text>
                    {row.completed && <Checkmark size="small" color="green-1" aria-label="Catalog limit reached" />}
                </Box>
                {row.repeatable && <Text size="xsmall" color="accent-2">Repeatable</Text>}
            </Box>,
        },
        {
            property: "currentPrice",
            header: "Current price",
            size: "140px",
            align: "end",
            render: row => <Box data-gem-price={row.id} style={{ opacity: row.completed ? 0.6 : 1 }}>
                <ResourceDisplay cost={row.currentPrice} resourceImageData={gemImage} textSize="xsmall" showTooltip={false} />
            </Box>,
        },
        {
            property: "costToMax",
            header: <Box direction="row" gap="xxsmall" align="center">
                <Text size="small">Cost to max</Text>
                <TipDisplay heading="Cost to max" body={costToMaxHelp} maxWidth="300px">
                    <CircleInformation size="small" />
                </TipDisplay>
            </Box>,
            size: "140px",
            align: "end",
            render: row => <Box data-gem-cost-to-max={row.id}>
                {row.costToMax === undefined ? <Text size="xsmall">—</Text>
                    : <ResourceDisplay cost={row.costToMax} resourceImageData={gemImage} textSize="xsmall" showTooltip={false} />}
            </Box>,
        },
    ];
    const hasFilters = category !== "All" || section !== "All" || completion !== "All"
        || filters.searchText.length > 0 || filters.sortBy !== "default";

    return <Box gap="medium" data-gem-shop>
        <Box direction="row" justify="between" align="end" gap="medium">
            <ComponentAndLabel label="Gems" component={gems.gemBalance === undefined
                ? <Text size="large" data-gem-balance>Unavailable</Text>
                : <Box direction="row" gap="small" align="center" data-gem-balance>
                    <IconImage data={gemImage} scale={0.7} />
                    <Text size="xxlarge">{commaNotation(gems.gemBalance)}</Text>
                </Box>} />
            <Text size="small" color="accent-2" data-gem-offer-count>{rows.length} / {offers.length} offers</Text>
        </Box>
        <UpgradeTable<OfferRow>
            tableName="Gem Shop offers"
            columns={columns}
            data={rows}
            primaryKey="id"
            filters={filters}
            onFiltersChange={setFilters}
            sortOptions={[]}
            showSearch={false}
            showLockedAndMaxedFilters={false}
            emptyMessage="No offers match these filters."
            minWidth="1000px"
            variant="panel"
            additionalFilters={<Box id="gem-shop-filters" gap="small">
                <Box direction="row" wrap gap="small" align="end">
                    <Box width="320px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Search</Text>
                        <TextInput id="gem-shop-search" aria-label="Search names or descriptions"
                            placeholder="Search names or descriptions..." value={filters.searchText}
                            onChange={event => setFilters({ ...filters, searchText: event.target.value })} />
                    </Box>
                    <Box width="280px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Sort by</Text>
                        <Select id="gem-shop-sort" aria-label="Sort by" value={filters.sortBy}
                            options={sortOptions} labelKey="label" valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setFilters({ ...filters, sortBy: value })} />
                    </Box>
                </Box>
                <Box direction="row" wrap gap="small" align="end">
                    <Box width="180px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Category</Text>
                        <Select id="gem-shop-category" aria-label="Category" value={category}
                            options={["All", ...groups.map(group => group.name)]}
                            onChange={({ option }) => { setCategory(option); setSection("All"); }} />
                    </Box>
                    <Box width="280px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">World / section</Text>
                        <Select id="gem-shop-section" aria-label="World / section" value={section}
                            options={["All", ...sectionOptions]} onChange={({ option }) => setSection(option)} />
                    </Box>
                    <Box width="180px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Completion</Text>
                        <Select id="gem-shop-completion" aria-label="Completion" value={completion}
                            options={["All", "Uncompleted", "Completed"]} onChange={({ option }) => setCompletion(option)} />
                    </Box>
                    {hasFilters && <Button id="gem-shop-clear-filters" plain
                        label={<Text size="small" color="brand">Clear filters</Text>}
                        onClick={() => {
                            setFilters(initialFilters);
                            setCategory("All");
                            setSection("All");
                            setCompletion("All");
                        }} />}
                </Box>
            </Box>}
        />
    </Box>;
}
