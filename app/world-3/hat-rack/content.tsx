'use client';

import { Box, Button, CheckBox, Grid, Heading, Select, Text, TextInput } from 'grommet';
import { useState } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import ItemSourcesDisplay from '../../../components/base/ItemSourceDisplay';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import type { HatRack, HatRackHat, HatRackItemBonus } from '../../../data/domain/world-7/hatRack';
import { commaNotation, round } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

type HatRackTab = 'Bonuses' | 'Premium Helmets';
type HatDepositFilter = 'All' | 'Deposited' | 'Not deposited';

const HatCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

function BonusRows({ bonuses }: { bonuses: readonly HatRackItemBonus[] }) {
    return (
        <Box gap="xxsmall">
            {bonuses.filter(bonus => bonus.value !== 0).map(({ effect, value }, index) => (
                <Box key={`${effect}-${index}`} direction="row" justify="between" gap="small">
                    <Text size="xsmall">{effect.replace(/^%_?/, '').replace(/_/g, ' ')}</Text>
                    <Text size="xsmall" weight="bold" style={{ whiteSpace: 'nowrap' }}>
                        {value > 0 ? '+' : ''}{round(value).toLocaleString()}{effect.startsWith('%') ? '%' : ''}
                    </Text>
                </Box>
            ))}
        </Box>
    );
}

