'use client';

import { useMemo, useState } from 'react';
import { Box, Button, CheckBox, Grid, Heading, Meter, Select, Text, TextInput } from 'grommet';
import { useShallow } from 'zustand/react/shallow';
import { useTime } from 'react-timer-hook';
import styled from 'styled-components';
import ContentTabs from '../../../components/base/ContentTabs';
import { ResourceDisplay } from '../../../components/account/shared/ResourceDisplay';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { EnemyInfo } from '../../../data/domain/enemies';
import { Item } from '../../../data/domain/items';
import { KillRoy, KillroyPermanentBonus, KillroyRunUpgrade, KillroyRunUpgradeId, KillroyShopOffer } from '../../../data/domain/world-2/killroy';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

const GreyCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;
const UpgradeCard = styled(RoundedShadowBox)`
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 2;
    row-gap: 0;
`;
const enemies = new Map(EnemyInfo.map(enemy => [enemy.id, enemy]));
const skullImage = Item.getImageData('Quest69');
const bonusNames = ['Artifact Find Chance', 'Crop Evolution Chance', 'Jade Gain', 'Gallery', 'Masterclass Drops', 'World 7 Skill EXP', 'Daily Coral Gain', 'Something...'];
type KillroyTab = 'Upgrades' | 'Permanent Upgrades' | 'Monsters';
const tabs: KillroyTab[] = ['Upgrades', 'Permanent Upgrades', 'Monsters'];
const collectionColumns = { count: 'fit' as const, size: '280px' };
const multiplier = (value: number, precision: number = 5): string => `${value.toFixed(precision).replace(/0+$/, '').replace(/\.$/, '')}x`;
const probability = (value: number): string => `${(value * 100).toLocaleString(undefined, { maximumFractionDigits: 5 })}%`;
const nativeText = (text: string): string => text.replace(/[_|]/g, ' ').replace(/\s+/g, ' ').trim();

function runEffect(upgrade: KillroyRunUpgrade, next: boolean = false): string {
    const level = upgrade.level + (next ? 1 : 0);
    switch (upgrade.id) {
        case KillroyRunUpgradeId.Timer:
            return `${commaNotation(upgrade.getRunDurationSeconds(level))} seconds`;
        case KillroyRunUpgradeId.TalentDrops:
            return probability(upgrade.getTalentPointDropProbability(level));
        case KillroyRunUpgradeId.BonusSkulls:
            return multiplier(upgrade.getBonusSkullMultiplier(level));
        case KillroyRunUpgradeId.FasterRespawn:
            return multiplier(upgrade.getExpectedRespawnCreditsMultiplier(level));
        case KillroyRunUpgradeId.DungeonDrops:
            return probability(upgrade.getDungeonCreditDropProbability(level));
        case KillroyRunUpgradeId.PearlDrops:
            return probability(upgrade.getPearlDropProbability(level));
    }
}

const runEffectNames = ['Room time', 'Talent Point drop chance', 'Skull drop chance bonus', 'Average monsters per timed respawn', 'Dungeon Credit drop chance', 'Pearl drop chance'];

function RunUpgrades({ killroy }: { killroy: KillRoy }) {
    return <Box gap="medium" data-killroy-upgrades>
        <Box direction="row" wrap gap="medium">
            <TextAndLabel label="Completed Runs" text={commaNotation(killroy.completedRuns)} />
            <TextAndLabel label="Upgrade Choices" text={commaNotation(killroy.runUpgrades[0].availableChoiceCount)} tooltip={<Text>Shades of K adds upgrade choices after each completed run.</Text>} />
        </Box>
        <Grid columns={collectionColumns} gap="medium">
            {killroy.runUpgrades.map(upgrade => <UpgradeCard key={upgrade.id} background="dark-1" pad="none" overflow="hidden" style={{ opacity: upgrade.unlocked ? 1 : 0.5 }} data-killroy-run-upgrade={upgrade.id}>
                <GreyCardHeader background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }} gap="xsmall">
                    <Text size="small" weight="bold">{upgrade.data.name}</Text>
                    <Text size="xsmall" color="accent-2">Level {commaNotation(upgrade.level)}</Text>
                </GreyCardHeader>
                <Box pad="medium" gap="small">
                    <Text size="small">{runEffectNames[upgrade.id]}</Text>
                    <Box background="dark-3" pad="small" round="xsmall" gap="xsmall">
                        <Text size="xsmall" color="accent-2">Current → Next level</Text>
                        <Box direction="row" wrap gap="xsmall" align="center">
                            <Text size="small" weight="bold">{runEffect(upgrade)}</Text>
                            <Text size="small" color="accent-2">→ {runEffect(upgrade, true)}</Text>
                        </Box>
                    </Box>
                    {upgrade.id === KillroyRunUpgradeId.TalentDrops && <Text size="xsmall" color="accent-2">Chance falls as you collect more Killroy Talent Points.</Text>}
                    {!upgrade.unlocked && upgrade.runsUntilUnlock > 0 && <Text size="xsmall" color="accent-2">Requires {commaNotation(upgrade.completedRunsRequired)} completed runs · {commaNotation(upgrade.runsUntilUnlock)} more</Text>}
                    {upgrade.id >= upgrade.availableChoiceCount && <Text size="small">Requires more Shades of K upgrade choices.</Text>}
                </Box>
            </UpgradeCard>)}
        </Grid>
    </Box>;
}

