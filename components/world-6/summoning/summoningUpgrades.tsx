import { Box, Grid, Stack, Text } from "grommet";
import { Star } from 'grommet-icons';
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning as SummoningDomain, SummonUpgrade, SummonEssence } from '../../../data/domain/world-6/summoning';
import TabButton from "../../base/TabButton";
import { useState } from "react";
import TipDisplay from "../../base/TipDisplay";

const ColorSection = ({ colorUpgrades, allUpgrades, essence }: { colorUpgrades: SummonUpgrade[], allUpgrades: SummonUpgrade[], essence: SummonEssence | undefined }) => {
    if (!essence || colorUpgrades.length == 0) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        return (
            <Grid columns={{ size: 'small', count: 'fill' }} pad="small" fill>
                {
                    colorUpgrades
                        .map((upgrade, index) => {
                            const canAfford = essence.quantity > upgrade.nextLevelCost();
                            const maxed = upgrade.level >= upgrade.data.maxLvl;
                            let label: string = "";
                            if (upgrade.unlocked) {
                                label = (upgrade.level > 0 ? "Next level cost" : "Unlock Cost");
                            } else {
                                label = "Require a level in " + (allUpgrades.find(findUpgrade => findUpgrade.index == upgrade.data.idReq)?.data.name ?? "");
                            }
                            return (
                                <ShadowBox style={{ opacity: upgrade.level > 0 ? 1 : 0.6 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                    <Box gap="small" justify="between" fill>
                                        <Box gap="small">
                                            <Box direction="row" gap="small" align="center">
                                                <Stack>
                                                    <Box>
                                                        <IconImage data={upgrade.getBorderImageData()} scale={0.8} />
                                                    </Box>
                                                    <Box>
                                                        <IconImage data={upgrade.getImageData()} scale={0.8} />
                                                    </Box>
                                                </Stack>
                                                <Box>
                                                    <Text size="xsmall">{upgrade.data.name}</Text>
                                                    <Text size="xsmall">{upgrade.getLevelDisplay()}</Text>
                                                </Box>
                                                {upgrade.isDoubled && 
                                                    <TipDisplay
                                                        heading="Summoning doubler"
                                                        size='small'
                                                        maxWidth='small'
                                                    >
                                                        <Star size="small" color="yellow" />
                                                    </TipDisplay>}
                                            </Box>
                                            <TextAndLabel textSize='xsmall' text={upgrade.getBonusText()} label={"Bonus"} />
                                        </Box>
                                        <Box style={{ opacity: !maxed ? 1 : 0.6 }}>
                                            <ComponentAndLabel
                                                label={label}
                                                component={
                                                    upgrade.unlocked ?
                                                        !maxed ?
                                                            <Box gap="xsmall" direction="row" align="center">
                                                                <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                                                                <Text color={canAfford ? 'green-1' : ''} size="small">{nFormatter(upgrade.nextLevelCost())}</Text>
                                                            </Box>
                                                            :
                                                            <Box gap="xsmall" direction="row" align="center">
                                                                <Text size="small">MAXED</Text>
                                                            </Box>
                                                        :
                                                        <Box></Box>
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </ShadowBox>
                            )
                        })
                }
            </Grid>
        )
    }
}

export const SummoningUpgrades = ({ upgrades, essences }: { upgrades: SummonUpgrade[], essences: SummonEssence[] }) => {
    const [activeTab, setActiveTab] = useState<string>("White");
    const upgradesToDisplay = upgrades.filter(upgrade => upgrade.shouldBeDisplayed == true);
    const tabsName = essences.filter(essence => essence.displayEssence == true).map(essence => {
        if(upgradesToDisplay.filter(upgrade => upgrade.data.colour == essence.color).length > 0){
            return SummoningDomain.getEssenceColorName(essence.color);
        } else {
            return '';
        }
    });


    if (upgradesToDisplay.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Box>
                <Box align="center" margin= {{ top: 'small' }} direction="row" justify="center" gap="small">
                    {tabsName.filter(name => name != '').map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                <Box margin={{ top: 'small' }}>
                    {
                        <ColorSection colorUpgrades={upgradesToDisplay.filter(upgrade => SummoningDomain.getEssenceColorName(upgrade.data.colour) == activeTab)} allUpgrades={upgradesToDisplay} essence={essences.find(essence => SummoningDomain.getEssenceColorName(essence.color) == activeTab)} />
                    }
                </Box>
            </Box>
        )
    }
}
