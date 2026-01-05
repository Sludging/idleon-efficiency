"use client"

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
    ResponsiveContext
} from 'grommet'
import { useContext } from 'react';

import { Trap, TrapSet } from '../../../data/domain/traps';
import ShadowBox from '../../../components/base/ShadowBox';
import { Player } from '../../../data/domain/player';
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

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
        for (const key in ranges) {
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

function Traps() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const playerTraps = theData.get("traps") as Trap[][];
    const playerNames = theData.get("playerNames") as string[];
    const playerData = theData.get("players") as Player[];

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Traps</Heading>
            <ShadowBox background="dark-1" pad="large">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Player Name</TableCell >
                            <TableCell>Box Set</TableCell >
                            <TableCell>Traps</TableCell >
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            playerTraps.filter(x => playerNames[x[0]?.playerID] != undefined).map((trapsData, index) => {
                                const boxSet = playerData?.find((player) => player.playerID == trapsData[0]?.playerID)?.gear.tools.find((tool) => tool?.type == "Trap Box Set");
                                const skillLevel = playerData?.find((player) => player.playerID == trapsData[0]?.playerID)?.skills.get(SkillsIndex.Trapping)?.level;
                                const maxTraps = Trap.getMaxTraps(boxSet);
                                return (
                                    <TableRow key={`traps_${index}`}>
                                        <TableCell>
                                            <Box>
                                                <Text size="small">{playerNames[trapsData[0]?.playerID]}</Text>
                                                <Text title={"Trapping level"} size="small">(Level: {skillLevel})</Text>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {boxSet &&
                                                <Box title={boxSet.displayName}>
                                                    <IconImage data={boxSet.getImageData()} />
                                                </Box>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <PlayerTraps traps={trapsData} maxTraps={maxTraps + 1} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </ShadowBox>
        </Box>
    )
}

export default Traps;