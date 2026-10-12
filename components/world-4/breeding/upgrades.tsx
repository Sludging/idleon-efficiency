import {
    Box,
    Text,
} from 'grommet'
import { useState, useMemo, useEffect } from "react";
import { Breeding as BreedingDomain } from "../../../data/domain/world-4/breeding";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import DataRow from "../../base/DataRow";
import { Cooking } from '../../../data/domain/world-4/cooking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

export const PetUpgradeDisplay = () => {
    const [breeding, setBreeding] = useState<BreedingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const upgradeCosts = useMemo(() => {
        const cooking = theData.get("cooking") as Cooking;
        if (cooking && breeding) {
            return breeding.upgrade.map(upgrade => {
                const meal = upgrade.data.cost != -1 ? cooking.meals[upgrade.data.cost] : undefined
                const mealCost = meal ? upgrade.getCost(1) : -1;
                return [{
                    image: {
                        location: "PetDeadCell",
                        width: 33,
                        height: 33
                    },
                    name: "Pet Dead Cell",
                    cost: upgrade.getCost(0),
                    canAfford: breeding.deadCells >= upgrade.getCost(0)
                },
                {
                    image: meal?.getImageData(),
                    name: meal?.name,
                    cost: mealCost,
                    canAfford: (meal?.count ?? 0) > mealCost
                }
                ]
            });
        }
        return [];
    }, [theData, breeding])

    useEffect(() => {
        setBreeding(theData.get("breeding"));
    }, [theData]);

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (<Box gap="small">
        <Text>Upgrades</Text>
        {
            breeding.upgrade.filter(upgrade => upgrade.data.upgradeName != "Filler").map((upgrade, index) => (
                <DataRow
                    key={index}
                    columns={['2fr', '2fr', '1fr', '1.2fr']}
                    opacity={upgrade.level == 0 ? 0.5 : 1}
                    fields={[
                        {
                            key: 'identity',
                            kind: 'identity',
                            name: upgrade.data.upgradeName,
                            artwork: <IconImage data={upgrade.getImageData()} scale={0.7} />
                        },
                        { key: 'bonus', kind: 'text', label: 'Bonus', value: upgrade.getBonusText(), role: 'description' },
                        { key: 'level', kind: 'text', label: 'Level', value: `${upgrade.level}/${upgrade.data.maxLevel}` },
                        {
                            key: 'costs',
                            kind: 'content',
                            label: 'Costs',
                            content: (
                                <Box direction="row" gap="small" align="center">
                                    {
                                        upgradeCosts[index].map((cost, index) => (
                                            <Box key={`upg_${index}`} direction="row" align="center" gap="xsmall" title={cost.name}>
                                                {
                                                    cost.image &&
                                                    <IconImage data={cost.image} />
                                                }
                                                {
                                                    cost.cost > 0 && <Text color={cost.canAfford ? 'green-1' : ''} size="small">{nFormatter(cost.cost)}</Text>
                                                }
                                            </Box>
                                        ))
                                    }
                                </Box>
                            )
                        }
                    ]}
                />
            ))
        }
    </Box>)
}
