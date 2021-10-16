import {
    Box,
    Grid,
    Stack,
    Text
} from "grommet"

import { Stamp } from '../data/domain/stamps';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';

function StampDisplay({ raw_name, index, value }: { raw_name: string, index: number, value: number }) {
    const getCardClass = () => {
        const className = `icons-${raw_name}_x1`;
        return `icons ${className}`;
    }

    return (
        <Box key={`stamp_${index}_${raw_name}`} background="grey">
            <Stack anchor="bottom-right">
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
            <Grid columns="1/4" gap="none">
                {
                    tab.map((stamp: Stamp) => {
                        if (stamp != undefined) {
                            return (
                                <StampDisplay key={`tab_${index}_${stamp.raw_name}`} raw_name={stamp.raw_name} value={stamp.value} index={index} />
                            )
                        }
                    })
                }
            </Grid>
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