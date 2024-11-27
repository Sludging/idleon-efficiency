"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
    Meter} from 'grommet'
import ShadowBox from '../../../components/base/ShadowBox';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { TomeLine, Tome as TomeDomain, TomeScoreColors } from '../../../data/domain/tome';
import { CircleInformation } from 'grommet-icons';
import TipDisplay from '../../../components/base/TipDisplay';
import { Player } from '../../../data/domain/player';

const LineDisplay = ({ line }: { line: TomeLine }) => {
    const lineDescription = line.getLineDescription();
    return (
        <ShadowBox background='dark-1' style={{ opacity: line.lineScore > 0 ? 1 : 0.5 }} gap='small' pad='medium' align='left'>
            <Box direction='column' justify='center' gap="small">
                <Box direction='row' justify='between'>
                    <Box direction='row' gap="small" wrap>
                        <Text>{line.getCurrentValueDisplay()} - {line.getLineName()}</Text>
                        {lineDescription != "" && <TipDisplay
                            heading={line.getLineName()}
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>{lineDescription}</Text>
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>}
                    </Box>
                    <Text color={line.getLineDisplayColor()}>{line.lineScore}</Text>
                </Box>
                {
                line.unlocked ?    
                <Box>
                    <Meter
                        size="full"
                        type="bar"
                        alignSelf='center'
                        thickness='xsmall'
                        round
                        background={TomeScoreColors.Background}
                        color={line.getLineDisplayColor()}
                        value = {line.lineScore}
                        max={line.data.totalVal} />
                </Box>
                :
                <Box>
                    <Text>Line is locked until you reach {line.getLineUnlockLevel()} account level ({line.getLineUnlockLevel() - line.accountTotalLevel} left)</Text>
                </Box>
                }
            </Box>
        </ShadowBox>
    )
}

function TomeDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const tome = theData.get("tome") as TomeDomain;
    const players = theData.get("players") as Player[];

    if (!tome || !players || players.length == 0) {
        return null;
    }

    const rank = tome.getScoreRankingDisplay();

    return (
        <Box gap='medium'>
            <Box>
                <Heading level='2' size='medium' style={{ fontWeight: 'normal' }}>The Tome</Heading>
                <Text size="xsmall">* Score displayed (and used across the site for calculations based on The Tome) is the highest score across all your characters for simplicity's sake as some values are calculated per character</Text>
            </Box>
            {
            tome.unlocked ?
                <Box>
                    <Box>
                        <Text>Total score (using {players[tome.highestScoreIndex].playerName}) : {tome.getHighestScore()}{rank != '' ? ` (${rank})` : ''}</Text>
                    </Box>
                    <Grid columns={{ size: 'auto', count: 2 }} gap='small'>
                        {
                            tome.lines[tome.highestScoreIndex]?.slice().sort((line1, line2) => line1.displayOrder > line2.displayOrder ? 1 : -1).map((line, index) => <LineDisplay key={index} line={line} />)
                        }
                    </Grid>
                </Box>
                :
                <Box>
                    <Box>
                        <Text>The Tome isn't unlocked yet</Text>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default TomeDisplay;