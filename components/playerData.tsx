import {
    Box,
    Text,
    Tabs,
    Tab,
    Grid,
    Stack
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'

import { Player, SkillsIndex } from '../data/domain/player';
import { PlayerStatues } from '../data/domain/statues';
import { Coins, getCoinsArray } from '../data/utility';
import CoinsDisplay from './coinsDisplay';

interface SkillProps {
    skillsMap: Map<SkillsIndex, number>
    skillsRank: Map<SkillsIndex, number>
}

function nth(n: number) { return `${n}${["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"}` }

function ShowSkills(props: SkillProps) {
    const getSkillClass = (skill: SkillsIndex) => {
        switch (skill) {
            case SkillsIndex.Mining: return `icons-38 icons-ClassIcons42`;
            case SkillsIndex.Smithing: return `icons-38 icons-ClassIcons43`;
            case SkillsIndex.Chopping: return `icons-38 icons-ClassIcons44`;
            case SkillsIndex.Fishing: return `icons-38 icons-ClassIcons45`;
            case SkillsIndex.Alchemy: return `icons-38 icons-ClassIcons46`;
            case SkillsIndex.Catching: return `icons-38 icons-ClassIcons47`;
            case SkillsIndex.Trapping: return `icons-38 icons-ClassIcons48`;
            case SkillsIndex.Construction: return `icons-38 icons-ClassIcons49`;
            case SkillsIndex.Worship: return `icons-38 icons-ClassIcons50`;
            default: return '';
        }
    }

    return (
        <Grid
            rows={['1/3', '1/3', '1/3']}
            columns={['1/3', '1/3', '1/3']}
            areas={[
                ['mining', 'fishing', 'trapping'],
                ['smithing', 'alchemy', 'construction'],
                ['chopping', 'catching', 'worship'],
            ]}
        >
            {
                Array.from(props.skillsMap).map(([skillIndex, skillLevel]) => {
                    const skillRank = props.skillsRank.get(skillIndex);
                    return (
                        <Box key={`skill_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} gridArea={`${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`}>
                            <Stack anchor="bottom-left" alignSelf="center" >
                                <Box className={getSkillClass(skillIndex)} />
                                <Box pad={{ horizontal: 'large' }}>
                                    <Text size="medium">{skillLevel}</Text>
                                </Box>
                                <Box pad={{ horizontal: 'xlarge' }}>
                                    {skillRank != undefined && <Text>{nth(skillRank + 1)}</Text>}
                                </Box>
                            </Stack>

                        </Box>)
                })
            }
        </Grid >
    );
}

interface PlayerTabProps {
    player: Player
}

function PlayerTab({ player }: PlayerTabProps) {
    const [playerStatues, setPlayerStatues] = useState<PlayerStatues | undefined>(undefined);
    const [index, setIndex] = useState<number>(0);
    const [playerCoins, setPlayerCoins] = useState<Map<Coins, number>>(new Map());

    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerStatues(theData.get("statues")[player.playerID]);
            setPlayerCoins(getCoinsArray(player.money));
        }
    }, [idleonData, player]);

    return (
        <Tabs activeIndex={index} onActive={onActive}>
            <Tab key={`player_${player.playerID}_random`} title="Random Stats">
                <Box pad="medium" gap="small">
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
                    <Text>Money = </Text><CoinsDisplay coinMap={playerCoins} />

                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_skills`} title="Skills">
                <Box pad="medium">
                    <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} />
                </Box>
            </Tab>
            <Tab key={`player_${player.playerID}_equipment`} title="Equipment">
                <Box direction="row-responsive" pad="medium">
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
            <Tab key={`player_${player.playerID}_statues`} title="Statues">
                <Box pad="medium" gap="xsmall">
                    {
                        playerStatues ? playerStatues.statues.map((statue, index) => {
                            return (
                                <Box key={`statue_${index}`} direction="row" gap="medium">
                                    <Box className={statue.getClassName()} title={statue.displayName} />
                                    <Text alignSelf="center">Level: {statue.level}</Text>
                                    <Text alignSelf="center">/</Text>
                                    <Text alignSelf="center">Bonus: {statue.getBonusText().toLocaleString()} {statue.bonus}</Text>
                                </Box>
                            )
                        }) : <></>
                    }
                </Box>
            </Tab>
        </Tabs>
    )
}

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
                                <Box pad="small">
                                    <PlayerTab player={player} />
                                </Box>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </Box>
    )
}