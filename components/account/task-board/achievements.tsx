import { Box, Grid, ResponsiveContext, Stack, Text, Tip } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { Achievement } from "../../../data/domain/achievements";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";

function Achivements({ worldIndex }: { worldIndex: number }) {
    const [achievementData, setAchievementData] = useState<Achievement[]>();
    const [worldLetter, setWorldLetter] = useState<string>('A');
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const achievementsToShow = useMemo(() => {
        if (achievementData) {
            return achievementData.filter(x => x.name != "FILLERZZZ ACH" && x.worldLetter == worldLetter && x.visualIndex != -1).sort((a, b) => a.visualIndex - b.visualIndex);
        }
        return [];
    }, [achievementData, worldLetter])

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setAchievementData(theData.get("achievements"));
            if (worldIndex == 0) {
                setWorldLetter('A');
            }
            if (worldIndex == 1) {
                setWorldLetter('B');
            }
            if (worldIndex == 2) {
                setWorldLetter('C');
            }
            if (worldIndex == 3) {
                setWorldLetter('D');
            }
        }
    }, [appContext, worldIndex])

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Grid columns={{
                count: worldLetter == 'D' ? 8 : worldLetter == 'C' ? 10 : 11,
                size: 'auto',
            }} fill>
                {
                    achievementsToShow.map((achievement, index) => (
                        <Box pad="small" key={`achievement_${index}`} direction="row" gap="large">
                            <Tip
                                plain
                                content={
                                    <Box pad="small" gap="small" background="white" width={{ max: 'medium' }}>
                                        <Text size={size == "small" ? 'small' : ''} weight="bold">{achievement.name}</Text>
                                        <hr style={{ width: "100%" }} />
                                        {!achievement.completed && achievement.quantity > 1 && <Text>Progress: {achievement.currentCount}/{achievement.quantity}</Text>}
                                        {!achievement.completed && achievement.currentCount > 1 && <Text>Progress: {achievement.currentCount}</Text>}
                                        <Text>Requirement: {achievement.desc}</Text>
                                        <Text>Reward: {achievement.reward}</Text>
                                    </Box>
                                }
                                dropProps={{ align: { top: 'bottom' } }}
                            >
                                <Stack fill>
                                    <Box style={{ opacity: achievement.completed ? 1 : 0.3 }}>
                                        <IconImage data={achievement.getImageData()} />
                                    </Box>
                                    {!achievement.completed && achievement.quantity > 1 && size != "small" && <Text>{achievement.currentCount}/{achievement.quantity}</Text>}
                                    {!achievement.completed && achievement.currentCount > 1 && size != "small" && <Text>{achievement.currentCount}</Text>}
                                </Stack>
                            </Tip>

                        </Box>
                    ))
                }
            </Grid>
        </ShadowBox>
    )
}

export default Achivements;