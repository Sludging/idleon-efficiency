"use client"

import {
    Box,
    Tabs,
    Tab,
    Heading,
    ThemeContext
} from "grommet"

import { useState } from 'react';
import ContentTabs from "../../../components/base/ContentTabs";
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
                        ["Blunder Hills", "Yum-Yum Desert", "Frostbite Tundra", "Hyperion Nebula", "Smolderin' Plateau", "Spirited Valley", "Shimmerfin Deep"].map((world, worldIndex) => {
                            return (
                                <Tab key={worldIndex} title={<CustomTabTitle isActive={index == worldIndex} label={world} />}>
                                    <Box pad={{ right: 'large', left: 'large' }} width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill>
                                        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Task Board</Heading>
                                        <Box pad="small">
                                            <Box margin={{ bottom: 'medium' }}>
                                                <ContentTabs
                                                    options={[
                                                        { value: "Tasks", label: "Tasks" },
                                                        { value: "Merits", label: "Merits" },
                                                        { value: "Achievements", label: "Achievements" },
                                                    ]}
                                                    value={subTab}
                                                    onChange={setSubTab}
                                                />
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