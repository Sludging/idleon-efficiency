import { Box, Text } from "grommet";
import { useRef, type KeyboardEvent, type ReactNode } from "react";
import type { ResearchContributor, ResearchContributorReward } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";

function sourceName(source: string): string {
    if (source === "World 7 merit: +{ Research PTS.") return "World 7 Research Point merit";
    if (source.startsWith("Posty Note: Research level ")) return source.replace("Posty Note: Research level ", "Posty Note, level ");
    return source.replace(/^(Sushi|Companion): /, "");
}

function rewardText(reward: ResearchContributorReward, source: string): string {
    const value = reward.operation === "multiply" ? `×${notateNumber(reward.value, "Smaller")}`
        : `${reward.value >= 0 ? "+" : ""}${notateNumber(reward.value, "Smaller")}${reward.operation === "addPercent" ? "%" : ""}`;
    const repeatedBasis = reward.basis === "milestone" && source.startsWith("Posty Note: Research level ")
        || reward.basis === "level two" && source.includes("level two");
    const basis = reward.basis && reward.basis !== "unlock" && !repeatedBasis ? ` ${reward.basis}` : "";
    return `${value} ${reward.unit}${basis}`;
}

export function useResearchTooltipScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const body = ref.current;
        if (!body || event.altKey || event.ctrlKey || event.metaKey) return;

        // Keep focus on the trigger because Grommet closes its Tip when the trigger loses focus.
        switch (event.key) {
            case "ArrowDown": body.scrollTop += 40; break;
            case "ArrowUp": body.scrollTop -= 40; break;
            case "PageDown": body.scrollTop += body.clientHeight; break;
            case "PageUp": body.scrollTop -= body.clientHeight; break;
            case "Home": body.scrollTop = 0; break;
            case "End": body.scrollTop = body.scrollHeight; break;
            default: return;
        }
        event.preventDefault();
    };
    return { ref, onKeyDown };
}

export function ResearchSourceValue({ label, value, children }: { label: string; value: string; children: ReactNode }) {
    const { ref: tooltipRef, onKeyDown: onTooltipKeyDown } = useResearchTooltipScroll();
    return <ComponentAndLabel label={label} labelSize="xsmall" component={<TipDisplay heading={label}
        body={<Box ref={tooltipRef} tabIndex={0} flex={false} data-research-source-tooltip={label}
            style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>{children}</Box>}
        maxWidth="620px" size="small">
        <Text tabIndex={0} onKeyDown={onTooltipKeyDown} size="small" data-research-source-value={label}
            style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>{value}</Text>
    </TipDisplay>} />;
}

export default function ResearchSources({ entries, unit }: { entries: readonly ResearchContributor[]; unit: "Point" | "Shape" }) {
    return <Box flex={false} gap="xxsmall">
        {entries.map((entry, index) => {
            const reward = entry.reward;
            const inactive = reward ? !reward.active : entry.operation === "multiply" ? entry.value === 1 : entry.value === 0;
            const applied = entry.operation === "multiply" ? `×${notateNumber(entry.value, "Smaller")} ${unit}${entry.value === 1 ? "" : "s"}`
                : `${entry.value >= 0 ? "+" : ""}${commaNotation(entry.value)}${entry.operation === "addPercent" ? "%" : ""} ${unit}${Math.abs(entry.value) === 1 ? "" : "s"}`;
            const differs = reward && (entry.operation !== reward.operation || entry.value !== reward.value);
            const meaningfulApplied = entry.operation === "multiply" ? entry.value !== 1 : entry.value !== 0;
            const gate = entry.source.startsWith("Posty Note: Research level ")
                && entry.gate === entry.source.replace("Posty Note: ", "") ? undefined : entry.gate;
            const requiredLevel = reward?.requiredResearchLevel;
            const levelConveyed = requiredLevel !== undefined
                && new RegExp(`Research level ${requiredLevel}\\b`).test(`${entry.source} ${gate ?? ""}`);
            return <Box flex={false} key={`${entry.source}-${index}`} gap="xxsmall" data-contributor-source={entry.source}
                style={{ opacity: inactive ? 0.6 : 1 }}>
                <Text size="xsmall">
                    {sourceName(entry.source)}: {reward && inactive ? rewardText(reward, entry.source) : applied}
                    {reward && differs && (!inactive || meaningfulApplied)
                        ? inactive ? ` (applied: ${applied})` : ` (intrinsic: ${rewardText(reward, entry.source)})` : ""}
                    {entry.cap !== undefined && ` · Cap: ${commaNotation(entry.cap)} ${unit}${entry.cap === 1 ? "" : "s"}`}
                    {gate && ` · ${gate}`}
                    {requiredLevel !== undefined && !levelConveyed && ` · Research level ${commaNotation(requiredLevel)}`}
                </Text>
            </Box>;
        })}
    </Box>;
}
