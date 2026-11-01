"use client";

import { useMemo } from "react";
import { Box, Select, Text } from "grommet";
import IconImage from "../../../components/base/IconImage";
import TipDisplay from "../../../components/base/TipDisplay";
import { UpgradeTable } from "../../../components/account/shared/UpgradeTable";
import type { FilterOptions } from "../../../components/account/shared/UpgradeTableFilters";
import { Cooking, Meal } from "../../../data/domain/world-4/cooking";
import { notateNumber, toTime } from "../../../data/utility";

export type MealControls = {
    status: string;
    ribbon: string;
    mastery: string;
};

type MealRow = {
    mealIndex: number;
    meal: Meal;
    contribution: number;
    currentBonus: string;
    nextBonus: string | undefined;
    nextCost: number | undefined;
    targetCost: number;
    targetHours: number;
    sortTime: number;
};

const sortOptions = [
    { label: "In-game order", value: "default" },
    { label: "Meal level: high to low", value: "levelDescending" },
    { label: "Meal level: low to high", value: "levelAscending" },
    { label: "Ribbon rank: high to low", value: "ribbonDescending" },
    { label: "Ribbon rank: low to high", value: "ribbonAscending" },
    { label: "Meal Mastery: high to low", value: "masteryDescending" },
    { label: "Meal Mastery: low to high", value: "masteryAscending" },
    { label: "Next cost: low to high", value: "nextCost" },
    { label: "Time to next level", value: "timeNext" },
    { label: "Time to Diamond", value: "timeDiamond" },
    { label: "Time to Purple", value: "timePurple" },
    { label: "Time to Void", value: "timeVoid" },
    { label: "Time to level 30", value: "timeThirty" },
    { label: "Time to maximum level", value: "timeMax" }
];

const timingLabels: Record<string, string> = {
    timeDiamond: "Diamond",
    timePurple: "Purple",
    timeVoid: "Void",
    timeThirty: "Level 30",
    timeMax: "Maximum level"
};

function getTargetCost(meal: Meal, sortBy: string): number {
    switch (sortBy) {
        case "timeDiamond": return meal.getCostsTillDiamond();
        case "timePurple": return meal.getCostsTillPurple();
        case "timeVoid": return meal.getCostsTillVoid();
        case "timeThirty": return meal.getCostsTillThirty();
        case "timeMax": return meal.getCostsTillMaxLevel();
        default: return meal.getMealLevelCost();
    }
}

function formatTime(hours: number): string {
    if (!Number.isFinite(hours)) return "No cooking speed";
    return hours > 0 ? toTime(hours * 3600) : "Ready";
}

function RecipeSpices({ spices, cooking }: { spices: number[]; cooking: Cooking }) {
    return <Box direction="row" gap="xxsmall" wrap>
        {spices.map((spice, index) => <IconImage
            key={`${spice}-${index}`}
            style={{ opacity: cooking.spices[spice] > 0 ? 1 : 0.4 }}
            data={{ location: `CookingSpice${spice}`, width: 36, height: 36 }}
            scale={0.6}
        />)}
    </Box>;
}

function RecipeDetails({ meal, cooking }: { meal: Meal; cooking: Cooking }) {
    return <Box gap="small">
        <Box gap="xsmall">
            <Text size="small">Fastest recipe</Text>
            <RecipeSpices spices={meal.timeOptimalSpices} cooking={cooking} />
            <Text size="small">{notateNumber(meal.timeDiscoveryChance * 100, "Smaller")}% chance · {toTime(meal.timeDiscoveryTime)}</Text>
        </Box>
        {meal.chanceDiscoveryChance > meal.timeDiscoveryChance && <Box gap="xsmall">
            <Text size="small">Higher-chance recipe</Text>
            <RecipeSpices spices={meal.chanceOptimalSpices} cooking={cooking} />
            <Text size="small">{notateNumber(meal.chanceDiscoveryChance * 100, "Smaller")}% chance · {toTime(meal.chanceDiscoveryTime)}</Text>
        </Box>}
        <Text size="xsmall">Uses the first kitchen’s recipe luck. Dim spices are unavailable.</Text>
    </Box>;
}

