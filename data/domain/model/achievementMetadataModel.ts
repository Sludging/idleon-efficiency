import { AchievementGoldBallBonusModel } from './achievementGoldBallBonusModel';

export interface AchievementMetadataModel {
    worldToAchievementOrdering: Record<string, number[]>,
    steam2Registration: number[],
    goldBallBonuses: AchievementGoldBallBonusModel[]
}