function bonusEffect(bonus: KillroyPermanentBonus, value: number = bonus.getEffectValue()): string {
    if (bonus.id === 3) return `+${multiplier(value, 7)}`;
    if (bonus.id === 6) return `+${value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}%`;
    return multiplier(value);
}

function shopDescription(offer: KillroyShopOffer): string {
    return nativeText(offer.data.descriptionTemplate);
}

function ShopStatus({ offer, killroy }: { offer: KillroyShopOffer; killroy: KillRoy }) {
    if (!offer.unlocked) return <Text size="xsmall" color="accent-2">{offer.data.id < 15 ? 'Requires Rift 50' : 'Requires Rift 50 and more Billroy dialogue'}</Text>;
    if (offer.data.id === 10 && killroy.thirdBattleUnlocked) return <Text size="xsmall" color="accent-2">Completed</Text>;
    if (offer.data.id === 5 && offer.purchaseExcluded) return <Text size="xsmall" color="accent-2">Weekly limit reached</Text>;
    return null;
}

function ShopCard({ offer, killroy }: { offer: KillroyShopOffer; killroy: KillRoy }) {
    const bonus = offer.permanentBonus;
    // Random candy is a pattern, not a single item. Non-item rows contain an unused item placeholder.
    const itemId = offer.rewardItemIdOrPattern;
    const image = itemId && !itemId.includes('#') ? Item.getImageData(itemId) : undefined;
    const name = bonus ? bonusNames[bonus.id] : offer.data.id === 10 ? 'Third Weekly Fight' : offer.data.id === 12 ? 'Gaming Shovel Nugget' : undefined;
    const completed = offer.purchaseExcluded;
    const progress = bonus ? bonus.getCapProgress() : 0;
    return <UpgradeCard background="dark-1" pad="none" overflow="hidden" style={{ opacity: offer.unlocked ? 1 : 0.5 }} data-killroy-shop-offer={offer.data.id} data-killroy-completed={completed || undefined}>
        <GreyCardHeader background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }} direction="row" align="center" gap="small">
            {image && <IconImage data={image} />}
            <Box gap="xsmall">
                <Text size="small" weight="bold">{name ?? shopDescription(offer)}</Text>
                {bonus && <Text size="xsmall" color="accent-2">Level {commaNotation(bonus.level)}</Text>}
                <ShopStatus offer={offer} killroy={killroy} />
            </Box>
        </GreyCardHeader>
        <Box pad="medium" gap="small">
            {completed ? null : bonus ? <>
                <Box background="dark-3" pad="small" round="xsmall" gap="xsmall" data-killroy-effect-cap={bonus.id}>
                    <Text size="xsmall" color="accent-2">{bonus.id === 3 ? 'Gallery bonus multiplier / Cap' : 'Current effect / Cap'}</Text>
                    <Text size="small">
                        <Text weight="bold">{bonusEffect(bonus)}</Text> / {bonusEffect(bonus, bonus.getEffectCap())} ({progress.toFixed(1)}%)
                    </Text>
                    <Meter type="bar" size="full" thickness="4px" background="grey-1" max={100}
                        values={[{ value: progress, color: 'brand' }]} aria-label={`${bonusNames[bonus.id]} effect cap progress`} />
                    <Text size="small" color="accent-2">→ {bonusEffect(bonus, bonus.getEffectValue(bonus.level + 1))} next successful upgrade</Text>
                </Box>
                {bonus.id === 3 && <>
                    <Text size="small">Repeatable: +1 upgrade level on success (+1 Grade in-game).</Text>
                    <Text size="xsmall" color="accent-2">Success chance: {probability(bonus.upgradeSuccessProbability)} per purchase.{bonus.upgradeSuccessProbability < 1 ? ' Guaranteed from level 2.' : ''}</Text>
                    <Text size="xsmall" color="accent-2">Also contributes toward up to 2 extra Grade 2 podiums.</Text>
                </>}
                {!offer.hasKnownGameplayEffect && <Text size="small">This reward has no known use yet.</Text>}
            </> : name ? <Text size="small">{shopDescription(offer)}</Text> : null}
            {!completed && <ResourceDisplay resourceImageData={skullImage} cost={offer.data.skullCost} canAfford={killroy.skulls >= offer.data.skullCost} textSize="small" showTooltip={false} />}
        </Box>
    </UpgradeCard>;
}

