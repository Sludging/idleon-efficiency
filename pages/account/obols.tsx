import {
    Box,
    Text,
    Grid,
    Heading,
} from "grommet"

import { useEffect, useState, useContext, useMemo } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import { ObolsData } from "../../data/domain/obols";
import { Player } from "../../data/domain/player";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import { ItemStat } from "../../data/domain/items";
import LeftNavButton from "../../components/base/LeftNavButton";
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";


function ObolsInfo({ playerIndex, title, level }: { playerIndex: number, title: string, level: number }) {
    const [obolsData, setObolsData] = useState<ObolsData>();
    const idleonData = useContext(AppContext);


    const statsDisplay = (stats: ItemStat[], description: string) => {
        if (description) {
            return <Text>{description}</Text>
        }

        return stats.filter((stat) => stat.shouldDisplay()).map((x, index) => <Text key={index}>{x.getDisplay()}</Text>);
    }

    const SingleStat = ({ stat, familyStat }: { stat: ItemStat | undefined, familyStat: ItemStat | undefined }) => {
        if (!stat && !familyStat) {
            return <Box>Something went wrong.</Box>
        }



        const hasPercent = useMemo(() => {
            if (stat) {
                return stat.extra == '' ? stat.displayName.includes("%") : stat.extra.includes("%")
            }
            if (familyStat) {
                return familyStat.extra == '' ? familyStat.displayName.includes("%") : familyStat.extra.includes("%")
            }

            return false;
        }, [stat, familyStat]);

        const label = useMemo(() => {
            if (stat) {
                return stat.extra == '' ? stat.displayName.replace("% ", "") : stat.extra.replace("% ", "")
            }
            if (familyStat) {
                return familyStat.extra == '' ? familyStat.displayName.replace("% ", "") : familyStat.extra.replace("% ", "")
            }

            return "Unknown";
        }, [stat, familyStat]);

        const totalBonus = useMemo(() => {
            return (stat?.getValue() ?? 0) + (familyStat?.getValue() ?? 0);
        }, [stat, familyStat]);


        return (
            <ComponentAndLabel
                label={label}
                component={
                    <Box direction="row" gap="xxsmall">
                        <Text>{totalBonus}{hasPercent ? "%" : ''}</Text>
                        <Text>(</Text>
                        <Text color="yellow-1">+{stat ? stat.getValue() : "0"}{hasPercent ? "%" : ''}</Text>
                        <Text>,</Text>
                        <Text color="aqua">+{familyStat ? familyStat.getValue() : "0"}{hasPercent ? "%" : ''}</Text>
                        <Text>)</Text>
                    </Box>
                }
            />
        )
    }

    useEffect(() => {
        const theData = idleonData.getData();
        setObolsData(theData.get("obols"));
    }, [playerIndex])

    return (
        <Box pad="medium" gap="small">
            <Text size="large">{title}</Text>
            <Box pad="small" gap="small">
                <Box direction="row">
                    {
                        (playerIndex == -1 ? obolsData?.familyObols : obolsData?.playerObols[playerIndex])?.filter(obol => !obol.locked && obol.item.internalName != "Blank").sort((obol1, obol2) => obol1.getRarity() > obol2.getRarity() ? -1 : 1).map((obol, obolIndex) => {
                            return (
                                <TipDisplay
                                    key={obolIndex}
                                    heading={`${obol.item.displayName} (${obol.item.type})`}
                                    body={<Box>{statsDisplay(obol.item.itemStats, obol.item.description)}<Text size="xsmall">*A work in progress, therefore not always accurate.</Text></Box>}
                                    size={"large"}
                                    direction={TipDirection.Down}
                                    maxWidth="large"
                                >
                                    <Box width={{ max: '36px', min: '36px' }}>
                                        <Box className={obol.item.getClass()} />
                                    </Box>
                                </TipDisplay>
                            )
                        })
                    }
                </Box>
                <TextAndLabel
                    label={"Empty Slots"}
                    text={(playerIndex == -1 ? obolsData?.familyObols : obolsData?.playerObols[playerIndex])?.filter(obol => obol.item.internalName == "Blank").length.toString() ?? "0"}
                />
                <TextAndLabel
                    label={"Next Unlock at level"}
                    text={`${(playerIndex == -1 ? obolsData?.familyObols : obolsData?.playerObols[playerIndex])?.filter(obol => obol.locked).sort((obol1, obol2) => obol1.lvlReq > obol2.lvlReq ? -1 : 1).pop()?.lvlReq.toString() ?? "I dunno"} (Currently at: ${level})`}
                />
            </Box>
            <Text size="large">Bonuses</Text>
            <Box direction="row" pad="small" wrap>
                {
                    playerIndex == -1 ? obolsData?.familyStats.stats.filter(stat => stat.getValue() > 0).map((stat, statIndex) => {
                        return (
                            <Box key={statIndex} margin={{ right: 'large', bottom: 'medium' }}>
                                <SingleStat stat={undefined} familyStat={stat} />
                            </Box>
                        )
                    })
                        : obolsData?.playerStats[playerIndex].stats.filter(stat => stat.getValue() > 0).map((stat, statIndex) => {
                            const matchingFamilyStat = obolsData.familyStats.stats.find(famStat => stat.extra == '' ? famStat.displayName == stat.displayName : stat.extra == famStat.extra && famStat.getValue() > 0);
                            return (
                                <Box key={statIndex} margin={{ right: 'large', bottom: 'medium' }}>
                                    <SingleStat stat={stat} familyStat={matchingFamilyStat} />
                                </Box>
                            )
                        })
                }
                {
                    playerIndex != -1 &&
                    obolsData?.familyStats.stats.filter(stat => obolsData.playerStats[playerIndex].stats.find(playerStat => stat.extra == '' ? playerStat.displayName == stat.displayName : stat.extra == playerStat.extra) == undefined)
                        .filter(stat => stat.shouldDisplay() && stat.getValue() > 0)
                        .map((stat, statIndex) => {
                            return (
                                <Box key={statIndex} margin={{ right: 'large', bottom: 'medium' }}>
                                    <SingleStat stat={undefined} familyStat={stat} />
                                </Box>
                            )
                        })
                }
            </Box>
        </Box>
    )
}

function Obols() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const idleonData = useContext(AppContext);

    const [index, setIndex] = useState<number>(-1);
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
        }
    }, [idleonData])
    return (
        <Box>
            <NextSeo title="Obols" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Obols</Heading>
            <ShadowBox flex={false}>
                <Grid rows="1" columns={['25%', '75%']}>
                    <Box pad="medium" height="100%">
                        <LeftNavButton isActive={index == -1} clickHandler={() => onActive(-1)} text={"Family"} />
                        {
                            playerData?.map((player, playerIndex) => {
                                return (
                                    <LeftNavButton isActive={index == playerIndex} clickHandler={() => onActive(playerIndex)} text={player.playerName} iconClass={player.getClassClass()} />
                                )
                            })
                        }
                    </Box>
                    <Box fill background="dark-1">
                        <ObolsInfo playerIndex={index} title={index == -1 ? "Family" : playerData && playerData.length > index && playerData[index].playerName ? playerData[index].playerName : "Unknown"} level={index == -1 ? playerData?.reduce((sum, player) => sum += player.level, 0) : playerData && playerData.length > index && playerData[index].level ? playerData[index].level : 0} />
                    </Box>
                </Grid>
            </ShadowBox>
        </Box>
    )
}

export default Obols;