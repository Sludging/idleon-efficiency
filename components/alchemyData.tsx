import Image from 'next/image';
import {
    Box,
    Grid,
    Stack,
    Text
} from "grommet"
import styled from 'styled-components'

import { Alchemy, Cauldron } from '../data/domain/alchemy';
import { lavaFunc } from '../data/utility';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext'

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

function handleToolBubbles(titleText: string, bubbleName: string) {
    switch (bubbleName) {
        case "Stronk Tools": return titleText.replace("$", "Pickaxes and Fishing Rods");
        case "Sanic Tools": return titleText.replace("$", "Catching Nets");
        case "Le Brain Tools": return titleText.replace("$", "Hatchets");
        default: return titleText;
    }
}

function CauldronDisplay({ cauldron }: { cauldron: Cauldron }) {
    return (
        <Box>
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            {
                Object.entries(cauldron.bubbles).map(([_, bubble], index) => {
                    const bubbleBonus = lavaFunc(bubble.func, bubble.level, bubble.x1, bubble.x2)
                    let titleText = bubble.description.replace(/{/g, bubbleBonus.toString());
                    titleText = handleToolBubbles(titleText, bubble.name);
                    return (
                        <Box direction="row" align="center" key={`cauldron_${index}_${bubble.name}`} background="grey">
                            <Stack anchor="bottom-right">
                                <Box className={bubble.class_name} title={titleText} />
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