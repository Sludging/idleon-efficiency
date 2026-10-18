'use client';

import { Box, Grid, Heading, Meter, ResponsiveContext, Select, Text } from 'grommet';
import { useContext, useState } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { Menagerie as MenagerieDomain, MenagerieBonus, MenagerieMission } from '../../../data/domain/menagerie';
import { ImageData } from '../../../data/domain/imageData';
import { DataStatus } from '../../../lib/stores/appDataStore';
import { commaNotation, notateNumber } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

type MenagerieTab = 'Missions' | 'Unlocks' | 'Bonuses';
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
const formatValue = (value: number): string => notateNumber(value, 'Big');
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
                                <IconImage data={menagerie.getLumiImageData()} scale={0.75} />
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
                        <SummaryGroup label="Available missions" separated>
                            <Box data-testid="mission-availability-summary">
                                <Text weight="normal" style={{ fontSize: '40px', lineHeight: '44px' }}>{menagerie.availableMissionCount} / {availability.missionLimit}</Text>
                                <Text size="xsmall" color="accent-2">Missions available</Text>
                                <TextAndLabel label="Missions ready" text={String(readyCount)} textSize="small" tooltip="Ready missions meet the current account-stat requirement. Claim each mission in game to receive one Shell." />
                                <TextAndLabel label="Account contributors" text="Details" textSize="small" tooltip={
                                    <Box gap="xsmall">
                                        <Text size="small">Available missions come from the mission limit and these account contributors:</Text>
                                        <Text size="small">Baseline: {commaNotation(availability.baseline)}</Text>
                                        <Text size="small">Menagerie bonus: {commaNotation(availability.menagerieBonus)}</Text>
                                        <Text size="small">Research: {commaNotation(availability.researchBonus)}</Text>
                                        <Text size="small">Jade Emporium: {commaNotation(availability.jadeEmporium)}</Text>
                                        <Text size="small">Bank bundle: {commaNotation(availability.bankBundle)}</Text>
                                        <Text size="small">Mission catalogue: {commaNotation(availability.missionLimit)}</Text>
                                    </Box>
                                } />
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
                        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
                            {visibleMissions.map(mission => <MissionCard key={mission.index} mission={mission} />)}
                        </Grid>
                    </Box>}

                    {tab === 'Unlocks' && <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
                        {unlocks.map(unlock => <RoundedShadowBox key={unlock.index} pad="none" background="dark-1" overflow="hidden" style={{ opacity: unlock.owned ? 1 : unlock.available ? 0.8 : 0.5 }}>
                            <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                                <Artwork data={unlock.getImageData()} size={40} />
                                <Text size="small" weight="bold">{sourceDescription(unlock.data.description)}</Text>
                            </Box>
                            <Box pad="medium" gap="small">
                                {unlock.data.tooltip && <Text size="small">{sourceDescription(unlock.data.tooltip)}</Text>}
                                {!unlock.owned && !unlock.available && <Text size="small" color="accent-2">Requires Lumi rank {unlock.requiredRank}</Text>}
                                {!unlock.owned && unlock.available && <Box direction="row" gap="small" align="center">
                                    <Text size="small" color="accent-2">Cost</Text>
                                    <IconImage data={menagerie.getLumiImageData()} scale={1} />
                                    <Text size="small" color={unlock.affordable ? 'green-1' : 'status-critical'}>{formatValue(unlock.nextCost)}</Text>
                                </Box>}
                            </Box>
                        </RoundedShadowBox>)}
                    </Grid>}

                    {tab === 'Bonuses' && <Box gap="medium">
                        <Box border={[{ side: 'top', color: 'grey-1' }, { side: 'bottom', color: 'grey-1' }]} pad={{ vertical: 'small' }} direction="row" wrap gap="medium" align="center" aria-label="Usable Menagerie resources">
                            {([
                                { key: 'blackStarsOwned', label: 'Black Stars', value: resources.blackStarsOwned },
                                { key: 'organicLabels', label: 'Organic Labels', value: resources.organicLabels },
                                { key: 'mineheadDoublers', label: 'Minehead doublers', value: resources.mineheadDoublers },
                                { key: 'sushiDoublers', label: 'Sushi Station doublers', value: resources.sushiDoublers },
                                { key: 'jellyOperatorDoublers', label: 'Jelly Operator doublers', value: resources.jellyOperatorDoublers },
                            ] as const).map((resource, resourceIndex) => <Box key={resource.key} direction="row" gap="medium" align="stretch" flex={{ grow: 1, shrink: 1, basis: '160px' }}>
                                {resourceIndex > 0 && <Box width="1px" background="grey-1" flex={false} aria-hidden="true" />}
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={menagerie.getUsableResourceImageData(resource.key)} scale={0.75} />
                                    <TextAndLabel label={resource.label} text={commaNotation(resource.value)} textSize="small" />
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

function MissionCard({ mission }: { mission: MenagerieMission }) {
    const status = mission.ready ? 'Ready' : mission.available ? 'In progress' : 'Locked';
    const ratio = mission.currentRequirement > 0 ? Math.min(mission.progress, mission.currentRequirement) / mission.currentRequirement : 0;

    return <RoundedShadowBox pad="none" background="dark-1" overflow="hidden" style={{ opacity: mission.available ? 1 : 0.5, display: 'flex', flexDirection: 'column' }}>
        <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
            <Artwork data={mission.getImageData()} size={40} />
            <Box>
                <Text size="small" weight="bold">{mission.data.label}</Text>
                <Text size="small" color={mission.ready ? 'status-ok' : mission.available ? 'text' : 'accent-2'}>{status}</Text>
            </Box>
        </Box>
        <Box pad="medium" gap="small" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Text size="small">{templateText(mission.data.description, mission.currentRequirement)}</Text>
            <Box direction="row" justify="between" gap="small" wrap>
                <TextAndLabel label="Next task" text={commaNotation(mission.nextRequirement)} textSize="small" />
                <TextAndLabel label="Account progress" text={commaNotation(mission.progress)} textSize="small" />
            </Box>
            <Box gap="xsmall" style={{ marginTop: 'auto' }}>
                <Meter type="bar" values={[{ value: ratio * 100, color: 'brand' }]} max={100} size="full" thickness="xsmall" aria-label={`${mission.data.label} progress`} />
                <Text size="xsmall" color="accent-2">{mission.claimCount} claims</Text>
            </Box>
        </Box>
    </RoundedShadowBox>;
}
