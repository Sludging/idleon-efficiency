'use client';

import { useContext, useMemo, useState } from 'react';
import { Anchor, Box, Grid, Heading, Meter, ResponsiveContext, Text } from 'grommet';
import { Checkmark, CircleInformation } from 'grommet-icons';
import { useTime } from 'react-timer-hook';
import { useShallow } from 'zustand/react/shallow';
import ContentTabs from '../../../components/base/ContentTabs';
import DataRow, { type DataRowField } from '../../../components/base/DataRow';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import type { Account } from '../../../data/domain/account';
import type { ImageData } from '../../../data/domain/imageData';
import { Item } from '../../../data/domain/items';
import { WeeklyShopSectionEnum } from '../../../data/domain/enum/weeklyShopSectionEnum';
import type { WeeklyBoss, WeeklyBossPreparedCharacter, WeeklyBossPreparation, WeeklyBossShopReward } from '../../../data/domain/weekly-boss';
import { commaNotation, notateNumber, toTime } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

const strategyGuideUrl = 'https://docs.google.com/spreadsheets/d/1z1P2ouvYhe2pryWoF0kIQE7QichYpJt1GaPPos-e-aw/edit?gid=0#gid=0';
const weeklyDateFormat = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});
const preparationTabs = [
    { value: 'Preparation', label: 'Preparation' },
    { value: 'Weekly shop', label: 'Weekly shop' },
] as const;

const bossImages: readonly ImageData[] = [
    { location: 'WeeklyBoss0', width: 31, height: 75 },
    { location: 'WeeklyBoss1', width: 70, height: 66 },
    { location: 'WeeklyBoss2', width: 63, height: 46 },
    { location: 'WeeklyBoss3', width: 78, height: 55 },
    { location: 'WeeklyBoss4', width: 64, height: 66 },
    { location: 'WeeklyBoss5', width: 45, height: 74 },
    { location: 'WeeklyBoss6', width: 91, height: 53 },
    { location: 'WeeklyBoss7', width: 32, height: 69 },
    { location: 'WeeklyBoss8', width: 42, height: 46 },
];
const trophyImage: ImageData = { location: 'WeeklyBossTrophy', width: 23, height: 21 };

const appearanceImages: Readonly<Record<string, ImageData>> = {
    UImain_a: { location: 'UImain_a', width: 960, height: 66 },
    UImain_b: { location: 'UImain_b', width: 960, height: 66 },
    UImain_c: { location: 'UImain_c', width: 960, height: 66 },
    UImain_d: { location: 'UImain_d', width: 960, height: 66 },
    UImain_e: { location: 'UImain_e', width: 960, height: 66 },
    UImain_f: { location: 'UImain_f', width: 960, height: 66 },
    UImain_g: { location: 'UImain_g', width: 960, height: 66 },
    UImain_h: { location: 'UImain_h', width: 960, height: 66 },
    UImain_i: { location: 'UImain_i', width: 960, height: 66 },
    UImain_j: { location: 'UImain_j', width: 960, height: 66 },
    UImain_k: { location: 'UImain_k', width: 960, height: 66 },
    UImain_l: { location: 'UImain_l', width: 960, height: 66 },
};

