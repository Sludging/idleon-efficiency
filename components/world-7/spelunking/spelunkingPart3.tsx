import { useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { CircleInformation } from 'grommet-icons';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TipDisplay from '../../base/TipDisplay';
import { UpgradeTable } from '../../account/shared/UpgradeTable';
import type { FilterOptions } from '../../account/shared/UpgradeTableFilters';
import { ComponentAndLabel } from '../../base/TextAndLabel';
import type { ImageData } from '../../../data/domain/imageData';
import type { Spelunking, Upgrade } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber } from '../../../data/utility';

interface SpelunkingPart3Props {
    spelunking: Spelunking;
}

interface ShopRow {
    id: number;
    upgrade: Upgrade;
    description: string;
    locked: boolean;
    maxed: boolean;
}

const overstimIcon: ImageData = { location: 'CaveShopUpg7', width: 34, height: 34 };
const trackometerIcon: ImageData = { location: 'CaveShopUpg60', width: 34, height: 34 };
const elixirImages = [
    'https://idleon.wiki/images/4/48/Spelunking_Elixir_1.png',
    'https://idleon.wiki/images/9/90/Spelunking_Elixir_2.png',
    'https://idleon.wiki/images/6/65/Spelunking_Elixir_3.png',
    'https://idleon.wiki/images/6/6d/Spelunking_Elixir_4.png',
    'https://idleon.wiki/images/c/cf/Spelunking_Elixir_5.png',
    'https://idleon.wiki/images/8/81/Spelunking_Elixir_6.png',
    'https://idleon.wiki/images/f/f8/Spelunking_Elixir_7.png',
    'https://idleon.wiki/images/6/68/Spelunking_Elixir_8.png',
    'https://idleon.wiki/images/a/a6/Spelunking_Elixir_9.png',
    'https://idleon.wiki/images/e/e3/Spelunking_Elixir_10.png',
    'https://idleon.wiki/images/4/42/Spelunking_Elixir_11.png',
    'https://idleon.wiki/images/b/b9/Spelunking_Elixir_12.png',
];

const ElixirGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: 8px;
`;

const ElixirCard = styled.article<{ $memorized: boolean; $owned: boolean }>`
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    align-content: start;
    gap: 8px;
    min-height: 116px;
    padding: 10px;
    border: ${({ $memorized }) => $memorized ? '2px solid #e1b454' : '1px solid #30333a'};
    background: ${({ $memorized }) => $memorized ? '#29271f' : '#1e2127'};
    opacity: ${({ $owned }) => $owned ? 1 : 0.7};

    img { width: 48px; height: 48px; object-fit: contain; image-rendering: pixelated; }
