import { useState } from "react";
import { Box, Text, TextInput } from "grommet";
import type { Hole, Schematic } from "../../../data/domain/world-5/hole/hole";
import DataRow from "../../base/DataRow";
import SmallButton from "../../base/SmallButton";
import { LocalTip, ResourceCost, exact, hasMissingValue, number, precise, purpose, readable, schematicState } from "./upgradeInspection";

function SchematicRow({ row, hole }: { row: Schematic; hole: Hole }) {
    const owned = row.saveAvailable && row.built;
    const description = owned ? row.getDescription() : row.data.desc;
    const benefitLabel = owned ? (row.numericBenefitAvailable ? "Benefit" : "Benefit unavailable") : "Purpose";
    return <DataRow columns={["minmax(0, 1.2fr)", "minmax(0, 2.6fr)", "minmax(0, 0.9fr)", "minmax(0, 1.6fr)"]} fields={[
        { key: "name", kind: "identity", name: readable(row.data.name) },
        { key: "benefit", kind: "text", label: benefitLabel, role: "description", value: hasMissingValue(description) ? purpose(description) : readable(description) },
        { key: "state", kind: "text", label: `Kaipu ${number(row.requiredKaipuLevel)}`, value: schematicState(row) },
        { key: "cost", kind: "content", label: null, content: <ResourceCost hole={hole} currency={row.currency} cost={row.currentCost} shortfall={row.shortfall} built={owned} owner={`s-${row.index}`} /> },
    ]} />;
}

export default function Schematics({ hole }: { hole: Hole }) {
    const [search, setSearch] = useState("");
    const schematics = hole.releasedSchematics;
    const kaipu = hole.villagers[1];
    const term = search.toLowerCase();
    const visible = schematics.filter(row => `${readable(row.data.name)} ${readable(row.data.desc)} ${readable(row.currency.data.name)}`.toLowerCase().includes(term));
    const discount = schematics[0];
    return <Box gap="small">
        <Box direction="row" gap="medium" align="center">
            <Text size="small">Kaipu Lv. {number(kaipu.saveAvailable ? kaipu.level : null)}</Text>
            <LocalTip heading="Next construction discount" body={<>
                <Text size="small">Saved Lamp stacks: {exact(discount.discountStacks)}</Text>
                <Text size="small">This discount applies to the next construction. Construction consumes these stacks in game.</Text>
            </>}><Text size="small">Lamp: {discount.discountMultiplier === null ? "Unavailable" : precise(100 * (1 - discount.discountMultiplier), "%")} off next construction</Text></LocalTip>
        </Box>
        <Box direction="row" gap="small" align="center">
            <TextInput aria-label="Search schematics" placeholder="Search name, effect, or currency" value={search} onChange={event => setSearch(event.target.value)} />
            <SmallButton label="Clear search" disabled={!search} onClick={() => setSearch("")} style={{ whiteSpace: "nowrap", flexShrink: 0 }} />
            <Text size="xsmall" style={{ whiteSpace: "nowrap" }}>{visible.length} / {schematics.length}</Text>
        </Box>
        {visible.length === 0 && <Text>No Schematics match.</Text>}
        {visible.map(row => <SchematicRow key={row.index} row={row} hole={hole} />)}
    </Box>;
}