function CookingDetails({ row, cooking, starSign, silkrode }: {
    row: MealRow;
    cooking: Cooking;
    starSign: boolean;
    silkrode: boolean;
}) {
    const { meal, contribution } = row;
    const useContribution = contribution > 0;
    const milestones = [
        { label: "Diamond", cost: meal.getCostsTillDiamond() },
        { label: "Purple", cost: meal.getCostsTillPurple() },
        { label: "Void", cost: meal.getCostsTillVoid() },
        { label: "Level 30", cost: meal.getCostsTillThirty() },
        { label: "Maximum level", cost: meal.getCostsTillMaxLevel() }
    ];
    const nextMilestoneCost = meal.getNextMilestoneCost();
    const ladles = (cost: number, adjusted = false) => {
        const amount = meal.getLadlesTo(cost, starSign, silkrode, useContribution, adjusted ? cooking.getZerkerBonus() : 0);
        return Number.isFinite(amount) ? notateNumber(amount, "Smaller") : "—";
    };
    return <Box gap="small">
        <Text size="small">{useContribution ? "Current kitchens" : "All kitchens"}</Text>
        {useContribution && <Text size="small">Cooking speed: {notateNumber(contribution, "Smaller")} / hour</Text>}
        {row.nextCost !== undefined && <Box gap="xxsmall">
            <Text size="small">Next level: {formatTime(meal.getTimeTill(row.nextCost, starSign, silkrode, useContribution))}</Text>
            <Text size="small">Ladles: {ladles(row.nextCost)}</Text>
            <Text size="small">With {cooking.bestBerserker?.playerName ?? "Blood Berserker"}: {ladles(row.nextCost, true)} ladles</Text>
        </Box>}
        <Box gap="xxsmall">
            {milestones.filter(milestone => milestone.cost > 0).map(milestone => <Text size="small" key={milestone.label}>
                {milestone.label}: {formatTime(meal.getTimeTill(milestone.cost, starSign, silkrode, useContribution))}
            </Text>)}
        </Box>
        {nextMilestoneCost > 0 && <Box gap="xxsmall">
            <Text size="small">Next milestone: {ladles(nextMilestoneCost)} ladles</Text>
            <Text size="small">With {cooking.bestBerserker?.playerName ?? "Blood Berserker"}: {ladles(nextMilestoneCost, true)} ladles</Text>
        </Box>}
    </Box>;
}