function HatEntry({ hat, hatRack }: { hat: HatRackHat; hatRack: HatRack }) {
    const bonuses = hat.stored
        ? hatRack.getHatItemBonuses(hat)
        : hat.item.itemStats
            .filter(stat => stat.stoneName !== 'Upgrade_Slots_Left' && stat.shouldDisplay())
            .map(stat => ({ effect: stat.extra ? stat.extra.toUpperCase() : stat.displayName, value: stat.getValue() }));

    return (
        <RoundedShadowBox
            background="dark-1"
            pad="none"
            gap="none"
            overflow="hidden"
            style={{ opacity: hat.stored ? 1 : 0.62, display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <HatCardHeader direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                <TipDisplay
                    heading={`${hat.name} (${hat.item.type})`}
                    body={(
                        <Box gap="small">
                            {hat.item.description && <Text size="small">{hat.item.description}</Text>}
                            <Text size="xsmall">Upgrade Slots Left: {commaNotation(hat.item.upgradeSlots)}</Text>
                            {((hat.item.sources.sources?.length ?? 0) > 0
                                || (hat.item.sources.recipeFrom?.length ?? 0) > 0
                                || (hat.item.sources.questAss?.length ?? 0) > 0)
                                && <ItemSourcesDisplay sources={hat.item.sources} />}
                        </Box>
                    )}
                    size="small"
                    maxWidth="large"
                >
                    <IconImage data={hat.item.getImageData()} />
                </TipDisplay>
                <Text size="small" weight="bold" style={{ overflowWrap: 'anywhere' }}>{hat.name}</Text>
            </HatCardHeader>
            <Box pad="medium" gap="small" style={{ flex: '1 1 auto' }}>
                <BonusRows bonuses={bonuses} />
            </Box>
        </RoundedShadowBox>
    );
}

export default function HatRackContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const hatRack = theData.get('hatRack') as HatRack | undefined;
    const [tab, setTab] = useState<HatRackTab>('Bonuses');
    const [hideZeroBonuses, setHideZeroBonuses] = useState(true);
    const [query, setQuery] = useState('');
    const [depositFilter, setDepositFilter] = useState<HatDepositFilter>('All');

    if (!hydrated || !hatRack) return <>Loading Hat Rack data...</>;

    const hats = hatRack.hats;
    const depositedCount = hatRack.getDepositedHatCount();
    const orderedHats = [...hats].sort((left, right) => Number(right.stored) - Number(left.stored));
    const normalizedQuery = query.trim().toLowerCase();
    const filteredHats = orderedHats.filter(hat => hat.name.toLowerCase().includes(normalizedQuery)
        && (depositFilter === 'All' || (depositFilter === 'Deposited' ? hat.stored : !hat.stored)));
    const filtersChanged = query !== '' || depositFilter !== 'All';
    const accountBonuses = hatRack.getAccountBonuses();
    const catalogEffects = new Set(['Weapon Power', 'STR', 'AGI', 'WIS', 'LUK', 'Defence']);
    hats.forEach(hat => {
        hat.item.itemStats.forEach(stat => {
            if ((stat.stoneName === 'UQ1val' || stat.stoneName === 'UQ2val') && stat.extra && stat.extra !== '0') {
                catalogEffects.add(stat.extra.toUpperCase());
            }
        });
    });
    const combinedBonusRows = [...new Set([...catalogEffects, ...accountBonuses.keys()])]
        .map(effect => ({ effect, value: accountBonuses.get(effect) ?? 0 }));
    const bonusRows = [
        ...combinedBonusRows.filter(row => row.value !== 0),
        ...(hideZeroBonuses ? [] : combinedBonusRows.filter(row => row.value === 0)),
    ];
    const columns = ['flex', 'flex', 'flex', 'flex'];

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Hat Rack</Heading>
            <Box direction="row" wrap gap="medium" pad={{ vertical: 'small' }}>
                <Box gap="xsmall">
                    <Text size="large" weight="bold">{commaNotation(depositedCount)}</Text>
                    <Text size="xsmall" color="accent-2">Deposited hats</Text>
                </Box>
                <Box gap="xsmall">
                    <Text size="large" weight="bold">{round(hatRack.getBonusMultiplier()).toFixed(2)}x</Text>
                    <Text size="xsmall" color="accent-2">Bonus multiplier</Text>
                </Box>
                <Text size="small" color="accent-2">The multiplier starts at 1x and increases by 1% per deposited hat. Other bonuses also increase it.</Text>
            </Box>
            <Box gap="medium">
                <ContentTabs<HatRackTab>
                    options={[
                        { value: 'Bonuses', label: 'Bonuses' },
                        { value: 'Premium Helmets', label: `Premium Helmets ${depositedCount}/${hats.length}` },
                    ]}
                    value={tab}
                    onChange={setTab}
                />
                {tab === 'Bonuses' ? (
                    <Box gap="medium">
                        <CheckBox checked={hideZeroBonuses} label="Hide zero bonuses" onChange={event => setHideZeroBonuses(event.target.checked)} />
                        <Box gap="small">
                            <Heading level="3" size="small" style={{ fontWeight: 'normal' }}>Combined bonuses</Heading>
                            <Grid columns={columns} gap="small" style={{ rowGap: '12px', columnGap: '12px' }}>
                                {bonusRows.map(({ effect, value }) => (
                                    <Box key={effect} direction="row" justify="between" gap="small" border={{ side: 'bottom', color: 'grey-1' }} pad={{ vertical: 'xsmall' }}>
                                        <Text size="xsmall">{effect.replace(/_/g, ' ')}</Text>
                                        <Text size="xsmall" weight="bold">{value.toLocaleString()}</Text>
                                    </Box>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                ) : (
                    <Box gap="medium">
                        <Box direction="row" wrap gap="small" align="end">
                            <Box width="200px">
                                <ComponentAndLabel
                                    label={<label htmlFor="hat-rack-search"><Text size="xsmall" color="accent-2">Search</Text></label>}
                                    component={<TextInput id="hat-rack-search" size="small" placeholder="Search hats" aria-label="Search hats"
                                        value={query} onChange={event => setQuery(event.target.value)} />}
                                />
                            </Box>
                            <Box width="180px">
                                <ComponentAndLabel
                                    label={<label htmlFor="hat-rack-deposit"><Text size="xsmall" color="accent-2">Hat Rack deposit</Text></label>}
                                    component={<Select id="hat-rack-deposit" size="small" aria-label="Hat Rack deposit"
                                        options={['All', 'Deposited', 'Not deposited']} value={depositFilter} onChange={({ option }) => setDepositFilter(option)} />}
                                />
                            </Box>
                            {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery('')} />}
                            {filtersChanged && <Button plain label={<Text size="small" color="brand">Clear filters</Text>}
                                onClick={() => { setQuery(''); setDepositFilter('All'); }} />}
                            <Text size="xsmall" color="accent-2">{filteredHats.length} hats</Text>
                        </Box>
                        <Grid columns={columns} gap="small" style={{ rowGap: '12px', columnGap: '12px', gridAutoRows: '1fr' }}>
                            {filteredHats.map(hat => <HatEntry key={hat.internalName} hat={hat} hatRack={hatRack} />)}
                        </Grid>
                        {filteredHats.length === 0 && <Box background="dark-1" pad="small"><Text>No hats match these filters.</Text></Box>}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
