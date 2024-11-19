"use client"

import {
    Box,
    Text,
    Heading,
    Grid} from 'grommet'
import ShadowBox from '../../../components/base/ShadowBox';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { TomeLine, Tome as TomeDomain } from '../../../data/domain/tome';
import { useMemo } from 'react';

const LineDisplay = ({ line }: { line: TomeLine }) => {
    const lineDescription = line.getLineDescription();
    return (
        <ShadowBox background='dark-1' style={{ opacity: line.lineScore > 0 ? 1 : 0.5 }} gap='small' pad='medium' align='left'>
            <Box>
                <Text>{line.getCurrentValueDisplay()} - {line.getLineName()} ({line.index})</Text>
                <Text>Score : {line.lineScore}/{line.data.totalVal}</Text>
                {lineDescription != "" && <Text size='xsmall'>{lineDescription}</Text>}
            </Box>
        </ShadowBox>
    )
}

function TomeDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const tome = theData.get("tome") as TomeDomain;

    if (!tome) {
        return null;
    }

    return (
        <Box gap='medium'>
            <Heading level='2' size='medium' style={{ fontWeight: 'normal' }}>The Tome</Heading>
            <Box>
                <Text>Total score : {tome.totalScore}</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 2 }} gap='small'>
                {
                    tome.lines?.slice().sort((line1, line2) => line1.displayOrder > line2.displayOrder ? 1 : -1).map((line, index) => <LineDisplay key={index} line={line} />)
                }
            </Grid>
        </Box>
    )
}

export default TomeDisplay;