import {
    Box,
    Grid,
    Text,
} from 'grommet'
import { useState, useContext, useMemo, useEffect } from "react";
import { Breeding as BreedingDomain } from "../../../data/domain/breeding";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { Cooking } from '../../../data/domain/cooking';
import TextAndLabel from '../../base/TextAndLabel';
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

    return (<Box>
        <Text>Upgrades</Text>
        {
            breeding.upgrade.filter(upgrade => upgrade.data.upgradeName != "Filler").map((upgrade, index) => (
                <ShadowBox key={index} background="dark-1" margin={{ bottom: 'medium' }} align="center" pad="small" style={{ opacity: upgrade.level == 0 ? 0.5 : 1 }}>
                    <Grid columns={{ size: 'auto', count: 5 }} fill>
                        <IconImage data={upgrade.getImageData()} scale={0.7} />
                        <TextAndLabel textSize='xsmall' label="Name" text={upgrade.data.upgradeName} />
                        <TextAndLabel textSize='xsmall' label="Bonus" text={upgrade.getBonusText()} />
                        <TextAndLabel textSize='xsmall' label="Level" text={`${upgrade.level}/${upgrade.data.maxLevel}`} />
                        <Box direction="row" gap="small">
                            {
                                upgradeCosts[index].map((cost, index) => (
                                    <Box key={`upg_${index}`} align="center" gap="xsmall">
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
                    </Grid>
                </ShadowBox>
            ))
        }
    </Box>)
}