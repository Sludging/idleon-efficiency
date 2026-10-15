import { useState } from "react";
import { Box, CheckBox, Grid, Text, TextInput } from "grommet";
import { Lock } from "grommet-icons";
import type { Hole, Schematic } from "../../../data/domain/world-5/hole/hole";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import SmallButton from "../../base/SmallButton";
import { Cost, LocalTip, exact, number, precise, purpose, readable } from "./upgradeInspection";

function SchematicCard({ row }: { row: Schematic }) {
    const owned = row.saveAvailable && row.built;
    const state = !row.saveAvailable ? "unknown" : row.built ? "built" : row.available === false ? "locked" : row.available === null ? "access-unavailable" : "unbuilt";
    const effect = owned && row.numericBenefitAvailable ? readable(row.getDescription()) : purpose(row.data.desc);
    return <ShadowBox data-schematic={row.index} data-state={state} background="dark-1" pad="small" gap="xsmall" style={{ minWidth: 0 }}>
        <Box direction="row" align="start" gap="small" style={{ opacity: state === "built" ? 1 : state === "locked" ? 0.76 : 0.88 }}>
            <Box data-schematic-art flex={false}><IconImage data={row.getImageData()} scale={0.48} /></Box>
            <Box gap="xxsmall" style={{ minWidth: 0 }}>
                <Text size="14px" weight={500}>{readable(row.data.name)}</Text>
                {owned && !row.numericBenefitAvailable && <Text size="12px">Benefit unavailable</Text>}
                <Text data-schematic-effect size="12px">{effect}</Text>
            </Box>
        </Box>
        {!row.saveAvailable && <Text size="12px">Ownership unavailable</Text>}
        {row.available === null && <Text size="12px">Access unavailable</Text>}
        {row.available === false && <Box direction="row" align="center" gap="xsmall">
            <Lock size="12px" /><Text size="12px">Requires Kaipu Lv. {number(row.requiredKaipuLevel)}</Text>
        </Box>}
        {!owned && <Cost currency={row.currency} cost={row.currentCost} affordable={row.affordable} id={`s-${row.index}`} />}
    </ShadowBox>;
}

export default function Schematics({ hole }: { hole: Hole }) {
    const [search, setSearch] = useState("");
    const [showOwned, setShowOwned] = useState(true);
    const schematics = hole.releasedSchematics;
    const kaipu = hole.villagers[1];
    const term = search.toLowerCase();
    const visible = schematics.filter(row => (showOwned || !row.saveAvailable || !row.built)
        && `${readable(row.data.name)} ${readable(row.data.desc)} ${readable(row.currency.data.name)}`.toLowerCase().includes(term));
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
        </Box>
        <Box direction="row" align="center" justify="between">
            <CheckBox label="Show Owned" checked={showOwned} onChange={event => setShowOwned(event.target.checked)} />
            <Text size="12px">{visible.length} / {schematics.length}</Text>
        </Box>
        {visible.length === 0 && <Text>No Schematics match.</Text>}
        <Grid data-card-grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{visible.map(row => <SchematicCard key={row.index} row={row} />)}</Grid>
    </Box>;
}
