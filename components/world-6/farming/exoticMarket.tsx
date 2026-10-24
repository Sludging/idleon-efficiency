'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Meter, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { ExoticMarketUpgrade, Farming } from '../../../data/domain/world-6/farming';
import { Menagerie } from '../../../data/domain/menagerie';
import { commaNotation } from '../../../data/utility';
import IconImage from '../../base/IconImage';
import TipDisplay from '../../base/TipDisplay';
import { DoublerBadge, DoublerSummary } from '../../base/DoublerStatus';
import { UpgradeTable } from '../../account/shared/UpgradeTable';
import type { FilterOptions } from '../../account/shared/UpgradeTableFilters';


function upgradeName(upgrade: ExoticMarketUpgrade): string {
    return upgrade.data.name.replace(/_/g, ' ').split(' ').map(word =>
        /^[IVX]+$/.test(word) ? word : word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
}

function effectDescription(upgrade: ExoticMarketUpgrade): string {
    const bonus = upgrade.getBonus();
    return upgrade.data.description
        .replace(/\{/g, String(Math.round(bonus * 100) / 100))
        .replace(/\}/g, String(Math.round((1 + bonus / 100) * 100) / 100))
        .replace(/\$/g, String(Math.ceil(bonus)))
        .replace(/_/g, ' ');
}

const rotationDateFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

function ReturnTime({ farming, upgrade }: { farming: Farming; upgrade: ExoticMarketUpgrade }) {
    const weeks = farming.getExoticMarketReturnWeeks(upgrade.index);
    if (weeks !== null) {
        return <Text size="xsmall" color="accent-2">Returns in {weeks}w</Text>;
    }

    return <Text size="xsmall" color="accent-2">No return through {rotationDateFormat.format(farming.getExoticMarketReturnSearchEndTime())}</Text>;
}

function NextChange({ timestamp }: { timestamp: number }) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, [timestamp]);

    const remaining = Math.floor((timestamp - now) / 1000);
    if (remaining <= 0) {
        return null;
    }
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor(remaining % 86400 / 3600);
    const minutes = Math.floor(remaining % 3600 / 60);
    const seconds = remaining % 60;
    return <Text size="xsmall" color="accent-2">Next in {days > 0 ? `${days}d ` : ''}{hours}h {minutes}m {seconds}s</Text>;
}

function MarketTable({ farming, upgrades, current }: { farming: Farming; upgrades: ExoticMarketUpgrade[]; current: boolean }) {
    const [filters, setFilters] = useState<FilterOptions>({ hideLocked: false, hideMaxed: false, searchText: '', sortBy: 'default' });
    const columns = [
        {
            property: 'name',
            header: 'Upgrade',
            render: (upgrade: ExoticMarketUpgrade) => <Box direction="row" gap="small" align="center" style={{ minWidth: '185px' }}>
                <IconImage data={upgrade.getImageData()} />
                <Box direction="row" gap="small" align="center">
                    <Text size="small">{upgradeName(upgrade)}</Text>
                    {upgrade.isOrganic && (
                        <DoublerBadge
                            image={Menagerie.getUsableResourceImageData('organicLabels')}
                            label="Organic Label applied"
                        />
                    )}
                </Box>
            </Box>,
        },
        {
            property: 'level',
            header: 'Level',
            render: (upgrade: ExoticMarketUpgrade) => <Text size="small">{commaNotation(upgrade.level)}</Text>,
        },
        {
            property: 'description',
            header: 'Effect',
            render: (upgrade: ExoticMarketUpgrade) => <Text size="small">{effectDescription(upgrade)}</Text>,
        },
        {
            property: 'progress',
            header: (
                <TipDisplay
                    heading="Effect / cap"
                    maxWidth="medium"
                    body={<Box gap="xsmall">
                        <Text size="small">Normal diminishing effects approach their limit without a hard cap.</Text>
                        <Text size="small">{farming.getExoticMarketCapMilestones().map(milestone =>
                            `${milestone.percentage}% at Lv. ${commaNotation(milestone.level)}`
                        ).join('; ')}</Text>
                        <Text size="small">Freexotic cannot exceed 50.</Text>
                    </Box>}
                >
                    <Box direction="row" gap="xsmall" align="center" tabIndex={0} aria-label="Effect / cap help">
                        <Text>Effect / cap</Text>
                        <CircleInformation size="small" />
                    </Box>
                </TipDisplay>
            ),
            render: (upgrade: ExoticMarketUpgrade) => {
                const effect = Math.round(upgrade.getBonus() * 100) / 100;
                const cap = upgrade.getEffectCap();
                const progress = upgrade.getCapProgress();
                if (cap === null || progress === null) {
                    return <Box gap="xxsmall">
                        <Text size="small">{effect}</Text>
                        <Text size="xsmall" color="accent-2">No cap; scales with level</Text>
                    </Box>;
                }
                return <Box gap="xsmall" style={{ minWidth: '150px' }}>
                    <Text size="small">{effect} / {cap} ({Math.round(progress * 10) / 10}%)</Text>
                    <Meter type="bar" size="full" thickness="4px" background="grey-1" max={100}
                        values={[{ value: progress, color: 'brand' }]} aria-label={`${upgradeName(upgrade)} effect cap progress`} />
                </Box>;
            },
        },
        {
            property: 'return',
            header: 'Next return',
            render: (upgrade: ExoticMarketUpgrade) => <ReturnTime farming={farming} upgrade={upgrade} />,
        },
    ];
    const title = current ? 'Current Rotation' : 'Off Rotation';
    return <UpgradeTable
        tableName={`Exotic Market ${title}`}
        columns={columns}
        data={upgrades}
        primaryKey="index"
        filters={filters}
        onFiltersChange={setFilters}
        sortOptions={[]}
        showSearch={false}
        showLockedAndMaxedFilters={false}
        variant="panel"
        minWidth="1000px"
        additionalFilters={<Box direction="row" gap="medium" align="baseline" wrap>
            <Heading level="3" size="small" margin="none" style={{ fontWeight: 'normal' }}>{title}</Heading>
            {current && <NextChange timestamp={farming.getNextExoticMarketRotationTime()} />}
            {current && (
                <DoublerSummary
                    label="Organic Labels"
                    owned={farming.organicLabelsOwned}
                    available={farming.organicLabelsAvailable}
                    image={Menagerie.getUsableResourceImageData('organicLabels')}
                    description="Organic Labels double the bonus and increase levels gained per purchase by 50% before rounding up."
                />
            )}
        </Box>}
    />;
}

export function ExoticMarketDisplay({ farming }: { farming: Farming }) {
    const currentIds = farming.getCurrentExoticMarketRotation().upgradeIds;
    const current = farming.exoticMarketUpgrades.filter(upgrade => currentIds.includes(upgrade.index));
    const offRotation = farming.exoticMarketUpgrades.filter(upgrade => !currentIds.includes(upgrade.index));
    const returns = new Map(offRotation.map(upgrade => [upgrade.index, farming.getExoticMarketReturnWeeks(upgrade.index)]));
    offRotation.sort((left, right) => (returns.get(left.index) ?? Infinity) - (returns.get(right.index) ?? Infinity));

    return <Box fill="horizontal" gap="medium">
        <MarketTable farming={farming} upgrades={current} current />
        <MarketTable farming={farming} upgrades={offRotation} current={false} />
    </Box>;
}
