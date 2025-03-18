import {
    Data,
    DataFilter,
    DataFilters, 
    DataSearch, 
    DataSummary, 
    DataTable, 
    Toolbar, 
    Select, 
    CheckBox, 
    DataSort
} from "grommet";

import IconImage from "../base/IconImage";

import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";

import { Stamp } from "../../data/domain/world-1/stamps";

import { useShallow } from "zustand/react/shallow";

import React, { useState } from "react";
import { Box, Text } from "grommet";
import { getCoinsArray, nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import CoinsDisplay from "../coinsDisplay";
import { Item } from "../../data/domain/items";
import { Storage } from "../../data/domain/storage";
import { AtomCollider } from "../../data/domain/atomCollider";

enum StampStatus {
    NoCalculator = 'Unknown',
    NotEnoughCarryCap = 'Not enough carry cap',
    WastingDiscounts = 'Wasting discounts',
    CanUpgrade = 'Can upgrade',
    UniqueScenario = 'Unique scenario',
    CannotUpgrade = 'Cannot upgrade'
}

enum StampObtainability {
    Acquired = 'Acquired',
    HasSources = 'Has sources',
    Unobtainable = 'Unobtainable'
}

interface StampTableData {
    name: string;
    type: string;
    level: number;
    maxLevel: number;
    bonus: string;
    nextCost: string | React.ReactNode;
    status: StampStatus;
    obtainability: StampObtainability;
    stamp: Stamp;
    upgradableTiers: number;
    minAtomDiscount: number;
    minAtomDiscountWithGilded: number;
    maxAchievableLevel: number;
}

function StampsTableView({ stamps }: { stamps: Stamp[] }) {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const storage = theData.get("storage") as Storage;
    const collider = theData.get("collider") as AtomCollider;
    const allItems = theData.get("itemsData") as Item[];

    // Initialize state with current values from the first stamp
    const [selectedAtomDiscount, setSelectedAtomDiscount] = useState<number>(collider.atoms[0].getBonus());
    const [useGilded, setUseGilded] = useState<boolean>(stamps[0]?.gildedAvailable && stamps[0]?.gildedCount > 0);

    // Generate atom discount options
    const discountIncrement = collider.atoms[0].level * collider.atoms[0].data.bonusPerLv;
    const atomDiscountOptions: number[] = [];
    for (let discount = 0; discount <= 90; discount += discountIncrement) {
        atomDiscountOptions.push(discount);
    }
    // Ensure 90 is always included if it's not already (in case of non-divisible increments)
    if (!atomDiscountOptions.includes(90)) {
        atomDiscountOptions.push(90);
    }

    const columns = [
        {
            property: 'name',
            header: 'Name',
            render: (data: StampTableData) => {
                const stamp = stamps.find(s => s.name === data.name);
                if (!stamp) return <Text>{data.name}</Text>;

                return (
                    <Box direction="row" gap="small" align="center">
                        <IconImage data={stamp.getImageData()} scale={0.4} />
                        <Text size="small">{data.name}</Text>
                    </Box>
                );
            }
        },
        {
            property: 'type',
            header: 'Type',
            render: (data: StampTableData) => <Text size="small">{data.type}</Text>
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: StampTableData) => <Text size="small">{`${data.level}/${data.maxLevel}`}</Text>
        },
        {
            property: 'bonus',
            header: 'Bonus',
            render: (data: StampTableData) => <Text size="small">{data.bonus}</Text>
        },
        {
            property: 'upgradableTiers',
            header: 'Upgradable Tiers',
            render: (data: StampTableData) => {
                if (!data.stamp.upgradeCalculator || data.stamp.level == 0) return <></>;
                const scenario = data.stamp.upgradeCalculator.getScenario(selectedAtomDiscount, useGilded);
                return <Text size="small">{scenario.upgradableTiers}</Text>;
            }
        },
        {
            property: 'maxAchievableLevel',
            header: 'Max Achievable',
            render: (data: StampTableData) => {
                if (!data.stamp.upgradeCalculator || data.stamp.level == 0) return <></>;
                const scenario = data.stamp.upgradeCalculator.getScenario(selectedAtomDiscount, useGilded);
                return <Text size="small">{scenario.maxUpgradeLevel}</Text>;
            }
        },
        {
            property: 'nextCost',
            header: 'Next Level Cost',
            render: (data: StampTableData) => {
                if (data.stamp.level == 0) return <></>;

                if (data.stamp.canUpgradeWithCoins) {
                    return (
                        <CoinsDisplay coinMap={getCoinsArray(data.stamp.getGoldCost())} maxCoins={3} />
                    )
                }

                let canAfford = false;
                if (data.stamp.materialItem) {
                    const amount = storage?.amountInStorage(data.stamp.materialItem.internalName);
                    const scenario = data.stamp.upgradeCalculator?.getScenario(selectedAtomDiscount, useGilded);
                    const matCost = scenario ? scenario.materialCost : data.stamp.getMaterialCost();
                    canAfford = amount >= matCost;

                    return (
                        <Box direction="row" gap="xsmall" align="center">
                            <Text color={canAfford ? 'green-3' : ''} size="small">{nFormatter(matCost)}</Text>
                            <IconImage data={(data.stamp.materialItem as Item).getImageData()} scale={0.7} />
                        </Box>
                    );
                }

                return <Text size="small">N/A</Text>;
            }
        },
        {
            property: 'status',
            header: 'Status',
            render: (data: StampTableData) => {
                if (data.obtainability != StampObtainability.Acquired) {
                    return <Text size="small" color={data.obtainability}>{data.obtainability}</Text>;
                }

                let statusText = '';
                let statusColor = '';

                switch (data.status) {
                    case StampStatus.NoCalculator:
                        statusText = 'No calculator';
                        statusColor = 'status-unknown';
                        break;
                    case StampStatus.NotEnoughCarryCap:
                        statusText = 'Not enough carry cap';
                        statusColor = 'status-negative';
                        break;
                    case StampStatus.WastingDiscounts:
                        statusText = 'Wasting discounts';
                        statusColor = 'status-negative';
                        break;
                    case StampStatus.CanUpgrade:
                        statusText = 'Can upgrade';
                        statusColor = 'status-positive';
                        break;
                    case StampStatus.UniqueScenario:
                        statusText = 'Unique scenario';
                        statusColor = 'status-positive';
                        break;
                    case StampStatus.CannotUpgrade:
                        statusText = 'Cannot upgrade';
                        statusColor = 'status-negative';
                        break;
                }

                return (
                    <Box direction="row" gap="small">
                        <Text size="small" color={statusColor}>{statusText}</Text>
                    </Box>
                );
            }
        }
    ];

    const data: StampTableData[] = stamps.map(stamp => {
        const scenario = stamp.upgradeCalculator?.getScenario(selectedAtomDiscount, useGilded);

        let nextCost: number = 0;
        let status: StampStatus;
        let obtainability: StampObtainability = StampObtainability.Acquired;

        if (stamp.level == 0) {
            const stampItem = allItems.find(item => item.internalName == stamp.raw_name);
            obtainability = stampItem && stampItem.sources &&
                stampItem.sources.sources &&
                stampItem.sources.sources.length > 0
                ? StampObtainability.HasSources
                : StampObtainability.Unobtainable;
            status = StampStatus.NoCalculator;
        } else if (!stamp.upgradeCalculator) {
            status = StampStatus.NoCalculator;
        } else {
            const currentScenario = stamp.upgradeCalculator.getScenario(selectedAtomDiscount, useGilded);
            const canUpgradeWithCurrent = currentScenario.isAchievable;

            if (canUpgradeWithCurrent) {
                // Check if we have enough carry capacity for the material cost
                const hasEnoughCarryCapacity = currentScenario.materialCost <= stamp.maxCarryAmount;

                if (!hasEnoughCarryCapacity) {
                    status = StampStatus.NotEnoughCarryCap;
                } else {
                    // Check if we're using more discounts than necessary
                    const canUpgradeWithoutDiscounts = stamp.upgradeCalculator.canUpgradeWithoutDiscounts();
                    const canUpgradeWithGildedOnly = stamp.upgradeCalculator.canUpgradeWithGildedOnly();
                    const minAtomDiscount = stamp.upgradeCalculator.getMinimumAtomDiscount(true);

                    // If it can be upgraded without any discounts, we're wasting our current discounts
                    if (canUpgradeWithoutDiscounts) {
                        status = useGilded || selectedAtomDiscount > 0
                            ? StampStatus.WastingDiscounts
                            : StampStatus.CanUpgrade;
                    }
                    // If it can be upgraded with just gilded, and we're using atom discount too, we're wasting it
                    else if (canUpgradeWithGildedOnly) {
                        status = useGilded && selectedAtomDiscount > 0
                            ? StampStatus.WastingDiscounts
                            : StampStatus.CanUpgrade;
                    }
                    // If it can be upgraded with a lower atom discount, we're using more than needed
                    else if (minAtomDiscount >= 0 && minAtomDiscount < selectedAtomDiscount) {
                        status = StampStatus.WastingDiscounts;
                    }
                    // If none of the above, this is the only scenario that works
                    else {
                        status = StampStatus.UniqueScenario;
                    }
                }
            } else {
                status = StampStatus.CannotUpgrade;
            }
        }

        if (stamp.level > 0) {
            if (!stamp.isMaxLevel()) {
                nextCost = stamp.getGoldCost();
            } else if (scenario) {
                nextCost = scenario.materialCost;
            }
        }

        return {
            name: stamp.name,
            type: stamp.type.replace("Stamp", "").trim(),
            level: stamp.level,
            maxLevel: stamp.maxLevel,
            bonus: stamp.getBonusText(),
            nextCost,
            status,
            obtainability,
            stamp,
            upgradableTiers: scenario?.upgradableTiers ?? 0,
            minAtomDiscount: stamp.upgradeCalculator?.getMinimumAtomDiscount(false) ?? -1,
            minAtomDiscountWithGilded: stamp.upgradeCalculator?.getMinimumAtomDiscount(true) ?? -1,
            maxAchievableLevel: scenario?.maxUpgradeLevel ?? stamp.maxLevel
        };
    });

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Data
                data={data}
                properties={{
                    type: {
                        label: 'Type',
                        sort: false,
                    },
                    status: {
                        label: 'Status',
                        sort: false,
                    },
                    bonus: {
                        search: true,
                        sort: false,
                    },
                    name: {
                        search: true,
                        sort: false,
                    },
                    nextCost: {
                        sort: true,
                        label: 'Next Cost'
                    }
                }}
            >
                <Toolbar>
                    <DataSearch responsive />
                    <Box direction="row" gap="medium" margin={{ bottom: 'medium' }} align="center">
                        <Box direction="row" gap="small" align="center">
                            <Text size="small">Atom Discount:</Text>
                            <Select
                                options={atomDiscountOptions.map(value => ({
                                    label: `${value}%`,
                                    value: value
                                }))}
                                labelKey="label"
                                valueKey={{ key: "value", reduce: true }}
                                value={selectedAtomDiscount}
                                onChange={({ value }) => setSelectedAtomDiscount(value)}
                                inert={false}
                            />
                        </Box>
                        <Box direction="row" gap="small" align="center">
                            <CheckBox
                                checked={useGilded}
                                label={<Text size="small">Use Gilded</Text>}
                                onChange={(event) => setUseGilded(event.target.checked)}
                            />
                        </Box>
                    </Box>
                    <DataFilters layer>
                        <DataFilter property="type" />
                        <DataFilter property="status" />
                        <DataFilter property="obtainability"  />
                    </DataFilters>
                    <DataSort drop />
                </Toolbar>
                <DataSummary />
                <DataTable
                    fill
                    columns={columns}
                />
            </Data>
        </ShadowBox>
    );
}

export default StampsTableView;