import { Box, Text } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { ItemStat } from "../../../data/domain/items";
import { ObolsData, ObolType } from "../../../data/domain/obols";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";

function ObolsInfo({ playerIndex, title, level }: { playerIndex: number, title: string, level: number }) {
    const [obolsData, setObolsData] = useState<ObolsData>();
    const appContext = useContext(AppContext);


    const statsDisplay = (stats: ItemStat[], description: string) => {
        if (description) {
            return <Text>{description}</Text>
        }

        return stats.filter((stat) => stat.shouldDisplay()).map((x, index) => <Text key={index}>{x.getDisplay()}</Text>);
    }

    const SingleStat = ({ stat, familyStat }: { stat: ItemStat | undefined, familyStat: ItemStat | undefined }) => {
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

        if (!stat && !familyStat) {
            return <Box>Something went wrong.</Box>
        }

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

    const nextUnlock = useMemo(() => {
        // if family
        if (playerIndex == -1) {
            return obolsData?.familyObols.filter(obol => obol.locked).sort((obol1, obol2) => obol1.lvlReq > obol2.lvlReq ? -1 : 1).pop();
        }

        // If we haven't loaded data yet or for some reason index is wrong, just say undefined.
        try {
            return obolsData?.playerObols[playerIndex].filter(obol => obol.locked).sort((obol1, obol2) => obol1.lvlReq > obol2.lvlReq ? -1 : 1).pop();
        }
        catch {
            return undefined;
        }
    }, [playerIndex, obolsData]);

    useEffect(() => {
        const theData = appContext.data.getData();
        setObolsData(theData.get("obols"));
    }, [playerIndex, appContext])

    if (!obolsData || obolsData.playerObols.length == 0) {
        return (
            <></>
        )
    }

    return (
        <Box pad="medium" gap="small">
            <Text size="large">{title}</Text>
            <Box pad="small" gap="small">
                <Box direction="row" wrap>
                    {
                        (playerIndex == -1 ? obolsData?.familyObols : obolsData?.playerObols[playerIndex])?.filter(obol => !obol.locked && obol.item.internalName != "Blank")
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
                <TextAndLabel
                    label={"Empty Slots"}
                    text={(playerIndex == -1 ? obolsData?.familyObols : obolsData?.playerObols[playerIndex])?.filter(obol => obol.item.internalName == "Blank").length.toString() ?? "0"}
                />
                {nextUnlock &&
                    <TextAndLabel
                        label={"Next Unlock"}
                        text={`${ObolType[nextUnlock.type]} slot at level ${nextUnlock.lvlReq} (${nextUnlock.lvlReq - level} more level${nextUnlock.lvlReq - level > 1 ? 's' : ''})`}
                    />
                }
            </Box>
            <Text size="large">Bonuses</Text>
            <Box direction="row" pad="small" wrap>
                {
                    playerIndex == -1 ? obolsData?.familyStats?.stats.filter(stat => stat.getValue() > 0).map((stat, statIndex) => {
                        return (
                            <Box key={statIndex} margin={{ right: 'large', bottom: 'medium' }}>
                                <SingleStat stat={undefined} familyStat={stat} />
                            </Box>
                        )
                    })
                        : obolsData?.playerStats[playerIndex]?.stats.filter(stat => stat.getValue() > 0).map((stat, statIndex) => {
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
                    obolsData?.familyStats.stats.filter(stat => (obolsData.playerStats[playerIndex].stats.find(playerStat => stat.extra == '' ? playerStat.displayName == stat.displayName : stat.extra == playerStat.extra)?.getValue() ?? 0) == 0)
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

export default ObolsInfo;