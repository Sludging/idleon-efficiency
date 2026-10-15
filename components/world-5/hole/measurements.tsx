import { Box, Text } from "grommet";
import type { Hole, Measurement } from "../../../data/domain/world-5/hole/hole";
import DataRow from "../../base/DataRow";
import { LocalTip, ResourceCost, exact, measurementName, number, precise, purpose, readable } from "./upgradeInspection";

function MeasurementRow({ row, hole }: { row: Measurement; hole: Hole }) {
    const unit = row.statisticUnit === "study-levels" ? "Study levels" : row.statisticUnit === "none" ? "" : row.statisticUnit;
    const benefit = row.effectiveBenefit;
    const owned = row.saveAvailable && row.level > 0;
    return <DataRow columns={["minmax(0, 2.2fr)", "minmax(0, 1.7fr)", "minmax(0, 1.8fr)"]} fields={[
        { key: "effect", kind: "content", label: null, content: <Box gap="xxsmall">
            <LocalTip heading="Measurement benefit" body={<>
                <Text size="small">Required Minau level: {row.requiredMinauLevel} · {row.access === null ? "Access unavailable" : row.access ? "Available" : "Locked"}</Text>
                <Text size="small">Base benefit including Lengthmeister: {precise(row.baseBenefit, "%")}</Text>
                <Text size="small">Lengthmeister: {row.benefitAvailable ? precise(row.cosmosBonus, "%") : "Unavailable"}</Text>
                {benefit === null && <Text size="small">{row.rawStatistic === null ? row.statisticUnavailableReason : "Saved level or Lengthmeister inputs are missing."}</Text>}
            </>}><Text size="small">Lv. {number(row.saveAvailable ? row.level : null)}{row.access === false ? ` · Locked · Minau ${row.requiredMinauLevel}` : row.access === null ? " · Access unavailable" : ""}</Text></LocalTip>
            <Text size="xsmall">{owned && benefit !== null ? readable(row.getDescription()) : purpose(row.data.description)}</Text>
            {row.saveAvailable && row.level === 0 && <Text size="xsmall" color="accent-2">Not owned</Text>}
            {benefit === null && <Text size="xsmall">Benefit unavailable</Text>}
        </Box> },
        { key: "statistic", kind: "content", label: measurementName(row), content: <LocalTip heading={measurementName(row)} body={<>
            <Text size="small">Exact statistic: {exact(row.rawStatistic)} {unit}</Text>
            {row.rawStatistic === null && <Text size="small">{row.statisticUnavailableReason}</Text>}
        </>}><Box gap="xxsmall">
            <Text size="small">{number(row.rawStatistic)} {unit}</Text>
            <Text size="xsmall" color="accent-2">{precise(row.multiplier, "×")}</Text>
        </Box></LocalTip> },
        { key: "cost", kind: "content", label: "Next level", content: <ResourceCost hole={hole} currency={row.currency} cost={row.nextCost} shortfall={row.shortfall} owner={`m-${row.index}`} /> },
    ]} />;
}

export default function Measurements({ hole }: { hole: Hole }) {
    const minau = hole.villagers[3];
    return <Box gap="small">
        <Box direction="row" gap="medium">
            <Text size="small">Minau Lv. {number(minau.saveAvailable ? minau.level : null)}</Text>
            <Text size="small">Fountain price discount: {precise(hole.measurements[0].fountainDiscountPercent, "%")}</Text>
        </Box>
        {hole.measurements.map(row => <MeasurementRow key={row.index} row={row} hole={hole} />)}
    </Box>;
}
