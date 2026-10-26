'use client';

import { Box, Grid, Heading, Text } from 'grommet';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ContentTabs from '../../../components/base/ContentTabs';
import TextAndLabel from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import { initItemDetailRepo } from '../../../data/domain/data/ItemDetailRepo';
import { Item } from '../../../data/domain/items';
import type { IslandRewardPossession } from '../../../data/domain/world-2/island-expeditions/possession';
import type { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import { commaNotation } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';
import { CrystalDetails, FractalDetails, ShimmerDetails } from './details';
import { EffectPreview, IslandCost, IslandResourceAmount, RewardCard } from './presentation';

const tabs = ['Trash', 'Rando', 'Crystal', 'Shimmer', 'Fractal'] as const;
type IslandTab = typeof tabs[number];
const islandIndex: Record<IslandTab, number> = { Trash: 0, Rando: 1, Crystal: 2, Shimmer: 4, Fractal: 5 };
const itemDetails = Object.fromEntries(initItemDetailRepo().map(item => [item.id, item.data]));
const bottlesImage = Item.getImageData('Island1');
const garbageImage = { location: 'Island0_x1', width: 36, height: 36 };

function CollectionSummary({ expeditions }: { expeditions: IslandExpeditions }) {
    const collectorName = expeditions.collection.selectedPlayerName;
    const completed = expeditions.collection.selectedCompletedOmarQuests;
    return <Box direction="row" align="center" gap="medium" wrap pad={{ vertical: 'small' }} data-testid="island-summary">
        <Box gap="small" pad={{ right: 'medium' }}>
            <Text size="small">Message Bottles</Text>
            <Box direction="row" align="center" gap="medium" wrap>
                <Box gap="xxsmall">
                    <IslandResourceAmount image={bottlesImage} amount={expeditions.bottles} textSize="xxlarge" />
                    <Text size="xsmall" color="accent-2">Balance</Text>
                </Box>
                <Box gap="xxsmall">
                    {collectorName ? <TipDisplay heading="Bottle collection character" maxWidth="360px" body={<Text size="small">
                        Collect with {collectorName} for this rate. Their {completed}/6 completed Omar quests increase Bottle gain.
                    </Text>}>
                        <Box tabIndex={0} aria-label="Bottle collection character" style={{ cursor: 'help' }}>
                            <Text size="large">{commaNotation(expeditions.collection.bottlesPerDay)}</Text>
                            <Text size="xsmall" color="accent-2">Bottles/day</Text>
                        </Box>
                    </TipDisplay> : <Box>
                        <Text size="large">{commaNotation(expeditions.collection.bottlesPerDay)}</Text>
                        <Text size="xsmall" color="accent-2">Bottles/day</Text>
                    </Box>}
                </Box>
                <Box gap="xxsmall">
                    <Text size="large">{commaNotation(expeditions.collection.unclaimedDays)}</Text>
                    <Text size="xsmall" color="accent-2">Pending Bottle days</Text>
                </Box>
            </Box>
        </Box>
        <Box gap="small" pad={{ left: 'medium' }} border={{ side: 'left', color: 'grey-1' }}>
            <Text size="small">Garbage</Text>
            <Box gap="xxsmall">
                <IslandResourceAmount image={garbageImage} amount={expeditions.trash.garbage} textSize="xxlarge" />
                <Text size="xsmall" color="accent-2">Balance</Text>
            </Box>
        </Box>
        <Box gap="small" pad={{ left: 'medium' }} border={{ side: 'left', color: 'grey-1' }}>
            <Text size="small">Islands</Text>
            <Box gap="xxsmall">
                <Text size="large">{expeditions.unlockedIslandCount}/6</Text>
                <Text size="xsmall" color="accent-2">Islands</Text>
            </Box>
        </Box>
    </Box>;
}

function hasObtainedReward(evidence: IslandRewardPossession): boolean {
    return evidence.held.length > 0 || evidence.deposited !== undefined || evidence.learnedBy.length > 0
        || evidence.equippedBy.length > 0 || evidence.slabRegistered === true;
}

function PossessionEvidence({ evidence }: { evidence: IslandRewardPossession }) {
    if (!hasObtainedReward(evidence)) {
        return null;
    }
    return <Box gap="xsmall">
        <Text size="small" weight="bold">Obtained</Text>
        {evidence.deposited && <Text size="xsmall" color="accent-2">Deposited</Text>}
        {evidence.learnedBy.length > 0 && <TipDisplay heading="Learned by" body={<Box gap="xsmall">
            {evidence.learnedBy.map(character => <Text key={character.playerID} size="small">{character.playerName}</Text>)}
        </Box>}>
            <Text size="xsmall" color="accent-2" tabIndex={0} style={{ cursor: 'help' }}>Talent learned</Text>
        </TipDisplay>}
        {evidence.held.length > 0 && <Text size="xsmall" color="accent-2">Held in inventory or storage</Text>}
        {evidence.equippedBy.length > 0 && <Text size="xsmall" color="accent-2">Equipped</Text>}
        {!evidence.deposited && evidence.held.length === 0 && evidence.equippedBy.length === 0 && evidence.slabRegistered
            && <Text size="xsmall" color="accent-2">Registered in Slab</Text>}
    </Box>;
}

function TrashDetails({ expeditions }: { expeditions: IslandExpeditions }) {
    const trash = expeditions.trash;
    return <Box gap="medium" data-testid="island-trash">
        <TextAndLabel label="Pending Garbage days" text={commaNotation(trash.unclaimedDays)} textSize="large" />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium" align="stretch">
            {trash.rewards.map(reward => {
                const itemId = reward.data.itemId;
                const evidence = trash.rewardPossession.get(reward.index);
                const completed = evidence ? hasObtainedReward(evidence) : reward.index === 5 && trash.bribeSetUnlocked;
                let name: string;
                if (itemId) {
                    name = evidence?.book ? `${evidence.book.talentName} ${itemDetails[itemId].displayName}` : itemDetails[itemId].displayName;
                } else if (reward.index === 4) {
                    name = 'Garbage gain';
                } else if (reward.index === 6) {
                    name = 'Message Bottle gain';
                } else {
                    name = 'Unlock next bribe set';
                }
                return <RewardCard key={reward.index} name={name} itemId={itemId} completed={completed} testId={`island-trash-reward-${reward.index}`}>
                    {reward.index === 4 && <>
                        <Text size="xsmall" color="accent-2">Level {trash.garbageGainLevel}</Text>
                        <EffectPreview current={`+${trash.garbageGainPercent}%`} next={`+${trash.getGarbageGainPercent(trash.garbageGainLevel + 1)}%`} />
                    </>}
                    {reward.index === 6 && <>
                        <Text size="xsmall" color="accent-2">Level {trash.bottleGainLevel}</Text>
                        <EffectPreview current={`+${trash.bottleGainPercent}%`} next={`+${trash.getBottleGainPercent(trash.bottleGainLevel + 1)}%`} />
                    </>}
                    {reward.index === 5 && trash.bribeSetUnlocked && <Text size="small" weight="bold">Completed</Text>}
                    {evidence && <PossessionEvidence evidence={evidence} />}
                    {!completed && <IslandCost label={reward.data.costGrowth === undefined ? 'Cost' : 'Next cost'} image={garbageImage} amount={trash.getNextCost(reward.index)} />}
                </RewardCard>;
            })}
        </Grid>
    </Box>;
}

function RandoDetails({ expeditions }: { expeditions: IslandExpeditions }) {
    const rando = expeditions.rando;
    return <Box gap="medium" data-testid="island-rando">
        <TextAndLabel label="Weekly event" text={rando.eventUsedThisWeek ? 'Used' : 'Available'} />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium" align="stretch">
            {rando.rewards.map(reward => {
                const itemId = reward.data.itemId;
                const evidence = rando.rewardPossession.get(reward.index);
                const completed = evidence ? hasObtainedReward(evidence) : false;
                const name = itemId
                    ? (evidence?.book ? `${evidence.book.talentName} ${itemDetails[itemId].displayName}` : itemDetails[itemId].displayName)
                    : reward.index === 0 ? 'Random-event loot' : 'Rando Island double-boss chance';
                return <RewardCard key={reward.index} name={name} itemId={itemId} completed={completed} testId={`island-rando-reward-${reward.index}`}>
                    {reward.index === 0 && <>
                        <Text size="xsmall" color="accent-2">Level {rando.lootLevel}</Text>
                        <EffectPreview current={`+${rando.lootUpgradePercent}%`} next={`+${rando.getLootUpgradePercent(rando.lootLevel + 1)}%`} />
                    </>}
                    {reward.index === 1 && <>
                        <Text size="xsmall" color="accent-2">Level {rando.doubleBossLevel}</Text>
                        <EffectPreview current={`${rando.islandDoubleBossChancePercent}%`} next={`${rando.getIslandDoubleBossChancePercent(rando.doubleBossLevel + 1)}%`} />
                    </>}
                    {evidence && <PossessionEvidence evidence={evidence} />}
                    {!completed && <IslandCost label="Price" image={bottlesImage} amount={rando.getRefreshedCost(reward.index)} />}
                </RewardCard>;
            })}
        </Grid>
    </Box>;
}

export default function IslandExpeditionsContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const [tab, setTab] = useState<IslandTab>('Trash');
    const expeditions = theData.get('islandExpeditions') as IslandExpeditions | undefined;
    if (!hydrated || !expeditions) return <>Loading Island Expeditions data</>;
    const island = expeditions.islands[islandIndex[tab]];

    return <Box gap="medium" data-testid="island-expeditions">
        <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>Island Expeditions</Heading>
        <CollectionSummary expeditions={expeditions} />
        <ContentTabs options={tabs.map(value => ({ value, label: value }))} value={tab} onChange={setTab} />
        <Box gap="medium" style={{ opacity: island.unlocked ? 1 : 0.5 }}>
            <Box gap="small" data-testid="island-access">
                <Box direction="row" align="center" gap="medium" wrap>
                    <Text weight="bold">{tab} Island</Text>
                    {island.nextUnlockCost !== undefined && <IslandCost label="Unlock cost" image={bottlesImage} amount={island.nextUnlockCost} />}
                </Box>
                <Text size="small" color="accent-2">{island.data.description.replace(/_/g, ' ')}</Text>
            </Box>
            {tab === 'Trash' && <TrashDetails expeditions={expeditions} />}
            {tab === 'Rando' && <RandoDetails expeditions={expeditions} />}
            {tab === 'Crystal' && <CrystalDetails expeditions={expeditions} />}
            {tab === 'Shimmer' && <ShimmerDetails expeditions={expeditions} />}
            {tab === 'Fractal' && <FractalDetails expeditions={expeditions} />}
        </Box>
    </Box>;
}
