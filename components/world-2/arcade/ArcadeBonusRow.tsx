"use client"

import { Box, Grid, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import IconImage from "../../base/IconImage";
import { Arcade as ArcadeData, ArcadeBonus, ARCADE_MAX_LEVEL } from "../../../data/domain/world-2/arcade";
import { nFormatter } from "../../../data/utility";
import { cosmicBallStyle, goldBallStyle } from "./ballStyles";

function ArcadeBallCostDisplay({ cost, costToMax, isMaxLevel, hasCosmicStepToMax }: { cost: number, costToMax: number, isMaxLevel: boolean, hasCosmicStepToMax : boolean }) {
    if (isMaxLevel) {
        return (
            <Box fill justify="center" align="center">
                <Text size="large">Maxed</Text>
            </Box>
        )
    }
    
    const costStyle = hasCosmicStepToMax ? cosmicBallStyle : goldBallStyle;
    const costToMaxStyle = hasCosmicStepToMax ? cosmicBallStyle : goldBallStyle;
    return (
        <>
            <ComponentAndLabel labelSize="xsmall" label="Cost"
                component={ 
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={ArcadeData.silverBallImageData()} scale={0.75} style={costStyle} />
                        <Text size="small">{nFormatter(cost)}</Text>
                    </Box>
                }
            />
            <ComponentAndLabel labelSize="xsmall" label="Cost to max"
                component={ 
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={ArcadeData.silverBallImageData()} scale={0.75} style={costToMaxStyle} />
                        <Text size="small">{nFormatter(costToMax)}</Text>
                    </Box>
                }
            />
        </>
    );
}

export function ArcadeBonusRow({ bonus, goldenBallStampBonus, isOnRotation }: {
    bonus: ArcadeBonus,
    goldenBallStampBonus: number,
    isOnRotation: boolean
}) {
    const isMaxLevel = bonus.level >= ARCADE_MAX_LEVEL + 1;
    const hasCosmicStepToMax = bonus.level === ARCADE_MAX_LEVEL;
    const maxBonus = (hasCosmicStepToMax || isMaxLevel)
        ? bonus.getBonus(true, ARCADE_MAX_LEVEL + 1).toString()
        : bonus.getBonus(true, ARCADE_MAX_LEVEL).toString();
    const cost = hasCosmicStepToMax ? 5 : bonus.getCost(goldenBallStampBonus);
    const costToMax = hasCosmicStepToMax ? 5 : bonus.getCostToMax(goldenBallStampBonus);

    return (
        <ShadowBox style={{ opacity: isOnRotation ? 1 : 0.45 }} background="dark-1" pad="xsmall" direction="row" align="center" justify="between" margin={{ bottom: 'small' }} >
            <Grid columns={["5%", "40%", "12%", "11%", "16%", "16%"]} gap="small" align="center" fill>
                <ComponentAndLabel labelSize="xsmall" label="Upgrade"
                    component={
                        <Box direction="row" justify="start">
                            <IconImage data={bonus.getImageData()} scale={0.7} />
                        </Box>
                    }
                />
                <TextAndLabel labelSize="xsmall" textSize="xsmall" text={bonus.getBonusText()} label="Effect"/>
                <TextAndLabel labelSize="xsmall" textSize="xsmall" text={maxBonus} label="Max Bonus" />
                <TextAndLabel labelSize="xsmall" textSize="small" text={`${bonus.level} / ${isMaxLevel ? ARCADE_MAX_LEVEL +1 : ARCADE_MAX_LEVEL}`} label="Level" />
                <ArcadeBallCostDisplay cost={cost} costToMax={costToMax} isMaxLevel={isMaxLevel} hasCosmicStepToMax={hasCosmicStepToMax} />
            </Grid>
        </ShadowBox>
    );
}

export default ArcadeBonusRow;
