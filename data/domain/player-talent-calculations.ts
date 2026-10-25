import { AFKTypeEnum } from './enum/aFKTypeEnum';
import type { Card } from './cards';
import { EnemyInfo } from './enemies';
import { MapInfo } from './maps';
import { initDreamChallengeRepo } from './data/DreamChallengeRepo';
import type { Player } from './player';
import { SkillsIndex } from './SkillsIndex';
import { Talent } from './talents';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Account } from './account';
import type { Deathnote } from './world-3/construction/deathnote';
import type { Refinery } from './world-3/construction/refinery';
import type { Stamp } from './world-1/stamps';

const DREAM_CHALLENGE_COUNT = initDreamChallengeRepo().length;

const getSecondCurveTalentBonus = (player: Player, skillIndex: number): number => {
    const talent = player.getTalent(skillIndex);
    if (!talent || talent.pointsSpent <= 0.5) {
        return 0;
    }

    const extraLevels = talent.getExtraLevels(
        player.finalTalentInputs,
        player.activeSuperTalentIndexes.has(skillIndex),
    );
    return talent.getBonusAtLevel(talent.pointsSpent + extraLevels, false, true);
};

const getTalentCalculationMap31 = (player: Player, deathnote: Deathnote): number => {
    const killsLeft = deathnote.getKillsLeftToAdvance(player.playerID, 100);
    if (killsLeft === undefined) {
        return 0;
    }

    let minimumSkillLevel = 1000;
    const skillIndexes = [
        SkillsIndex.Mining,
        SkillsIndex.Smithing,
        SkillsIndex.Chopping,
        SkillsIndex.Fishing,
        SkillsIndex.Alchemy,
        SkillsIndex.Catching,
        SkillsIndex.Trapping,
        SkillsIndex.Construction,
        SkillsIndex.Worship,
    ];
    for (let index = 0; index < skillIndexes.length; index++) {
        if (index === 8 && killsLeft <= 0) {
            continue;
        }
        minimumSkillLevel = Math.min(minimumSkillLevel, player.skills.get(skillIndexes[index])?.level ?? 0);
    }
    return minimumSkillLevel;
};

const getTalentCalculationMap110 = (player: Player, deathnote: Deathnote): number => {
    let fightingMapsWithAtLeast100KRemainingKills = 0;
    for (const map of MapInfo) {
        const enemy = EnemyInfo.find(candidate => candidate.id === map.data.enemy);
        if (!enemy || enemy.details.AFKtype !== AFKTypeEnum.Fighting) {
            continue;
        }

        const killsLeft = deathnote.getKillsLeftToAdvance(player.playerID, map.index);
        if (killsLeft === undefined) {
            break;
        }
        if (map.data.portalRequirements[0] - killsLeft >= 100_000) {
            fightingMapsWithAtLeast100KRemainingKills++;
        }
    }
    return Math.min(fightingMapsWithAtLeast100KRemainingKills, getSecondCurveTalentBonus(player, 110));
};

export type TalentCalculationSelector = 31 | 57 | 110 | 125 | 305 | 470 | 485 | 656;

export const getTalentCalculationBonus = (data: Map<string, unknown>, player: Player, selector: TalentCalculationSelector): number => {

    switch (selector) {
        case 31: {
            const deathnote = data.get('deathnote') as Deathnote;
            return player.getTalentBonusAtInputs(31, player.finalTalentInputs)
                * Math.floor(getTalentCalculationMap31(player, deathnote) / 5);
        }
        case 57: {
            const players = data.get('players') as Player[];
            let maximumCombinedLevel = 0;
            for (const candidate of players) {
                // Only Beginner-family characters supply the combined Trapping and Worship level.
                if (candidate.classId < 6) {
                    const combinedLevel = candidate.skills.get(SkillsIndex.Trapping)!.level
                        + candidate.skills.get(SkillsIndex.Worship)!.level;
                    maximumCombinedLevel = Math.max(maximumCombinedLevel, combinedLevel);
                }
            }
            // The roster level maximum and talent bonus maximum use separate selections.
            return Talent.getAccountTalentBonus(players, 57, player.finalTalentInputs)
                * Math.max(0, maximumCombinedLevel - 100);
        }
        case 110: {
            const deathnote = data.get('deathnote') as Deathnote;
            return player.getTalentBonusAtInputs(110, player.finalTalentInputs)
                * getTalentCalculationMap110(player, deathnote);
        }
        case 125: {
            const refinery = data.get('refinery') as Refinery;
            const target = player.currentMonster!;
            if (player.stats.accuracy < 2.25 * target.details.Defence) {
                return 0;
            }
            let refineryRanks = 0;
            for (let index = 1; index <= 6; index++) {
                refineryRanks += refinery.salts[`Refinery${index}`].rank;
            }
            return refineryRanks;
        }
        case 305: {
            const cards = data.get('cards') as Card[];
            const eligibleCardCount = cards.reduce((count, card) => {
                return count + (card.id.includes('Gem') || card.id.includes('Cards') ? 0 : 1);
            }, 0);
            return player.getTalentBonusAtInputs(305, player.finalTalentInputs) * eligibleCardCount;
        }
        case 470: {
            const stamps = data.get('stamps') as Stamp[][];
            let stampMaxLevels = 0;
            for (const tab of stamps) {
                for (const stamp of tab) {
                    if (stamp.maxLevel > 0.5) {
                        stampMaxLevels++;
                    }
                }
            }
            return player.getTalentBonusAtInputs(470, player.finalTalentInputs) * stampMaxLevels;
        }
        case 485: {
            const alchemy = data.get('alchemy') as Alchemy;
            let cauldronVialsAboveLevel3 = 0;
            for (const vial of alchemy.vials) {
                if (vial.level > 3) {
                    cauldronVialsAboveLevel3++;
                }
            }
            return player.getTalentBonusAtInputs(485, player.finalTalentInputs) * cauldronVialsAboveLevel3;
        }
        case 656: {
            const account = data.get('account') as Account;
            let completedDreamChallenges = 0;
            for (let index = 0; index < DREAM_CHALLENGE_COUNT; index++) {
                completedDreamChallenges += Number(account.weeklyBoss.isDreamChallengeCompleted(index));
            }
            return player.getTalentBonusAtInputs(656, player.finalTalentInputs) * completedDreamChallenges;
        }
    }
};
