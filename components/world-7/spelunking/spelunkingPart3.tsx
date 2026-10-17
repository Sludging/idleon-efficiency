import { useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Meter, Text, ThemeContext } from 'grommet';
import type { DataTableProps, ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { CircleInformation } from 'grommet-icons';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import RoundedShadowBox from '../../base/RoundedShadowBox';
import TipDisplay from '../../base/TipDisplay';
import { UpgradeTable } from '../../account/shared/UpgradeTable';
import type { FilterOptions } from '../../account/shared/UpgradeTableFilters';
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
    totalBonus?: string;
    locked: boolean;
    maxed: boolean;
}


const overstimIcon: ImageData = { location: 'CaveShopUpg7', width: 34, height: 34 };
const trackometerIcon: ImageData = { location: 'CaveShopUpg60', width: 34, height: 34 };

const ElixirGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 999px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 599px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const ElixirCard = styled(RoundedShadowBox)<{ $memorized: boolean; $owned: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    min-height: 200px;
    padding: 16px;
    border-color: ${({ $memorized }) => $memorized ? '#e1b454' : undefined};
    background: ${({ $memorized }) => $memorized ? '#29271f' : undefined};
    opacity: ${({ $owned }) => $owned ? 1 : 0.76};
`;

const ElixirCardHeader = styled.div`
    display: flex;
    min-height: 46px;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

const ElixirStatus = styled.span<{ $status: 'equipped' | 'memorized' }>`
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 2px 8px;
    background: ${({ $status, theme }: { $status: 'equipped' | 'memorized'; theme: ThemeType }) => $status === 'equipped'
        ? `color-mix(in srgb, ${normalizeColor('status-ok', theme)} 18%, transparent)`
        : 'rgba(225, 180, 84, 0.16)'};
    color: ${({ $status, theme }: { $status: 'equipped' | 'memorized'; theme: ThemeType }) => $status === 'equipped'
        ? normalizeColor('status-ok', theme)
        : '#ffe09a'};
    font-size: 11px;
    font-weight: 600;
    line-height: 1.4;

    ${({ $status }) => $status === 'equipped' && `
        &::before {
            width: 5px;
            height: 5px;
            margin-right: 5px;
            border-radius: 50%;
            background: currentColor;
            content: '';
        }
    `}
`;

const ElixirFooter = styled.div`
    border-top: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    padding-top: 10px;
`;

const ElixirSummaryStrip = styled.div`
    display: flex;
    align-items: stretch;
    gap: 32px;
    border-top: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    padding: 12px 0;
`;

const ElixirSummaryMetric = styled.div`
    display: flex;
    min-width: 92px;
    flex-direction: column;
    gap: 4px;
`;

const ElixirSummaryDivider = styled.div`
    width: 1px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
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

interface ShopDescriptionPiece {
    text: string;
    emphasize: boolean;
}

function getShopDescriptionPieces(
    upgrade: Upgrade,
    spelunking: Spelunking,
    omitTotalBonus = false,
    sourceText = upgrade.data.description
): ShopDescriptionPiece[] {
    let description = sourceText;
    if (omitTotalBonus) {
        const totalBonusStart = description.indexOf(' @ Total Bonus:');
        if (totalBonusStart !== -1) description = description.slice(0, totalBonusStart);
    }
    if (upgrade.index === 43) {
        description = description.replace('1 in $ ', '');
    }

    const bonusValue = upgrade.level === -1 ? upgrade.data.bonusPerLevel : upgrade.getBonus();
    const pieces = description.split(/([{}^$~@#])/);

    return pieces.flatMap(piece => {
        if (piece === '#') {
            let value: string;
            if (upgrade.index === 27) value = commaNotation(spelunking.exaltedStampFragments);
            else if (upgrade.index === 28) value = commaNotation(spelunking.prismaBubblesFound);
            else if (upgrade.index === 40) value = commaNotation(spelunking.bestUnlockedTool.data.damageMultiplier);
            else throw new Error(`No Spelunking detail binding for upgrade ${upgrade.index}`);
            return [{ text: value, emphasize: false }];
        }

        let value: string | undefined;
        switch (piece) {
            case '{':
                value = commaNotation(bonusValue);
                break;
            case '}':
                value = formatMultiplier(1 + bonusValue / 100);
                break;
            case '^':
                value = sourceCount(upgrade, spelunking);
                break;
            case '$':
                value = sourceDollar(upgrade, spelunking);
                break;
            case '~':
                value = (Math.floor(upgrade.sourceBonus * 10) / 10).toFixed(1);
                break;
            case '@':
                value = '\n';
                break;
        }
        if (value !== undefined) {
            return [{ text: value, emphasize: piece === '$' }];
        }
        return piece.length > 0 ? [{ text: piece, emphasize: false }] : [];
    });
}

function formatShopTotalBonus(upgrade: Upgrade, spelunking: Spelunking): string | undefined {
    const description = upgrade.data.description;
    const totalBonusStart = description.indexOf(' @ Total Bonus:');
    if (totalBonusStart === -1) return undefined;

    const clause = description.slice(totalBonusStart + 3).replace('Total Bonus:', '');
    return getShopDescriptionPieces(upgrade, spelunking, false, clause)
        .map(piece => piece.text)
        .join('');
}



export function formatShopDescription(upgrade: Upgrade, spelunking: Spelunking): string {
    return getShopDescriptionPieces(upgrade, spelunking).map(piece => piece.text).join('');
}

function ShopCost({
    amount,
    label,
    spelunking,
    upgrade,
    locked,
    maxed,
    attribute,
}: {
    amount: number | undefined;
    label?: string;
    spelunking: Spelunking;
    upgrade: Upgrade;
    locked: boolean;
    maxed: boolean;
    attribute: 'next' | 'bulk';
}) {
    const denomination = spelunking.currentAmberDenomination;
    const canAfford = amount !== undefined && !locked && !maxed && spelunking.canAffordUpgrade(upgrade, amount);
    const text = maxed ? 'Maxed' : amount === undefined ? '—' : denomination.formatAmount(amount);

    return (
        <Box gap="xxsmall" align="end" style={{ opacity: locked ? 0.6 : 1, minWidth: '116px' }}
            data-spelunking-cost={attribute}
            data-spelunking-cost-value={amount}
            data-spelunking-cost-affordable={canAfford}
        >
            {label && <Text size="11px" color="accent-2">{label}</Text>}
            {amount === undefined || maxed ? (
                <Text size="xsmall" data-spelunking-cost-text={attribute}>{text}</Text>
            ) : (
                <Box direction="row" align="center" gap="xxsmall" data-spelunking-cost-row={attribute}>
                    <IconImage data={denomination.getImageData()} scale={0.42} />
                    <TipDisplay heading="Amber quote" size="small"
                        body={<Text size="small">Base Amber: {notateNumber(amount, 'Big')}</Text>}>
                        <Text size="xsmall" color={canAfford ? 'green-1' : undefined}
                            data-spelunking-cost-text={attribute}>{text}</Text>
                    </TipDisplay>
                </Box>
            )}
        </Box>
    );
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
                totalBonus: formatShopTotalBonus(upgrade, spelunking),
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

    const columns: NonNullable<DataTableProps<ShopRow>['columns']> = [
        {
            property: 'upgrade',
            header: 'Upgrade',
            size: '190px',
            render: (row: ShopRow) => (
                <Box direction="row" gap="small" align="center" data-spelunking-upgrade-name={row.upgrade.index}
                    style={{ opacity: row.locked ? 0.6 : 1, minWidth: '180px' }}>
                    <IconImage data={{ location: `CaveShopUpg${row.upgrade.index}`, width: 34, height: 34 }} scale={0.6} />
                    <Text size="xsmall" weight={700}>{row.upgrade.data.name}</Text>
                    {row.locked && (
                        <TipDisplay heading="Locked upgrade" size="small" body={
                            <Text size="small">
                                The description shows potential source effects. Owned bonus is 0 while locked.
                                The first purchase unlocks level 0; it does not grant a level-1 effect.
                            </Text>
                        }>
                            <Box tabIndex={0} aria-label={`Potential effect details for ${row.upgrade.data.name}`}>
                                <CircleInformation size="small" color={normalizeColor('accent-2', theme)} />
                            </Box>
                        </TipDisplay>
                    )}
                </Box>
            ),
        },
        {
            property: 'level',
            header: 'Level / prerequisite',
            size: '130px',
            render: (row: ShopRow) => {
                if (row.locked) {
                    const prerequisite = row.upgrade.index === 0
                        ? undefined
                        : spelunking.upgrades[row.upgrade.data.requiredUpgrades].data.name;
                    return <Box style={{ opacity: 0.6 }}>
                        <Text size="xsmall" data-spelunking-upgrade-level={row.upgrade.index}>{prerequisite}</Text>
                    </Box>;
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
            size: '34%',
            render: (row: ShopRow) => (
                <Box direction="row" align="start" gap="xsmall" style={{ opacity: row.locked ? 0.6 : 1, minWidth: '300px' }}>
                    <Text size="xsmall" style={{ whiteSpace: 'pre-line' }} data-spelunking-upgrade-description={row.upgrade.index}>
                        {getShopDescriptionPieces(row.upgrade, spelunking, true).map((piece, index) =>
                            piece.emphasize
                                ? <strong key={index} style={{ fontWeight: 700 }}>{piece.text}</strong>
                                : <span key={index}>{piece.text}</span>
                        )}
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
        {
            property: 'totalBonus',
            header: 'Total bonus',
            size: '180px',
            render: (row: ShopRow) => (
                <Text size="xsmall" weight={700} style={{ opacity: row.locked ? 0.6 : 1 }}
                    data-spelunking-total-bonus={row.upgrade.index}>
                    {row.totalBonus ?? '—'}
                </Text>
            ),
        },
        {
            property: 'nextCost',
            header: 'Next cost',
            size: '130px',
            align: 'end',
            render: (row: ShopRow) => (
                <ShopCost amount={row.upgrade.nextCost} spelunking={spelunking} upgrade={row.upgrade}
                    locked={row.locked} maxed={row.maxed} attribute="next" />
            ),
        },
        {
            property: 'bulkCost',
            header: (
                <TipDisplay heading="Bulk Amber quote" size="small"
                    body="Fixed-input projection; current discounts and account inputs stay unchanged.">
                    <Box direction="row" align="center" gap="xxsmall">
                        <Text size="xsmall">Bulk cost</Text>
                        <CircleInformation size="small" color={normalizeColor('accent-2', theme)} />
                    </Box>
                </TipDisplay>
            ),
            size: '170px',
            align: 'end',
            render: (row: ShopRow) => {
                const remaining = row.upgrade.remainingCap;
                const amount = remaining === undefined ? row.upgrade.costNext10 : row.upgrade.costToMax;
                const label = remaining === undefined
                    ? 'Next 10'
                    : `To max · ${remaining} purchases remain`;
                return (
                    <Box data-spelunking-bulk-purchases={remaining ?? 10}>
                        <ShopCost amount={amount} label={row.maxed ? undefined : label} spelunking={spelunking}
                            upgrade={row.upgrade} locked={row.locked} maxed={row.maxed} attribute="bulk" />
                    </Box>
                );
            },
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
                minWidth="1200px"
                variant="panel"
            />
        </Box>
    );
}


function DetailRows({ rows }: { rows: Array<[string, string]> }) {
    return (
        <Box style={{ display: 'grid', gridTemplateColumns: 'minmax(112px, auto) minmax(0, 1fr)', columnGap: '16px', rowGap: '4px' }}>
            {rows.flatMap(([label, value]) => [
                <Text key={`${label}-label`} size="xsmall" color="dark-1">{label}</Text>,
                <Text key={`${label}-value`} size="xsmall" color="dark-1">{value}</Text>,
            ])}
        </Box>
    );
}
function ShopEffect({ upgrade, spelunking }: { upgrade: Upgrade; spelunking: Spelunking }) {
    return (
        <Box style={{ opacity: upgrade.unlocked ? 1 : 0.6 }}
            data-spelunking-benefit-disabled={!upgrade.unlocked}>
            <Text size="xsmall" color="dark-1" style={{ whiteSpace: 'pre-line' }}>
                {formatShopDescription(upgrade, spelunking)}
            </Text>
        </Box>
    );
}

export function SpelunkingManicModeDetail({ spelunking }: SpelunkingPart3Props) {
    const manicUpgrades = spelunking.upgrades.filter(upgrade => upgrade.index >= 54 && upgrade.index <= 56);
    return (
        <Box gap="small" data-spelunking-manic-detail>
            <Text size="xsmall" weight={500}>Progress</Text>
            <DetailRows rows={[
                ['Total Manic depth', commaNotation(spelunking.manic.totalDepth)],
                ['Stamina cost', `${spelunking.manic.staminaCostMultiplier}×`],
            ]} />
            <Text size="xsmall" weight={500}>Depth by tunnel</Text>
            <DetailRows rows={spelunking.tunnels.map(tunnel =>
                [tunnel.data.name, commaNotation(spelunking.manic.depthByTunnel[tunnel.index] ?? 0)] as [string, string]
            )} />
            <Text size="xsmall" weight={500}>Shop effects</Text>
            {manicUpgrades.map(upgrade => <ShopEffect key={upgrade.index} upgrade={upgrade} spelunking={spelunking} />)}
        </Box>
    );
}

export function SpelunkingPart3Summary({ spelunking }: SpelunkingPart3Props) {
    const { overstim, trackometer } = spelunking;
    const trackometerUpgrades = spelunking.upgrades.filter(upgrade => upgrade.index >= 59 && upgrade.index <= 61);
    return (
        <>
            <Box gap="xsmall" data-spelunking-summary-card="amber">
                <Text size="small" color="accent-2">Amber</Text>
                <Box direction="row" align="center" gap="small">
                    <IconImage data={spelunking.currentAmberDenomination.getImageData()} scale={0.7} />
                    <Text size="40px" weight={600} data-spelunking-amber-value>
                        {spelunking.currentAmberDenomination.formatAmount(spelunking.ownedAmber)}
                    </Text>
                </Box>
            </Box>
            <Box gap="small" data-spelunking-part3-summary>
                <SummaryMetric label="Overstim" value={`Level ${commaNotation(overstim.level)}`} icon={overstimIcon}
                    progress={{ fill: overstim.fill, threshold: overstim.threshold, label: 'Overstim saved progress' }}
                    detail={<Box gap="small" data-spelunking-overstim-detail>
                        <Text size="xsmall" weight={500}>Progress</Text>
                        <DetailRows rows={[
                            ['Saved fill', commaNotation(overstim.fill)],
                            ['Next threshold', commaNotation(overstim.threshold)],
                            ['Amber multiplier', `${formatMultiplier(overstim.amberMultiplier)}×`],
                        ]} />
                        <Text size="xsmall" weight={500}>Shop effect</Text>
                        <ShopEffect upgrade={spelunking.upgrades[6]} spelunking={spelunking} />
                    </Box>}
                />
                <SummaryMetric label="Trackometer" value={`Level ${commaNotation(trackometer.level)}`} icon={trackometerIcon}
                    progress={{ fill: trackometer.fill, threshold: trackometer.threshold, label: 'Trackometer saved progress' }}
                    detail={<Box gap="small" data-spelunking-trackometer-detail>
                        <Text size="xsmall" weight={500}>Progress</Text>
                        <DetailRows rows={[
                            ['Saved fill', commaNotation(trackometer.fill)],
                            ['Next threshold', commaNotation(trackometer.threshold)],
                        ]} />
                        <Text size="xsmall" weight={500}>Shop effects</Text>
                        {trackometerUpgrades.map(upgrade => <ShopEffect key={upgrade.index} upgrade={upgrade} spelunking={spelunking} />)}
                    </Box>}
                />
            </Box>
        </>
    );
}

function SummaryMetric({ label, value, icon, detail, progress }: {
    label: string;
    value: string;
    icon?: ImageData;
    detail?: ReactNode;
    progress?: { fill: number; threshold: number; label: string };
}) {
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

    const progressValue = progress && progress.threshold > 0
        ? Math.min(100, progress.fill / progress.threshold * 100)
        : 0;

    return (
        <Box gap="xxsmall" data-spelunking-summary-card={label}>
            <Box direction="row" align="center" justify="between" gap="xsmall">
                <Box direction="row" align="center" gap="xsmall">
                    {icon && <IconImage data={icon} scale={0.7} />}
                    {labelContent}
                </Box>
                <Text size="16px">{value}</Text>
            </Box>
            {progress && <Meter aria-label={progress.label}
                values={[{ value: progressValue, color: 'brand' }]} max={100}
                thickness="6px" size="full" background="grey-1" round
                data-spelunking-meter-value={progressValue} />}
        </Box>
    );
}

function ElixirSummary({ spelunking }: SpelunkingPart3Props) {
    const { elixirs } = spelunking;
    return (
        <ElixirSummaryStrip data-spelunking-elixir-summary>
            <ElixirSummaryMetric>
                <Text size="16px" weight={600} data-spelunking-memorization-slots>
                    {commaNotation(elixirs.memorizeLimit)}
                </Text>
                <Text size="xsmall" color="accent-2">Memorization slots</Text>
            </ElixirSummaryMetric>
            <ElixirSummaryDivider aria-hidden="true" />
            <ElixirSummaryMetric>
                <Text size="16px" weight={600} data-spelunking-consumption-reduction>
                    {`${notateNumber(elixirs.consumptionReduction * 100, 'Smaller')}%`}
                </Text>
                <Text size="xsmall" color="accent-2">Consumption reduction</Text>
            </ElixirSummaryMetric>
        </ElixirSummaryStrip>
    );
}

export function SpelunkingElixirs({ spelunking }: SpelunkingPart3Props) {
    const { elixirs } = spelunking;
    const theme = useContext(ThemeContext);

    return (
        <Box gap="medium" data-spelunking-elixirs-view>
            <ElixirSummary spelunking={spelunking} />
            <ElixirGrid data-spelunking-elixirs>
                {elixirs.records.map(record => {
                    const memorized = elixirs.memorizedIndices.includes(record.index);
                    const equippedSlots = elixirs.equippedSlots.flatMap((index, slot) => index === record.index ? [slot + 1] : []);
                    const owned = record.index < elixirs.ownedCount;
                    const segments = elixirs.descriptions[record.index].split(/\s*@\s*/);
                    const lastSegment = segments[segments.length - 1];
                    const footer = lastSegment.startsWith('(') && lastSegment.endsWith(')') ? segments.pop() : undefined;
                    const description = segments.join(' ');
                    const fullDescription = footer ? `${description} ${footer}` : description;
                    return (
                        <ElixirCard
                            key={record.index}
                            background="dark-1"
                            $memorized={memorized}
                            $owned={owned}
                            data-spelunking-elixir={record.index}
                            data-spelunking-elixir-owned={owned}
                            data-spelunking-elixir-memorized={memorized}
                            data-spelunking-elixir-equipped-slots={equippedSlots.join(',')}
                        >
                            <ElixirCardHeader>
                                <IconImage data={elixirs.getImageData(record.index)} />
                                {memorized && <ElixirStatus $status="memorized">Memorized</ElixirStatus>}
                                {equippedSlots.map(slot => (
                                    <Box key={slot} direction="row" align="center" gap="xsmall">
                                        <ElixirStatus $status="equipped">Equipped</ElixirStatus>
                                        <Text size="xsmall" color="accent-2">Slot {slot}</Text>
                                    </Box>
                                ))}
                                {!owned && <TipDisplay heading="Potential Elixir benefit" size="small" body={
                                    <Text size="small" color="dark-1" style={{ whiteSpace: 'pre-line', opacity: 0.6 }}
                                        data-spelunking-elixir-benefit={record.index}>{fullDescription}</Text>
                                }>
                                    <Box tabIndex={0} aria-label={`Potential benefit for Elixir ${record.index + 1}`}>
                                        <CircleInformation size="small" color={normalizeColor('accent-2', theme)} />
                                    </Box>
                                </TipDisplay>}
                            </ElixirCardHeader>
                            <Box flex="grow" gap="small" data-spelunking-elixir-description={record.index}>
                                <Text size="xsmall" style={{ whiteSpace: 'pre-line' }}>
                                    {description}
                                </Text>
                                {footer && (
                                    <ElixirFooter data-spelunking-elixir-footer={record.index}>
                                        <Text size="xsmall" color="accent-2">{footer}</Text>
                                    </ElixirFooter>
                                )}
                            </Box>
                        </ElixirCard>
                    );
                })}
            </ElixirGrid>
        </Box>
    );
}

