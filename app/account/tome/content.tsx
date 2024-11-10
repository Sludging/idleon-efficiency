"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
    Stack
} from 'grommet'
import ShadowBox from '../../../components/base/ShadowBox';
import IconImage from '../../../components/base/IconImage';
import { Card } from '../../../data/domain/cards';
import TipDisplay from '../../../components/base/TipDisplay';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { TomeLine, Tome as TomeDomain } from '../../../data/domain/tome';

const LineDisplay = ({ line }: { line: TomeLine }) => {
    return (
        <ShadowBox background='dark-1' style={{ opacity: line.lineScore > 0 ? 1 : 0.5 }} gap='small' pad='medium' align='left'>
            <Box>
                <Text>{line.title}</Text>
                <Text>Score : {line.getLineScore()}</Text>
                {line.description != "" && <Text size='xsmall'>{line.description}</Text>}
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
                    tome.lines?.map((line, index) => <LineDisplay line={line} />)
                }
            </Grid>
        </Box>
    )
}

export default TomeDisplay;