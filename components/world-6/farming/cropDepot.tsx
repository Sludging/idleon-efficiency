import { Box, Text } from "grommet";
import { Crop, Farming, Seed } from "../../../data/domain/world-6/farming";
import ShadowBox from "../../base/ShadowBox";
import { nFormatter, toTime } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

export const CropDepotDisplay = () => {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const farming = theData.get("farming") as Farming;
    
    if (!farming) {
        return null;
    }

    return (
        <Box>
            {
                farming.seeds.map((seed, index) => (
                    <SeedSection key={index} seed={seed} farming={farming}/>
                ))
            }
            <Text size="xxxsmall">If you ever find a decent name for a ??? crop send a message in the Discord server</Text>
        </Box>
    )
}

const SeedSection = ({ seed, farming}: { seed: Seed, farming: Farming}) => {
    return (       
        <ShadowBox style={{ opacity: (seed?.data?.lvlReq ?? 0) > farming.farmingLevel ? 0.5 : 1 }} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="left">
            <Box align="center" direction="row">
                <Text size="medium">{seed?.data?.name} SEED {(seed?.data?.lvlReq ?? 0) > farming.farmingLevel ? `(Lv required : ${(seed?.data?.lvlReq ?? 0)})` : `(Cycle time : ${toTime(seed.getFullCycleGrowthTime() / farming.growthRate)})`}</Text>
            </Box>
            <Box gap="xxsmall" direction="row" wrap>
                {
                    farming.cropDepot.filter(crop => crop.seed.index == seed.index).map((crop, index) => {
                        return (
                            <Box key={index} style={{ opacity: crop.discovered ? 1 : 0.5 }} border={{ color: 'grey-1' }} margin={{ bottom: 'xxsmall' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center">
                                <TipDisplay
                                    size='medium'
                                    heading={farming.getCropName(crop.index)}
                                    body={
                                        <Box></Box>
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