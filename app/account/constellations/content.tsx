"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
    Tabs,
    Tab,
    ResponsiveContext
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../../../components/base/ShadowBox";
import { Player } from "../../../data/domain/player";
import IconImage from "../../../components/base/IconImage";
import { Constellation } from "../../../data/domain/constellations";
import { CharacterBox } from "../../../components/base/CharacterBox";
import TextAndLabel from "../../../components/base/TextAndLabel";
import { Document, Fireball, Map } from "grommet-icons";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

function Constellations() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [constellations, setConstellations] = useState<Constellation[]>();
    const [index, setIndex] = useState<number>(0);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const size = useContext(ResponsiveContext)

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const LetterToWorldNumber = (letter: string) => {
        switch (letter) {
            case 'A': return 'World 1';
            case 'B': return 'World 2';
            case 'C': return 'World 3';
            case 'D': return 'World 4';
            case 'E': return 'World 5';
            case 'G': return 'World 6';
            default: return 'Unknown World';
        }
    }

    useEffect(() => {
        setPlayerData(theData.get("players"));
        setConstellations(theData.get("constellations"));
    }, [theData])
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Constellations</Heading>
            <ShadowBox background="dark-1" pad="small" gap="small">
                <Tabs activeIndex={index} onActive={onActive}>
                    {['A', 'B', 'C', 'D', 'E', 'G'].map((letter) => {
                        return (
                            <Tab key={letter} title={LetterToWorldNumber(letter)}>
                                {
                                    constellations?.filter((constellation) => constellation.data.name.includes(letter)).map(filteredConstellation => {
                                        return (
                                            <Box border={{ color: "white-1", side: "bottom" }} key={filteredConstellation.index} gap="medium" pad="large">
                                                <Grid columns={["10%", "30%", "60%"]}>
                                                    <Box alignSelf="center" width="140px" height="140px" border={{ size: filteredConstellation.isComplete ? '2px' : '', color: filteredConstellation.isComplete ? 'green-1' : "white-1" }} pad="32px">
                                                        <IconImage data={filteredConstellation.getImageData()} scale={2} />
                                                    </Box>
                                                    <Box pad="large" gap="small" border={{ side: 'right', color: "white-1" }}>
                                                        <Box direction="row" gap="small">
                                                            <Map color="brand" size="18px" />
                                                            <TextAndLabel textSize="small" label={"Map"} text={filteredConstellation.data.area} />
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Document color="brand" size="18px" />
                                                            <TextAndLabel textSize="small" label={"Requirement"} text={filteredConstellation.data.requirement.split("@")[0]} />
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Fireball color="brand" size="18px" />
                                                            <TextAndLabel textSize="small" label={"Points"} text={filteredConstellation.data.starChartPoints.toString()} />
                                                        </Box>
                                                    </Box>
                                                    <Box pad={{ top: "small", bottom: "small", left: "large" }} gap="small">
                                                        <Text size='medium'>Players</Text>
                                                        <Grid columns={{ size: '120px' }} gap="small">
                                                            {
                                                                playerData?.map((player, index) => {
                                                                    const isComplete = filteredConstellation.completedByPlayerIndex.includes(index);
                                                                    return (
                                                                        <CharacterBox key={index} player={player} borderColor={isComplete ? 'green-1' : 'none'} opacity={isComplete ? 1 : 0.4} title={player.playerName} />
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                        )
                                    })
                                }
                            </Tab>
                        )
                    })
                    }
                </Tabs>
            </ShadowBox>
        </Box>
    )
}

export default Constellations;