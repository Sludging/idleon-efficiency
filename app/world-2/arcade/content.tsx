"use client"

import {
    Box,
    Text,
    Heading,
} from 'grommet'
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
import TipDisplay from '../../../components/base/TipDisplay';
import useHydrated from '../../../lib/hooks/useHydrated';
import { notateNumber } from '../../../data/utility';

function GoldBallMultiplier({ arcade }: { arcade: ArcadeData }) {
    const sources = arcade.getGoldBallGainSources();
    const accountSources = [
        { name: "Golden Yellow palette", value: sources.goldenYellowPercent },
        { name: "Arcade shop", value: sources.arcadeShopPercent },
        { name: "Spheres of Gold", value: sources.spheresOfGoldPercent },
        { name: "Gold Figleaf", value: sources.goldFigleafPercent },
        { name: "Ballthezar", value: sources.ballthezarPercent },
        { name: "Hedgehog", value: sources.hedgehogPercent },
    ];

    return <Box gap="xxsmall" margin={{ right: 'medium' }}>
        <Text size="small" color="accent-2">Gold ball multiplier</Text>
        <TipDisplay
            heading="Gold ball multiplier"
            size="small"
            maxWidth="620px"
            body={<Box gap="xsmall" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                <Text size="xsmall">Account bonuses</Text>
                {accountSources.map(source => <Text key={source.name} size="xsmall" style={{ opacity: source.value === 0 ? 0.6 : 1 }}>
                    {source.name}: +{notateNumber(source.value, "Smaller")}%
                </Text>)}
                <Text size="xsmall" style={{ opacity: sources.eventMultiplier === 1 ? 0.6 : 1 }}>
                    Event: ×{notateNumber(sources.eventMultiplier, "MultiplierInfo").replace("#", "")}
                </Text>
                {sources.eventMultiplier !== 1 && <Text size="xsmall">The event multiplier applies to ordinary rewards, not the jackpot.</Text>}
            </Box>}
        >
            <Text tabIndex={0} size="large" weight="bold" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                {notateNumber(arcade.getGoldBallGainMultiplier(), "MultiplierInfo").replace("#", "")}x
            </Text>
        </TipDisplay>
    </Box>;
}

function Arcade() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const arcadeData = theData.get("arcade") as ArcadeData | undefined;
    const stampData = theData.get("stamps") as Stamp[][] | undefined;
    const serverVars = theData.get("servervars") as Record<string, unknown>;

    if (!hydrated || !arcadeData || !stampData) {
        return <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Arcade</Heading>
            <Text>Loading...</Text>
        </Box>;
    }

    const activeArcadeBonuses = Array.isArray(serverVars.ArcadeBonuses) ? serverVars.ArcadeBonuses as number[] : [];
    const goldenBallStampBonus = stampData.flat().find(stamp => stamp.raw_name === "StampC5")?.getBonus() ?? 0;

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Arcade</Heading>
            <Box gap="small">
                <Box direction="row" wrap>
                    <ComponentAndLabel
                        label="Silver balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} scale={0.7} />
                                <Text>{arcadeData.balls.toString()}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Gold balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} style={goldBallStyle} scale={0.7} />
                                <Text>{arcadeData.goldBalls.toString()}</Text>
                            </Box>
                        }
                    />
                    <GoldBallMultiplier arcade={arcadeData} />
                    <ComponentAndLabel
                        label="Cosmic balls"
                        margin={{ right: 'medium' }}
                        component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={ArcadeData.silverBallImageData()} style={cosmicBallStyle} scale={0.7} />
                                <Text>{arcadeData.cosmicBalls.toString()}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel component={<StaticTime fromSeconds={arcadeData.secondsPerBall} size={TimeDisplaySize.Small} />} label="Time per ball" margin={{ right: 'medium' }} />
                    <ComponentAndLabel component={<StaticTime fromSeconds={arcadeData.maxClaimTime} size={TimeDisplaySize.Small} />} label="Max Claim time" margin={{ right: 'medium' }} />
                    <TextAndLabel text={`${arcadeData.ballsToClaim}/${arcadeData.maxBalls}`} label="Balls to claim" />
                </Box>
                <Text>Gold Balls Shop</Text>
                <ArcadeBonusTable
                    rows={buildArcadeBonusTableRows(
                        arcadeData.bonuses,
                        goldenBallStampBonus,
                        activeArcadeBonuses
                    )}
                />
            </Box>
        </Box>
    )
}

export default Arcade;
