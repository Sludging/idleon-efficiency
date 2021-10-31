import {
    Box,
    Grid,
    Stack,
    Text,
    Tip
} from "grommet"
import styled from 'styled-components'

import { Alchemy, Cauldron, Bubble, CauldronBoostIndex } from '../data/domain/alchemy';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { nFormatter } from '../data/utility'

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

function CauldronDisplay({ cauldron, undevelopedCostsBubbleLevel, barleyBrewVialLevel }: { cauldron: Cauldron, undevelopedCostsBubbleLevel: number, barleyBrewVialLevel: number }) {

    const [bargainBubbleLevel, setBargainBubbleLevel] = useState(0);
    const [cauldronCostLevel, setCauldronCostLevel] = useState(0);

    useEffect(() => {
        setBargainBubbleLevel(cauldron.bubbles[14].level);
        setCauldronCostLevel(cauldron.boostLevels[CauldronBoostIndex.Cost]);
    }, [cauldron])

    function TipContent({ bubble, faceLeft }: { bubble: Bubble, faceLeft: boolean }) {
        if (bubble.level == 0) {
            return <></>
        }
        return (
            <Box direction="row" align="center" width={{ max: 'medium' }}>
                {!faceLeft &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="6 2 18 12 6 22"
                            transform="matrix(-1 0 0 1 30 0)"
                        />
                    </svg>
                }
                <Box pad="small" gap="small" background="white">
                    <Text weight="bold">{bubble.name}</Text>
                    <Text>--------------------------</Text>
                    <Text size="small">Bonus: {bubble.getBonusText()}</Text>
                    {
                        Array.from(bubble.getMaterialCost(cauldronCostLevel, undevelopedCostsBubbleLevel, barleyBrewVialLevel, bargainBubbleLevel)).map(([item, cost]) => {
                            return (
                                <Box key={`${bubble.name}_${item}`} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(Math.round(cost), 2)}</Text><Box style={{ width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)" }} className={`icons icons-${item}_x1`} /></Box>
                            )
                        })
                    }
                </Box>
                {
                    faceLeft &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="0 2 12 12 0 22"
                        />
                    </svg>
                }
            </Box >
        )
    }


    return (
        <Box >
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            <Box background="grey" fill align="center" margin={{ bottom: "xlarge" }}>
            {
                Object.entries(cauldron.bubbles).map(([_, bubble], index) => {

                    return (
                        <Box direction="row" align="center" key={`cauldron_${index}_${bubble.name}`}>
                            <Stack anchor="bottom-right" alignSelf="center">
                                <Tip
                                    plain
                                    content={
                                        <TipContent bubble={bubble} faceLeft={cauldron.short_name == "Y"} />
                                    }
                                    dropProps={{ align: cauldron.short_name == "Y" ? { right: 'left' } : { left: 'right' } }}
                                >
                                    <Box style={{ opacity: bubble.level > 0 ? 1 : 0.2 }} className={bubble.class_name} />
                                </Tip>
                                <Box>
                                    <Text size="medium">{bubble.level}</Text>
                                </Box>
                            </Stack>
                        </Box>
                    )
                })
            }
            </Box>
        </Box>
    )
}

export default function AlchemyData() {
    const [alchemyData, setAlchemyData] = useState<Alchemy>();
    const [undevelopedCostsBubbleLevel, setUndevelopedCostsBubbleLevel] = useState<number>(0);
    const [barleyBrewVialLevel, setBarleyBrewVialLevel] = useState<number>(0);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setAlchemyData(theData.get("alchemy"));

            // get undeveloped costs bubble level
            setUndevelopedCostsBubbleLevel(alchemyData?.getUndevelopedCostsBubbleLevel() ?? 0);
            setBarleyBrewVialLevel(alchemyData?.getBarleyBrewVialLevel() ?? 0);
        }
    }, [idleonData, alchemyData])
    return (
        <Grid columns="1/4">
            {
                alchemyData && Object.entries(alchemyData.cauldrons).map(([_, cauldron], index) => {
                    return (<CauldronDisplay key={`tab_${index}`} cauldron={cauldron} undevelopedCostsBubbleLevel={undevelopedCostsBubbleLevel} barleyBrewVialLevel={barleyBrewVialLevel} />)
                })
            }
            {
                !alchemyData && <Text>Not ready yet</Text>
            }
        </Grid>
    )
}