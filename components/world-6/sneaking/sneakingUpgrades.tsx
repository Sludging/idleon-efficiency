import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Sneaking, SneakingUpgrade } from "../../../data/domain/world-6/sneaking";

export const SneakingUpgrades = ({ upgrades, currentJade } : { upgrades: SneakingUpgrade[], currentJade: number } ) => {
    return (
        <Box>
            <Box direction="row" wrap margin={{ top: 'large' }}>
                <Grid columns={{ size: 'medium', count: 'fill' }} fill>
                    {
                        // Once stop hiding info from people, just get rid of the filter on unlocked, the shouldBeDisplayed filter out useless placeholder bonuses
                        // For now showing only unlocked ones that are displayed in-game.
                        upgrades
                            .filter(upgrade => upgrade.shouldBeDisplayed == true && upgrade.unlocked)
                            .map((upgrade, index) => {
                                const canAfford = currentJade > upgrade.nextLevelCost();
                                return (
                                    <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Box direction="column" gap="medium">
                                            <Box direction="row" gap="medium" align="center">
                                                <IconImage data={upgrade.getImageData()} />
                                                <Text size="small">{upgrade.name}{upgrade.level > 0 ? " (Lv." + upgrade.level + ")" : ""}</Text>
                                            </Box>
                                            <TextAndLabel textSize='xsmall' text={upgrade.getBonusText()} label={"Bonus"} />
                                            {
                                                <ComponentAndLabel
                                                    label={upgrade.level > 0 ? "Next level cost" : "Unlock Cost"}
                                                    component={
                                                        <Box gap="xsmall" direction="row">
                                                            <IconImage data={Sneaking.getJadeImageData()} scale={0.5} />
                                                            <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(upgrade.nextLevelCost())}</Text>
                                                        </Box>
                                                    }
                                                />
                                            }
                                        </Box>
                                    </ShadowBox>
                                )
                            })

                    }
                </Grid>
            </Box>
        </Box>
    )
}