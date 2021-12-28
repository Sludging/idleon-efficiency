import {
    Box,
    Text,
    Grid,
    Stack,
    Tabs,
    Tab,
    Tip,
    Heading,
    ResponsiveContext,
    ThemeContext
} from "grommet"

import { useEffect, useState, useContext, useMemo } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import TabButton from "../../components/base/TabButton";
import { TaskBoard as TaskboardData } from "../../data/domain/tasks";
import TextAndLabel from "../../components/base/TextAndLabel";
import { nFormatter } from "../../data/utility";
import { css } from "styled-components";
import Tasks from "../../components/account/task-board/tasks";
import Achivements from "../../components/account/task-board/achievements";
import Merits from "../../components/account/task-board/merits";

const customTabs = {
    tab: {
        active: {
            color: 'brand',
            background: 'none',
            border: undefined,
        },
        border: undefined,
        pad: {
            top: 'small',
            bottom: undefined,
            horizontal: 'small',
        },
        extend: ({ theme }: { theme: any }) => css`
            height: 56px;
            weight: 'none';
        `
    },
    tabs: {
        extend: ({ theme }: { theme: any }) => css`
            max-width: 100%;
            min-width: 100%;
            margin-left: auto;
            margin-right: auto;
        `,
        header: {
            background: 'dark-2',
            extend: ({ theme }: { theme: any }) => css`
                alignItems: "center";
                box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17);
                height: 56px;
        `,
        }
    }
}

const CustomTabTitle = ({ label, isActive }: { label: string, isActive: boolean }) => (
    <Box direction="row" align="center" margin={{ top: "xsmall", bottom: "xsmall" }}>
        <Text size="small" color={isActive ? 'brand' : 'accent-2'}>
            {label}
        </Text>
    </Box>
);

function TaskBoard() {
    const [subTab, setSubTab] = useState<string>("Tasks");
    const [index, setIndex] = useState<number>(0);
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const onActive = (nextIndex: number) => setIndex(nextIndex);
    
    return (
        <Box>
            <NextSeo title="Task Board" />
            <ThemeContext.Extend value={customTabs}>
                <Tabs activeIndex={index} onActive={onActive}>
                    {
                        ["Blunder Hills", "Yum-Yum Desert", "Frostbite Tundra"].map((world, worldIndex) => {
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