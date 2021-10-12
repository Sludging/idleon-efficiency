import {
    Box,
    Text,
    Tabs,
    Tab
} from 'grommet'
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'

import { Player } from '../data/domain/player';

export default function PlayerData() {
    const [playerData, setPlayerData] = useState<Array<Player>>();
    const [index, setIndex] = useState<number>(0);

    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
        }
    }, [idleonData]);
    return (
        <Box align="center" pad="large">
            <Tabs activeIndex={index} onActive={onActive}>
                {
                    playerData?.map((player, index) => {
                        return (
                            <Tab key={`player_${player.playerID}`} title={`${player.playerName ? player.playerName : `Character ${player.playerID}`}`}>
                                <Box>
                                    <Text>Class / Level = {player.class} / {player.level}</Text>
                                    <Text>Current Monster / Map = {player.currentMonster} / {player.currentMap}</Text>
                                    {
                                        player.starSigns.map((sign, index) => {
                                            return <Text key={`sign-${index}`}>Sign {index} = {sign}</Text>
                                        })
                                    }
                                    <Text>STR = {player.stats.strength}</Text>
                                    <Text>AGI = {player.stats.agility}</Text>
                                    <Text>WIS = {player.stats.wisdom}</Text>
                                    <Text>LUK = {player.stats.luck}</Text>
                                    <Text>Money = {player.money.toString().split(/(?=(?:..)*$)/)}</Text>
                                </Box>
                                <Box direction="row-responsive">
                                    <Box key={`player_${index}_equip`}>
                                        {
                                            [...Array(8)].map((_, equipIndex) => {
                                                if (player.gear.equipment[equipIndex].display_name == "Blank") {
                                                    return (<Box width="50px" height="50px" />);
                                                }
                                                return (<Box key={`player_${index}_equip_${equipIndex}`} title={player.gear.equipment[equipIndex].display_name || ""} className={`icons icons-${player.gear.equipment[equipIndex].raw_name}_x1`} />)
                                            })
                                        }
                                    </Box>
                                    <Box key={`player_${index}_tools`}>
                                        {
                                            [...Array(8)].map((_, toolsIndex) => {
                                                if (player.gear.tools[toolsIndex].display_name == "Blank") {
                                                    return (<Box key={`player_${index}_equip_${toolsIndex}`} width="50px" height="50px" />);
                                                }
                                                return (<Box key={`player_${index}_equip_${toolsIndex}`} title={player.gear.tools[toolsIndex].display_name || ""} className={`icons icons-${player.gear.tools[toolsIndex].raw_name}_x1`} />)
                                            })
                                        }
                                    </Box>
                                    <Box key={`player_${index}_food`}>
                                        {
                                            [...Array(8)].map((_, foodIndex) => {
                                                if (player.gear.food[foodIndex].display_name == "Blank") {
                                                    return (<Box key={`player_${index}_equip_${foodIndex}`} width="50px" height="50px" />);
                                                }
                                                return (<Box key={`player_${index}_equip_${foodIndex}`} title={player.gear.food[foodIndex].display_name || ""} className={`icons icons-${player.gear.food[foodIndex].raw_name}_x1`} />)
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </Box>
    )
}