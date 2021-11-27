import {
    Box,
    Grid,
    Stack,
    Text,
    Tip,
    CheckBox,
    Select,
    Heading,
    ResponsiveContext
} from "grommet"
import styled from 'styled-components'

import { Alchemy as AlchemyData, Cauldron, Bubble, CauldronBoostIndex } from '../data/domain/alchemy';
import { AchievementConst } from '../data/domain/achievements'
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { nFormatter } from '../data/utility'
import { NextSeo } from 'next-seo';

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
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
    const size = useContext(ResponsiveContext)
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
                    <Text size={size == "small" ? 'small' : ''} weight="bold">{bubble.name} ({bubble.level})</Text>
                    <hr style={{ width: "100%"}} />
                    <Text size="small">Bonus: {bubble.getBonusText()}</Text>
                    {
                        Array.from(materialCosts).map(([item, cost]) => {
                            return (
                                <Box key={`${bubble.name}_${item}`} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(Math.round(cost), 2)}</Text><Box align="center" width={{max: '36px'}} fill><Box className={`icons-3636 icons-${item}_x1`} /></Box></Box>
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
        <Box align="center">
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            <Box align="center">
                {
                    Object.entries(cauldron.bubbles).map(([_, bubble], index) => {

                        return (
                            <Box key={`cauldron_${index}_${bubble.name}`}>
                                    <Tip
                                        plain
                                        content={
                                            <TipContent bubble={bubble} faceLeft={cauldron.short_name == "Y"} />
                                        }
                                        dropProps={{ align: size == "small" ? { top: 'bottom' } : cauldron.short_name == "Y" ? { right: 'left' } : { left: 'right' } }}
                                    >
                                        <Box direction="row" fill align="center">
                                            <Box align="center" width={{min: '70px', max: '70px'}} fill>
                                                <Box style={{ opacity: bubble.level > 0 ? 1 : 0.2 }} className={bubble.class_name} />
                                            </Box>
                                            <Box>
                                                <Text size="medium">{bubble.level}</Text>
                                            </Box>
                                        </Box>
                                    </Tip>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

function Alchemy() {
    const [alchemyData, setAlchemyData] = useState<AlchemyData>();
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
        if (idleonData.getData().size > 0) {
            const theData = idleonData.getData();
            setAlchemyData(theData.get("alchemy"));
            const achievementsInfo = theData.get("achievements");
            // get undeveloped costs bubble level
            setUndevelopedCostsBubbleLevel(alchemyData?.getUndevelopedCostsBubbleLevel() ?? 0);
            setBarleyBrewVialLevel(alchemyData?.getBarleyBrewVialLevel() ?? 0);
            if (achievementsInfo) {
                setHasAlchemyAchievement(achievementsInfo[AchievementConst.SmartBoiIndex].completed ?? false);
            }
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
        <>
            <NextSeo title="Alchemy" />
        <Box gap="large" fill>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Alchemy</Heading>
            <Box gap="large" align="center" direction="row">
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
            <ShadowBox background="dark-1" flex={false} pad={{ bottom: 'small' }}>
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
            </ShadowBox>
        </Box>
        </>
    )
}

export default Alchemy;