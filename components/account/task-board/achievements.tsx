import { Box, Grid, ResponsiveContext, Stack, Text, Tip } from "grommet";
import { useContext, useMemo } from "react";
import { Achievement } from "../../../data/domain/achievements";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

function Achivements({ worldIndex }: { worldIndex: number }) {
    const size = useContext(ResponsiveContext)

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const achievementData = theData.get("achievements") as Achievement[] | undefined;
    let worldLetter = "?";
    if (worldIndex == 0) {
        worldLetter = 'A';
    }
    if (worldIndex == 1) {
        worldLetter = 'B';
    }
    if (worldIndex == 2) {
        worldLetter = 'C';
    }
    if (worldIndex == 3) {
        worldLetter = 'D';
    }
    if (worldIndex == 4) {
        worldLetter = 'E';
    }
    if (worldIndex == 5) {
        worldLetter = 'F';
    }

    const achievementsToShow = useMemo(() => {
        if (achievementData) {
            return achievementData.filter(x => x.data.name != "FILLERZZZ ACH" && x.worldLetter == worldLetter && x.visualIndex != -1).sort((a, b) => a.visualIndex - b.visualIndex);
        }
        return [];
    }, [worldLetter, achievementData])

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Grid columns={{
                count: ['D', 'E', 'F'].includes(worldLetter) ? 8 : worldLetter == 'C' ? 10 : 11,
                size: 'auto',
            }} fill>
                {
                    achievementsToShow.map((achievement, index) => {
                        return (
                            <Box pad="small" key={`achievement_${index}`} direction="row" gap="large">
                                <Tip
                                    plain
                                    content={
                                        <Box pad="small" gap="small" background="white" width={{ max: 'medium' }}>
                                            <Text size={size == "small" ? 'small' : ''} weight="bold">{achievement.data.name}</Text>
                                            <hr style={{ width: "100%" }} />
                                            {!achievement.completed && achievement.data.qty > 1 && <Text>Progress: {achievement.currentCount}/{achievement.data.qty}</Text>}
                                            {!achievement.completed && achievement.currentCount > 1 && <Text>Progress: {achievement.currentCount}</Text>}
                                            <Text>Requirement: {achievement.data.desc}</Text>
                                            <Text>Reward: {achievement.data.rewards}</Text>
                                        </Box>
                                    }
                                    dropProps={{ align: { top: 'bottom' } }}
                                >
                                    <Stack fill>
                                        <Box style={{ opacity: achievement.completed ? 1 : 0.3 }}>
                                            <IconImage data={achievement.getImageData()} />
                                        </Box>
                                        {!achievement.completed && achievement.data.qty > 1 && size != "small" && <Text>{achievement.currentCount}/{achievement.data.qty}</Text>}
                                        {!achievement.completed && achievement.currentCount > 1 && size != "small" && <Text>{achievement.currentCount}</Text>}
                                    </Stack>
                                </Tip>

                            </Box>
                        )
                    })
                }
            </Grid>
        </ShadowBox>
    )
}

export default Achivements;
