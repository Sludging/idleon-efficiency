import {
    Box,
    Text,
    Grid,
    Heading,
    Button,
    ResponsiveContext,
} from "grommet"

import { useEffect, useState, useContext, useMemo } from 'react';
import ShadowBox from "../components/base/ShadowBox";
import { AppContext } from '../data/appContext';
import { NextSeo } from 'next-seo';
import { ClassIndex } from "../data/domain/talents";
import { Player } from "../data/domain/player";
import { NPC, Quests as QuestInfo, NpcQuest } from "../data/domain/quests";
import { Next } from 'grommet-icons';
import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import TipDisplay, { TipDirection } from "../components/base/TipDisplay";
import CoinsDisplay from "../components/coinsDisplay";
import { getCoinsArray } from "../data/utility";

enum CharacterBoxStatus {
    Complete,
    Started,
    Disabled
}

function CharacterBox({ playerName, playerClass, status }: { playerName: string, playerClass: ClassIndex, status: CharacterBoxStatus }) {
    const borderColorForStatus = (status: CharacterBoxStatus) => {
        switch (status) {
            case CharacterBoxStatus.Complete: return "green-1";
            case CharacterBoxStatus.Started: return "orange-1";
            case CharacterBoxStatus.Disabled: return "none";
            default: return 'none';
        }
    }

    const titleForStatus = (status: CharacterBoxStatus) => {
        switch (status) {
            case CharacterBoxStatus.Complete: return "Complete";
            case CharacterBoxStatus.Started: return "Started";
            case CharacterBoxStatus.Disabled: return "Not Started";
            default: return 'none';
        }
    }

    return (
        <Box title={titleForStatus(status)} background="dark-2" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall" direction="row" border={{ size: '1px', color: borderColorForStatus(status) }}>
            <Box style={{ opacity: status == CharacterBoxStatus.Disabled ? 0.4 : 1 }} width={{ min: "35px", max: '35px' }}>
                <Box className={`icons-3836 icons-ClassIcons${playerClass.valueOf()}`} />
            </Box>
            <Box>
                <Text color="grey-2" size="12px" truncate={true}>{playerName}</Text>
            </Box>
        </Box>
    )
}

function SpecialButton({ isActive, text, clickHandler }: { isActive: boolean, text: string, clickHandler: MouseEventHandler }) {
    return (
        <Button fill="horizontal" plain active={isActive} onClick={clickHandler} gap="medium">
            <Box background={isActive ? 'accent-4' : 'dark-2'} pad={{ left: 'medium', right: 'small', top: 'xsmall', bottom: 'xsmall' }} direction="row" justify="between" align="center" gap="small" height="40px">
                <Text color='accent-2' size="small" weight={isActive ? 'bold' : 'normal'}>{text}</Text>
                {isActive && <Next size="small" />}
            </Box>
        </Button>
    )
}

function TabButton({ isActive, text, clickHandler }: { isActive: boolean, text: string, clickHandler: MouseEventHandler }) {
    return (
        <Button hoverIndicator plain onClick={clickHandler} gap="medium">
            <Box border={{ side: isActive ? 'bottom' : 'between', color: 'brand', size: '2px' }} pad="small" direction="row" justify="between" align="center" gap="small" height="40px">
                <Text color={isActive ? 'brand' : 'accent-2'} size="medium">{text}</Text>
            </Box>
        </Button>
    )
}

function QuestInformation({ info }: { info: NpcQuest}) {

    return (
        <Box gap="small">
            <Text weight="bold">Requirements:{ info.ConsumeItems ? " (Consumed on delivery)" : ""}</Text>
            { info.Type == "ItemsAndSpaceRequired" && 
                info.ItemReq?.map((item) => (
                        <Text size="small">Collect {item.displayName}: {item.quantity}</Text>
                ))
            }
            { 
              info.Type == "Custom" && 
                info.CustomArray?.map((data) => (
                    <Text size="small">{data.desc} {data.finalV}</Text>
                ))
            }
            <Text weight="bold">Rewards:</Text>
            {
                info.Rewards?.map((item) => {
                    if (item.item == "TalentBook1" || item.item?.includes("Recipe")) {
                        return (<Text size="small">Talent Book or Recipe</Text>)
                    }
                    if (item.item) {
                        return (
                            <Box direction="row" gap="small" align="center">
                                <Box width={{max: '36px', min: '36px'}}>
                                    <Box className={item.className} />
                                </Box>
                                <Text size="small">{item.displayName ?? item.item}: {item.quantity}</Text>
                            </Box>
                             )
                    }
                    if (item.type == "Class" || item.type == "Smithing" || item.type == "Choppin" || item.type == "Mining") {
                        return (
                            <Text>{item.amount} {item.type} Exp</Text>
                        )
                    }
                    if (item.coins) {
                        return (<CoinsDisplay coinMap={getCoinsArray(item.coins)} />)
                    }
                    return (<Text>{item.type} | {item.coins} | {item.amount}</Text>)
                })
            }
            <Text size="xsmall">*A work in progress, therefore not always accurate.</Text>
        </Box>
    )
}

