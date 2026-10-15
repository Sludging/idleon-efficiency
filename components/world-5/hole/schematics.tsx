import { useState } from "react";
import { Box, CheckBox, Text } from "grommet";
import type { Hole, Schematic } from "../../../data/domain/world-5/hole/hole";
import DataRow from "../../base/DataRow";
import { Cost, CurrencyUses, Description, Disclosure, EffectValues, Search, Values, exact, number, precise, readable, schematicState, selectStyle, state } from "./upgradeInspection";

type ConstructionFilter = "All" | "Unbuilt" | "Built";

function SchematicRow({ row, hole }: { row: Schematic; hole: Hole }) {
    return <Box>
        <DataRow columns={["minmax(0, 2fr)", "minmax(0, 1fr)", "minmax(0, 2fr)"]} fields={[
            { key: "name", kind: "identity", name: readable(row.data.name) },
            { key: "state", kind: "text", label: "Construction / availability", value: `${schematicState(row)} · ${state(row.available, "Available", "Locked")}` },
            { key: "currency", kind: "content", label: "Construction currency", content: <Cost currency={row.currency} cost={row.currentCost} shortfall={row.shortfall} affordable={row.affordable} built={row.saveAvailable && row.built} /> },
        ]} details={[
            { key: "benefit", label: !row.saveAvailable ? "Ownership unavailable" : row.built ? "Owned benefit" : "Schematic purpose (not owned)", content: <Description value={row.saveAvailable && row.built ? row.getDescription() : row.data.desc} /> },
            { key: "details", label: null, content: <Disclosure title="Requirements, effects, and shared currency">
                <Values values={[
                    { label: "Required Kaipu level", value: number(row.requiredKaipuLevel) },
                    { label: "Saved access", value: state(row.available, "Available", "Locked") },
                    { label: "Next-construction discount stacks", value: number(row.discountStacks) },
                    { label: "Cost multiplier", value: precise(row.discountMultiplier, "×") },
                ]} />
                <Text size="small" style={{ overflowWrap: "anywhere" }}>Exact stock: {exact(row.currency.stock)} {readable(row.currency.data.name)}. {row.saveAvailable && row.built ? "Built; no next construction cost or shortfall." : `Exact discounted cost: ${exact(row.currentCost)}. Exact shortfall: ${exact(row.shortfall)}.`}</Text>
                <EffectValues effects={row.getEffects()} />
                <CurrencyUses hole={hole} currency={row.currency} />
            </Disclosure> },
        ]} />
    </Box>;
}

export default function Schematics({ hole }: { hole: Hole }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<ConstructionFilter>("All");
    const [showUnlocked, setShowUnlocked] = useState(false);
    const schematics = hole.releasedSchematics;
    const kaipu = hole.villagers[1];
    const term = search.toLowerCase();
    const visible = schematics.filter(row => `${readable(row.data.name)} ${readable(row.data.desc)} ${readable(row.currency.data.name)}`.toLowerCase().includes(term)
        && (!showUnlocked || row.available === true)
        && (filter === "All" || row.saveAvailable && (filter === "Built" ? row.built : !row.built)));
    return <Box gap="small">
        <Values values={[
            { label: "Kaipu saved level", value: number(kaipu.saveAvailable ? kaipu.level : null) },
            { label: "Next-construction discount stacks", value: number(schematics[0].discountStacks) },
            { label: "Cost multiplier", value: precise(schematics[0].discountMultiplier, "×") },
        ]} />
        <Text size="xsmall">The saved Lamp discount applies to the next construction only. Construction consumes it in game. Inspection does not spend or consume it.</Text>
        <Search system="schematics" value={search} onChange={setSearch} />
        <Box direction="row" gap="small" align="center">
            <select aria-label="Construction state" value={filter} onChange={event => setFilter(event.target.value as ConstructionFilter)} style={selectStyle}>
                {(["All", "Unbuilt", "Built"] as const).map(name => <option key={name}>{name}</option>)}
            </select>
            <CheckBox label="Show unlocked" checked={showUnlocked} onChange={event => setShowUnlocked(event.target.checked)} />
        </Box>
        <Text size="small">{visible.length} of {schematics.length} released Schematics · Game order</Text>
        {visible.length === 0 && <Text>No Schematics match. Clear search or change the filters.</Text>}
        {visible.map(row => <SchematicRow key={row.index} row={row} hole={hole} />)}
    </Box>;
}
