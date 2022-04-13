import { Box, Grid, Text } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { TaskBoard } from "../../../data/domain/tasks";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel from "../../base/TextAndLabel";

function Merits({ worldIndex }: { worldIndex: number }) {
    const [taskboardData, setTaskboardData] = useState<TaskBoard>();
    const appContext = useContext(AppContext);

    const meritsToShow = useMemo(() => {
        if (taskboardData) {
            return taskboardData.merits.filter(merit => merit.world == worldIndex + 1 && merit.icon != "Blank");
        }
        return [];
    }, [taskboardData, worldIndex])

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setTaskboardData(theData.get("taskboard"));
        }
    }, [appContext])

    return (
        <Grid columns={{ count: 3, size: 'auto' }} pad="small" gap="small">
            {
                meritsToShow.map((merit, index) => (
                    <ShadowBox key={index} background="dark-1" pad="medium" gap="small">
                        <Box direction="row" gap="large" align="center">
                            <IconImage data={merit.getImageData()} scale={0.5} />
                            <Text size="small">{merit.getDescription()}</Text>
                        </Box>
                        <Box direction="row" gap="medium">
                            <TextAndLabel text={merit.level.toString()} label="Current Level" />
                            <TextAndLabel text={merit.totalLevels.toString()} label="Max Level" />
                        </Box>
                    </ShadowBox>
                ))
            }
        </Grid>
    )
}

export default Merits;