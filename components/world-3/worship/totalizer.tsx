import {
    Box,
    Grid,
    ResponsiveContext,
    Text,
} from 'grommet'
import { useContext } from 'react';
import { Worship as WorshipDomain } from '../../../data/domain/worship';
import ShadowBox from "../../base/ShadowBox";
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

export function TotalizerDisplay() {
    const theData = useAppDataStore((state) => state.data.getData());
    const size = useContext(ResponsiveContext);

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