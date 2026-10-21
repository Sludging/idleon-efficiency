'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Heading, ResponsiveContext, Text } from 'grommet';
import { useContext } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { UpgradeTable } from '../../../components/account/shared/UpgradeTable';
import type { FilterOptions } from '../../../components/account/shared/UpgradeTableFilters';
import { Minehead as MineheadDomain, MineheadUpgrade } from '../../../data/domain/world-7/minehead';
import type { ImageData } from '../../../data/domain/imageData';
import { commaNotation, notateNumber } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

type UpgradeRow = { id: number; upgrade: MineheadUpgrade; description: string; capped: boolean; maxed: boolean; locked: boolean; nextCost: number; bulkCost: number };

const mineheadCurrencyImage: ImageData = { location: 'MineheadCurrency', width: 20, height: 26 };
const mineheadLivesImage: ImageData = { location: 'MineheadLives', width: 20, height: 26 };
const mineheadBaseDamageImage: ImageData = { location: 'MineheadBaseDamage', width: 25, height: 26 };

function Artwork({ data, size = 40 }: { data: ImageData; size?: number }) {
    const scale = Math.min(size / data.width, size / data.height);
    return <Box width={`${size}px`} height={`${size}px`} align="center" justify="center" flex={false}>
        <IconImage data={data} scale={scale} />
    </Box>;
}

