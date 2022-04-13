import {
    Box,
    Grid,
    Heading,
    Meter,
    ResponsiveContext,
    Stack,
    Text,
    TextInput,
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import TabButton from '../../components/base/TabButton';
import { Player, SkillsIndex } from '../../data/domain/player';
import ShadowBox from '../../components/base/ShadowBox';
import { TimeDisplaySize, TimeDown } from '../../components/base/TimeDisplay';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { Worship as WorshipDomain } from '../../data/domain/worship';
import { Prayer } from '../../data/domain/prayers';
import { GroupBy, nFormatter } from '../../data/utility';
import IconImage from '../../components/base/IconImage';

function ChargeDisplay() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [worship, setWorshipData] = useState<WorshipDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setPlayerData(theData.get("players"));
            setWorshipData(theData.get("worship"))
        }
    }, [appContext]);


    const bestWizard = useMemo(() => {
        if (playerData) {
            const bestMaxLevel = Math.max(...playerData.flatMap(player => (player.talents.find(talent => talent.skillIndex == 475)?.maxLevel ?? 0)));
            return playerData.find(player => player.talents.find(talent => talent.skillIndex == 475 && talent.maxLevel == bestMaxLevel) != undefined);
        }

        return undefined;
    }, [playerData])

    const totalChargeInfo = useMemo(() => {
        if (worship && bestWizard) {
            const totalCurrentCharge = worship.playerData.filter(player => player.playerID != bestWizard.playerID).reduce((sum, player) => sum += player.estimatedCharge, 0) ?? 0;
            const totalChargeRate = worship.playerData.filter(player => player.playerID != bestWizard.playerID).reduce((sum, player) => sum += player.chargeRate, 0) ?? 0;
            const maxCharge = worship.playerData[bestWizard.playerID].maxCharge + (bestWizard.talents.find(talent => talent.skillIndex == 475)?.getBonus(false, true, true) ?? 0);
            const overFlowIn = (maxCharge - totalCurrentCharge) / (totalChargeRate / 60 / 60);
            return {
                charge: totalCurrentCharge,
                rate: totalChargeRate,
                maxCharge: maxCharge,
                overFlowTime: overFlowIn
            }
        }

        return undefined;
    }, [worship, bestWizard])

    if (!playerData || !worship || worship.playerData.filter(player => player.currentCharge > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box gap="medium" align="center">
            {totalChargeInfo && bestWizard &&
                <Box>
                    <Text size="xsmall">* This is ignoring the wizard&apos;s charge, since you can just .. use it.</Text>
                    <ShadowBox background="dark-1" pad="medium" gap="large" direction="row" wrap>
                        <ComponentAndLabel
                            label="Best Wizard"
                            component={
                                <Box direction="row">
                                    <Box width={{ min: "30px", max: '30px' }} margin={{ right: 'small' }}>
                                        <Box className={`icons-3836 icons-ClassIcons${bestWizard.classId.valueOf()}`} />
                                    </Box>
                                    <Text>{bestWizard.playerName}</Text>
                                </Box>
                            }
                        />
                        <ComponentAndLabel
                            label="Charge with Charge Syphon"
                            component={
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(totalChargeInfo.charge),
                                                    label: 'Current total charge',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={totalChargeInfo.maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(totalChargeInfo.charge).toString()} ({(totalChargeInfo.charge / totalChargeInfo.maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{totalChargeInfo.maxCharge}</Text>
                                </Box>
                            }
                        />
                        <TextAndLabel label="Total Charge rate" text={`${Math.round(totalChargeInfo.rate * 24)}% / day`} />
                        <ComponentAndLabel
                            label="Time till overflow"
                            component={
                                totalChargeInfo.overFlowTime > 0 ?
                                    <TimeDown size={TimeDisplaySize.Small} addSeconds={totalChargeInfo.overFlowTime} />
                                    : <Text>Overflowing, you are wasting charge!</Text>
                            }
                        />
                    </ShadowBox>
                </Box>
            }
            <Box direction="row" wrap justify="center">
                {playerData && playerData.map((player, index) => {
                    const timeToFull = (worship.playerData[index].maxCharge - worship.playerData[index].estimatedCharge) / (worship.playerData[index].chargeRate / 60 / 60);
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row">
                                    <Box width={{ min: "30px", max: '30px' }} margin={{ right: 'small' }}>
                                        <Box className={`icons-3836 icons-ClassIcons${player.classId.valueOf()}`} />
                                    </Box>
                                    <Text>{player.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(worship.playerData[index].estimatedCharge),
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={worship.playerData[index].maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(worship.playerData[index].estimatedCharge).toString()} ({(worship.playerData[index].estimatedCharge / worship.playerData[index].maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{worship.playerData[index].maxCharge}</Text>
                                </Box>
                                <Box direction="row" justify="between">
                                    <ComponentAndLabel
                                        label="Level"
                                        component={<Box direction="row"><Text>{player.skills.get(SkillsIndex.Worship)?.level.toString() ?? "0"}</Text><Box width={{ max: '25px', min: '25px' }}><Box title={player.gear.tools[5]?.displayName} className={player.gear.tools[5]?.getClass()} /></Box> </Box>}
                                    />
                                    <TextAndLabel label="Charge rate" text={`${Math.round(worship.playerData[index].chargeRate * 24)}% / day`} />
                                </Box>
                                <ComponentAndLabel
                                    label="Time till full"
                                    component={
                                        timeToFull > 0 ?
                                            <TimeDown size={TimeDisplaySize.Small} addSeconds={timeToFull} />
                                            : <Text>Charge is full!</Text>
                                    }
                                />
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
        </Box>
    )
}

function TotemDisplay() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [efficiency, setEfficiency] = useState<number>(0);
    const [effFoodBonus, setEffFoodBonus] = useState<number>(0);
    const [worship, setWorshipData] = useState<WorshipDomain>();
    const appContext = useContext(AppContext);

    const size = useContext(ResponsiveContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setPlayerData(theData.get("players"));
            setWorshipData(theData.get("worship"))
        }
    }, [appContext]);

    if (!playerData || !worship || worship.totemInfo.filter(totem => totem.maxWave > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box gap="medium">
            <Box width="medium" gap="medium" direction="row">
                <ComponentAndLabel
                    label="Worship Efficiency"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={efficiency}
                        onChange={event => setEfficiency(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <ComponentAndLabel
                    label="Worship food effect"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={effFoodBonus}
                        onChange={event => setEffFoodBonus(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
            </Box>
            <Box>
                <Text size="xsmall">* Base XP is assuming multiplier of 1x.</Text>
                <Text size="xsmall">* You need a minimum efficiency of 60, 250, 1000, and 3000 on the respective totems to get bonus souls.</Text>
            </Box>
            <Grid columns={{ count: size == "small" ? 1 : 2, size: 'auto' }}>
                {
                    worship.totemInfo.map((totem, index) => (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }}>
                            <Grid columns={{ count: 5, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                <TextAndLabel text={totem.name} label="Name" />
                                <TextAndLabel text={totem.map?.area ?? ""} label="Area" />
                                <TextAndLabel text={totem.maxWave.toString()} label="Max Wave" />
                                <TextAndLabel text={Math.floor(totem.getExpRewards() / totem.getChargeCost()).toString()} label="XP Per Charge" />
                                <TextAndLabel text={totem.getSoulRewards(efficiency, effFoodBonus).toString()} label="Souls" />
                            </Grid>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )

}

function PrayerDisplay() {
    const [prayers, setPrayers] = useState<Prayer[]>([]);
    const appContext = useContext(AppContext);

    const size = useContext(ResponsiveContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setPrayers(theData.get("prayers"));
        }
    }, [appContext]);

    if (prayers.length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box gap="medium">
            {
                Array.from(GroupBy(prayers.filter(prayer => prayer.name != "Some Prayer Name0"), "towerName").entries()).map(([tower, prayers], index) => (
                    <Box key={index} gap="small">
                        <Text>{tower}</Text>
                        {
                            prayers.map((prayer, index) => (
                                <ShadowBox key={`prayer_${index}`} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }}>
                                    <Grid columns={{ count: 7, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                        <IconImage data={prayer.getImageData()} />
                                        <TextAndLabel text={prayer.name} label="Name" />
                                        <TextAndLabel text={`${prayer.level.toString()}/${prayer.maxLevel.toString()}`} label="Level" />
                                        <TextAndLabel text={prayer.getBonusText()} label="Bonus" />
                                        <TextAndLabel text={prayer.getCurseText()} label="Curse" />
                                        { prayer.level == prayer.maxLevel && <Box align="center" justify="center"><Text color="green-1" size="large">Maxed!</Text></Box>}
                                        { prayer.level == 0 && <TextAndLabel text={prayer.waveReq.toString()} label="Wave Req" /> }
                                        { prayer.level > 0 && prayer.level != prayer.maxLevel && <TextAndLabel text={nFormatter(prayer.getLevelCosts(), "Smaller")} label="Cost to next" /> }
                                        { prayer.level > 0 && prayer.level != prayer.maxLevel && <TextAndLabel text={nFormatter(prayer.getCostToMax(), "Smaller")} label="Cost to max" /> }
                                        
                                    </Grid>
                                </ShadowBox>
                            ))
                        }
                    </Box>
                ))
            }
        </Box>
    )

}

function Worship() {
    const [activeTab, setActiveTab] = useState<string>("Charge");

    return (
        <Box>
            <NextSeo title="Worship" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Worship</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Charge", "Totems", "Prayers"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Charge" && <ChargeDisplay />}
                {activeTab == "Totems" && <TotemDisplay />}
                {activeTab == "Prayers" && <PrayerDisplay />}
            </Box>
        </Box>
    )
}

export default Worship;