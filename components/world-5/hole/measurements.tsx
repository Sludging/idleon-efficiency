import { Box, Grid, Text } from "grommet";
import type { Hole, Measurement } from "../../../data/domain/world-5/hole/hole";
import ShadowBox from "../../base/ShadowBox";
import { Cost, measurementName, number, precise, purpose, readable } from "./upgradeInspection";

function MeasurementCard({ row }: { row: Measurement }) {
    const unit = row.statisticUnit === "study-levels" ? "Study levels" : row.statisticUnit === "none" ? "" : row.statisticUnit;
    const owned = row.level > 0;
    const effect = owned ? readable(row.getDescription()) : purpose(row.data.description);
    return <ShadowBox data-measurement={row.index} background="dark-1" pad="small" gap="xsmall" style={{ minWidth: 0 }}>
        <Text data-measurement-effect size="20px" weight={700} style={{ lineHeight: "26px" }}>{effect}</Text>
        {!owned && <Text size="12px" color="accent-2">Not owned</Text>}
        <Text data-measurement-support size="12px" color="accent-2">
            Lv. {number(row.level)}{row.access === false ? ` · Requires Minau Lv. ${row.requiredMinauLevel}` : ""}
        </Text>
        <Text data-measurement-statistic data-measurement-support size="12px" color="accent-2">
            {measurementName(row)}: {number(row.rawStatistic)} {unit} · {precise(row.multiplier, "×")}
        </Text>
        <Cost currency={row.currency} cost={row.nextCost} affordable={row.affordable} id={`m-${row.index}`} />
    </ShadowBox>;
}

export default function Measurements({ hole }: { hole: Hole }) {
    const minau = hole.villagers[3];
    return <Box gap="small">
        <Box direction="row" gap="medium">
            <Text size="small">Minau Lv. {number(minau.level)}</Text>
            <Text size="small">Fountain price discount: {precise(hole.measurements[0].fountainDiscountPercent, "%")}</Text>
        </Box>
        <Grid data-card-grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{hole.measurements.map(row => <MeasurementCard key={row.index} row={row} />)}</Grid>
    </Box>;
}
