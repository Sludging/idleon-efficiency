"use client"

import {
    Box,
    Tabs,
    Tab,
    Heading,
    ThemeContext
} from "grommet"

import { useState } from 'react';
import TabButton from "../../../components/base/TabButton";
import Tasks from "../../../components/account/task-board/tasks";
import Achivements from "../../../components/account/task-board/achievements";
import Merits from "../../../components/account/task-board/merits";
import { customTabsTheme, CustomTabTitle } from "../../../components/base/CustomTabs";

function TaskBoard() {
    const [subTab, setSubTab] = useState<string>("Tasks");
    const [index, setIndex] = useState<number>(0);
    const onActive = (nextIndex: number) => setIndex(nextIndex);
    
    return (
        <Box>
            <ThemeContext.Extend value={customTabsTheme}>
                <Tabs activeIndex={index} onActive={onActive}>
                    {
                        ["Blunder Hills", "Yum-Yum Desert", "Frostbite Tundra", "Hyperion Nebula", "Smolderin' Plateau", "Spirited Valley"].map((world, worldIndex) => {
                            return (
                                <Tab key={worldIndex} title={<CustomTabTitle isActive={index == worldIndex} label={world} />}>
                                    <Box pad={{ right: 'large', left: 'large' }} width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill>
                                        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Task Board</Heading>
                                        <Box pad="small">
                                            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'medium' }}>
                                                <TabButton isActive={subTab == "Tasks"} text="Tasks" clickHandler={() => { setSubTab("Tasks"); }} />
                                                <TabButton isActive={subTab == "Merits"} text="Merits" clickHandler={() => { setSubTab("Merits"); }} />
                                                <TabButton isActive={subTab == "Achievements"} text="Achievements" clickHandler={() => { setSubTab("Achievements"); }} />
                                            </Box>
                                            { subTab == "Tasks" && <Tasks worldIndex={worldIndex} />}
                                            { subTab == "Achievements" && <Achivements worldIndex={worldIndex} />}
                                            { subTab == "Merits" && <Merits worldIndex={worldIndex} />}
                                        </Box>
                                    </Box>
                                </Tab>
                            )
                        }) ?? <></>
                    }
                </Tabs>
            </ThemeContext.Extend>
        </Box>
    )
}

export default TaskBoard;