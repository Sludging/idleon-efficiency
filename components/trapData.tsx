import {
    Box,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Heading
} from 'grommet'
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'

import { Trap } from '../data/domain/traps';

export default function TrapData() {
    const [playerTraps, setPlayerTraps] = useState<Array<Array<Trap>>>(Array<Array<Trap>>());
    const [playerNames, setPlayerNames] = useState<Array<string>>([]);
    const idleonData = useContext(AppContext);

    const fancyTimeFormat = (duration: number) => {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

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
                            <TableCell >Time since put</TableCell >
                            <TableCell >Critter</TableCell >
                            <TableCell >Trap Duration</TableCell >
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            playerTraps.map((trapsData, index) => {
                                return (
                                    trapsData.map((trap, trapIndex) => {
                                        return (
                                            <TableRow key={`${index}_${trapIndex}`}>
                                                <TableCell>{playerNames[trap.playerID] || "Unknown"}</TableCell>
                                                <TableCell style={{ background: trap.isReady() ? 'red' : 'none' }}>{fancyTimeFormat(trap.timeSincePut)}</TableCell>
                                                <TableCell><Box title={trap.critterName} className={`icons icons-${trap.critterName}_x1`} /></TableCell>
                                                <TableCell>{fancyTimeFormat(trap.trapDuration)}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                )
                            })
                        }
                    </TableBody>
                </Table>
            }
        </Box>
    )
}