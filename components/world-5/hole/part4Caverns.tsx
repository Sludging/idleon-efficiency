import { Box, CheckBox, DataTable, Select, Text, ThemeContext } from "grommet";
import type { ReactNode } from "react";
import { useContext, useState } from "react";
import { normalizeColor } from "grommet/utils";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import ContentTabs from "../../base/ContentTabs";
import CoinsDisplay from "../../coinsDisplay";
import BitsDisplay from "../../bitsDisplay";
import { Item } from "../../../data/domain/items";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import type { ImageData } from "../../../data/domain/imageData";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, getCoinsArray, notateNumber, toTime } from "../../../data/utility";

import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import { UpgradeTable } from "../../account/shared/UpgradeTable";
import type { FilterOptions } from "../../account/shared/UpgradeTableFilters";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

function value(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${notateNumber(amount)}${suffix}`;
}

function exact(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${amount.toLocaleString("en-US", { maximumFractionDigits: 20 })}${suffix}`;
}
function percentage(amount: number): string {
    return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(amount * 100)}%`;
}
function factor(amount: number): string {
    return `${notateNumber(amount, "MultiplierInfo").replace("#", "")}×`;
}


function Section({ title, children }: { title: string; children: ReactNode }) {
    return <Box gap="small"><Text size="medium" weight={500}>{title}</Text>{children}</Box>;
}

function resourceImage(hole: Hole, name: string): ImageData | undefined {
    if (name === "Atoms") return AtomCollider.getParticleImageData();
    if (name === "Bits") return Item.getImageData("Bits");
    if (name === "Coins") return Item.getImageData("Coins1");
    if (name === "Turquoise Rupie") return hole.currencies[25].getImageData() ?? undefined;
    return hole.currencies.find(entry => entry.data.name === name)?.getImageData() ?? undefined;
}
function fountainCurrencyImage(hole: Hole, index: number): ImageData | undefined {
    if (index === 0) return { location: "HoleFountainCoin0", width: 39, height: 32 };
    return hole.currencies[30 + index]?.getImageData() ?? undefined;
}

function GameCard({ title, image, children, testId, inactive = false, headerRight }: { title: string; image?: ImageData; children: ReactNode; testId?: string; inactive?: boolean; headerRight?: ReactNode }) {
    return <RoundedShadowBox background="dark-1" pad="none" gap="none" overflow="hidden" data-testid={testId} style={inactive ? { opacity: 0.6 } : undefined}>
        <Box direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: "medium", vertical: "small" }} style={{ minWidth: 0 }}>
            <Box direction="row" gap="small" align="center" style={{ minWidth: 0, flex: "1 1 auto" }}>
                {image && <IconImage data={image} scale={0.8} />}
                <Text size="small" weight={500} style={{ overflowWrap: "anywhere" }}>{title}</Text>
            </Box>
            {headerRight}
        </Box>
        <Box pad="medium" gap="small">{children}</Box>
    </RoundedShadowBox>;
}
function JarView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const jar = hole.jar;
    const study = hole.studies[10];
    const theme = useContext(ThemeContext);
    const [collectibleFilters, setCollectibleFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default"
    });
    const [selectedTab, setSelectedTab] = useState<"Jar types" | "Collectibles">("Jar types");
    const [showAll, setShowAll] = useState(false);
    const nextTypeCostImage = jar.ownedTypeCount < jar.holdings.length
        ? jar.getHoldingImageData(jar.ownedTypeCount)
        : undefined;
    const jarTypeCards = jar.jarTypes
        .filter(type => showAll || type.jarsPerHour > 0)
        .map(type => {
            const producing = type.jarsPerHour > 0;
            const nextType = type.index === jar.ownedTypeCount + 1;
            const cost = !type.unlocked && nextType && jar.nextTypeCost !== null
                ? jar.nextTypeCost
                : null;
            return { type, producing, cost };
        });
    const collectibleData = jar.jarBonuses.map((bonus, index) => ({
        id: index,
        bonus,
        level: bonus.level,
        effect: bonus.level === 0
            ? bonus.getFirstDiscoveryDescription(jar.rupieValue)
            : bonus.getDescription(jar.rupieValue),
        name: bonus.data.name.replace(/_/g, " ")
    }));
    const collectibleQuery = collectibleFilters.searchText.trim().toLocaleLowerCase();
    const visibleCollectibles = collectibleData
        .filter(({ name, effect }) => !collectibleQuery || `${name} ${effect}`.toLocaleLowerCase().includes(collectibleQuery))
        .sort((left, right) => {
            const comparison = collectibleFilters.sortBy === "level-asc"
                ? left.level - right.level
                : collectibleFilters.sortBy === "level-desc"
                    ? right.level - left.level
                    : 0;
            return comparison || left.id - right.id;
        });
    return <Box gap="medium" data-testid="hole-jars-details">
        <Section title="Jar holdings">
            <Box direction="row" gap="small" wrap data-testid="jar-wallets">
                {jar.holdings.map((balance, index) => {
                    const image = jar.getHoldingImageData(index);
                    return <Box
                        key={index}
                        data-testid={`jar-wallet-${index}`}
                        direction="row"
                        gap="xsmall"
                        align="center"
                        pad="xsmall"
                        background="dark-1"
                    >
                        {image && <IconImage data={image} scale={0.7} />}
                        <Text size="xsmall">{value(balance)}</Text>
                    </Box>;
                })}
            </Box>
        </Section>

        <Box gap="medium">
            <ContentTabs
                options={[
                    { value: "Jar types", label: "Jar types" },
                    { value: "Collectibles", label: "Collectibles" },
                ]}
                value={selectedTab}
                onChange={setSelectedTab}
            />
            {selectedTab === "Jar types"
                ? <Section title="Production">
                    <CheckBox
                        checked={showAll}
                        label={<Text size="small">Show all</Text>}
                        onChange={event => setShowAll(event.target.checked)}
                    />
                    <Text size="xsmall">
                        Board occupancy: {jar.boardCount}/{jar.boardCapacity} jars
                    </Text>
                    {jarTypeCards.length === 0
                        ? <Text size="small" color="accent-2">No Jar types producing.</Text>
                        : <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                            {jarTypeCards.map(({ type, producing, cost }) => (
                                <RoundedShadowBox
                                    key={type.index}
                                    background="dark-1"
                                    pad="medium"
                                    gap="small"
                                    data-testid={`jar-type-${type.index}`}
                                    style={{
                                        border: `1px solid ${producing ? normalizeColor("brand", theme) : normalizeColor("grey-1", theme)}`,
                                        minWidth: 0,
                                    }}
                                >
                                    <Box direction="row" gap="small" align="center">
                                        <IconImage data={type.getImageData()} scale={0.8} />
                                        <Box gap="xxsmall" style={{ minWidth: 0 }}>
                                            <Text size="small" weight={500}>{type.data.name.replace(/_/g, " ")}</Text>
                                            <Text size="xsmall">{`${notateNumber(type.jarsPerHour)} jars/hr`}</Text>
                                            <Text size="xsmall">On board: {type.boardCount}</Text>
                                            <Text size="xsmall">Quantity: {commaNotation(type.quantity)}</Text>
                                            {producing && <Text size="xsmall" color="brand">Producing</Text>}
                                        </Box>
                                    </Box>
                                    {type.unlocked === false && <Box gap="xxsmall">
                                        <Text size="xsmall" color="accent-2">Locked</Text>
                                        {cost !== null && <Box direction="row" gap="xsmall" align="center">
                                            {nextTypeCostImage && <IconImage data={nextTypeCostImage} scale={0.65} />}
                                            <Text size="xsmall">Unlock cost: {notateNumber(cost)}</Text>
                                        </Box>}
                                    </Box>}
                                </RoundedShadowBox>
                            ))}
                        </Box>}
                </Section>
                : <Section title="Collectibles">
                    <UpgradeTable
                        tableName="Jar collectibles"
                        columns={[
                            {
                                property: "name",
                                header: "Collectible",
                                render: (row: typeof collectibleData[number]) => (
                                    <Box direction="row" gap="small" align="center" style={{ opacity: row.level === 0 ? 0.65 : 1, minWidth: "180px" }}>
                                        <IconImage data={row.bonus.getImageData()} scale={0.5} />
                                        <Text size="xsmall">{row.name}</Text>
                                    </Box>
                                )
                            },
                            {
                                property: "level",
                                header: "Level",
                                render: (row: typeof collectibleData[number]) => (
                                    <Text size="xsmall" style={{ opacity: row.level === 0 ? 0.65 : 1 }}>
                                        {row.level}
                                    </Text>
                                )
                            },
                            {
                                property: "effect",
                                header: "Effect",
                                render: (row: typeof collectibleData[number]) => (
                                    <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{row.effect}</Text>
                                )
                            }
                        ]}
                        data={visibleCollectibles}
                        primaryKey="id"
                        filters={collectibleFilters}
                        onFiltersChange={setCollectibleFilters}
                        sortOptions={[
                            { label: "In-game order", value: "default" },
                            { label: "Level ascending", value: "level-asc" },
                            { label: "Level descending", value: "level-desc" }
                        ]}
                        searchPlaceholder="Search collectible or effect..."
                        emptyMessage="No collectibles match this search."
                        showLockedAndMaxedFilters={false}
                        variant="panel"
                    />
                </Section>}
        </Box>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}


function FountainView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const fountain = hole.fountain;
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default",
    });
    const [color, setColor] = useState<"All" | "Blue" | "Yellow" | "Green">("All");
    const [tab, setTab] = useState<"Resources" | "Upgrades">("Resources");
    const pageNames = ["Blue", "Yellow", "Green"] as const;
    const study = hole.studies[15];
    const opalCost = fountain.getOpalCost();
    const opalCurrencyImage = fountainCurrencyImage(hole, opalCost.currencyId);
    const query = filters.searchText.trim().toLocaleLowerCase();
    const upgrades = fountain.upgradesInUnlockOrder
        .filter(upgrade => color === "All" || upgrade.data.waterIndex === pageNames.indexOf(color))
        .filter(upgrade => {
            const effect = upgrade.getDescription(fountain) ?? "";
            return !query || `${upgrade.data.name} ${effect}`.toLocaleLowerCase().includes(query);
        });
    const currencyColumns = [
        {
            property: "currency",
            header: "Resource",
            render: (currency: typeof fountain.currencies[number]) => {
                const desire = fountain.desireCurrencyId === currency.index;
                const currencyImage = fountainCurrencyImage(hole, currency.index);
                return <Box direction="row" gap="small" align="center"
                    data-desire={String(desire)}
                    style={desire ? { border: "1px solid #0376E3", padding: "4px" } : { padding: "4px" }}>
                    {currencyImage
                        ? <IconImage data={currencyImage} scale={0.7} />
                        : <Text size="xsmall">Currency unavailable</Text>}
                    <Text size="xsmall" weight={desire ? 700 : undefined}>{currency.data.name.replace(/_/g, " ")}</Text>
                </Box>;
            }
        },
        { property: "balance", header: "Balance", render: (currency: typeof fountain.currencies[number]) => <Text size="xsmall">{value(currency.wallet)}</Text> },
        { property: "collection", header: "On collection", render: (currency: typeof fountain.currencies[number]) => <Text size="xsmall">{value(fountain.getCollectionValue(currency.index))}</Text> }
    ];

    return <Box gap="medium" data-testid="hole-fountain-details">
        <Box gap="medium" direction="row">
            <Section title="Collection">
                <Box direction="row" gap="small" align="center" wrap pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }} fill>
                    <Box gap="xxsmall" pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Occupied / capacity</Text>
                        <Text size="large" weight={500}>{value(fountain.getOccupiedSpaceCount())} / {value(fountain.getCapacity())}</Text>
                    </Box>
                    <Box direction="row" gap="medium" wrap>
                        <Box gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Royal occupied stacks</Text>
                            <Text size="small">{fountain.stacks.filter(stack => stack.items.length > 0 && stack.royal).length}</Text>
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Royal chance</Text>
                            <Text size="small">{percentage(fountain.getRoyalChance())}</Text>
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Duck chance</Text>
                            <Text size="small">{percentage(fountain.getDuckChance())}</Text>
                        </Box>
                    </Box>
                </Box>
            </Section>
            <Box direction="row" gap="large" wrap>
                <Section title="Marbles">
                    <Box direction="row" gap="xsmall" align="center" pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }} fill>
                        <IconImage data={{ location: "HoleFountainMarble", width: 30, height: 23 }} scale={0.45} />
                        <Text size="small">{value(fountain.marbleCount)}</Text>
                        <Text size="xsmall" color="accent-2">Yield: {value(fountain.getMarbleYield())}</Text>
                    </Box>
                </Section>
                <Section title="Opals">
                    <Box direction="row" gap="xsmall" align="center" fill>
                        <IconImage data={Item.getImageData("Opal")} scale={0.65} />
                        <Text size="xsmall">Earned: {value(fountain.opalProgress)}</Text>
                        <Text size="xsmall" color="accent-2">Next cost:</Text>
                        {opalCurrencyImage
                            ? <IconImage data={opalCurrencyImage} scale={0.65} />
                            : <Text size="xsmall">Currency unavailable</Text>}
                        <Text size="xsmall">{notateNumber(opalCost.amount)}</Text>
                    </Box>
                </Section>
            </Box>
        </Box>
        <ContentTabs
            options={[{ value: "Resources", label: "Resources" }, { value: "Upgrades", label: "Upgrades" }]}
            value={tab}
            onChange={setTab}
        />
        {tab === "Resources" && <Box data-testid="fountain-wallets" style={{ overflowX: "auto" }}>
            <DataTable
                aria-label="Fountain resources"
                columns={currencyColumns}
                data={fountain.currencies}
                primaryKey="index"
                step={fountain.currencies.length}
            />
        </Box>}
        {tab === "Upgrades" && <Box gap="small">
            <UpgradeTable
                tableName="Fountain upgrades"
                columns={[
                    {
                        property: "name",
                        header: "Upgrade",
                        render: (row: typeof upgrades[number]) => {
                            const unlocked = row.isUnlocked(fountain.upgrades);
                            const prerequisite = row.data.prerequisiteIndex < 0 ? undefined
                                : fountain.upgrades.find(upgrade => upgrade.data.waterIndex === row.data.waterIndex
                                    && upgrade.data.index === row.data.prerequisiteIndex);
                            return <Box gap="xxsmall" style={{ opacity: unlocked ? 1 : 0.6, minWidth: "190px" }}>
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={{ location: `HoleFountainUpg${row.data.waterIndex}_${row.data.index}`, width: 53, height: 53 }} scale={0.55} />
                                    <Text size="xsmall">{row.data.name.replace(/_/g, " ")}</Text>
                                </Box>
                                {!unlocked && prerequisite && <Text size="xsmall">{prerequisite.data.name.replace(/_/g, " ")}</Text>}
                            </Box>;
                        }
                    },
                    {
                        property: "level",
                        header: "Level",
                        render: (row: typeof upgrades[number]) => <Text size="xsmall">{value(row.level)}</Text>
                    },
                    {
                        property: "effect",
                        header: "Effect",
                        render: (row: typeof upgrades[number]) => {
                            const description = row.getDescription(fountain);
                            return <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{description ?? ""}</Text>;
                        }
                    },
                    {
                        property: "cost",
                        header: "Cost",
                        render: (row: typeof upgrades[number]) => {
                            const currencyImage = fountainCurrencyImage(hole, row.data.costCurrencyIndex);
                            return <Box direction="row" gap="xsmall" align="center" style={{ minWidth: "100px" }}>
                                {currencyImage && <IconImage data={currencyImage} scale={0.65} />}
                                <Text size="xsmall" color={fountain.canAffordUpgrade(row.data.waterIndex, row.data.index) ? "green-1" : undefined}>
                                    {value(row.getCost())}
                                </Text>
                            </Box>;
                        }
                    },
                    {
                        property: "marbleization",
                        header: "Marbleization",
                        render: (row: typeof upgrades[number]) => row.data.marbleizeEligible
                            ? <Box direction="row" gap="xsmall" align="center">
                                <Text size="xsmall">Lv. {value(row.marbleizationLevel)}</Text>
                                <IconImage data={{ location: "HoleFountainMarble", width: 30, height: 23 }} scale={0.4} />
                                <Text size="xsmall" color={fountain.canAffordMarbleize(row.data.waterIndex, row.data.index) ? "green-1" : undefined}>
                                    {value(fountain.getMarbleizeCost(row.data.waterIndex, row.data.index))}
                                </Text>
                            </Box>
                            : <Text size="xsmall">—</Text>
                    }
                ]}
                data={upgrades}
                primaryKey="index"
                filters={filters}
                onFiltersChange={setFilters}
                sortOptions={[]}
                additionalFilters={<Box direction="row" gap="xsmall" align="center" data-testid="fountain-color-filter">
                    <Text size="xsmall">Color</Text>
                    <Select aria-label="Color filter" options={["All", ...pageNames]} value={color} onChange={({ option }) => setColor(option)} />
                </Box>}
                searchPlaceholder="Search Fountain upgrades..."
                showLockedAndMaxedFilters={false}
                variant="panel"
            />
        </Box>}
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function CoveView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const cove = hole.cove;
    const study = hole.studies[17];
    const effects = cove.accountEffects;
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default"
    });
    const upgrades = cove.upgrades.map(upgrade => ({
        index: upgrade.index,
        upgrade,
        level: upgrade.level,
        effect: upgrade.getDescription(),
        cost: cove.getUpgradeCost(upgrade.index, study.dailyCoveUpgradesPurchased, study.getBonus())
    }));
    const search = filters.searchText.trim().toLocaleLowerCase();
    const visibleUpgrades = upgrades.filter(({ upgrade, effect }) =>
        !search || `${upgrade.name} ${effect ?? ""}`.toLocaleLowerCase().includes(search)
    );

    return <Box gap="medium" data-testid="hole-cove-details">
        <CavernMetricStrip metrics={[
            { label: "Glunko kills", value: value(cove.glunkoKills) },
            { label: "Opals earned", value: value(cove.rewards.opalsEarned) },
            { label: "Drop rate factor", value: factor(effects.dropRateMultiplier) },
            { label: "AFK gain factor", value: factor(effects.afkGainMultiplier) },
            { label: "Multikill per damage tier", value: percentage(effects.multikillPerDamageTier) },
            { label: "Base multikill", value: percentage(effects.baseMultikill) },
            { label: "Respawn time factor", value: factor(effects.respawnTimeMultiplier) },
            { label: "Random pickup double chance", value: percentage(effects.pickupRandomDoubleChance) }
        ]} />
        <Box direction="row" gap="small" wrap data-testid="cove-shapes">
                {cove.shapes.map(shape => {
                    const balance = shape.color === "blue"
                        ? cove.blueShapeBalances[shape.id]
                        : cove.purpleShapeBalances[shape.id - 6];
                    const activeTargetId = shape.color === "blue"
                        ? effects.bluePickupTargetId
                        : effects.purplePickupTargetId;
                    const isActiveTarget = activeTargetId === shape.id;
                    return <Box
                        key={shape.id}
                        direction="row"
                        gap="xsmall"
                        align="center"
                        pad="xsmall"
                        background="dark-1"
                        data-testid={`cove-shape-${shape.id}`}
                        style={{
                            outline: isActiveTarget
                                ? `1px solid ${shape.color === "blue" ? "rgba(3, 118, 227, 0.7)" : "rgba(159, 93, 220, 0.7)"}`
                                : undefined
                        }}
                    >
                        <IconImage data={Item.getImageData(shape.data.internalName)} scale={0.7} />
                        <Text size="xsmall">{value(balance)}</Text>
                    </Box>;
                })}
        </Box>
        <UpgradeTable
                tableName="Cove upgrades"
                columns={[
                    {
                        property: "upgrade",
                        header: "Upgrade",
                        render: (row: typeof upgrades[number]) => {
                            const shapeId = Math.floor(row.upgrade.index % 12 / 2)
                                + (Math.floor(row.upgrade.index / 12) === 0 ? 0 : 6);
                            return <Box direction="row" gap="small" align="center" style={{ minWidth: "180px" }}>
                                <IconImage data={Item.getImageData(cove.shapes[shapeId].data.internalName)} scale={0.65} />
                                <Text size="xsmall">{row.upgrade.name}</Text>
                            </Box>;
                        }
                    },
                    {
                        property: "level",
                        header: "Level",
                        render: (row: typeof upgrades[number]) => <Text size="xsmall">{value(row.level)}</Text>
                    },
                    {
                        property: "effect",
                        header: "Effect",
                        render: (row: typeof upgrades[number]) => <Text size="xsmall">{row.effect ?? ""}</Text>
                    },
                    {
                        property: "cost",
                        header: "Cost",
                        render: (row: typeof upgrades[number]) => {
                            const shapeId = Math.floor(row.upgrade.index % 12 / 2)
                                + (Math.floor(row.upgrade.index / 12) === 0 ? 0 : 6);
                            const canAfford = cove.getCurrencyBalance(row.upgrade.index) >= row.cost;
                            return <ResourceDisplay
                                cost={row.cost}
                                canAfford={canAfford}
                                resourceImageData={Item.getImageData(cove.shapes[shapeId].data.internalName)}
                                resourceImageScale={0.65}
                                showTooltip={false}
                            />;
                        }
                    }
                ]}
                data={visibleUpgrades}
                primaryKey="index"
                filters={filters}
                onFiltersChange={setFilters}
                sortOptions={[]}
                searchPlaceholder="Search Cove upgrades..."
                showLockedAndMaxedFilters={false}
                variant="panel"
                minWidth="620px"
        />
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}


function WellView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const well = hole.well;
    const theme = useContext(ThemeContext);
    const bucketSources = hole.schematics.filter(schematic => schematic.index >= 3 && schematic.index <= 11);
    const goldSchematic = hole.schematics.find(schematic => schematic.index === 104);
    const study = hole.studies[0];
    const wellOpals = hole.cavernOpalSources.find(source => source.acquisition === "Purchased an Opal with Well sediment.")!.opals;
    const gravel = well.sediments[0];
    const totalExpansions = well.sediments.reduce((total, sediment) => total + sediment.expansions, 0);
    const gravelImage = hole.currencies.find(currency => currency.index === 0)!.getImageData();
    const fillHelp = "Time to fill if all your buckets worked on this sediment at their current rates. Each row is independent.";

    return <Box gap="medium" data-testid="hole-well-details">
        <Section title="Expansion">
            <Box style={{ display: "grid", gridTemplateColumns: "minmax(140px, 0.9fr) repeat(2, minmax(0, 1fr))", gap: "16px", alignItems: "center" }}>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Total bar expansions</Text>
                    <Text size="large" weight={500}>{value(totalExpansions)}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Gravel cost per Opal</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        {gravelImage && <IconImage data={gravelImage} scale={0.65} />}
                        <Text size="small" color={well.opalAffordable ? "status-ok" : "critical"}>
                            {value(gravel.current)} / {value(well.opalCost)}
                        </Text>
                    </Box>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Opals found</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={Item.getImageData("Opal")} scale={0.65} />
                        <Text size="small">{value(wellOpals)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Sediment">
            <Box direction="row" gap="medium" wrap align="center">
                <TipDisplay heading="How to obtain more buckets" body={<Box gap="xsmall">
                    <Text size="xsmall">Bucket count increases when you unlock these Hole schematics:</Text>
                    {bucketSources.map(source => <Text key={source.index} size="xsmall" style={{ opacity: source.unlocked ? 1 : 0.6 }}>{source.data.name.replace(/_/g, " ")}</Text>)}
                </Box>} size="small">
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={well.bucketImageData} scale={0.2} />
                        <Text tabIndex={0} size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                            Buckets: {value(well.ownedBucketCount)}
                        </Text>
                    </Box>
                </TipDisplay>
                <TipDisplay heading="How to obtain gold buckets" body={<Box gap="xsmall">
                    <Text size="xsmall">Golden Bucket Boost from the Fountain increases the first gold bucket's fill rate.</Text>
                    {goldSchematic && <Text size="xsmall">{goldSchematic.data.name.replace(/_/g, " ")} unlocks another gold bucket.</Text>}
                </Box>} size="small">
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={well.goldBucketImageData} scale={0.2} />
                        <Text tabIndex={0} size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                            Gold buckets: {value(well.goldBucketCount)}
                        </Text>
                    </Box>
                </TipDisplay>
                <TextAndLabel label="Gold multiplier" labelSize="xsmall" textSize="small" text={`${notateNumber(well.goldBucketMultiplier, "MultiplierInfo").replace("#", "")}×`} />
            </Box>

            <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            {["Fill", "Buckets filling it", "Expansions"].map(title => <th key={title} scope="col" style={{ width: title === "Fill" ? "36%" : "21%", textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                                <Text size="xsmall" color="accent-2">{title}</Text>
                            </th>)}
                            <th scope="col" style={{ width: "22%", textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                                <TipDisplay heading="Full in" body={<Text size="xsmall">{fillHelp}</Text>} size="small">
                                    <Text tabIndex={0} size="xsmall" color="accent-2" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>Full in</Text>
                                </TipDisplay>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {well.sediments.map(sediment => {
                            const assignedBuckets = well.buckets.filter(bucket => bucket.unlocked && bucket.sedimentIndex === sediment.index).length;
                            const progress = sediment.current < 0
                                ? 0
                                : Math.min(100, Math.max(0, sediment.current / sediment.currentMax * 100));
                            const sedimentImage = hole.currencies[sediment.index].getImageData();
                            const fullIn = well.getFullInTime(sediment);
                            const fullInText = fullIn.status === "estimate"
                                ? fullIn.hours === 0 ? "Full" : toTime(fullIn.hours * 3600)
                                : fullIn.status === "blocked" ? "Blocked"
                                    : fullIn.status === "no-production" ? "No production" : "Unavailable";
                            const expansionLevel = sediment.expansions;
                            const expansionText = well.expansionUpgradeOwned
                                ? `No cap · ${value(expansionLevel)} expansions`
                                : `${value(expansionLevel)} / 14${expansionLevel >= 14 ? " (capped)" : " used"}`;
                            const inactive = assignedBuckets === 0;
                            return <tr key={sediment.index} data-testid={`well-sediment-${sediment.index}`} style={{
                                opacity: inactive ? 0.75 : 1,
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                            }}>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Box gap="xxsmall">
                                        <Box direction="row" gap="xsmall" align="center">
                                            {sedimentImage && <IconImage data={sedimentImage} scale={0.65} />}
                                            <Text size="small">{sediment.data.name}</Text>
                                        </Box>
                                        <Text size="xsmall">{sediment.current < 0 ? "|" : notateNumber(sediment.current)} / {notateNumber(sediment.currentMax)}</Text>
                                        <progress aria-label={`${sediment.data.name} stock toward capacity`} value={progress} max={100} style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }} />
                                    </Box>
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    {assignedBuckets === 0
                                        ? <Text size="xsmall" color="accent-2">No buckets assigned</Text>
                                        : <Box gap="xxsmall">
                                            <Box direction="row" gap="xsmall" align="center">
                                                <IconImage data={well.bucketImageData} scale={0.12} />
                                                <Text size="xsmall">{assignedBuckets} {assignedBuckets === 1 ? "bucket" : "buckets"}</Text>
                                            </Box>
                                            <Text size="xsmall">{value(sediment.bucketRate, "/hr")}</Text>
                                        </Box>}
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Box gap="xxsmall">
                                        {!well.expansionUpgradeOwned && <Box direction="row" gap="2px" aria-label={expansionText}>
                                            {Array.from({ length: 14 }, (_, index) => <Box key={index} background={index < Math.min(expansionLevel, 14) ? "brand" : "grey-1"} height="6px" width="5px" />)}
                                        </Box>}
                                        <Text size="xsmall">{expansionText}</Text>
                                    </Box>
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Text size="xsmall">{fullInText}</Text>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </Box>
        </Section>

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function BellView({ hole, totalMoney, onOpenStudies }: { hole: Hole; totalMoney: number; onOpenStudies: () => void }) {
    const bell = hole.bell;
    const theme = useContext(ThemeContext);
    const methods = bell.modeNames.map((_, index) => ({
        name: ["Ring Bell", "Ping Bell", "Clean Bell", "Renew Bell"][index],
        bank: bell.xpBanks[index],
        rate: bell.modeRates[index],
        requirement: bell.modeRequirements[index],
        timing: bell.getMethodTiming(index),
    }));
    const bellOpals = hole.cavernOpalSources[4].opals;
    const methodsComplete = bell.methodsOwned === 6;
    const study = hole.studies[4];
    const upgradeSeparator = normalizeColor("grey-1", theme);

    return <Box gap="medium" data-testid="hole-bell-details">
        <Section title="Overview">
            <Box direction="row" gap="small" wrap align="center">
                {!methodsComplete && <>
                    <Box flex={{ grow: 1, shrink: 0 }} pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Rings since Renew</Text>
                        <Text size="large">{value(bell.ringsSinceRenew)}</Text>
                    </Box>
                    <Box flex={{ grow: 1, shrink: 1 }} pad={{ horizontal: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">New method chance</Text>
                        <Text size="small">{(bell.cleanOdds * 100).toLocaleString("en-US", { maximumFractionDigits: 3 })}%</Text>
                    </Box>
                </>}
                <Box flex={{ grow: 1, shrink: 1 }} pad={{ left: "small" }}>
                    <Text size="xsmall" color="accent-2">Opals earned</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={Item.getImageData("Opal")} scale={0.75} />
                        <Text size="small">{value(bellOpals)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Bonuses">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "24px", minWidth: 0 }}>
                {bell.bonuses.slice(0, 7).map(bonus => <Box key={bonus.index} direction="row" justify="between" align="start" gap="small" pad={{ vertical: "small" }} border={{ side: "bottom", color: "grey-1" }} data-testid={`bell-bonus-${bonus.index}`}>
                    <Text size="small" weight={500}>{bonus.getDescription()}</Text>
                    <Text size="xsmall" color="accent-2">Lv. {value(bonus.level)}</Text>
                </Box>)}
            </Box>
        </Section>

        <Section title="Methods">
            {bell.mode === null
                ? <Text size="xsmall" color="accent-2">Current mode: None selected</Text>
                : !bell.modeNames[bell.mode]
                    ? <Text size="xsmall" color="accent-2">Current mode: Unavailable</Text>
                    : null}
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 }}>
                {methods.map((method, index) => {
                    const ready = method.timing.status === "ready";
                    const topStatus = method.timing.status === "ready" ? "Ready"
                        : method.timing.status === "estimate" ? `Full in ${toTime(method.timing.hours * 3600)}`
                            : "No production";
                    return <Box key={method.name} pad="small" border={{
                        side: index < 2 ? "bottom" : "top",
                        color: "grey-1",
                    }} data-testid={`bell-method-${index}`}>
                        <Box direction="row" justify="between" gap="small" align="center">
                            <Text size="small" weight={500}>{method.name === "Renew Bell" ? <TipDisplay heading="Renew Bell" body={<Text size="xsmall">Renew consumes Renew XP, resets Ring XP, clears Bell bonus levels, and retains improvements and Opals.</Text>} size="small">Renew Bell</TipDisplay> : method.name}</Text>
                            {bell.mode === index && <Text size="xsmall" color="accent-2">Current mode</Text>}
                            <Text size="xsmall" color={ready ? "status-ok" : "accent-2"}>{topStatus}</Text>
                        </Box>
                        <Box direction="row" justify="between" gap="small" pad={{ top: "xsmall" }}>
                            <Text size="xsmall" color="accent-2">XP</Text>
                            <Text size="xsmall">{value(method.bank)} / {value(method.requirement)}</Text>
                        </Box>
                        {method.requirement > 0 && <progress aria-label={`${method.name} XP progress`} value={Math.min(100, Math.max(0, method.bank / method.requirement * 100))} max={100} style={{ width: "100%", height: "6px" }} />}
                        <Text size="xsmall" color="accent-2">XP rate {value(method.rate, "/hr")}</Text>
                    </Box>;
                })}
            </Box>
        </Section>

        <Section title="Upgrades">
            <RoundedShadowBox background="dark-1" pad="none" overflow="hidden" data-testid="bell-upgrades">
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", minWidth: 0 }}>
                    {bell.improvements.map((improvement, index) => {
                        const wallet = improvement.wallet;
                        const currency = improvement.data.resource;
                        const cost = improvement.cost;
                        const balance = wallet.type === "account" ? wallet.balance : totalMoney;
                        const affordabilityColor = balance === null ? undefined : balance >= cost ? "green-1" : "critical";
                        const image = resourceImage(hole, currency);
                        return <Box key={improvement.index} gap="xsmall" pad="small" style={{
                            borderRight: index % 3 !== 2 ? `1px solid ${upgradeSeparator}` : undefined,
                            borderBottom: index < 3 ? `1px solid ${upgradeSeparator}` : undefined,
                        }} data-testid={`bell-improvement-${improvement.index}`}>
                            <Text size="xsmall" color="accent-2">Lv. {value(improvement.level)}</Text>
                            <Text size="small" weight={500}>{improvement.data.bonus.replace("{", notateNumber(improvement.quantity)).replace(/[{}]/g, "").replace(/\s+/g, " ").trim()}</Text>
                            <Box direction="row" gap="xsmall" align="center" wrap>
                                {currency === "Coins" ? <>
                                    {balance === null ? "Unavailable" : <CoinsDisplay coinMap={getCoinsArray(balance)} maxCoins={3} coinScale={0.75} regularRow textColor={affordabilityColor} />}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    <CoinsDisplay coinMap={getCoinsArray(cost)} maxCoins={3} coinScale={0.75} regularRow textColor={affordabilityColor} />
                                </> : currency === "Bits" ? <>
                                    {balance === null ? "Unavailable" : <BitsDisplay value={balance} scale={0.75} textSize="xsmall" textColor={affordabilityColor} />}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    <BitsDisplay value={cost} scale={0.75} textSize="xsmall" textColor={affordabilityColor} />
                                </> : <>
                                    {balance === null ? "Unavailable" : <>{image && <IconImage data={image} scale={0.75} />}<Text size="xsmall" color={affordabilityColor}>{notateNumber(balance)}</Text></>}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    {image && <IconImage data={image} scale={0.75} />}<Text size="xsmall" color={affordabilityColor}>{notateNumber(cost)}</Text>
                                </>}
                            </Box>
                        </Box>;
                    })}
                </Box>
            </RoundedShadowBox>
        </Section>

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function HarpView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const harp = hole.harp;
    const theme = useContext(ThemeContext);
    const nextNoteCost = harp.noteCost === null ? null : {
        amount: harp.noteCost,
        currency: hole.currencies[11 + harp.highestUnlockedNoteIndex],
    };
    const opalsFound = hole.cavernOpalSources[5].opals;
    const tuneName = harp.tune === null
        ? "Unavailable"
        : harp.notes.find(note => note.index === harp.tune)?.name ?? "Unavailable";
    const strings = harp.strings.filter(string => string.index < 6 || (string.index === 6 && string.level > 0));
    const totalStringLevels = harp.strings.reduce((sum, string) => sum + string.level, 0);
    const study = hole.studies[5];
    const noteCurrencyImage = nextNoteCost?.currency.getImageData();
    const triggerContext = (stringIndex: number): string => {
        const contexts = harp.assignedStringEffects.filter(effect => effect.stringIndex === stringIndex);
        if (contexts.length === 0) return harp.strings[stringIndex].assignedSlots.length === 0
            ? "Not assigned" : "Trigger context unavailable";
        return [...new Set(contexts.map(context => {
            if (context.effect.type === "none") return "No trigger effect.";
            const status = context.triggerStatus === "power-below-threshold" ? "Below power threshold"
                : "Runtime cycle state unavailable";
            const effect = context.effect.type === "notes" ? "Creates notes"
                : context.effect.type === "opal" ? "Finds Opals"
                    : "Creates String EXP";
            return `${status}. ${effect}.`;
        }))].join(" ");
    };
    return <Box gap="medium" data-testid="hole-harp-details">
        <Section title="Power">
            <Box direction="row" gap="medium" wrap align="center" data-testid="harp-power-summary">
                <Text size="large" style={{ fontVariantNumeric: "tabular-nums" }}>{value(harp.power)}</Text>
                <Box direction="row" gap="small" wrap align="center">
                    <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Power rate</Text>
                        <Text size="small">{value(harp.powerPerHour, "/hr")}</Text>
                    </Box>
                    {nextNoteCost !== null && <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }} data-testid="harp-next-note-cost">
                        <Text size="xsmall" color="accent-2">Next note cost</Text>
                        {noteCurrencyImage && <IconImage data={noteCurrencyImage} scale={0.65} />}
                        <Text size="small">{`${notateNumber(nextNoteCost.amount)} ${nextNoteCost.currency.data.name.replace(/_/g, " ")}`}</Text>
                    </Box>}
                    <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Opal chance</Text>
                        <TipDisplay heading="Baseline Opal chance" body={<Text size="xsmall">Baseline chance uses saved power before any strings are plucked. Domino Effect increases this chance as strings are plucked.</Text>} size="small">
                            <Text size="small" tabIndex={0} style={{ textDecoration: "underline dotted", textUnderlineOffset: "3px", cursor: "help" }}>
                                {(harp.baselineOpalChance * 100).toLocaleString("en-US", { maximumFractionDigits: 2 })}%
                            </Text>
                        </TipDisplay>
                    </Box>
                    <Box direction="row" gap="xsmall" align="center">
                        <Text size="xsmall" color="accent-2">Opals found</Text>
                        <IconImage data={Item.getImageData("Opal")} scale={0.65} />
                        <Text size="small">{value(opalsFound)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Notes">
            <Box direction="row" gap="xsmall" align="center">
                <Text size="xsmall" color="accent-2">Tune</Text>
                <Text size="xsmall">{tuneName}</Text>
            </Box>
            <RoundedShadowBox background="dark-1" pad="none" overflow="hidden" data-testid="harp-note-grid">
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", minWidth: 0 }}>
                    {harp.notes.map((note, index) => {
                        const currency = hole.currencies.find(entry => entry.index === 10 + note.index);
                        const image = currency?.getImageData();
                        return <Box key={note.index} direction="row" align="center" justify="center" gap="xsmall" pad="small"
                            aria-label={`${note.name}: ${value(note.current)}`}
                            title={note.name}
                            style={{
                                minWidth: 0,
                                opacity: note.accessible === false ? 0.6 : 1,
                                borderRight: index % 5 !== 4 ? `${normalizeColor("grey-1", theme)} solid 1px` : undefined,
                                borderBottom: index < 5 ? `${normalizeColor("grey-1", theme)} solid 1px` : undefined,
                            }}
                            data-testid={`harp-note-${note.index}`}>
                            {image && <IconImage data={image} scale={0.7} />}
                            <Text size="xsmall" style={{ overflowWrap: "anywhere" }}>{value(note.current)}</Text>
                        </Box>;
                    })}
                </Box>
            </RoundedShadowBox>
        </Section>

        <Section title="Strings">
            <Box direction="row" align="center" justify="between" gap="small" wrap>
                <Text size="xsmall" color="accent-2">{harp.slotCount} slots</Text>
                <Text size="xsmall" color="accent-2">Owned string levels: {value(totalStringLevels)}</Text>
            </Box>
            <RoundedShadowBox background="dark-1" pad="small" data-testid="harp-assignment-order">
                <Box direction="row" gap="small" align="center" style={{ overflowX: "auto", minWidth: 0 }}>
                    {Array.from({ length: harp.slotCount }, (_, slot) => {
                        const stringIndex = harp.layout[slot];
                        const string = stringIndex == null ? undefined : harp.strings[stringIndex];
                        const slotUnavailable = stringIndex != null && string === undefined;
                        return <Box key={slot} direction="column" align="center" gap="xxsmall" flex={false} aria-label={`Slot ${slot + 1}: ${slotUnavailable ? "Unavailable" : string ? `String ${string.data.stringLetter}` : "Empty"}`}>
                            <Text size="xsmall" color="accent-2">#{slot + 1}</Text>
                            {slotUnavailable ? <Text size="small">Unavailable</Text>
                                : string ? <IconImage data={string.imageData} scale={0.8} />
                                    : <Text size="small">—</Text>}
                        </Box>;
                    })}
                </Box>
            </RoundedShadowBox>
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", minWidth: 0, gap: "8px" }}>
                {strings.map(string => {
                    const passiveDescription = string.index === 6 ? null : string.getPassiveDescription();
                    const currentLevel = `${string.level}`;
                    const levelDetails = `Current EXP: ${exact(string.experience)}. Next level: ${exact(string.nextLevelExperience)} EXP.`;
                    return <GameCard key={string.index} title={`String ${string.data.stringLetter}`} image={string.imageData}
                        testId={`harp-string-${string.index}`} inactive={string.unlocked === false}
                        headerRight={<TipDisplay heading={`String ${string.data.stringLetter} · Lv. ${currentLevel}`} body={<Text size="xsmall">{levelDetails}</Text>} size="small">
                            <Text size="xsmall" style={{ whiteSpace: "nowrap", cursor: "help" }} tabIndex={0}>Lv. {currentLevel}</Text>
                        </TipDisplay>}>
                        {string.index === 6
                            ? <Text size="xsmall">Reserved string.</Text>
                            : <>
                                <Text size="xsmall">{triggerContext(string.index)}</Text>
                                <Box pad={{ top: "xsmall" }} border={{ side: "top", color: "grey-1" }}>
                                    <Text size="xsmall">{passiveDescription ?? "No passive effect."}</Text>
                                </Box>
                            </>}
                    </GameCard>;
                })}
            </Box>
        </Section>

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function LampView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const lamp = hole.lamp;
    const effectiveWishBonus = (wishIndex: number): string | null =>
        wishIndex === 7 ? exact(lamp.getBonus(true), "%") : null;
    const wishDescription = (wish: typeof lamp.wishes[number]): string => {
        let description = wish.data.desc;
        if ([4, 6, 8, 10].includes(wish.index)) {
            const specialIndex = (wish.index - 4) / 2;
            const effects = [0, 1, 2].map(inlineIndex => lamp.getBonus(false, specialIndex, inlineIndex));
            return description.replaceAll(" @ ", "\n")
                .replace("+~%", `+${exact(effects[2])}%`)
                .replace("+{%", `+${exact(effects[0])}%`)
                .replace("+%", `+${exact(effects[1])}%`);
        }
        return description.replaceAll(" @ ", "\n");
    };
    const resetSummary = (reset: typeof lamp.resetConsequences[number]): string => {
        const changed = reset.before.filter((before, index) => before !== reset.after[index]).length;
        if (reset.category === "All Opals Invested") return `${changed} of ${reset.before.length} Opal slots would clear to 0`;
        if (reset.category === "Conjuror PTS Invested") return `${changed} of ${reset.before.length} point entries would clear to 0`;
        if (reset.category === "Jar Collectible Enchantment LVs") return `${changed} of ${reset.before.length} enchantment levels exceed 1; reset caps them at 1`;
        return `${changed} of ${reset.before.length} doublers would be set to -1`;
    };
    const study = hole.studies[6];
    return <Box gap="medium" data-testid="hole-lamp-details">
        <Section title="Wish stock">
            <Box direction="row" gap="small" align="center" wrap>
                <Box gap="xxsmall" pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }}>
                    <Text size="xsmall" color="accent-2">Wishes</Text>
                    <Text size="large" weight={500}>{value(lamp.wishStock)}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Expected daily gain</Text>
                    <Text size="small">{`${lamp.wishesPerDay.toLocaleString("en-US", { maximumFractionDigits: 2 })} wishes/day`}</Text>
                </Box>
            </Box>
        </Section>
        <Section title="Wishes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "12px", minWidth: 0 }}>
                {lamp.wishes.map(wish => {
                    const benefit = effectiveWishBonus(wish.index);
                    const cost = lamp.getWishCost(wish.index);
                    const metrics = [
                        ...(benefit === null ? [] : [{ label: "Well / Harp gain", value: benefit }]),
                        { label: "Next cost", value: cost === null ? "Unavailable" : `${notateNumber(cost)} wishes` },
                    ];
                    return <GameCard key={wish.index} title={wish.data.name} testId={`lamp-wish-${wish.index}`} headerRight={<Text size="xsmall" color="accent-2" style={{ flexShrink: 0 }}>Lv. {value(wish.wishCount)}</Text>}>
                        <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{wishDescription(wish)}</Text>
                        <CavernMetricStrip metrics={metrics} />
                        {wish.index === 5 && <details>
                            <summary style={{ cursor: "pointer" }}>Discount details</summary>
                            <Box gap="small" margin={{ top: "small" }}>
                                <Text size="xsmall">Current schematic cost factor: {exact(lamp.schematicCostDiscount, "×")}</Text>
                                <Text size="xsmall">This factor applies to current schematic costs.</Text>
                            </Box>
                        </details>}
                        {wish.index === 1 && <details>
                            <summary style={{ cursor: "pointer" }}>Reset details</summary>
                            <Box gap="small" margin={{ top: "small" }}>
                                {lamp.resetConsequences.map(reset => <Text key={reset.category} size="xsmall">{reset.category}: {resetSummary(reset)}</Text>)}
                            </Box>
                        </details>}
                    </GameCard>;
                })}
            </Box>
        </Section>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

export default function Part4CavernDetails({ hole, cavern, totalMoney, onOpenStudies, characters }: {
    hole: Hole;
    cavern: number;
    totalMoney: number;
    onOpenStudies: () => void;
    characters: { playerId: number; playerName: string }[];
}) {
    switch (cavern) {
        case 0: return <WellView hole={hole} onOpenStudies={onOpenStudies} />;
        case 4: return <BellView hole={hole} totalMoney={totalMoney} onOpenStudies={onOpenStudies} />;
        case 5: return <HarpView hole={hole} onOpenStudies={onOpenStudies} />;
        case 6: return <LampView hole={hole} onOpenStudies={onOpenStudies} />;
        case 10: return <JarView hole={hole} onOpenStudies={onOpenStudies} />;
        case 15: return <FountainView hole={hole} onOpenStudies={onOpenStudies} />;
        case 17: return <CoveView hole={hole} onOpenStudies={onOpenStudies} />;
        default: return null;
    }
}
