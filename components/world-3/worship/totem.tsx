import {
    Box,
    Grid,
    ResponsiveContext,
    Text,
    TextInput,
} from 'grommet'
import { useContext, useState } from 'react';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Worship as WorshipDomain } from '../../../data/domain/worship';
import ShadowBox from "../../base/ShadowBox";
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

export function TotemDisplay() {
    const [efficiency, setEfficiency] = useState<number>(0);
    const [effFoodBonus, setEffFoodBonus] = useState<number>(0);
    const theData = useAppDataStore((state) => state.data.getData());
    const size = useContext(ResponsiveContext);

    const worship = theData.get("worship") as WorshipDomain;

    return (
        <Box gap="medium">
            {
                worship.totalizer.unlockedBonuses.length > 0 &&
                <Box gap="medium" width="large">
                    <Text>Totalizer bonuses</Text>
                    <Grid columns={{ count: 'fit', size: 'small' }}>
                        {
                            worship.totalizer.unlockedBonuses.map((bonus, index) => (
                                <ShadowBox key={index} background="dark-1" pad="small" justify='center' margin={{ right: 'small', bottom: 'xsmall' }}>
                                    <Box direction='row'>
                                        <Text size='small'>{worship.totalizer.getBonusText(bonus)}</Text>
                                    </Box>
                                </ShadowBox>
                            ))
                        }
                    </Grid>
                </Box>
            }
            <Box width="medium" gap="medium" direction="row">
                <ComponentAndLabel
                    label="Worship Efficiency"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={efficiency}
                        onChange={event => setEfficiency(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <ComponentAndLabel
                    label="Worship food effect"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={effFoodBonus}
                        onChange={event => setEffFoodBonus(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
            </Box>
            <Box>
                <Text size="xsmall">* Base XP is assuming multiplier of 1x.</Text>
                <Text size="xsmall">* You need a minimum efficiency of 60, 250, 1000, 3000, 8000, and 25000 on the respective totems to get bonus souls.</Text>
            </Box>
            <Grid columns={{ count: size == "small" ? 1 : 2, size: 'auto' }}>
                {
                    worship.totemInfo.map((totem, index) => (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }}>
                            <Grid columns={{ count: 5, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                <TextAndLabel text={totem.name} label="Name" />
                                <TextAndLabel text={totem.map.data.map.name ?? ""} label="Area" />
                                <TextAndLabel text={totem.maxWave.toString()} label="Max Wave" />
                                <TextAndLabel text={Math.floor(totem.getExpRewards() / totem.getChargeCost()).toString()} label="XP Per Charge" />
                                <TextAndLabel text={totem.getSoulRewards(efficiency, effFoodBonus).toString()} label="Souls" />
                            </Grid>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )

}