import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import IconImage from "../../base/IconImage";
import { JadeUpgrade, Sneaking } from "../../../data/domain/world-6/sneaking";
import { nFormatter } from "../../../data/utility";

export const JadeUpgrades = ({
    jadeUpgrades,
    currentJade
}: {
    jadeUpgrades: JadeUpgrade[],
    currentJade: number
}) => {
    return (
        <Box>
            <Box direction="row" wrap margin={{ top: 'large' }}>
                <Grid columns={{ size: 'auto', count: 4 }} fill>
                    {
                        jadeUpgrades
                            .map((upgrade, index) => {
                                const canAfford = currentJade > upgrade.unlockCost();
                                return (
                                    <ShadowBox style={{ opacity: upgrade.purchased ? 1 : canAfford ? 0.6 : 0.4 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        {
                                            <Box gap="small">
                                                <Box direction="row" gap="medium" align="center">
                                                    <IconImage data={upgrade.getImageData()} scale={0.5} />
                                                    <Text size="small">{upgrade.data.name}</Text>
                                                </Box>
                                                <TextAndLabel textSize='xsmall' text={upgrade.data.bonus} label={"Bonus"} />
                                                {
                                                    !upgrade.purchased &&
                                                    <ComponentAndLabel
                                                        label={"Unlock Cost"}
                                                        component={
                                                            <Box gap="xsmall" direction="row">
                                                                <IconImage data={Sneaking.getJadeImageData()} scale={0.5} />
                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(upgrade.unlockCost())}</Text>
                                                            </Box>
                                                        }
                                                    />
                                                }
                                            </Box>
                                        }
                                    </ShadowBox>
                                )
                            })

                    }
                </Grid>
            </Box>
        </Box>
    )
}