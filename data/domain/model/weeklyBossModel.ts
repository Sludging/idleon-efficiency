import { WeeklyTaskModel } from './weeklyTaskModel';

export interface WeeklyBossModel {
    name: string,
    possibleTasks: WeeklyTaskModel[],
    health: number,
    healthMult: number,
    x: number,
    y: number,
    xOff: number
}
