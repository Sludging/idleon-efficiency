import {
    Box,
    Grid,
    Stack,
    Text,
    Tip,
    CheckBox,
    Select,
    Heading
} from "grommet"
import styled from 'styled-components'

import { Alchemy, Cauldron, Bubble, CauldronBoostIndex } from '../data/domain/alchemy';
import { AchievementConst } from '../data/domain/achievements'
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { nFormatter } from '../data/utility'

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

interface DisplayProps {
    cauldron: Cauldron,
    undevelopedCostsBubbleLevel: number,
    barleyBrewVialLevel: number,
    hasAchievement: boolean,
    discountLevel: number,
    classMultiBonus: boolean
}

function CauldronDisplay({ cauldron, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel, classMultiBonus }: DisplayProps) {

    const [bargainBubbleLevel, setBargainBubbleLevel] = useState(0);
    const [classMultiBubbleLevel, setClassMultiBubbleLevel] = useState(0);
    const [cauldronCostLevel, setCauldronCostLevel] = useState(0);

    useEffect(() => {
        setBargainBubbleLevel(cauldron.bubbles[14].level);
        if (classMultiBonus && cauldron.short_name != "Y") {
            setClassMultiBubbleLevel(cauldron.bubbles[1].level)
        }
        else {
            setClassMultiBubbleLevel(0);
        }
        setCauldronCostLevel(cauldron.boostLevels[CauldronBoostIndex.Cost]);
    }, [cauldron.bubbles, cauldron.short_name, cauldron.boostLevels, classMultiBonus, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel])

    function TipContent({ bubble, faceLeft }: { bubble: Bubble, faceLeft: boolean }) {
        if (bubble.level == 0) {
            return <></>
        }
        const materialCosts: Map<string, number> = bubble.getMaterialCost(cauldronCostLevel, undevelopedCostsBubbleLevel, barleyBrewVialLevel, bargainBubbleLevel, classMultiBubbleLevel, discountLevel, hasAchievement);
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
                        Array.from(materialCosts).map(([item, cost]) => {
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
    const [hasAlchemyAchievement, setHasAlchemyAchievement] = useState<boolean>(false);
    const [discountLevel, setDiscountLevel] = useState<string>('0');
    const [classMulti, setClassMulti] = useState(false);

    const idleonData = useContext(AppContext);
    const bargainOptions = [
        {
            label: 'No discount',
            value: '0',
        },
        {
            label: '25%',
            value: '1',
        },
        {
            label: '43.75%',
            value: '2',
        },
        {
            label: '57.81%',
            value: '3',
        },
        {
            label: '68.36%',
            value: '4',
        },
        {
            label: '76.27%',
            value: '5',
        },
        {
            label: '82.20%',
            value: '6',
        },
        {
            label: '86.65%',
            value: '7',
        },
        {
            label: '90%',
            value: '8',
        },
    ];

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setAlchemyData(theData.get("alchemy"));
            const achievementsInfo = theData.get("achievements");
            // get undeveloped costs bubble level
            setUndevelopedCostsBubbleLevel(alchemyData?.getUndevelopedCostsBubbleLevel() ?? 0);
            setBarleyBrewVialLevel(alchemyData?.getBarleyBrewVialLevel() ?? 0);
            setHasAlchemyAchievement(achievementsInfo[AchievementConst.SmartBoiIndex].completed ?? false); // TODO: Change this to actual achievement info
        }
    }, [idleonData, alchemyData, hasAlchemyAchievement])

    if (alchemyData && alchemyData.cauldrons.flatMap(cauldron => cauldron.bubbles).filter(bubble => bubble.level > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box >
            <Box gap="medium" pad="medium" align="start">
                <CheckBox
                    checked={classMulti}
                    label="Class multiplier bonus?"
                    onChange={(event) => setClassMulti(event.target.checked)}
                />
                <Select
                    labelKey="label"
                    valueKey={{ key: 'value', reduce: true }}
                    value={discountLevel}
                    options={bargainOptions}
                    onChange={({ value: nextValue }) => setDiscountLevel(nextValue)}
                />
            </Box>
            <Grid columns="1/4">
                {
                    alchemyData && Object.entries(alchemyData.cauldrons).map(([_, cauldron], index) => {
                        return (<CauldronDisplay key={`tab_${index}`} cauldron={cauldron} undevelopedCostsBubbleLevel={undevelopedCostsBubbleLevel} barleyBrewVialLevel={barleyBrewVialLevel} hasAchievement={hasAlchemyAchievement} discountLevel={parseInt(discountLevel)} classMultiBonus={classMulti} />)
                    })
                }
                {
                    !alchemyData && <Text>Not ready yet</Text>
                }
            </Grid>
        </Box>
    )
}