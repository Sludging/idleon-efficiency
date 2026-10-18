import { Box, Button, Grid, Text } from "grommet";
import type { ReactNode } from "react";
import IconImage from "../../base/IconImage";
import TipDisplay from "../../base/TipDisplay";
import type { ImageData } from "../../../data/domain/imageData";
import type { Study, StudyEffect } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, nFormatter, notateNumber } from "../../../data/utility";

export type CavernMetric = {
    label: string;
    value: ReactNode;
    image?: ImageData;
    tooltip?: ReactNode;
};

export function CavernMetricStrip({ metrics }: { metrics: CavernMetric[] }) {
    return <Box>
        <Grid columns={{ size: "auto", count: metrics.length }} gap="none" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
            {metrics.map((metric, index) => {
                const content = <Box direction="row" gap="xsmall" align="center" style={{ minWidth: 0 }}>
                    {metric.image && <IconImage data={metric.image} scale={0.75} />}
                    <Text size="small" style={{ overflowWrap: "anywhere" }}>{metric.value}</Text>
                </Box>;
                return <Box key={metric.label} gap="xxsmall" pad={{ vertical: "xsmall", right: "small", left: index ? "small" : undefined }} border={index < metrics.length - 1 ? { side: "right", color: "grey-1" } : undefined} style={{ minWidth: 0 }}>
                    {metric.tooltip ? <TipDisplay heading={metric.label} body={metric.tooltip} size="small">{content}</TipDisplay> : content}
                    <Text size="xsmall" color="accent-2">{metric.label}</Text>
                </Box>;
            })}
        </Grid>
    </Box>;
}

function formatEffect(value: number | null, suffix = "", reason?: string | null): string {
    if (value === null) return `Unavailable${reason ? `: ${reason}` : ""}`;
    if (suffix === "") return value.toLocaleString("en-US", { maximumFractionDigits: 20 });
    return `${Number.isInteger(value) ? commaNotation(value) : nFormatter(value, "MultiplierInfo")}${suffix}`;
}

export function Benefit({ index, effects, dailyPurchases }: { index: number; effects: StudyEffect[]; dailyPurchases: number | null }) {
    const values = new Map(effects.map(effect => [effect.key, effect]));
    const value = (key: string, suffix = "") => {
        const effect = values.get(key)!;
        return typeof effect.value === "number" ? formatEffect(effect.value, suffix) : formatEffect(null, "", effect.unavailableReason);
    };
    let main: ReactNode;
    let detail: ReactNode = null;
    if ([1, 7, 11, 16].includes(index)) {
        main = "Cheaper layers in other skilling caverns";
    } else {
        switch (index) {
            case 0: main = `${value("sediment-retained-after-expansion", "%")} sediment retained; +${value("bucket-fill-per-expansion", "%")} bucket fill per expansion`; break;
            case 2: main = `${value("score-per-defeated-golden-hound", "×")} golden hound score`; break;
            case 3: main = `Minimum damage: ${value("minimum-damage-share-of-maximum", "%")} of maximum`; break;
            case 4: main = `+${value("random-bonus-levels-every-twentieth-ring")} random bonus levels every twentieth ring`; break;
            case 5: main = `${value("string-experience", "×")} string EXP`; detail = `${value("exceptional-string-experience-chance", "%")} chance for ${value("exceptional-string-experience", "×")} exceptional string EXP.`; break;
            case 6: main = `+${value("additional-daily-wishes")} daily wishes`; break;
            case 8: main = `${value("credited-gloomie-kills", "×")} credited Gloomie kills`; break;
            case 9: main = `+${value("additional-linear-reward-days")} reward days; ${value("opal-reward-chance", "×")} Opal reward chance`; break;
            case 10: main = `${value("enchantment-chance", "×")} enchantment chance`; break;
            case 12: main = `+${value("additional-starting-attempts")} starting attempts`; break;
            case 13: main = `+${value("total-gambit-points", "%")} Gambit points`; break;
            case 14: main = `+${value("additional-double-torch-chance", "%")} double-torch chance`; break;
            case 15: main = `${value("marble-production", "×")} marble production`; break;
            case 17: {
                const cost = values.get("discounted-upgrade-cost")!;
                const discount = typeof cost.value === "number" ? formatEffect(100 - cost.value * 100, "%") : formatEffect(null, "", cost.unavailableReason);
                main = `First ${value("daily-discounted-upgrades")} upgrades each day cost ${discount} less`;
                detail = `Saved upgrades today: ${formatEffect(dailyPurchases, "", "Saved Cove purchases today are missing.")}.`;
                break;
            }
        }
    }
    const missing = effects.filter(effect => effect.value === null);
    return <Box gap="xxsmall" data-testid={`benefit-${index}`}>
        <Text size="small">{main}</Text>
        {detail && <Text size="xsmall" color="accent-2">{detail}</Text>}
        {missing.length > 0 && <Text size="small" data-testid={`benefit-missing-${index}`}>{[...new Set(missing.map(effect => effect.unavailableReason))].join(" ")}</Text>}
    </Box>;
}

