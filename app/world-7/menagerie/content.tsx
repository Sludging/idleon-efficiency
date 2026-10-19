'use client';
import { CircleInformation } from 'grommet-icons';
import { Box, DataTable, Grid, Heading, Meter, ResponsiveContext, Select, Text, ThemeContext } from 'grommet';
import type { DataTableProps, ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { useContext, useState } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { Menagerie as MenagerieDomain, MenagerieBonus, MenagerieMission } from '../../../data/domain/menagerie';
import { ImageData } from '../../../data/domain/imageData';
import { DataStatus } from '../../../lib/stores/appDataStore';
import { commaNotation, getCoinsArray, notateNumber } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import TipDisplay from 'components/base/TipDisplay';
import CoinsDisplay from '../../../components/coinsDisplay';
import { ResourceDisplay } from '../../../components/account/shared/ResourceDisplay';
import { Item } from '../../../data/domain/items';
import { initItemDetailRepo } from '../../../data/domain/data/ItemDetailRepo';

const itemDetails: Record<string, { displayName: string }> = Object.fromEntries(initItemDetailRepo().map(item => [item.id, item.data]));
type MenagerieTab = 'Missions' | 'Unlocks' | 'Bonuses' | 'Jellies';
type MissionFilter = 'All' | 'Available' | 'Ready';

const templateText = (text: string, value: number): string =>
    text.replace(/[{}]/g, commaNotation(value)).replace(/膛/g, '').trim();

const bonusEffectText = (bonus: MenagerieBonus, effect: number): string => {
    const description = bonus.data.description;
    const placeholder = description.includes('}') ? '}' : '{';
    const prefix = description.includes(`+${placeholder}`) ? '+' : '';
    const unit = description.match(/[{}](%|x| sec\b)/)?.[1] ?? '';
    return `${prefix}${notateNumber(bonus.getDescriptionEffect(effect, placeholder), 'Small')}${unit}`;
};

const sourceDescription = (text: string): string =>
    text.replace(/,\s*1 in \$ chance/, '').replace(/[{}$]/g, '').replace(/膛/g, '').trim();
const jellyfishHelp: Record<string, string> = {
    Purple: 'Spend Money to buy Shells. Lumi upgrades increase the hourly Lumi bonus.',
    Blue: 'Donate Ladles to add to the total that boosts cooking at each daily reset.',
    Red: 'Red remembers Spelunking pages you use after unlocking it. It can reread those chapters to improve random Lore bonuses. Resting builds reading opportunities; reading uses all of them.',
    Silver: 'The MISC upgrade multiplies Obol bonuses in the MISC category. Once unlocked, Silver can recycle eligible non-Hyper drops into fragments when your Obol inventory is full. Upgrade it to improve how many fragments you can gain.',
    Yellow: 'Construction progress unlocks upgrades. Each upgrade adds its shown bonus.',
    Green: 'Turn in the required nametags to the Spelunking Gallery to earn the reward.',
};

function JellyfishHelp({ color, body }: { color: string, body?: string }) {
    return <TipDisplay heading={`${color} Jellyfish help`} body={body ?? jellyfishHelp[color]} maxWidth="300px">
        <Box tabIndex={0} aria-label={`${color} Jellyfish help`} style={{ cursor: 'help' }}>
            <CircleInformation size="small" />
        </Box>
    </TipDisplay>;
}
const formatValue = (value: number): string => notateNumber(value, 'Big');

type MissionRow = { id: number, mission: MenagerieMission };

const missionColumns: NonNullable<DataTableProps<MissionRow>['columns']> = [
    {
        property: 'mission',
        header: 'Mission / current goal',
        size: '300px',
        render: ({ mission }: MissionRow) => {
            return <Box direction="row" gap="small" align="center" style={{ minWidth: '270px', opacity: mission.available ? 1 : 0.5 }}>
                <Artwork data={mission.getImageData()} size={34} />
                <Box gap="xsmall">
                    <Text size="xsmall" weight="bold">{mission.data.label}</Text>
                    <Text size="xsmall">{templateText(mission.data.description, mission.currentRequirement)}</Text>
                </Box>
            </Box>;
        },
    },
    {
        property: 'progress',
        header: 'Progress / to-go',
        size: '210px',
        render: ({ mission }: MissionRow) => <Box gap="xsmall" style={{ minWidth: '180px', opacity: mission.available ? 1 : 0.5 }}>
            <Text size="xsmall">{commaNotation(mission.progress)} / {commaNotation(mission.currentRequirement)}</Text>
            <Meter
                type="bar"
                values={[{ value: Math.min(mission.progress, mission.currentRequirement), color: 'brand' }]}
                max={mission.currentRequirement || 1}
                size="full"
                thickness="xsmall"
                aria-label={`${mission.data.label} progress`}
            />
            <Text size="xsmall" color="accent-2">{commaNotation(mission.remainingProgress)} to go</Text>
        </Box>,
    },
    {
        property: 'claims',
        header: 'Current task',
        size: '150px',
        render: ({ mission }: MissionRow) => <Box gap="xsmall" style={{ minWidth: '125px', opacity: mission.available ? 1 : 0.5 }}>
            <Text size="xsmall" color="accent-2">{commaNotation(mission.claimCount + 1)}</Text>
        </Box>,
    },
    {
        property: 'upcoming',
        header: 'Next goals',
        size: '190px',
        render: ({ mission }: MissionRow) => <Box gap="xsmall" style={{ minWidth: '160px', opacity: mission.available ? 1 : 0.5 }}>
            <Text size="xsmall">Next: {commaNotation(mission.nextRequirement)}</Text>
            <Text size="xsmall" color="accent-2">Each goal +{commaNotation(mission.data.requirementIncrement)}</Text>
        </Box>,
    },
];

export default function MenagerieContent() {
    const small = useContext(ResponsiveContext) === 'small';
    const { theData, dataStatus } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        dataStatus: state.dataStatus,
        lastUpdated: state.lastUpdated,
    })));
    const [tab, setTab] = useState<MenagerieTab>('Missions');
    const [missionFilter, setMissionFilter] = useState<MissionFilter>('All');
    const menagerie = theData.get('menagerie') as MenagerieDomain | undefined;
    if ([DataStatus.Init, DataStatus.Loading].includes(dataStatus)) return <>Loading Menagerie data</>;
    if ([DataStatus.NoData, DataStatus.MissingData].includes(dataStatus)) return <>Menagerie account data is unavailable.</>;
    if (!menagerie) return <>Menagerie data is unavailable.</>;

    const progression = menagerie.getProgression();
    const availability = menagerie.getMissionAvailability();
    const missions = menagerie.getMissions();
    const unlocks = menagerie.getUnlocks();
    const bonuses = menagerie.getBonuses();
    const resources = menagerie.getResourceBalances();
    const readyCount = missions.filter(mission => mission.ready).length;
    const shellProgress = Math.min(progression.shells, progression.shellThreshold);

    const visibleMissions = missions.filter(mission => {
        if (missionFilter === 'Available') return mission.available;
        if (missionFilter === 'Ready') return mission.ready;
        return true;
    });

    return (
        <Box gap="large">
            <Box gap="medium">
                <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>
                    Menagerie
                </Heading>
                <Box gap="small">
                    <Grid columns={{ count: 3, size: 'auto' }} gap="medium">
                        <SummaryGroup label="Lumi">
                            <Box direction="row" gap="small" align="center">
                                <Box style={{ top: '-10px', position: 'relative' }}>
                                    <IconImage data={menagerie.getLumiImageData()} scale={1.5} />
                                </Box>
                                <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline', minWidth: 0 }}>
                                    <Box>
                                        <Text weight="normal" style={{ fontSize: '40px', lineHeight: '44px' }}>{notateNumber(progression.lumi, 'Big')}</Text>
                                        <Text size="xsmall" color="accent-2">Balance</Text>
                                    </Box>
                                    <Text color="status-ok" weight="normal" style={{ fontSize: '22px', lineHeight: '28px' }}>{notateNumber(progression.lumiPerHour, 'Big')} / hour</Text>
                                </Box>
                            </Box>
                        </SummaryGroup>
                        <SummaryGroup label="Lumi rank" separated>
                            <Box direction="row" gap="small" align="center">
                                <IconImage data={menagerie.getShellImageData()} scale={0.75} />
                                <Text weight="normal" style={{ fontSize: '40px', lineHeight: '44px' }}>{commaNotation(progression.rank)}</Text>
                            </Box>
                            <Text size="small">Shells: {commaNotation(progression.shells)} / {commaNotation(progression.shellThreshold)}</Text>
                            <Meter
                                type="bar"
                                values={[{ value: shellProgress, color: 'brand' }]}
                                max={progression.shellThreshold}
                                size="full"
                                thickness="xsmall"
                                aria-label="Shell progress toward next rank"
                            />
                        </SummaryGroup>
                        <SummaryGroup label="Missions" separated>
                            <Box data-testid="mission-availability-summary" gap="small">
                                <TipDisplay heading="Unlock more missions" body={
                                    <Box gap="xsmall">
                                        <Text size="small">Available missions come from the mission limit and these account contributors:</Text>
                                        <Text size="small">Baseline: {commaNotation(availability.baseline)}</Text>
                                        <Text size="small">Menagerie bonus: {commaNotation(availability.menagerieBonus)}</Text>
                                        <Text size="small">Research: {commaNotation(availability.researchBonus)}</Text>
                                        <Text size="small">Jade Emporium: {commaNotation(availability.jadeEmporium)}</Text>
                                        <Text size="small">Bank bundle: {commaNotation(availability.bankBundle)}</Text>
                                        <Text size="small">Mission catalogue: {commaNotation(availability.missionLimit)}</Text>
                                    </Box>
                                }>
                                    <Text size="large" weight="normal" style={{textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>{menagerie.availableMissionCount} / {availability.missionLimit}</Text>
                                </TipDisplay>
                                <TextAndLabel label="Missions ready" text={String(readyCount)} textSize="small" tooltip="Ready missions meet the current account-stat requirement. Claim each mission in game to receive one Shell." />
                                
                            </Box>
                        </SummaryGroup>
                    </Grid>
                </Box>

                <Box gap="medium">
                    <ContentTabs<MenagerieTab>
                        options={[
                            { value: 'Missions', label: 'Missions' },
                            { value: 'Unlocks', label: 'Unlocks' },
                            { value: 'Bonuses', label: 'Bonuses' },
                            { value: 'Jellies', label: 'Jellies' },
                        ]}
                        value={tab}
                        onChange={setTab}
                    />

                    {tab === 'Missions' && <Box gap="medium">
                        <Box direction="row" align="center" justify="end" gap="small">
                            <Select
                                aria-label="Filter missions"
                                options={['All', 'Available', 'Ready']}
                                value={missionFilter}
                                onChange={({ option }) => {
                                    if (option === 'All' || option === 'Available' || option === 'Ready') {
                                        setMissionFilter(option);
                                    }
                                }}
                            />
                        </Box>
                        <Box style={{ overflowX: 'auto' }}>
                            <RoundedShadowBox background="dark-1" pad="none" gap="none" width="100%" style={{ overflow: 'hidden' }}>
                                <ThemeContext.Extend value={{
                                    dataTable: {
                                        body: {
                                            extend: ({ theme }: { theme: ThemeType }) => `
                                                tbody td {
                                                    border-bottom: 1px solid ${normalizeColor('grey-1', theme)};
                                                    padding: 10px 12px;
                                                }
                                            `,
                                        },
                                        header: {
                                            border: { color: 'grey-1', side: 'bottom', size: 'xsmall' },
                                            font: { size: '14px', weight: '400' },
                                            pad: { horizontal: 'small', vertical: 'small' },
                                        },
                                    },
                                }}>
                                    <DataTable
                                        aria-label="Menagerie missions"
                                        columns={missionColumns}
                                        data={visibleMissions.map(mission => ({ id: mission.index, mission }))}
                                        primaryKey="id"
                                        sortable={false}
                                        step={visibleMissions.length || 1}
                                        style={{ minWidth: '920px' }}
                                    />
                                </ThemeContext.Extend>
                            </RoundedShadowBox>
                        </Box>
                    </Box>}

                    {tab === 'Unlocks' && <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
                        {unlocks.map(unlock => <RoundedShadowBox key={unlock.index} pad="none" background="dark-1" overflow="hidden" style={{ opacity: unlock.owned ? 1 : unlock.available ? 0.8 : 0.5 }}>
                            <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                                <Artwork data={unlock.getImageData()} size={40} />
                                <Text size="small" weight="bold">{sourceDescription(unlock.data.description)}</Text>
                            </Box>
                            <Box pad="medium" gap="small" justify="between" fill>
                                <Box>
                                    {unlock.data.tooltip && <Text size="small">{sourceDescription(unlock.data.tooltip)}</Text>}
                                </Box>
                                {!unlock.owned && <Box direction="row" wrap gap="small" align="center">
                                    <Text size="small" color="accent-2">Cost</Text>
                                    <IconImage data={menagerie.getLumiImageData()} scale={1} />
                                    <Text size="small" color={unlock.affordable ? 'green-1' : 'status-critical'}>{formatValue(unlock.nextCost)}</Text>
                                    {!unlock.available && <Text size="small" color="accent-2">Req. rank {unlock.requiredRank}</Text>}
                                </Box>}
                            </Box>
                        </RoundedShadowBox>)}
                    </Grid>}

                    {tab === 'Bonuses' && <Box gap="medium">
                        <Box border={[{ side: 'top', color: 'grey-1' }, { side: 'bottom', color: 'grey-1' }]} pad={{ vertical: 'small' }} direction="row" wrap gap="medium" align="center" aria-label="Usable Menagerie resources">
                            {([
                                { key: 'blackStarsOwned', label: 'Black Stars', available: resources.blackStarsAvailable, total: resources.blackStarsOwned },
                                { key: 'organicLabels', label: 'Organic Labels', available: resources.organicLabelsAvailable, total: resources.organicLabels },
                                { key: 'mineheadDoublers', label: 'Minehead doublers', available: resources.mineheadDoublers, total: resources.mineheadDoublersOwned },
                                { key: 'sushiDoublers', label: 'Sushi Station doublers', available: resources.sushiDoublers, total: resources.sushiDoublersOwned },
                                { key: 'jellyOperatorDoublers', label: 'Jelly Operator doublers', available: resources.jellyOperatorDoublers, total: resources.jellyOperatorDoublersOwned },
                            ] as const).map((resource, resourceIndex) => <Box key={resource.key} direction="row" gap="medium" align="stretch" flex={{ grow: 1, shrink: 1, basis: '160px' }}>
                                {resourceIndex > 0 && <Box width="1px" background="grey-1" flex={false} aria-hidden="true" />}
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={menagerie.getUsableResourceImageData(resource.key)} scale={0.75} />
                                    <TextAndLabel label={resource.label} text={`${commaNotation(resource.available)}/${commaNotation(resource.total)}`} textSize="small" />
                                </Box>
                            </Box>)}
                        </Box>
                        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
                            {bonuses.map(bonus => <RoundedShadowBox key={bonus.index} pad="none" background="dark-1" overflow="hidden" style={{ opacity: bonus.available ? 1 : 0.5, gridRow: 'span 2', display: 'grid', gridTemplateRows: 'subgrid', rowGap: 0 }}>
                                <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                                    <Artwork data={bonus.getImageData()} size={40} />
                                    <Box>
                                        <Text size="small" weight="bold">{sourceDescription(bonus.data.description)}</Text>
                                        <Text size="small" color="accent-2">Level {bonus.level} · Lumi rank {bonus.requiredRank}</Text>
                                    </Box>
                                </Box>
                                <Box pad="medium" gap="small">
                                    <Box direction="row" gap="xsmall" align="center" wrap background="dark-3" pad="small" round="xsmall">
                                        <Text size="small" weight="bold" color="accent-1">{bonusEffectText(bonus, bonus.effect)}</Text>
                                        <Text size="small" color="accent-2">→ {bonusEffectText(bonus, bonus.nextEffect)}</Text>
                                    </Box>
                                    <Box direction="row" gap="small" align="center">
                                        <Text size="small" color="accent-2">Cost</Text>
                                        <IconImage data={menagerie.getLumiImageData()} scale={1} />
                                        <Text size="small" color={bonus.affordable ? 'green-1' : 'status-critical'}>{formatValue(bonus.nextCost)}</Text>
                                    </Box>
                                </Box>
                            </RoundedShadowBox>)}
                        </Grid>
                    </Box>}
                    {tab === 'Jellies' && <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex']} gap="medium" align="stretch">
                        {[
                            menagerie.purpleJellyfish,
                            menagerie.blueJellyfish,
                            menagerie.redJellyfish,
                            menagerie.silverJellyfish,
                            menagerie.yellowJellyfish,
                            menagerie.greenJellyfish,
                        ].map(jelly => {
                            const unlock = unlocks[jelly.data.unlockId];
                            const green = menagerie.greenJellyfish;
                            const helpBody = jelly.data.unlockId === 23
                                ? `Turn in ${commaNotation(green.requiredNametag.count)} ${itemDetails[green.requiredNametag.item].displayName}${green.requiredNametag.count === 1 ? '' : 's'} to the Spelunking Gallery to earn ${itemDetails[green.rewardNametag.item].displayName}${green.rewardNametag.count === 1 ? '' : 's'}.`
                                : undefined;
                            return <RoundedShadowBox key={jelly.data.unlockId} pad="none" background="dark-1" overflow="hidden">
                                <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                                    <Artwork data={unlock.getImageData()} size={40} />
                                    <Box gap="xsmall">
                                        <Box direction="row" gap="xsmall" align="center">
                                            <Text size="small" weight="bold">{jelly.data.color} Jellyfish</Text>
                                            <JellyfishHelp color={jelly.data.color} body={helpBody} />
                                        </Box>
                                        <Text size="xsmall" color={unlock.owned ? 'status-ok' : 'accent-2'}>
                                            {unlock.owned ? 'Unlocked' : `Locked · Req. rank ${unlock.requiredRank}`}
                                        </Text>
                                    </Box>
                                </Box>
                                <Box pad="medium" gap="small">
                                    {jelly.data.unlockId === 3 && <PurpleJellyfishDetails jelly={menagerie.purpleJellyfish} />}
                                    {jelly.data.unlockId === 5 && <BlueJellyfishDetails jelly={menagerie.blueJellyfish} />}
                                    {jelly.data.unlockId === 7 && <RedJellyfishDetails jelly={menagerie.redJellyfish} />}
                                    {jelly.data.unlockId === 10 && <SilverJellyfishDetails jelly={menagerie.silverJellyfish} />}
                                    {jelly.data.unlockId === 12 && <YellowJellyfishDetails jelly={menagerie.yellowJellyfish} />}
                                    {jelly.data.unlockId === 23 && <GreenJellyfishDetails jelly={menagerie.greenJellyfish} />}
                                </Box>
                            </RoundedShadowBox>;
                        })}
                    </Grid>}
                </Box>
            </Box>
        </Box>
    );
}

function SummaryGroup({ label, children, separated = false }: { label: string, children: React.ReactNode, separated?: boolean }) {
    return <Box gap="small" pad={{ vertical: 'small', left: separated ? 'medium' : undefined }} border={separated ? { side: 'left', color: 'grey-1' } : undefined} style={{ minWidth: 0 }}>
        <Text size="small">{label}</Text>
        {children}
    </Box>;
}

function Artwork({ data, size }: { data: ImageData, size: number }) {
    const scale = Math.min(size / data.width, size / data.height);
    return <Box width={`${size}px`} height={`${size}px`} align="center" justify="center" flex={false}>
        <IconImage data={data} scale={scale} />
    </Box>;
}
function DetailRow({ label, children }: { label: string, children: React.ReactNode }) {
    return <Box direction="row" justify="between" align="center" gap="small" wrap>
        <Text size="xsmall" color="accent-2">{label}</Text>
        {children}
    </Box>;
}

function PurpleJellyfishDetails({ jelly }: { jelly: MenagerieDomain['purpleJellyfish'] }) {
    return <Box gap="small">
        <Box direction="row" gap="medium" wrap>
            <TextAndLabel label="Shell purchases" text={commaNotation(jelly.shellPurchaseCount)} textSize="small" />
            <ComponentAndLabel label="Cost"><CoinsDisplay coinMap={getCoinsArray(jelly.nextShellCost)} maxCoins={3} regularRow coinScale={0.75} textColor={jelly.moneyBalance >= jelly.nextShellCost ? 'green-1' : 'text'} /></ComponentAndLabel>
        </Box>
        <Box border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }} gap="small">
            <Box direction="row" gap="medium" wrap>
                <TextAndLabel label="Lumi level" text={commaNotation(jelly.lumiLevel)} textSize="small" />
                <TextAndLabel label="Lumi contribution" text={`${commaNotation(jelly.lumiContribution)}%`} textSize="small" />
            </Box>
            <ComponentAndLabel label="Cost"><CoinsDisplay coinMap={getCoinsArray(jelly.nextLumiCost)} maxCoins={3} regularRow coinScale={0.75} textColor={jelly.moneyBalance >= jelly.nextLumiCost ? 'green-1' : 'text'} /></ComponentAndLabel>
        </Box>
    </Box>;
}

