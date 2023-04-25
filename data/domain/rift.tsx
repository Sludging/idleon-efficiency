import { Breeding } from "./breeding";

export class RiftBonus {
    active: boolean = false;
    constructor(public name: string, public unlockAt: number, public description: string) {}

    getBonus = () => {
        return 0;
    }
}

export class InfiniteStarsBonus extends RiftBonus {
    shinyBonus: number = 0;

    override getBonus = () => {
        return 5 + this.shinyBonus;
    }
}

export class Rift {
    level: number = 0;
    taskProgress: number = 0;

    bonuses: RiftBonus[] = [];
}

export default function parseRift(riftData: number[]) {
    const rift = new Rift();

    rift.level = riftData[0];
    rift.taskProgress = riftData[1];

    rift.bonuses.push(new RiftBonus("Trap Box Vacuum", 6, "The trapper drone in World 3 will automatically collect traps every 24 hours, and will deposit the critters into your Storage Chest if there is space. @ The EXP from the Traps goes to the one who placed the traps."))
    rift.bonuses.push(new InfiniteStarsBonus("Infinite Stars", 11, "Permanently transforms Star Signs into Infinite Star Signs, which always give their bonus AND don't give the negatives. Infinite Star Signs are indicated by a little infinity icon, and are transformed in a specific order, so you don't get to choose. Get more from Shiny Pets in Breeding..."))
    rift.bonuses.push(new RiftBonus("Skill Mastery", 16, "Lava didn't bother with a description for this one. Get bonuses based on total level of your skills across all characters."))
    rift.bonuses.push(new RiftBonus("Eclipse Skulls", 21, "You can now get Eclipse Skulls in Deathnote, unlocked at 1,000,000,000 kills. Eclipse Skulls are worth 20 points, and you also get +5% Multiplicative Damage."))
    rift.bonuses.push(new RiftBonus("Stamp Mastery", 26, "Every 100 total levels of all your stamps, you get a 1% chance to get a 'Gilded Stamp' 95% Reduction in Stamp Upgrade costs. This chance happens every day you log in, and they stack for whenever you want to use them!"))
    rift.bonuses.push(new RiftBonus("Eldritch Artifact", 31, "You can now get Eldritch Artifacts from sailing, but only if you've found the Ancient form first."))
    rift.bonuses.push(new RiftBonus("Vial Mastery", 36, "Each Gold Crown Vial you have, which is the 13th and final vial you upgrade to for 1 Billion Resource, now gives you a 1.02x boost to ALL Vial Bonuses!"))

    rift.bonuses.forEach(bonus => {
        bonus.active = rift.level >= bonus.unlockAt;
    })

    return rift;
}