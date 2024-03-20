import { Box, Grid, Text } from "grommet";
import { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "../../../data/domain/tasks";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

function Tasks({ worldIndex }: { worldIndex: number }) {
    const [taskboardData, setTaskboardData] = useState<TaskBoard>();
    const theData = useAppDataStore((state) => state.data.getData());

    const tasksToShow = useMemo(() => {
        if (taskboardData) {
            return taskboardData.tasks.filter(task => task.world == worldIndex + 1 && !task.isDaily());
        }
        return [];
    }, [taskboardData, worldIndex])

    useEffect(() => {
        setTaskboardData(theData.get("taskboard"));
    }, [theData])

    return (
        <Grid columns={{ count: 3, size: 'auto' }} pad="small" gap="small">
            {
                tasksToShow.map((task, index) => (
                    <ShadowBox key={index} background="dark-1" pad="medium" gap="small">
                        <Box direction="row" align="center">
                            <IconImage data={task.getLevelImageData()} />
                            <Text size="small">{task.name} ({task.level.toString()} / {task.numbers.length})</Text>
                        </Box>
                        <Box width="medium">
                            <TextAndLabel textSize="xsmall" labelSize="small" text={task.getDescription()} label="Description" />
                        </Box>
                        <TextAndLabel text={nFormatter(task.count)} label="Current value" />
                    </ShadowBox>
                ))
            }
        </Grid>
    )
}

export default Tasks;