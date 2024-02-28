import { Box, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning as SummoningDomain, SummonEssence, BattlesInfo } from '../../../data/domain/world-6/summoning';

export const SummoningBattles = ({ battlesInfos, essences }: { battlesInfos: BattlesInfo, essences: SummonEssence[] }) => {
    const allVictories: number = battlesInfos.allVictories.reduce((allVictories, colorVictories) => allVictories + colorVictories, 0);

    if (battlesInfos.allBattles.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Box>
                <Box direction="row" wrap justify="center">
                    <ShadowBox margin={{ right: 'medium', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium">
                        <TextAndLabel label="Total Victories" text={allVictories.toString()} />
                        <TextAndLabel label="Health" text={`${battlesInfos.currentHealth}/${battlesInfos.maxHealth}`} />
                    </ShadowBox>
                    <ShadowBox margin={{ right: 'medium', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <ComponentAndLabel
                            label={"Unit stats"}
                            component={
                                <Box direction="row" gap="medium">
                                    <TextAndLabel label="Atk" text={nFormatter(battlesInfos.playerUnitsAtk)} />
                                    <TextAndLabel label="HP" text={nFormatter(battlesInfos.playerUnitsHP)} />
                                </Box>
                            }
                        />
                    </ShadowBox>
                </Box>
                <Box>
                    <Box fill align="center" margin="medium">
                    <Text size="large">Upcoming battles</Text>
                    </Box>
                    <Box wrap direction="row" justify="center">
                        {
                            // When no longer need to hide w6 remove essence.display filter to show all battles
                            essences.filter(essence => essence.battles.length > 0 && essence.display == true).map((essence, index) => {
                                return (
                                    <ShadowBox width={{ max: '250px' }} background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'medium' }}>
                                        <Box direction="row" gap="small" pad="small">
                                            <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                                            <Text>{SummoningDomain.getEssenceColorName(essence.color)} ({essence.victories}/{essence.battles.length})</Text>
                                        </Box>
                                        {
                                            essence.battles.map((battle, index) => {
                                                if (index < essence.victories) {
                                                    return null;
                                                }
                                                const isNextBattle: boolean = (index == essence.victories && essence.display);
                                                return (
                                                    <Box key={index} style={{ opacity: isNextBattle == true ? 1 : 0.6 }} pad={{ vertical: 'small' }} margin={{ bottom: 'xsmall' }} border={{ side: 'top', color: "grey-1" }}>
                                                        <Box direction="row" align="center" gap="small">
                                                            <Box gap="small" margin={{ bottom: '2px' }}>
                                                                <TextAndLabel textSize="small" label="Name" text={battle.territoryName} />
                                                                <TextAndLabel textSize="small" label="Bonus" text={BattlesInfo.getBattleBonusText(battle.bonus, battle.bonusQty as number)} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </ShadowBox>
                                )
                            })}
                    </Box>
                </Box>
            </Box>
        )
    }
}