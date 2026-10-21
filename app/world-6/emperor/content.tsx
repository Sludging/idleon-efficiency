'use client'

import { useContext, useEffect, useState } from 'react';
import { Box, Grid, Heading, ResponsiveContext, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { DataStatus } from '../../../lib/stores/appDataStore';
import { useShallow } from 'zustand/react/shallow';
import { Emperor as EmperorDomain } from '../../../data/domain/world-6/emperor';
import { nFormatter } from '../../../data/utility';
import TipDisplay from '../../../components/base/TipDisplay';
import { UpgradeTable } from '../../../components/account/shared/UpgradeTable';
import type { FilterOptions } from '../../../components/account/shared/UpgradeTableFilters';
import IconImage from '../../../components/base/IconImage';
import { ClassIndex } from '../../../data/domain/talents';
import { Skilling } from '../../../data/domain/skilling';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { EnemyInfo } from '../../../data/domain/enemies';
import { Item } from '../../../data/domain/items';
import type { ImageData } from '../../../data/domain/imageData';
import { Equinox as EquinoxDomain } from '../../../data/domain/world-3/equinox';

function EmperorContent() {
    const [hydrated, setHydrated] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: '',
        sortBy: 'nextBonus'
    });
    const size = useContext(ResponsiveContext);
    const { theData, dataStatus } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })
    ));
    const emperor = theData.get('emperor') as EmperorDomain | undefined;
    const upgradeVault = theData.get('upgradeVault') as UpgradeVault;
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !emperor) {
        return <>Loading...</>;
    }

    const emperorImage = EnemyInfo.find(enemy => enemy.id === 'Boss6A')!.getImageData();
    const dropRateImage = upgradeVault.bonuses.find(bonus => bonus.id === 18)!.getImageData();
    const bonusImages: Record<number, ImageData> = {
        0: Skilling.getSkillImageData(SkillsIndex.Sneaking),
        1: { location: `ClassIcons${ClassIndex.Death_Bringer}`, width: 38, height: 36 },
        2: Skilling.getSkillImageData(SkillsIndex.Farming),
        3: Item.getImageData('Opal'),
        4: { location: `ClassIcons${ClassIndex.Wind_Walker}`, width: 38, height: 36 },
        5: EquinoxDomain.cloudImageData(),
        6: { location: `ClassIcons${ClassIndex.Arcane_Cultist}`, width: 38, height: 36 },
        7: Skilling.getSkillImageData(SkillsIndex.Gaming),
        8: Skilling.getSkillImageData(SkillsIndex.Summoning),
        9: emperorImage,
        10: emperorImage,
        11: dropRateImage
    };
    const rows = emperor.emperorBonuses.map(bonus => ({
        id: bonus.index,
        image: bonusImages[bonus.index],
        name: bonus.getDisplayName(),
        currentBonus: bonus.getDescription(emperor.getEffectiveBonus(bonus.index)),
        nextShowdown: emperor.getNextAwardShowdown(bonus.index),
        nextBonus: bonus.getFormattedValue(emperor.getNextEffectiveBonus(bonus.index))
    }));
    const displayedRows = rows.sort((left, right) => {
        if (filters.sortBy === 'nextBonus') {
            return left.nextShowdown - right.nextShowdown || left.id - right.id;
        }
        return left.id - right.id;
    });
    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (row: typeof rows[number]) => (
                <Box direction="row" gap="small" align="center" style={{ minWidth: '180px' }}>
                    <IconImage data={row.image} scale={36 / Math.max(row.image.width, row.image.height)} />
                    <Text size="small">{row.name}</Text>
                </Box>
            )
        },
        {
            property: 'currentBonus',
            header: 'Bonus',
            render: (row: typeof rows[number]) => <Text size="small">{row.currentBonus}</Text>
        },
        {
            property: 'nextShowdown',
            header: (
                <TipDisplay
                    heading="Awarded at next"
                    body="Shows the next Showdown that awards each bonus. Some bonuses appear more often than others, so the list can skip Showdown numbers."
                    maxWidth="medium"
                >
                    <Box direction="row" gap="xsmall" align="center" tabIndex={0} aria-label="Awarded at next help">
                        <Text>Awarded at next</Text>
                        <CircleInformation size="small" />
                    </Box>
                </TipDisplay>
            ),
            render: (row: typeof rows[number]) => <Text size="small">{row.nextShowdown}</Text>
        },
        {
            property: 'nextBonus',
            header: 'Next bonus',
            render: (row: typeof rows[number]) => <Text size="small">{row.nextBonus}</Text>
        }
    ];

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Emperor</Heading>
            <Grid columns={size === 'small' ? ['minmax(0, 1fr)'] : ['minmax(0, 3fr)', 'minmax(0, 2fr)']} pad={{ vertical: 'small' }} gap={size === 'small' ? 'medium' : undefined} fill>
                <Box gap="small" pad={size === 'small' ? undefined : { right: 'medium' }} style={{ minWidth: 0 }}>
                    <Box direction="row" gap="xsmall" align="center" height="32px">
                        <Text size="small">Showdown</Text>
                    </Box>
                    <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline', minWidth: 0 }}>
                        <Box style={{ minWidth: 0 }}>
                            <Text size="xxlarge" weight="normal" style={{ overflowWrap: 'anywhere' }}>{emperor.getCurrentShowdown()}</Text>
                            <Text size="xsmall" color="accent-2">Current</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text size="large" weight="normal" style={{ overflowWrap: 'anywhere' }}>{emperor.getAttemptsLeft()} / {emperor.getDisplayedMaxAttempts()}</Text>
                            <Text size="xsmall" color="accent-2">Attempts left</Text>
                        </Box>
                        <Box style={{ minWidth: 0 }}>
                            <Text size="large" weight="normal" style={{ overflowWrap: 'anywhere' }}>{nFormatter(emperor.bossHP)}</Text>
                            <Text size="xsmall" color="accent-2">Boss HP</Text>
                        </Box>
                    </Box>
                </Box>
                <Box gap="small" pad={size === 'small' ? undefined : { left: 'medium' }} border={size === 'small' ? undefined : { side: 'left', color: 'grey-1' }} style={{ minWidth: 0 }}>
                    <Box justify="center" height="32px">
                        <Text size="small">Other</Text>
                    </Box>
                    <Box gap="xsmall">
                        <Box direction="row" align="baseline" justify="between" gap="small">
                            <Text size="xsmall" color="accent-2">Combined bonus multiplier</Text>
                            <TipDisplay
                                heading="Combined bonus multiplier"
                                body={
                                    <Box gap="xsmall">
                                        <Text>Arcane Upgrade: {nFormatter(emperor.arcaneBonus48)}%</Text>
                                        <Text>Arcade Bonus: {nFormatter(emperor.arcadeBonus51)}%</Text>
                                        <Text>Jelly Obstruction: {nFormatter(emperor.jellyBonus28)}%</Text>
                                    </Box>
                                }
                                maxWidth="300px"
                            >
                                <Text tabIndex={0} size="large" weight="bold" textAlign="end" style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                                    {emperor.getCombinedBonusMultiplier().toFixed(2)}x
                                </Text>
                            </TipDisplay>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Heading level="3" size="small" style={{ fontWeight: 'normal' }}>Bonuses</Heading>
            <UpgradeTable
                tableName="Emperor bonuses"
                filters={filters}
                onFiltersChange={setFilters}
                emptyMessage="No Emperor bonuses available."
                sortOptions={[
                    { label: 'Order by next bonus', value: 'nextBonus' },
                    { label: 'In-game order', value: 'gameOrder' }
                ]}
                columns={columns}
                data={displayedRows}
                primaryKey="id"
                variant="panel"
                showLockedAndMaxedFilters={false}
                showSearch={false}
            />
        </Box>
    );
}

export default EmperorContent;
