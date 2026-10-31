'use client';

import { useContext } from 'react';
import { Box, Grid, Heading, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import type { Companion } from '../../../data/domain/companions';
import type { EventShop } from '../../../data/domain/eventShop';
import { Friends } from '../../../data/domain/friends';
import { commaNotation, nFormatter } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

const CardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

export default function FriendsStatsContent() {
    const size = useContext(ResponsiveContext);
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const friends = theData.get('friends') as Friends | undefined;

    if (!hydrated || !friends) {
        return <>Loading...</>;
    }

    const activeBonuses = friends.bonuses.filter(bonus => bonus.active);
    const companions = theData.get('companions') as Companion[];
    const eventShop = theData.get('eventShop') as EventShop;
    const spearfish = companions.find(companion => companion.id === 44)!;
    const mrPig = companions.find(companion => companion.id === 30)!;
    const slotSources = [
        { name: 'Base', value: friends.slotSources.base },
        { name: spearfish.name, value: friends.slotSources.spearfish },
        { name: mrPig.name, value: friends.slotSources.mrPig },
        { name: `Event Shop — ${eventShop.bonuses.find(bonus => bonus.index === 22)!.data.name}`, value: friends.slotSources.friendlySlot },
        { name: `Event Shop — ${eventShop.bonuses.find(bonus => bonus.index === 67)!.data.name}`, value: friends.slotSources.slotOfFriendship },
    ];
    const multiplierSources = [
        { name: 'Base', value: friends.multiplierSources.base },
        { name: mrPig.name, value: friends.multiplierSources.mrPig },
        { name: `${spearfish.name} (level 2)`, value: friends.multiplierSources.spearfish },
    ];

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>
                Friends Stats
            </Heading>
            <Box direction="row" gap="medium" wrap>
                <ComponentAndLabel label="Slots" component={
                    <TipDisplay heading="Slots" size="small" body={
                        <Box gap="xxsmall">
                            {slotSources.map((source, index) => (
                                <Text key={source.name} size="xsmall" style={{ opacity: source.value === 0 ? 0.6 : 1 }}>
                                    {source.name}: {index === 0 ? '' : '+'}{commaNotation(source.value)}
                                </Text>
                            ))}
                        </Box>
                    }>
                        <Text tabIndex={0} size={size === 'small' ? 'xsmall' : 'medium'} style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                            {commaNotation(friends.friendBonusSlots)}
                        </Text>
                    </TipDisplay>
                } />
                <ComponentAndLabel label="Multiplier" component={
                    <TipDisplay heading="Multiplier" size="small" body={
                        <Box gap="xxsmall">
                            {multiplierSources.map((source, index) => (
                                <Text key={source.name} size="xsmall" style={{ opacity: source.value === 0 ? 0.6 : 1 }}>
                                    {source.name}: {index === 0 ? '' : '+'}{nFormatter(source.value, 'MultiplierInfo')}x
                                </Text>
                            ))}
                        </Box>
                    }>
                        <Text tabIndex={0} size={size === 'small' ? 'xsmall' : 'medium'} style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                            {nFormatter(friends.bonusMultiplier, 'MultiplierInfo')}x
                        </Text>
                    </TipDisplay>
                } />
            </Box>
            <Grid columns={size === 'small' ? ['flex'] : ['flex', 'flex', 'flex']} gap="medium" align="stretch">
                {activeBonuses.map(bonus => (
                    <RoundedShadowBox key={bonus.index} background="dark-1" pad="none" gap="none" overflow="hidden">
                        <CardHeader background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                            <Text size="small" weight="bold" style={{ overflowWrap: 'anywhere' }}>
                                {bonus.data.description.replace('{', nFormatter(bonus.getBonus(), 'MultiplierInfo'))}
                            </Text>
                        </CardHeader>
                        <Box pad="medium" gap="small" style={{ overflowWrap: 'anywhere' }}>
                            <TextAndLabel label="Friend" labelSize="xsmall" textSize="small" text={bonus.friendName} />
                            <TextAndLabel label="Account level" labelSize="xsmall" textSize="small" text={commaNotation(bonus.accountLevel)} />
                        </Box>
                    </RoundedShadowBox>
                ))}
            </Grid>
        </Box>
    );
}