function BlueJellyfishDetails({ jelly }: { jelly: MenagerieDomain['blueJellyfish'] }) {
    return <Box direction="row" gap="medium" wrap>
        <ComponentAndLabel label="Ladles owned"><Box direction="row" gap="xsmall" align="center"><IconImage data={Item.getImageData('Ladle')} scale={0.7} /><Text size="small">{notateNumber(jelly.ownedLadles, 'Big')}</Text></Box></ComponentAndLabel>
        <ComponentAndLabel label="Ladles donated"><Box direction="row" gap="xsmall" align="center"><IconImage data={Item.getImageData('Ladle')} scale={0.7} /><Text size="small">{jelly.donatedLadles < 1e9 ? commaNotation(jelly.donatedLadles) : notateNumber(jelly.donatedLadles, 'Big')}</Text></Box></ComponentAndLabel>
    </Box>;
}

function RedJellyfishDetails({ jelly }: { jelly: MenagerieDomain['redJellyfish'] }) {
    return <Box gap="small">
        <Box direction="row" gap="medium" wrap>
            <TextAndLabel label="Reading opportunities" text={commaNotation(jelly.readingOpportunities)} textSize="small" />
            <TextAndLabel label="Reading multiplier" text={`×${commaNotation(jelly.readingMultiplier)}`} textSize="small" />
            <TipDisplay heading="Page types tracked" body="Red has 14 tracking slots; the counter shows how many have recorded page use." maxWidth="260px">
                <TextAndLabel label="Page types tracked" text={`${jelly.trackedPageItemCount}/${jelly.trackedPageItemSlots}`} textSize="small" />
            </TipDisplay>
        </Box>
        <Text size="xsmall" color="accent-2">Each icon shows how many pages Red has recorded for that chapter—not your Journal progress.</Text>
        {jelly.unlocked && <Text size="xsmall" color={jelly.ready ? 'status-ok' : 'accent-2'}>{jelly.ready ? 'Ready to read' : 'No reading opportunities'}</Text>}
        <Box direction="row" gap="small" wrap border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }}>
            {jelly.pageItems.map(pageItem => <TipDisplay key={pageItem.index} heading={pageItem.item.displayName} body={`${commaNotation(pageItem.quantity)} pages used`} maxWidth="220px">
                <Box tabIndex={0} aria-label={`${pageItem.item.displayName}: ${commaNotation(pageItem.quantity)} pages used`} align="center" gap="xsmall">
                    <IconImage data={pageItem.item.getImageData()} scale={0.8} />
                    <Text size="xsmall">{commaNotation(pageItem.quantity)}</Text>
                </Box>
            </TipDisplay>)}
        </Box>
    </Box>;
}

