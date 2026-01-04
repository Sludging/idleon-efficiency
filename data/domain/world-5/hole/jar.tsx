import { HoleJarBonusBase, initHoleJarBonusRepo } from "../../data/HoleJarBonusRepo";
import { HoleJarBase, initHoleJarRepo } from "../../data/HoleJarRepo";
import { HoleJarBonusModel } from "../../model/holeJarBonusModel";
import { HoleJarModel } from "../../model/holeJarModel";

export class JarBonus {
    level: number = 0;
    legendTalentBonus: number = 1;

    constructor(public index: number, public data: HoleJarBonusModel) {}

    getBonus(): number {
        return this.level * this.data.bonus * this.legendTalentBonus;
    }
}

export class JarType {
    unlocked: boolean = false;

    constructor(public index: number, public data: HoleJarModel) {}
}

export class Jar {
    jarTypes: JarType[] = [];
    jarBonuses: JarBonus[] = [];

    constructor() {
        const jarTypes = initHoleJarRepo();
        jarTypes.forEach(jar => {
            jarTypes.push(new JarType(jar.index, jar.data));
        });
        const jarBonuses = initHoleJarBonusRepo();
        jarBonuses.forEach(bonus => {
            jarBonuses.push(new JarBonus(bonus.index, bonus.data));
        });
    }

    getBonus(index: number): number {
        const bonus = this.jarBonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return bonus.getBonus();
        }

        return 0;
    }
}