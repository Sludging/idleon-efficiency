import { Box, Grid, Stack, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage, { AdaptativeIconImage } from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning as SummoningDomain, SummonUpgrade, SummonEssence, SummonEssenceColor, SummonBonus, BattlesInfo } from '../../../data/domain/world-6/summoning';
import { SummonEnemyModel } from "../../../data/domain/model/summonEnemyModel";
import { useState } from "react";
import TabButton from "../../base/TabButton";

export const SummoningBattles = ({ battlesInfos, essences }: { battlesInfos: BattlesInfo, essences: SummonEssence[] }) => {
    const allVictories: number = battlesInfos.allVictories.reduce((allVictories, colorVictories) => allVictories + colorVictories, 0);

    if (battlesInfos.allBattles.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Box>
                <Box align="center">
                    <Box direction="row" justify="center" gap="medium" pad="small">
                        <Text size="medium">Total victories : {allVictories}</Text>
                        <Text size="medium">Health : {battlesInfos.currentHealth}/{battlesInfos.maxHealth}</Text>
                    </Box>
                    <Box align="center" gap="small" pad="small">
                        <Text size="small">Player base unit</Text>
                        <Box direction="row" gap="medium">
                            <Text size="small">Atk: {nFormatter(battlesInfos.playerUnitsAtk)}</Text>
                            <Text size="small">HP: {nFormatter(battlesInfos.playerUnitsHP)}</Text>
                        </Box>
                    </Box>
                </Box>
                <Box wrap direction="row" justify="center">
                    {
                        // When no longer need to hide w6 remove essence.display filter to show all battles
                        essences.filter(essence => essence.battles.length > 0 && essence.display == true).map((essence, index) => {
                            return (
                                <ShadowBox width={{ max: '250px' }} background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'medium' }}>
                                    <Box direction="row" justify="center" gap="small">
                                        <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                                        <Text>{SummoningDomain.getEssenceColorName(essence.color)} ({essence.victories}/{essence.battles.length})</Text>
                                    </Box>
                                    {
                                        essence.battles.map((battle, index) => {
                                            const isNextBattle: boolean = (index == essence.victories && essence.display);
                                            const borderColor = index > 0 ? "grey-1" : "none";
                                            return (
                                                <Box key={index} style={{ opacity: isNextBattle == true ? 1 : 0.6 }} pad={{ vertical: 'small' }} margin={{ bottom: 'xsmall' }} border={{ side: 'top', color: borderColor }}>
                                                    <Box direction="row" align="center" gap="small">
                                                        <Box gap="small" margin={{ bottom: '2px' }}>
                                                            <Text >{battle.territoryName}</Text>
                                                            <Text>Bonus : {BattlesInfo.getBattleBonusText(battle.bonus, battle.bonusQty as number)}</Text>
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
        )
    }
}