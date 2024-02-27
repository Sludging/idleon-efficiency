import { Box, Grid, Stack, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { nFormatter } from "../../../data/utility";
import { Summoning as SummoningDomain, SummonUpgrade, SummonEssence, SummonEssenceColor } from '../../../data/domain/world-6/summoning';
import { SummonEnemyModel } from "../../../data/domain/model/summonEnemyModel";
import { useState } from "react";
import TabButton from "../../base/TabButton";

export const SummoningBattles = ({ battles, essences, currentHealth, maxHealth }: { battles: SummonEnemyModel[][], essences: SummonEssence[], currentHealth: number, maxHealth: number }) => {
    const allVictories: number = essences.reduce((allVictories, essence) => allVictories + essence.victories, 0);

    if (battles.length == 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <Box>
                <Box direction="row" justify="center" gap="medium" pad="small">
                    <Text size="medium">Total victories : {allVictories}</Text>
                    <Text size="medium">Health : {currentHealth}/{maxHealth}</Text>
                </Box>
                <Box wrap direction="row" justify="center">
                    {essences.filter(essence => essence.display == true).map((essence, index) => {
                        return (
                            <ShadowBox width={{ max: '250px' }} background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'medium' }}>
                                <Text>{SummoningDomain.getEssenceColorName(essence.color)} ({essence.victories}/{essence.battles.length})</Text>
                                {
                                    essence.battles.map((battle, index) => {
                                        const isNextBattle: boolean = (index == essence.victories);
                                        const borderColor = index > 0 ? "grey-1" : "none";
                                        return (
                                            <Box key={index} pad={{ vertical: 'small' }} margin={{ bottom: 'xsmall' }} border={{ side: 'top', color: borderColor }}>
                                                <Box direction="row" align="center" gap="small">
                                                    <Box gap="xsmall">
                                                        <Box direction="row" gap="xsmall" align="center" margin={{ bottom: '8px' }}>
                                                            <Box margin={{ top: '8px' }}>
                                                                <Text style={{ opacity: isNextBattle == true ? 1 : 0.6 }}>{battle.territoryName}</Text>
                                                            </Box>
                                                        </Box>
                                                        <Box direction="row" justify="center" align="center">
                                                            <Text color='grey-2' size="small">{}</Text>
                                                        </Box>
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