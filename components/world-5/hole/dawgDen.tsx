import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import { Item } from "../../../data/domain/items";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, notateNumber } from "../../../data/utility";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

export default function DawgDenView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const den = hole.dawgDen;
    const opals = hole.cavernOpalSources.find(source => source.id === "cavern:2")!.opals;

    return <Box gap="medium">
        <CavernMetricStrip metrics={[
            { label: "Best score", value: notateNumber(den.bestScore) },
            { label: "Next Opal score", value: notateNumber(den.nextOpalScore) },
            { label: "Score multiplier", value: `${notateNumber(den.scoreMultiplier, "MultiplierInfo").replace("#", "")}×` },
            { label: "Opals found", value: commaNotation(opals), image: Item.getImageData("Opal") },
        ]} />
        <Grid columns={["flex", "flex"]} gap="medium">
            {den.modifiers.map(modifier => <ShadowBox key={modifier.index} background="dark-1" pad="medium" gap="small">
                <Box direction="row" align="center" justify="between" gap="small">
                    <Box direction="row" align="center" gap="small">
                        <IconImage data={modifier.getImageData()} style={{ flexShrink: 0 }} />
                        <Text size="small" weight={500}>{modifier.data.name.replace(/_/g, " ")}</Text>
                    </Box>
                    <Text size="xsmall" color="accent-2" style={{ flexShrink: 0 }}>
                        Lv. {commaNotation(modifier.level)} / {commaNotation(modifier.data.maxVal)}
                    </Text>
                </Box>
                <Text size="small">
                    {modifier.data.desc.replace("{", notateNumber(modifier.getEffect(), "Smaller")).replace(/_/g, " ")}
                </Text>
            </ShadowBox>)}
        </Grid>
        <CavernStudySummary study={hole.studies[2]} onOpenStudies={onOpenStudies} />
    </Box>;
}
