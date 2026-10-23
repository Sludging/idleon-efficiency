'use client';

import { useState } from 'react';
import { Box, Meter, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import type { SneakingGemstone } from '../../../data/domain/world-6/sneaking';
import { commaNotation, notateNumber } from '../../../data/utility';
import IconImage from '../../base/IconImage';
import TipDisplay from '../../base/TipDisplay';
import { UpgradeTable } from '../../account/shared/UpgradeTable';
import type { FilterOptions } from '../../account/shared/UpgradeTableFilters';


function formatEffect(value: number): string {
    if (value >= 1000) {
        return notateNumber(value, 'Big');
    }
    return String(Math.round(value * 100) / 100);
}

export function GemstonesDisplay({ gemstones }: { gemstones: SneakingGemstone[] }) {
    const [filters, setFilters] = useState<FilterOptions>({ hideLocked: false, hideMaxed: false, searchText: '', sortBy: 'default' });
    const columns = [
        {
            property: 'name',
            header: 'Gemstone',
            render: (gemstone: SneakingGemstone) => {
                const imageData = gemstone.getImageData();
                return (
                    <Box direction="row" gap="small" align="center" style={{ minWidth: '170px' }}>
                        <IconImage data={imageData} scale={32 / imageData.width} />
                        <Text size="small">{gemstone.data.name.replace(/_/g, ' ')}</Text>
                    </Box>
                );
            },
        },
        {
            property: 'quantity',
            header: 'Collected',
            render: (gemstone: SneakingGemstone) => (
                <Text size="small" tabIndex={0}>{notateNumber(gemstone.quantity, 'Big')}</Text>
            ),
        },
        {
            property: 'description',
            header: 'Effect',
            render: (gemstone: SneakingGemstone) => (
                <Text size="small">
                    {gemstone.description
                        .replace(/[+{}$%@]/g, '')
                        .replace(/_/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim()}
                </Text>
            ),
        },
        {
            property: 'progress',
            header: (
                <TipDisplay
                    heading="How the limit works"
                    maxWidth="medium"
                    body="Each extra gem adds less to its bonus. There is no limit on how many gems you can collect. The bonus gets closer to the limit shown here. These limits use your current bonuses. Improving other bonuses can raise some limits."
                >
                    <Box direction="row" gap="xsmall" align="center" tabIndex={0} aria-label="Effect / limit help">
                        <Text>Effect / limit</Text>
                        <CircleInformation size="small" />
                    </Box>
                </TipDisplay>
            ),
            render: (gemstone: SneakingGemstone) => {
                const isEmerald = gemstone.data.internalId === 'NjGem6';
                const isFirefrost = gemstone.data.internalId === 'NjGem7';
                const currentEffect = isEmerald ? gemstone.getUpgradeDiscountPercent() : gemstone.getBonus();
                const limitEffect = isEmerald ? gemstone.getUpgradeDiscountLimitPercent() : gemstone.getBonusLimit();
                const currentText = isFirefrost ? `+${formatEffect(currentEffect)}` : `${formatEffect(currentEffect)}%`;
                const limitText = isFirefrost ? `+${formatEffect(limitEffect)}` : `${formatEffect(limitEffect)}%`;
                const progress = 100 * currentEffect / limitEffect;
                const roundedProgress = Math.round(progress * 10) / 10;
                const progressText = roundedProgress >= 100 ? '~100%' : `${roundedProgress}%`;
                const name = gemstone.data.name.replace(/_/g, ' ');

                return (
                    <Box gap="xsmall" style={{ minWidth: '230px' }}>
                        <Text size="small">{currentText} / {limitText} ({progressText})</Text>
                        <Meter
                            type="bar"
                            size="full"
                            thickness="4px"
                            background="grey-1"
                            max={100}
                            values={[{ value: Math.max(0, Math.min(100, progress)), color: 'brand' }]}
                            aria-label={`${name} effect toward its limit`}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <UpgradeTable
            tableName="Sneaking Gemstones"
            columns={columns}
            data={gemstones}
            primaryKey="index"
            filters={filters}
            onFiltersChange={setFilters}
            sortOptions={[]}
            showSearch={false}
            showLockedAndMaxedFilters={false}
            variant="panel"
            minWidth="900px"
        />
    );
}
