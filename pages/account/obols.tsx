import {
    Box,
    Grid,
    Heading,
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import { Player } from "../../data/domain/player";
import LeftNavButton from "../../components/base/LeftNavButton";
import ObolsInfo from "../../components/account/task-board/obolsInfo";


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
                        <LeftNavButton key={-1} isActive={index == -1} clickHandler={() => onActive(-1)} text={"Family"} />
                        {
                            playerData?.map((player, playerIndex) => {
                                return (
                                    <LeftNavButton key={playerIndex} isActive={index == playerIndex} clickHandler={() => onActive(playerIndex)} text={player.playerName} iconClass={player.getClassClass()} />
                                )
                            })
                        }
                    </Box>
                    <Box fill background="dark-1">
                        <ObolsInfo playerIndex={index} title={index == -1 ? "Family" : playerData && playerData.length > index && playerData[index].playerName ? playerData[index].playerName : "Unknown"} level={index == -1 ? playerData?.reduce((sum, player) => sum += player.level, 0) ?? 0 : playerData && playerData.length > index && playerData[index].level ? playerData[index].level : 0} />
                    </Box>
                </Grid>
            </ShadowBox>
        </Box>
    )
}

export default Obols;