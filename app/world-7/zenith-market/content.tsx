'use client';

import { Box, CheckBox, Grid, Heading, Text } from 'grommet';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ResourceDisplay } from '../../../components/account/shared/ResourceDisplay';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import { commaNotation } from '../../../data/utility';
import { Item } from '../../../data/domain/items';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { DataStatus } from '../../../lib/stores/appDataStore';

const clusterImageData = Item.getImageData('Quest110');

export default function ZenithMarketContent() {
    const [showMaxed, setShowMaxed] = useState(true);
    const { theData, dataStatus } = useAppDataStore(useShallow((state) => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
        dataStatus: state.dataStatus,
    })));
    const market = theData.get('zenithMarket') as ZenithMarket | undefined;

    if ((dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !market) {
        return <Text>Loading...</Text>;
    }

    const clusterLocations = market.nonDepositedClusters;
    const clusterCountInStorage = clusterLocations.reduce((total, location) => total + location.quantity, 0);
    const totalOwnedClusters = market.depositedClusters + clusterCountInStorage;
    const totalUpgradeLevels = market.bonuses.reduce((total, bonus) => total + bonus.level, 0);
    const maxedUpgradeCount = market.bonuses.filter((bonus) => bonus.level >= bonus.data.maxLevel).length;

    return (
        <Box gap="medium">
            <Box gap="xsmall">
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Zenith Market</Heading>
            </Box>

            <Grid columns={{ count: 'fill', size: '220px' }} gap="small">
                <ShadowBox background="dark-1" pad="small">
                    <Box direction="row" align="center" gap="small">
                        <IconImage data={clusterImageData} scale={0.7} />
                        <TextAndLabel
                            label="Total Zenith Clusters"
                            text={commaNotation(totalOwnedClusters)}
                            textSize="small"
                            labelSize="xsmall"
                            tooltip={
                                <Box gap="xxsmall">
                                    <Text size="xsmall">Deposited: {commaNotation(market.depositedClusters)}</Text>
                                    {clusterLocations.length > 0
                                        ? clusterLocations.map((location, index) => (
                                            <Text key={`${location.source}-${index}`} size="xsmall">
                                                {location.source}: {commaNotation(location.quantity)}
                                            </Text>
                                        ))
                                        : <Text size="xsmall">No Zenith Clusters in bags or storage.</Text>}
                                </Box>
                            }
                        />
                    </Box>
                </ShadowBox>
                <ShadowBox background="dark-1" pad="small">
                    <TextAndLabel
                        label="Total Upgrade LV"
                        text={commaNotation(totalUpgradeLevels)}
                        textSize="small"
                        labelSize="xsmall"
                    />
                </ShadowBox>
                <ShadowBox background="dark-1" pad="small">
                    <TextAndLabel
                        label="Upgrades at maximum"
                        text={`${maxedUpgradeCount} / ${market.bonuses.length}`}
                        textSize="small"
                        labelSize="xsmall"
                    />
                </ShadowBox>
            </Grid>
            <CheckBox
                checked={showMaxed}
                label="Show maxed"
                onChange={(event) => setShowMaxed(event.target.checked)}
            />

            <Grid columns={{ count: 'fill', size: '260px' }} gap="medium">
                {market.bonuses
                    .filter((bonus) => showMaxed || bonus.level < bonus.data.maxLevel)
                    .map((bonus) => {
                        const maxed = bonus.level >= bonus.data.maxLevel;
                        const nextLevelCost = maxed ? undefined : bonus.getNextLevelCost();
                        const costToMax = maxed ? undefined : bonus.getCostToMax();
                        const previousUpgrade = market.bonuses[bonus.index - 1];
                        const bonusText = bonus.getBonusText();
                        const bonusValue = bonusText.match(/^[+-]?\d[\d,.]*(?:[A-Za-z])?(?:x|%)?/);
                        const bonusDescription = bonusValue ? bonusText.slice(bonusValue[0].length).trimStart() : bonusText;
                        return (
                            <ShadowBox
                                key={bonus.index}
                                background="dark-1"
                                pad="medium"
                                gap="small"
                                fill
                                justify="between"
                                style={{ opacity: bonus.unlocked ? 1 : 0.5 }}
                            >
                                <Box direction="row" align="start" justify="between" gap="small">
                                    <Text size="small" weight="bold">{bonus.data.name}</Text>
                                    <Text size="xsmall">Lv. {commaNotation(bonus.level)} / {commaNotation(bonus.data.maxLevel)}</Text>
                                </Box>
                                {bonusValue ? (
                                    <Box direction="row" align="baseline" gap="small">
                                        <Text size="28px" weight={700} color="text" style={{ lineHeight: '34px' }}>{bonusValue[0]}</Text>
                                        {bonusDescription && <Text size="xsmall">{bonusDescription}</Text>}
                                    </Box>
                                ) : (
                                    <Text size="xsmall">{bonusText}</Text>
                                )}
                                {!bonus.unlocked && previousUpgrade && (
                                    <Text size="xsmall">Unlocks when {previousUpgrade.data.name} reaches level 1.</Text>
                                )}
                                {!maxed && nextLevelCost !== undefined && costToMax !== undefined && (
                                    <Box direction="row" justify="between" gap="small">
                                        <ComponentAndLabel
                                            label="Next level cost"
                                            labelSize="xsmall"
                                            component={
                                                <ResourceDisplay
                                                    cost={nextLevelCost}
                                                    canAfford={totalOwnedClusters >= nextLevelCost}
                                                    resourceImageData={clusterImageData}
                                                    resourceImageScale={0.6}
                                                    textSize="xsmall"
                                                />
                                            }
                                        />
                                        <ComponentAndLabel
                                            label="Cost to max"
                                            labelSize="xsmall"
                                            component={
                                                <ResourceDisplay
                                                    cost={costToMax}
                                                    canAfford={totalOwnedClusters >= costToMax}
                                                    resourceImageData={clusterImageData}
                                                    resourceImageScale={0.6}
                                                    textSize="xsmall"
                                                />
                                            }
                                        />
                                    </Box>
                                )}
                            </ShadowBox>
                        );
                    })}
            </Grid>
        </Box>
    );
}
