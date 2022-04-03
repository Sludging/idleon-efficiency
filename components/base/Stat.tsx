import { Box, Text } from "grommet";
import { Stat as StatDomain } from "../../data/domain/base/stat";
import TipDisplay, { TipDirection } from "./TipDisplay";
import TextAndLabel from "./TextAndLabel";
import { nFormatter } from "../../data/utility";

export default function Stat({ stat }: { stat: StatDomain }) {
    return (
        <TipDisplay
            heading={`${stat.name}${stat.max ? `(Max value: ${stat.max})` : ""}`}
            body={
                <Box>
                    {stat.sources.map((source, index) => (
                        <Text key={index}>{source.name}: {nFormatter(source.value, "Smaller")}</Text>
                    ))}
                </Box>
            }
            direction={TipDirection.Down}
            size="small"
        >
            <TextAndLabel label={stat.name} text={`${stat.prefix ? stat.prefix : ''}${nFormatter(stat.value, "Smaller")}${stat.suffix ? stat.suffix : ''}`} />
        </TipDisplay>
    )
}