import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning, SummonBonus } from "../../../data/domain/world-6/summoning";

export const SummoningBonuses = ({ bonuses }: { bonuses: SummonBonus[] }) => {
    if (bonuses.length == 0) {
        return <Text>You should start by winning some battles in W6 town first</Text>
    } else {
        return (
            <Grid columns={{ size: 'auto', count: 4 }} margin={{top:"small"}} fill>
                {
                    bonuses.map((bonus, index) => {
                        return (
                            <ShadowBox style={{ opacity: bonus.bonusValue > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                <Text size="small">{bonus.getBonusText()}</Text>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        )
    }
}