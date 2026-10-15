import type { ReactNode } from "react";
import { Box, Text, TextInput } from "grommet";
import type { Hole, HoleCurrency, HoleUpgradeEffect, Measurement, Schematic } from "../../../data/domain/world-5/hole/hole";
import { notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import SmallButton from "../../base/SmallButton";
import TextAndLabel from "../../base/TextAndLabel";

export const selectStyle = { font: "inherit", color: "inherit", background: "#1E2127", padding: "8px", border: "1px solid #6B747F", minWidth: 0 };
export const readable = (value: string) => value.replace(/_/g, " ").replace(/ @ /g, " · ");
export const number = (value: number | null) => value === null ? "Unavailable" : notateNumber(value);
export const exact = (value: number | null) => value === null ? "Unavailable" : value.toLocaleString("en-US", { maximumFractionDigits: 20 });
export const precise = (value: number | null, suffix = "") => value === null ? "Unavailable" : `${Number(value.toPrecision(6)).toLocaleString("en-US", { maximumFractionDigits: 12 })}${suffix}`;
export const state = (value: boolean | null, yes: string, no: string) => value === null ? "Unavailable" : value ? yes : no;
export const schematicState = (row: Schematic) => !row.saveAvailable ? "Construction unavailable" : row.built ? "Built" : "Unbuilt";
export const measurementEffect = (row: Measurement) => readable(row.data.description).replace(/\+\{%/g, "").trim();

export function measurementName(row: Measurement): string {
    switch (row.statisticUnit) {
        case "study-levels": return "Total Study levels";
        case "damage": return "Highest recorded damage";
        default: return readable(row.data.measurementType.name).replace(/\blv\b/gi, "levels").replace(/\bpts\b/gi, "points").replace(/\bDeathnote\b/gi, "Death Note");
    }
}

export function Description({ value }: { value: string }) {
    const source = readable(value);
    const missing = /[{}|$#]|\+%|\bx\b|\b[YZ]\b|:[!%](?=[,\s]|$)/.test(source);
    const text = missing ? source.replace(/:([!#$%])(?=[,\s]|$)/g, ":").replace(/\+?[{}|$#][%x]?|\+%|\bx\b|\b[YZ]\b/g, "").replace(/\s+/g, " ").trim() : source;
    return <Box gap="xxsmall">
        <Text size="small">{text}</Text>
        {missing && <Text size="xsmall">Effect value unavailable. Required inputs are missing or this benefit is not owned.</Text>}
    </Box>;
}

export function Values({ values }: { values: { label: string; value: string }[] }) {
    return <Box direction="row" wrap gap="small">{values.map(value => <TextAndLabel key={value.label} label={value.label} text={value.value} textSize="small" />)}</Box>;
}

export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
    return <details><summary style={{ cursor: "pointer" }}>{title}</summary><Box gap="small" margin={{ top: "small" }}>{children}</Box></details>;
}

export function EffectValues({ effects }: { effects: HoleUpgradeEffect[] }) {
    return <Box gap="xxsmall">{effects.map(effect => {
        const label = effect.key.includes(":")
            ? effect.unit === "rule" ? "Ownership" : effect.key.endsWith(":intrinsic") ? "Intrinsic effect" : "Owned effect"
            : readable(effect.key.replace(/-/g, " "));
        const value = effect.value === null ? "Unavailable: required saved inputs are missing."
            : typeof effect.value === "boolean" ? effect.value ? "Owned rule" : "Not owned"
                : precise(effect.value, effect.unit === "percent" ? "%" : effect.unit === "multiplier" ? "×" : effect.unit === "per-hour" ? " per hour" : " count");
        return <Text key={effect.key} size="xsmall">{label}: {value}</Text>;
    })}</Box>;
}

export function Cost({ currency, cost, shortfall, affordable, built = false }: {
    currency: HoleCurrency; cost: number | null; shortfall: number | null; affordable: boolean | null; built?: boolean;
}) {
    const image = currency.getImageData();
    return <Box direction="row" gap="small" align="center">
        {image && <IconImage data={image} scale={0.75} />}
        <Box gap="xxsmall">
            <Text size="small">{readable(currency.data.name)} · {built ? "Built; no next construction cost" : `Next cost: ${number(cost)}`}</Text>
            <Text size="xsmall" color="accent-2">Stock: {number(currency.stock)}{built ? "" : ` · Shortfall: ${number(shortfall)} · ${state(affordable, "Enough stock", "Insufficient stock")}`}</Text>
        </Box>
    </Box>;
}

export function Search({ value, onChange, system }: { value: string; onChange: (value: string) => void; system: string }) {
    return <Box direction="row" gap="small" align="center">
        <TextInput aria-label={`Search ${system}`} placeholder="Search name, effect, or currency" value={value} onChange={event => onChange(event.target.value)} />
        <SmallButton label="Clear search" disabled={value === ""} onClick={() => onChange("")} style={{ whiteSpace: "nowrap", flexShrink: 0 }} />
    </Box>;
}

export function CurrencyUses({ hole, currency }: { hole: Hole; currency: HoleCurrency }) {
    const schematics = hole.releasedSchematics.filter(row => row.currency.index === currency.index);
    const measurements = hole.measurements.filter(row => row.currency.index === currency.index);
    return <Box gap="small" style={{ overflowWrap: "anywhere" }}>
        <Text size="small">All released uses of {readable(currency.data.name)}, including locked entries. Stock is shared, not reserved.</Text>
        <Text size="small">{schematics.length} Schematics · {measurements.length} Measurements</Text>
        {schematics.map(row => <Text size="xsmall" key={`s-${row.index}`}>Schematic: {readable(row.data.name)} · {schematicState(row)} · {state(row.available, "Available", "Locked")} · {row.saveAvailable && row.built ? "No next construction cost" : `Current cost: ${exact(row.currentCost)} ${readable(currency.data.name)}`}</Text>)}
        {measurements.map(row => <Text size="xsmall" key={`m-${row.index}`}>Measurement: {measurementName(row)} · {measurementEffect(row)} · Level {number(row.saveAvailable ? row.level : null)} · {state(row.access, "Accessible", "Locked")} · Current cost: {exact(row.nextCost)} {readable(currency.data.name)}</Text>)}
        <Text size="xsmall" color="accent-2">This list covers camp Schematics and Measurements only. Individually affordable purchases compete for the same stock.</Text>
    </Box>;
}
