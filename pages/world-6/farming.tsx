import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { Farming as FarmingDomain } from '../../data/domain/world-6/farming';
import { useContext } from 'react';
import { AppContext } from '../../data/appContext';

function Farming() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();

    const farming = data.get("farming") as FarmingDomain;

    console.log(farming);

    if (!farming) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <NextSeo title="Farming" />
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Farming</Heading>
                <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            </Box>
        )
    }
}

export default Farming;