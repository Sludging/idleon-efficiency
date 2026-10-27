"use client";

import { Box, Button, Select, SelectMultiple, Text, TextInput } from "grommet";
import type { DataTableProps } from "grommet";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import type { Account } from "../../../data/domain/account";
import { BUNDLE_CATALOG, calculateBundleTableTotals, getBundleRewardCategories } from "../../../data/domain/bundleCatalog";
import type { BundleAmountTotals, BundleCatalogEntry, BundleCategory, BundleRewardCategory, BundleTableTotals } from "../../../data/domain/bundleCatalog";
import type { BundleOwnershipState } from "../../../data/domain/bundleOwnership";
import type { Companion } from "../../../data/domain/companions";
import { Item } from "../../../data/domain/items";
import { commaNotation, nFormatter } from "../../../data/utility";
import useHydrated from "../../../lib/hooks/useHydrated";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import { UpgradeTable } from "../shared/UpgradeTable";
import type { FilterOptions } from "../shared/UpgradeTableFilters";
import BundleArtworkViewer from "./BundleArtworkViewer";

const categoryOptions: readonly { value: BundleCategory; label: string }[] = [
    { value: "bundle", label: "Bundles" },
    { value: "petMart", label: "Pet Mart" },
    { value: "starterOffer", label: "Starter Pack" },
];
const summaryLabels: Record<BundleCategory, string> = {
    bundle: "Owned bundles",
    petMart: "Owned packs",
    starterOffer: "Owned starter offer",
};
const initialFilters: FilterOptions = {
    hideLocked: false,
    hideMaxed: false,
    searchText: "",
    sortBy: "default",
};
const gemImage = Item.getImageData("PremiumGem");
const petCrystalImage = { location: "PetCrystals", width: 28, height: 28 };
type OwnershipFilter = "All" | "Owned" | "Missing";
const rewardOptions: { value: BundleRewardCategory; label: string }[] = [
    { value: "petCrystals", label: "Pet Crystals" },
    { value: "equipment", label: "Equipment" },
    { value: "bonuses", label: "Bonuses" },
    { value: "pets", label: "Pets" },
    { value: "items", label: "Items" },
    { value: "gems", label: "Gems" },
    { value: "otherResources", label: "Other resources" },
];
type BundleRow = {
    nativeId: string;
    entry: BundleCatalogEntry;
    ownership: BundleOwnershipState;
};

function IncludedCurrencies({ entry }: { entry: BundleCatalogEntry }) {
    const hasCurrencies = entry.gems !== null || entry.petCrystals !== null;

    if (!hasCurrencies) return <Text size="xsmall" color="accent-2">{entry.name === null ? "Unknown" : "Not shown"}</Text>;

    return <Box gap="small">
        {entry.gems && <Box gap="xxsmall">
            <Box direction="row" gap="xsmall" align="center">
                <IconImage data={gemImage} scale={0.7} />
                <Text size="xsmall">
                    {nFormatter(entry.gems.delivery === "daily-total" && entry.gems.dailyAmount !== undefined
                        ? entry.gems.dailyAmount : entry.gems.amount)}{" "}
                    {entry.gems.delivery === "daily-total" && entry.gems.dailyAmount !== undefined ? "Gems/day" : "Gems"}
                </Text>
            </Box>
            {entry.gems.delivery === "daily-total" && <Text size="xsmall" color="accent-2">
                {entry.gems.durationDays !== undefined ? `${entry.gems.durationDays} days; ` : ""}
                {commaNotation(entry.gems.amount)} Gems total
            </Text>}
        </Box>}
        {entry.petCrystals && <Box direction="row" gap="xsmall" align="center">
            <IconImage data={petCrystalImage} scale={0.9} />
            <Text size="xsmall">{nFormatter(entry.petCrystals.amount)} Pet Crystals</Text>
        </Box>}
    </Box>;
}

