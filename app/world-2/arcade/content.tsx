"use client"

import {
    Box,
    Text,
    Heading,
} from 'grommet'
import { useEffect, useState, useMemo } from 'react';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Arcade as ArcadeData } from '../../../data/domain/arcade';
import { Stamp } from '../../../data/domain/stamps';
import { StaticTime, TimeDisplaySize } from '../../../components/base/TimeDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function Arcade() {
    const [arcadeData, setArcadeData] = useState<ArcadeData>();
    const [stampData, setStampData] = useState<Stamp[][]>([]);
    const [serverVars, setServerVars] = useState<Record<string, any>>({})
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setArcadeData(theData.get("arcade"));
        setStampData(theData.get("stamps"));
        setServerVars(theData.get("servervars"));
    }, [theData])

    const activeArcadeBonuses = useMemo(() => {
        if (serverVars && Object.keys(serverVars).includes("ArcadeBonuses")) {
            return serverVars["ArcadeBonuses"] as number[];
        }
        return [];
    }, [serverVars])

    const goldenBallStampBonus = useMemo(() => {
        if (stampData) {
            return stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC5")?.getBonus() ?? 0;
        }
        return 0;
    }, [stampData])

    return (
        <Box pad="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Arcade</Heading>
            <Box gap="small">
                <Box direction="row">
                    <TextAndLabel text={arcadeData?.balls?.toString() ?? "0"} label="Silver balls" margin={{ right: 'medium' }} />
                    <TextAndLabel text={arcadeData?.goldBalls?.toString() ?? "0"} label="Gold balls" margin={{ right: 'medium' }} />
                    <ComponentAndLabel component={<StaticTime fromSeconds={arcadeData?.secondsPerBall ?? 0} size={TimeDisplaySize.Small} />} label="Time per ball" margin={{ right: 'medium' }} />
                    <ComponentAndLabel component={<StaticTime fromSeconds={arcadeData?.maxClaimTime ?? 0} size={TimeDisplaySize.Small} />} label="Max Claim time" margin={{ right: 'medium' }} />
                    <TextAndLabel text={`${(arcadeData?.ballsToClaim ?? 0).toString()}/${arcadeData?.maxBalls}`} label="Balls to claim" />
                </Box>
                <Text>Gold Balls Shop</Text>
                <Box>
                    {
                        arcadeData && arcadeData.bonuses.map((bonus, index) => {
                            return (
                                <ShadowBox background="dark-1" key={index} direction="row">
                                    <Box justify="start" direction="row" fill border={index != arcadeData.bonuses.length - 1 ? { side: 'bottom', color: 'accent-3', size: '1px' } : undefined} pad="medium">
                                        <Box style={{ opacity: activeArcadeBonuses?.includes(bonus.index) || activeArcadeBonuses.length == 0 ? 1 : 0.3 }} margin={{ right: 'medium' }}>
                                            <IconImage data={bonus.getImageData()} />
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
