import {
    Box,
    Grid,
    Stack,
    Text
} from "grommet"

import { Stamp } from '../data/domain/stamps';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { lavaFunc } from '../data/utility'

function StampDisplay({ raw_name, index, value, title }: { raw_name: string, index: number, value: number, title: string }) {
    const getCardClass = () => {
        let className = `icons-${raw_name}_x1`;
        if (raw_name == "StampC5")
            className = `icons-${raw_name}`; // StampC5 isn't properly sized for some reason.
        if (raw_name == "StampA35")
            className = "icons-StampA34_x1"; // StampA35 doesn't have an image for some reason.
        return `icons ${className}`;
    }

    return (
        <Box key={`stamp_${index}_${raw_name}`} background="grey">
            <Stack anchor="bottom-right" title={title}>
                <Box className={getCardClass()} />
                <Box pad={{ horizontal: 'medium' }}>
                    <Text size="medium">{value}</Text>
                </Box>
            </Stack>
        </Box>
    )
}

function StampTab({ tab, index }: { tab: Stamp[], index: number }) {
    return (
        <Box>
            <h3>Tab #{index}</h3>
            <Box background="grey">
                <Grid columns="1/4" gap="none" >
                    {
                        tab.map((stamp: Stamp) => {
                            if (stamp != undefined) {
                                return (
                                    <StampDisplay key={`tab_${index}_${stamp.raw_name}`} raw_name={stamp.raw_name} value={stamp.value} index={index} title={lavaFunc(stamp.data.function, stamp.value, stamp.data.x1, stamp.data.x2).toString() + stamp.bonus} />
                                )
                            }
                        })
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default function StampData() {
    const [stampData, setStampData] = useState<Stamp[][]>();
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setStampData(theData.get("stamps"));
        }
    }, [idleonData])
    return (
        <Grid columns="1/3" gap="medium">
            {
                stampData && stampData.map((tab, index) => {
                    return (<StampTab key={`tab_${index}`} tab={tab} index={index} />)
                })
            }
        </Grid>
    )
}