import { Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import { SummonBonus } from "../../../data/domain/world-6/summoning";

export const SummoningBonuses = ({ bonuses }: { bonuses: SummonBonus[] }) => {
    if (bonuses.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Grid columns={{ size: 'auto', count: 4 }} margin={{top:"small"}} fill>
                {
                    bonuses.map((bonus, index) => {
                        return (
                            <ShadowBox style={{ opacity: bonus.bonusValue > 0 ? 1 : 0.6 }} key={index} background={bonus.data.bonusId >= 21 ? "blue-2" : "dark-1"} margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                <Text size="small">{bonus.getBonusText()}</Text>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        )
    }
}