import { Box, Grid, Text } from "grommet";
import { useMemo } from "react";
import { TaskBoard } from "../../../data/domain/tasks";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import useHydrated from "../../../lib/hooks/useHydrated";

function Merits({ worldIndex }: { worldIndex: number }) {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hydrated = useHydrated();
    const taskboardData: TaskBoard | undefined = hydrated ? theData.get("taskboard") : undefined;

    const meritsToShow = useMemo(() => {
        if (taskboardData) {
            return taskboardData.merits.filter(merit => merit.world == worldIndex + 1 && merit.icon != "Blank");
        }
        return [];
    }, [taskboardData, worldIndex, lastUpdated])


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