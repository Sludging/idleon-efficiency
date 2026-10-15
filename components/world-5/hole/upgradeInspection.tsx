import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Box, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
import type { Hole, HoleCurrency, Measurement, Schematic } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay from "../../base/TipDisplay";

export const readable = (value: string) => value.replace(/_/g, " ").replace(/ @ /g, " · ");
export const number = (value: number | null) => value === null ? "Unavailable" : notateNumber(value);
export const exact = (value: number | null) => value === null ? "Unavailable"
    : Number.isInteger(value) && Math.abs(value) < 1e21 ? commaNotation(value)
        : value.toLocaleString("en-US", { maximumFractionDigits: 20 });
export const precise = (value: number | null, suffix = "") => value === null ? "Unavailable" : `${Number(value.toPrecision(6)).toLocaleString("en-US", { maximumFractionDigits: 12 })}${suffix}`;
export const hasMissingValue = (value: string) => /[{}|$#]|\+%|\bx\b|\b[YZ]\b|:[!%](?=[,\s]|$)/.test(readable(value));

export function purpose(value: string): string {
    return readable(value)
        .replace(/ · Total Bonus:.*$/, "")
        .replace(/:([!#$%])(?=[,\s]|$)/g, ":")
        .replace(/\+?[{}|$#][%x]?|\+%|\bx\b|\b[YZ]\b/g, "")
        .replace(/(?:\s*·\s*)+$/g, "")
        .replace(/\s+/g, " ").trim();
}

export function schematicState(row: Schematic): string {
    if (!row.saveAvailable) return "Ownership unavailable";
    if (row.built) return `Built${row.available === null ? " · Access unavailable" : row.available === false ? " · Locked" : ""}`;
    return row.available === null ? "Access unavailable" : row.available ? "Available" : "Locked";
}

export function measurementName(row: Measurement): string {
    switch (row.statisticUnit) {
        case "study-levels": return "Total Study levels";
        case "damage": return "Highest recorded damage";
        default: return readable(row.data.measurementType.name).replace(/\blv\b/gi, "levels").replace(/\bpts\b/gi, "points").replace(/\bDeathnote\b/gi, "Death Note");
    }
}

export function LocalTip({ heading, body, children }: { heading: string; body: ReactNode; children: ReactNode }) {
    return <TipDisplay heading={heading} maxWidth="560px" size="small" body={<Box style={{ maxHeight: "330px", overflowY: "auto", overflowWrap: "anywhere" }}><Box flex={false} gap="xsmall">{body}</Box></Box>}>
        <Box direction="row" gap="xsmall" align="center">{children}<CircleInformation size="12px" /></Box>
    </TipDisplay>;
}

export function ResourceCost({ hole, currency, cost, shortfall, built = false, owner }: {
    hole: Hole; currency: HoleCurrency; cost: number | null; shortfall: number | null; built?: boolean; owner: string;
}) {
    const image = currency.getImageData();
    const schematics = hole.releasedSchematics.filter(row => row.currency.index === currency.index && owner !== `s-${row.index}`);
    const measurements = hole.measurements.filter(row => row.currency.index === currency.index && owner !== `m-${row.index}`);
    return <LocalTip heading={readable(currency.data.name)} body={<>
        <Text size="small">Exact stock: {exact(currency.stock)} {readable(currency.data.name)}</Text>
        <Text size="small">{built ? "Built; no next construction cost or shortfall." : `Current cost: ${exact(cost)}. Exact shortfall: ${exact(shortfall)}.`}</Text>
        {schematics.length > 0 && <Box gap="xxsmall">
            <Text size="small" weight="bold">Other Schematics</Text>
            {schematics.map(row => <Text size="xsmall" key={row.index}>{readable(row.data.name)} · {schematicState(row)} · {row.saveAvailable && row.built ? "No next cost" : `${exact(row.currentCost)} ${readable(currency.data.name)}`}</Text>)}
        </Box>}
        {measurements.length > 0 && <Box gap="xxsmall">
            <Text size="small" weight="bold">Other Measurements</Text>
            {measurements.map(row => <Text size="xsmall" key={row.index}>{measurementName(row)} · {purpose(row.data.description)} · Lv. {number(row.saveAvailable ? row.level : null)} · {row.access === null ? "Access unavailable" : row.access ? "Available" : "Locked"} · {exact(row.nextCost)} {readable(currency.data.name)}</Text>)}
        </Box>}
        {(schematics.length > 0 || measurements.length > 0) && <Text size="xsmall">These purchases share stock. Individually affordable purchases compete for the same stock.</Text>}
    </>}>
        <Box direction="row" align="center" gap="xsmall">
            {image && <Box flex={false}><IconImage data={image} scale={0.65} /></Box>}
            <Box gap="xxsmall">
                <Text size="small">{readable(currency.data.name)}{built ? "" : ` · ${number(cost)}`}</Text>
                {!built && <Text size="xsmall" color="accent-2">Shortfall: {number(shortfall)}</Text>}
            </Box>
        </Box>
    </LocalTip>;
}

function scrollOwner(element: HTMLElement | null): HTMLElement {
    let owner = element?.parentElement ?? null;
    while (owner) {
        if (/(auto|scroll)/.test(getComputedStyle(owner).overflowY) && owner.scrollHeight > owner.clientHeight) return owner;
        owner = owner.parentElement;
    }
    return document.scrollingElement as HTMLElement;
}

export function usePreservedScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const pending = useRef<{ owner: HTMLElement; top: number } | null>(null);
    const [minHeight, setMinHeight] = useState(0);

    useLayoutEffect(() => {
        if (pending.current) {
            pending.current.owner.scrollTop = pending.current.top;
            pending.current = null;
        }
    });

    function preserveScroll(change: () => void) {
        const owner = scrollOwner(ref.current);
        pending.current = { owner, top: owner.scrollTop };
        // Keep enough local extent so a shorter panel cannot clamp the scroll owner.
        const height = ref.current?.getBoundingClientRect().height ?? 0;
        setMinHeight(current => Math.max(current, height));
        change();
    }

    return { ref, minHeight, preserveScroll };
}
