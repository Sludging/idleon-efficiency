"use client"

import { Box, CheckBox, Text } from "grommet";
import { useMemo, useState } from "react";
import { UpgradeVault } from "../../data/domain/upgradeVault";
import { getCoinsArray, nFormatter } from "../../data/utility";
import DataRow, { type DataRowField } from "../base/DataRow";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import CoinsDisplay from "../coinsDisplay";
import IconImage from "../base/IconImage";
import styled from "styled-components";
import TipDisplay from "../base/TipDisplay";
import useHydrated from "../../lib/hooks/useHydrated";

const CompactCoins = styled(Box)`
    span { font-size: 14px; line-height: 20px; }
    > div, > div > div { align-items: center; }
`;

export function UpgradeVaultDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [hideLocked, setHideLocked] = useState(true);
    const hydrated = useHydrated();
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

    if (!hydrated || !upgradeVault) {
        return <Box>Loading Upgrade Vault…</Box>;
    }

    const cheaperMultiplier = upgradeVault.getCostReductionMultiplier();
    const sourceMultipliers = upgradeVault.getCostReductionMultipliers();
    const costReductionSources = [
        { label: "Darts", multiplier: sourceMultipliers.darts },
        { label: "Sushi Roll companion", multiplier: sourceMultipliers.sushiRoll },
        { label: "Sushi Station", multiplier: sourceMultipliers.sushiStation },
    ];

    return (
        <Box gap="small">
            <Box direction="row" wrap gap="medium" align="center" justify="between" margin={{ bottom: "small" }}>
                <Box direction="row" wrap gap="medium" align="start">
                    <TextAndLabel
                        label="Total Vault level"
                        labelSize="xsmall"
                        textSize="large"
                        text={nFormatter(upgradeVault.totalVaultLevel)}
                    />
                    {cheaperMultiplier > 1 && (
                        <ComponentAndLabel
                            label="Vault cost reduction"
                            labelSize="xsmall"
                            component={
                                <TipDisplay
                                    heading="Vault cost reduction"
                                    size="small"
                                    maxWidth="620px"
                                    body={
                                        <Box gap="xsmall" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                                            <Box gap="xxsmall">
                                                {costReductionSources.map(source => (
                                                    <Text key={source.label} size="xsmall" style={{ opacity: source.multiplier === 1 ? 0.6 : 1 }}>
                                                        {source.label}: ×{source.multiplier.toFixed(2)}
                                                    </Text>
                                                ))}
                                            </Box>
                                            <Text size="xsmall">Excludes Major Discount and color-band price floors. Individual prices can differ.</Text>
                                        </Box>
                                    }
                                >
                                    <Text tabIndex={0} size="large" weight="bold" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                                        {cheaperMultiplier.toFixed(2)}x cheaper
                                    </Text>
                                </TipDisplay>
                            }
                        />
                    )}
                </Box>
                <Box direction="row" wrap gap="medium">
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