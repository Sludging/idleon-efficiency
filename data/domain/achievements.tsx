import { ImageData } from "./imageData";
import { initAchievementRepo, AchievementBase } from './data/AchievementRepo';
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";
export const AchievementConst = {
    SmartBoiIndex: 108
}

export class Achievement extends AchievementBase {
    completed: boolean = false;
    currentCount: number = 0;
    arrayIndex: number = 0;
    visualIndex: number = 0;
    worldLetter: string = 'A';
    baseName: string = '';
    iconClass: string = '';

    constructor(base: AchievementBase) {
        super(base.index, base.data);
    }

    getImageData = (): ImageData => {
        return {
            location: this.baseName,
            height: 43,
            width: 43
        }
    }

    static fromBase = (data: AchievementBase[]) => {
        return data.map(achiv => new Achievement(achiv));
    }
}


const AchSteam2Reg = [
    11, 70, 140, 7, 19, 71, 141, 165, 214, 9, 72, 161, 35, 164, 1, 73, 142, 13, 85, 172,
    12, 86, 174, 29, 55, 36, 105, 28, 31, 38, 39, 88, 89, 25, 90, 175, 43, 106, 52, 50,
    51, 53, 0, 5, 14, 3, 2, 91, 177, 236, 0, 92, 149, 150, 167, 168, 182, 237, 217, 223,
    210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const achievOrdering = [
    [
        0, 2, 1, 3, 4, 5, 6, 54, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 57, 58, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 56, 35, 36, 61, 59,
        37, 38, 39, 40, 41, 42, 55, 43, 44, 45, 60, 46, 47, 49, 50, 51, 52, 53, 62, 63,
        64, 65, 66, 67, 68, 69, 70,
    ],
    [
        0, 3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 49, 53, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 50, 54, 52, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 51, 45, 46, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70,
    ],
    [
        0, 4, 1, 5, 3, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 45, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 46, 28, 29, 30, 31, 43, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 48, 41, 47, 44, 42, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70, 70,
    ],
    [
        0, 1, 8, 10, 12, 14, 21, 24, 2, 20, 4, 9, 11, 13, 15, 16, 17, 19, 22, 25, 3, 5,
        18, 23, 26, 27, 6, 7, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
        43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70,
    ],
    [
        5, 0, 7, 19, 12, 3, 8, 1, 15, 18, 21, 22, 23, 24, 16, 20, 30, 13, 10, 6, 4, 11,
        14, 9, 2, 17, 29, 28, 25, 26, 27, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
        43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70,
    ],
    [
        0, 1, 5, 10, 16, 25, 30, 14, 22, 8, 18, 11, 6, 20, 24, 15, 2, 26, 28, 33, 19, 7,
        29, 17, 12, 27, 9, 23, 3, 34, 13, 32, 31, 4, 21, 35, 36, 37, 38, 39, 40, 41, 42,
        43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 70,
    ],
];

export class Achievements extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: "AchieveReg", perPlayer: false, default: [] },
            { key: "SteamAchieve", perPlayer: false, default: [] },
        ]
    }
    init(_allItems: Item[], _charCount: number) {
        const achievements = Achievement.fromBase(initAchievementRepo());

        achievements.forEach((achievement, index) => {
            const reminder = Math.floor(index / 70);
            let letter = 'A';
            if (reminder == 1) {
                letter = 'B';
            }
            if (reminder == 2) {
                letter = 'C';
            }
            if (reminder == 3) {
                letter = 'D';
            }
            if (reminder == 4) {
                letter = 'E';
            }
            if (reminder == 5) {
                letter = 'F';
            }
            achievement.arrayIndex = index + 1;
            achievement.visualIndex = achievOrdering[reminder].indexOf(index - (70 * reminder));
            achievement.worldLetter = letter;

            achievement.baseName = `TaskAch${achievement.worldLetter}${achievement.arrayIndex - (70 * reminder)}`
        })
        return achievements
    }
    parse(data: Map<string, any>): void {
        const achievements = data.get(this.getDataKey()) as Achievement[];
        const achiData = data.get("AchieveReg") as number[];
        const steamData = data.get("SteamAchieve") as number[];

        achievements.forEach((achievement, index) => {
            achievement.completed = achiData[index] == -1;

            if (!achievement.completed) {
                const steamIndex = AchSteam2Reg.indexOf(achievement.index);
                if (steamIndex > -1) {
                    achievement.currentCount = Math.max(achiData[index], steamData[steamIndex]);
                }
                else {
                    achievement.currentCount = achiData[index];
                }
            }
        })
    }
}
