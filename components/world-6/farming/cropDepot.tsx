import { Box, Text } from "grommet";
import { Crop, Farming, Seed } from "../../../data/domain/world-6/farming";
import ShadowBox from "../../base/ShadowBox";
import { nFormatter, toTime } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

export const CropDepotDisplay = ({silkRodeChip, starSignEquipped} : {silkRodeChip: boolean, starSignEquipped: boolean}) => {
    const theData = useAppDataStore((state) => state.data.getData());
    const farming = theData.get("farming") as Farming;
    
    if (!farming) {
        return null;
    }

    return (
        <Box>
            {
                farming.seeds.map((seed, index) => (
                    <SeedSection key={index} seed={seed} farming={farming} silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped} />
                ))
            }
            <Text size="xxxsmall">If you ever find the name of a ??? crop send a message in the Discord server</Text>
        </Box>
    )
}

const SeedSection = ({ seed, farming, silkRodeChip, starSignEquipped }: { seed: Seed, farming: Farming, silkRodeChip: boolean, starSignEquipped: boolean }) => {
    return (       
        <ShadowBox style={{ opacity: (seed?.data?.lvlReq ?? 0) > farming.farmingLevel ? 0.5 : 1 }} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="left">
            <Box align="center" direction="row">
                <Text size="medium">{seed?.data?.name} SEED {(seed?.data?.lvlReq ?? 0) > farming.farmingLevel ? `(Lv required : ${(seed?.data?.lvlReq ?? 0)})` : `(Cycle time : ${toTime(seed.getFullCycleGrowthTime() / farming.growthRate)})`}</Text>
            </Box>
            <Box gap="xxsmall" direction="row" wrap>
                {
                    farming.cropDepot.filter(crop => crop.seed.index == seed.index).map((crop, index) => {
                        const nextCropChance = crop.getEvolutionChance(starSignEquipped, silkRodeChip) * 100;
                        return (
                            <Box key={index} style={{ opacity: crop.discovered ? 1 : 0.5 }} border={{ color: 'grey-1' }} margin={{ bottom: 'xxsmall' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center">
                                <TipDisplay
                                    size='medium'
                                    heading={farming.getCropName(crop.index)}
                                    body={
                                        <Text>Next Crop chance : {nFormatter(Math.min(100, nextCropChance))}%</Text>
                                    }
                                    direction={TipDirection.Down}
                                >
                                    <Box direction="row" pad={{ vertical: 'xsmall' }} align="center" gap='xsmall'>
                                        <IconImage data={Crop.getCropIconData(crop.index)} />
                                        <Text size="xsmall">{nFormatter(Math.floor(crop.quantityOwned))}</Text>
                                    </Box>
                                </TipDisplay>
                            </Box>
                        )
                    })
                }
            </Box>
        </ShadowBox>
    )
}