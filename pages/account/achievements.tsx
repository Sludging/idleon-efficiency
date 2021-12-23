import {
    Box,
    Text,
    Grid,
    Stack,
    Tabs,
    Tab,
    Tip,
    Heading,
    ResponsiveContext
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { Achievement } from '../../data/domain/achievements';
import { NextSeo } from 'next-seo';

function Achievements() {
    const [achievementData, setAchievementData] = useState<Achievement[]>();
    const idleonData = useContext(AppContext);
    const [index, setIndex] = useState<number>(0);
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
            setAchievementData(theData.get("achievements"));
        }
    }, [idleonData])
    return (
        <Box>
            <NextSeo title="Achievements" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Achievements</Heading>
            <ShadowBox background="dark-1" pad="medium">
                <Tabs activeIndex={index} onActive={onActive}>
                    {['A', 'B', 'C'].map((letter) => {
                        return (
                            <Tab key={letter} title={LetterToWorldNumber(letter)}>
                                <Grid columns={{
                                    count: letter == 'C' ? 10 : letter == 'B' ? 11 : 11,
                                    size: 'auto',
                                }} fill>
                                    {achievementData ? achievementData.filter(x => x.name != "FILLERZZZ ACH" && x.worldLetter == letter && x.visualIndex != -1).sort((a, b) => a.visualIndex - b.visualIndex).map((achievement, index) => {
                                        return (
                                            <Box pad="small" key={`achievement_${index}`} direction="row" gap="large">
                                                <Tip
                                                    plain
                                                    content={
                                                        <Box pad="small" gap="small" background="white" width={{ max: 'medium' }}>
                                                            <Text size={size == "small" ? 'small' : ''} weight="bold">{achievement.name}</Text>
                                                            <hr style={{ width: "100%"}} />
                                                            {!achievement.completed && achievement.quantity > 1 && <Text>Progress: {achievement.currentCount}/{achievement.quantity}</Text>}
                                                            {!achievement.completed && achievement.currentCount > 1 && <Text>Progress: {achievement.currentCount}</Text>}
                                                            <Text>Requirement: {achievement.desc}</Text>
                                                            <Text>Reward: {achievement.reward}</Text>
                                                        </Box>
                                                    }
                                                    dropProps={{ align: { top: 'bottom' } }}
                                                >
                                                    <Stack fill>
                                                        <Box width={{max: '43px'}}>
                                                            <Box style={{ opacity: achievement.completed ? 1 : 0.3 }} className={achievement.iconClass} />
                                                        </Box>
                                                        {!achievement.completed && achievement.quantity > 1 && size != "small" && <Text>{achievement.currentCount}/{achievement.quantity}</Text>}
                                                        {!achievement.completed && achievement.currentCount > 1 && size != "small" && <Text>{achievement.currentCount}</Text>}
                                                    </Stack>
                                                </Tip>

                                            </Box>)
                                    })
                                        : <></>
                                    }
                                </Grid>
                            </Tab>
                        )
                    })
                    }
                </Tabs>
            </ShadowBox>
        </Box>
    )
}

export default Achievements;