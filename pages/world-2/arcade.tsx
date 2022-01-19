import {
    Box,
    Text,
    Heading,
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';
import ShadowBox from '../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { Arcade as ArcadeData } from '../../data/domain/arcade';
import { Stamp } from '../../data/domain/stamps';
import { Alchemy } from '../../data/domain/alchemy';
import { Achievement } from '../../data/domain/achievements';
import { TaskBoard } from '../../data/domain/tasks';
import { StaticTime, TimeDisplaySize } from '../../components/base/TimeDisplay';

function Arcade() {
    const [arcadeData, setArcadeData] = useState<ArcadeData>();
    const [stampData, setStampData] = useState<Stamp[][]>([]);
    const [achievementData, setAchievementData] = useState<Achievement[]>([]);
    const [alchemyData, setAlchemyData] = useState<Alchemy>();
    const [taskboardData, setTaskboardData] = useState<TaskBoard>();
    const [serverVars, setServerVars] = useState<Record<string, any>>({})
    const appContext = useContext(AppContext);

    useEffect(() => {
        const theData = appContext.data.getData();
        setArcadeData(theData.get("arcade"));
        setStampData(theData.get("stamps"));
        setAlchemyData(theData.get("alchemy"));
        setAchievementData(theData.get("achievements"));
        setServerVars(theData.get("servervars"));
        setTaskboardData(theData.get("taskboard"));
    }, [appContext])

    const activeArcadeBonuses = useMemo(() => {
        if (serverVars && Object.keys(serverVars).includes("ArcadeBonuses")) {
            return serverVars["ArcadeBonuses"] as number[];
        }
        return [];
    }, [serverVars])

    const ballsPerSecond = useMemo(() => {
        if (alchemyData && stampData && arcadeData && achievementData) {
            const ballVialBonus = alchemyData?.vials.find(vial => vial.name == "Ball Pickle Jar")?.getBonus() ?? 0;
            const ballMeritLevel = taskboardData?.merits.find(merit => merit.descLine1.includes("arcade ball gain rate"))?.level ?? 0;
            const stampBonus = stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC4")?.getBonus() ?? 0;
            return arcadeData?.getBallsPerSec(achievementData, ballVialBonus, ballMeritLevel, stampBonus);
        }
        return 0;
    }, [stampData, alchemyData, arcadeData, achievementData, taskboardData]);

    const maxClaimTime = useMemo(() => {
        if (stampData && arcadeData) { 
            const stampBonus = stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC8")?.getBonus() ?? 0;
            return arcadeData?.getMaxClaimTime(stampBonus);
        }
        return 0;
    }, [stampData, arcadeData]);

    const ballsToClaim = useMemo(() => {
        const timeAwayData = appContext.data.getData().get("timeAway");
        if (timeAwayData) {
            return Math.floor(Math.min(timeAwayData["GlobalTime"] - timeAwayData["Arcade"], maxClaimTime) / Math.max(ballsPerSecond, 1800));
        }
        return 0;
    }, [appContext, maxClaimTime, ballsPerSecond]);

    const goldenBallStampBonus = useMemo(() => {
        if (stampData) {
            return stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC5")?.getBonus() ?? 0;
        }
        return 0;
    }, [stampData])

    return (
        <Box pad="medium">
            <NextSeo title="Arcade" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Arcade</Heading>
            <Box gap="small">
                <Box direction="row">
                    <TextAndLabel text={arcadeData?.balls.toString() ?? "0"} label="Silver balls" margin={{ right: 'medium' }} />
                    <TextAndLabel text={arcadeData?.goldBalls.toString() ?? "0"} label="Gold balls" margin={{ right: 'medium' }}/>
                    <ComponentAndLabel component={<StaticTime fromSeconds={ballsPerSecond} size={TimeDisplaySize.Small} /> } label="Time per ball" margin={{ right: 'medium' }}/>
                    <ComponentAndLabel component={<StaticTime fromSeconds={maxClaimTime} size={TimeDisplaySize.Small} /> } label="Max Claim time" margin={{ right: 'medium' }}/>
                    <TextAndLabel text={`${ballsToClaim?.toString() ?? "0"}/${Math.floor(maxClaimTime/ballsPerSecond)}`} label="Balls to claim" />
                </Box>
                <Text>Gold Balls Shop</Text>
                <Box>
                    {
                        arcadeData && arcadeData.bonuses.map((bonus, index) => {
                            return (
                                <ShadowBox background="dark-1" key={index} direction="row">
                                    <Box justify="start" direction="row" fill border={index != arcadeData.bonuses.length - 1 ? {side: 'bottom', color: 'accent-3', size: '1px'} : undefined} pad="medium">
                                        <Box style={{ opacity: activeArcadeBonuses?.includes(bonus.index) || activeArcadeBonuses.length == 0 ? 1 : 0.3 }} width={{ max: '62px', min: '62px' }} margin={{ right: 'medium' }}>
                                            <Box className={bonus.getClass()} />
                                        </Box>
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getBonusText()} label="Effect" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={`${bonus.level}/100`} label="Level" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getCost(goldenBallStampBonus).toString()} label="Cost" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={`${bonus.level}/100`} label="Level" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getBonus(true, 100).toString()} label="Max Bonus" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getCostToMax(goldenBallStampBonus).toString()} label="Cost to max" margin={{ right: 'medium' }} />
                                    </Box>
                                </ShadowBox>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Arcade;