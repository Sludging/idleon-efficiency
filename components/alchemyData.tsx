import Image from 'next/image';
import {
    Box,
    Grid,
    Stack,
    Text
} from "grommet"
import styled from 'styled-components'

import { Alchemy, Cauldron } from '../data/domain/alchemy';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext'
import styles from './alchemyData.module.css';

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

function CauldronDisplay({ cauldron }: { cauldron: Cauldron }) {
    return (
        <Box>
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            {
                Object.entries(cauldron.bubbles).map(([_, bubble], index) => {
                    return (
                        <Box direction="row" align="center" key={`cauldron_${index}_${bubble.name}`} background="grey">
                            <Stack anchor="bottom-right">
                                <Box className={`${styles.alchemy} ${styles[bubble.class_name]}`} />
                                <Box>
                                    <Text size="medium">{bubble.level}</Text>
                                </Box>
                            </Stack>
                            <Text size="medium">{bubble.name}</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default function AlchemyData() {
    const [alchemyData, setAlchemyData] = useState<Alchemy>();
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setAlchemyData(theData.get("alchemy"));
        }
    }, [idleonData])
    return (
        <Grid columns="1/4" gap="medium">
            {
                alchemyData && Object.entries(alchemyData.cauldrons).map(([_, cauldron], index) => {
                    return (<CauldronDisplay key={`tab_${index}`} cauldron={cauldron} />)
                })
            }
            {
                !alchemyData && <Text>Not ready yet</Text>
            }
        </Grid>
    )
}