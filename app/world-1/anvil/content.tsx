"use client"

import {
    Box,
    Heading,
    Meter,
    Stack,
    Text,
} from 'grommet'
import { useMemo, useState } from 'react';
import { Anvil as AnvilModel, AnvilProduct, AnvilWrapper } from '../../../data/domain/anvil';
import { Player } from '../../../data/domain/player';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { StaticTime } from '../../../components/base/TimeDisplay';
import TabButton from '../../../components/base/TabButton';
import { getCoinsArray, nFormatter } from '../../../data/utility';
import CoinsDisplay from '../../../components/coinsDisplay';
import { CircleInformation } from 'grommet-icons';
import { CharacterBox } from '../../../components/base/CharacterBox';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function ProductionProgress({ player, playerAnvil, anvilItem }: { player: Player, playerAnvil: AnvilModel, anvilItem: AnvilProduct }) {
    return (
        <Box gap="small" width={{ min: '250px' }}>
            <Box direction="row" align="center" margin={{ vertical: 'xsmall' }}>
                <Box margin={{ right: 'xsmall' }}>
                    <IconImage data={player.getClassImageData()} scale={0.6} />
                </Box>
                {player.playerName ? player.playerName : `Character ${player.playerID}`}
            </Box>
            <Box key={`player_${player.playerID}_anvil`} direction="column" align="center">
                <Box direction="row" gap="small">
                    <Stack>
                        <Meter
                            size="small"
                            type="bar"
                            background="accent-3"
                            color="brand"
                            values={[
                                {
                                    value: anvilItem.futureProduction,
                                    label: 'current',
                                    color: 'brand'
                                }
                            ]}
                            max={playerAnvil.productCapacity} />
                        <Box align="center" pad="xxsmall">
                            <Text size="small">{anvilItem.futureProduction.toString()} ({(anvilItem.percentOfCap)}%)</Text>
                        </Box>
                    </Stack>
                    <Text size="xsmall">{nFormatter(playerAnvil.productCapacity)}</Text>
                </Box>
                <ComponentAndLabel
                    label={"Time till cap"}
                    labelSize="xsmall"
                    component={
                        <StaticTime fromSeconds={anvilItem.timeTillCap} />
                    }
                />
            </Box>
        </Box>
    )
}

function PointsDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const anvilWrapper = theData.get("anvil") as AnvilWrapper;
    const players = theData.get("players") as Player[];
    const storage = theData.get("storage") as Storage;

    const totalMatCosts = useMemo(() => {
        const finalCosts: Record<string, {
            totalCost: number,
            playerCosts: Record<number, number>
        }> = {};

        if (!anvilWrapper) {
            return Object.entries(finalCosts);
        }

        Object.entries(anvilWrapper.playerAnvils).forEach(([_, playerAnvil]) => {
            const playerCosts = playerAnvil.getMonsterCostToMax();
            Object.entries(playerCosts).forEach(([monsterMat, cost]) => {
                if (!finalCosts[monsterMat]) {
                    finalCosts[monsterMat] = {
                        totalCost: 0,
                        playerCosts: {}
                    };
                }
                finalCosts[monsterMat].totalCost = finalCosts[monsterMat].totalCost + cost;
                finalCosts[monsterMat].playerCosts[playerAnvil.playerID] = cost;
            })
        });
        return Object.entries(finalCosts);
    }, [anvilWrapper])

    const totalPointCosts = useMemo(() => {
        if (!anvilWrapper) {
            return 0;
        }

        return Object.entries(anvilWrapper.playerAnvils).reduce((sum, [_, playerAnvil]) =>
            sum += playerAnvil.getCoinCostToMax()
            , 0)
    }, [anvilWrapper])

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
                component=
                {
                    totalMatCosts.map(([monsterMat, costObject], index) => {
                        return (
                            <ShadowBox background="dark-1" direction="row" align="center" key={index} margin={{ bottom: 'small', right: 'small' }} pad="small" gap="small" justify="start">
                                <Box gap="small" align="center" width={{ min: '100px', max: '100px' }}>
                                    <IconImage data={{
                                        location: monsterMat,
                                        height: 36,
                                        width: 36
                                    }} scale={0.8} />
                                    <TextAndLabel
                                        text={`${nFormatter(costObject.totalCost)} (${nFormatter(storage.amountInStorage(monsterMat))})`}
                                        textColor={storage.amountInStorage(monsterMat) > costObject.totalCost ? 'green-1' : 'white'}
                                        label="Total costs"
                                        textSize='small'
                                    />
                                </Box>
                                <Box direction="row" wrap>
                                    {
                                        Object.entries(costObject.playerCosts).map(([playerID, playerCost]) => {
                                            const playerNumber = parseInt(playerID);
                                            return (
                                                <Box margin={{ right: 'small', bottom: 'small' }} key={playerNumber}>
                                                    <CharacterBox player={players[playerNumber]} borderColor="grey-1">
                                                        <Box align="end"><Text size="small">{nFormatter(playerCost)}</Text></Box>
                                                    </CharacterBox>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            />
        </Box>
    )
}

function AnvilProductionDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const anvilWrapper = theData.get("anvil") as AnvilWrapper;
    const players = theData.get("players") as Player[];

    const totalSpeed = useMemo(() => {
        if (!anvilWrapper) {
            return 0;
        }

        return Object.entries(anvilWrapper.playerAnvils).reduce((sum, [_, playerAnvil]) =>
            sum += playerAnvil.anvilSpeed
            , 0)
    }, [anvilWrapper])

    const unusedHammers = useMemo(() => {
        if (!anvilWrapper) {
            return 0;
        }

        return Object.entries(anvilWrapper.playerAnvils).reduce((sum, [_, playerAnvil]) =>
            sum += playerAnvil.currentlySelect.indexOf(-1) > -1 ? 1 : 0
            , 0)
    }, [anvilWrapper])

    return (
        <Box>
            <Box direction="row">
                <ShadowBox background="dark-1" pad="medium" margin={{ bottom: 'medium', right: 'medium' }} width="200px">
                    <TextAndLabel
                        label={"Total anvil speed"}
                        text={nFormatter(totalSpeed)}
                    />
                </ShadowBox>
                {unusedHammers > 0 &&
                    <ShadowBox background="dark-1" pad="medium" margin={{ bottom: 'medium' }} direction="row" gap="small">
                        <Box width={{ max: '150px' }}>
                            <TextAndLabel
                                label={"Characters with unused hammers"}
                                text={nFormatter(unusedHammers)}
                            />
                        </Box>
                        <Box direction="row" wrap gap="xsmall">
                            {
                                Object.entries(anvilWrapper.playerAnvils).filter(([_, playerAnvil]) => playerAnvil.currentlySelect.indexOf(-1) > -1)
                                    .map(([_, playerAnvil]) => (
                                        <CharacterBox key={playerAnvil.playerID} player={players[playerAnvil.playerID]} />
                                    ))
                            }
                        </Box>
                    </ShadowBox>
                }
            </Box>
            <Text size="xsmall">* Timers on this page don&apos;t tick down on purpose, they will update on every cloud save update.</Text>
            {
                anvilWrapper ? anvilWrapper.production.filter(anvilProduct => anvilProduct.totalSpeed > 0).map(anvilProduct => (
                    <ShadowBox background="dark-1" direction="row" key={anvilProduct.index} gap="small" margin={{ bottom: 'medium' }} pad="small">
                        <Box gap="medium" width={{ min: '100px', max: '100px' }}>
                            <IconImage data={{ height: 36, location: `${anvilProduct.data.item}`, width: 36 }} scale={1.2} />
                            <TextAndLabel
                                label={"Production Per Hour"}
                                text={`${Math.round(anvilProduct.totalSpeed / anvilProduct.data.time)}`}
                            />
                        </Box>
                        <Box direction="row" wrap>
                            {
                                Object.entries(anvilWrapper.playerAnvils).filter(([_, playerAnvil]) =>
                                    playerAnvil.production[anvilProduct.index].hammers > 0
                                ).map(([_, playerAnvil]) => (
                                    <Box key={`${anvilProduct.index}_${playerAnvil.playerID}`} margin={{ right: 'small', bottom: 'small' }} border={{ color: 'grey-3', side: 'all', size: '1px' }} pad="small">
                                        <ProductionProgress player={players[playerAnvil.playerID]} playerAnvil={playerAnvil} anvilItem={playerAnvil.production[anvilProduct.index]} />
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>
                )) : <Box>Loading</Box>
            }
        </Box>
    )
}

function Anvil() {
    const [activeTab, setActiveTab] = useState<string>("Production");

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Anvil</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Production", "Points"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Production" && <AnvilProductionDisplay />}
                {activeTab == "Points" && <PointsDisplay />}
            </Box>
        </Box>
    )
}

export default Anvil;