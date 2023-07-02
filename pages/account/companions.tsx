import {
    Box,
    Text,
    Heading,
    Grid
} from "grommet"
import { useContext } from 'react';
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import ShadowBox from "../../components/base/ShadowBox";
import IconImage from "../../components/base/IconImage";
import { Companion } from "../../data/domain/companions";

function CompanionDisplay() {
    const appContext = useContext(AppContext);
    const theData = appContext.data.getData();
    const companions = theData.get("companions") as Companion[];

    if (!companions) {
        return null;
    }

    return (
        <Box gap="medium">
            <NextSeo title="Storage" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Companions</Heading>
            <Grid columns={{ size: 'auto', count: 4}} gap="medium">
                {
                    companions.map((companion, index) => {
                        return (
                            <ShadowBox background="dark-1" style={{ opacity: companion.owned ? 1 : 0.5 }} key={index} gap="small" pad="medium">
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={companion.imageData} />
                                </Box>
                                <Text>{companion.getBonus()}</Text>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default CompanionDisplay;