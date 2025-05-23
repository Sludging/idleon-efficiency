"use client"

import {
    Box,
    Grid,
    Heading,
    Text,
} from "grommet"

import { useEffect, useState } from 'react';
import ShadowBox from "../../../components/base/ShadowBox";
import { Player } from "../../../data/domain/player";
import LeftNavButton from "../../../components/base/LeftNavButton";
import ObolsInfo from "../../../components/account/task-board/obolsInfo";
import { ObolsData, ObolType } from "../../../data/domain/obols";
import TextAndLabel from "../../../components/base/TextAndLabel";
import TipDisplay, { TipDirection } from "../../../components/base/TipDisplay";
import { ItemStat } from "../../../data/domain/items";
import IconImage from "../../../components/base/IconImage";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import type { Metadata } from 'next'
import { useShallow } from "zustand/react/shallow";

function ObolInventory() {
    const [obolsData, setObolsData] = useState<ObolsData>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const statsDisplay = (stats: ItemStat[], description: string) => {
        if (description) {
            return <Text>{description}</Text>
        }
        try {
            return stats.filter((stat) => stat.shouldDisplay()).map((x, index) => <Text key={index}>{x.getDisplay()}</Text>);
        }
        catch {
            return <></>
        }
    }

    useEffect(() => {
        setObolsData(theData.get("obols"));
    }, [theData])

    if (!obolsData || obolsData.playerObols.length == 0) {
        return (
            <></>
        )
    }

    return (
        <Box pad="medium" gap="small">
            <Text size="large">Inventory</Text>
            {
                obolsData && [...obolsData.inventory].map(([type, obols], index) => (
                    <Box key={index} pad="small" gap="small" border={index + 1 < obolsData.inventory.size ? { side: 'bottom', color: 'grey-1', size: '2px' } : undefined}>
                        <Text size="medium">{ObolType[type]}</Text>
                        <Box direction="row" wrap>
                            {
                                obols.filter(obol => !obol.locked && obol.item.internalName != "Blank")
                                    .sort((obol1, obol2) => obol1.getRarity() == obol2.getRarity() ? obol1.type > obol2.type ? -1 : 1 : obol1.getRarity() > obol2.getRarity() ? -1 : 1)
                                    .map((obol, obolIndex) => {
                                        return (
                                            <TipDisplay
                                                key={obolIndex}
                                                heading={`${obol.item.displayName} (${obol.item.type})`}
                                                body={<Box>{statsDisplay(obol.item.itemStats, obol.item.description)}<Text size="xsmall">*A work in progress, therefore not always accurate.</Text></Box>}
                                                size={"large"}
                                                direction={TipDirection.Down}
                                                maxWidth="large"
                                            >
                                                <IconImage data={obol.item.getImageData()} />
                                            </TipDisplay>
                                        )
                                    })
                            }
                        </Box>
                        <Box direction="row" gap="medium">
                            <TextAndLabel
                                label={"Empty Slots"}
                                text={obols.filter(obol => obol.item.internalName == "Blank").length.toString() ?? "0"}
                            />
                            <TextAndLabel
                                label={"Total Slots"}
                                text={obols.filter(obol => !obol.item.internalName.includes("Locked")).length.toString() ?? "0"}
                            />
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}

function Obols() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const [index, setIndex] = useState<number>(-1);
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        setPlayerData(theData.get("players"));
    }, [theData])
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Obols</Heading>
            <ShadowBox flex={false}>
                <Grid rows="1" columns={['25%', '75%']}>
                    <Box pad="medium" height="100%">
                        <LeftNavButton key={-1} isActive={index == -1} clickHandler={() => onActive(-1)} text={"Family"} />
                        <LeftNavButton key={-2} isActive={index == -2} clickHandler={() => onActive(-2)} text={"Inventory"} />
                        {
                            playerData?.map((player, playerIndex) => {
                                return (
                                    <LeftNavButton key={playerIndex} isActive={index == playerIndex} clickHandler={() => onActive(playerIndex)} text={player.playerName} iconImageData={player.getClassImageData()} />
                                )
                            })
                        }
                    </Box>
                    <Box fill background="dark-1">
                        {index == -2 ?
                            <ObolInventory />
                            :
                            <ObolsInfo playerIndex={index} title={index == -1 ? "Family" : playerData && playerData.length > index && playerData[index].playerName ? playerData[index].playerName : "Unknown"} level={index == -1 ? playerData?.reduce((sum, player) => sum += player.level, 0) ?? 0 : playerData && playerData.length > index && playerData[index].level ? playerData[index].level : 0} />
                        }
                    </Box>
                </Grid>
            </ShadowBox>
        </Box>
    )
}

export default Obols;