import { Box, Grid, Text } from "grommet";
import type { ResearchContributor } from "../../../data/domain/world-7/research";
import { notateNumber } from "../../../data/utility";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";

function sourceName(source: string): string {
    if (source === "World 7 merit: +{ Research PTS.") return "World 7 Research Point merit";
    if (source.startsWith("Posty Note: Research level ")) return source.replace("Posty Note: Research level ", "Posty Note, level ");
    return source.replace(/^(Sushi|Companion): /, "");
}

export default function ResearchSources({ entries, unit }: { entries: readonly ResearchContributor[]; unit: "Point" | "Shape" }) {
    return <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap={{ column: "medium", row: "xsmall" }}>
        {entries.map((entry, index) => {
            const label = sourceName(entry.source);
            const value = `${notateNumber(entry.value, "Smaller")} ${unit}${entry.value === 1 ? "" : "s"}`;
            const hasDetails = entry.cap !== undefined || Boolean(entry.gate);
            const content = <Text size="small" data-research-source-value={label}
                tabIndex={hasDetails ? 0 : undefined}
                style={hasDetails ? { textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" } : undefined}>
                {value}
            </Text>;
            return <Box key={`${entry.source}-${index}`} data-contributor-source={entry.source} style={{ opacity: entry.value === 0 ? 0.6 : 1 }}>
                <ComponentAndLabel label={label} labelSize="xsmall" component={hasDetails
                    ? <TipDisplay heading={label} maxWidth="620px" size="small" body={<Box gap="xxsmall">
                        {entry.cap !== undefined && <Text size="xsmall">Cap: {notateNumber(entry.cap, "Smaller")} {unit}{entry.cap === 1 ? "" : "s"}</Text>}
                        {entry.gate && <Text size="xsmall">{entry.gate}</Text>}
                    </Box>}>{content}</TipDisplay>
                    : content} />
            </Box>;
        })}
    </Grid>;
}
