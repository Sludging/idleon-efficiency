'use client';

import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Box, CheckBox, Grid, Heading, Text } from 'grommet';
import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { CircleInformation } from 'grommet-icons';
import styled from 'styled-components';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TipDisplay from '../../../components/base/TipDisplay';
import type { ReactNode } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import type { Gallery, GalleryNametag, GalleryTrophy } from '../../../data/domain/world-7/gallery';
import { Item } from '../../../data/domain/items';
import { initGemShopRepo } from '../../../data/domain/data/GemShopRepo';
import type { Player } from '../../../data/domain/player';
import type { CoralReef } from '../../../data/domain/world-7/coralReef';
import type { Clamworks } from '../../../data/domain/world-7/clamworks';
import type { EventShop } from '../../../data/domain/eventShop';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { Companion } from '../../../data/domain/companions';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';

import { IDforETCbonus } from '../../../data/maps';
const galleryShowcase = initGemShopRepo().find(purchase => purchase.data.no === 40)!.data;

const galleryEffectOrder = Object.entries(IDforETCbonus)
    .filter(([id]) => Number(id) - 1 < 31 || Number(id) - 1 > 42)
    .map(([, effect]) => effect);

type GallerySource = {
    source: string;
    amount: number;
    active: boolean;
    potentialAmount?: number;
    cap?: number;
    unit: 'podiums';
};

type GallerySourceMetadata = {
    system: string;
    name?: string;
};

function getSourceMetadata(data: Map<string, unknown>): Record<string, GallerySourceMetadata> {
    const coralReef = data.get('coralReef') as CoralReef;
    const sneaking = data.get('sneaking') as Sneaking;
    const spelunking = data.get('spelunking') as Spelunking;
    const sailing = data.get('sailing') as Sailing;
    const eventShop = data.get('eventShop') as EventShop;
    const clamworks = data.get('clamworks') as Clamworks;
    const companions = data.get('companions') as Companion[];
    const legendTalents = data.get('legendTalents') as LegendTalents;
    const coralUpgrade = coralReef.upgrades.find(upgrade => upgrade.index === 4)!;
    const jadeUpgrade = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 42)!;
    const tunnel = spelunking.tunnels[5];
    const artifact = sailing.artifacts.find(entry => entry.index === 33)!;
    const clamBonus = clamworks.workBonuses.find(bonus => bonus.index === 0)!;
    const legendTalent = legendTalents.talents.find(talent => talent.index === 9)!;
    const eventBonus26 = eventShop.bonuses.find(bonus => bonus.index === 26)!;
    const eventBonus29 = eventShop.bonuses.find(bonus => bonus.index === 29)!;
    const companion28 = companions.find(companion => companion.id === 28)!;
    const companion42 = companions.find(companion => companion.id === 42)!;

    return {
        base: { system: 'Gallery', name: 'Starting podium capacity' },
        coralReefUpgrade4: { system: 'Coral Reef', name: coralUpgrade.data.name },
        jadeUpgrade42: { system: 'Jade Emporium', name: jadeUpgrade.data.name },
        gemPurchase40: { system: 'Gem Store', name: galleryShowcase.mtxName },
        lunarheimLore5: { system: 'Spelunking', name: tunnel.data.name },
        sailingArtifact33: { system: 'Sailing', name: artifact.data.name },
        eventShopBonus26: { system: 'Event Shop', name: eventBonus26.data.name },
        clamworksBonus0: { system: 'Clam Work', name: clamBonus.data.name },
        killroyPodiumsLevel2: { system: 'Killroy', name: 'Level 2 Podiums' },
        companion42: { system: 'Companion', name: companion42.name },
        gemPurchase40Halves: { system: 'Gem Store', name: galleryShowcase.mtxName },
        grade3Threshold: { system: 'Gallery', name: 'Level 3 podium threshold' },
        legendTalent9: { system: 'Legend Talents', name: legendTalent.data.name },
        artifact33Residual: { system: 'Sailing', name: artifact.data.name },
        companion28: { system: 'Companion', name: companion28.name },
        companionLevelTwo28: { system: 'Companion', name: `${companion28.name} (Level 2)` },
        eventShopBonus29: { system: 'Event Shop', name: eventBonus29.data.name },
        artifact33Tier6: { system: 'Sailing', name: `${artifact.data.name} · Transcendent` },
        artifact33Tier7: { system: 'Sailing', name: `${artifact.data.name} · Verisimilitude` },
        bundleM: { system: 'Bundle M' },
        gemPurchase40Thirds: { system: 'Gem Store', name: galleryShowcase.mtxName },
        artifact33Tier5: { system: 'Sailing', name: artifact.data.name },
        grade4Threshold: { system: 'Gallery', name: 'Level 4 podium threshold' },
    };
}
type GalleryTab = 'Trophies' | 'Nametags' | 'Bonuses';
type GalleryTier = 1 | 2 | 3 | 4;