function PermanentUpgrades({ killroy }: { killroy: KillRoy }) {
    const [showCompleted, setShowCompleted] = useState(false);
    const offers = killroy.shopOffers.filter(offer => showCompleted || !offer.purchaseExcluded);
    return <Box gap="medium" data-killroy-permanent>
        <CheckBox label="Show completed" checked={showCompleted} onChange={event => setShowCompleted(event.target.checked)} />
        <Grid columns={collectionColumns} gap="medium">
            {offers.filter(offer => offer.data.id >= 10).map(offer => <ShopCard key={offer.data.id} offer={offer} killroy={killroy} />)}
        </Grid>
        <Heading level="3" size="small" margin={{ top: 'medium', bottom: 'none' }} style={{ fontWeight: 'normal' }}>Skull Shop Rewards</Heading>
        <Grid columns={collectionColumns} gap="medium">
            {offers.filter(offer => offer.data.id < 10).map(offer => <ShopCard key={offer.data.id} offer={offer} killroy={killroy} />)}
        </Grid>
    </Box>;
}

type RecordFilter = 'All' | 'Recorded' | 'Unrecorded';
type MonsterSort = 'Name: A–Z' | 'Name: Z–A' | 'Best Kills: Low–High' | 'Best Kills: High–Low';
function Monsters({ killroy }: { killroy: KillRoy }) {
    const [query, setQuery] = useState('');
    const [world, setWorld] = useState('All Worlds');
    const [recordFilter, setRecordFilter] = useState<RecordFilter>('All');
    const [sort, setSort] = useState<MonsterSort>('Name: A–Z');
    const worlds = useMemo(() => ['All Worlds', ...Array.from(new Set(killroy.monsterRecords.map(record => record.world))).sort((a, b) => a - b).map(value => `World ${value + 1}`)], [killroy]);
    const visible = killroy.monsterRecords.filter(record => {
        const enemy = enemies.get(record.enemyId)!;
        return enemy.details.Name.toLowerCase().includes(query.trim().toLowerCase())
            && (world === 'All Worlds' || world === `World ${record.world + 1}`)
            && (recordFilter === 'All' || (recordFilter === 'Recorded' ? record.bestKills > 0 : record.bestKills === 0));
    }).sort((left, right) => {
        const nameOrder = enemies.get(left.enemyId)!.details.Name.localeCompare(enemies.get(right.enemyId)!.details.Name);
        if (sort === 'Name: A–Z') return nameOrder;
        if (sort === 'Name: Z–A') return -nameOrder;
        const killOrder = left.bestKills - right.bestKills;
        return (sort === 'Best Kills: Low–High' ? killOrder : -killOrder) || nameOrder;
    });
    const changed = query !== '' || world !== 'All Worlds' || recordFilter !== 'All' || sort !== 'Name: A–Z';
    return <Box gap="medium" data-killroy-monsters>
        <Box direction="row" wrap align="end" gap="small">
            <Box width="medium"><ComponentAndLabel label={<label htmlFor="killroy-monster-search">Search</label>} component={<TextInput id="killroy-monster-search" placeholder="Search monster names" value={query} onChange={event => setQuery(event.target.value)} />} /></Box>
            <Box width="small"><ComponentAndLabel label="World" component={<Select aria-label="Monster world" options={worlds} value={world} onChange={({ option }) => setWorld(option)} />} /></Box>
            <Box width="small"><ComponentAndLabel label="Record" component={<Select aria-label="Monster record filter" options={['All', 'Recorded', 'Unrecorded']} value={recordFilter} onChange={({ option }) => setRecordFilter(option)} />} /></Box>
            <Box width="medium"><ComponentAndLabel label="Sort" component={<Select aria-label="Monster sort" options={['Name: A–Z', 'Name: Z–A', 'Best Kills: Low–High', 'Best Kills: High–Low']} value={sort} onChange={({ option }) => setSort(option)} />} /></Box>
            {changed && <Button plain label={<Text size="small" color="brand">Clear filters</Text>} onClick={() => { setQuery(''); setWorld('All Worlds'); setRecordFilter('All'); setSort('Name: A–Z'); }} />}
            <Text size="small" color="accent-2">{visible.length} / {killroy.monsterRecords.length} monsters</Text>
        </Box>
        <Grid columns={{ count: 'fit', size: '200px' }} gap="small">
            {visible.map(record => {
                const enemy = enemies.get(record.enemyId)!;
                return <RoundedShadowBox key={record.enemyId} background="dark-1" pad="small" gap="small" direction="row" align="center" data-killroy-monster={record.enemyId}>
                    <IconImage data={enemy.getImageData()} />
                    <Box gap="xxsmall">
                        <Text size="small" weight="bold">{enemy.details.Name}</Text>
                        <Text size="xsmall" color="accent-2">World {record.world + 1}</Text>
                        <Text size="small">{commaNotation(record.bestKills)} best kills</Text>
                    </Box>
                </RoundedShadowBox>;
            })}
        </Grid>
        {visible.length === 0 && <Box background="dark-1" pad="medium"><Text>No monsters match these filters.</Text></Box>}
    </Box>;
}