function Progress({ study, requirement }: { study: Study; requirement: number | null }) {
    const current = study.progressAvailable ? study.progress : null;
    return <Box gap="xxsmall" data-testid={`study-progress-${study.index}`}>
        <Text size="xsmall" color="accent-2">Progress to next level</Text>
        <Text size="small">{current === null ? "Unavailable: Saved Study progress is missing." : notateNumber(current)} / {requirement === null ? "Unavailable: Saved Study level or requirement is missing." : notateNumber(requirement)}</Text>
        {current !== null && requirement !== null && requirement > 0 && <Box background="grey-1" height="8px" overflow="hidden" role="progressbar" aria-label="Study progress to next level" aria-valuemin={0} aria-valuemax={requirement} aria-valuenow={current}>
            <Box background="brand" height="8px" flex={false} style={{ width: `${100 * Math.min(1, Math.max(0, current / requirement))}%` }} />
        </Box>}
    </Box>;
}

export function CavernStudySummary({ study, onOpenStudies }: { study: Study; onOpenStudies: () => void }) {
    const status = study.access === false ? "Locked"
        : study.access === null ? "Unavailable: Saved cavern access is missing."
            : study.participation === "inactive" ? "Inactive"
                : study.participation === "target" || study.participation === "neighbor"
                    ? `Study rate: ${study.progressPerHour === null ? `Unavailable${study.rateUnavailableReason ? `: ${study.rateUnavailableReason}` : ""}` : `${notateNumber(study.progressPerHour)}/hr`}`
                    : `Unavailable: ${study.rateUnavailableReason ?? "Saved Study participation is missing."}`;
    return <Box gap="small" pad={{ top: "small" }} border={{ side: "top", color: "grey-1" }} data-testid={`cavern-study-${study.index}`}>
        <Box direction="row" justify="between" align="center">
            <Text size="medium" weight={500}>Study</Text>
            <Button plain label="All Studies" size="small" onClick={onOpenStudies} data-testid="open-studies" />
        </Box>
        <Box direction="row" justify="between" align="center" gap="small" wrap>
            <Box direction="row" align="center" gap="small" wrap style={{ minWidth: 0, flex: "1 1 auto" }}>
                <Text size="small" weight={500}>Level {study.levelAvailable ? notateNumber(study.level) : "Unavailable: Saved Study level is missing."}</Text>
                <Text size="xsmall">{study.levelAvailable ? study.getDescription().replace(/_/g, " ") : "Effect unavailable"}</Text>
            </Box>
            <Text size="xsmall" color="accent-2" data-testid={`study-status-${study.index}`} style={{ flexShrink: 0, marginLeft: "auto" }}>{status}</Text>
        </Box>
        <Progress study={study} requirement={study.getRequirement()} />
    </Box>;
}
