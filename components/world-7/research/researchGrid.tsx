import { Box, Button, Grid, ResponsiveContext, Text, TextInput } from "grommet";
import { useContext, useState } from "react";
import type { ResearchGrid, ResearchGridBonus } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import DataRow, { type DataRowDetail } from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import ResearchSources from "./researchSources";

const amount = (value: number) => notateNumber(value, "Smaller");
const yesNo = (value: boolean) => value ? "Yes" : "No";
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

function UpgradeRow({ research, upgrade, description }: { research: ResearchGrid; upgrade: ResearchGridBonus; description: string }) {
    const shape = upgrade.activeOwner === undefined ? undefined : research.shapes[upgrade.activeOwner];
    const image = shape?.getImageData();
    const linked = linkedFields(upgrade);
    const details: DataRowDetail[] = [{
        key: "factors", label: "Current factors", content: <Box direction="row" wrap gap="small" align="center">
            <Text size="xsmall">Shared Grid factor: ×{amount(upgrade.allBonusMultiplier)}</Text>
            {shape && image ? <Box direction="row" align="center"><IconImage data={image} scale={Math.min(1, 36 / Math.max(image.width, image.height))} /><Text size="xsmall">{shape.data.name}: ×{amount(upgrade.shapeMultiplier)}</Text></Box>
                : <Text size="xsmall">No active Shape</Text>}
        </Box>,
    }];
    if (linked.length > 0) {
        details.push({ key: "linked", label: "Linked effect and conditions", content: <Box direction="row" wrap gap="small">
            {linked.map(field => <TextAndLabel key={field.key} label={field.label} text={field.value} textSize="xsmall" labelSize="xsmall" />)}
        </Box> });
    }
    return <Box data-upgrade-index={upgrade.index}>
        <DataRow opacity={upgrade.getLevel() > 0 ? 1 : 0.6}
            columns={["minmax(0, 23fr)", "minmax(0, 12fr)", "minmax(0, 43fr)", "minmax(0, 22fr)"]}
            fields={[
                { key: "identity", kind: "identity", name: upgrade.data.name },
                { key: "level", kind: "text", label: "Level / cap", value: `${commaNotation(upgrade.getLevel())} / ${commaNotation(upgrade.maxLevel)}${upgrade.atCap ? " · Maxed" : ""}` },
                { key: "effect", kind: "text", label: "Current effect", value: description, role: "description" },
                { key: "access", kind: "text", label: "Grid access", value: upgrade.reachable ? "Reachable" : "Requires a purchased adjacent square",
                    tooltip: <Text size="small">Adjacent squares are directly left, right, above, or below. Point balance and other requirements do not determine Grid access.</Text> },
            ]}
            details={details} />
    </Box>;
}

export default function ResearchGridDisplay({ research }: { research: ResearchGrid }) {
    const size = useContext(ResponsiveContext);
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim().toLowerCase();
    const upgrades = research.upgrades.map(upgrade => ({
        upgrade,
        description: upgrade.getDescription().replace(/_/g, " ").replace(/\s*@\s*/g, " ").trim(),
    })).filter(({ upgrade, description }) => upgrade.data.name.toLowerCase().includes(normalizedQuery)
        || description.toLowerCase().includes(normalizedQuery));
    const { points, pointMilestone } = research;
    return <Box as="section" id="research-grid" gap="small" aria-label="Grid">
        <Box background="dark-1" pad="medium" gap="small" data-research-points>
            <Text size="small" weight="bold">Points</Text>
            <Grid columns={["minmax(0, 38fr)", "minmax(0, 62fr)"]} gap="medium">
                <Box gap="small">
                    <Box direction="row" wrap gap="medium">
                        <TextAndLabel label="Available" text={points.available < 0 ? `-${commaNotation(Math.abs(points.available))}` : commaNotation(points.available)} textSize="small" labelSize="xsmall" />
                        <TextAndLabel label="Earned" text={commaNotation(points.earned)} textSize="small" labelSize="xsmall" />
                        <TextAndLabel label="Spent" text={commaNotation(points.spent)} textSize="small" labelSize="xsmall" />
                    </Box>
                    <Text size="xsmall">Each purchased level costs 1 Point.</Text>
                    <Text size="xsmall">{commaNotation(pointMilestone.cumulativeMilestonePoints)} cumulative Points · {commaNotation(pointMilestone.pointsPerTenLevelBlock)} Points per ten Research levels</Text>
                </Box>
                <Box gap="small">
                    <Text size="xsmall" weight="bold">Point sources · applied Points</Text>
                    <ResearchSources entries={points.contributors} unit="Point" />
                </Box>
            </Grid>
        </Box>
        <Box direction={size === "small" ? "column" : "row"} wrap={size !== "small"} gap="small" align={size === "small" ? "start" : "end"}>
            <Box width={size === "small" ? "100%" : "medium"}>
                <ComponentAndLabel label={<label htmlFor="research-grid-search"><Text size="xsmall" color="accent-2">Search</Text></label>}
                    component={<TextInput id="research-grid-search" aria-label="Search Grid upgrade names or effects" placeholder="Search names or effects"
                        style={{ height: "48px" }} value={query} onChange={event => setQuery(event.target.value)} />} />
            </Box>
            {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery("")} />}
        </Box>
        <Box gap="small">
            {upgrades.map(({ upgrade, description }) => <UpgradeRow key={upgrade.index} research={research} upgrade={upgrade} description={description} />)}
        </Box>
        {upgrades.length === 0 && <Box background="dark-1" pad="medium"><Text data-research-grid-empty>No Grid upgrades match this search.</Text></Box>}
    </Box>;
}
