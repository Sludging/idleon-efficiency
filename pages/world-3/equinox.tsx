import {
    Box,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Heading,
    Text,
    Grid,
    ResponsiveContext,
    Stack,
    Meter
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import { Trap, TrapSet } from '../../data/domain/traps';
import ShadowBox from '../../components/base/ShadowBox';
import { Player } from '../../data/domain/player';
import { SkillsIndex } from "../../data/domain/SkillsIndex";
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import IconImage from '../../components/base/IconImage';
import { Equinox } from '../../data/domain/equinox';

interface PlayerTrapProps {
    traps: Array<Trap>
    maxTraps: number
}

function PlayerTraps(props: PlayerTrapProps) {
    const size = useContext(ResponsiveContext)
    const formatTime = (input: number) => {
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges: Record<string, number> = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };
        for (let key in ranges) {
            if (ranges[key] < Math.abs(input)) {
                const delta = input / ranges[key];
                return formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
            }
        }
    }

    return (
        <Grid columns={{ count: 9, size: ["50px", "12.5%"] }} gap="small" justify="start">
            {
                props.traps.map((trap, index) => {
                    if (!trap.placed && index >= props.maxTraps) {
                        return null
                    }
                    return (
                        <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} height={{ min: '82px', max: '82px' }}>
                            {!trap.placed ?
                                <Box border={{ color: 'orange-1' }} align="center" width={{ max: '100px', min: '100px' }} height={{ min: '82px', max: '82px' }} justify='center'>
                                    <Text size="xsmall" color="accent-3">Empty</Text>
                                </Box> :
                                <Box key={`trap_${index}`} style={{ background: trap.isReady() ? 'red' : 'none' }} align="center" fill>
                                    <TipDisplay
                                        body={
                                            <Box>
                                                <Text>Trap Type: {TrapSet[trap.trapType]}</Text>
                                                <Text>Original Duration: {formatTime(trap.trapDuration)?.replace("in ", "") ?? ""}</Text>
                                                {
                                                    trap.getBenefits().map((bonus, index) => (
                                                        <Box key={`bonus_${index}`}>
                                                            <Text>{bonus}</Text>
                                                        </Box>
                                                    ))
                                                }

                                            </Box>
                                        }
                                        size='medium'
                                        direction={TipDirection.Down}
                                        heading='Trap Info'>
                                        <IconImage data={trap.getCritterImageData()} />
                                    </TipDisplay>
                                    <Text textAlign='center' size="xsmall">{formatTime(trap.trapDuration - trap.timeSincePut)}</Text>
                                </Box>
                            }
                        </Box>
                    )
                })
            }
        </Grid>
    )
}

function Equinox() {
    const appContext = useContext(AppContext);

    const theData = appContext.data.getData();
    const equinox = theData.get("equinox") as Equinox;

    if (!equinox) {
        return <></>
    }

    return (
        <Box>
            <NextSeo title="Equinox" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Equinox</Heading>
            <Box direction="row" gap="small">
                <Stack>
                    <Meter
                        size="small"
                        type="bar"
                        background="accent-3"
                        color="brand"
                        values={[
                            {
                                value: equinox.bar.current,
                                label: 'current',
                                color: 'brand'
                            }
                        ]}
                        max={equinox.bar.max} />
                    <Box align="center" pad="xxsmall">
                        <Text size="small">{Math.floor(equinox.bar.current).toString()} ({equinox.bar.percentageOfCap}%)</Text>
                    </Box>
                </Stack>
                <Text size="xsmall">{equinox.bar.max}</Text>
                <Text size="small">Fill rate: {equinox.bar.rate}/hr</Text>
            </Box>
            <Box pad="large" gap="small">
                {
                    equinox.activeChallenges.length > 0 &&
                    <Box margin={{bottom: 'medium'}} gap="medium">
                        <Text size="large">Active Challenges</Text>

                        <Box direction="row" wrap>
                            {
                                equinox.activeChallenges.map((challenge, index) => (
                                    <ShadowBox width={"200px"} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium">
                                        <Text size="small">{challenge.data.challenge}</Text>
                                        <Text size="small">{challenge.data.reward}</Text>
                                    </ShadowBox>
                                ))
                            }
                        </Box>
                    </Box>
                }
                <Box>
                    <Text size="large">Upgrades</Text>
                    <Box direction="row" wrap margin={{ top: 'large' }}>
                        <Grid columns={{ size: 'auto', count: 4 }} fill>
                            {
                                equinox.upgrades.map((upgrade, index) => (
                                    <ShadowBox style={{ opacity: upgrade.unlocked ? 1 : 0.5 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Text>{upgrade.data.name} ({upgrade.level}/{upgrade.maxLevel})</Text>
                                        <Text size="xsmall">{upgrade.getDescription()}</Text>
                                        {upgrade.getBonus() != -1 && <Text size="xsmall">{upgrade.getBonusText()}</Text>}
                                    </ShadowBox>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Equinox;