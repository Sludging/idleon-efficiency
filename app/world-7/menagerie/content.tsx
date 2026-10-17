'use client';

import { Box, Grid, Heading, Meter, Select, Text } from 'grommet';
import { useState } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { Menagerie as MenagerieDomain, MenagerieBonus, MenagerieMission } from '../../../data/domain/menagerie';
import { DataStatus } from '../../../lib/stores/appDataStore';
import { commaNotation, notateNumber } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

type MenagerieTab = 'Missions' | 'Unlocks' | 'Bonuses';
type MissionFilter = 'All' | 'Available' | 'Ready';

const templateText = (text: string, value: number): string =>
    text.replace(/[{}]/g, commaNotation(value)).replace(/膛/g, '').trim();

const bonusTemplateText = (bonus: MenagerieBonus, effect: number): string =>
    bonus.data.description.replace(/[{}]/g, placeholder =>
        notateNumber(bonus.getDescriptionEffect(effect, placeholder as '{' | '}'), 'Small'),
    ).replace(/膛/g, '').trim();

const sourceDescription = (text: string): string =>
    text.replace(/,\s*1 in \$ chance/, '').replace(/[{}$]/g, '').replace(/膛/g, '').trim();
const formatValue = (value: number): string => notateNumber(value, 'Big');
export default function MenagerieContent() {
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
                <Grid columns={{ count: 3, size: 'auto' }} gap="medium">
                    <RoundedShadowBox pad="medium" background="dark-1">
                        <Box gap="small">
                            <TextAndLabel label="Lumi rank" text={String(progression.rank)} />
                            <Text size="small">Menagerie access is available.</Text>
                            <Text size="small">Shells toward next rank: {commaNotation(progression.shells)} / {commaNotation(progression.shellThreshold)}</Text>
                            <Meter
                                values={[{ value: shellProgress, color: 'brand' }]}
                                max={progression.shellThreshold}
                                aria-label="Shell progress toward next rank"
                            />
                        </Box>
                    </RoundedShadowBox>
                    <RoundedShadowBox pad="medium" background="dark-1">
                        <Grid columns={{ count: 2, size: 'auto' }} gap="medium">
                            <TextAndLabel label="Lumi" text={notateNumber(progression.lumi, 'Big')} tooltip={String(progression.lumi)} />
                            <TextAndLabel label="Lumi per hour" text={notateNumber(progression.lumiPerHour, 'Big')} tooltip={String(progression.lumiPerHour)} />
                        </Grid>
                    </RoundedShadowBox>
                    <RoundedShadowBox pad="medium" background="dark-1">
                        <Box data-testid="mission-availability-summary">
                            <TextAndLabel label="Available missions" text={`${menagerie.availableMissionCount} / ${availability.missionLimit}`} tooltip={
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
                        <Text size="small" color="accent-2">{readyCount} ready to claim in game</Text>
                    </RoundedShadowBox>
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
                    <Box direction="row" align="center" justify="between" gap="small">
                        <Text>{missions.length} missions · {readyCount} ready. Each in-game claim grants one Shell.</Text>
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
                    <Box gap="small">
                        {visibleMissions.map(mission => <MissionRow key={mission.index} mission={mission} />)}
                    </Box>
                </Box>}

                {tab === 'Unlocks' && <Grid columns={{ count: 2, size: 'auto' }} gap="medium">
                    {unlocks.map(unlock => <RoundedShadowBox key={unlock.index} pad="medium" background="dark-1">
                        <Box gap="small">
                            <Text weight="bold">{sourceDescription(unlock.data.description)}</Text>
                            {unlock.data.tooltip && <Text>{sourceDescription(unlock.data.tooltip)}</Text>}
                            <Text color={unlock.owned ? 'status-ok' : unlock.available ? 'brand' : 'accent-2'}>
                                {unlock.owned ? 'Owned' : unlock.available ? 'Available' : `Requires Lumi rank ${unlock.requiredRank}`}
                            </Text>
                            {!unlock.owned && unlock.available && <TextAndLabel label="Cost" text={`${formatValue(unlock.nextCost)} Lumi${unlock.affordable ? '' : ' · not affordable'}`} />}
                        </Box>
                    </RoundedShadowBox>)}
                </Grid>}

                {tab === 'Bonuses' && <Box gap="medium">
                    <Box gap="small">
                        {bonuses.map(bonus => <RoundedShadowBox key={bonus.index} pad="medium" background="dark-1">
                            <Box direction="row" justify="between" align="start" gap="medium">
                                <Box gap="xsmall" flex={{ grow: 1, shrink: 1 }}>
                                    <Text>{sourceDescription(bonus.data.description)}</Text>
                                    {bonus.available ? <Text size="small">Level {bonus.level} · current: {bonusTemplateText(bonus, bonus.effect)}</Text> : <Text size="small" color="accent-2">Requires Lumi rank {bonus.requiredRank}</Text>}
                                </Box>
                                {bonus.available && <Box gap="xsmall" align="end">
                                    <Text size="small">Next: {bonusTemplateText(bonus, bonus.nextEffect)}</Text>
                                    <Text size="small" color={bonus.affordable ? 'status-ok' : 'accent-2'}>{formatValue(bonus.nextCost)} Lumi{bonus.affordable ? '' : ' · not affordable'}</Text>
                                </Box>}
                            </Box>
                        </RoundedShadowBox>)}
                    </Box>
                    <Box gap="small">
                        <Heading level="3" size="small" margin="none">Usable resources</Heading>
                        <Grid columns={{ count: 3, size: 'auto' }} gap="small">
                            <TextAndLabel label="Black Stars" text={commaNotation(resources.blackStarsOwned)} />
                            <TextAndLabel label="Organic Labels" text={commaNotation(resources.organicLabels)} />
                            <TextAndLabel label="Minehead doublers" text={commaNotation(resources.mineheadDoublers)} />
                            <TextAndLabel label="Sushi Station doublers" text={commaNotation(resources.sushiDoublers)} />
                            <TextAndLabel label="Jelly Operator doublers" text={commaNotation(resources.jellyOperatorDoublers)} />
                        </Grid>
                    </Box>
                </Box>}
            </Box>
        </Box>
    );
}

function MissionRow({ mission }: { mission: MenagerieMission }) {
    const status = mission.ready ? 'Ready' : mission.available ? 'In progress' : 'Locked';
    const ratio = mission.currentRequirement > 0 ? Math.min(mission.progress, mission.currentRequirement) / mission.currentRequirement : 0;

    return (
        <RoundedShadowBox pad="medium" background="dark-1">
            <Grid columns={{ count: 3, size: 'auto' }} gap="medium" align="center">
                <Box gap="xsmall">
                    <Text weight="bold">{templateText(mission.data.description, mission.currentRequirement)}</Text>
                    <Text size="small" color="accent-2">{mission.data.label}</Text>
                </Box>
                <Box gap="xsmall">
                    <TextAndLabel label="Current task" text={commaNotation(mission.currentRequirement)} />
                    <TextAndLabel label="Account progress" text={commaNotation(mission.progress)} />
                    <Meter values={[{ value: ratio * 100, color: 'brand' }]} max={100} aria-label={`${mission.data.label} progress`} />
                </Box>
                <Box align="end" gap="xsmall">
                    <Text weight="bold" color={mission.ready ? 'status-ok' : mission.available ? 'text' : 'accent-2'}>{status}</Text>
                    <Text size="small">{mission.claimCount} claims</Text>
                </Box>
            </Grid>
        </RoundedShadowBox>
    );
}
