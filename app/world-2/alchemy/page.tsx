"use client"

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

import { Alchemy as AlchemyData, Cauldron, Bubble, CauldronBoostIndex, Vial } from '../../../data/domain/alchemy';
import { Achievement, AchievementConst } from '../../../data/domain/achievements'
import { useEffect, useState, useContext } from 'react';
import { nFormatter, round } from '../../../data/utility'
import { NextSeo } from 'next-seo';
import TabButton from "../../../components/base/TabButton";
import { Item } from "../../../data/domain/items";
import TipDisplay, { TipDirection } from "../../../components/base/TipDisplay";
import { Ascending } from "grommet-icons";
import IconImage from "../../../components/base/IconImage";
import { Sigils } from "../../../data/domain/sigils";
import TextAndLabel, { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import { TimeDown } from "../../../components/base/TimeDisplay";
import { AtomCollider } from "../../../data/domain/atomCollider";
import P2WDisplay from "../../../components/world-2/alchemy/p2w";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

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
    vialMultiplier: number
    particles: number
}

function CauldronDisplay({ cauldron, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel, classMultiBonus, vialMultiplier = 1, particles }: DisplayProps) {
    const size = useContext(ResponsiveContext)
    const [bargainBubbleLevel, setBargainBubbleLevel] = useState(0);
    const [classMultiBubbleLevel, setClassMultiBubbleLevel] = useState(0);
    const [cauldronCostLevel, setCauldronCostLevel] = useState(0);
    const [newMultiBubbleLevel, setNewMultiBubbleLevel] = useState(0);

    useEffect(() => {
        setBargainBubbleLevel(cauldron.bubbles[14].level);
        if (cauldron.short_name != "Y") {
            setNewMultiBubbleLevel(cauldron.bubbles[16].level);
        }
        if (classMultiBonus && cauldron.short_name != "Y") {
            setClassMultiBubbleLevel(cauldron.bubbles[1].level)
        }
        else {
            setClassMultiBubbleLevel(0);
        }
        setCauldronCostLevel(cauldron.boostLevels[CauldronBoostIndex.Cost]);
    }, [cauldron.bubbles, cauldron.short_name, cauldron.boostLevels, classMultiBonus, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel])

    function TipContent({ bubble, faceLeft }: { bubble: Bubble, faceLeft: boolean }) {
        const materialCosts: Map<Item, number> = bubble.getMaterialCost(cauldronCostLevel, undevelopedCostsBubbleLevel, barleyBrewVialLevel, bargainBubbleLevel, classMultiBubbleLevel, discountLevel, hasAchievement, newMultiBubbleLevel, vialMultiplier);
        return (
            <Box direction="row" align="center" width={{ max: 'medium' }}>
                <Box pad="small" gap="small" background="white">
                    <Text size={size == "small" ? 'small' : ''} weight="bold">{bubble.name} ({bubble.level})</Text>
                    <hr style={{ width: "100%" }} />
                    <Text size="small">Bonus: {bubble.getBonusText()}</Text>
                    <Box gap="small">
                        <ComponentAndLabel
                            label="Material cost"
                            labelColor="grey-3"
                            component={
                                <Box direction="row" align="center" gap="small">
                                    {
                                        Array.from(materialCosts).map(([item, cost]) => {
                                            return (
                                                <Box key={`${bubble.name}_${item.internalName}`} direction="row" align="center">
                                                    <Box direction="row" gap="xsmall" align="center">
                                                        <IconImage data={item.getImageData()} />
                                                        <Text size="small">{nFormatter(round(cost))}</Text>
                                                    </Box>

                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            } />
                        {
                            Array.from(materialCosts.values())[0] > 1e8 && Array.from(materialCosts.keys())[0].internalName != "Bits" &&
                            <ComponentAndLabel
                                label="Atom cost"
                                labelColor="grey-3"
                                component={
                                    <Box direction="row" align="center">
                                        {
                                            Array.from(materialCosts).map(([item, cost]) => {
                                                const isLiquid = item.internalName.includes("Liquid");
                                                if (isLiquid) {
                                                    return null;
                                                }
                                                const atomCost = bubble.getAtomCost(cost);
                                                return (
                                                    <Box key={`${bubble.name}_atomcost`} direction="row" align="center">
                                                        <Box direction="row" gap="xsmall" align="center">
                                                            <IconImage data={AtomCollider.getParticleImageData()} scale={0.7} />
                                                            <Text color={particles > atomCost ? 'green-1' : ""} size="small">{Math.round(particles)}/{nFormatter(atomCost)}</Text>
                                                        </Box>

                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                } />
                        }
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box align="center">
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            <Box>
            {
                    cauldron.bubbles
                    .map((bubble, index) => {
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
                                        <Box style={{ opacity: bubble.level > 0 ? 1 : 0.2 }}>
                                            <IconImage data={bubble.getImageData()} scale={0.8} />
                                        </Box>
                                        <Box direction="row" gap="xsmall" align="center">
                                            <Text size="small">{bubble.level}</Text>
                                        </Box>
                                        {
                                            bubble.labUpgrade && <Ascending color="Legendary" size="large" />
                                        }
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

function VialTipInfo({ vial }: { vial: Vial }) {
    if (vial.level == 0) {
        return (
            <Box>
                <Text size="small">Bonus: {vial.getBonusText()}</Text>
                <Text size="small">You need to roll at least a {vial.getNumberToRoll()} to unlock this vial</Text>

            </Box>
        )
    }

    return (
        <Box>
            <Text size="small">Bonus: {vial.getBonusText()}</Text>
            {
                Array.from(vial.getMaterialCost()).map(([item, cost], index) => {
                    return (
                        <Box key={index} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(round(cost))}</Text><IconImage data={item.getImageData()} /></Box>
                    )
                })
            }
        </Box>
    )
}

function VialsDisplay() {
    const theData = useAppDataStore((state) => state.data.getData());

    const alchemyData = theData.get("alchemy") as AlchemyData;

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box direction="row" wrap>
                {
                    alchemyData.vials.map((vial, index) => (
                        <Box key={index} width={{ max: '104px', min: '104px' }} height={{ max: '120px', min: '120px' }}>
                            <TipDisplay
                                body={<VialTipInfo vial={vial} />}
                                heading={`${vial.name} (${vial.level})`}
                                direction={TipDirection.Down}
                                size="medium"
                            >
                                <Stack anchor='center' margin={{ right: 'small' }}>
                                    <Box style={{ opacity: vial.level == 0 ? 0.3 : 1 }}>
                                        <IconImage data={vial.getBackgroundImageData()} />
                                    </Box>
                                    <Box style={{ opacity: vial.level == 0 ? 0.6 : 1 }}>
                                        <IconImage data={vial.getImageData()} scale={1.3} />
                                    </Box>
                                </Stack>
                            </TipDisplay>
                        </Box>
                    ))
                }
            </Box>
        </ShadowBox>
    )
}

function SigilsDisplay() {
    const [sigilData, setSigilData] = useState<Sigils>();
    const theData = useAppDataStore((state) => state.data.getData());

    useEffect(() => {
        setSigilData(theData.get("sigils"));
    }, [theData]);

    return (
        <Box pad="medium" gap="small">
            <Box>
                <TextAndLabel
                    label="Charge speed per player"
                    text={nFormatter(sigilData?.chargeSpeed ?? 0)}
                />
            </Box>
            <Grid columns="1/3">
                {
                    sigilData?.sigils.map((sigil, index) => {
                        const reqLimit = (sigil.boostLevel == 1 && sigil.canBeIonized) ? (sigil.data.x1 ?? 0) : sigil.boostLevel == 0 ? sigil.data.boostCost : sigil.boostLevel == -1 ? sigil.data.unlockCost : 0;
                        const chargeSpeed = sigil.activePlayers * sigilData.chargeSpeed;
                        const timeToNext = ((reqLimit - sigil.progress) / chargeSpeed) * 3600;
                        return (
                            <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} gap="medium" align="start" pad="small" border={sigil.activePlayers > 0 ? { color: 'green-1', size: '1px' } : undefined}>
                                <IconImage style={sigil.boostLevel == 2 ? { filter: 'hue-rotate(130deg)' } : sigil.boostLevel == 1 ? { filter: 'hue-rotate(200deg)' } : sigil.boostLevel == -1 ? { opacity: 0.2 } : undefined} data={sigil.getImageData()} />
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Name" text={sigil.data.name} />
                                    <TextAndLabel textSize="xsmall" label="Description" text={sigil.getBonusText()} />
                                </Box>
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Progress" text={timeToNext > 0 ? `${nFormatter(sigil.progress, "Smaller")}/${nFormatter(reqLimit, "Smaller")}` : "Maxed"} />
                                    {sigil.activePlayers > 0 &&
                                        <ComponentAndLabel
                                            label="Time To max"
                                            component={
                                                <TimeDown addSeconds={timeToNext} />
                                            }
                                        />
                                    }
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function BubblesDisplay() {
    const [discountLevel, setDiscountLevel] = useState<string>('0');
    const [classMulti, setClassMulti] = useState(false);

    const theData = useAppDataStore((state) => state.data.getData());
    
    const alchemyData = theData.get("alchemy") as AlchemyData;
    const achievementsInfo = theData.get("achievements") as Achievement[];
    // get undeveloped costs bubble level
    const undevelopedCostsBubbleLevel = alchemyData.getUndevelopedCostsBubbleLevel();
    const barleyBrewVialLevel = alchemyData.getBarleyBrewVialLevel();
    const vialMultiplier = alchemyData.vials[0].bonusMulitplier
    const hasAlchemyAchievement = achievementsInfo[AchievementConst.SmartBoiIndex].completed;


    const collider = theData.get("collider") as AtomCollider;
    const particles = collider.particles

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

    return (
        <ShadowBox background="dark-1" flex={false} pad={{ bottom: 'small' }}>
            <Box gap="large" align="center" direction="row" pad="medium">
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
                <Box direction="row" align="center">
                    <Ascending color="Legendary" size="large" />
                    <Text size="xsmall">Indicates bubbles that will level from &quot;No Bubble Left Behind&quot; lab bonus</Text>
                </Box>

            </Box>
            <Grid columns="1/4">
                {
                    alchemyData && alchemyData.cauldrons
                        .slice().sort((cauldron1, cauldron2) => cauldron1.bubbles[0].cauldronIndex > cauldron2.bubbles[0].cauldronIndex ? 1 : -1)
                        .map((cauldron, index) => {
                            return (<CauldronDisplay key={`tab_${index}`} cauldron={cauldron} undevelopedCostsBubbleLevel={undevelopedCostsBubbleLevel} barleyBrewVialLevel={barleyBrewVialLevel} hasAchievement={hasAlchemyAchievement} discountLevel={parseInt(discountLevel)} classMultiBonus={classMulti} vialMultiplier={vialMultiplier} particles={particles} />)
                        })
                }
                {
                    !alchemyData && <Text>Not ready yet</Text>
                }
            </Grid>
        </ShadowBox>)
}

function Alchemy() {
    const [activeTab, setActiveTab] = useState<string>("Bubbles");

    return (
        <Box>
            <NextSeo title="Alchemy" />
            <Box>
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Alchemy</Heading>
                <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                    {["Bubbles", "Vials", "Sigils", "P2W"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Bubbles" && <BubblesDisplay />}
                {activeTab == "Vials" && <VialsDisplay />}
                {activeTab == "Sigils" && <SigilsDisplay />}
                {activeTab == "P2W" && <P2WDisplay />}
            </Box>
        </Box>
    )
}

export default Alchemy;