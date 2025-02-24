"use client"

import { Box, CheckBox, Grid, Text } from "grommet";
import { useMemo, useState } from "react";
import { UpgradeVault } from "../../data/domain/upgradeVault";
import { getCoinsArray, nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import CoinsDisplay from "../coinsDisplay";

export function UpgradeVaultDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [hideLocked, setHideLocked] = useState(true);
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const upgradeVault = theData.get("upgradeVault") as UpgradeVault;

    const upgradesToShow = useMemo(() => {
        if (!upgradeVault) {
            return [];
        }

        let filteredUpgrades = upgradeVault.bonuses;

        if (hideMaxed) {
            filteredUpgrades = filteredUpgrades.filter(upgrade => 
                upgrade.level < upgrade.data.max_level
            );
        }

        if (hideLocked) {
            filteredUpgrades = filteredUpgrades.filter(upgrade => 
                upgrade.unlocked
            );
        }
        return filteredUpgrades;
    }, [upgradeVault, hideMaxed, hideLocked, lastUpdated]);

    return (
        <Box gap="medium" pad="large">
            <Box direction="row" gap="medium">
                <ComponentAndLabel
                    label="Total Vault Level"
                    component={
                        <Box direction="row" gap="small">
                            <Text>{nFormatter(upgradeVault?.totalVaultLevel || 0)}</Text>
                        </Box>
                    }
                />
                <Box direction="row" gap="medium">
                    <CheckBox
                        checked={hideMaxed}
                        label="Hide max level"
                        onChange={(event) => setHideMaxed(event.target.checked)}
                    />
                    <CheckBox
                        checked={hideLocked}
                        label="Hide locked"
                        onChange={(event) => setHideLocked(event.target.checked)}
                    />
                </Box>
            </Box>
            {
                upgradesToShow.map((upgrade, index) => {
                    const isMaxLevel = upgrade.level >= upgrade.data.max_level;
                    return (
                        <ShadowBox 
                            style={{ opacity: upgrade.unlocked ? 1 : 0.6 }} 
                            key={index} 
                            background="dark-1" 
                            pad="medium" 
                            direction="row" 
                            align="center" 
                            justify="between" 
                            margin={{ bottom: 'small' }}
                        >
                            <Grid columns={["25%", "30%", "10%", "15%", "15%"]} gap="small" align="start" fill>
                                <TextAndLabel 
                                    labelSize="xsmall" 
                                    textSize='small' 
                                    text={upgrade.data.name} 
                                    label="Name" 
                                />
                                <TextAndLabel 
                                    labelSize="xsmall" 
                                    textSize='xsmall' 
                                    text={upgrade.getDescription()} 
                                    label="Bonus" 
                                />
                                <TextAndLabel 
                                    labelSize="xsmall" 
                                    textSize='small' 
                                    text={`${upgrade.level} / ${upgrade.data.max_level}`} 
                                    label="Level" 
                                />
                                {!isMaxLevel && (
                                    <ComponentAndLabel 
                                        labelSize="xsmall"
                                        label="Next level cost"
                                        component={
                                            <CoinsDisplay coinMap={getCoinsArray(upgrade.cost)} maxCoins={3} />
                                        }
                                    />
                                )}
                                {!isMaxLevel && (
                                    <ComponentAndLabel 
                                        labelSize="xsmall"
                                        label="Cost to max"
                                        component={
                                            <CoinsDisplay coinMap={getCoinsArray(upgrade.costToMax)} maxCoins={3} />
                                        }
                                    />
                                )}
                            </Grid>
                        </ShadowBox>
                    )
                })
            }
        </Box>
    )
} 