`;

function formatMultiplier(value: number): string {
    return notateNumber(value, 'MultiplierInfo').replace('#', '');
}
function formatSourceBonus(value: number): string {
    const rounded = Math.round(value * 100) / 100;
    const [integer, fraction] = String(rounded).split('.');
    const groupedInteger = commaNotation(Number(integer));
    return fraction ? `${groupedInteger}.${fraction}` : groupedInteger;
}

function sourceCount(upgrade: Upgrade, spelunking: Spelunking): string {
    switch (upgrade.index) {
        case 1:
        case 10:
            return commaNotation(spelunking.getTotalDiscoveries());
        case 2:
        case 9:
            return commaNotation(spelunking.bestDepthTotal);
        case 3:
            return commaNotation(spelunking.biggestHaulDigitTotal);
        case 8:
            return commaNotation(spelunking.spelunkingSkillLevelTotal);
        case 54:
        case 55:
        case 56:
            return commaNotation(spelunking.manic.totalDepth);
        default:
            throw new Error(`No Spelunking count binding for upgrade ${upgrade.index}`);
    }
}

function sourceDollar(upgrade: Upgrade, spelunking: Spelunking): string {
    switch (upgrade.index) {
        case 5:
            return (Math.round(spelunking.hourlyRecharge * 10) / 10).toFixed(1);
        case 6:
            return commaNotation(Math.round(spelunking.overstim.bonusPerLevel));
        case 21:
            return formatMultiplier(spelunking.deepPocketsMultiplier);
        case 27:
            return commaNotation(Math.round(spelunking.exaltDropChanceDenominator));
        case 28:
            return commaNotation(Math.round(spelunking.prismaDropChanceDenominator));
        case 40:
            return spelunking.bestUnlockedTool.data.name;
        default:
            return formatSourceBonus(upgrade.sourceBonus);
    }
}

export function formatShopDescription(upgrade: Upgrade, spelunking: Spelunking): string {
    if (upgrade.level === -1) {
        return 'Unlock this upgrade to gain access to its bonuses...';
    }

    let description = upgrade.data.description;
    if (upgrade.index === 43) {
        description = description.replace('1 in $ ', '');
    }

    description = description.replace(/\{/g, commaNotation(upgrade.getBonus()));
    description = description.replace(/\}/g, formatMultiplier(1 + upgrade.getBonus() / 100));
    description = description.replace(/\^/g, () => sourceCount(upgrade, spelunking));
    description = description.replace(/\$/g, () => sourceDollar(upgrade, spelunking));
    description = description.replace(/#/g, () => {
        if (upgrade.index === 27) return commaNotation(spelunking.exaltedStampFragments);
        if (upgrade.index === 28) return commaNotation(spelunking.prismaBubblesFound);
        if (upgrade.index === 40) return commaNotation(spelunking.bestUnlockedTool.data.damageMultiplier);
        throw new Error(`No Spelunking detail binding for upgrade ${upgrade.index}`);
    });
    description = description.replace(/~/g, (Math.floor(upgrade.sourceBonus * 10) / 10).toFixed(1));
    return description.replace(/\s*@\s*/g, '\n').trim();
}

export function SpelunkingShop({ spelunking }: SpelunkingPart3Props) {
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: '',
        sortBy: 'default',
    });
    const theme = useContext(ThemeContext);
    const rows = useMemo(() => {
        const search = filters.searchText.trim().toLocaleLowerCase();
        return spelunking.upgrades
            .map((upgrade): ShopRow => ({
                id: upgrade.index,
                upgrade,
                description: formatShopDescription(upgrade, spelunking),
                locked: upgrade.level === -1,
                maxed: upgrade.data.maxLevel !== 99999 && upgrade.level >= upgrade.data.maxLevel,
            }))
            .filter(row => !filters.hideLocked || !row.locked)
            .filter(row => !filters.hideMaxed || !row.maxed)
            .filter(row => search.length === 0
                || row.upgrade.data.name.toLocaleLowerCase().includes(search)
                || row.description.toLocaleLowerCase().includes(search))
            .sort((left, right) => {
                if (filters.sortBy === 'name') return left.upgrade.data.name.localeCompare(right.upgrade.data.name);
                if (filters.sortBy === 'level') return right.upgrade.level - left.upgrade.level;
                return left.upgrade.index - right.upgrade.index;
            });
    }, [filters, spelunking]);

    const columns = [
        {
            property: 'upgrade',
            header: 'Upgrade',
            render: (row: ShopRow) => (
                <Box direction="row" gap="small" align="center" data-spelunking-upgrade-name={row.upgrade.index} style={{ opacity: row.locked ? 0.7 : 1, minWidth: '180px' }}>
                    <IconImage data={{ location: `CaveShopUpg${row.upgrade.index}`, width: 34, height: 34 }} scale={0.6} />
                    <Text size="xsmall">{row.upgrade.data.name}</Text>
                </Box>
            ),
        },
        {
            property: 'level',
            header: 'Level',
            render: (row: ShopRow) => {
                if (row.locked) {
                    if (row.upgrade.index === 0) {
                        return <Text size="xsmall" data-spelunking-upgrade-level={row.upgrade.index} />;
                    }
                    const required = spelunking.upgrades[row.upgrade.data.requiredUpgrades];
                    return <Text size="xsmall" data-spelunking-upgrade-level={row.upgrade.index}>{required.data.name}</Text>;
                }
                const level = commaNotation(row.upgrade.level);
                const value = row.upgrade.data.maxLevel === 99999
                    ? level
                    : `${level} / ${commaNotation(row.upgrade.data.maxLevel)}`;
                return <Text size="xsmall" data-spelunking-upgrade-level={row.upgrade.index}>{value}</Text>;
            },
        },
        {
            property: 'description',
            header: 'Effect',
            render: (row: ShopRow) => (
                <Box direction="row" align="start" gap="xsmall">
                    <Text size="xsmall" style={{ whiteSpace: 'pre-line' }} data-spelunking-upgrade-description={row.upgrade.index}>
                        {row.description}
                    </Text>
                    {(row.upgrade.index === 27 || row.upgrade.index === 28) && (
                        <TipDisplay heading="Saved-account chance" size="small" body="Current-delve modifiers are excluded.">
                            <Box tabIndex={0} aria-label="Saved-account chance; current-delve modifiers excluded">
                                <CircleInformation size="small" color={normalizeColor('accent-2', theme)} />
                            </Box>
                        </TipDisplay>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <Box data-spelunking-shop>
            <UpgradeTable
                tableName="Spelunking Amber shop upgrades"
                columns={columns}
                data={rows}
                primaryKey="id"
                filters={filters}
                onFiltersChange={setFilters}
                sortOptions={[
                    { label: 'In-game order', value: 'default' },
                    { label: 'Name', value: 'name' },
                    { label: 'Level', value: 'level' },
                ]}
                searchPlaceholder="Search upgrades or effects..."
                minWidth="760px"
            />
        </Box>
    );
}

function bonusDetails(upgrades: Upgrade[], spelunking: Spelunking) {
    return upgrades.map(upgrade => (
        <Text key={upgrade.index} size="xsmall" data-spelunking-summary-bonus={upgrade.index}>
            {formatShopDescription(upgrade, spelunking)}
        </Text>
    ));
}

export function SpelunkingPart3Summary({ spelunking }: SpelunkingPart3Props) {
    const { elixirs, manic, overstim, trackometer } = spelunking;
    const manicUpgrades = spelunking.upgrades.filter(upgrade => upgrade.index >= 54 && upgrade.index <= 56);
    const trackometerUpgrades = spelunking.upgrades.filter(upgrade => upgrade.index >= 59 && upgrade.index <= 61);

    return (
        <Box direction="row" wrap gap="small" data-spelunking-part3-summary>
            <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card="amber">
                <Text size="12px" color="accent-2">Owned Amber</Text>
                <Box direction="row" align="center" gap="small">
                    <IconImage data={spelunking.currentAmberDenomination.getImageData()} scale={0.9} />
                    <Text size="30px" weight={500} data-spelunking-amber-value>
                        {spelunking.currentAmberDenomination.formatAmount(spelunking.ownedAmber)}
                    </Text>
                </Box>
            </ShadowBox>
            <SummaryMetric label="Memorization slots" value={commaNotation(elixirs.memorizeLimit)} />
            <SummaryMetric label="Consumption reduction" value={`${notateNumber(elixirs.consumptionReduction * 100, 'Smaller')}%`} />
            <SummaryMetric
                label="Manic Mode"
                value={manic.enabled ? 'On' : 'Off'}
                detail={<Box gap="xsmall" data-spelunking-manic-detail>
                    <Text size="xsmall">{manic.unlocked ? 'Unlocked' : 'Locked'} · {manic.staminaCostMultiplier}× stamina cost</Text>
                    <Text size="xsmall">Total Manic depth: {commaNotation(manic.totalDepth)}</Text>
                    {spelunking.tunnels.map(tunnel => (
                        <Text key={tunnel.index} size="xsmall">
                            {tunnel.data.name}: {commaNotation(manic.depthByTunnel[tunnel.index] ?? 0)}
                        </Text>
                    ))}
                    {bonusDetails(manicUpgrades, spelunking)}
                </Box>}
            />
            <SummaryMetric
                label="Overstim"
                value={`Level ${commaNotation(overstim.level)}`}
                icon={overstimIcon}
                detail={<Box gap="xsmall" data-spelunking-overstim-detail>
                    <Text size="xsmall">{overstim.unlocked ? 'Unlocked' : 'Locked'}</Text>
                    <Text size="xsmall">Saved progress: {commaNotation(overstim.fill)} / {commaNotation(overstim.threshold)}</Text>
                    <Text size="xsmall">Amber gain multiplier: {formatMultiplier(overstim.amberMultiplier)}×</Text>
                    {bonusDetails([spelunking.upgrades[6]], spelunking)}
                </Box>}
            />
            <SummaryMetric
                label="Trackometer"
                value={`Level ${commaNotation(trackometer.level)}`}
                icon={trackometerIcon}
                detail={<Box gap="xsmall" data-spelunking-trackometer-detail>
                    <Text size="xsmall">{trackometer.unlocked ? 'Unlocked' : 'Locked'}</Text>
                    <Text size="xsmall">Saved progress: {commaNotation(trackometer.fill)} / {commaNotation(trackometer.threshold)}</Text>
                    {bonusDetails(trackometerUpgrades, spelunking)}
                </Box>}
            />
        </Box>
    );
}

function SummaryMetric({ label, value, icon, detail }: { label: string; value: string; icon?: ImageData; detail?: ReactNode }) {
    const labelContent = (
        <Box direction="row" align="center" gap="xxsmall">
            <Text size="12px" color="accent-2">{label}</Text>
            {detail && (
                <TipDisplay heading={label} size="small" maxWidth="520px" body={detail}>
                    <Box tabIndex={0} aria-label={`${label} details`}>
                        <CircleInformation size="small" />
                    </Box>
                </TipDisplay>
            )}
        </Box>
    );

    return (
        <ShadowBox background="dark-1" pad="small" gap="xxsmall" data-spelunking-summary-card={label}>
            <ComponentAndLabel
                label={labelContent}
                component={<Box direction="row" align="center" gap="xsmall">
                    {icon && <IconImage data={icon} scale={0.7} />}
                    <Text size="16px">{value}</Text>
                </Box>}
            />
        </ShadowBox>
    );
}

export function SpelunkingElixirs({ spelunking }: SpelunkingPart3Props) {
    const { elixirs } = spelunking;

    return (
        <ElixirGrid data-spelunking-elixirs>
            {elixirs.records.map(record => {
                const memorized = elixirs.memorizedIndices.includes(record.index);
                const equippedSlots = elixirs.equippedSlots.flatMap((index, slot) => index === record.index ? [slot + 1] : []);
                const description = elixirs.descriptions[record.index].replace(/\s*@\s*/g, '\n').trim();
                return (
                    <ElixirCard
                        key={record.index}
                        $memorized={memorized}
                        $owned={record.index < elixirs.ownedCount}
                        data-spelunking-elixir={record.index}
                        data-spelunking-elixir-memorized={memorized}
                        data-spelunking-elixir-owned={record.index < elixirs.ownedCount}
                    >
                        <img src={elixirImages[record.index]} alt={`Elixir ${record.index + 1}`} loading="lazy" referrerPolicy="no-referrer" />
                        <Box gap="xxsmall">
                            {memorized && <Text size="11px" weight={500} color="#ffe09a">Memorized</Text>}
                            <Text size="11px" color="accent-2">
                                {record.index < elixirs.ownedCount ? 'Owned' : 'Not owned'}
                                {equippedSlots.length > 0 && ` · Equipped: ${equippedSlots.join(', ')}`}
                            </Text>
                            <Text size="xsmall" style={{ whiteSpace: 'pre-line' }} data-spelunking-elixir-description={record.index}>
                                {description}
                            </Text>
                        </Box>
                    </ElixirCard>
                );
            })}
        </ElixirGrid>
    );
}