function SilverJellyfishDetails({ jelly }: { jelly: MenagerieDomain['silverJellyfish'] }) {
    const positiveOutcomes = jelly.conversionEvents.filter(event => event.fragments > 0 && event.probability > 0);
    const fragmentCapacityReached = jelly.obolFragments >= 2_000_000_000;
    return <Box gap="small">
        <Box gap="xsmall">
            <TextAndLabel label="Multiply the MISC bonuses of all obols by:" text={`×${notateNumber(jelly.miscMultiplier, 'Small')}`} textSize="small" />
            <TextAndLabel label="Level" text={`${jelly.miscLevel}/${jelly.miscLevelCap}`} textSize="small" />
            <ComponentAndLabel label="Cost"><ResourceDisplay cost={jelly.nextMiscCost} resourceImageData={Item.getImageData('ObolFrag')} resourceImageScale={0.65} textSize="small" /></ComponentAndLabel>
        </Box>
        <Box border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }} gap="xsmall">
            <Text size="xsmall" color="accent-2">Fragments earned per auto-trash:</Text>
            <TextAndLabel label="Level" text={`${jelly.conversionLevel}/${jelly.conversionLevelCap}`} textSize="small" />
            <ComponentAndLabel label="Cost"><ResourceDisplay cost={jelly.nextConversionCost} resourceImageData={Item.getImageData('ObolFrag')} resourceImageScale={0.65} textSize="small" /></ComponentAndLabel>
            {fragmentCapacityReached
                ? <Text size="xsmall">Fragment capacity reached</Text>
                : positiveOutcomes.map(event => <Text key={event.fragments} size="xsmall">{notateNumber(event.probability * 100, 'Small')}% chance to gain {event.fragments} fragment{event.fragments === 1 ? '' : 's'}</Text>)}
        </Box>
    </Box>;
}

