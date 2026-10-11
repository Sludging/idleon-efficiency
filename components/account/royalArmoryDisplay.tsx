'use client';

import { useContext, useMemo, useState } from "react";
import { Box, DataTableProps, Grid, Meter, Select, Stack, Text, TextInput, ThemeContext, ThemeType } from "grommet";
import { useShallow } from "zustand/react/shallow";
import styled from "styled-components";
import { normalizeColor } from "grommet/utils";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { OUTPOST_RANKS, Outpost, OutpostKind, OutpostLinkDetails, OutpostRank, RoyalMapSource } from "../../data/domain/world-6/royalArmory/outposts";
import { RoyalArmory } from "../../data/domain/world-6/royalArmory/royalArmory";
import { RoyalArmoryOrbletMarketBonus } from "../../data/domain/world-6/royalArmory/orblets";
import { RoyalArmoryUpgrade } from "../../data/domain/world-6/royalArmory/upgrades";
import { RoyalStatue } from "../../data/domain/world-6/royalArmory/statues";
import { RoyalUnitRole } from "../../data/domain/world-6/royalArmory/units";
import { RoyalResourceNode } from "../../data/domain/world-6/royalArmory/resourceNodes";
import { MapInfo } from "../../data/domain/maps";
import IconImage from "../base/IconImage";
import ShadowBox from "../base/ShadowBox";
import ContentTabs from "../base/ContentTabs";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import TipDisplay from "../base/TipDisplay";
import SmallButton from "../base/SmallButton";
import { UpgradeTable } from "./shared/UpgradeTable";
import { FilterOptions } from "./shared/UpgradeTableFilters";
import { ResourceDisplay } from "./shared/ResourceDisplay";
import { commaNotation, formatOneInChance, nFormatter, notateNumber, toTime } from "../../data/utility";

function ResourceBar({ armory, resourceTypes }: { armory: RoyalArmory, resourceTypes: number[] }) {
    return (
        <Box aria-label="Royal Armory resources" direction="row" wrap margin={{ bottom: 'medium' }}>
            {resourceTypes.map(type => {
                const resource = armory.resources.get(type);
                const quantity = resource?.quantity ?? 0;
                return (
                    <Box key={type} border={{ color: 'grey-1' }} background="accent-4" width={{ min: '100px', max: '100px' }} align="center">
                        <TipDisplay heading={commaNotation(quantity)} body="" size="medium">
                            <Box direction="row" pad={{ vertical: 'small' }} align="center" gap="xsmall">
                                {resource && <IconImage data={resource.getImageData()} scale={18 / 28} />}
                                <Text size="xsmall">{notateNumber(quantity)}</Text>
                            </Box>
                        </TipDisplay>
                    </Box>
                );
            })}
        </Box>
    );
}

const sortOptions = [
    { label: 'Display order', value: 'default' },
    { label: 'Cost ascending', value: 'cost-ascending' },
    { label: 'Cost descending', value: 'cost-descending' }
];

