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
import ShadowBox from "../components/base/ShadowBox";
import { AppContext } from '../data/appContext';
import { ConstellationMap } from '../data/domain/starsigns';
import { NextSeo } from 'next-seo';
import { ClassIndex } from "../data/domain/talents";
import { Player } from "../data/domain/player";

enum CharacterBoxStatus {
    Complete,
    Started,
    Disabled
}

function CharacterBox({ playerName, playerClass, status }: { playerName: string, playerClass: ClassIndex, status: CharacterBoxStatus }) {
    return (
        <Box background="dark-2" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall" direction="row" border={{ size: '2px', color: status == CharacterBoxStatus.Complete ? 'green-1' : 'none' }}>
            <Box style={{ opacity: status == CharacterBoxStatus.Disabled ? 0.4 : 1 }} width={{ min: "35px", max: '35px' }}>
                <Box className={`icons-3836 icons-ClassIcons${playerClass.valueOf()}`} />
            </Box>
            <Box>
                <Text color="grey-2" size="12px" truncate={true}>{playerName}</Text>
            </Box>
        </Box>
    )
}

function Constellations() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [constellationData, setConstellationData] = useState<string[][]>();
    const [index, setIndex] = useState<number>(0);
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const LetterToWorldNumber = (letter: string) => {
        switch (letter) {
            case 'A': return 'World 1';
            case 'B': return 'World 2';
            case 'C': return 'World 3';
            default: return 'Unknown World';
        }
    }

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
            setConstellationData(theData.get("constellations"));
        }
    }, [idleonData])
    return (
        <Box>
            <NextSeo title="Constellations" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Constellations</Heading>
            <ShadowBox background="dark-1" pad="small" gap="small">
                <Tabs activeIndex={index} onActive={onActive}>
                    {['A', 'B', 'C'].map((letter) => {
                        return (
                            <Tab key={letter} title={LetterToWorldNumber(letter)}>
                                {
                                    Object.entries(ConstellationMap).filter(([_, data]) => data.name.includes(letter)).map(([location, data]) => {
                                        const isComplete = constellationData && constellationData[Number(location)][1] == "1";
                                        return (
                                            <Box border={{ color: "white-1", side: "bottom" }} key={location} gap="medium" pad="large">
                                                <Grid columns={["10%", "30%", "60%"]}>
                                                    <Box alignSelf="center" width="140px" height="140px" border={{ size: isComplete ? '2px' : '', color: isComplete ? 'green-1' : "white-1" }} pad="32px">
                                                        <Box alignSelf="center" width={{ min: "70px", max: "70px" }} height={{ min: "70px", max: "70px" }}>
                                                            <Box className={`icons-constellations icons-constellation${data.name.replace("-", "")}${isComplete ? '_done' : ''}`} title={data.name} />
                                                        </Box>
                                                    </Box>
                                                    <Box pad="large" gap="small" border={{ side: 'right', color: "white-1" }}>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="icons/custom/map.svg" alt="Map Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{data.area}</Text>
                                                                <Text color="grey-2" size="xsmall">Map</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="icons/custom/user.svg" alt="User Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{data.requirement.split("@")[0]}</Text>
                                                                <Text color="grey-2" size="xsmall">Requirement</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box direction="row" gap="small">
                                                            <Box pad="xsmall">
                                                                <Image src="icons/custom/points.svg" alt="Points Icon"/>
                                                            </Box>
                                                            <Box>
                                                                <Text>{data.starChartPoints}</Text>
                                                                <Text color="grey-2" size="xsmall">Points</Text>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box pad={{ top: "small", bottom: "small", left: "large" }} gap="small">
                                                        <Text size='medium'>Players</Text>
                                                        <Grid columns={{ size: '120px' }} gap="small">
                                                            {
                                                                playerData?.map((player, index) => {
                                                                    const isComplete = constellationData && constellationData[Number(location)][0].includes(player.getPlayerLetter());
                                                                    return (
                                                                        <CharacterBox key={index} playerName={player.playerName} playerClass={player.classId} status={isComplete ? CharacterBoxStatus.Complete : CharacterBoxStatus.Disabled} />
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