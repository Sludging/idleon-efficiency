import { SkillsIndex } from "./SkillsIndex";
import { Alchemy } from "./world-2/alchemy/alchemy";
import { Arcade } from "./world-2/arcade";
import { Domain, RawData } from "./base/domain";
import { CompanionBase, initCompanionRepo } from "./data/CompanionRepo";
import { Divinity } from "./world-5/divinity";
import { EnemyInfo } from "./enemies";
import { ImageData } from "./imageData";
import { CompanionModel } from "./model/companionModel";
import { Player } from "./player";
import { mergeCompanionStates } from "./companions/companionState";
import type { CompanionLevel, CompanionState } from "./companions/companionState";

export class Companion {
    owned: boolean = false;
    real: boolean = false;
    level: CompanionLevel = 1;
    constructor(public id: number, public name: string, public data: CompanionModel, public imageData: ImageData) { }

    getBonus = () => {
        return this.data.desc.replace(/{/g, "+");
    }

    static fromBase(data: CompanionBase[]) {
        return data.map(c => {
            const enemy = EnemyInfo.find(enemy => enemy.id == c.data.id);
            const imageData = { location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }

            return new Companion(c.index, enemy?.details.Name ?? "Unknown", c.data, imageData);
        });
    }
}

const getCompanionBonusAtLevel = (companion: Companion, level: CompanionLevel): number => {
    if (level === 2) {
        return companion.level === 2 ? companion.data.bonus2 ?? 0 : 0;
    }

    return companion.data.bonus;
};

/** Returns the metadata bonus for an owned companion at the requested level. */
export const getCompanionBonus = (companions: Companion[], index: number, level: CompanionLevel = 1): number => {
    const companion = companions.find(companion => companion.id === index);
    return companion?.owned ? getCompanionBonusAtLevel(companion, level) : 0;
};

/** Returns the metadata bonus for an owned companion at its active level. */
export const getCompanionActiveBonus = (companions: Companion[], index: number): number => {
    const companion = companions.find(companion => companion.id === index);
    return companion?.owned ? getCompanionBonusAtLevel(companion, companion.level) : 0;
};

/** Returns one when an owned companion has reached level two. */
export const isCompanionLevelTwo = (companions: Companion[], index: number): number => {
    const companion = companions.find(companion => companion.id === index);
    return companion?.owned && companion.level === 2 ? 1 : 0;
};

export class Companions extends Domain {
    constructor(public dataKey: string) {
        super(dataKey);
    }

    init = () => {
        const companions = Companion.fromBase(initCompanionRepo());
        return companions;
    }

    parse = (data: Map<string, any>) => {
        const companions = data.get(this.getDataKey()) as Companion[];
        const ownedCompanions = mergeCompanionStates(data.get("ownedCompanions") as CompanionState[]);

        const localCompanions = localStorage.getItem("companions");
        const editedCompanions: Companion[] = [];
        if (localCompanions) {
            editedCompanions.push(...JSON.parse(localCompanions) as Companion[]);
        }

        const sourceCompanions = new Map(ownedCompanions.map(companion => [companion.id, companion]));
        companions.forEach(companion => {
            const sourceCompanion = sourceCompanions.get(companion.id);
            const editedCompanion = editedCompanions.find(c => c.id === companion.id);
            // Source records own the level; local edits can only override ownership.
            companion.level = sourceCompanion?.level ?? 1;
            companion.real = sourceCompanion !== undefined;
            // Preserve the existing ownership for unowned companions without changing level state.
            companion.owned = companion.real || (editedCompanion?.owned ?? false);
        });
    }

    getRawKeys(): RawData[] {
        // We have special handling for adding the "ownedCompanions" data in idleonData.tsx, so no need to declare it here.
        return [];
    }
}

export const updateCompanionImpact = (data: Map<string, any>) => {
    const companions = data.get("companions") as Companion[];
    const divinity = data.get("divinity") as Divinity;
    const players = data.get("players") as Player[];
    const alchemy = data.get("alchemy") as Alchemy;
    const arcade = data.get("arcade") as Arcade;
    // Doot
    if (companions.find(c => c.id === 0)?.owned) {

        // If we have Doot, all gods are unlocked.
        divinity.gods.forEach(god => {
            god.unlocked = true;
        })

        // And all players are linked to all gods.
        divinity.playerInfo.forEach(player => {
            // Doot is activated only for characters that are level 2 or above in divinity
            const divLevel = players.find(playerFind => playerFind.playerID == player.playerIndex)?.skills.get(SkillsIndex.Divinity)?.level ?? 0;
            if (divLevel >= 2) {
                player.gods = divinity.gods;
            }
        })
    }

    // Rift Slug
    const slugBonus = getCompanionActiveBonus(companions, 1);
    if (slugBonus > 0) {
        players.forEach(player => {
            // avoid double handling.
            if (player.extraLevelsFromSlug != slugBonus) {
                player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                    .forEach(talent => {
                        talent.level += talent.level > 0 ? slugBonus : 0;
                        talent.maxLevel += slugBonus;
                    });
                player.extraLevelsFromSlug = slugBonus;
            }

        })
    }

    // Sheep
    if (companions.find(c => c.id === 4)?.owned) {
        const allBigBubbles = alchemy.cauldrons.flatMap(c => c.bubbles).filter(bubble => bubble.data.bonusKey.includes("ACTIVE"));
        players.forEach(player => {
            player.activeBubbles = allBigBubbles;
        })
    }

    // Reindeer
    const companion27Bonus = getCompanionActiveBonus(companions, 27);
    arcade.bonuses.forEach(bonus => {
        bonus.companion27Bonus = companion27Bonus;
    });
}