export default function CookingMeals({ cooking, lastUpdated, starSign, silkrode, filters, onFiltersChange, controls, onControlsChange }: {
    cooking: Cooking;
    lastUpdated: Date;
    starSign: boolean;
    silkrode: boolean;
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    controls: MealControls;
    onControlsChange: (controls: MealControls) => void;
}) {
    const rows = useMemo(() => {
        const search = filters.searchText.trim().toLocaleLowerCase();
        return cooking.meals.map((meal): MealRow => {
            const contribution = meal.getContributionSpeed(starSign, silkrode);
            const canLevel = meal.level > 0 && meal.level < meal.maxLevel;
            const targetCost = canLevel ? getTargetCost(meal, filters.sortBy) : 0;
            const targetHours = targetCost > 0 ? meal.getTimeTill(targetCost, starSign, silkrode, contribution > 0) : 0;
            return {
                mealIndex: meal.mealIndex,
                meal,
                contribution,
                currentBonus: meal.getBonusText(),
                nextBonus: canLevel ? meal.getBonusText(meal.level + 1) : undefined,
                nextCost: canLevel ? meal.getMealLevelCost() : undefined,
                targetCost,
                targetHours,
                sortTime: targetHours > 0 && Number.isFinite(targetHours) ? targetHours : Infinity
            };
        }).filter(row => {
            const { meal } = row;
            if (filters.hideMaxed && meal.level >= meal.maxLevel) return false;
            if (controls.status === "Discovered" && meal.level === 0) return false;
            if (controls.status === "Undiscovered" && meal.level > 0) return false;
            if (controls.status === "Maxed" && meal.level < meal.maxLevel) return false;
            if (controls.status === "Below max level" && meal.level >= meal.maxLevel) return false;
            if (controls.status === "Currently cooking" && row.contribution <= 0) return false;
            if (controls.status === "Daily target" && !meal.noMealLeftBehindAffected) return false;
            if (controls.ribbon === "With ribbon" && meal.ribbonLevel === 0) return false;
            if (controls.ribbon === "Without ribbon" && meal.ribbonLevel > 0) return false;
            if (controls.mastery === "With levels" && meal.cookMasterLevel === 0) return false;
            if (controls.mastery === "No levels" && meal.cookMasterLevel > 0) return false;
            return !search || `${meal.name} ${row.currentBonus} ${row.nextBonus ?? ""}`.toLocaleLowerCase().includes(search);
        }).sort((left, right) => {
            let comparison = 0;
            switch (filters.sortBy) {
                case "levelDescending": comparison = right.meal.level - left.meal.level; break;
                case "levelAscending": comparison = left.meal.level - right.meal.level; break;
                case "ribbonDescending": comparison = right.meal.ribbonLevel - left.meal.ribbonLevel; break;
                case "ribbonAscending": comparison = left.meal.ribbonLevel - right.meal.ribbonLevel; break;
                case "masteryDescending": comparison = right.meal.cookMasterLevel - left.meal.cookMasterLevel; break;
                case "masteryAscending": comparison = left.meal.cookMasterLevel - right.meal.cookMasterLevel; break;
                case "nextCost": comparison = (left.nextCost ?? Infinity) - (right.nextCost ?? Infinity); break;
                default:
                    if (filters.sortBy.startsWith("time")) comparison = left.sortTime - right.sortTime;
                    break;
            }
            return comparison || left.mealIndex - right.mealIndex;
        });
    }, [cooking, lastUpdated, starSign, silkrode, filters, controls]);

    const targetLabel = timingLabels[filters.sortBy] ?? "Next level";
    const columns = [
        {
            property: "name",
            header: "Meal",
            render: ({ meal, contribution }: MealRow) => <Box direction="row" align="center" gap="small" style={{ minWidth: "170px" }}>
                <IconImage data={meal.getImageData()} style={{ opacity: meal.level === 0 ? 0.5 : 1 }} />
                <Box gap="xxsmall">
                    <Text size="small">{meal.name}</Text>
                    {meal.level === 0 && <Text size="xsmall" color="accent-2">Undiscovered</Text>}
                    {contribution > 0 && <Text size="xsmall" color="green-1">Cooking</Text>}
                    {meal.noMealLeftBehindAffected && <Box direction="row" gap="xxsmall" align="center">
                        <IconImage data={cooking.noMealLeftBehind.getImageData()} scale={0.2} />
                        <Text size="xsmall">Daily target</Text>
                    </Box>}
                </Box>
            </Box>
        },
        {
            property: "level",
            header: "Level / cap",
            render: ({ meal }: MealRow) => <Box gap="xxsmall">
                <Text size="small">{meal.level} / {meal.maxLevel}</Text>
                {meal.level >= meal.maxLevel && <Text size="xsmall" color="accent-2">Maxed</Text>}
            </Box>
        },
        {
            property: "currentBonus",
            header: "Current / next bonus",
            render: (row: MealRow) => <Box gap="xsmall" style={{ minWidth: "190px", maxWidth: "245px" }}>
                <Text size="xsmall" style={{ opacity: row.meal.level === 0 ? 0.6 : 1 }}>{row.currentBonus}</Text>
                {row.nextBonus !== undefined && <Text size="xsmall" color="accent-2">Next: {row.nextBonus}</Text>}
            </Box>
        },
        {
            property: "nextCost",
            header: "Owned / next cost",
            render: ({ meal, nextCost }: MealRow) => meal.level === 0 ? <TipDisplay
                heading={`${meal.name} recipe`}
                body={<RecipeDetails meal={meal} cooking={cooking} />}
                size="small"
            >
                <Box gap="xxsmall" tabIndex={0} style={{ cursor: "help" }}>
                    <RecipeSpices spices={meal.timeOptimalSpices} cooking={cooking} />
                    <Text size="xsmall" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px" }}>Recipe details</Text>
                </Box>
            </TipDisplay> : <Box gap="xxsmall" style={{ whiteSpace: "nowrap" }}>
                <Text size="xsmall" color={nextCost === undefined ? undefined : meal.count >= nextCost ? "green-1" : "accent-1"}>
                    {notateNumber(Math.floor(meal.count), "Smaller")}{nextCost !== undefined ? ` / ${notateNumber(Math.ceil(nextCost), "Smaller")}` : ""}
                </Text>
                {nextCost === undefined && <Text size="xsmall" color="accent-2">No next cost</Text>}
            </Box>
        },
        {
            property: "targetHours",
            header: `Cooking / ${targetLabel.toLocaleLowerCase()}`,
            render: (row: MealRow) => {
                if (row.meal.level === 0) return <Box gap="xxsmall">
                    <Text size="xsmall">{notateNumber(row.meal.timeDiscoveryChance * 100, "Smaller")}% discovery</Text>
                    <Text size="xsmall" color="accent-2">{toTime(row.meal.timeDiscoveryTime)}</Text>
                </Box>;
                if (row.meal.level >= row.meal.maxLevel) return <Text size="xsmall" color="accent-2">Maxed</Text>;
                return <TipDisplay heading={`${row.meal.name} cooking`} size="small" maxWidth="520px" body={
                    <CookingDetails row={row} cooking={cooking} starSign={starSign} silkrode={silkrode} />
                }>
                    <Box gap="xxsmall" tabIndex={0} style={{ cursor: "help", minWidth: "125px" }}>
                        <Text size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px" }}>
                            {row.targetCost > 0 ? formatTime(row.targetHours) : "Reached"}
                        </Text>
                        <Text size="xsmall" color="accent-2">{row.contribution > 0 ? "Current kitchens" : "All kitchens"}</Text>
                        {row.contribution > 0 && <Text size="xsmall">{notateNumber(row.contribution, "Smaller")} speed / hour</Text>}
                    </Box>
                </TipDisplay>;
            }
        },
        {
            property: "ribbonLevel",
            header: "Ribbon",
            render: ({ meal }: MealRow) => meal.ribbonLevel > 0 ? <Box direction="row" gap="xsmall" align="center">
                <IconImage data={cooking.ribbons.getImageData(meal.ribbonLevel)} scale={0.65} />
                <Box gap="xxsmall">
                    <Text size="xsmall">Rank {meal.ribbonLevel}</Text>
                    <Text size="xsmall" color="accent-2">×{notateNumber(meal.getRibbonBonus(), "Smaller")}</Text>
                </Box>
            </Box> : <Text size="xsmall" color="accent-2">None</Text>
        },
        {
            property: "cookMasterLevel",
            header: "Meal Mastery",
            render: ({ meal }: MealRow) => <Box direction="row" gap="xsmall" align="center" style={{ opacity: meal.cookMasterLevel > 0 ? 1 : 0.6 }}>
                <IconImage data={meal.getMasteryImageData()} scale={0.75} />
                <Box gap="xxsmall">
                    <Text size="xsmall">Level {meal.cookMasterLevel}</Text>
                    <Text size="xsmall" color="accent-2">×{notateNumber(meal.getBonusMultiCook(), "Smaller")}</Text>
                </Box>
            </Box>
        }
    ];

    return <UpgradeTable
        tableName="Cooking meals"
        variant="panel"
        minWidth="1250px"
        primaryKey="mealIndex"
        columns={columns}
        data={rows}
        filters={filters}
        onFiltersChange={onFiltersChange}
        sortOptions={sortOptions}
        searchPlaceholder="Meal name or bonus..."
        showLockedAndMaxedFilters={false}
        emptyMessage="No meals match. Change the filters or search."
        additionalFilters={<>
            <Box direction="row" gap="xsmall" align="center">
                <Text size="small">Status:</Text>
                <Select size="small" aria-label="Meal status" value={controls.status}
                    options={["All", "Discovered", "Undiscovered", "Maxed", "Below max level", "Currently cooking", "Daily target"]}
                    onChange={({ value }) => onControlsChange({ ...controls, status: value })} />
            </Box>
            <Box direction="row" gap="xsmall" align="center">
                <Text size="small">Ribbon:</Text>
                <Select size="small" aria-label="Meal ribbon" value={controls.ribbon}
                    options={["All", "With ribbon", "Without ribbon"]}
                    onChange={({ value }) => onControlsChange({ ...controls, ribbon: value })} />
            </Box>
            <Box direction="row" gap="xsmall" align="center">
                <Text size="small">Mastery:</Text>
                <Select size="small" aria-label="Meal Mastery" value={controls.mastery}
                    options={["All", "With levels", "No levels"]}
                    onChange={({ value }) => onControlsChange({ ...controls, mastery: value })} />
            </Box>
        </>}
    />;
}