function MineheadOverview({ minehead }: { minehead: MineheadDomain }) {
    const small = useContext(ResponsiveContext) === 'small';
    const progress = [
        { label: 'Daily tries', value: `${notateNumber(minehead.remainingDailyAttempts)}/${notateNumber(minehead.dailyTries)}` },
        { label: 'Opponents beaten', value: notateNumber(minehead.opponentsDefeated) },
    ];
    const currencyIcon = mineheadCurrencyImage;
    const livesIcon = mineheadLivesImage;
    const damageIcon = mineheadBaseDamageImage;

    return <Grid columns={small ? ['minmax(0, 1fr)'] : ['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']} gap={small ? 'medium' : undefined} pad={{ vertical: 'small' }} fill>
        <Box gap="small" pad={small ? undefined : { right: 'medium' }} style={{ minWidth: 0 }}>
            <Box direction="row" gap="xsmall" align="center" height="32px">
                <IconImage data={currencyIcon} scale={0.75} />
                <Text size="small">Mine Currency</Text>
            </Box>
            <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline', minWidth: 0 }}>
                <Box style={{ minWidth: 0 }}>
                    <Text size="xxlarge" weight="normal" style={{ overflowWrap: 'anywhere' }}>{notateNumber(minehead.currency)}</Text>
                    <Text size="xsmall" color="accent-2">Balance</Text>
                </Box>
                <Box style={{ minWidth: 0 }}>
                    <Box direction="row" align="center" gap="xsmall">
                        <IconImage data={currencyIcon} scale={0.5} />
                        <Text size="large" color="status-ok" weight="normal" style={{ overflowWrap: 'anywhere' }}>{notateNumber(minehead.currencyGain)}/hr</Text>
                    </Box>
                    <Text size="xsmall" color="accent-2">Rate</Text>
                </Box>
            </Box>
        </Box>
        <Box gap="small" pad={small ? undefined : { horizontal: 'medium' }} border={small ? undefined : { side: 'left', color: 'grey-1' }} style={{ minWidth: 0 }}>
            <Box direction="row" align="center" height="32px">
                <Text size="small">Progress</Text>
            </Box>
            <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline', minWidth: 0 }}>
                {progress.map(({ label, value }) => <TextAndLabel key={label} label={label} text={value} textSize="small" />)}
            </Box>
        </Box>
        <Box gap="small" pad={small ? undefined : { left: 'medium' }} border={small ? undefined : { side: 'left', color: 'grey-1' }} style={{ minWidth: 0 }}>
            <Box direction="row" align="center" height="32px">
                <Text size="small">Combat</Text>
            </Box>
            <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline', minWidth: 0 }}>
                <ComponentAndLabel label="Max lives" labelSize="xsmall" component={<Box direction="row" align="center" gap="xsmall"><IconImage data={livesIcon} scale={0.65} /><Text size="small">{notateNumber(minehead.maxLives)}</Text></Box>} />
                <ComponentAndLabel label="Base damage" labelSize="xsmall" component={<Box direction="row" align="center" gap="xsmall"><IconImage data={damageIcon} scale={0.65} /><Text size="small">{notateNumber(minehead.baseDamage)}</Text></Box>} />
            </Box>
        </Box>
    </Grid>;
}
function MineheadUpgrades({ minehead }: { minehead: MineheadDomain }) {
    const [filters, setFilters] = useState<FilterOptions>({ hideLocked: false, hideMaxed: false, searchText: '', sortBy: 'default' });
    const rows: UpgradeRow[] = minehead.upgrades.filter(upgrade => upgrade.data.maxLevel !== 0).map(upgrade => {
        const capped = upgrade.data.maxLevel < 999;
        const maxed = upgrade.isMaxed();
        const nextCost = upgrade.nextLevelCost();
        return {
            id: upgrade.index,
            upgrade,
            description: upgrade.getDescription(minehead),
            capped,
            maxed,
            locked: !upgrade.unlocked,
            nextCost,
            bulkCost: upgrade.getCostToLevel(capped ? upgrade.data.maxLevel : upgrade.level + 10),
        };
    });
    const searchText = filters.searchText.trim().toLowerCase();
    const displayedRows = rows.filter(row =>
        (!filters.hideLocked || !row.locked)
        && (!filters.hideMaxed || !row.maxed)
        && (searchText === ''
            || row.upgrade.data.name.toLowerCase().includes(searchText)
            || row.description.toLowerCase().includes(searchText))
    );
    const columns = [
        {
            property: 'upgrade',
            header: 'Upgrade',
            render: (row: UpgradeRow) => <Box direction="row" gap="small" align="center" style={{ minWidth: '180px', opacity: row.locked ? 0.5 : 1 }}>
                <IconImage data={row.upgrade.getImageData()} scale={0.75} />
                <Text size="xsmall">{row.upgrade.data.name}</Text>
            </Box>,
        },
        {
            property: 'level',
            header: 'Level',
            render: (row: UpgradeRow) => <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>{row.capped
                ? `${notateNumber(row.upgrade.level)} / ${notateNumber(row.upgrade.data.maxLevel)}${row.maxed ? ' (Maxed)' : ''}`
                : notateNumber(row.upgrade.level)}</Text>,
        },
        {
            property: 'description',
            header: 'Effect',
            render: (row: UpgradeRow) => <Text size="xsmall" style={{ opacity: row.locked ? 0.5 : 1 }}>{row.description}</Text>,
        },
        {
            property: 'nextCost',
            header: 'Next cost',
            render: (row: UpgradeRow) => row.maxed
                ? <Text size="xsmall">—</Text>
                : <Box direction="row" gap="xsmall" align="center" style={{ whiteSpace: 'nowrap', opacity: row.locked ? 0.5 : 1 }}>
                    <IconImage data={mineheadCurrencyImage} scale={0.35} />
                    <Text size="xsmall" color={minehead.currency >= row.nextCost ? 'green-1' : 'red'}>{notateNumber(row.nextCost)}</Text>
                </Box>,
        },
        {
            property: 'progression',
            header: 'Progression',
            render: (row: UpgradeRow) => row.locked
                ? <Text size="xsmall" style={{ opacity: 0.5 }}>Research requirement: Lv. {notateNumber(row.upgrade.getRequiredLevel())}</Text>
                : row.maxed
                    ? <Text size="xsmall">—</Text>
                    : <Box gap="xxsmall" style={{ whiteSpace: 'nowrap' }}>
                        <Text size="xsmall" color="accent-2">{row.capped ? 'Cost to max' : 'Next 10'}</Text>
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={mineheadCurrencyImage} scale={0.35} />
                            <Text size="xsmall" color={minehead.currency >= row.bulkCost ? 'green-1' : 'red'}>{notateNumber(row.bulkCost)}</Text>
                        </Box>
                    </Box>,
        },
    ];
    return <UpgradeTable
        tableName="Minehead upgrades"
        columns={columns}
        data={displayedRows}
        primaryKey="id"
        filters={filters}
        onFiltersChange={setFilters}
        searchPlaceholder="Search name or effect..."
        sortOptions={[{ label: 'In-game order', value: 'default' }]}
        variant="panel"
    />;
}

