"use client"

import {
    Box,
    Text,
    Heading,
} from 'grommet'
import { useEffect, useState, useMemo } from 'react';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Arcade as ArcadeData } from '../../../data/domain/world-2/arcade';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { StaticTime, TimeDisplaySize } from '../../../components/base/TimeDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import ArcadeBonusTable from '../../../components/world-2/arcade/ArcadeBonusTable';
import { buildArcadeBonusTableRows } from '../../../components/world-2/arcade/arcadeBonusTableData';
import { cosmicBallStyle, goldBallStyle } from '../../../components/world-2/arcade/ballStyles';

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
                <ArcadeBonusTable
                    rows={buildArcadeBonusTableRows(
                        arcadeData?.bonuses ?? [],
                        goldenBallStampBonus,
                        activeArcadeBonuses
                    )}
                />
            </Box>
        </Box>
    )
}

export default Arcade;
