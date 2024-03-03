import { Box, Grid, ResponsiveContext, Stack, Text } from "grommet";
import { useContext, useState } from "react";
import TabButton from "../../base/TabButton";
import { Crop, Farming, MarketUpgrade } from "../../../data/domain/world-6/farming";
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
                    <Box direction="row" align="center" margin={{ top: 'small', bottom: 'small' }} justify="center" gap="medium">
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

                                let label = "test";
                                if (upgrade.unlocked) {
                                    label = (upgrade.level > 0 ? "Next level cost" : "Unlock Cost");
                                } else {
                                    label = `Find ${upgrade.data.cropReq - farming.discoveredCrops} more crops type to unlock`;
                                }

                                return (
                                    <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Box gap="small" justify="between" fill>
                                            <TextAndLabel textSize='xsmall' text={farming.getMarketUpgradeBonusText(upgrade.index)} label={`${upgrade.data.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level})` : ``}`} />
                                            {
                                                upgrade.unlocked ?
                                                    upgrade.level < upgrade.data.maxLvl ?
                                                        <TipDisplay
                                                            size='medium'
                                                            heading={"More next levels cost"}
                                                            body={
                                                                <Box gap="xxsmall">
                                                                    {(futureLevelsCost[0].cropQuantity > 0)
                                                                        && <Box gap="xsmall" direction="row" align="center">
                                                                                <IconImage data={Crop.getCropIconData(futureLevelsCost[0].cropId)} />
                                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{futureLevelsCost[0].cropQuantity}</Text>
                                                                            </Box>}
                                                                    {(futureLevelsCost[1].cropQuantity > 0)
                                                                        && <Box gap="xsmall" direction="row" align="center">
                                                                                <IconImage data={Crop.getCropIconData(futureLevelsCost[1].cropId)} />
                                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{futureLevelsCost[1].cropQuantity}</Text>
                                                                            </Box>}
                                                                    {(futureLevelsCost[2].cropQuantity > 0)
                                                                        && <Box gap="xsmall" direction="row" align="center">
                                                                                <IconImage data={Crop.getCropIconData(futureLevelsCost[2].cropId)} />
                                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{futureLevelsCost[2].cropQuantity}</Text>
                                                                            </Box>}
                                                                    {(futureLevelsCost[3].cropQuantity > 0)
                                                                        && <Box gap="xsmall" direction="row" align="center">
                                                                                <IconImage data={Crop.getCropIconData(futureLevelsCost[3].cropId)} />
                                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{futureLevelsCost[3].cropQuantity}</Text>
                                                                            </Box>}
                                                                    {(futureLevelsCost[4].cropQuantity > 0)
                                                                        && <Box gap="xsmall" direction="row" align="center">
                                                                                <IconImage data={Crop.getCropIconData(futureLevelsCost[4].cropId)} />
                                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{futureLevelsCost[4].cropQuantity}</Text>
                                                                            </Box>}
                                                                </Box>
                                                            }
                                                            direction={TipDirection.Down}
                                                        >
                                                            <ComponentAndLabel
                                                                label={label}
                                                                component={
                                                                    <Box gap="xsmall" direction="row" align="center">
                                                                        <IconImage data={Crop.getCropIconData(nextLevelCost.cropId)} />
                                                                        <Text color={canAfford ? 'green-1' : ''} size="small">{nextLevelCost.cropQuantity}</Text>
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
                <Box direction="row" margin={{ top: 'small', bottom: 'small' }} align="center" justify="center" gap="medium">
                    <IconImage data={Farming.getNightMarketImageData()} />
                    <Text>Night Market</Text>
                </Box>
                <Grid columns={{ size: 'auto', count: (size == "small" ? 1 : 4) }} fill>
                    {
                        farming.marketUpgrades.slice(8).map((upgrade, index) => {
                            const nextLevelCost = upgrade.getNextLevelCost();
                            const canAfford = farming.magicBeansOwned > nextLevelCost.cropQuantity;

                            let label = "test";
                            if (upgrade.unlocked) {
                                label = (upgrade.level > 0 ? "Next level cost" : "Unlock Cost");
                            } else {
                                label = `Find ${upgrade.data.cropReq - farming.discoveredCrops} more crops type to unlock`;
                            }

                            return (
                                <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                    <Box gap="small" justify="between" fill>
                                        <TextAndLabel textSize='xsmall' text={farming.getMarketUpgradeBonusText(upgrade.index)} label={`${upgrade.data.name} ${upgrade.level > 0 ? `(Lv. ${upgrade.level})` : ``}`} />
                                        <ComponentAndLabel
                                            label={label}
                                            component={
                                                upgrade.unlocked ?
                                                    upgrade.level < upgrade.data.maxLvl ?
                                                        <Box gap="xsmall" direction="row" align="center">
                                                            <IconImage data={Crop.getMagicBeanIconData()} />
                                                            <Text color={canAfford ? 'green-1' : ''} size="small">{nextLevelCost.cropQuantity}</Text>
                                                        </Box>
                                                        :
                                                        <Box gap="xsmall" direction="row" align="center">
                                                            <Text size="small">MAXED</Text>
                                                        </Box>
                                                    :
                                                    <Box></Box>
                                            }
                                        />
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