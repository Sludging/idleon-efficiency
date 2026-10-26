'use client';

import { Box, Heading, Text } from 'grommet';
import { useTime } from 'react-timer-hook';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import type { ImageData } from '../../../data/domain/imageData';
import { Votes } from '../../../data/domain/world-2/votes';
import { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import { notateNumber, toTime } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

const CandidateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 8px;
`;

type Ballot = Votes | Meritocraty;
type BallotImagePrefix = 'VoteBon' | 'MeritBon';

function BallotArtwork({ prefix, index }: { prefix: BallotImagePrefix; index: number }) {
    const image: ImageData = { location: `${prefix}${index}`, width: 26, height: 26 };

    return <Box width="40px" height="40px" align="center" justify="center" flex={false}>
        <IconImage data={image} />
    </Box>;
}

function getEffectDescription(ballot: Ballot, index: number, active = false): string {
    const bonus = ballot.bonuses.find(entry => entry.index === index);
    if (!bonus) {
        return '';
    }

    const contribution = active ? ballot.getCurrentBonus(index) : ballot.getPotentialBonus(index);
    const multiplier = ballot.getPotentialBonusMultiplier(index);

    return bonus.data.text
        .replaceAll('{', notateNumber(contribution, 'Smaller'))
        .replaceAll('}', notateNumber(multiplier, 'Smaller'));
}

function BallotSection({ title, ballot, imagePrefix, locked = false }: {
    title: string;
    ballot: Ballot;
    imagePrefix: BallotImagePrefix;
    locked?: boolean;
}) {
    const activeBonus = ballot.bonuses.find(bonus => bonus.index === ballot.currentBonusIndex && bonus.index > 0);
    const candidates = [
        { index: ballot.ongoingVoteTopOptionIndex, percent: ballot.ongoingVoteTopOptionPercent },
        { index: ballot.ongoingVoteMiddleOptionIndex, percent: ballot.ongoingVoteMiddleOptionPercent },
        { index: ballot.ongoingVoteBottomOptionIndex, percent: ballot.ongoingVoteBottomOptionPercent },
    ].filter(candidate => candidate.index > 0 && ballot.bonuses.some(bonus => bonus.index === candidate.index));
    const highestPercent = Math.max(0, ...candidates.map(candidate => candidate.percent));

    return <Box gap="small">
        <Heading level="3" size="small" margin="none" style={{ fontWeight: 'normal' }}>{title}</Heading>
        <RoundedShadowBox background="dark-1" pad="medium">
            <Box direction="row" gap="medium" align="center" justify="between" wrap>
                <Box direction="row" gap="small" align="center" flex="grow">
                    {activeBonus && <BallotArtwork prefix={imagePrefix} index={activeBonus.index} />}
                    <Box gap="xxsmall">
                        <Text size="xsmall" color="accent-2">Active bonus</Text>
                        <Text size="small">{activeBonus ? getEffectDescription(ballot, activeBonus.index, true) : 'No active bonus'}</Text>
                        {locked && <Text size="xsmall" color="accent-2">Reach World 7 to receive Meritocracy bonuses.</Text>}
                    </Box>
                </Box>
            </Box>
        </RoundedShadowBox>
        {candidates.length > 0 && <Box gap="small">
            <Text size="small" weight="bold">Voting for next week</Text>
            <CandidateGrid>
                {candidates.map(candidate => {
                    const leading = candidate.percent > 0 && candidate.percent === highestPercent;

                    return <RoundedShadowBox key={candidate.index} background="dark-1" pad="none" gap="none" overflow="hidden"
                        style={leading ? { border: '1px solid #e1b454', background: '#29271f' } : undefined}>
                        <Box direction="row" gap="small" align="center" background="grey-1"
                            pad={{ horizontal: 'medium', vertical: 'small' }}
                            style={{ position: 'relative', zIndex: 1, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.18)' }}>
                            <BallotArtwork prefix={imagePrefix} index={candidate.index} />
                            <Box gap="xxsmall">
                                <Text size="small" weight="bold">{notateNumber(candidate.percent, 'Smaller')}% votes</Text>
                                {leading && <Text size="xsmall" color="accent-2">Current leader</Text>}
                            </Box>
                        </Box>
                        <Box pad="medium">
                            <Text size="small">{getEffectDescription(ballot, candidate.index)}</Text>
                        </Box>
                    </RoundedShadowBox>;
                })}
            </CandidateGrid>
        </Box>}
    </Box>;
}

export default function VoteBallotContent() {
    const hydrated = useHydrated();
    useTime();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const votes = theData.get('votes') as Votes | undefined;
    const meritocraty = theData.get('meritocraty') as Meritocraty | undefined;

    if (!hydrated || !votes || !meritocraty) {
        return <>Loading...</>;
    }

    const unixTimeSeconds = Math.floor(Date.now() / 1000);
    const bonusSecondsRemaining = Math.max(0, votes.getNextRotationAt(unixTimeSeconds) - unixTimeSeconds);
    const meritocracySecondsRemaining = Math.max(0, meritocraty.getNextRotationAt(unixTimeSeconds) - unixTimeSeconds);
    const noBonusVoteRecorded = !votes.hasVotedThisWeek(unixTimeSeconds);
    const noMeritocracyVoteRecorded = meritocraty.haveReachedW7 && meritocraty.canVote
        && !meritocraty.hasVotedThisWeek(unixTimeSeconds);

    return <Box gap="medium">
        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Vote Ballot</Heading>
        <Box direction="row" gap="medium" wrap>
            <ComponentAndLabel label="Bonus Ballot multiplier" labelSize="small" component={
                <TipDisplay heading="Bonus Ballot multiplier" maxWidth="620px" size="small" body={
                    <Box gap="small">
                        <Box gap="xxsmall">
                            <Text size="xsmall" weight="bold">Additive bonuses</Text>
                            {([
                                ['Crystal Cuttlefish', votes.bonusSources.crystalCuttlefish],
                                ['Equinox', votes.bonusSources.equinox],
                                ['Cosmo', votes.bonusSources.cosmo],
                                ['Summoning Win', votes.bonusSources.summoning],
                                ['Event Shop — Gilded Vote Button', votes.bonusSources.eventShop7],
                                ['Event Shop — Royal Vote Button', votes.bonusSources.eventShop16],
                                ['Mashed Potato', votes.bonusSources.mashedPotato],
                                ['Palette', votes.bonusSources.palette],
                                ['Legend Talent', votes.bonusSources.legendTalent],
                                ['Sushi Tier 50', votes.bonusSources.sushi],
                            ] as const).map(([label, value]) => <Text key={label} size="xsmall" style={{ opacity: value === 0 ? 0.6 : 1 }}>
                                {label}: +{notateNumber(value, 'Smaller')}%
                            </Text>)}
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall" weight="bold">Separate multiplier bonuses</Text>
                            <Text size="xsmall">Poppy: +{notateNumber(votes.multiFromCompanion161, 'Smaller')}%</Text>
                            <Text size="xsmall">Meritocracy bonus: +{notateNumber(votes.multiFromMeritocraty, 'Smaller')}%</Text>
                        </Box>
                    </Box>
                }>
                    <Text tabIndex={0} size="medium" style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                        {notateNumber(votes.getBonusMultiplier(), 'Smaller')}x
                    </Text>
                </TipDisplay>
            } />
            <ComponentAndLabel label="Meritocracy multiplier" labelSize="small" component={
                <TipDisplay heading="Meritocracy multiplier" maxWidth="620px" size="small" body={
                    <Box gap="small">
                        <Box gap="xxsmall">
                            <Text size="xsmall" weight="bold">Additive bonuses</Text>
                            {([
                                ['Clam Work', meritocraty.clamWorkBonus],
                                ['Pufferblob', meritocraty.companionBonus],
                                ['Legend Talent', meritocraty.legendTalentBonus],
                                ['Arcade', meritocraty.arcadeBonus],
                                ['Event Shop', meritocraty.eventShopBonus],
                                ['Sushi Tier 51', meritocraty.sushiBonus],
                                ['Jelly Operator', meritocraty.jellyBonus],
                            ] as const).map(([label, value]) => <Text key={label} size="xsmall" style={{ opacity: value === 0 ? 0.6 : 1 }}>
                                {label}: +{notateNumber(value, 'Smaller')}%
                            </Text>)}
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall" weight="bold">Separate multiplier bonuses</Text>
                            <Text size="xsmall">Poppy: +{notateNumber(meritocraty.companionBonus161, 'Smaller')}%</Text>
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall">World 7: {meritocraty.haveReachedW7 ? 'reached — multiplier applies' : 'not reached — required for multiplier to apply'}</Text>
                            <Text size="xsmall">Demonflesh voting: {meritocraty.canVote ? 'Unlocked. You can vote. Base bonus multiplier: 1x.' : 'Locked. You cannot vote. Base bonus multiplier: 0.25x.'}</Text>
                        </Box>
                    </Box>
                }>
                    <Text tabIndex={0} size="medium" style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                        {notateNumber(meritocraty.getBonusMultiplier(), 'Smaller')}x
                    </Text>
                </TipDisplay>
            } />
            <ComponentAndLabel label="Bonus Ballot resets in" labelSize="small" component={
                <Text size="medium">{toTime(bonusSecondsRemaining, true)}</Text>
            } />
            <ComponentAndLabel label="Meritocracy resets in" labelSize="small" component={
                <Text size="medium">{toTime(meritocracySecondsRemaining, true)}</Text>
            } />
        </Box>
        {(noBonusVoteRecorded || noMeritocracyVoteRecorded) && <Box gap="xxsmall">
            {noBonusVoteRecorded && <Text size="small">No Bonus Ballot vote recorded this week in the loaded save.</Text>}
            {noMeritocracyVoteRecorded && <Text size="small">No Meritocracy vote recorded this week in the loaded save.</Text>}
        </Box>}
        <BallotSection title="Bonus Ballot" ballot={votes} imagePrefix="VoteBon" />
        <BallotSection title="Meritocracy" ballot={meritocraty} imagePrefix="MeritBon" locked={!meritocraty.haveReachedW7} />
    </Box>;
}