function upgradeDescription(upgrade: RoyalArmoryUpgrade): string {
    return upgrade.data.description.replace(/_/g, ' ').replace(/{/g, notateNumber(upgrade.getBonus()));
}

function RoyalUpgradeTable({ armory, upgrades, resourceTypes, filters, onFiltersChange, material, onMaterialChange }: {
    armory: RoyalArmory,
    upgrades: RoyalArmoryUpgrade[],
    resourceTypes: number[],
    filters: FilterOptions,
    onFiltersChange: (filters: FilterOptions) => void,
    material: number | undefined,
    onMaterialChange: (material: number | undefined) => void
}) {
    const { searchText, hideLocked, hideMaxed, sortBy } = filters;
    const materialOptions = [{ value: undefined as number | undefined }, ...resourceTypes.map(value => ({ value }))];
    const visible = upgrades.filter(upgrade =>
        (!hideLocked || upgrade.isUnlocked()) &&
        (!hideMaxed || !upgrade.isMaxLevel()) &&
        (material === undefined || upgrade.getPurchaseResourceType() === material) &&
        `${upgrade.data.name} ${upgradeDescription(upgrade)}`.toLowerCase().includes(searchText.toLowerCase())
    );
    if (sortBy === 'cost-ascending') visible.sort((a, b) => a.getCost() - b.getCost());
    if (sortBy === 'cost-descending') visible.sort((a, b) => b.getCost() - a.getCost());

    function renderMaterialOption(type: number | undefined) {
        // An undefined material intentionally selects upgrades using any purchase resource.
        if (type === undefined) return <Text size="xsmall">All materials</Text>;
        const resource = armory.resources.get(type);
        return resource ? <IconImage data={resource.getImageData()} scale={18 / 28} /> : null;
    }

    const columns: NonNullable<DataTableProps<RoyalArmoryUpgrade>['columns']> = [
        {
            property: 'data.name',
            header: 'Upgrade',
            render: upgrade => (
                <Box id={`royal-upgrade-${upgrade.index}`} direction="row" align="center" gap="small" style={{ opacity: upgrade.isUnlocked() ? 1 : 0.5 }}>
                    <IconImage data={upgrade.getImageData()} scale={0.4} />
                    <Text size="xsmall" style={{ whiteSpace: 'normal' }}>{upgrade.data.name}</Text>
                </Box>
            )
        },
        {
            property: 'level',
            header: 'Level / cap',
            render: upgrade => (
                <Text size="xsmall" style={{ whiteSpace: 'nowrap' }}>
                    {upgrade.level}{upgrade.getMaxLevel() >= 999999 ? '' : ` / ${upgrade.getMaxLevel()}`}
                </Text>
            )
        },
        {
            property: 'bonus',
            header: 'Current bonus',
            render: upgrade => <Text size="xsmall" style={{ whiteSpace: 'normal' }}>{upgradeDescription(upgrade)}</Text>
        },
        {
            property: 'cost',
            header: 'Next cost',
            render: upgrade => {
                if (upgrade.isMaxLevel()) return <Text size="xsmall">—</Text>;
                const type = upgrade.getPurchaseResourceType();
                const resource = type === undefined ? undefined : armory.resources.get(type);
                const cost = upgrade.getCost();
                return (
                    <TipDisplay heading={commaNotation(cost)} body="">
                        <Box direction="row" align="center" gap="xsmall" style={{ whiteSpace: 'nowrap' }}>
                            {resource && <IconImage data={resource.getImageData()} scale={0.4} />}
                            <Text size="xsmall" color={(resource?.quantity ?? 0) >= cost ? 'green-2' : 'status-critical'}>{notateNumber(cost)}</Text>
                        </Box>
                    </TipDisplay>
                );
            }
        }
    ];

    return (
        <UpgradeTable
            tableName="Royal Armory upgrades"
            columns={columns}
            data={visible}
            primaryKey="index"
            filters={filters}
            onFiltersChange={onFiltersChange}
            sortOptions={sortOptions}
            searchPlaceholder="Search upgrades"
            emptyMessage="No upgrades match your search and filters."
            additionalFilters={
                <Box width="small">
                    <Select
                        aria-label="Material"
                        options={materialOptions}
                        value={materialOptions.find(option => option.value === material)}
                        valueKey="value"
                        onChange={({ option }) => onMaterialChange(option.value)}
                        valueLabel={<Box direction="row" align="center" pad="xsmall">{renderMaterialOption(material)}</Box>}
                    >
                        {option => <Box pad="small" align="center">{renderMaterialOption(option.value)}</Box>}
                    </Select>
                </Box>
            }
        />
    );
}

function OrbletBalance({ armory }: { armory: RoyalArmory }) {
    return (
        <Box aria-label="Orblet balance" margin={{ bottom: 'medium' }}>
            <ComponentAndLabel
                label="Orblet balance"
                component={
                    <ResourceDisplay
                        cost={armory.getOrbletsOwned()}
                        resourceImageData={armory.orbletMarketBonuses[0].getImageData()}
                        resourceImageScale={0.4}
                        textSize="large"
                        showTooltip
                        tooltipHeading="Exact Orblet balance"
                    />
                }
            />
        </Box>
    );
}

function OrbletCards({ offers, orbletsOwned }: { offers: RoyalArmoryOrbletMarketBonus[], orbletsOwned: number }) {
    return (
        <Grid aria-label="Orblet upgrades" columns={{ size: 'medium', count: 'fill' }} gap="medium" fill style={{ gridAutoRows: '1fr' }}>
            {offers.map(offer => {
                const level = offer.getLevel();
                const cap = offer.getMaxLevel();
                const maxed = level !== undefined && cap !== undefined && level >= cap;
                const nextValue = offer.getNextValue();
                return (
                    <ShadowBox key={offer.index} id={`royal-orblet-${offer.index}`} background="dark-1" pad="medium" gap="small" style={{ opacity: level === 0 ? 0.5 : 1 }}>
                        <Box direction="row" align="center" justify="between" gap="small">
                            <Text size="small" weight={500}>{offer.data.name.replace(/_/g, ' ')}</Text>
                            {level !== undefined && <Text size="xsmall">Lv. {level}{cap === undefined ? '' : ` / ${cap}`}</Text>}
                        </Box>
                        <Box justify="between" flex="grow" gap="small">
                            <Box gap="small">
                                <TextAndLabel label="Current bonus" text={offer.getCurrentValue()} textSize="large" />
                                {nextValue !== undefined && <Text size="small" color="accent-2">Next bonus: {nextValue}</Text>}
                                <Text size="small">{offer.getDescription(true)}</Text>
                            </Box>
                            <TextAndLabel
                                label="Next cost"
                                text={maxed ? '—' : notateNumber(offer.getCost())}
                                textSize="small"
                                labelSize="xsmall"
                                textColor={maxed ? undefined : offer.isAffordable(orbletsOwned) ? 'green-2' : 'status-critical'}
                                margin={{ top: 'small' }}
                            />
                        </Box>
                    </ShadowBox>
                );
            })}
        </Grid>
    );
}

function StatueOwnedMaterial({ statue }: { statue: RoyalStatue }) {
    return (
        <ComponentAndLabel label="Owned" component={
            <TipDisplay heading={commaNotation(statue.getOwnedMaterialQuantity())} body="Exact material quantity">
                <Text size="small">{nFormatter(statue.getOwnedMaterialQuantity())}</Text>
            </TipDisplay>
        } />
    );
}

function SharedStatueUpgradeMaterial({ armory, statue }: { armory: RoyalArmory, statue: RoyalStatue }) {
    return (
        <Box id="royal-statues-shared-parchment" direction="row" justify="between" gap="large" wrap
            border={{ side: 'bottom', color: 'grey-1' }} pad={{ bottom: 'small' }}>
            <Box gap="xsmall">
                <Text size="small" weight={500}>Shared upgrade material · applies to every restored statue</Text>
                <Box direction="row" align="center" gap="large" wrap>
                    <Text size="small">{statue.getAttemptMaterial().displayName.replaceAll('_', ' ')}</Text>
                    <TextAndLabel label="Required per upgrade attempt" text={nFormatter(statue.getAttemptQuantity())} textSize="small" />
                    <ComponentAndLabel label="Owned" component={
                        <ResourceDisplay
                            cost={statue.getOwnedMaterialQuantity()}
                            resourceImageData={statue.getAttemptMaterialImageData()}
                            resourceImageScale={0.65}
                            textSize="small"
                            showTooltip
                            tooltipHeading="Exact parchment balance"
                        />
                    } />
                </Box>
            </Box>
            <Box id="royal-statues-parchment-acquisition" gap="xsmall" style={{ maxWidth: '62ch' }}>
                <Text size="small" color="accent-2">
                    Royal Guardians can obtain parchment from Verminous Rats in the Royal Castle&apos;s cellar dungeon.
                </Text>
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Parchment chance per Verminous Rat defeat"
                        text={formatOneInChance(armory.getParchmentDropChance())} textSize="small" />
                    <TextAndLabel label="Maximum damage in the Royal Castle"
                        text={notateNumber(armory.getRoyalCastleMaximumDamage())} textSize="small" />
                </Box>
            </Box>
        </Box>
    );
}

function StatueCard({ statue }: { statue: RoyalStatue }) {
    const category = statue.data.description.replace(/^}千 /, '').replaceAll('_', ' ');
    const currentDescription = statue.getDescription().replaceAll('千', 'x');
    const nextDescription = statue.getDescription(statue.level + 1).replaceAll('千', 'x');
    const currentValue = currentDescription.slice(0, -(category.length + 1));
    const nextValue = nextDescription.slice(0, -(category.length + 1));
    const chanceText = formatOneInChance(statue.getSuccessChance());
    const covered = statue.level === 0;

    return (
        <ShadowBox id={`royal-statue-${statue.index}`} background="dark-1" pad="medium" gap="small">
            <Box direction="row" align="center" gap="small">
                <Box width="65px" height="85px" align="center" justify="center" flex={false}>
                    <IconImage data={statue.getImageData()} scale={0.5} />
                </Box>
                <Box gap="xxsmall">
                    <Text size="medium" weight={500}>{category}</Text>
                    <Text size="small" color="accent-2">Level {statue.level} · {covered ? 'Covered' : 'Restored'}</Text>
                    <Box data-progression="inline" direction="row" align="baseline" gap="small">
                        <Text data-current-bonus size="28px" weight={700} color="text" style={{ lineHeight: '34px' }}>{currentValue}</Text>
                        <Text data-next-bonus size="16px" weight={400} color="accent-2" style={{ lineHeight: '24px' }}>→ {nextValue} after success</Text>
                    </Box>
                </Box>
            </Box>
            <Box gap="xsmall" border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }}>
                {covered ? <>
                    <Box direction="row" align="center" gap="large" wrap>
                        <ComponentAndLabel label="Required per restoration attempt" component={
                            <Box direction="row" align="center" gap="xsmall">
                                <IconImage data={statue.getAttemptMaterialImageData()} scale={0.65} />
                                <Text size="small">{nFormatter(statue.getAttemptQuantity())} {statue.getAttemptMaterial().displayName.replaceAll('_', ' ')}</Text>
                            </Box>
                        } />
                        <StatueOwnedMaterial statue={statue} />
                        <TextAndLabel label="Restoration chance" text={chanceText} textSize="small" />
                    </Box>
                    <Text size="small" color={statue.isAffordable() ? 'green-2' : 'accent-2'}>
                        {statue.isAffordable() ? 'Materials available' : 'Not enough material'}
                    </Text>
                </> : <TextAndLabel label="Upgrade chance" text={chanceText} textSize="small" />}
            </Box>
        </ShadowBox>
    );
}

