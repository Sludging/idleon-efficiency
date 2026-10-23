"use client"

import { Box, CheckBox, Text } from "grommet";
import { useMemo, useState } from "react";
import { UpgradeVault } from "../../data/domain/upgradeVault";
import { getCoinsArray, nFormatter } from "../../data/utility";
import DataRow, { type DataRowField } from "../base/DataRow";
import { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import CoinsDisplay from "../coinsDisplay";
import IconImage from "../base/IconImage";
import styled from "styled-components";

const CompactCoins = styled(Box)`
    span { font-size: 14px; line-height: 20px; }
    > div, > div > div { align-items: center; }
`;

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
                upgrade.level < upgrade.getMaxLevel()
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
        <Box gap="small" pad="large">
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
                    const costFields: DataRowField[] = !upgrade.unlocked ? [
                        {
                            key: 'unlock',
                            kind: 'content',
                            label: null,
                            content: <Text size="xsmall">Unlock in {upgrade.data.unlock_req - upgradeVault.totalVaultLevel}</Text>
                        }
                    ] : upgrade.level >= upgrade.getMaxLevel() ? [
                        { key: 'maxed', kind: 'content', label: null, content: <Text size="small">Maxed</Text> }
                    ] : [
                        {
                            key: 'next-cost',
                            kind: 'content',
                            label: 'Next level cost',
                            content: <CompactCoins><CoinsDisplay coinMap={getCoinsArray(upgrade.cost)} maxCoins={3} regularRow /></CompactCoins>
                        },
                        {
                            key: 'max-cost',
                            kind: 'content',
                            label: 'Cost to max',
                            content: <CompactCoins><CoinsDisplay coinMap={getCoinsArray(upgrade.costToMax)} maxCoins={3} regularRow /></CompactCoins>
                        }
                    ];
                    return (
                        <DataRow
                            key={index}
                            opacity={upgrade.unlocked ? 1 : 0.6}
                            columns={['25fr', '30fr', '10fr', '15fr', '15fr']}
                            fields={[
                                {
                                    key: 'identity',
                                    kind: 'identity',
                                    name: upgrade.data.name,
                                    artwork: <IconImage data={upgrade.getImageData()} scale={0.7} />
                                },
                                { key: 'bonus', kind: 'text', label: 'Bonus', value: upgrade.getDescription(), role: 'description' },
                                { key: 'level', kind: 'text', label: 'Level', value: `${upgrade.level} / ${upgrade.getMaxLevel()}` },
                                ...costFields
                            ]}
                        />
                    )
                })
            }
        </Box>
    )
} 