function SummaryValue({ label, value, tooltip }: { label: string; value: string | number; tooltip?: ReactNode }) {
    const valueElement = (
        <Box direction="row" gap="xsmall" align="center">
            <Text size="large" weight="bold" style={tooltip ? { textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' } : undefined}>{value}</Text>
        </Box>
    );
    return (
        <Box gap="xsmall" style={{ minWidth: 0 }}>
            {tooltip ? <TipDisplay heading={label} body={tooltip} maxWidth="620px" size="small">{valueElement}</TipDisplay> : valueElement}
            <Text size="xsmall" color="accent-2">{label}</Text>
        </Box>
    );
}

function GallerySummary({ gallery, sourceMetadata }: { gallery: Gallery; sourceMetadata: Record<string, GallerySourceMetadata> }) {
    const podiumCounts = ([1, 2, 3, 4] as GalleryTier[]).map(tier => gallery.getPodiumCount(tier));
    const totalPodiums = podiumCounts.reduce((sum, count) => sum + count, 0);
    return (
        <Box direction="row" wrap gap="medium" pad={{ vertical: 'small' }}>
            <SummaryValue label="Total Podiums" value={totalPodiums} tooltip={<SourceTooltip entries={gallery.capacitySources} metadata={sourceMetadata} />} />
            {([4, 3, 2] as const).map(tier => (
                <SummaryValue key={tier} label={`Level ${tier} Podiums`} value={podiumCounts[tier - 1]} tooltip={<SourceTooltip entries={gallery.podiumGradeSources[tier]} metadata={sourceMetadata} />} />
            ))}
        </Box>
    );
}

function formatPodiums(amount: number) {
    const formatted = amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return `${formatted} ${amount === 1 ? 'podium' : 'podiums'}`;
}

function SourceList({ entries, metadata }: { entries: readonly GallerySource[]; metadata: Record<string, GallerySourceMetadata> }) {
    return (
        <Box gap="xsmall">
            {entries.map(entry => {
                const { source, amount, active, potentialAmount, cap } = entry;
                const sourceMetadata = metadata[source];
                const label = sourceMetadata.name;
                if (!label && source !== 'bundleM') return null;
                const nextContribution = !active && potentialAmount !== undefined && potentialAmount > amount;
                const value = active
                    ? formatPodiums(amount)
                    : nextContribution
                        ? formatPodiums(potentialAmount)
                        : cap !== undefined
                            ? `Up to ${formatPodiums(cap)}`
                            : undefined;
                if (!value) return null;
                return (
                    <Text key={source} size="small" color="#1e2127" style={{ opacity: active ? 1 : 0.6 }}>
                        {sourceMetadata.system}{label ? ` — ${label}` : ''}: {value}
                    </Text>
                );
            })}
        </Box>
    );
}

function SourceTooltip({ entries, metadata }: { entries: readonly GallerySource[]; metadata: Record<string, GallerySourceMetadata> }) {
    return (
        <Box gap="small" pad="small" background="white" style={{ position: 'relative', zIndex: 1, color: '#1e2127' }}>
            <SourceList entries={entries} metadata={metadata} />
        </Box>
    );
}

const GalleryCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;


const GalleryStatus = styled(Text).attrs({ size: 'xsmall', weight: 600 }) <{ $status: 'equipped' | 'memorized' }>`
    display: inline-flex;
    white-space: nowrap;
    flex-shrink: 0;
    align-self: flex-start;
    align-items: center;
    border-radius: 999px;
    padding: 2px 8px;
    background: ${({ $status, theme }: { $status: 'equipped' | 'memorized'; theme: ThemeType }) => $status === 'equipped'
        ? `color-mix(in srgb, ${normalizeColor('status-ok', theme)} 18%, transparent)`
        : 'rgba(225, 180, 84, 0.16)'};
    color: ${({ $status, theme }: { $status: 'equipped' | 'memorized'; theme: ThemeType }) => $status === 'equipped'
        ? normalizeColor('status-ok', theme)
        : '#ffe09a'};

    ${({ $status }) => $status === 'equipped' && `
        &::before {
            width: 5px;
            height: 5px;
            margin-right: 5px;
            border-radius: 50%;
            background: currentColor;
            content: '';
        }
    `}
`;

function PlacementStatus({ label, status }: { label: string; status: 'equipped' | 'memorized' }) {
    return <GalleryStatus $status={status}>{label}</GalleryStatus>;
}

const propertyLabels: Record<string, string> = {
    Weapon_Power: 'Weapon Power',
    STR: 'Strength',
    AGI: 'Agility',
    WIS: 'Wisdom',
    LUK: 'Luck',
    Defence: 'Defence',
};

function formatBonusValue(value: number) {
    const formatted = Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
    return `${value < 0 ? '−' : '+'}${formatted}`;
}

function ItemBonusRows({ bonuses, item }: {
    bonuses: readonly { channel: 'effect' | 'property'; name: string; value: number }[];
    item: Item | undefined;
}) {
    const rows = bonuses.filter(bonus => bonus.value !== 0);
    if (rows.length === 0) return null;
    return (
        <Box gap="xxsmall">
            {rows.map((bonus, index) => {
                if (bonus.channel === 'property') {
                    return <Text key={`${bonus.channel}-${bonus.name}-${index}`} size="xsmall" color="accent-2">{propertyLabels[bonus.name] ?? 'Equipment property'}: {formatBonusValue(bonus.value)}</Text>;
                }
                const effect = item?.itemStats.find(stat =>
                    (stat.stoneName === 'UQ1val' || stat.stoneName === 'UQ2val') &&
                    stat.extra?.toUpperCase() === bonus.name
                );
                return (
                    <Text key={`${bonus.channel}-${bonus.name}-${index}`} size="xsmall" color="accent-2">
                        {formatBonusValue(bonus.value)}{effect?.extra ? effect.extra.replace(/_/g, ' ') : 'Effect label unavailable'}
                    </Text>
                );
            })}
        </Box>
    );
}

function TrophyEntry({ trophy, item, gallery, silkrodeMotherboard }: {
    trophy: GalleryTrophy;
    item: Item | undefined;
    gallery: Gallery;
    silkrodeMotherboard: boolean;
}) {
    const placements = gallery.podiums
        .filter(podium => podium.trophy?.internalName === trophy.internalName)
        .sort((left, right) => right.tier - left.tier);
    const shelfPlacements = gallery.shelves.filter(shelf => shelf?.internalName === trophy.internalName).length;
    const pending = trophy.hasPendingDeposit;
    const deposited = trophy.obtained;
    const bonuses = gallery.getTrophyItemBonusesForChip(trophy, silkrodeMotherboard);
    return (
        <RoundedShadowBox background="dark-1" pad="none" gap="none" overflow="hidden" style={{ opacity: deposited || pending ? 1 : 0.62, outline: pending ? '1px solid #0376E3' : undefined, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <GalleryCardHeader direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Box direction="row" gap="small" align="center" style={{ minWidth: 0, flex: '1 1 auto' }}>
                    {item && <IconImage data={item.getImageData()} />}
                    <Text size="small" weight="bold" style={{ overflowWrap: 'anywhere' }}>{trophy.name}</Text>
                </Box>
                <Box direction="row" gap="xsmall" wrap align="center" justify="end" style={{ flex: '0 0 auto', minWidth: 0 }}>
                    {placements.map((podium, index) => (
                        <PlacementStatus key={`${podium.tier}-${index}`} status="equipped" label={`Level ${podium.tier} · ${podium.multiplier.toFixed(2)}x`} />
                    ))}
                    {shelfPlacements > 0 && <PlacementStatus status="memorized" label={`Shelf · ${gallery.shelfMultiplier.toFixed(1)}x${shelfPlacements > 1 ? ` ×${shelfPlacements}` : ''}`} />}
                    {pending && <PlacementStatus status="memorized" label="Ready to deposit" />}
                </Box>
            </GalleryCardHeader>
            <Box pad="medium" gap="small" style={{ flex: '1 1 auto' }}>
                <ItemBonusRows bonuses={bonuses} item={item} />
            </Box>
        </RoundedShadowBox>
    );
}

function NametagEntry({ nametag, item, gallery, silkrodeMotherboard }: {
    nametag: GalleryNametag;
    item: Item | undefined;
    gallery: Gallery;
    silkrodeMotherboard: boolean;
}) {
    const pending = nametag.hasPendingDeposit;
    const deposited = nametag.count > 0;
    const bonuses = gallery.getNametagItemBonusesForChip(nametag, silkrodeMotherboard);
    return (
        <RoundedShadowBox background="dark-1" pad="none" gap="none" overflow="hidden" style={{ opacity: deposited || pending ? 1 : 0.62, outline: pending ? '1px solid #0376E3' : undefined, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <GalleryCardHeader direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Box direction="row" gap="small" align="center" style={{ minWidth: 0, flex: '1 1 auto' }}>
                    {item && <IconImage data={item.getImageData()} />}
                    <Text size="small" weight="bold" style={{ overflowWrap: 'anywhere' }}>{nametag.name}</Text>
                </Box>
                <Box direction="row" gap="xsmall" wrap align="center" justify="end" style={{ flex: '0 0 auto', minWidth: 0 }}>
                    <PlacementStatus status={deposited ? 'equipped' : 'memorized'} label={`Lv. ${nametag.count}`} />
                    {pending && <PlacementStatus status="memorized" label="Ready to deposit" />}
                </Box>
            </GalleryCardHeader>
            <Box pad="medium" gap="small" style={{ flex: '1 1 auto' }}>
                <ItemBonusRows bonuses={bonuses} item={item} />
            </Box>
        </RoundedShadowBox>
    );
}


function CollectionTabs({
    gallery,
    items,
    tab,
    setTab,
    silkrodeMotherboard,
    setSilkrodeMotherboard,
    hideZeroBonuses,
    setHideZeroBonuses,
    sourceMetadata,
    playersWearingChip,
}: {
    gallery: Gallery;
    items: Item[];
    tab: GalleryTab;
    setTab: (tab: GalleryTab) => void;
    silkrodeMotherboard: boolean;
    setSilkrodeMotherboard: (checked: boolean) => void;
    hideZeroBonuses: boolean;
    setHideZeroBonuses: (checked: boolean) => void;
    sourceMetadata: Record<string, GallerySourceMetadata>;
    playersWearingChip: Player[];
}) {
    const itemByName = useMemo(() => new Map(items.map(item => [item.internalName, item])), [items]);
    const unobtainableTrophy = itemByName.get('Trophy4')!;
    const trophies = gallery.trophies.filter(trophy => trophy.internalName !== unobtainableTrophy.internalName);
    const orderedTrophies = trophies
        .map((trophy, index) => {
            const highestPodiumTier = gallery.podiums.reduce((highest, podium) =>
                podium.trophy?.internalName === trophy.internalName ? Math.max(highest, podium.tier) : highest, 0);
            const onShelf = gallery.shelves.some(shelf => shelf?.internalName === trophy.internalName);
            return { trophy, index, rank: highestPodiumTier || (onShelf ? 0 : -1) };
        })
        .sort((left, right) => right.rank - left.rank || left.index - right.index);
    const sortedNametags = gallery.nametags
        .map((nametag, index) => ({ nametag, index }))
        .sort((left, right) => right.nametag.count - left.nametag.count || left.index - right.index);
    const depositedTrophies = trophies.filter(trophy => trophy.obtained).length;
    const depositedNametags = gallery.nametags.filter(nametag => nametag.count > 0).length;
    const columns = ['flex', 'flex', 'flex', 'flex'];
    const collectedNames = new Set([...gallery.trophies, ...gallery.nametags].map(entry => entry.internalName));
    const catalogEffects = new Set<string>();
    items.forEach(item => {
        if (!collectedNames.has(item.internalName)) return;
        item.itemStats.forEach(stat => {
            if ((stat.stoneName === 'UQ1val' || stat.stoneName === 'UQ2val') && stat.extra && stat.extra !== '0') catalogEffects.add(stat.extra.toUpperCase());
        });
    });
    const gameEffectSet = new Set(galleryEffectOrder);
    const orderedEffects = [
        ...galleryEffectOrder.filter(effect => catalogEffects.has(effect)),
        ...[...catalogEffects].filter(effect => !gameEffectSet.has(effect)),
    ];
    const combinedBonusRows = orderedEffects
        .map(effect => ({ effect, value: gallery.getCombinedBonusForChip(effect, silkrodeMotherboard) }));
    const bonusRows = [
        ...combinedBonusRows.filter(row => row.value !== 0),
        ...(hideZeroBonuses ? [] : combinedBonusRows.filter(row => row.value === 0)),
    ];
    const collection = tab === 'Trophies' ? (
        <Box gap="medium">
            <Grid columns={columns} gap="small" style={{ rowGap: '12px', columnGap: '12px', gridAutoRows: '1fr' }}>
                {orderedTrophies.map(({ trophy }) => <TrophyEntry key={trophy.internalName} trophy={trophy} item={itemByName.get(trophy.internalName)} gallery={gallery} silkrodeMotherboard={silkrodeMotherboard} />)}
            </Grid>
        </Box>
    ) : (
        <Box gap="medium">
            <Grid columns={columns} gap="small" style={{ rowGap: '12px', columnGap: '12px', gridAutoRows: '1fr' }}>
                {sortedNametags.map(({ nametag }) => <NametagEntry key={nametag.internalName} nametag={nametag} item={itemByName.get(nametag.internalName)} gallery={gallery} silkrodeMotherboard={silkrodeMotherboard} />)}
            </Grid>
        </Box>
    );
    return (
        <Box gap="medium">
            <ContentTabs<GalleryTab>
                options={[
                    { value: 'Bonuses', label: 'Bonuses' },
                    { value: 'Trophies', label: `Trophies ${depositedTrophies}/${trophies.length}` },
                    { value: 'Nametags', label: `Nametags ${depositedNametags}/${gallery.nametags.length}` },
                ]}
                value={tab}
                onChange={setTab}
            />
            {tab === 'Bonuses' ? (
                <Box gap="medium">
                    <Box direction="row" wrap align="center" gap="medium">
                        <SummaryValue label="Bonus Multiplier" value={`${gallery.getBonusMultiplierForChip(silkrodeMotherboard).toFixed(2)}x`} />
                        <Box direction="row" align="center" gap="small">
                            <CheckBox checked={silkrodeMotherboard} label="Silkrode Motherboard Equipped" onChange={event => setSilkrodeMotherboard(event.target.checked)} />
                            <TipDisplay heading="Silkrode Motherboard" body={playersWearingChip.length > 0
                                ? <Box gap="xsmall">{playersWearingChip.map(player => <Text key={player.playerID} size="small">{player.playerName}</Text>)}</Box>
                                : <Text size="small">No characters have Silkrode Motherboard equipped.</Text>} size="small">
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    </Box>
                    <CheckBox checked={hideZeroBonuses} label="Hide zero" onChange={event => setHideZeroBonuses(event.target.checked)} />
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
            ) : collection}
        </Box>
    );
}

export default function GalleryContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const gallery = theData.get('gallery') as Gallery | undefined;
    const players = theData.get('players') as Player[] | undefined;
    const items = theData.get('itemsData') as Item[] | undefined;
    const [silkrodeMotherboard, setSilkrodeMotherboard] = useState(false);
    const [hideZeroBonuses, setHideZeroBonuses] = useState(true);
    const [tab, setTab] = useState<GalleryTab>('Bonuses');

    if (!hydrated || !gallery || !players || !items) return <>Loading Gallery data...</>;
    const sourceMetadata = getSourceMetadata(theData);
    const playersWearingChip = players.filter(player => player.getChipBonus('troph') !== 0);


    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Gallery</Heading>
            <GallerySummary gallery={gallery} sourceMetadata={sourceMetadata} />
            <CollectionTabs gallery={gallery} items={items} tab={tab} setTab={setTab} silkrodeMotherboard={silkrodeMotherboard} setSilkrodeMotherboard={setSilkrodeMotherboard} hideZeroBonuses={hideZeroBonuses} setHideZeroBonuses={setHideZeroBonuses} sourceMetadata={sourceMetadata} playersWearingChip={playersWearingChip} />
        </Box>
    );
}

