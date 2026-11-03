import { Box, Grid, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { useContext } from "react";
import IconImage from "../../base/IconImage";
import TextAndLabel from "../../base/TextAndLabel";
import { Item } from "../../../data/domain/items";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { notateNumber } from "../../../data/utility";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

export default function GrottoView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const grotto = hole.grotto;
    const theme = useContext(ThemeContext);
    const requirement = grotto.getMushroomKillRequirement();
    const opals = hole.cavernOpalSources.find(source => source.id === "cavern:8")!.opals;
    const effects = [
        { index: 46, label: "Lootie Drop Rate", value: grotto.effects.lootieBonusPercent },
        { index: 47, label: "Expie Class EXP", value: grotto.effects.expieBonusPercent },
        { index: 48, label: "Opie Villager EXP", value: grotto.effects.opieBonusPercent },
    ];

    return <Box gap="medium">
        <CavernMetricStrip metrics={[
            { label: "Layer", value: notateNumber(grotto.layer) },
            { label: "Monarch HP", value: notateNumber(grotto.getMonarchHp()) },
            { label: "Opals found", value: notateNumber(opals), image: Item.getImageData("Opal") },
        ]} />

        <Box gap="small">
            <Text size="medium" weight={500}>Mushroom kill progress</Text>
            <Box direction="row" gap="medium" align="center" wrap>
                <Box gap="xxsmall" style={{ flex: "1 1 240px", minWidth: 0 }}>
                    <Text size="xsmall" color="accent-2">Current colony</Text>
                    <Text size="small">{notateNumber(grotto.mushroomKills)} / {notateNumber(requirement)}</Text>
                    <progress
                        aria-label="Current colony mushroom kills toward Monarch"
                        value={grotto.mushroomKills}
                        max={requirement}
                        style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }}
                    />
                </Box>
            </Box>
        </Box>

        <Grid columns={{ size: "small", count: "fit" }} gap="small">
            {effects.map(effect => <Box key={effect.index} background="dark-1" pad="medium" direction="row" gap="small" align="center">
                <IconImage data={hole.schematics.find(schematic => schematic.index === effect.index)!.getImageData()} scale={0.4} />
                <TextAndLabel label={effect.label} labelSize="xsmall" textSize="small" text={`${notateNumber(effect.value)}%`} />
            </Box>)}
        </Grid>

        <CavernStudySummary study={hole.studies[8]} onOpenStudies={onOpenStudies} />
    </Box>;
}
