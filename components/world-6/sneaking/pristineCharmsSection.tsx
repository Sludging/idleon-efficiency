import { Box, Grid, Text } from "grommet"
import { PristineCharm } from "../../../data/domain/world-6/sneaking"
import TipDisplay, { TipDirection } from "../../base/TipDisplay"
import IconImage from "../../base/IconImage"
import ShadowBox from "../../base/ShadowBox"
import TextAndLabel from "../../base/TextAndLabel"

export const PristineCharmSection = ({ charms }: { charms: PristineCharm[] }) => {
    return (
        <Box margin={{ top: 'large', bottom: 'xsmall' }} gap="small">
            <Grid columns={{ size: 'auto', count: 4 }} fill>
                {
                    // Once I stop hiding info from people, just get rid of the filter and the unlock more upgrades to see section.
                    // For now I'm showing available ones + 3 "hidden" ones.
                    charms.map((charm, index) => {
                        return (
                            <ShadowBox style={{ opacity: charm.unlocked ? 1 : 0.3 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                <Box gap="small">
                                    <Box direction="row" gap="medium" align="center">
                                        <IconImage data={charm.getImageData()} scale={0.5} />
                                        <Text size="small">{charm.data.name}</Text>
                                    </Box>
                                    <TextAndLabel textSize='xsmall' text={charm.getBonusText()} label={"Bonus"} />
                                </Box>
                            </ShadowBox>
                        )
                    })

                }
            </Grid>
        </Box>
    )
}