import { useContext, useState } from 'react';
import { Box, CheckBox, Grid, Meter, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import { ComponentAndLabel } from '../../base/TextAndLabel';
import type { Spelunking, Upgrade } from '../../../data/domain/world-7/spelunking';
import { commaNotation, notateNumber } from '../../../data/utility';

interface SpelunkingPart3Props {
    spelunking: Spelunking;
}

const Part3Table = styled.table<{ $muted: string }>`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 12px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
    th { color: ${({ $muted }) => $muted}; font-weight: 400; text-align: left; }
    th, td { padding: 0 6px 0 0; vertical-align: middle; }
    th:last-child, td:last-child { padding-right: 0; }
`;

const shopIcon = (index: number) => ({ location: `CaveShopUpg${index}`, width: 34, height: 34 });
const toolIconIndex: Record<number, number> = { 1: 14, 2: 15, 3: 16, 4: 17 };

function displaySourceText(source: string): string {
    return source.replace(/\s*@\s*/g, ' ').replace(/[{}^$]/g, '?').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

function bonusValue(value: number): string {
    return `${value >= 0 ? '+' : ''}${notateNumber(value, 'Smaller')}`;
}

export function SpelunkingShop({ spelunking }: SpelunkingPart3Props) {
    const [showLocked, setShowLocked] = useState(true);
    const theme = useContext(ThemeContext);
    return (
        <Box gap="xsmall" data-spelunking-shop>
            <Box direction="row" align="center" justify="between" gap="small">
                <Box direction="row" align="center" gap="xsmall">
                    <IconImage data={spelunking.currentAmberDenomination.getImageData()} scale={0.6} />
                    <Text size="12px">Owned Amber: {spelunking.currentAmberDenomination.formatAmount(spelunking.ownedAmber)}</Text>
                    <Text size="11px" color="accent-2">? marks quantities not established for source text.</Text>
                </Box>
                <CheckBox label="Show locked" checked={showLocked} onChange={event => setShowLocked(event.target.checked)} />
            </Box>
            <Part3Table $muted={normalizeColor('accent-2', theme)} aria-label="Spelunking Amber shop upgrades">
                <colgroup><col style={{ width: '21%' }} /><col style={{ width: '12%' }} /><col style={{ width: '22%' }} /><col style={{ width: '45%' }} /></colgroup>
                <thead><tr><th scope="col">Upgrade</th><th scope="col">Level</th><th scope="col">Prerequisite</th><th scope="col">Effect</th></tr></thead>
                <tbody>{spelunking.upgrades.filter(upgrade => showLocked || upgrade.level >= 0).map(upgrade => <ShopRow key={upgrade.index} upgrade={upgrade} spelunking={spelunking} />)}</tbody>
            </Part3Table>
        </Box>
    );
}

function ShopRow({ upgrade, spelunking }: { upgrade: Upgrade; spelunking: Spelunking }) {
    const required = upgrade.index === 0 ? undefined : spelunking.upgrades.find(entry => entry.index === upgrade.data.requiredUpgrades)!;
    const owned = upgrade.level >= 0;
    const value = owned
        ? upgrade.getEffectiveBonus(spelunking.manic.totalDepth, spelunking.trackometer.level)
        : upgrade.data.bonusPerLevel;

    return (
        <tr data-spelunking-upgrade={upgrade.index} style={{ opacity: owned ? 1 : 0.7 }}>
            <td>
                <Box direction="row" align="center" gap="xsmall">
                    <IconImage data={shopIcon(upgrade.index)} scale={0.6} />
                    <Text size="12px">{upgrade.data.name}</Text>
                </Box>
            </td>
            <td>{commaNotation(upgrade.level)} / {commaNotation(upgrade.data.maxLevel)}</td>
            <td>{required ? `${required.data.name} · level 0` : 'None'}</td>
            <td>
                <Box gap="xxsmall">
                    <Text size="12px" data-spelunking-upgrade-bonus={value}>{owned ? 'Owned bonus' : 'Per level'}: {bonusValue(value)}</Text>
                    <Text size="11px" color="accent-2" data-spelunking-upgrade-source={upgrade.index}>{displaySourceText(upgrade.data.description)}</Text>
                </Box>
            </td>
        </tr>
    );
}


export function SpelunkingEquipment({ spelunking }: SpelunkingPart3Props) {
    const theme = useContext(ThemeContext);
    const elixirs = spelunking.elixirs;

    return (
        <Box gap="small" data-spelunking-equipment>
            <Part3Table $muted={normalizeColor('accent-2', theme)} aria-label="Spelunking tools">
                <colgroup><col style={{ width: '19%' }} /><col style={{ width: '14%' }} /><col style={{ width: '16%' }} /><col style={{ width: '19%' }} /><col style={{ width: '32%' }} /></colgroup>
                <thead><tr><th scope="col">Tool</th><th scope="col">Stamina</th><th scope="col">Hit radius</th><th scope="col">Damage</th><th scope="col">Availability</th></tr></thead>
                <tbody>{spelunking.tools.map(tool => {
                    const unlock = tool.data.unlock;
                    const unlocked = tool.isUnlocked(index => spelunking.upgrades.find(upgrade => upgrade.index === index)!.getBonus());
                    const iconIndex = toolIconIndex[tool.index];
                    return <tr key={tool.index} data-spelunking-tool={tool.index} style={{ opacity: unlocked ? 1 : 0.7 }}>
                        <td><Box direction="row" align="center" gap="xsmall">
                            {iconIndex !== undefined && <IconImage data={shopIcon(iconIndex)} scale={0.6} />}
                            <Text size="12px">{tool.data.name}</Text>
                        </Box></td>
                        <td>{commaNotation(tool.data.baseStaminaCost)}</td>
                        <td>{commaNotation(tool.data.hitRadius)} px</td>
                        <td>{commaNotation(tool.data.damageMultiplier)}×</td>
                        <td>{unlock.kind === 'default' ? 'Unlocked' : unlock.kind === 'unavailable' ? 'Unavailable' : unlock.kind === 'upgrade' ? unlocked ? 'Unlocked' : `Requires ${spelunking.upgrades.find(upgrade => upgrade.index === unlock.upgradeIndex)!.data.name}` : 'Unknown'}</td>
                    </tr>;
                })}</tbody>
            </Part3Table>
            <Box gap="xsmall" data-spelunking-auto>
                <Text size="small" weight={500}>Automatic tool use</Text>
                <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                    <ComponentAndLabel label="Full-clear setting" component={<Text size="12px">{spelunking.automaticToolUse.fullClearSetting ? 'On' : 'Off'}</Text>} />
                    <ComponentAndLabel label="AUTO eligible" component={<Text size="12px">{spelunking.automaticToolUse.eligible ? 'Yes' : 'No'}</Text>} />
                </Grid>
            </Box>
            <Box gap="xsmall" data-spelunking-elixirs>
                <Text size="small" weight={500}>Elixirs</Text>
                <Text size="11px" color="accent-2">? marks quantities not exported in the source data.</Text>
                <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="small">
                    <Text size="12px">Owned: {elixirs.ownedCount} / {elixirs.records.length}</Text>
                    <Text size="12px">Equipment slots: {elixirs.slotLimit} · Duplicate limit: {elixirs.duplicateLimit}</Text>
                    <Text size="12px">Memorize slots: {elixirs.memorizeLimit} · Consumption reduction: {notateNumber(elixirs.consumptionReduction * 100, 'Smaller')}%</Text>
                </Grid>
                <Part3Table $muted={normalizeColor('accent-2', theme)} aria-label="Spelunking elixirs">
                    <colgroup><col style={{ width: '34%' }} /><col style={{ width: '66%' }} /></colgroup>
                    <thead><tr><th scope="col">Elixir and saved state</th><th scope="col">Intrinsic description</th></tr></thead>
                    <tbody>{elixirs.records.map(record => {
                        const equipmentSlots = elixirs.equippedSlots.flatMap((index, slot) => index === record.index ? [slot + 1] : []);
                        return <tr key={record.index} data-spelunking-elixir={record.index} style={{ opacity: record.index < elixirs.ownedCount ? 1 : 0.7 }}>
                            <td><Box gap="xxsmall">
                                <Text size="12px">Elixir {record.index + 1}</Text>
                                <Text size="11px" color="accent-2">Equipped: {equipmentSlots.length === 0 ? 'No' : `slot ${equipmentSlots.join(', ')}`} · Memorized: {elixirs.memorizedIndices.includes(record.index) ? 'Yes' : 'No'}</Text>
                            </Box></td>
                            <td>{displaySourceText(record.data.description)}</td>
                        </tr>;
                    })}</tbody>
                </Part3Table>
            </Box>
        </Box>
    );
}

function Progress({ fill, threshold, label }: { fill: number; threshold: number; label: string }) {
    const percentage = threshold > 0 ? Math.min(100, fill / threshold * 100) : 0;
    return <Box gap="xxsmall" data-spelunking-progress-fill={fill} data-spelunking-progress-threshold={threshold}>
        <Text size="11px" color="accent-2">{commaNotation(fill)} / {commaNotation(threshold)}</Text>
        <Box direction="row" align="center" gap="xsmall">
            <Box flex><Meter aria-label={label} values={[{ value: percentage, color: 'brand' }]} max={100} thickness="6px" size="full" background="grey-1" round /></Box>
            <Text size="11px" style={{ width: '36px', textAlign: 'right' }}>{percentage.toFixed(1)}%</Text>
        </Box>
    </Box>;
}

function AdvancedView({ spelunking }: SpelunkingPart3Props) {
    const { manic, overstim, trackometer } = spelunking;
    const manicEffects = [54, 55, 56].map(index => spelunking.upgrades.find(upgrade => upgrade.index === index)!);
    const trackometerEffects = [59, 60, 61].map(index => spelunking.upgrades.find(upgrade => upgrade.index === index)!);
    return (
        <Grid columns={['minmax(0, 1.15fr)', 'minmax(0, 0.8fr)', 'minmax(0, 1.05fr)']} gap="12px" align="start" data-spelunking-advanced>
            <Box background="dark-1" pad="small" gap="xsmall" data-spelunking-manic>
                <Text size="small" weight={500}>Manic Mode</Text>
                <Text size="12px">Mode: {manic.enabled ? 'On' : 'Off'}</Text>
                <Text size="12px">{manic.unlocked ? 'Unlocked' : 'Locked'}</Text>
                <Text size="12px">{manic.staminaCostMultiplier}× stamina cost</Text>
                <Text size="12px">Best total depth: {commaNotation(manic.totalDepth)}</Text>
                <Box gap="xxsmall">{spelunking.tunnels.map(tunnel => <Text key={tunnel.index} size="11px" color="accent-2">{tunnel.data.name}: {commaNotation(manic.depthByTunnel[tunnel.index] ?? 0)}</Text>)}</Box>
                <Box gap="xsmall">{manicEffects.map(upgrade => <Effect
                    key={upgrade.index}
                    name={upgrade.index === 54 ? 'Manic POW' : upgrade.index === 55 ? 'Manic Grand Discovery Chance' : 'Manic Spelunking Efficiency'}
                    value={upgrade.getEffectiveBonus(manic.totalDepth, trackometer.level)}
                    unit="%"
                    detail={displaySourceText(upgrade.data.description)}
                />)}</Box>
            </Box>
            <Box background="dark-1" pad="small" gap="xsmall" data-spelunking-overstim>
                <Text size="small" weight={500}>Overstim</Text>
                <Text size="12px">{overstim.unlocked ? 'Unlocked' : 'Locked'} · Level {commaNotation(overstim.level)}</Text>
                <Progress fill={overstim.fill} threshold={overstim.threshold} label="Overstim progress" />
                <Effect
                    name="Amber per level"
                    value={overstim.bonusPerLevel}
                    unit="%"
                    detail={displaySourceText(spelunking.upgrades.find(upgrade => upgrade.index === 6)!.data.description)}
                />
                <Effect name="Amber gain multiplier" value={overstim.amberMultiplier} multiplier />
            </Box>
            <Box background="dark-1" pad="small" gap="xsmall" data-spelunking-trackometer>
                <Text size="small" weight={500}>Trackometer</Text>
                <Text size="12px">{trackometer.unlocked ? 'Unlocked' : 'Locked'} · Level {commaNotation(trackometer.level)}</Text>
                <Progress fill={trackometer.fill} threshold={trackometer.threshold} label="Trackometer progress" />
                <Box gap="xsmall">{trackometerEffects.map(upgrade => <Effect
                    key={upgrade.index}
                    name={upgrade.index === 59 ? 'Stamina EXP gain' : upgrade.index === 60 ? 'Amber gain' : 'Maximum stamina'}
                    value={upgrade.getEffectiveBonus(manic.totalDepth, trackometer.level)}
                    unit={upgrade.index === 61 ? 'stamina' : '%'}
                    detail={`Per Trackometer level: ${bonusValue(upgrade.getBonus())}${upgrade.index === 61 ? ' stamina' : '%'} · ${displaySourceText(upgrade.data.description)}`}
                />)}</Box>
            </Box>
            <Text size="11px" color="accent-2" data-spelunking-advanced-help style={{ gridColumn: '1 / -1' }}>? marks quantities not exported in source text. Source wording remains secondary.</Text>
        </Grid>
    );
}

function Effect({ name, value, detail, multiplier = false, unit }: { name: string; value: number; detail?: string; multiplier?: boolean; unit?: string }) {
    return <Box gap="xxsmall" data-spelunking-effect={name} data-spelunking-effect-value={value}>
        <Box direction="row" justify="between" align="center" gap="small">
            <Text size="12px">{name}</Text>
            <Text size="12px">{multiplier ? `${notateNumber(value, 'Smaller')}×` : `${bonusValue(value)}${unit === '%' ? '%' : unit ? ` ${unit}` : ''}`}</Text>
        </Box>
        {detail && <Text size="11px" color="accent-2">{detail}</Text>}
    </Box>;
}

export function SpelunkingAdvanced({ spelunking }: SpelunkingPart3Props) {
    return <AdvancedView spelunking={spelunking} />;
}
