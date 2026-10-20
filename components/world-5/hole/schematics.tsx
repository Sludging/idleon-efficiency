import { useState } from "react";
import { Box, CheckBox, Grid, Text, TextInput } from "grommet";
import type { Hole, Schematic } from "../../../data/domain/world-5/hole/hole";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import SmallButton from "../../base/SmallButton";
import { Cost, LocalTip, exact, number, precise, purpose, readable } from "./upgradeInspection";

function SchematicCard({ row }: { row: Schematic }) {
    const owned = row.built;
    const state = row.built ? "built" : row.available ? "unbuilt" : "locked";
    const effect = owned ? readable(row.getDescription()) : purpose(row.data.desc);
    return <ShadowBox data-schematic={row.index} data-state={state} background="dark-1" pad="small" gap="xsmall" style={{ minWidth: 0 }}>
        <Box direction="row" align="start" gap="small" style={{ opacity: state === "built" ? 1 : state === "locked" ? 0.76 : 0.88 }}>
            <Box data-schematic-art flex={false}><IconImage data={row.getImageData()} scale={0.48} /></Box>
            <Box gap="xxsmall" style={{ minWidth: 0 }}>
                <Text size="14px" weight={500}>{readable(row.data.name)}</Text>
                <Text data-schematic-effect size="12px">{effect}</Text>
            </Box>
        </Box>
        {!owned && !row.available && row.requiredKaipuLevel !== null && <Text size="12px" data-schematic-requirement={row.index}>Requires Kaipu Lv. {number(row.requiredKaipuLevel)}</Text>}
        {!owned && row.requiredKaipuLevel === null && <Text size="12px" data-schematic-requirement={row.index}>No Kaipu slot</Text>}
        {!owned && <Cost currency={row.currency} cost={row.currentCost} affordable={row.affordable} id={`s-${row.index}`} />}
    </ShadowBox>;
}

export default function Schematics({ hole }: { hole: Hole }) {
    const [search, setSearch] = useState("");
    const [showOwned, setShowOwned] = useState(true);
    const schematics = hole.schematics;
    const kaipu = hole.villagers[1];
    const term = search.toLowerCase();
    const visible = schematics.filter(row => (showOwned || !row.built)
        && `${readable(row.data.name)} ${readable(row.data.desc)} ${readable(row.currency.data.name)}`.toLowerCase().includes(term));
    const discount = schematics[0];
    return <Box gap="small">
        <Box direction="row" gap="medium" align="center">
            <Text size="small">Kaipu Lv. {number(kaipu.level)}</Text>
            <LocalTip heading="Next construction discount" body={<>
                <Text size="small">Saved Lamp stacks: {exact(discount.discountStacks)}</Text>
                <Text size="small">This discount applies to the next construction. Construction consumes these stacks in game.</Text>
            </>}><Text size="small">Lamp: {precise(100 * (1 - discount.discountMultiplier), "%")} off next construction</Text></LocalTip>
        </Box>
        <Box direction="row" gap="small" align="center">
            <TextInput aria-label="Search schematics" placeholder="Search name, effect, or currency" value={search} onChange={event => setSearch(event.target.value)} />
            <SmallButton label="Clear search" disabled={!search} onClick={() => setSearch("")} style={{ whiteSpace: "nowrap", flexShrink: 0 }} />
        </Box>
        <Box direction="row" align="center" justify="between">
            <CheckBox label="Show Owned" checked={showOwned} onChange={event => setShowOwned(event.target.checked)} />
            <Text size="12px">{visible.length} / {schematics.length}</Text>
        </Box>
        {visible.length === 0 && <Text>No Schematics match.</Text>}
        <Grid data-card-grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{visible.map(row => <SchematicCard key={row.index} row={row} />)}</Grid>
    </Box>;
}