function YellowJellyfishDetails({ jelly }: { jelly: MenagerieDomain['yellowJellyfish'] }) {
    return <Box gap="small">
        <Box direction="row" justify="between" align="center" gap="small">
            <Text size="xsmall" color="accent-2">Progress / requirement</Text>
            <Text size="xsmall">{formatValue(jelly.progress)} / {formatValue(jelly.requirement)}</Text>
        </Box>
        <Meter type="bar" values={[{ value: Math.min(jelly.progress, jelly.requirement), color: 'brand' }]} max={jelly.requirement || 1} size="full" thickness="xsmall" aria-label="Yellow Jellyfish progress" />
        <Box border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }} gap="xsmall">
            {jelly.upgrades.map(upgrade => <DetailRow key={upgrade.index} label={`${upgrade.label} · Lv. ${commaNotation(upgrade.level)}`}><Text size="xsmall">{commaNotation(upgrade.effect)}</Text></DetailRow>)}
        </Box>
    </Box>;
}


function GreenJellyfishDetails({ jelly }: { jelly: MenagerieDomain['greenJellyfish'] }) {
    const required = itemDetails[jelly.requiredNametag.item];
    const reward = itemDetails[jelly.rewardNametag.item];
    return <Box gap="small">
        <Box direction="row" justify="between" align="center" gap="small">
            <Text size="xsmall" color="accent-2">Gallery deposit / requirement</Text>
            <Text size="xsmall">{commaNotation(jelly.depositedNametags)} / {commaNotation(jelly.requiredNametag.count)}</Text>
        </Box>
        <Meter type="bar" values={[{ value: Math.min(jelly.depositedNametags, jelly.requiredNametag.count), color: 'brand' }]} max={jelly.requiredNametag.count || 1} size="full" thickness="xsmall" aria-label="Green Jellyfish deposit progress" />
        <GreenItemCounts label="Requirement" item={jelly.requiredNametag} name={required.displayName} />
        <GreenItemCounts label="Reward" item={jelly.rewardNametag} name={reward.displayName} />
    </Box>;
}

function GreenItemCounts({ label, item, name }: { label: string, item: { item: string, count: number, inStorage: number, equipped: number }, name: string }) {
    return <Box direction="row" gap="small" align="center">
        <IconImage data={Item.getImageData(item.item)} scale={0.7} />
        <Box flex gap="xsmall">
            <Text size="xsmall" weight="bold">{label}: {name} ×{commaNotation(item.count)}</Text>
            <Text size="xsmall" color="accent-2">In storage {commaNotation(item.inStorage)} · Equipped {commaNotation(item.equipped)}</Text>
        </Box>
    </Box>;
}

function ComponentAndLabel({ label, children }: { label: string, children: React.ReactNode }) {
    return <Box gap="xsmall">
        <Text size="xsmall" color="accent-2">{label}</Text>
        {children}
    </Box>;
}