function MineheadOpponentSummary({ minehead }: { minehead: MineheadDomain }) {
    const small = useContext(ResponsiveContext) === 'small';
    const currentIndex = minehead.opponentsDefeated;
    const currentCandidate = minehead.opponents.find(opponent => opponent.index === currentIndex);
    const nextCandidate = minehead.opponents.find(opponent => opponent.index === currentIndex + 1);
    const currentOpponent = currentCandidate;
    const currentRewardDescription = currentOpponent?.getDescription();
    const showCurrentReward = currentRewardDescription !== undefined
        && !currentRewardDescription.startsWith('Nothing... yet...');
    const nextOpponent = nextCandidate && !nextCandidate.getDescription().startsWith('Nothing... yet...')
        ? nextCandidate
        : undefined;
    const showNext = nextOpponent !== undefined;

    if (!currentOpponent && !showNext) {
        return null;
    }

    return <RoundedShadowBox background="dark-1" pad="medium" gap="medium">
        {currentOpponent && <Box direction={small ? 'column' : 'row'} justify="between" align={small ? 'start' : 'center'} gap="medium">
            <Box direction="row" gap="small" align="center" flex="grow">
                <Artwork data={currentOpponent.getImageData()} size={44} />
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Current opponent</Text>
                    <Text size="medium">{currentOpponent.data.name}</Text>
                </Box>
            </Box>
            <Box direction="row" gap="medium">
                <TextAndLabel label="Maximum HP" labelSize="xsmall" textSize="small" text={commaNotation(currentOpponent.maximumHp)} />
                <TextAndLabel label="Depth Charges" labelSize="xsmall" textSize="small" text={notateNumber(currentOpponent.depthCharges)} />
            </Box>
        </Box>}
        <Grid columns={small || !showNext || !showCurrentReward ? ['flex'] : ['flex', 'flex']} gap="small">
            {showCurrentReward && currentOpponent && <Box background="grey-1" round="small" pad="small" gap="xxsmall">
                <Text size="xsmall" color="accent-2">Reward on clear</Text>
                <Text size="small">{currentRewardDescription}</Text>
            </Box>}
            {nextOpponent && <Box background="grey-1" round="small" pad="small" gap="xxsmall">
                <Box direction="row" gap="xsmall" align="center">
                    <Artwork data={nextOpponent.getImageData()} size={28} />
                    <Text size="xsmall" color="accent-2">Up next: {nextOpponent.data.name}</Text>
                </Box>
                <Text size="small">{nextOpponent.getDescription()}</Text>
            </Box>}
        </Grid>
    </RoundedShadowBox>;
}

function MineheadOpponents({ minehead }: { minehead: MineheadDomain }) {
    const small = useContext(ResponsiveContext) === 'small';
    const currentIndex = minehead.opponentsDefeated;
    const visibleOpponents = minehead.opponents.filter(opponent => !opponent.getDescription().startsWith('Nothing... yet...'));

    return <Box gap="medium">
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {visibleOpponents.map(opponent => {
                const current = opponent.index === currentIndex;
                const style = current ? { border: '1px solid #e1b454', background: '#29271f' } : undefined;
                return <RoundedShadowBox key={opponent.index} background="dark-1" pad="none" gap="none" overflow="hidden"
                    style={{ ...style, opacity: opponent.defeated || current ? 1 : 0.76 }}>
                    <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}
                        style={{ position: 'relative', zIndex: 1, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.18)' }}>
                        <Artwork data={opponent.getImageData()} />
                        <Text size="small" weight="bold">{opponent.data.name}</Text>
                    </Box>
                    <Box pad="medium" gap="small">
                        <Box gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Reward</Text>
                            <Text size="small">{opponent.getDescription()}</Text>
                        </Box>
                        <Box direction="row" gap="medium" justify="between">
                            <TextAndLabel label="Maximum HP" labelSize="xsmall" textSize="small" text={commaNotation(opponent.maximumHp)} />
                            <TextAndLabel label="Depth Charges" labelSize="xsmall" textSize="small" text={notateNumber(opponent.depthCharges)} />
                        </Box>
                    </Box>
                </RoundedShadowBox>;
            })}
        </Grid>
    </Box>;
}

export default function MineheadContent() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [section, setSection] = useState<MineheadSection>('upgrades');
    const [mounted, setMounted] = useState(false);
    const minehead = theData.get('minehead') as MineheadDomain | undefined;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !minehead) {
        return <>Loading...</>;
    }

    return <Box gap="medium">
        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Minehead</Heading>
        <MineheadOverview minehead={minehead} />
        <MineheadOpponentSummary minehead={minehead} />
        <ContentTabs<MineheadSection>
            options={[{ value: 'upgrades', label: 'Upgrades' }, { value: 'opponents', label: 'Opponents' }]}
            value={section}
            onChange={setSection}
        />
        {section === 'upgrades' ? <MineheadUpgrades minehead={minehead} /> : <MineheadOpponents minehead={minehead} />}
    </Box>;
}
