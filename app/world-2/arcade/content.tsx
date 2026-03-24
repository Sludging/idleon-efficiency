"use client"

import {
    Box,
    Text,
    Heading,
} from 'grommet'
import { useEffect, useState, useMemo } from 'react';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Arcade as ArcadeData } from '../../../data/domain/world-2/arcade';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { StaticTime, TimeDisplaySize } from '../../../components/base/TimeDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

const goldBallStyle: React.CSSProperties = {
    filter: 'sepia(1) saturate(4.2) hue-rotate(8deg) brightness(1.08) contrast(1.1) drop-shadow(0 0 1px rgba(255, 214, 90, 0.3))',
};

const cosmicBallStyle: React.CSSProperties = {
    filter: 'sepia(1) saturate(8.5) hue-rotate(168deg) brightness(1.24) contrast(1.16) drop-shadow(0 0 1px rgba(205, 245, 255, 0.85)) drop-shadow(0 0 2px rgba(102, 193, 255, 0.4))',
};

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
                <Box direction="row" wrap>
                    <ComponentAndLabel
                        label="Silver balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} />
                                <Text>{arcadeData?.balls?.toString() ?? "0"}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Gold balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} style={goldBallStyle} />
                                <Text>{arcadeData?.goldBalls?.toString() ?? "0"}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Cosmic balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} style={cosmicBallStyle} />
                                <Text>{arcadeData?.cosmicBalls?.toString() ?? "0"}</Text>
                            </Box>
                        }
                    />
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
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getBonus(true, 100).toString()} label="Max Bonus" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={`${bonus.level}/100`} label="Level" margin={{ right: 'medium' }} />
                                        <TextAndLabel labelSize='small' textSize='xsmall' text={bonus.getCost(goldenBallStampBonus).toString()} label="Cost" margin={{ right: 'medium' }} />
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