function CurrentFights({ killroy }: { killroy: KillRoy }) {
    useTime();
    const projection = killroy.accountFightProjection;
    const classNames = ['Beginner', 'Warrior', 'Archer', 'Mage'];
    const resetDeadline = killroy.savedWeekEndTimestamp;
    const secondsRemaining = resetDeadline === undefined ? undefined : Math.max(0, resetDeadline - Math.floor(Date.now() / 1000));
    return <Box gap="small" border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'medium' }} data-killroy-current-fights>
        <Box direction="row" wrap gap="medium" align="center" justify="between">
            <Text size="small" weight="bold">Available Fights</Text>
            {secondsRemaining !== undefined && <Text size="xsmall" color="accent-2" data-killroy-reset>Resets in {toTime(Math.floor(secondsRemaining), true)}</Text>}
        </Box>
        {projection ? <>
            <Box direction="row" wrap gap="small">
                {projection.fights.map(fight => {
                    const enemy = enemies.get(fight.enemyId)!;
                    return <Box key={fight.slot} direction="row" align="center" background="dark-1" pad="small" gap="small" data-killroy-fight-slot={fight.slot}>
                        <IconImage data={enemy.getImageData()} />
                        <Box gap="xxsmall">
                            <Text size="small" weight="bold">{enemy.details.Name}</Text>
                            <Text size="xsmall" color="accent-2">Fight {fight.slot} · {classNames[fight.classCategory]}</Text>
                            <Text size="small">{commaNotation(fight.bestKills)} best kills</Text>
                        </Box>
                    </Box>;
                })}
            </Box>
            {projection.fights.length === 0 && <Text size="small">All available fights have been entered.</Text>}
        </> : <Text size="small">No fights available.</Text>}
        {killroy.airhornUsed && <Text size="xsmall" color="accent-2">Airhorn used this week.</Text>}
    </Box>;
}

export default function KillroyContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })));
    const [tab, setTab] = useState<KillroyTab>('Upgrades');
    const killroy = theData.get('killroy') as KillRoy | undefined;
    if (!hydrated || !killroy) return <>Loading Killroy data</>;

    return <Box gap="medium">
        <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>Killroy</Heading>
        <Box direction="row" wrap gap="large" pad={{ vertical: 'small' }} data-killroy-summary>
            <ComponentAndLabel label="Skulls" component={<ResourceDisplay resourceImageData={skullImage} cost={killroy.skulls} resourceImageScale={1} textSize="xxlarge" showTooltip={false} />} />
            <TextAndLabel label="Total Best Kills" text={notateNumber(killroy.totalBestKills, 'Big')} textSize="xxlarge" tooltip={<Text>{commaNotation(killroy.totalBestKills)} best kills across 104 monsters.</Text>} />
            <TextAndLabel label="Killroy Prime Damage" text={multiplier(killroy.damageMultiplier)} textSize="xxlarge" tooltip={<Text>Your monster bests increase this Rift reward. The damage bonus stops at +200%.</Text>} />
        </Box>
        <CurrentFights killroy={killroy} />
        <Box gap="medium">
            <ContentTabs options={tabs.map(value => ({ value, label: value }))} value={tab} onChange={setTab} />
            {tab === 'Upgrades' && <RunUpgrades killroy={killroy} />}
            {tab === 'Permanent Upgrades' && <PermanentUpgrades killroy={killroy} />}
            {tab === 'Monsters' && <Monsters killroy={killroy} />}
        </Box>
    </Box>;
}
