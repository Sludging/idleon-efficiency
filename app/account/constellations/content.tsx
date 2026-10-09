"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
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
import ContentTabs, { ContentTabOption } from "../../../components/base/ContentTabs";

type ConstellationWorld = 'A' | 'B' | 'C' | 'D' | 'E' | 'G';

const worldOptions: readonly ContentTabOption<ConstellationWorld>[] = [
    { value: 'A', label: 'World 1' },
    { value: 'B', label: 'World 2' },
    { value: 'C', label: 'World 3' },
    { value: 'D', label: 'World 4' },
    { value: 'E', label: 'World 5' },
    { value: 'G', label: 'World 6' },
];

function Constellations() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [constellations, setConstellations] = useState<Constellation[]>();
    const [selectedWorld, setSelectedWorld] = useState<ConstellationWorld>('A');
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const size = useContext(ResponsiveContext)


    useEffect(() => {
        setPlayerData(theData.get("players"));
        setConstellations(theData.get("constellations"));
    }, [theData])
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Constellations</Heading>
            <ShadowBox background="dark-1" pad="small" gap="small">
                <ContentTabs
                    options={worldOptions}
                    value={selectedWorld}
                    onChange={setSelectedWorld}
                />
                {
                    constellations?.filter((constellation) => constellation.data.name.includes(selectedWorld)).map(filteredConstellation => {
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
            </ShadowBox>
        </Box>
    )
}

export default Constellations;