function getRequirementLabel(requirement: string): string {
    return requirement
        .replace(/^\{\s*Digits of /, '')
        .replace(/ LV of$/, ' level')
        .replace(/ Kills$/, ' kills')
        .replace(/^Material Carry Cap of$/, 'Material carry capacity')
        .replace(/ of$/, '');
}

function SavedStat({ character, requirement }: { character: WeeklyBossPreparedCharacter; requirement: string }) {
    if (character.rawValue === undefined) {
        return <Text size="small" color="accent-2">Saved stat unavailable</Text>;
    }

    const killRequirement = requirement.includes('Digits of');
    const unit = killRequirement ? ' kills' : requirement.includes('LV') ? ' levels' : ' items';
    const value = killRequirement ? notateNumber(character.rawValue) : commaNotation(character.rawValue);

    return <Box gap="xxsmall" style={{ minWidth: 0 }}>
        <Text size="small" style={{ overflowWrap: 'anywhere', fontVariantNumeric: 'tabular-nums' }}>{value}{unit}</Text>
        {killRequirement && <Text size="xsmall" color="accent-2">
            Kill digits: {character.quantity === undefined ? 'Unavailable' : commaNotation(character.quantity)}
        </Text>}
    </Box>;
}

function PowerMeter({ power }: { power: number | undefined }) {
    if (power === undefined) {
        return <Text size="small" color="accent-2">Unavailable</Text>;
    }

    const percentage = power >= 0.9999 ? '>99.99%' : `${Math.round(power * 10000) / 100}%`;
    return <Box gap="xsmall">
        <Text size="small" style={{ fontVariantNumeric: 'tabular-nums' }}>{percentage}</Text>
        <Meter type="bar" size="full" thickness="4px" background="grey-1" max={1}
            values={[{ value: power, color: 'brand' }]} aria-label="Power" />
    </Box>;
}

function PowerHelp({ weeklyBoss, taskId, requirement }: { weeklyBoss: WeeklyBoss; taskId: number; requirement: string }) {
    const killRequirement = requirement.includes('Digits of');
    const unit = killRequirement ? 'kill digits' : requirement.includes('LV') ? 'levels' : 'items';
    const threshold = weeklyBoss.tasks[taskId].data.reqFor50;

    return <TipDisplay heading="Diminishing returns" maxWidth="medium" body={<Box gap="small">
        <Text size="small">Power = {killRequirement ? 'kill digits' : 'stat'} ÷ ({killRequirement ? 'kill digits' : 'stat'} + {commaNotation(threshold)}).</Text>
        <Box gap="xxsmall">
            {weeklyBoss.getTaskPowerReferences(taskId).map(reference => <Text size="small" key={reference.power}>
                {reference.power * 100}% power at {commaNotation(reference.quantity)} {unit}
            </Text>)}
        </Box>
        <Text size="small">Each further gain adds less power. Power approaches 100% without a finite stat cap.</Text>
        {killRequirement && <Text size="small">Kill digits are not the number of decimal digits. At 0 or 1 kill, the value is 0. Cross the next digit boundary to gain power.</Text>}
    </Box>}>
        <Box direction="row" align="center" gap="xsmall" tabIndex={0} aria-label="Diminishing returns help">
            <Text size="xsmall" color="accent-2">Diminishing returns</Text>
            <CircleInformation size="small" />
        </Box>
    </TipDisplay>;
}

function RequirementGroups({ weeklyBoss, preparation }: {
    weeklyBoss: WeeklyBoss;
    preparation: WeeklyBossPreparation;
}) {
    const size = useContext(ResponsiveContext);
    const columns = size === 'small' ? ['minmax(0, 1fr)']
        : ['minmax(0, 1.4fr)', 'minmax(0, 1fr)', 'minmax(150px, 1fr)'];

    return <Box gap="medium">
        <Text size="small" color="accent-2">Higher stats give more power, with smaller gains as they rise. Power is not a win chance.</Text>
        {preparation.groups.map(group => {
            const task = weeklyBoss.tasks[group.taskId].data;
            const label = getRequirementLabel(task.requirement);

            return <Box key={group.taskId} as="section" aria-label={label} style={{ minWidth: 0 }}>
                <Box direction="row" wrap align="center" justify="between" gap="small" background="grey-1"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                    style={{ position: 'relative', zIndex: 1, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.18)' }}>
                    <Heading level="3" size="small" margin="none"><Text size="small" weight="bold">{label}</Text></Heading>
                    <PowerHelp weeklyBoss={weeklyBoss} taskId={group.taskId} requirement={task.requirement} />
                </Box>
                <Box background="dark-1" pad="small" gap="small" style={{ minWidth: 0 }}>
                    {group.characters.map(character => {
                        const fields: DataRowField[] = [
                            {
                                key: 'character', kind: 'identity', name: `${character.playerName} (slot ${character.playerIndex + 1})`,
                                artwork: <IconImage data={character.classImageData} scale={0.8} />,
                            },
                            { key: 'saved-stat', kind: 'content', label: 'Current stat', content: <SavedStat character={character} requirement={task.requirement} /> },
                            { key: 'power', kind: 'content', label: 'Power', content: <PowerMeter power={character.power} /> },
                        ];

                        return <DataRow key={character.playerIndex} columns={columns} fields={fields} />;
                    })}
                </Box>
            </Box>;
        })}
    </Box>;
}

function OfferArtwork({ intName, appearance, name }: { intName: string; appearance: boolean; name: string }) {
    if (appearance) {
        const image = appearanceImages[intName];
        if (!image) return null;
        // The native preview uses the first 321 pixels of the full UI texture.
        return <Box width="160.5px" height="33px" overflow="hidden" flex={false} aria-label={`${name} preview`}>
            <Box flex={false}><IconImage data={image} scale={0.5} /></Box>
        </Box>;
    }

    return <IconImage data={Item.getImageData(intName)} />;
}

function CharacterRewards({ weeklyBoss, entryId }: { weeklyBoss: WeeklyBoss; entryId: number }) {
    const rewards = weeklyBoss.getShopRewards(entryId);
    const groups = new Map<string, { itemId: string; itemName: string; quantity: number; characters: WeeklyBossShopReward[] }>();
    for (const reward of rewards) {
        const key = `${reward.itemId}:${reward.quantity}`;
        let group = groups.get(key);
        if (!group) {
            group = { itemId: reward.itemId, itemName: reward.itemName, quantity: reward.quantity, characters: [] };
            groups.set(key, group);
        }
        group.characters.push(reward);
    }
    const unknownCharacters = weeklyBoss.getShopCharacters().filter(character => !rewards.some(reward => reward.playerIndex === character.playerIndex));
    const rewardHelp = weeklyBoss.shopEntries[entryId].data.intName === 'EquipmentStatues' ? 'Which statue?' : 'Which food?';

    return <Box gap="small">
        {Array.from(groups, ([key, reward]) => <Box key={key} direction="row" align="center" gap="small">
            <IconImage data={Item.getImageData(reward.itemId)} />
            <Text size="small">{commaNotation(reward.quantity)} {reward.itemName}{reward.itemName.endsWith(' Statue') ? 's' : ''} per purchase</Text>
        </Box>)}
        {groups.size > 1 && <TipDisplay heading={rewardHelp} maxWidth="medium" body={<Box gap="xxsmall">
            {Array.from(groups.values()).flatMap(reward => reward.characters.map(character => <Text size="small" key={character.playerIndex}>
                {character.playerName} → {commaNotation(reward.quantity)} {reward.itemName}
            </Text>))}
            {unknownCharacters.map(character => <Text size="small" key={character.playerIndex}>{character.playerName} → Unknown reward</Text>)}
        </Box>}>
            <Box direction="row" align="center" gap="xsmall" tabIndex={0} aria-label={rewardHelp}>
                <Text size="xsmall" color="accent-2">{rewardHelp}</Text>
                <CircleInformation size="small" />
            </Box>
        </TipDisplay>}
        {unknownCharacters.length > 0 && <Text size="xsmall" color="accent-2">Unknown reward for {unknownCharacters.length} {unknownCharacters.length === 1 ? 'character' : 'characters'}</Text>}
        <Text size="xsmall" color="accent-2">Only the buying character receives these items.</Text>
        <Text size="xsmall" color="accent-2">Repeatable with shared Trophies and an empty inventory slot.</Text>
    </Box>;
}

function WeeklyShop({ weeklyBoss, preparation }: {
    weeklyBoss: WeeklyBoss;
    preparation: WeeklyBossPreparation;
}) {
    const size = useContext(ResponsiveContext);

    return <Grid columns={size === 'small' ? ['minmax(0, 1fr)'] : size === 'medium'
        ? ['minmax(0, 1fr)', 'minmax(0, 1fr)']
        : ['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']}
        gap="small" fill="horizontal" aria-label="This week's shop">
        {preparation.week.shopEntryIds.map(entryId => {
            const offer = weeklyBoss.shopEntries[entryId].data;
            const name = offer.name.replace(/_/g, ' ');
            const appearance = offer.section === WeeklyShopSectionEnum.UI;
            const owned = appearance ? weeklyBoss.isUIOwned(entryId) : undefined;
            const deposited = weeklyBoss.getShopHatDeposited(entryId);
            const generic = offer.intName === 'EquipmentStatues' || offer.intName === 'FoodG';
            const collected = owned === true || deposited === true;

            return <ShadowBox key={entryId} background="dark-1" pad="medium" gap="small"
                style={{ minWidth: 0, opacity: collected ? 0.6 : 1 }}>
                {!generic && <OfferArtwork intName={offer.intName} appearance={appearance} name={name} />}
                <Text size="small" weight="bold">{name}</Text>
                <ComponentAndLabel label="Cost" labelSize="xsmall" component={<Box direction="row" align="center" gap="xsmall">
                    <IconImage data={trophyImage} />
                    <Text size="small">{commaNotation(offer.cost)}</Text>
                </Box>} />
                {generic ? <CharacterRewards weeklyBoss={weeklyBoss} entryId={entryId} />
                    : !appearance && <Text size="xsmall" color="accent-2">{offer.desc.replace(/_/g, ' ')}</Text>}
                {collected && <Box direction="row" align="center" gap="xsmall">
                    <Checkmark size="small" aria-label={appearance ? 'Appearance collected' : 'Deposited in Hat Rack'} />
                    <Text size="xsmall">{appearance ? 'Appearance collected' : 'Deposited in Hat Rack'}</Text>
                </Box>}
                {appearance && owned === undefined && <Text size="xsmall" color="accent-2">Appearance ownership unavailable</Text>}
                {deposited === false && <Text size="xsmall" color="accent-2">Not deposited in Hat Rack</Text>}
            </ShadowBox>;
        })}
    </Grid>;
}

export default function WeeklyBossesContent() {
    const hydrated = useHydrated();
    const [tab, setTab] = useState<'Preparation' | 'Weekly shop'>('Preparation');
    useTime();
    const { theData, lastUpdated } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const account = theData.get('account') as Account | undefined;
    const weeklyBoss = account?.weeklyBoss;
    const preparation = useMemo(() => weeklyBoss ? weeklyBoss.getPreparation() : undefined,
        [weeklyBoss, lastUpdated]);

    if (!hydrated || !weeklyBoss || !preparation) return <>Loading...</>;

    const week = preparation.week;
    const boss = weeklyBoss.bosses[week.bossId].data;
    const nowSeconds = Math.floor(Date.now() / 1000);
    const secondsRemaining = Math.max(0, week.endsAtSeconds - nowSeconds);
    const dateRange = `${weeklyDateFormat.format(new Date(week.startsAtSeconds * 1000))} – ${weeklyDateFormat.format(new Date(week.endsAtSeconds * 1000))} UTC`;
    const recommendedCharacter = preparation.capacityRecommendation;

    return <Box gap="medium" style={{ minWidth: 0 }}>
        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Weekly Bosses</Heading>
        <Box direction="row" wrap align="center" gap="medium" style={{ minWidth: 0 }}>
            <IconImage data={bossImages[week.bossId]} />
            <Box gap="xxsmall" style={{ minWidth: 0 }}>
                <Text size="large">{boss.name.replace(/_/g, ' ')}</Text>
                <Text size="small" color="accent-2">{dateRange}</Text>
                <Anchor href={strategyGuideUrl} target="_blank" rel="noopener noreferrer" size="small">Weekly Boss Rotations by DiamondDoge</Anchor>
            </Box>
            <TextAndLabel label="Weekly reset in" labelSize="xsmall" textSize="small" text={toTime(secondsRemaining, true)} />
            <ComponentAndLabel label="Balance" labelSize="xsmall" component={<Box direction="row" align="center" gap="xsmall">
                <IconImage data={trophyImage} />
                <Text size="large">{commaNotation(weeklyBoss.trophies)} Trophies</Text>
            </Box>} />
        </Box>
        {secondsRemaining === 0 && <Text size="small" color="accent-2">
            This saved week has ended. Load a newer save to see its current weekly assignments.
        </Text>}
        <Box gap="medium">
            <ContentTabs options={preparationTabs} value={tab} onChange={setTab} />
            {tab === 'Preparation' ? <Box gap="medium">
                {recommendedCharacter && <Box gap="xsmall">
                    <Text size="small">Recommended character to log in for material-capacity turns: {recommendedCharacter.playerName} (slot {recommendedCharacter.playerIndex + 1}).</Text>
                    <Text size="xsmall" color="accent-2">Capacity uses this character's saved equipment, signs, prayers, talents, and map. This does not change character order.</Text>
                </Box>}
                <RequirementGroups weeklyBoss={weeklyBoss} preparation={preparation} />
            </Box> : <WeeklyShop weeklyBoss={weeklyBoss} preparation={preparation} />}
        </Box>
    </Box>;
}