function StatueCards({ armory }: { armory: RoyalArmory }) {
    const statues = armory.statues.filter(statue => !/^\d+$/.test(statue.data.description.trim()));
    const restoredStatue = statues.find(statue => statue.level > 0);

    return (
        <Box id="royal-statues" gap="small">
            <Text id="royal-statues-chance-guide" size="small" color="accent-2" style={{ maxWidth: '75ch' }}>
                Royal Reverence boosts statue bonuses; Parchment Recycling can save parchment. An attempt does not guarantee a level.
            </Text>
            {restoredStatue && <SharedStatueUpgradeMaterial armory={armory} statue={restoredStatue} />}
            <Grid id="royal-statues-grid" aria-label="Royal Statues" columns={['1fr', '1fr']} gap="medium" fill>
                {statues.map(statue => <StatueCard key={statue.index} statue={statue} />)}
            </Grid>
        </Box>
    );
}

const outpostKindNames: Record<OutpostKind, string> = {
    [OutpostKind.ResourceDepot]: 'Resource Depot',
    [OutpostKind.SupportCamp]: 'Support Camp',
    [OutpostKind.SavageStronghold]: 'Savage Stronghold',
};

const outpostLinkProblems: Partial<Record<OutpostLinkDetails['reason'], string>> = {
    'source-ineligible': 'This map cannot have an active outpost.',
    'wrong-kind': 'Connection does not match the outpost kind.',
    'unknown-target': 'Target is not in the current catalog.',
    'wrong-world': 'Target is in another world.',
    'hidden-target': 'Target is outside the visible world map.',
    'out-of-range': 'Target is outside connection range.',
};

