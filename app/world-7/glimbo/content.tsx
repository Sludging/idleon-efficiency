'use client';

import { Box, CheckBox, Grid, Heading, Text } from 'grommet';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import IconImage from '../../../components/base/IconImage';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { UpgradeTable } from '../../../components/account/shared/UpgradeTable';
import type { FilterOptions } from '../../../components/account/shared/UpgradeTableFilters';
import { Glimbo as GlimboDomain } from '../../../data/domain/world-7/glimbo';
import { notateNumber } from '../../../data/utility';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

const defaultFilters: FilterOptions = {
    hideLocked: false,
    hideMaxed: false,
    searchText: '',
    sortBy: 'default',
};

function GlimboTrades({ glimbo }: { glimbo: GlimboDomain }) {
    const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
    const [maintainGreenstacks, setMaintainGreenstacks] = useState(false);
    const rows = glimbo.trades.map(trade => {
        const resourceBudget = glimbo.getResourceBudget(trade.index, maintainGreenstacks);
        return {
            id: trade.index,
            trade,
            canAfford: trade.canAfford(resourceBudget),
            affordableTradeCount: trade.getAffordableTradeCount(resourceBudget),
        };
    });
    const columns = [
        {
            property: 'material',
            header: 'Material cost',
            render: (row: typeof rows[number]) => <Box direction="row" gap="small" align="center">
                <IconImage data={row.trade.material.getImageData()} scale={0.7} />
                <Box>
                    <Text size="small">{row.trade.material.displayName}</Text>
                    <Text size="small" color={row.canAfford ? 'green-2' : 'status-critical'}>
                        {notateNumber(row.trade.cost)}
                    </Text>
                </Box>
            </Box>,
        },
        {
            property: 'count',
            header: 'Traded',
            render: (row: typeof rows[number]) => <Text size="small">{notateNumber(row.trade.count)} times</Text>,
        },
        {
            property: 'upgrade',
            header: 'Upgrade Vault',
            render: (row: typeof rows[number]) => <Box direction="row" gap="small" align="center">
                <IconImage data={row.trade.upgradeImageData} scale={0.7} />
                <Text size="small">{row.trade.upgradeName}</Text>
            </Box>,
        },
        {
            property: 'level',
            header: 'Level',
            render: (row: typeof rows[number]) => <Text size="small">
                {notateNumber(row.trade.currentVaultLevel)} / {notateNumber(row.trade.maximumLevel)}
            </Text>,
        },
        {
            property: 'next',
            header: 'Next cap gain',
            render: (row: typeof rows[number]) => <Text size="small">+{notateNumber(row.trade.nextMaximumLevelGain)}</Text>,
        },
        {
            property: 'affordableTrades',
            header: 'Affordable trades',
            render: (row: typeof rows[number]) => <Text size="small">{notateNumber(row.affordableTradeCount)}</Text>,
        },
    ];

    return <UpgradeTable
        tableName="Glimbo trades"
        columns={columns}
        data={rows}
        primaryKey="id"
        filters={filters}
        onFiltersChange={setFilters}
        sortOptions={[{ label: 'In-game order', value: 'default' }]}
        additionalFilters={<CheckBox
            checked={maintainGreenstacks}
            label="Maintain greenstacks"
            onChange={event => setMaintainGreenstacks(event.target.checked)}
        />}
        variant="panel"
        showLockedAndMaxedFilters={false}
        showSearch={false}
    />;
}

export default function GlimboContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const glimbo = theData.get('glimbo') as GlimboDomain | undefined;

    if (!hydrated || !glimbo) {
        return <>Loading...</>;
    }

    return <Box gap="medium">
        <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>
            Glimbo
        </Heading>
        <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="medium">
            <TextAndLabel label="Total Trades" text={notateNumber(glimbo.totalTrades)} />
            <TextAndLabel label="Drop Rate Bonus" text={`${glimbo.dropRateBonusMultiplier.toFixed(2)}x`} />
        </Grid>
        <GlimboTrades glimbo={glimbo} />
    </Box>;
}
