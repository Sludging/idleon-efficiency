import { Box, Button, CheckBox, Grid, Select, Text, TextInput } from "grommet";
import { useState } from "react";
import type { ResearchGrid, ResearchGridBonus } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import ResearchSources, { ResearchSourceValue, useResearchTooltipScroll } from "./researchSources";

const amount = (value: number) => notateNumber(value, "Smaller");
const yesNo = (value: boolean) => value ? "Yes" : "No";
const gridStates = ["All", "Leveled", "Reachable", "Unreachable"] as const;
type GridState = typeof gridStates[number];
type LinkedField = { key: string; label: string; value: string };

function linkedFields(upgrade: ResearchGridBonus): LinkedField[] {
    const fields: LinkedField[] = [];
    const state = upgrade.linkedState;
    if (state) {
        switch (state.kind) {
            case "eclecticSigils":
                fields.push(
                    { key: "grant", label: "Research grant", value: yesNo(state.researchGranted) },
                    { key: "lore", label: "Lore Boss 7 completed", value: yesNo(state.loreCompleted) },
                    { key: "unlocked", label: "Effective unlocked state", value: yesNo(state.effectiveUnlocked) },
                );
                break;
            case "cookingMastery":
                fields.push(
                    { key: "mastery", label: "Cooking Mastery unlocked", value: yesNo(state.masteryUnlocked) },
                    { key: "grant", label: "Research grant", value: yesNo(state.researchGranted) },
                    { key: "exp", label: "Current EXP multiplier", value: `×${amount(state.expMultiplier)}` },
                    { key: "active", label: "Effective active state", value: yesNo(state.effectiveActive) },
                );
                break;
            case "undeadBattalion":
                fields.push(
                    { key: "grant", label: "Research grant", value: yesNo(state.researchGranted) },
                    { key: "qualifying", label: "Qualifying boats", value: `${commaNotation(state.qualifyingBoatCount)} / ${commaNotation(state.totalBoatCount)}` },
                    { key: "affected", label: "Effective affected boats", value: commaNotation(state.effectiveBoatCount) },
                );
                break;
            case "crowns":
                fields.push(
                    { key: "crowns", label: "Reclaimed Gaming crowns", value: commaNotation(state.crownCount) },
                    { key: "per-crown", label: "Bonus per crown", value: `${amount(state.bonusPerCrown)}%` },
                    { key: "total", label: "Current total bonus", value: `${amount(state.totalBonus)}%` },
                );
                break;
            case "glimboTrades":
                fields.push(
                    { key: "trades", label: "Total Glimbo trades", value: commaNotation(state.totalTrades) },
                    { key: "blocks", label: "Complete 100-trade blocks", value: commaNotation(state.completeTradeBlocks) },
                    { key: "per-block", label: "Bonus per block", value: `${amount(state.bonusPerBlock)}%` },
                    { key: "total", label: "Current total bonus", value: `${amount(state.totalBonus)}%` },
                );
                break;
            case "masterclass":
                fields.push(
                    { key: "classes", label: "Affected classes", value: state.classes.join(", ") },
                    { key: "grant", label: "Research grant", value: yesNo(state.researchGranted) },
                    { key: "daily", label: "Daily reduction", value: `${amount(state.dailyReductionPercent)}%` },
                    { key: "current-reduction", label: "Accumulated current reduction", value: `${amount(state.accumulatedReductionPercent)}%` },
                );
                break;
            case "divineDesign":
                fields.push(
                    { key: "drop-rate", label: "Drop Rate", value: `${amount(state.dropRatePercent)}%` },
                    { key: "arctis", label: "Arctis grant", value: yesNo(state.arctisGranted) },
                    { key: "doot", label: "King Doot condition", value: state.dootActive ? "Met" : "Not met" },
                    { key: "grid-contribution", label: "Shared Grid contribution", value: `${amount(state.sharedGridContributionPercent)}%` },
                );
                break;
        }
    }
    for (const prerequisite of upgrade.prerequisites) {
        switch (prerequisite.kind) {
            case "lore":
                fields.push(
                    { key: `tunnel-${prerequisite.tunnelIndex}`, label: "Owning tunnel", value: prerequisite.name },
                    { key: "lore-requirement", label: "Lore Boss 7 requirement", value: prerequisite.met ? "Met" : "Not met" },
                );
                break;
            case "cookingMastery":
                fields.push({ key: "mastery-requirement", label: "Cooking Mastery", value: prerequisite.met ? "Unlocked" : "Locked" });
                break;
            case "undeadBattalion":
                fields.push(
                    { key: "boat-level", label: "Boat requirement", value: "Combined loot and speed level 400" },
                    { key: "boat-count", label: "Boats meeting requirement", value: `${commaNotation(prerequisite.qualifyingBoatCount)} / ${commaNotation(prerequisite.totalBoatCount)}` },
                    { key: "boat-requirement", label: "Boat condition", value: prerequisite.met ? "Met" : "Not met" },
                );
                break;
        }
    }
    return fields;
}

function upgradeState(upgrade: ResearchGridBonus): Exclude<GridState, "All"> {
    if (upgrade.getLevel() > 0) return "Leveled";
    return upgrade.reachable ? "Reachable" : "Unreachable";
}

