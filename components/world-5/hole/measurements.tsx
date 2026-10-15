import { useState } from "react";
import { Box, CheckBox, Grid, Text } from "grommet";
import type { Hole, Measurement } from "../../../data/domain/world-5/hole/hole";
import DataRow from "../../base/DataRow";
import { Cost, CurrencyUses, Description, Disclosure, Search, Values, exact, measurementEffect, measurementName, number, precise, readable, state } from "./upgradeInspection";

function MeasurementRow({ row, hole }: { row: Measurement; hole: Hole }) {
    const unit = row.statisticUnit === "none" ? "" : row.statisticUnit === "study-levels" ? "Study levels" : row.statisticUnit;
    return <Box>
        <DataRow columns={["minmax(0, 2fr)", "minmax(0, 1fr)", "minmax(0, 1.4fr)", "minmax(0, 1fr)"]} fields={[
            { key: "name", kind: "identity", name: measurementName(row) },
            { key: "level", kind: "text", label: "Purchased / access", value: `Level ${number(row.saveAvailable ? row.level : null)} · ${state(row.access, "Accessible", "Locked")}` },
            { key: "stat", kind: "text", label: "Raw measured statistic", value: `${number(row.rawStatistic)} ${unit}`.trim() },
            { key: "multiplier", kind: "text", label: "Statistic multiplier", value: precise(row.multiplier, "×") },
        ]} details={[
            { key: "benefit-cost", label: null, content: <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Owned effective benefit</Text>
                    {row.effectiveBenefit === null ? <>
                        <Text size="small">{measurementEffect(row)}</Text>
                        <Text size="small">Unavailable: {row.statisticUnavailableReason ?? "Saved level or Lengthmeister inputs are missing."}</Text>
                    </> : <Description value={row.getDescription()} />}
                </Box>
                <Cost currency={row.currency} cost={row.nextCost} shortfall={row.shortfall} affordable={row.affordable} />
            </Grid> },
            { key: "details", label: null, content: <Disclosure title="Statistic, modifiers, and exact counts">
                {row.rawStatistic === null && <Text size="small">Statistic unavailable: {row.statisticUnavailableReason}</Text>}
                <Values values={[
                    { label: "Required Minau level", value: number(row.requiredMinauLevel) },
                    { label: "Saved access", value: state(row.access, "Accessible", "Locked") },
                    { label: "Normalized quantity (not raw count)", value: precise(row.normalizedQuantity) },
                    { label: "Base benefit including Lengthmeister", value: precise(row.baseBenefit, "%") },
                    { label: "Lengthmeister contribution", value: row.benefitAvailable ? precise(row.cosmosBonus, "%") : "Unavailable" },
                    { label: "Fountain price discount", value: precise(row.fountainDiscountPercent, "%") },
                ]} />
                <Text size="small" style={{ overflowWrap: "anywhere" }}>Raw statistic, exact: {exact(row.rawStatistic)} {unit}. Effective benefit: {precise(row.effectiveBenefit, "%")}.</Text>
                <Text size="small" style={{ overflowWrap: "anywhere" }}>Exact next cost: {exact(row.nextCost)} {readable(row.currency.data.name)}. Exact stock: {exact(row.currency.stock)}. Exact shortfall: {exact(row.shortfall)}.</Text>
                <Text size="xsmall" color="accent-2">Fountain modifies the next price. Lengthmeister modifies the base benefit. Normalization only prepares the statistic multiplier.</Text>
                <CurrencyUses hole={hole} currency={row.currency} />
            </Disclosure> },
        ]} />
    </Box>;
}

export default function Measurements({ hole }: { hole: Hole }) {
    const [search, setSearch] = useState("");
    const [showUnlocked, setShowUnlocked] = useState(false);
    const minau = hole.villagers[3];
    const term = search.toLowerCase();
    const visible = hole.measurements.filter(row => `${measurementName(row)} ${readable(row.data.measurementType.name)} ${readable(row.data.description)} ${readable(row.currency.data.name)}`.toLowerCase().includes(term)
        && (!showUnlocked || row.access === true));
    return <Box gap="small">
        <Values values={[
            { label: "Minau saved level", value: number(minau.saveAvailable ? minau.level : null) },
            { label: "Next access unlock", value: minau.nextUnlock?.releasedMaximum ? "Nothing right now" : minau.nextUnlock ? `Level ${number(minau.nextUnlock.requiredLevel)}` : "Unavailable" },
        ]} />
        <Text size="xsmall">Minau grants access. Resource purchases increase the saved Measurement level.</Text>
        <Search system="measurements" value={search} onChange={setSearch} />
        <CheckBox label="Show unlocked" checked={showUnlocked} onChange={event => setShowUnlocked(event.target.checked)} />
        <Text size="small">{visible.length} of {hole.measurements.length} Measurements · Game order</Text>
        {visible.length === 0 && <Text>No Measurements match. Clear search or turn off Show unlocked.</Text>}
        {visible.map(row => <MeasurementRow key={row.index} row={row} hole={hole} />)}
    </Box>;
}
