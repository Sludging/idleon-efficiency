import { Box, Grid, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { Farming } from "../../../data/domain/world-6/farming";
import ShadowBox from "../../base/ShadowBox";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";

export const LandRankDisplay = () => {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const farming = theData.get("farming") as Farming;
    const size = useContext(ResponsiveContext);
    
    if (!farming) {
        return null;
    }

    return (
        <Box gap="medium" width="100%">
            <ShadowBox pad="small">
            <ComponentAndLabel
                label={`Total Land Ranks : ${farming.landRankPointsTotal} (points left to spend : ${farming.landRankPointsTotal-farming.landRankPointsSpent})`}
                component={
                    <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 5) }} fill>
                        {
                            farming.landRankUpgrades.map((upgrade, index) => {
                                let label = "";
                                if (!upgrade.unlocked) {
                                    label = `Get ${upgrade.unlockThreshold - farming.landRankPointsTotal} more land ranks to unlock this`;
                                }

                                return (
                                    <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Box gap="small" justify="between" fill>
                                            <TextAndLabel textSize='xsmall' text={upgrade.bonusText} label={`${upgrade.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level})` : ``}`} />
                                            {
                                                upgrade.unlocked ?
                                                    <ComponentAndLabel
                                                        label={label}
                                                        component={
                                                            <Box gap="xsmall" direction="row" align="center">
                                                                <Text size="small">{upgrade.uniqueLevelBonus && upgrade.level > 0 ? "MAXED" : ""}</Text>
                                                            </Box>                                                                       
                                                        }
                                                    />                                                        
                                                :
                                                <ComponentAndLabel
                                                    label={label}
                                                    component={
                                                        <Box/>
                                                    }
                                                /> 
                                            }                                            
                                        </Box>
                                    </ShadowBox>
                                )
                            })
                        }
                    </Grid>
                }
            />
            </ShadowBox>
        </Box>
    )
}