function UpgradeCard({ research, upgrade, description }: { research: ResearchGrid; upgrade: ResearchGridBonus; description: string }) {
    const state = upgradeState(upgrade);
    const shape = upgrade.activeOwner === undefined ? undefined : research.shapes[upgrade.activeOwner];
    const image = shape?.getImageData();
    const linked = linkedFields(upgrade);
    const { ref: tooltipRef, onKeyDown: onTooltipKeyDown } = useResearchTooltipScroll();
    return <Box background="dark-1" pad="small" gap="small" data-upgrade-index={upgrade.index}
        style={{ opacity: state === "Leveled" ? 1 : state === "Reachable" ? 0.65 : 0.35, minWidth: 0 }}>
        <Box direction="row" justify="between" align="start" gap="xsmall">
            <Box gap="xxsmall" flex style={{ minWidth: 0 }}>
                <Text size="small" weight="bold" data-card-name>{upgrade.data.name}</Text>
                <Text size="xsmall" data-card-level>Level {commaNotation(upgrade.getLevel())}/{commaNotation(upgrade.maxLevel)}</Text>
            </Box>
            {shape && image && <TipDisplay heading={shape.data.name} maxWidth="620px" size="small"
                body={<Box data-active-owner-tooltip={upgrade.index}><Text size="small">Grid bonus: ×{amount(upgrade.shapeMultiplier)}</Text></Box>}>
                <Box tabIndex={0} data-active-owner={shape.index} aria-label={`Active Shape for ${upgrade.data.name}: ${shape.data.name}`}
                    flex={false} style={{ cursor: "help" }}>
                    <IconImage data={image} scale={Math.min(1, 36 / Math.max(image.width, image.height))} />
                </Box>
            </TipDisplay>}
        </Box>
        <ComponentAndLabel label="Description" labelSize="small"
            component={<Text size="small" data-card-description>{description}</Text>} />
        {linked.length > 0 && <TipDisplay heading="Linked effect and conditions" maxWidth="620px" size="small"
            body={<Box ref={tooltipRef} tabIndex={0} flex={false} data-linked-details-tooltip={upgrade.index} gap="small"
                style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                {linked.map(field => <Box flex={false} key={field.key}>
                    <TextAndLabel label={field.label} text={field.value} textSize="xsmall" labelSize="xsmall" labelColor="dark-1" />
                </Box>)}
            </Box>}>
            <Text tabIndex={0} onKeyDown={onTooltipKeyDown} size="xsmall" data-linked-details aria-label={`Linked details for ${upgrade.data.name}`}
                style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>Linked details</Text>
        </TipDisplay>}
    </Box>;
}

export default function ResearchGridDisplay({ research }: { research: ResearchGrid }) {
    const [query, setQuery] = useState("");
    const [state, setState] = useState<GridState>("All");
    const [showMaxed, setShowMaxed] = useState(true);
    const normalizedQuery = query.trim().toLowerCase();
    const upgrades = research.upgrades.map(upgrade => ({
        upgrade,
        description: upgrade.getDescription().replace(/_/g, " ").replace(/\s*@\s*/g, " ").trim(),
    })).filter(({ upgrade, description }) => (upgrade.data.name.toLowerCase().includes(normalizedQuery)
        || description.toLowerCase().includes(normalizedQuery))
        && (state === "All" || upgradeState(upgrade) === state)
        && (showMaxed || upgrade.getLevel() < upgrade.maxLevel));
    const { points } = research;
    const changed = query !== "" || state !== "All" || !showMaxed;
    return <Box as="section" id="research-grid" gap="small" aria-label="Grid">
        <Box direction="row" wrap gap="medium" align="end" data-research-points>
            <ResearchSourceValue label="Points" value={`${points.available < 0 ? "-" : ""}${commaNotation(Math.abs(points.available))}/${commaNotation(points.earned)} available`}>
                <Box flex={false} gap="small">
                    <ResearchSources entries={points.contributors} unit="Point" />
                    <Text size="small">Each purchased level costs 1 Point.</Text>
                    <Text size="small">{commaNotation(points.milestone.pointsPerTenLevelBlock)} Points per ten-level block; {commaNotation(points.milestone.reachedTenLevelBlocks)} blocks reached.</Text>
                    <Text size="small">{points.milestone.explanation}</Text>
                </Box>
            </ResearchSourceValue>
            <TextAndLabel label="Shared Grid factor" text={`×${amount(research.getGridBonusAllmulti())}`} textSize="small" labelSize="xsmall" />
        </Box>
        <Box direction="row" wrap gap="small" align="center">
            <Box width="medium">
                <ComponentAndLabel label={<label htmlFor="research-grid-search"><Text size="xsmall" color="accent-2">Search</Text></label>}
                    component={<TextInput id="research-grid-search" aria-label="Search Grid upgrade names or effects" placeholder="Search names or effects"
                        style={{ height: "48px" }} value={query} onChange={event => setQuery(event.target.value)} />} />
            </Box>
            <Box width="small">
                <ComponentAndLabel label={<label htmlFor="research-grid-state"><Text size="xsmall" color="accent-2">State</Text></label>}
                    component={<Select id="research-grid-state" aria-label="Grid State" size="medium" options={[...gridStates]}
                        value={state} onChange={({ option }) => setState(option)} />} />
            </Box>
            <Box justify="center">
                <CheckBox id="research-show-maxed" label={<Text size="small">Show maxed</Text>} checked={showMaxed}
                    onChange={event => setShowMaxed(event.target.checked)} />
            </Box>
            {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery("")} />}
            {changed && <Button plain label={<Text size="small" color="brand">Clear filters</Text>}
                onClick={() => { setQuery(""); setState("All"); setShowMaxed(true); }} />}
            <Text size="xsmall" color="accent-2">{upgrades.length} upgrades</Text>
        </Box>
        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
            {upgrades.map(({ upgrade, description }) => <UpgradeCard key={upgrade.index} research={research} upgrade={upgrade} description={description} />)}
        </Grid>
        {upgrades.length === 0 && <Box background="dark-1" pad="small"><Text data-research-grid-empty>No Grid upgrades match these filters.</Text></Box>}
    </Box>;
}
