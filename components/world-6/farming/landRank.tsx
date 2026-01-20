import { Box, Grid, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { Farming } from "../../../data/domain/world-6/farming";
import ShadowBox from "../../base/ShadowBox";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import TextAndLabel from "../../base/TextAndLabel";

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
                <Box direction="row" gap="medium">
                    <TextAndLabel label="Total Land Ranks :" text={farming.landRankPointsTotal.toString()} margin={{ bottom: 'small' }} />
                    <TextAndLabel label="Points Left to Spend :" text={(farming.landRankPointsTotal-farming.landRankPointsSpent).toString()} margin={{ bottom: 'small' }} />
                </Box>
                <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 5) }} fill>
                    {
                        farming.landrankDatabase.upgrades.map((upgrade, index) => {
                            let label = "";
                            if (!upgrade.unlocked) {
                                label = `Get ${upgrade.unlockThreshold - farming.landRankPointsTotal} more land ranks to unlock this`;
                            }

                            return (
                                <ShadowBox key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                    <Box gap="small" justify="between" fill>
                                        <Box style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }}>
                                            <TextAndLabel textSize='xsmall' text={upgrade.getUpgradeBonusText()} label={`${upgrade.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level}${upgrade.fifthColumnBonus ? `/${upgrade.maxLevel}` : ``})` : ``}`} />
                                        </Box>                                       
                                        <Text color="accent-2" size="small">{upgrade.fifthColumnBonus && upgrade.level >= upgrade.maxLevel ? "MAXED" : label}</Text>
                                    </Box>
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </ShadowBox>
        </Box>
    )
}