function IncludedContents({ entry, companions }: { entry: BundleCatalogEntry; companions: Companion[] }) {
    if (entry.contents.length === 0 && entry.pets.length === 0 && entry.otherCurrencies.length === 0) {
        return <Text size="xsmall" color="accent-2">{entry.name === null ? "Unknown reward" : "Not shown"}</Text>;
    }

    return <Box gap="xsmall">
        {entry.pets.map((pet, index) => {
            const image = companions.find(companion => companion.id === pet.companionIndex)?.imageData
                ?? { location: pet.imageLocation, width: 67, height: 67 };
            return <Box direction="row" gap="xsmall" align="center" key={`pet-${index}`}>
                {pet.imageAvailable === true && <IconImage data={image} scale={32 / image.width} />}
                <Text size="xsmall">{pet.name}</Text>
            </Box>;
        })}
        {entry.contents.map((content, index) => <Box direction="row" gap="xsmall" align="center" key={`content-${index}`}>
            {content.itemId && content.imageAvailable !== false
                && <IconImage data={Item.getImageData(content.itemId)} scale={0.7} />}
            <Box gap="xxsmall" background={content.name === "Unknown reward" ? "dark-3" : undefined}
                round="xsmall" pad={content.name === "Unknown reward" ? { horizontal: "xsmall" } : undefined}>
                <Text size="xsmall" style={{ overflowWrap: "anywhere" }}>
                    {content.quantity !== null ? `${commaNotation(content.quantity)} × ` : ""}{content.name}
                </Text>
                {content.detail && <Text size="xsmall" color="accent-2" style={{ overflowWrap: "anywhere" }}>
                    {content.detail}
                </Text>}
            </Box>
        </Box>)}
        {entry.otherCurrencies.map((reward, index) => <Box gap="xxsmall" key={`resource-${index}`}>
            <Box direction="row" align="center" gap="xsmall">
                {reward.amount !== null && <Text size="xsmall">{commaNotation(reward.amount)} ×</Text>}
                <Box background={reward.name === null ? "dark-3" : undefined} round="xsmall"
                    pad={reward.name === null ? { horizontal: "xsmall" } : undefined}>
                    <Text size="xsmall" color={reward.name === null ? "accent-2" : undefined}>{reward.name ?? "Unknown reward"}</Text>
                </Box>
            </Box>
            {reward.detail && <Text size="xsmall" color="accent-2">{reward.detail}</Text>}
        </Box>)}
    </Box>;
}

function BundleSelectionTotals({ totals }: { totals: BundleTableTotals }) {
    const alternatives = totals.mode === "alternatives";
    const amountText = (amount: BundleAmountTotals, price = false) => {
        const format = (value: number) => price ? value.toFixed(2) : commaNotation(value);
        if (amount.knownCount === 0) return "No known amount";
        if (!alternatives) return format(amount.total!);
        return amount.minimum === amount.maximum ? format(amount.minimum!)
            : `${format(amount.minimum!)}–${format(amount.maximum!)}`;
    };
    const unknownNotes = [
        totals.unknownPriceCount > 0 ? `${totals.unknownPriceCount} unknown ${totals.unknownPriceCount === 1 ? "price" : "prices"}` : "",
        ...totals.currencies.filter(currency => currency.unknownCount > 0).map(currency =>
            `${currency.currency}: ${currency.unknownCount} unknown ${currency.unknownCount === 1 ? "amount" : "amounts"}`),
        totals.unknownRewardCount > 0 ? `${totals.unknownRewardCount} ${totals.unknownRewardCount === 1 ? "offer with" : "offers with"} unknown rewards` : "",
    ].filter(Boolean);

    return <Box gap="xsmall" data-bundle-selection-totals>
        <Text size="small" weight={700}>
            Visible offers · {alternatives ? "Known offer ranges" : "Known totals"}
        </Text>
        {totals.entryCount === 0 ? <Text size="small" color="accent-2">Known total: 0. No visible offers.</Text>
            : <Box direction="row" wrap gap="medium">
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Advertised prices</Text>
                    <Text size="small">{totals.prices.length === 0 ? "No known price"
                        : totals.prices.map(price => `${price.symbol}${amountText(price, true)}`).join(" + ")}</Text>
                </Box>
                {totals.currencies.filter(currency => currency.knownCount > 0).map(currency => <Box
                    gap="xxsmall" key={currency.currency}>
                    <Text size="xsmall" color="accent-2">{currency.currency}</Text>
                    <Text size="small">{amountText(currency)}</Text>
                    {currency.scheduledSubtotal && <Text size="xsmall" color="accent-2">
                        Includes {amountText(currency.scheduledSubtotal)} from daily grants
                    </Text>}
                </Box>)}
            </Box>}
        {unknownNotes.length > 0 && <Text size="xsmall" color="accent-2">{unknownNotes.join(". ")}.</Text>}
        {alternatives && <Text size="xsmall" color="accent-2">
            Choose one Starter Pack variant. These ranges compare visible offers; their rewards and prices do not add together.
        </Text>}
    </Box>;
}

