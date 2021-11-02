import {
    Box,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Heading,
    Text
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'

import { Trap } from '../data/domain/traps';

interface PlayerTrapProps {
    traps: Array<Trap>
}

function PlayerTraps(props: PlayerTrapProps) {

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
        <Box direction="row" gap="medium" align="center">
            {
                props.traps.map((trap, index) => {
                    // <TableCell style={{ background: trap.isReady() ? 'red' : 'none' }}>{fancyTimeFormat(trap.timeSincePut)}</TableCell>
                    // <TableCell><Box title={trap.critterName} className={`icons icons-${trap.critterName}_x1`} /></TableCell>
                    // <TableCell>{fancyTimeFormat(trap.trapDuration)}</TableCell>
                    return (
                        <Box style={{ background: trap.isReady() ? 'red' : 'none' }} align="center" width="75px">
                            <Box title={trap.critterName} className={`icons icons-${trap.critterName}_x1`} />
                            <Text textAlign='center' size="xsmall">{formatTime(trap.trapDuration - trap.timeSincePut)}</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default function TrapData() {
    const [playerTraps, setPlayerTraps] = useState<Array<Array<Trap>>>(Array<Array<Trap>>());
    const [playerNames, setPlayerNames] = useState<Array<string>>([]);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerTraps(theData.get("traps"));
            setPlayerNames(theData.get("playerNames"))
        }
    }, [idleonData]);
    return (
        <Box align="center" pad="large">
            <Heading level='1'>Traps</Heading>
            {
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell >Player Name</TableCell >
                            <TableCell >Traps (Time remaining)</TableCell >
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            playerTraps.map((trapsData, index) => {
                                return (
                                    <TableRow key={`traps_${index}`}>
                                        <TableCell>{playerNames[trapsData[0]?.playerID] || "Unknown"}</TableCell>
                                        <TableCell>
                                            <PlayerTraps traps={trapsData} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            }
        </Box>
    )
}