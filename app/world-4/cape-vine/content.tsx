'use client';

import { Box, Button, CheckBox, Grid, Heading, Select, Text, TextInput, ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { CircleInformation } from 'grommet-icons';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import ItemSourcesDisplay from '../../../components/base/ItemSourceDisplay';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import type { CapeVine, CapeVineCape, CapeVineItemBonus } from '../../../data/domain/world-4/capeVine';
import { commaNotation, round } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

type CapeVineTab = 'Bonuses' | 'Capes';
type CapeCollectionFilter = 'All' | 'Deposited' | 'Not deposited' | 'Golden slot' | 'Ordinary slot';

const CapeCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

const CapeStatus = styled(Text).attrs({ size: 'xsmall', weight: 600 })<{ $status: 'golden' | 'ordinary' | 'missing' }>`
    display: inline-flex;
    white-space: nowrap;
    flex-shrink: 0;
    align-self: flex-start;
    align-items: center;
    border-radius: 999px;
    padding: 2px 8px;
    background: ${({ $status, theme }: { $status: 'golden' | 'ordinary' | 'missing'; theme: ThemeType }) => {
        if ($status === 'golden') return 'rgba(225, 180, 84, 0.16)';
        if ($status === 'ordinary') return `color-mix(in srgb, ${normalizeColor('status-ok', theme)} 18%, transparent)`;
        return 'rgba(255, 255, 255, 0.08)';
    }};
    color: ${({ $status, theme }: { $status: 'golden' | 'ordinary' | 'missing'; theme: ThemeType }) => {
        if ($status === 'golden') return '#ffe09a';
        return normalizeColor($status === 'ordinary' ? 'status-ok' : 'accent-2', theme);
    }};
`;

function SummaryValue({ label, value, tooltip, heading = label, status }: {
    label: string;
    value: string;
    tooltip: ReactNode;
    heading?: string;
    status?: string;
}) {
    return (
        <Box gap="xsmall" align="start" style={{ minWidth: 0 }}>
            <Box direction="row" gap="small" align="baseline">
                <TipDisplay heading={heading} body={tooltip} size="small" maxWidth="large">
                    <Text size="large" weight="bold" style={{ textDecoration: 'underline dotted', textDecorationColor: 'currentColor', textUnderlineOffset: '4px', cursor: 'help' }}>{value}</Text>
                </TipDisplay>
                {status && <Text size="xsmall" color="accent-2">{status}</Text>}
            </Box>
            <Text size="xsmall" color="accent-2">{label}</Text>
        </Box>
    );
}

function BonusRows({ bonuses }: { bonuses: readonly CapeVineItemBonus[] }) {
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

function CapeEntry({ cape, capeVine }: { cape: CapeVineCape; capeVine: CapeVine }) {
    const bonuses = capeVine.getCapeItemBonuses(cape);

    return (
        <RoundedShadowBox
            background="dark-1"
            pad="none"
            gap="none"
            overflow="hidden"
            style={{ opacity: cape.stored ? 1 : 0.62, display: 'grid', gridTemplateRows: 'subgrid', gridRow: 'span 2', rowGap: 0, height: '100%' }}
        >
            <CapeCardHeader direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Box direction="row" gap="small" align="center" style={{ minWidth: 0, flex: '1 1 auto' }}>
                    <Box flex={false}>
                        <IconImage data={cape.item.getImageData()} />
                    </Box>
                    <Text size="small" weight="bold" style={{ overflowWrap: 'anywhere' }}>{cape.name}</Text>
                </Box>
                <Box direction="row" gap="xsmall" wrap align="center" justify="end" style={{ flex: '0 0 auto', minWidth: 0 }}>
                    <CapeStatus $status={cape.stored ? cape.golden ? 'golden' : 'ordinary' : 'missing'}>
                        {cape.stored ? `${cape.golden ? 'Golden' : 'Ordinary'} · ${cape.multiplier.toFixed(2)}x` : 'Not deposited'}
                    </CapeStatus>
                </Box>
            </CapeCardHeader>
            <Box pad="medium" gap="small">
                <BonusRows bonuses={bonuses} />
            </Box>
        </RoundedShadowBox>
    );
}

export default function CapeVineContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const capeVine = theData.get('capeVine') as CapeVine | undefined;
    const [tab, setTab] = useState<CapeVineTab>('Bonuses');
    const [hideZeroBonuses, setHideZeroBonuses] = useState(true);
    const [query, setQuery] = useState('');
    const [collectionFilter, setCollectionFilter] = useState<CapeCollectionFilter>('All');

    if (!hydrated || !capeVine) return <>Loading Cape Vine data...</>;

    const capes = [...capeVine.capes];
    const catalogNames = new Set(capes.map(cape => cape.internalName));
    for (const depositedCape of capeVine.getDepositedCapes()) {
        if (!catalogNames.has(depositedCape.internalName)) {
            capes.push(depositedCape);
            catalogNames.add(depositedCape.internalName);
        }
    }
    const depositedCount = capeVine.getDepositedCapeCount();
    const orderedCapes = [...capes].sort((left, right) => Number(right.stored) - Number(left.stored)
        || (left.slot ?? 0) - (right.slot ?? 0));
    const normalizedQuery = query.trim().toLowerCase();
    const filteredCapes = orderedCapes.filter(cape => {
        if (!cape.name.toLowerCase().includes(normalizedQuery)) return false;
        switch (collectionFilter) {
            case 'Deposited': return cape.stored;
            case 'Not deposited': return !cape.stored;
            case 'Golden slot': return cape.stored && cape.golden;
            case 'Ordinary slot': return cape.stored && !cape.golden;
            default: return true;
        }
    });
    const filtersChanged = query !== '' || collectionFilter !== 'All';
    const accountBonuses = capeVine.getAccountBonuses();
    const catalogEffects = new Set(['Weapon Power', 'STR', 'AGI', 'WIS', 'LUK', 'Defence']);
    capes.forEach(cape => {
        cape.item.itemStats.forEach(stat => {
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
            <Box direction="row" align="center" gap="small">
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Cape Vine</Heading>
                <TipDisplay heading="How bonuses work" size="small" maxWidth="large" body={(
                    <Box gap="small">
                        <Text size="small">Golden slots grant full item bonuses, multiplied by the bonus multiplier.</Text>
                        <Text size="small">Ordinary slots grant 25% of item bonuses, then apply the bonus multiplier.</Text>
                        <Text size="small">Weapon Power, STR, AGI, WIS, LUK, and Defence use Hat Rack bonuses plus the last cape's bonuses in slot order. Accuracy does not contribute.</Text>
                        <Text size="small">Combined bonuses also include inherited Hat Rack base stats. These do not appear on individual cape cards.</Text>
                    </Box>
                )}>
                    <CircleInformation size="small" aria-label="How bonuses work" style={{ cursor: 'help' }} />
                </TipDisplay>
            </Box>
            <Box direction="row" wrap gap="medium" pad={{ vertical: 'small' }}>
                <SummaryValue label="Deposited capes" value={commaNotation(depositedCount)} tooltip={(
                    <Box gap="small">
                        <Text size="small">Cape Vine bonuses replace equipped cape bonuses for characters who unlocked Cape Vine.</Text>
                    </Box>
                )} />
                <SummaryValue label="Bonus multiplier" value={`${round(capeVine.getBonusMultiplier()).toFixed(2)}x`}
                    tooltip="The multiplier starts at 1x. Each deposited cape adds 1%. Catherine's companion bonus also increases it." />
                <SummaryValue label="Golden slots owned" value={commaNotation(capeVine.getGoldenSlotCount())} tooltip={(
                    <Box gap="small">
                        <Text size="small">You start with one golden slot. </Text>
                        <Text size="small">Level rewards: +{commaNotation(capeVine.claimedGoldenSlots)}</Text>
                        <Text size="small">Bundle slots: +{capeVine.premiumGoldenSlots ? 3 : 0}</Text>
                    </Box>
                )} />
                <SummaryValue label="Next golden slot level" heading="Next Catherine claim" value={commaNotation(capeVine.getNextClaimLevel())}
                     tooltip={(
                        <Text size="small">
                            {capeVine.isClaimReady()
                                ? `Claim in game with: ${capeVine.eligibleClaimants.map(player => `${player.name} (Lv. ${commaNotation(player.level)})`).join(', ')}.`
                                : 'No character meets the next claim level requirement.'}
                        </Text>
                    )} />
            </Box>
            <Box gap="medium">
                <ContentTabs<CapeVineTab>
                    options={[
                        { value: 'Bonuses', label: 'Bonuses' },
                        { value: 'Capes', label: `Capes ${depositedCount}/${capes.length}` },
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
                                        <Text size="xsmall">{effect.replace(/^%_?/, '').replace(/_/g, ' ')}</Text>
                                        <Text size="xsmall" weight="bold">{round(value).toLocaleString()}{effect.startsWith('%') ? '%' : ''}</Text>
                                    </Box>
                                ))}
                            </Grid>
                            {bonusRows.length === 0 && <Text size="small" color="accent-2">No Cape Vine bonuses. Deposit a cape in game, or show zero bonuses.</Text>}
                        </Box>
                    </Box>
                ) : (
                    <Box gap="medium">
                        <Box direction="row" wrap gap="small" align="end">
                            <Box width="200px">
                                <ComponentAndLabel
                                    label={<label htmlFor="cape-vine-search"><Text size="xsmall" color="accent-2">Search</Text></label>}
                                    component={<TextInput id="cape-vine-search" size="small" placeholder="Search capes" aria-label="Search capes"
                                        value={query} onChange={event => setQuery(event.target.value)} />}
                                />
                            </Box>
                            <Box width="180px">
                                <ComponentAndLabel
                                    label={<label htmlFor="cape-vine-collection"><Text size="xsmall" color="accent-2">Cape Vine deposit</Text></label>}
                                    component={<Select id="cape-vine-collection" size="small" aria-label="Cape Vine deposit"
                                        options={['All', 'Deposited', 'Not deposited', 'Golden slot', 'Ordinary slot']} value={collectionFilter}
                                        onChange={({ option }) => setCollectionFilter(option)} />}
                                />
                            </Box>
                            {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery('')} />}
                            {filtersChanged && <Button plain label={<Text size="small" color="brand">Clear filters</Text>}
                                onClick={() => { setQuery(''); setCollectionFilter('All'); }} />}
                            <Text size="xsmall" color="accent-2">{filteredCapes.length} capes</Text>
                        </Box>
                        <Grid columns={columns} gap="small" style={{ rowGap: '12px', columnGap: '12px', gridAutoRows: 'auto' }}>
                            {filteredCapes.map(cape => <CapeEntry key={cape.internalName} cape={cape} capeVine={capeVine} />)}
                        </Grid>
                        {filteredCapes.length === 0 && <Box background="dark-1" pad="small"><Text>No capes match these filters.</Text></Box>}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
