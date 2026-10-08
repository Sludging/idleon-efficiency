'use client';

import { useMemo, useState } from "react";
import { Box, DataTableProps, Grid, Select, Text } from "grommet";
import { useShallow } from "zustand/react/shallow";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { RoyalArmory, RoyalArmoryOrbletMarketBonus, RoyalArmoryUpgrade } from "../../data/domain/world-6/royalArmory";
import IconImage from "../base/IconImage";
import ShadowBox from "../base/ShadowBox";
import ContentTabs from "../base/ContentTabs";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import TipDisplay from "../base/TipDisplay";
import { UpgradeTable } from "./shared/UpgradeTable";
import { FilterOptions } from "./shared/UpgradeTableFilters";
import { ResourceDisplay } from "./shared/ResourceDisplay";
import { commaNotation, notateNumber } from "../../data/utility";

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
                        { value: 'Orblets', label: 'Orblets' }
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
            ) : (
                <Box>
                    <OrbletBalance armory={armory} />
                    <OrbletCards offers={armory.orbletMarketBonuses} orbletsOwned={armory.getOrbletsOwned()} />
                </Box>
            )}
        </Box>
    );
}
