import { Box, Grid, Stack, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning as SummoningDomain, SummonUpgrade, SummonEssence, SummonEssenceColor } from '../../../data/domain/world-6/summoning';

const ColorSection = ({ upgrades, essence, index }: { upgrades: SummonUpgrade[], essence: SummonEssence, index: number }) => {
    const borderColor = index > 0 ? "grey-1" : "none";
    return (
        <Grid columns={{ size: 'medium', count: 'fill' }} pad="small" border={{ side: 'top', color: borderColor }} fill>
            {
                upgrades
                .map((upgrade, index) => {
                    const canAfford = essence.quantity > upgrade.nextLevelCost();
                    return (
                        <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                            <Box direction="column" gap="small">
                                <Box direction="row" gap="small" align="center">
                                    <Stack>
                                        <Box>
                                            <IconImage data={upgrade.getBorderImageData()} />
                                        </Box>
                                        <Box>
                                            <IconImage data={upgrade.getImageData()} />
                                        </Box>                                                
                                    </Stack>     
                                    <Text size="small">{upgrade.data.name}{" (" + upgrade.getLevelDisplay() + ")"}</Text>
                                </Box>
                                <TextAndLabel textSize='xsmall' text={upgrade.getBonusText()} label={"Bonus"} />
                                {
                                    <ComponentAndLabel
                                        label={upgrade.level > 0 ? "Next level cost" : "Unlock Cost"}
                                        component={
                                            upgrade.level < upgrade.data.maxLvl ?
                                            <Box gap="xsmall" direction="row" align="center">
                                                <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                                                <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(upgrade.nextLevelCost())}</Text>
                                            </Box>
                                            :
                                            <Box gap="xsmall" direction="row" align="center">
                                                <Text size="small">MAXED</Text>
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
    )
}

export const SummoningUpgrades = ({ upgrades, essences } : { upgrades: SummonUpgrade[], essences: SummonEssence[] } ) => {
    // Once stop hiding info from people, just get rid of the filter on unlocked, the shouldBeDisplayed filter out useless placeholder bonuses
    // For now showing only unlocked ones that are displayed in-game.
    const upgradesToDisplay = upgrades.filter(upgrade => upgrade.shouldBeDisplayed == true && upgrade.unlocked);
    if (upgradesToDisplay.length == 0) {
        return <Text>You should start unlocking upgrade in W6 town first</Text>
    } else {
        return (
            <Box>
                <Box direction="column" margin={{ top: 'small' }}>
                    {
                        essences
                            .filter(essence => essence.display == true)
                            .map((essence, index) => (
                                <ColorSection key={index} index={index} upgrades={upgradesToDisplay.filter(upgrade => upgrade.data.colour == essence.color)} essence={essence} />
                        ))
                    }
                </Box>
            </Box>
        )
    }
}