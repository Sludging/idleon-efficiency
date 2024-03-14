import { Box, Grid, ResponsiveContext, Stack, Text } from "grommet";
import { useContext, useState } from "react";
import TabButton from "../../base/TabButton";
import { Crop, Farming, MarketUpgrade, MarketUpgradeCost } from "../../../data/domain/world-6/farming";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";

export const MarketUpgradesDisplay = ({ farming }: { farming: Farming }) => {
    const size = useContext(ResponsiveContext);

    return (
        <Box gap="medium" width="100%">
            <ShadowBox pad="small">
                <Box width="auto" justify="center">
                    <Box direction="row" align="center" margin={{ bottom: 'small' }} justify="center" gap="medium">
                        <IconImage data={Farming.getDayMarketImageData()} />
                        <Text>Day Market</Text>
                    </Box>
                    <Grid columns={{ size: 'auto', count: (size == "small" ? 1 : 4) }} fill>
                        {
                            farming.marketUpgrades.slice(0, 8).map((upgrade, index) => {
                                const nextLevelCost = upgrade.getNextLevelCost();
                                const canAfford = (farming.cropDepot.find(crop => crop.index == nextLevelCost.cropId)?.quantityOwned ?? 0) > nextLevelCost.cropQuantity;

                                // Cost for 5 more levels
                                const futureLevelsCost = [upgrade.getNextLevelCost(upgrade.level + 1), upgrade.getNextLevelCost(upgrade.level + 2), upgrade.getNextLevelCost(upgrade.level + 3), upgrade.getNextLevelCost(upgrade.level + 4), upgrade.getNextLevelCost(upgrade.level + 5)];
                                let canAffortFutureLevels: boolean[] = [];
                                futureLevelsCost.forEach((cost, index) => {
                                    if (cost.cropQuantity > 0) {
                                        let currencyLeft = (farming.cropDepot.find(crop => crop.index == cost.cropId)?.quantityOwned ?? 0);
                                        if (nextLevelCost.cropId == cost.cropId) {
                                            currencyLeft -= nextLevelCost.cropQuantity;
                                        }
                                        for (let i = 0; i < index; i++) {
                                            if (futureLevelsCost[i].cropId == cost.cropId) {
                                                currencyLeft -= futureLevelsCost[i].cropQuantity;
                                            }
                                        }
                                        canAffortFutureLevels.push(currencyLeft > cost.cropQuantity);
                                    } else {
                                        canAffortFutureLevels.push(false);
                                    }
                                });

                                // Get cost to max upgrade
                                const costToMax = upgrade.getTotalCostUntilLevel(upgrade.level, (upgrade.data.maxLvl - upgrade.level > 100) ? 100 : upgrade.data.maxLvl);

                                let label = "";
                                if (upgrade.unlocked) {
                                    label = (upgrade.level > 0 ? "Next level cost" : "Unlock Cost");
                                } else {
                                    label = `Find ${upgrade.data.cropReq - farming.discoveredCrops} more crops type to unlock`;
                                }

                                return (
                                    <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Box gap="small" justify="between" fill>
                                            <TextAndLabel textSize='xsmall' text={farming.getMarketUpgradeBonusText(upgrade.index)} label={`${upgrade.data.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level}${upgrade.data.maxLvl > upgrade.level ? `/${upgrade.data.maxLvl}` : ``})` : ``}`} />
                                            {
                                                upgrade.unlocked ?
                                                    upgrade.level < upgrade.data.maxLvl ?
                                                        <TipDisplay
                                                            size='medium'
                                                            heading={"More next levels cost"}
                                                            body={
                                                                <Box gap="small">
                                                                    {upgrade.index > 0 &&
                                                                    <Box gap="xxsmall">
                                                                        {
                                                                            futureLevelsCost.map((cost, index) => {
                                                                                return ((cost.cropQuantity > 0)
                                                                                    && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                            <IconImage data={Crop.getCropIconData(cost.cropId)} />
                                                                                            <Text color={canAffortFutureLevels[index] ? 'green-1' : ''} size="small">{nFormatter(cost.cropQuantity)}</Text>
                                                                                        </Box>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Box>}
                                                                    <ComponentAndLabel
                                                                        label={(upgrade.data.maxLvl - upgrade.level > 100) ? "Total cost for next 100 levels" : "Total cost to max"}
                                                                        labelColor=''
                                                                        component={
                                                                            <Box gap="xsmall">
                                                                                {
                                                                                    costToMax.map((cost, index) => {
                                                                                        return ((cost.cropQuantity > 0)
                                                                                            && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                                    <IconImage data={Crop.getCropIconData(cost.cropId)} />
                                                                                                    <Text color={(farming.cropDepot.find(crop => crop.index == cost.cropId)?.quantityOwned ?? 0) > cost.cropQuantity ? 'green-1' : ''} size="small">{nFormatter(farming.cropDepot.find(crop => crop.index == cost.cropId)?.quantityOwned ?? 0)}/{nFormatter(cost.cropQuantity)}</Text>
                                                                                                </Box>
                                                                                        )
                                                                                        })
                                                                                }
                                                                            </Box>                                                                          
                                                                        }
                                                                    />
                                                                </Box>
                                                            }
                                                            direction={TipDirection.Down}
                                                        >
                                                            <ComponentAndLabel
                                                                label={label}
                                                                component={
                                                                    <Box gap="xsmall" direction="row" align="center">
                                                                        <IconImage data={Crop.getCropIconData(nextLevelCost.cropId)} />
                                                                        <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(nextLevelCost.cropQuantity)}</Text>
                                                                    </Box>                                                                          
                                                                }
                                                            />
                                                        </TipDisplay>
                                                        :
                                                        <ComponentAndLabel
                                                            label={label}
                                                            component={
                                                                <Box gap="xsmall" direction="row" align="center">
                                                                    <Text size="small">MAXED</Text>
                                                                </Box>                                                                       
                                                            }
                                                        />                                                        
                                                    :
                                                    <ComponentAndLabel
                                                        label={label}
                                                        component={
                                                            <Box/>
                                                        }
                                                    /> 
                                            }                                            
                                        </Box>
                                    </ShadowBox>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </ShadowBox>
            <ShadowBox pad="small">
                <Box direction="row" margin={{ bottom: 'small' }} align="center" justify="center" gap="medium">
                    <IconImage data={Farming.getNightMarketImageData()} />
                    <Text>Night Market</Text>
                </Box>
                <Grid columns={{ size: 'auto', count: (size == "small" ? 1 : 4) }} fill>
                    {
                        farming.marketUpgrades.slice(8).map((upgrade, index) => {
                            const nextLevelCost = upgrade.getNextLevelCost();
                            const canAfford = farming.magicBeansOwned > nextLevelCost.cropQuantity;

                            // Cost for 5 more levels
                            const futureLevelsCost = [upgrade.getNextLevelCost(upgrade.level + 1), upgrade.getNextLevelCost(upgrade.level + 2), upgrade.getNextLevelCost(upgrade.level + 3), upgrade.getNextLevelCost(upgrade.level + 4), upgrade.getNextLevelCost(upgrade.level + 5)];
                            let canAffortFutureLevels: boolean[] = [];
                            futureLevelsCost.forEach((cost, index) => {
                                if (cost.cropQuantity > 0) {
                                    let currencyLeft = farming.magicBeansOwned;
                                    if (nextLevelCost.cropId == cost.cropId) {
                                        currencyLeft -= nextLevelCost.cropQuantity;
                                    }
                                    for (let i = 0; i < index; i++) {
                                        if (futureLevelsCost[i].cropId == cost.cropId) {
                                            currencyLeft -= futureLevelsCost[i].cropQuantity;
                                        }
                                    }
                                    canAffortFutureLevels.push(currencyLeft > cost.cropQuantity);
                                } else {
                                    canAffortFutureLevels.push(false);
                                }
                            });

                            // Get costs to max upgrade as for night market there's only one cost type
                            const costTo10 = upgrade.getTotalCostUntilLevel(upgrade.level, (upgrade.data.maxLvl - upgrade.level > 10) ? upgrade.level + 10 : upgrade.data.maxLvl);
                            const costTo25 = upgrade.getTotalCostUntilLevel(upgrade.level, (upgrade.data.maxLvl - upgrade.level > 25) ? upgrade.level + 25 : upgrade.data.maxLvl);
                            const costTo50 = upgrade.getTotalCostUntilLevel(upgrade.level, (upgrade.data.maxLvl - upgrade.level > 50) ? upgrade.level + 50 : upgrade.data.maxLvl);
                            const costToMax = upgrade.getTotalCostUntilLevel();

                            let label = "";
                            if (upgrade.unlocked) {
                                label = (upgrade.level > 0 ? "Next level cost" : "Unlock Cost");
                            } else {
                                label = `Find ${upgrade.data.cropReq - farming.discoveredCrops} more crops type to unlock`;
                            }

                            return (
                                <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                    <Box gap="small" justify="between" fill>
                                        <TextAndLabel textSize='xsmall' text={farming.getMarketUpgradeBonusText(upgrade.index)} label={`${upgrade.data.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level}${upgrade.data.maxLvl > upgrade.level ? `/${upgrade.data.maxLvl}` : ``})` : ``}`} />
                                        {
                                            upgrade.unlocked ?
                                                upgrade.level < upgrade.data.maxLvl ?
                                                    <TipDisplay
                                                        size='medium'
                                                        heading={"More next levels cost"}
                                                        body={
                                                            <Box gap="small">
                                                                <Box gap="xxsmall">
                                                                    {
                                                                        futureLevelsCost.map((cost, index) => {
                                                                            return ((cost.cropQuantity > 0)
                                                                                && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                        <IconImage data={Crop.getMagicBeanIconData()} />
                                                                                        <Text color={canAffortFutureLevels[index] ? 'green-1' : ''} size="small">{nFormatter(cost.cropQuantity)}</Text>
                                                                                    </Box>
                                                                            )
                                                                        })
                                                                    }
                                                                </Box>
                                                                {
                                                                    (upgrade.data.maxLvl - upgrade.level > 10) &&
                                                                    <ComponentAndLabel
                                                                        label="Total cost for next 10 levels"
                                                                        labelColor=''
                                                                        component={
                                                                            <Box gap="xsmall">                                                                            
                                                                                {
                                                                                    costTo10.map((cost, index) => {
                                                                                        return ((cost.cropQuantity > 0)
                                                                                            && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                                    <IconImage data={Crop.getMagicBeanIconData()} />
                                                                                                    <Text color={farming.magicBeansOwned > cost.cropQuantity ? 'green-1' : ''} size="small">{nFormatter(farming.magicBeansOwned)}/{nFormatter(cost.cropQuantity)}</Text>
                                                                                                </Box>
                                                                                        )
                                                                                        })
                                                                                }
                                                                            </Box>                                                                          
                                                                        }
                                                                    />
                                                                }
                                                                {
                                                                    (upgrade.data.maxLvl - upgrade.level > 25) && 
                                                                    <ComponentAndLabel
                                                                        label="Total cost for next 25 levels"
                                                                        labelColor=''
                                                                        component={
                                                                            <Box gap="xsmall">                                                                            
                                                                                {
                                                                                    costTo25.map((cost, index) => {
                                                                                        return ((cost.cropQuantity > 0)
                                                                                            && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                                    <IconImage data={Crop.getMagicBeanIconData()} />
                                                                                                    <Text color={farming.magicBeansOwned > cost.cropQuantity ? 'green-1' : ''} size="small">{nFormatter(farming.magicBeansOwned)}/{nFormatter(cost.cropQuantity)}</Text>
                                                                                                </Box>
                                                                                        )
                                                                                        })
                                                                                }
                                                                            </Box>                                                                          
                                                                        }
                                                                    />
                                                                }
                                                                {
                                                                    (upgrade.data.maxLvl - upgrade.level > 50) && 
                                                                    <ComponentAndLabel
                                                                        label="Total cost for next 50 levels"
                                                                        labelColor=''
                                                                        component={
                                                                            <Box gap="xsmall">                                                                            
                                                                                {
                                                                                    costTo50.map((cost, index) => {
                                                                                        return ((cost.cropQuantity > 0)
                                                                                            && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                                    <IconImage data={Crop.getMagicBeanIconData()} />
                                                                                                    <Text color={farming.magicBeansOwned > cost.cropQuantity ? 'green-1' : ''} size="small">{nFormatter(farming.magicBeansOwned)}/{nFormatter(cost.cropQuantity)}</Text>
                                                                                                </Box>
                                                                                        )
                                                                                        })
                                                                                }
                                                                            </Box>                                                                          
                                                                        }
                                                                    />
                                                                }
                                                                <ComponentAndLabel
                                                                    label="Total cost to max"
                                                                    labelColor=''
                                                                    component={
                                                                        <Box gap="xsmall">                                                                            
                                                                            {
                                                                                costToMax.map((cost, index) => {
                                                                                    return ((cost.cropQuantity > 0)
                                                                                        && <Box gap="xsmall" direction="row" align="center" key={index}>
                                                                                                <IconImage data={Crop.getMagicBeanIconData()} />
                                                                                                <Text color={farming.magicBeansOwned > cost.cropQuantity ? 'green-1' : ''} size="small">{nFormatter(farming.magicBeansOwned)}/{nFormatter(cost.cropQuantity)}</Text>
                                                                                            </Box>
                                                                                    )
                                                                                    })
                                                                            }
                                                                        </Box>                                                                          
                                                                    }
                                                                />
                                                            </Box>
                                                        }
                                                        direction={TipDirection.Down}
                                                    >
                                                        <ComponentAndLabel
                                                            label={label}
                                                            component={
                                                                <Box gap="xsmall" direction="row" align="center">
                                                                    <IconImage data={Crop.getMagicBeanIconData()} />
                                                                    <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(nextLevelCost.cropQuantity)}</Text>
                                                                </Box>                                                                          
                                                            }
                                                        />
                                                    </TipDisplay>
                                                    :
                                                    <ComponentAndLabel
                                                        label={label}
                                                        component={
                                                            <Box gap="xsmall" direction="row" align="center">
                                                                <Text size="small">MAXED</Text>
                                                            </Box>                                                                       
                                                        }
                                                    />                                                        
                                                :
                                                <ComponentAndLabel
                                                    label={label}
                                                    component={
                                                        <Box/>
                                                    }
                                                /> 
                                        }
                                    </Box>
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </ShadowBox>
        </Box>
    )
}