const OutpostSurface = styled(Box) <{ $muted: string; $text: string; $focus: string }>`
    font-variant-numeric: tabular-nums;
    details > summary { cursor: pointer; color: ${({ $muted }) => $muted}; }
    details > summary:hover { color: ${({ $text }) => $text}; }
    summary:focus-visible, [tabindex]:focus-visible { outline: 2px solid ${({ $focus }) => $focus}; outline-offset: 3px; }
    .outpost-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr)); gap: 12px; align-items: stretch; }
    .outpost-ranks { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; line-height: 20px; }
    .outpost-ranks th { font-weight: 400; color: ${({ $muted }) => $muted}; text-align: left; }
    .outpost-ranks th, .outpost-ranks td { padding: 0 6px 0 0; vertical-align: middle; }
    .outpost-ranks th:last-child, .outpost-ranks td:last-child { padding: 0; text-align: right; }
    .outpost-ranks th:nth-child(2), .outpost-ranks td:nth-child(2) { text-align: center; }
    .outpost-ranks col:nth-child(1) { width: 62px; }
    .outpost-ranks col:nth-child(2) { width: 35px; }
    .outpost-ranks col:nth-child(3) { width: 94px; }
    .outpost-ranks col:nth-child(5) { width: 58px; }
    .outpost-node-image { width: 48px; height: 48px; flex-shrink: 0; }
    @media (max-width: 600px) { .outpost-connections { flex-direction: column; gap: 3px; } }
`;

function formatRankXP(value: number): string {
    return value < 1e7 ? commaNotation(value) : notateNumber(value);
}

function formatRankETA(hours: number): string {
    if (!Number.isFinite(hours)) return '—';
    if (hours < 1 / 60) return '<1m';
    if (hours < 1) return `${Math.ceil(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours * 10) / 10}h`;
    return `${notateNumber(hours / 24, 'Smaller')}d`;
}

