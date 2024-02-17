import {
    Box,
    Text,
    Heading,
    Grid,
    Image,
    Tabs,
    Tab,
    ResponsiveContext
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import { Player } from "../../data/domain/player";
import IconImage from "../../components/base/IconImage";
import { Constellation } from "../../data/domain/constellations";
import { CharacterBox } from "../../components/base/CharacterBox";

function Constellations() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [constellations, setConstellations] = useState<Constellation[]>();
    const [index, setIndex] = useState<number>(0);
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const LetterToWorldNumber = (letter: string) => {
        switch (letter) {
            case 'A': return 'World 1';
            case 'B': return 'World 2';
            case 'C': return 'World 3';
            case 'D': return 'World 4';
            case 'E': return 'World 5';
            default: return 'Unknown World';
        }
    }

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setPlayerData(theData.get("players"));
            setConstellations(theData.get("constellations"));
        }
    }, [appContext])
    return (
        <Box>
            <NextSeo title="Constellations" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Constellations</Heading>
            <ShadowBox background="dark-1" pad="small" gap="small">
                <Tabs activeIndex={index} onActive={onActive}>
                    {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                        return (
                            <Tab key={letter} title={LetterToWorldNumber(letter)}>
                                {
                                    constellations?.filter((constellation) => constellation.data.name.includes(letter)).map(filteredConstellation => {
                                        return (
                                            <Box border={{ color: "white-1", side: "bottom" }} key={filteredConstellation.index} gap="medium" pad="large">
                                                <Grid columns={["10%", "30%", "60%"]}>
                                                    <Box alignSelf="center" width="140px" height="140px" border={{ size: filteredConstellation.isComplete ? '2px' : '', color: filteredConstellation.isComplete ? 'green-1' : "white-1" }} pad="32px">
                                                        <Box alignSelf="center" width={{ min: "70px", max: "70px" }} height={{ min: "70px", max: "70px" }}>
                                                            <Box className={`icons-constellations icons-constellation${filteredConstellation.data.name.replace("-", "")}${filteredConstellation.isComplete ? '_done' : ''}`} title={filteredConstellation.data.name} />
                                                        </Box>
                                                    </Box>
                                                    <Box pad="large" gap="small" border={{ side: 'right', color: "white-1" }}>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="../icons/custom/map.svg" alt="Map Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{filteredConstellation.data.area}</Text>
                                                                <Text color="grey-2" size="xsmall">Map</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="../icons/custom/user.svg" alt="User Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{filteredConstellation.data.requirement.split("@")[0]}</Text>
                                                                <Text color="grey-2" size="xsmall">Requirement</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="../icons/custom/points.svg" alt="Points Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{filteredConstellation.data.starChartPoints}</Text>
                                                                <Text color="grey-2" size="xsmall">Points</Text>
                                                            </Box>
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