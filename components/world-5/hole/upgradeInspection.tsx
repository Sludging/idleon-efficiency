import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Box, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
import type { HoleCurrency, Measurement } from "../../../data/domain/world-5/hole/hole";
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

export function Cost({ currency, cost, affordable, id }: {
    currency: HoleCurrency; cost: number | null; affordable: boolean | null; id: string;
}) {
    const image = currency.getImageData();
    const known = cost !== null && currency.stock !== null && affordable !== null;
    const state = known ? affordable ? "sufficient" : "insufficient" : "unavailable";
    const color = known ? affordable ? "green-2" : "status-critical" : "text";
    return <Box data-cost={id} data-cost-state={state} direction="row" align="center" gap="xsmall">
        {image && <Box data-resource-art flex={false}><IconImage data={image} scale={0.6} /></Box>}
        <Text data-cost-value size="14px" color={color}>
            {number(currency.stock)} / {number(cost)}{image ? "" : ` ${readable(currency.data.name)}`}
        </Text>
    </Box>;
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
