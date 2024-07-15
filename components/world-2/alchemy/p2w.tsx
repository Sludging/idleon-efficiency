import { useMemo } from "react";
import { Alchemy, P2W_CAULDRON_BOOST_MAX, P2W_CAULDRON_NEWBUBBLE_MAX, P2W_CAULDRON_SPEED_MAX, P2W_LIQUIDS_CAPACITY_MAX, P2W_LIQUIDS_REGEN_MAX, P2W_VIALS_ATTEMPTS_MAX, P2W_VIALS_RNG_MAX } from "../../../data/domain/alchemy";
import { Box, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { getCoinsArray } from "../../../data/utility";
import CoinsDisplay from "../../coinsDisplay";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

function P2WDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const alchemyData = theData.get("alchemy") as Alchemy;

    const costToMaxVials = useMemo(() => {
        return alchemyData.p2w.getVialsCostToMax("Attempts") + alchemyData.p2w.getVialsCostToMax("RNG");
    }, [alchemyData])

    return (
        <Box>
            <ShadowBox background="dark-2" pad="medium" gap="medium">
                <Box>
                    <Text size="large">Cauldrons</Text>
                    <Box direction="row" pad="small">
                        {
                            Object.entries(alchemyData.p2w.cauldronLevels).map(([cauldronName, cauldronValues], index) => {
                                // Using 'as any' to silence TypeScript until I learn how to handle that better.
                                const costToMax = alchemyData.p2w.getCauldronCostToMax("Speed", cauldronName as any)
                                    + alchemyData.p2w.getCauldronCostToMax("BoostReq", cauldronName as any)
                                    + alchemyData.p2w.getCauldronCostToMax("NewBubble", cauldronName as any);

                                return (
                                    <ShadowBox background="dark-1" key={index} margin={{ right: 'medium' }} pad="medium" gap="medium">
                                        <ComponentAndLabel labelSize="medium" label={cauldronName}
                                            component={
                                                <Box direction="row" gap="medium" wrap>
                                                    <TextAndLabel labelSize="xsmall" textSize="xsmall" label="Speed" text={`${cauldronValues.speed}/${P2W_CAULDRON_SPEED_MAX}`} />
                                                    <TextAndLabel labelSize="xsmall" textSize="xsmall" label="New Bubble" text={`${cauldronValues.newBubble}/${P2W_CAULDRON_NEWBUBBLE_MAX}`} />
                                                    <TextAndLabel labelSize="xsmall" textSize="xsmall" label="Boost Req" text={`${cauldronValues.boostReq}/${P2W_CAULDRON_BOOST_MAX}`} />
                                                </Box>
                                            }
                                        />
                                        {costToMax > 0 && <ComponentAndLabel labelSize="xsmall" label="Cost to max" component={< CoinsDisplay coinMap={getCoinsArray(costToMax)} maxCoins={3} />} />}
                                    </ShadowBox>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box>
                    <Text size="large">Liquids</Text>
                    <Box direction="row" pad="small">
                        {
                            Object.entries(alchemyData.p2w.liquidLevels).map(([liquidName, liquidValues], index) => {
                                // Using 'as any' to silence TypeScript until I learn how to handle that better.
                                const costToMax = alchemyData.p2w.getLiquidCostToMax("Capacity", liquidName as any)
                                    + alchemyData.p2w.getLiquidCostToMax("Regen", liquidName as any)

                                return (
                                    <ShadowBox background="dark-1" key={index} margin={{ right: 'medium' }} pad="medium" gap="medium">
                                        <ComponentAndLabel labelSize="medium" label={liquidName}
                                            component={
                                                <Box direction="row" gap="medium" wrap>
                                                    <TextAndLabel labelSize="xsmall" textSize="xsmall" label="Regen" text={`${liquidValues.regen}/${P2W_LIQUIDS_REGEN_MAX}`} />
                                                    <TextAndLabel labelSize="xsmall" textSize="xsmall" label="Capacity" text={`${liquidValues.capacity}/${P2W_LIQUIDS_CAPACITY_MAX}`} />
                                                </Box>
                                            }
                                        />
                                        {costToMax > 0 && <ComponentAndLabel labelSize="xsmall" label="Cost to max" component={< CoinsDisplay coinMap={getCoinsArray(costToMax)} maxCoins={3} />} />}
                                    </ShadowBox>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box>
                    <Text size="large">Vials</Text>
                    <Box direction="row" pad="small">
                        <ShadowBox background="dark-1" margin={{ right: 'medium' }} pad="medium" gap="medium">
                            <Box direction="row" gap="medium" wrap>
                                <TextAndLabel labelSize="xsmall" textSize="xsmall" label="Attempts" text={`${alchemyData.p2w.vialAttempts}/${P2W_VIALS_ATTEMPTS_MAX}`} />
                                <TextAndLabel labelSize="xsmall" textSize="xsmall" label="RNG" text={`${alchemyData.p2w.vialsRng}/${P2W_VIALS_RNG_MAX}`} />
                            </Box>
                            {costToMaxVials > 0 && <ComponentAndLabel labelSize="xsmall" label="Cost to max" component={< CoinsDisplay coinMap={getCoinsArray(costToMaxVials)} maxCoins={3} />} />}
                        </ShadowBox>
                    </Box>
                </Box>
            </ShadowBox>
        </Box>
    )
}

export default P2WDisplay;