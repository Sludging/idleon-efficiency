import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Sneaking, SneakingOmnijade, SneakingUpgrade } from "../../../data/domain/world-6/sneaking";

export const SneakingUpgrades = ({ upgrades, currentJade, omnijade } : { upgrades: SneakingUpgrade[], currentJade: number, omnijade: SneakingOmnijade } ) => {
    return (
        <Box>
            <Box direction="row" wrap margin={{ top: 'large' }}>
                <Grid columns={{ size: 'medium', count: 'fill' }} fill>
                    {
                        upgrades
                            .filter(upgrade => upgrade.shouldBeDisplayed == true)
                            .map((upgrade, index) => {
                                const canAfford = currentJade > upgrade.nextLevelCost();
                                const supportsOmnijade = upgrade.index >= 0 && upgrade.index <= 16;
                                const effectiveLevel = upgrade.getEffectiveLevel();
                                return (
                                    <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                        <Box direction="column" gap="small">
                                            <Box direction="row" gap="small" align="center">
                                                <IconImage data={upgrade.getImageData()} scale={0.5} />
                                                <Text size="small">{upgrade.data.name}{effectiveLevel > 0 ? " (Lv." + effectiveLevel + ")" : ""}</Text>
                                            </Box>
                                            <TextAndLabel textSize='xsmall' text={upgrade.getBonusText()} label={"Bonus"} />
                                            {supportsOmnijade && (
                                                <>
                                                    <TextAndLabel
                                                        textSize="xsmall"
                                                        text={`${nFormatter(upgrade.level)} paid / ${nFormatter(upgrade.bonusLevels)} free`}
                                                        label="Levels"
                                                    />
                                                    {omnijade.isAllocated(upgrade.index) && (
                                                        <TextAndLabel
                                                            textSize="xsmall"
                                                            text={nFormatter(omnijade.getDailyLevels(upgrade.index))}
                                                            label="Free levels per day"
                                                        />
                                                    )}
                                                </>
                                            )}
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