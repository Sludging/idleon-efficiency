import { Alchemy } from "./alchemy";
import { CompanionBase, initCompanionRepo } from "./data/CompanionRepo";
import { Divinity } from "./divinity";
import { EnemyInfo } from "./enemies";
import { ImageData } from "./imageData";
import { CompanionModel } from "./model/companionModel";
import { Player } from "./player";

export class Companion {
    owned: boolean = false;
    real: boolean = false;
    constructor(public id: number, public data: CompanionModel, public imageData: ImageData) { }

    getBonus = () => {
        return this.data.desc.replace(/{/g, "+");
    }

    static fromBase(data: CompanionBase[]) {
        return data.map(c => {
            const enemy = EnemyInfo.find(enemy => enemy.id == c.data.id);
            const imageData = { location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }

            return new Companion(c.index, c.data, imageData);
        });
    }
}

export default function parseCompanions(ownedCompanions: number[]) {
    const companions = Companion.fromBase(initCompanionRepo());

    const localCompaniosn = localStorage.getItem("companions");
    const editedCompanions: Companion[] = [];
    if (localCompaniosn) {
        editedCompanions.push(...JSON.parse(localCompaniosn) as Companion[]);
    }

    companions.forEach(companion => {
        const editedCompanion = editedCompanions.find(c => c.id === companion.id);
        companion.owned = editedCompanion ? editedCompanion.owned : ownedCompanions.includes(companion.id);
        companion.real = ownedCompanions.includes(companion.id);
    })

    return companions;
}

export const updateCompanionImpact = (data: Map<string, any>) => {
    const companions = data.get("companions") as Companion[];
    const divinity = data.get("divinity") as Divinity;
    const players = data.get("players") as Player[];
    const alchemy = data.get("alchemy") as Alchemy;
    // Doot
    if (companions.find(c => c.id === 0)?.owned) {

        // If we have Doot, all gods are unlocked.
        divinity.gods.forEach(god => {
            god.unlocked = true;
        })

        // And all players are linked to all gods.
        divinity.playerInfo.forEach(player => {
            player.gods = divinity.gods;
        })
    }

    // Rift Slug
    if (companions.find(c => c.id === 1)?.owned) {
        players.forEach(player => {
            player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.level += talent.level > 0 ? 25 : 0;
                    talent.maxLevel += 25;
                });
            player.extraLevelsFromSlug = 25;
        })
    }

    // Sheep
    if (companions.find(c => c.id === 4)?.owned) {
        const allBigBubbles = alchemy.cauldrons.flatMap(c => c.bubbles).filter(bubble => bubble.data.bonusKey.includes("ACTIVE"));
        players.forEach(player => {
            player.activeBubbles = allBigBubbles;
        })
    }
}
