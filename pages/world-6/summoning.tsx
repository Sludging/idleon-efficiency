import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useState } from 'react';
import { AppContext } from '../../data/appContext';
import { SummonEssenceColor, Summoning as SummoningDomain } from '../../data/domain/world-6/summoning';
import { Player } from '../../data/domain/player';
import IconImage from '../../components/base/IconImage';

function Summoning() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();

    const summoning = data.get("summoning") as SummoningDomain;

    if (!summoning) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <NextSeo title="Summoning" />
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Summoning</Heading>
                <Text size="medium">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            </Box>
        )
    }
}

export default Summoning;