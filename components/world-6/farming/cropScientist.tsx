import { Box, Grid, ResponsiveContext, Text } from "grommet";
import { CropScientist } from "../../../data/domain/world-6/farming";
import ShadowBox from "../../base/ShadowBox";
import { useContext } from "react";
import IconImage from "../../base/IconImage";

export const CropScientistDisplay = ({ cropScientist }: { cropScientist: CropScientist }) => {
    const size = useContext(ResponsiveContext);

    if (cropScientist.bonuses.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Box align="center" margin={{ top: "small" }}>
                <ShadowBox style={{ opacity: cropScientist.discoveredCrops > 0 ? 1 : 0.5 }} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                    <Box direction="row" gap="small" align="center">
                        <IconImage data={{
                            location: 'NjJupg22',
                            width: 128,
                            height: 78
                        }} scale={0.5} />
                        <Text size="small">Crops found : {cropScientist.discoveredCrops}</Text>
                    </Box>
                </ShadowBox>
                <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 4) }} margin={{ top: "small" }} fill>
                    {
                        cropScientist.bonuses.map((bonus, index) => {
                            return (
                                <ShadowBox style={{ opacity: bonus.unlocked ? 1 : 0.5 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                    <Text size="small">{cropScientist.getBonusText(bonus.bonusText)}</Text>
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </Box>
        )
    }
}