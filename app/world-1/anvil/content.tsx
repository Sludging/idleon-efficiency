"use client"

import { Box, Heading, Text } from 'grommet';
import { useMemo, useState } from 'react';
import { AnvilWrapper } from '../../../data/domain/world-1/anvil';
import { Player } from '../../../data/domain/player';
import { CircleInformation } from 'grommet-icons';
import { Storage } from '../../../data/domain/storage';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import ContentTabs from '../../../components/base/ContentTabs';
import { getCoinsArray, nFormatter, notateNumber } from '../../../data/utility';
import CoinsDisplay from '../../../components/coinsDisplay';
import { CharacterBox } from '../../../components/base/CharacterBox';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';
import { AnvilProductProgress } from './anvilDetails';

function PointsDisplay({ anvilWrapper, players, storage, lastUpdated }: {
    anvilWrapper: AnvilWrapper; players: Player[]; storage: Storage; lastUpdated: Date;
}) {
    const totalMatCosts = useMemo(() => {
        const finalCosts: Record<string, { totalCost: number; playerCosts: Record<number, number> }> = {};

        Object.values(anvilWrapper.playerAnvils).forEach(anvil => {
            Object.entries(anvil.getMonsterCostToMax()).forEach(([material, cost]) => {
                if (!finalCosts[material]) {
                    finalCosts[material] = { totalCost: 0, playerCosts: {} };
                }
                finalCosts[material].totalCost += cost;
                finalCosts[material].playerCosts[anvil.playerID] = cost;
            });
        });
        return Object.entries(finalCosts);
    }, [anvilWrapper, lastUpdated]);

    const totalPointCosts = useMemo(() => Object.values(anvilWrapper.playerAnvils)
        .reduce((sum, anvil) => sum + anvil.getCoinCostToMax(), 0), [anvilWrapper, lastUpdated]);

    return (
        <Box>
            <Box margin={{ bottom: 'small' }} pad={{ right: 'xlarge', top: 'medium', bottom: 'medium' }} direction="row" align="center" gap="xsmall">
                <CircleInformation size="16px" />
                <Text size="small">
                    Each character can purchase a maximum of 600 anvil points with Coins or 700 points with Monster Drops.
                </Text>
            </Box>
            {totalPointCosts > 0 &&
                <ComponentAndLabel
                    label={"Cost to max anvil points from money"}
                    component={<CoinsDisplay coinMap={getCoinsArray(totalPointCosts)} maxCoins={5} />}
                    margin={{ bottom: 'medium' }}
                />
            }
            <ComponentAndLabel
                label={"Costs to max out points from monster mats"}
                component={
                    totalMatCosts.map(([monsterMat, costObject], index) => (
                        <ShadowBox background="dark-1" direction="row" align="center" key={index} margin={{ bottom: 'small', right: 'small' }} pad="small" gap="small" justify="start">
                            <Box gap="small" align="center" width={{ min: '100px', max: '100px' }}>
                                <IconImage data={{ location: monsterMat, height: 36, width: 36 }} scale={0.8} />
                                <TextAndLabel
                                    text={`${nFormatter(costObject.totalCost)} (${nFormatter(storage.amountInStorage(monsterMat))})`}
                                    textColor={storage.amountInStorage(monsterMat) > costObject.totalCost ? 'green-1' : 'white'}
                                    label="Total costs"
                                    textSize="small"
                                />
                            </Box>
                            <Box direction="row" wrap>
                                {Object.entries(costObject.playerCosts).map(([playerID, playerCost]) => {
                                    const playerNumber = parseInt(playerID);
                                    return (
                                        <Box margin={{ right: 'small', bottom: 'small' }} key={playerNumber}>
                                            <CharacterBox player={players[playerNumber]} borderColor="grey-1">
                                                <Box align="end"><Text size="small">{nFormatter(playerCost)}</Text></Box>
                                            </CharacterBox>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </ShadowBox>
                    ))
                }
            />
        </Box>
    );
}

function AnvilProductionDisplay({ anvilWrapper, players }: { anvilWrapper: AnvilWrapper; players: Player[] }) {
    const anvils = Object.values(anvilWrapper.playerAnvils);
    const totalSpeed = anvils.reduce((sum, anvil) => sum + anvil.anvilSpeed, 0);
    const unusedHammers = anvils.filter(anvil => anvil.currentlySelect.includes(-1));

    return (
        <Box>
            <Box direction="row">
                <ShadowBox background="dark-1" pad="medium" margin={{ bottom: 'medium', right: 'medium' }} width="200px">
                    <TextAndLabel label="Total anvil speed" text={nFormatter(totalSpeed)} />
                </ShadowBox>
                {unusedHammers.length > 0 &&
                    <ShadowBox background="dark-1" pad="medium" margin={{ bottom: 'medium' }} direction="row" gap="small">
                        <Box width={{ max: '150px' }}>
                            <TextAndLabel label="Characters with unused hammers" text={nFormatter(unusedHammers.length)} />
                        </Box>
                        <Box direction="row" wrap gap="xsmall">
                            {unusedHammers.map(anvil => <CharacterBox key={anvil.playerID} player={players[anvil.playerID]} />)}
                        </Box>
                    </ShadowBox>
                }
            </Box>
            {anvilWrapper.production.map(product => {
                const representedAnvils = anvils.filter(anvil => {
                    const characterProduct = anvil.production[product.index];
                    return characterProduct.hammers > 0 || characterProduct.futureProduction > 0 || characterProduct.currentXP > 0;
                });
                if (representedAnvils.length === 0) {
                    return null;
                }
                return (
                    <ShadowBox background="dark-1" direction="row" key={product.index} gap="small" margin={{ bottom: 'medium' }} pad="small">
                        <Box gap="medium" width={{ min: '100px', max: '100px' }}>
                            <IconImage data={{ height: 36, location: product.data.item, width: 36 }} scale={1.2} />
                            <TextAndLabel label="Production Per Hour" text={`${notateNumber(Math.round(product.totalSpeed / product.data.time))}`} />
                        </Box>
                        <Box direction="row" wrap>
                            {representedAnvils.map(anvil => (
                                <Box key={`${product.index}_${anvil.playerID}`} margin={{ right: 'small', bottom: 'small' }} border={{ color: 'grey-3', side: 'all', size: '1px' }} pad="small">
                                    <Box gap="small" width={{ min: '250px' }}>
                                        <Box direction="row" align="center" margin={{ vertical: 'xsmall' }}>
                                            <Box margin={{ right: 'xsmall' }}>
                                                <IconImage data={players[anvil.playerID].getClassImageData()} scale={0.6} />
                                            </Box>
                                            {players[anvil.playerID].playerName || `Character ${anvil.playerID}`}
                                        </Box>
                                        <AnvilProductProgress anvil={anvil} product={anvil.production[product.index]} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </ShadowBox>
                );
            })}
        </Box>
    );
}

function Anvil() {
    const [activeTab, setActiveTab] = useState<string>("Production");
    const hydrated = useHydrated();
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const anvilWrapper = theData.get("anvil") as AnvilWrapper | undefined;
    const players = theData.get("players") as Player[] | undefined;
    const storage = theData.get("storage") as Storage | undefined;

    return <Box>
        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Anvil</Heading>
        {!hydrated || !anvilWrapper || !players || players.length === 0 || !storage ? <Box>Loading...</Box> : <Box gap="small">
            <ContentTabs options={[{ value: "Production", label: "Production" }, { value: "Points", label: "Points" }]}
                value={activeTab} onChange={setActiveTab} />
            {activeTab === "Production" && <AnvilProductionDisplay anvilWrapper={anvilWrapper} players={players} />}
            {activeTab === "Points" && <PointsDisplay anvilWrapper={anvilWrapper} players={players} storage={storage} lastUpdated={lastUpdated} />}
        </Box>}
    </Box>;
}

export default Anvil;
