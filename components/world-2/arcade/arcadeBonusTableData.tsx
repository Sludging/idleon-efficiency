import { ArcadeBonus, ARCADE_MAX_LEVEL } from "../../../data/domain/world-2/arcade";

export interface ArcadeBonusTableRow {
    id: number;
    bonus: ArcadeBonus;
    isOnRotation: boolean;
    isMaxLevel: boolean;
    hasCosmicStepToMax: boolean;
    maxBonus: string;
    levelText: string;
    cost: number;
    costToMax: number;
}

export function buildArcadeBonusTableRows(
    bonuses: ArcadeBonus[],
    goldenBallStampBonus: number,
    activeArcadeBonuses: number[]
): ArcadeBonusTableRow[] {
    const activeBonusSet = activeArcadeBonuses.length === 0 ? null : new Set(activeArcadeBonuses);

    return bonuses.map((bonus) => {
        // Currently max level is 101: 100 gold balls levels and 1 cosmic ball level
        const isMaxLevel = bonus.level >= ARCADE_MAX_LEVEL + 1;
        const hasCosmicStepToMax = bonus.level === ARCADE_MAX_LEVEL;

        return {
            id: bonus.index,
            bonus,
            isOnRotation: activeBonusSet ? activeBonusSet.has(bonus.index) : true,
            isMaxLevel,
            hasCosmicStepToMax,
            // Max bonus is doubled if you upgrade from level 100 to 101
            maxBonus: (hasCosmicStepToMax || isMaxLevel)
                ? bonus.getBonus(true, ARCADE_MAX_LEVEL + 1).toString()
                : bonus.getBonus(true, ARCADE_MAX_LEVEL).toString(),
            levelText: `${bonus.level} / ${isMaxLevel ? ARCADE_MAX_LEVEL + 1 : ARCADE_MAX_LEVEL}`,
            // Cost always 5 cosmic balls to get from level 100 to 101
            cost: hasCosmicStepToMax ? 5 : bonus.getCost(goldenBallStampBonus),
            costToMax: hasCosmicStepToMax ? 5 : bonus.getCostToMax(goldenBallStampBonus)
        };
    });
}
