"use client"

import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { LegendTalents as LegendTalentsDomain } from '../../../data/domain/world-7/legendTalents';
import ShadowBox from '../../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { CircleInformation } from 'grommet-icons';
import TipDisplay from '../../../components/base/TipDisplay';

function LegendaryTalents() {
    const goldenColor = "#FAC95D";

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const legendTalents = theData.get("legendTalents") as LegendTalentsDomain;

    if (!legendTalents) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Legend Talents</Heading>
                <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
                <Box direction="row" gap="xsmall" margin={{ bottom: 'medium' }} wrap>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Total Points Owned'
                            component={
                                <Box direction="row" gap="xsmall">
                                    <Text>{legendTalents.pointsOwned}</Text>
                                    <TipDisplay
                                        heading="You get +1 Point for each 100 player level (per player, not total account level), starting at level 500"
                                        size='small'
                                        maxWidth='medium'
                                        body=''
                                    >
                                        <CircleInformation size="small" />
                                    </TipDisplay>
                                </Box>
                            }
                        />
                    </ShadowBox>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Available'
                            component={
                                <Box gap="xsmall" direction="row">
                                    <Text>{legendTalents.pointsAvaible}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                </Box>
                <Text margin={{ bottom: "small" }}>Talents</Text>
                <Grid columns={{ size: 'auto', count: 5 }} gap="small">
                {
                    legendTalents.talents.slice().filter(talent => talent.data.name != "filler").sort((talent1, talent2) => talent1.displayOrder > talent2.displayOrder ? 1 : -1).map((talent, index) => {
                        const maxed = talent.level >= talent.data.maxLevel;
                        return (
                            <ShadowBox key={index} background='dark-1' style={{ opacity: talent.level > 0 ? 1 : 0.5 }} gap='small' pad='small' align='left'>
                                <Box direction='column' justify='center' gap="small">
                                    <Box direction='row' justify='between'>
                                        <Text size="small">{talent.data.name}</Text>
                                        <Text size="small" color={maxed ? goldenColor : ""}>{`${talent.level}/${talent.data.maxLevel}`}</Text>
                                    </Box>
                                    <Text size="small">{talent.getDesc()}</Text>
                                    {!maxed && 
                                        <ComponentAndLabel
                                            label="Next Level :"
                                            component={
                                                <Box gap="xsmall" direction="row" align="center">
                                                    <Text size="small">{talent.getNextLevelDesc()}</Text>
                                                </Box>                                                                       
                                            }
                                        />   
                                    }
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
                </Grid>
            </Box>
        )
    }
}

export default LegendaryTalents;