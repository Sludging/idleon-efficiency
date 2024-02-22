import {
    Box,
    Grid,
    ResponsiveContext,
    Text,
} from 'grommet'
import { useContext } from 'react';
import { AppContext } from '../../../data/appContext'
import { Worship as WorshipDomain, Totalizer } from '../../../data/domain/worship';
import ShadowBox from "../../base/ShadowBox";
import IconImage from '../../base/IconImage';

export function TotalizerDisplay() {
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const theData = appContext.data.getData();
    const worship = theData.get("worship") as WorshipDomain;

    if (!worship.totalizer.unlocked) {
        return (
            <Box gap="medium">
                <Text size="medium">You need to unlock the Totalizer for the Miniature Soul Apparatus by buying MSA Totalizer in W5 Gaming Superbits upgrades</Text>
            </Box>
        );
    } else {
        return (
            <Box gap="medium">
                <Grid columns={{ count: 'fit', size: 'medium' }}>
                    {
                        worship.totalizer.unlockedBonuses.map((bonus, index) => (
                            <ShadowBox key={index} background="dark-1" pad="medium" margin={{ right: 'large', bottom: 'small' }}>
                                <Box direction='row' pad="medium">
                                    <IconImage data={worship.totalizer.getBonusImageData(bonus)} ></IconImage>
                                    <Text>{worship.totalizer.getBonusText(bonus)}</Text>
                                </Box>
                            </ShadowBox>
                        ))
                    }
                </Grid>
            </Box>
        );
    }
}