export default function BundlesContent() {
    const [category, setCategory] = useState<BundleCategory>("bundle");
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);
    const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>("All");
    const [rewardFilter, setRewardFilter] = useState<BundleRewardCategory[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<BundleCatalogEntry | null>(null);
    const hydrated = useHydrated();
    const { account, companions } = useAppDataStore(useShallow(state => ({
        account: state.data.getData().get("account") as Account | undefined,
        companions: state.data.getData().get("companions") as Companion[] | undefined,
        lastUpdated: state.lastUpdated,
    })));

    if (!hydrated || !account) {
        return <Box><Text>Waiting for imported account data.</Text></Box>;
    }

    const summary = account.bundles.getCategorySummary(category);
    const entries = BUNDLE_CATALOG.filter(entry => entry.category === category);
    const search = filters.searchText.trim().toLocaleLowerCase();
    const rows = entries
        .map((entry): BundleRow => ({ nativeId: entry.nativeId, entry, ownership: account.bundles.getOwnership(entry.nativeId) }))
        .filter(row => ownershipFilter === "All"
            || (ownershipFilter === "Owned" ? row.ownership === "owned" : row.ownership === "unowned"))
        .filter(row => !search || [
            row.entry.name ?? "",
            row.nativeId,
            ...row.entry.contents.flatMap(content => [content.name, content.detail ?? ""]),
            ...row.entry.pets.map(pet => pet.name),
            ...row.entry.otherCurrencies.map(currency => currency.name ?? ""),
        ].some(value => value.toLocaleLowerCase().includes(search)))
        .filter(row => {
            if (rewardFilter.length === 0) return true;
            const categories = getBundleRewardCategories(row.entry);
            return rewardFilter.some(reward => categories.has(reward));
        });
    const totals = calculateBundleTableTotals(rows.map(row => row.entry));
    const columns: NonNullable<DataTableProps<BundleRow>["columns"]> = [
        {
            property: "nativeId",
            header: "Bundle",
            size: "200px",
            render: row => <Box gap="xsmall" data-bundle-id={row.nativeId} data-bundle-ownership={row.ownership}
                aria-label={row.ownership === "unknown" ? undefined
                    : `${row.entry.name ?? "Unknown bundle"}, ${row.ownership === "owned" ? "owned" : "missing"}`}>
                <Box gap="xxsmall" style={{ opacity: row.ownership === "unowned" ? 0.6 : 1 }}>
                    <Text size="xsmall" weight={700}>{row.entry.name ?? "Unknown bundle"}</Text>
                </Box>
                {row.ownership === "unknown" && <Text size="xsmall" color="accent-2">Unknown</Text>}
            </Box>,
        },
        {
            property: "price",
            header: "Advertised price",
            size: "130px",
            render: row => <Box gap="xxsmall" style={{ opacity: row.ownership === "unowned" ? 0.6 : 1 }}>
                {row.entry.price ? <>
                    <Text size="xsmall" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {row.entry.price.symbol}{row.entry.price.amount.toFixed(2)}
                    </Text>
                    {row.entry.price.crossedOutAmount !== undefined && <Text size="xsmall" color="accent-2">
                        <s>{row.entry.price.symbol}{row.entry.price.crossedOutAmount.toFixed(2)}</s>
                    </Text>}
                </> : <Text size="xsmall" color="accent-2">Unknown</Text>}
            </Box>,
        },
        {
            property: "currencies",
            header: "Currencies",
            size: "230px",
            render: row => <Box style={{ opacity: row.ownership === "unowned" ? 0.6 : 1 }}>
                <IncludedCurrencies entry={row.entry} />
            </Box>,
        },
        {
            property: "contents",
            header: "Pets, items & benefits",
            size: "40%",
            render: row => <Box style={{ opacity: row.ownership === "unowned" ? 0.6 : 1 }}>
                <IncludedContents entry={row.entry} companions={companions ?? []} />
            </Box>,
        },
        ...(entries.some(entry => entry.artwork !== null) ? [{
            property: "artwork",
            header: "Bundle image",
            size: "130px",
            render: (row: BundleRow) => row.entry.artwork !== null
                ? <Button plain onClick={() => setSelectedEntry(row.entry)}
                    aria-label={`View bundle image for ${row.entry.name ?? "Unknown bundle"}`}
                    label={<Text size="xsmall" color="brand">View bundle image</Text>} />
                : null,
        }] : []),
    ];
    const hasFilters = filters.searchText.length > 0 || ownershipFilter !== "All" || rewardFilter.length > 0;

    return <Box gap="medium" data-bundles>
        <Box direction="row" wrap justify="between" align="end" gap="small">
            <ComponentAndLabel label={summaryLabels[category]} component={summary.unknownCount > 0
                ? <Text size="large" data-bundle-summary>Ownership unavailable</Text>
                : <Text size="xxlarge" data-bundle-summary>{summary.ownedCount} / {summary.totalCount}</Text>} />
            <Text size="small" color="accent-2" data-bundle-row-count>{rows.length} / {entries.length} entries</Text>
        </Box>
        {summary.unknownCount > 0 && <Text size="small" color="accent-2">
            This save does not share bundle receipts. Unknown entries are not confirmed missing.
        </Text>}
        <Box gap="small">
            <ContentTabs options={categoryOptions} value={category} onChange={setCategory} />
            {category === "starterOffer" && <Text size="small" color="accent-2">
                One Starter Pack family, with three alternative offers.
            </Text>}
            <UpgradeTable<BundleRow>
                tableName={`${categoryOptions.find(option => option.value === category)!.label} catalog`}
                columns={columns} data={rows} primaryKey="nativeId"
                filters={filters} onFiltersChange={setFilters} sortOptions={[]}
                showSearch={false} showLockedAndMaxedFilters={false} variant="panel" minWidth="1050px"
                emptyMessage="No entries match these filters. Change or clear the filters."
                additionalFilters={<Box gap="small">
                    <Box direction="row" wrap gap="small" align="end">
                    <Box width="320px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Search</Text>
                        <TextInput id="bundles-search" aria-label="Search names or contents"
                            placeholder="Search names or contents..." value={filters.searchText}
                            onChange={event => setFilters({ ...filters, searchText: event.target.value })} />
                    </Box>
                    <Box width="180px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Ownership</Text>
                        <Select id="bundles-ownership" aria-label="Filter ownership" value={ownershipFilter}
                            options={["All", "Owned", "Missing"]} onChange={({ option }) => setOwnershipFilter(option)} />
                    </Box>
                    <Box width="260px" gap="xxsmall" flex={false} style={{ maxWidth: "100%" }}>
                        <Text size="xsmall" color="accent-2">Rewards (any selected)</Text>
                        <SelectMultiple id="bundles-rewards" aria-label="Filter rewards"
                            placeholder="All rewards" options={rewardOptions} labelKey="label"
                            valueKey={{ key: "value", reduce: true }} value={rewardFilter}
                            onChange={({ value }) => setRewardFilter(value)} />
                    </Box>
                    {hasFilters && <Button plain onClick={() => {
                        setFilters(initialFilters); setOwnershipFilter("All"); setRewardFilter([]);
                    }}
                        label={<Text size="small" color="brand">Clear filters</Text>} />}
                    </Box>
                    <BundleSelectionTotals totals={totals} />
                </Box>}
            />
        </Box>
        {selectedEntry && <BundleArtworkViewer entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
    </Box>;
}