function OutpostUnitsDisplay({ armory, outpost }: { armory: RoyalArmory, outpost: RoyalMapSource }) {
    const activeRoles = armory.units.roles.filter(role => outpost.units.getTotalCount(role.role) > 0);
    if (activeRoles.length === 0) return null;
    return (
        <Box id={`royal-outpost-${outpost.mapId}-units`} direction="row" wrap gap="small" align="center" pad={{ vertical: 'xxsmall' }} border={{ side: 'top', color: 'grey-1' }}>
            {[false, true].map(movable => {
                const roles = activeRoles.filter(role => (role.role >= RoyalUnitRole.Militia) === movable);
                if (roles.length === 0) return null;
                return (
                    <Box key={String(movable)} direction="row" gap="xsmall" align="center">
                        <Text size="xsmall" color="accent-2">{movable ? 'Movable' : 'Stationary'}</Text>
                        {roles.map(role => (
                            <TipDisplay key={role.role} heading={role.name} body={`${commaNotation(outpost.units.getAssignedCount(role.role))} assigned, ${commaNotation(outpost.units.getPassiveCount(role.role))} passive. ${role.effectMeaning}: ${notateNumber(role.effect, 'Smaller')}${role.effectUnit === 'percent' ? '%' : ` ${role.effectUnit}`} per unit.`}>
                                <Box id={`royal-outpost-${outpost.mapId}-role-${role.role}`} direction="row" align="center" gap="xxsmall" tabIndex={0} aria-label={`${role.name}: ${outpost.units.getTotalCount(role.role)}`}>
                                    <IconImage data={role.getImageData()} scale={movable ? 1.5 : 0.8} />
                                    <Text size="xsmall">×{commaNotation(outpost.units.getTotalCount(role.role))}</Text>
                                </Box>
                            </TipDisplay>
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
}

function OutpostNodeImage({ armory, node }: { armory: RoyalArmory, node: RoyalResourceNode }) {
    const nodeImage = node.getImageData();
    const resourceImage = armory.resources.get(node.resourceType)?.getImageData();
    return (
        <Stack className="outpost-node-image" anchor="center">
            <IconImage data={nodeImage} scale={48 / Math.max(nodeImage.width, nodeImage.height)} />
            {resourceImage && <IconImage data={resourceImage} scale={28 / Math.max(resourceImage.width, resourceImage.height)} />}
        </Stack>
    );
}

function OutpostLinks({ armory, outpost }: { armory: RoyalArmory, outpost: Outpost }) {
    const showLinkProduction = outpost.kind === OutpostKind.ResourceDepot
        && outpost.linkDetails[0].productionPerHour > 0
        && outpost.linkDetails[1].productionPerHour > 0;
    return (
        <Box className="outpost-connections" id={`royal-outpost-${outpost.mapId}-links`} direction="row" gap="small" pad={{ top: 'xxsmall' }} border={{ side: 'top', color: 'grey-1' }}>
            <Text size="xsmall" color="accent-2">Connections</Text>
            <Box flex gap="xxsmall">
                {outpost.linkDetails.map((link, slot) => {
                    const target = link.target;
                    if (slot >= armory.getAvailableOutpostConnections() && !link.connection) return null;
                    const label = target instanceof RoyalResourceNode
                        ? `Node ${target.order + 1} · Grade ${commaNotation(target.grade)}`
                        : target ? MapInfo[target.mapId]?.data.map.name ?? 'Saved map connection' : 'Saved connection';
                    const problem = outpostLinkProblems[link.reason];
                    let tooltipBody = '';
                    if (showLinkProduction) {
                        tooltipBody = `${commaNotation(link.productionPerHour)}/h stockpile production.`;
                    } else if (outpost.kind === OutpostKind.SavageStronghold && target instanceof RoyalResourceNode) {
                        tooltipBody = 'Consumes node resources; does not add them to your stockpile.';
                    }
                    if (problem) tooltipBody = tooltipBody ? `${tooltipBody} ${problem}` : problem;
                    return (
                        <Box key={slot} id={`royal-outpost-${outpost.mapId}-link-${slot}`} gap="xxsmall">
                            <Box direction="row" gap="xsmall" align="center">
                                <Text data-outpost-link-slot-label size="xsmall" color="accent-2">Connection {slot + 1}</Text>
                                {!link.connection && <Text data-outpost-link-empty size="xsmall" color="accent-2">Empty</Text>}
                            </Box>
                            {link.connection && (
                                <Box direction="row" gap="xsmall" align="center" style={{ minWidth: 0 }}>
                                    {target instanceof RoyalResourceNode && <OutpostNodeImage armory={armory} node={target} />}
                                    <Box flex style={{ minWidth: 0 }}>
                                        {target instanceof RoyalResourceNode && (
                                            <Text data-outpost-link-availability size="small" weight={500} color={link.exhausted ? 'status-warning' : undefined} style={{ overflowWrap: 'anywhere' }}>
                                                {link.exhausted ? 'Exhausted' : `Available ${notateNumber(target.getAvailableQuantity())} / ${notateNumber(target.getMaximumQuantity())}`}
                                            </Text>
                                        )}
                                        {tooltipBody ? (
                                            <TipDisplay heading={`Connection ${slot + 1}`} body={tooltipBody}>
                                                <Text data-outpost-link-label size="xsmall" color="accent-2" tabIndex={0}>{label}</Text>
                                            </TipDisplay>
                                        ) : (
                                            <Text data-outpost-link-label size="xsmall" color="accent-2">{label}</Text>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            {link.exhausted && (
                                <details id={`royal-outpost-${outpost.mapId}-link-${slot}-alternatives`}>
                                    <summary style={{ fontSize: '12px' }}>Alternatives ({commaNotation(link.alternatives.length)})</summary>
                                    <Box gap="xsmall" pad={{ vertical: 'xsmall' }}>
                                        {link.alternatives.length === 0 && <Text size="xsmall" color="accent-2">No available resource alternatives in range.</Text>}
                                        {link.alternatives.map(candidate => (
                                            <Box key={candidate.nodeId} data-outpost-alternative direction="row" gap="xsmall" align="center" style={{ minWidth: 0 }}>
                                                <OutpostNodeImage armory={armory} node={candidate} />
                                                <Box flex style={{ minWidth: 0 }}>
                                                    <Text data-outpost-link-availability size="small" weight={500} style={{ overflowWrap: 'anywhere' }}>Available {notateNumber(candidate.getAvailableQuantity())} / {notateNumber(candidate.getMaximumQuantity())}</Text>
                                                    <Text data-outpost-link-label size="xsmall" color="accent-2">Node {candidate.order + 1} · Grade {commaNotation(candidate.grade)}</Text>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </details>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}


function OutpostCard({ armory, outpost }: { armory: RoyalArmory, outpost: Outpost }) {
    const unusedPoints = outpost.getUnusedPoints();
    const productionLink = outpost.linkDetails.find(link => link.target instanceof RoyalResourceNode);
    const resource = productionLink?.target instanceof RoyalResourceNode ? armory.resources.get(productionLink.target.resourceType) : undefined;
    return (
        <ShadowBox id={`royal-outpost-${outpost.mapId}`} flex={false} background="dark-1" pad="small" gap="xxsmall" border={{ color: 'grey-1', size: 'xsmall' }} style={{ minWidth: 0, borderRadius: '4px' }}>
            <Box direction="row" justify="between" gap="xsmall" align="start">
                <Box style={{ minWidth: 0 }}>
                    <Text size="14px" weight={500}>{MapInfo[outpost.mapId].data.map.name}</Text>
                    <Text size="xsmall" color="accent-2">{outpostKindNames[outpost.kind]} · {MapInfo[outpost.mapId].data.world}{outpost.glorified ? ' · Glorified' : ''}</Text>
                </Box>
                <TipDisplay heading="Outpost upgrades" body={`Expanded Barracks: ${outpost.expandedBarracksLevel}; Advanced Logistics: ${outpost.advancedLogisticsLevel}; Greater Education: ${outpost.greaterEducationLevel}`}>
                    <Text size="xsmall" color="accent-2" style={{ whiteSpace: 'nowrap' }} tabIndex={0}>EB {outpost.expandedBarracksLevel} &nbsp; AL {outpost.advancedLogisticsLevel} &nbsp; GE {outpost.greaterEducationLevel}</Text>
                </TipDisplay>
            </Box>
            <Box direction="row" justify="between" gap="small">
                <ComponentAndLabel label="Production" labelSize="xsmall" component={<Box direction="row" gap="xxsmall" align="center">{resource && <IconImage data={resource.getImageData()} scale={0.65} />}<Text size="small" weight={500}>{notateNumber(outpost.productionPerHour, 'Smaller')}/h</Text></Box>} />
                <TextAndLabel label="Range" text={commaNotation(outpost.connectionRange)} labelSize="xsmall" textSize="small" />
                <TextAndLabel label="Unused points" text={commaNotation(unusedPoints)} labelSize="xsmall" textSize="small" textColor={unusedPoints > 0 ? 'green-2' : undefined} />
            </Box>
            <Box id={`royal-outpost-${outpost.mapId}-ranks`} pad={{ top: 'xxsmall' }} border={{ side: 'top', color: 'grey-1' }}>
                <table className="outpost-ranks" aria-label={`${MapInfo[outpost.mapId].data.map.name} ranks`}>
                    <colgroup><col /><col /><col /><col /><col /></colgroup>
                    <thead><tr><th scope="col">Rank</th><th scope="col">Level</th><th scope="col">XP</th><th scope="col">Progress</th><th scope="col">Next rank</th></tr></thead>
                    <tbody>{OUTPOST_RANKS.map(rank => {
                        const progress = outpost.getRankProgress(rank);
                        const hours = progress.getHoursToNextRank();
                        const percentage = progress.requiredXP > 0 ? Math.min(100, Math.max(0, progress.currentXP / progress.requiredXP * 100)) : 0;
                        return (
                            <tr key={rank} id={`royal-outpost-${outpost.mapId}-rank-${rank}`} style={{ opacity: progress.experiencePerHour > 0 ? 1 : 0.65 }}>
                                <td>
                                    {progress.experiencePerHour > 0
                                        ? <TipDisplay heading={OutpostRank[rank]} body={`${commaNotation(progress.experiencePerHour)} XP/h.`}><Text data-rank-name size="xsmall" tabIndex={0}>{OutpostRank[rank]}</Text></TipDisplay>
                                        : <Text data-rank-name size="xsmall">{OutpostRank[rank]}</Text>}
                                </td>
                                <td>{progress.level}</td>
                                <td data-rank-xp>{formatRankXP(progress.totalXP)} / {formatRankXP(progress.nextThreshold)}</td>
                                <td><Meter aria-label={`${OutpostRank[rank]} level progress`} values={[{ value: percentage, color: 'brand' }]} max={100} thickness="6px" size="full" background="grey-1" round /></td>
                                <td title={Number.isFinite(hours) ? toTime(hours * 3600) : undefined}>{formatRankETA(hours)}</td>
                            </tr>
                        );
                    })}</tbody>
                </table>
            </Box>
            <OutpostUnitsDisplay armory={armory} outpost={outpost} />
            <OutpostLinks armory={armory} outpost={outpost} />
        </ShadowBox>
    );
}

function UnbuiltOutpostCard({ armory, outpost }: { armory: RoyalArmory, outpost: RoyalMapSource }) {
    const unlock = armory.getOutpostWorldUnlock(outpost.worldIndex);
    return (
        <ShadowBox id={`royal-outpost-${outpost.mapId}`} flex={false} background="dark-1" pad="small" gap="xsmall" border={{ color: 'grey-1' }} style={{ minWidth: 0, borderRadius: '4px' }}>
            <Text size="14px" weight={500}>{MapInfo[outpost.mapId].data.map.name}</Text>
            <Text size="xsmall" color="accent-2">{MapInfo[outpost.mapId].data.world} · {unlock.unlocked ? 'Unbuilt' : 'World locked'}</Text>
            <Text size="small">Monsters cleared: {notateNumber(outpost.clearedMonsters)}{outpost.requiredOutpostKills !== undefined && ` / ${notateNumber(outpost.requiredOutpostKills)}`}</Text>
            {!unlock.unlocked && unlock.upgrade && <Text size="xsmall" color="accent-2">{unlock.upgrade.data.name.replace(/_/g, ' ')}: Lv. {unlock.upgrade.level} / {unlock.upgrade.getMaxLevel()}</Text>}
            <OutpostUnitsDisplay armory={armory} outpost={outpost} />
        </ShadowBox>
    );
}

function OutpostCards({ armory }: { armory: RoyalArmory }) {
    const theme = useContext<ThemeType>(ThemeContext);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [focus, setFocus] = useState('All');
    const [groupBy, setGroupBy] = useState('World');
    const maps = Array.from(armory.mapStates.values()).filter(outpost =>
        MapInfo[outpost.mapId] && (outpost.outpostEligible || outpost.isOutpost()));
    const worlds = [...new Set(maps.map(outpost => outpost.worldIndex))].sort((a, b) => a - b);
    const availableConnections = armory.getAvailableOutpostConnections();
    const hasFilters = search !== '' || status !== 'All' || focus !== 'All';
    const filtered = maps.filter(outpost => {
        const unlocked = armory.getOutpostWorldUnlock(outpost.worldIndex).unlocked;
        return MapInfo[outpost.mapId].data.map.name.toLowerCase().includes(search.trim().toLowerCase())
            && (status === 'All' || status === 'Built' && outpost.isOutpost()
                || status === 'Unbuilt' && !outpost.isOutpost() && unlocked
                || status === 'World locked' && !unlocked)
            && (focus === 'All' || outpost.isOutpost() && (
                focus === 'Unused points' && outpost.getUnusedPoints() > 0
                || focus === 'Exhausted connections' && outpost.linkDetails.some(link => link.exhausted)
                || focus === 'Empty connections' && outpost.linkDetails.some((link, slot) => slot < availableConnections && !link.connection)
            ));
    });
    const renderCards = (entries: RoyalMapSource[]) => (
        <div className="outpost-grid" aria-label="Royal Armory Outposts">
            {entries.map(outpost => outpost.isOutpost()
                ? <OutpostCard key={outpost.mapId} armory={armory} outpost={outpost} />
                : <UnbuiltOutpostCard key={outpost.mapId} armory={armory} outpost={outpost} />)}
        </div>
    );
    return (
        <OutpostSurface id="royal-outposts-view" gap="small" $muted={normalizeColor('accent-2', theme)} $text={normalizeColor('text', theme, true)} $focus={normalizeColor('brand', theme)}>
            <Box aria-label="Current Outpost production" background="dark-1" pad={{ horizontal: 'small', vertical: 'xsmall' }} direction="row" wrap gap="medium" align="center" border={{ color: 'grey-1' }}>
                <Text size="small">Total production / hour</Text>
                {Array.from(armory.totalResourceProduction).map(([type, production]) => (
                    <Box key={type} id={`royal-production-${type}`} direction="row" align="center" gap="xsmall">
                        <IconImage data={armory.resources.get(type)!.getImageData()} scale={0.65} />
                        <Text size="small">{notateNumber(production, 'Smaller')}/h</Text>
                    </Box>
                ))}
                {armory.totalResourceProduction.size === 0 && <Text size="small" color="accent-2">No current stockpile production.</Text>}
            </Box>
            <Box aria-label="Outpost filters" direction="row" wrap gap="small" align="end">
                <Box width="220px" gap="xxsmall" style={{ maxWidth: '100%' }}>
                    <Text size="xsmall" color="accent-2">Search</Text>
                    <TextInput aria-label="Search Outposts" placeholder="Search Outposts" value={search} onChange={event => setSearch(event.target.value)} />
                </Box>
                <Box width="180px" gap="xxsmall" style={{ maxWidth: '100%' }}>
                    <Text size="xsmall" color="accent-2">State</Text>
                    <Select aria-label="Outpost status" options={['All', 'Built', 'Unbuilt', 'World locked']} value={status} onChange={({ option }) => setStatus(option)} />
                </Box>
                <Box width="260px" gap="xxsmall" style={{ maxWidth: '100%' }}>
                    <Text size="xsmall" color="accent-2">Focus</Text>
                    <Select aria-label="Outpost focus" options={['All', 'Unused points', 'Exhausted connections', 'Empty connections']} value={focus} onChange={({ option }) => setFocus(option)} />
                </Box>
                <Box width="130px" gap="xxsmall" style={{ maxWidth: '100%' }}>
                    <Text size="xsmall" color="accent-2">Group by</Text>
                    <Select aria-label="Group Outposts" options={['World', 'None']} value={groupBy} onChange={({ option }) => setGroupBy(option)} />
                </Box>
            </Box>
            <Box direction="row" gap="small" align="center">
                <Text size="xsmall" color="accent-2">{filtered.length} matching maps</Text>
                {hasFilters && <SmallButton label="Clear filters" onClick={() => { setSearch(''); setStatus('All'); setFocus('All'); }} />}
            </Box>
            {filtered.length === 0 ? <Text size="small" color="accent-2">No maps match these filters. Change the search or filters to see Outposts.</Text>
                : groupBy === 'None' ? renderCards(filtered)
                    : worlds.map(worldIndex => {
                        const entries = filtered.filter(outpost => outpost.worldIndex === worldIndex);
                        if (entries.length === 0) return null;
                        const unlock = armory.getOutpostWorldUnlock(worldIndex);
                        return (
                            <details key={worldIndex} id={`royal-outpost-world-${worldIndex}`} open={unlock.unlocked}>
                                <summary style={{ marginBottom: '12px', fontSize: '14px' }}>
                                    World {worldIndex + 1} ({entries.length} maps){!unlock.unlocked && ` · Locked${unlock.upgrade ? ` · ${unlock.upgrade.data.name.replace(/_/g, ' ')}: Lv. ${unlock.upgrade.level} / ${unlock.upgrade.getMaxLevel()}` : ''}`}
                                </summary>
                                {renderCards(entries)}
                            </details>
                        );
                    })}
        </OutpostSurface>
    );
}

export default function RoyalArmoryDisplay() {
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated
    })));
    const [tab, setTab] = useState('Upgrades');
    const [filters, setFilters] = useState<FilterOptions>({
        searchText: '',
        hideLocked: false,
        hideMaxed: false,
        sortBy: 'default'
    });
    const [material, setMaterial] = useState<number | undefined>(undefined);
    const armory = theData.get('royalArmory') as RoyalArmory;
    const catalogUpgrades = armory.upgrades;
    const upgrades = useMemo(() => catalogUpgrades
        .filter(upgrade => upgrade.displayIndex !== undefined)
        .sort((a, b) => a.displayIndex! - b.displayIndex!), [catalogUpgrades]);
    const resourceTypes = useMemo(() => [...new Set(upgrades
        .map(upgrade => upgrade.getPurchaseResourceType())
        .filter((type): type is number => type !== undefined))], [upgrades]);

    return (
        <Box>
            <ResourceBar armory={armory} resourceTypes={resourceTypes} />
            <Box margin={{ bottom: 'medium' }}>
                <ContentTabs
                    options={[
                        { value: 'Upgrades', label: 'Upgrades' },
                        { value: 'Orblets', label: 'Orblets' },
                        { value: 'Outposts', label: 'Outposts' },
                        { value: 'Statues', label: 'Statues' }
                    ]}
                    value={tab}
                    onChange={setTab}
                />
            </Box>
            {tab === 'Upgrades' ? (
                <RoyalUpgradeTable
                    armory={armory}
                    upgrades={upgrades}
                    resourceTypes={resourceTypes}
                    filters={filters}
                    onFiltersChange={setFilters}
                    material={material}
                    onMaterialChange={setMaterial}
                />
            ) : tab === 'Orblets' ? (
                <Box>
                    <OrbletBalance armory={armory} />
                    <OrbletCards offers={armory.orbletMarketBonuses} orbletsOwned={armory.getOrbletsOwned()} />
                </Box>
            ) : tab === 'Outposts' ? (
                <OutpostCards armory={armory} />
            ) : tab === 'Statues' ? (
                <StatueCards armory={armory} />
            ) : null}
        </Box>
    );
}