function NPCQuests({ npc, playerInfo, playerQuestData }: { npc: NPC, playerInfo: Player[], playerQuestData: Record<number, Record<string, number>> }) {

    return (
        <Box gap="small">
            <Box direction="row" align="center" gap="small">
                <Box width={{ min: '50px', max: '50px' }}>
                    <Box className={npc.getClass()} />
                </Box>
                <Text size="medium">{npc.name}</Text>
            </Box>
            <Box pad={{ left: 'large' }}>
                {Object.entries(npc.data.quests).map(([_, info]) => (
                    <Box pad={{ top: 'small', bottom: 'small' }} border={{ side: 'bottom', color: 'white-1' }}>
                        <TipDisplay
                            heading={`${info.Name} (Difficulity: ${info.Difficulty})`}
                            body={<QuestInformation info={info} />}
                            size={"large"}
                            direction={TipDirection.Down}
                            maxWidth="large">
                            <Box pad={{ top: "xsmall", bottom: "xsmall"}}>
                                <Text size="small">{info.Name}</Text>
                            </Box>
                        </TipDisplay>
                        <Box pad={{ top: "small", bottom: "small"}} gap="small">
                            <Grid columns={{ size: '120px' }} gap="small">
                                {
                                    playerInfo.map((player, index) => {
                                        let questStatus = CharacterBoxStatus.Disabled;
                                        switch (playerQuestData[player.playerID][info.QuestName.replace(/ /, "_")]) {
                                            case 1:
                                                questStatus = CharacterBoxStatus.Complete;
                                                break;
                                            case 0:
                                                questStatus = CharacterBoxStatus.Started;
                                                break;
                                            default:
                                                questStatus = CharacterBoxStatus.Disabled

                                        }
                                        return (
                                            <CharacterBox key={index} playerName={player.playerName} playerClass={player.classId} status={questStatus} />
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Box>
                ))
                }
            </Box>
        </Box>
    )
}

function Quests() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [questsData, setQuestData] = useState<QuestInfo>();
    const [index, setIndex] = useState<number>(1);
    const [activeWorld, setActiveWorld] = useState<string>("Blunder Hills");
    const onActive = (nextIndex: number) => setIndex(nextIndex);
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const badNPCNames = [
        "Secretkeeper",
        "Game Message",
        "Unmade Character",
        "FillerNPC"
    ]

    const npcsToShow = useMemo(() => {
        // base filter
        let filtered = Object.entries(questsData?.npcData ?? {}).filter(([name, info]) => !badNPCNames.includes(name) && Object.entries(info.data.quests).length > 0);

        // world filter
        if (activeWorld != "Events") {
            filtered = filtered.filter(([name, info]) => info.getWorld() == activeWorld && info.data.head.type != "Event");
        }
        else {
            filtered = filtered.filter(([name, info]) => info.data.head.type == "Event");
        }

        return filtered.sort(([name1], [name2]) => name1 > name2 ? 1 : -1);
    }, [questsData, activeWorld])

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
            setQuestData(theData.get("quests"));
        }
    }, [idleonData])
    return (
        <Box>
            <NextSeo title="Quests" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Quests</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    <TabButton isActive={activeWorld == "Blunder Hills"} text="World 1" clickHandler={() => { setActiveWorld("Blunder Hills"); onActive(1) }} />
                    <TabButton isActive={activeWorld == "Yum-Yum Desert"} text="World 2" clickHandler={() => { setActiveWorld("Yum-Yum Desert"); onActive(1) }} />
                    <TabButton isActive={activeWorld == "Frostbite Tundra"} text="World 3" clickHandler={() => { setActiveWorld("Frostbite Tundra"); onActive(1) }} />
                    <TabButton isActive={activeWorld == "Events"} text="Events" clickHandler={() => { setActiveWorld("Events"); onActive(1) }} />
                </Box>
                <ShadowBox flex={false}>
                    <Grid rows="1" columns={size == "small" ? ['40%', '60%'] : ['25%', '75%']}>
                        <Box pad="medium" height="100%" >
                            {
                                npcsToShow.map(([name, _], npcIndex) => {
                                    return (
                                        <SpecialButton isActive={index == npcIndex + 1} clickHandler={() => onActive(npcIndex + 1)} text={name} />
                                    )
                                })
                            }
                        </Box>
                        <Box fill background="dark-1" pad="medium">
                            {
                                npcsToShow.map(([_, npc], npcIndex) => {
                                    if (npcIndex + 1 == index) {
                                        return (
                                            <NPCQuests npc={npc} playerInfo={playerData ?? []} playerQuestData={questsData?.playerData ?? {}} />
                                        )
                                    }
                                })
                            }
                        </Box>
                    </Grid>
                </ShadowBox>
            </Box>
        </Box>
    )
}

export default Quests;