import { Cooking } from './cooking';
import { Construction } from './construction';
import { AtomColliderBase, initAtomColliderRepo } from './data/AtomColliderRepo';
import { AtomColliderModel } from './model/atomColliderModel';
import { Alchemy } from './alchemy';
import { ImageData } from './imageData';
import { nFormatter, range } from '../utility';
import { TaskBoard } from './tasks';
import { Domain, RawData } from './base/domain';
import { Item } from './items';
import { getStampBonusForKey, Stamp } from './stamps';

export class Atom {
    level: number = 0;

    // Cost math related
    nenoBonus: number = 0;
    colliderBuildingLevel: number = 0;
    bubbleBonus: number = 0; // Y5
    meritBonus: number = 0;

    gamingMaxLevelBoost: number = 0;
    gamingDiscount: number = 0;
    stampDiscount: number = 0;

    constructor(public index: number, public data: AtomColliderModel) { }

    getMaxLevel = () => {
        return 20 + this.gamingMaxLevelBoost;
    }

    getBonus = (): number => {
        return this.level * this.data.bonusPerLv;
    }

    getCost = (level: number = this.level): number => {
        const bonusMath = (1 / (1 + (this.stampDiscount + this.nenoBonus + this.gamingDiscount + this.bubbleBonus + (this.colliderBuildingLevel / 10) + this.meritBonus) / 100));
        const baseMath = this.data.baseCost + (level * this.data.growthFactor);
        const exponentMath = Math.pow(this.data.baseExponent, level);
        return Math.floor(bonusMath * baseMath * exponentMath);
    }

    getCostToUnlock = () => {
        const bonusMath = (1 / (1 + (this.nenoBonus + this.bubbleBonus + (this.colliderBuildingLevel / 10)) / 100));
        return this.data.baseCost * bonusMath;
    }

    getCostToMaxLevel = () => {
        return range(this.level, this.getMaxLevel()).reduce((sum, level) => sum += this.getCost(level), 0);
    }

    getBonusText = () => {
        return this.data.desc.replace(/{/g, (this.level * this.data.bonusPerLv).toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `Atom${this.index}`,
            height: 81,
            width: 100
        }
    }

    static fromBase = (data: AtomColliderBase[]) => {
        return data.map(atom => {
            switch (atom.index) {
                case 0: return new HydrogenAtom(atom.index, atom.data);
                case 5: return new CarbonAtom(atom.index, atom.data);
                case 7: return new OxygenAtom(atom.index, atom.data);
                case 8: return new FluorideAtom(atom.index, atom.data);
                default: return new Atom(atom.index, atom.data)
            }
        });
    }
}

export class HydrogenAtom extends Atom {
    // Stored in OptLacc[134] 
    daysSinceUpgrade: number = 0;
    override getBonus = (): number => {
        if (this.level == 0) {
            return 0;
        }

        return Math.min(90, this.level * this.data.bonusPerLv * this.daysSinceUpgrade);
    }
}

export class CarbonAtom extends Atom {
    wizardTowersOver50: number = 0;
    override getBonus = (): number => {
        if (this.level == 0) {
            return 0;
        }

        return 2 * this.wizardTowersOver50;
    }

    getExtraLevels = (): number => {
        return 2 * this.level;
    }

    override getBonusText = () => {
        return this.data.desc.replace(/{/g, (this.level * this.data.bonusPerLv).toString())
            .replace(/}/, this.getBonus().toString());
    }
}

export class FluorideAtom extends Atom {
    voidMeals: number = 0;
    override getBonus = (): number => {
        if (this.level == 0) {
            return 0;
        }
        return Math.pow(1 + (this.level * this.data.bonusPerLv) / 100, this.voidMeals);
    }

    override getBonusText = () => {
        return this.data.desc.replace(/{/g, (this.level * this.data.bonusPerLv).toString())
            .replace(/>/, nFormatter(Math.max(0, 100 * (this.getBonus() - 1)), "Big"));
    }
}

export class OxygenAtom extends Atom {
    override getBonusText = () => {
        return this.data.desc.replace(/{/g, (this.level * this.data.bonusPerLv).toString())
            .replace(/</, this.level.toString());
    }
}

export class AtomCollider extends Domain {
    particles: number = 0;
    atoms: Atom[] = Atom.fromBase(initAtomColliderRepo())

    static getParticleImageData = (): ImageData => {
        return {
            location: 'Particle',
            height: 29,
            width: 29
        }
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Atoms", perPlayer: false, default: []},
            {key: "Divinity", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const collider = data.get(this.getDataKey()) as AtomCollider;
        const atomsData = data.get("Atoms") as number[] || [];
        const divinityData = data.get("Divinity") as number[] || [];

        collider.atoms.forEach(atom => {
            atom.level = atomsData[atom.index] ?? 0;
        });

        collider.particles = divinityData[39];
    }
}

// Currently all data only requires parsing, can be very high on post processing list.
export function updateAtomCollider(data: Map<string, any>) {
    const collider = data.get("collider") as AtomCollider;
    const optLacc = data.get("OptLacc");
    const cooking = data.get("cooking") as Cooking;
    const construction = data.get("construction") as Construction;
    const alchemy = data.get("alchemy") as Alchemy;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const stamps = data.get("stamps") as Stamp[][];

    (collider.atoms[0] as HydrogenAtom).daysSinceUpgrade = optLacc[134];
    (collider.atoms[5] as CarbonAtom).wizardTowersOver50 = construction.buildings.slice(9, 18).reduce((sum, tower) => sum += Math.max(0, tower.level - 50), 0);
    (collider.atoms[8] as FluorideAtom).voidMeals = cooking.meals.reduce((count, meal) => count += meal.level >= 30 ? 1 : 0, 0);

    const colliderBuildingLevel = construction.buildings.find(building => building.name == "Atom Collider")?.level ?? 0;
    const nenoBonus = collider.atoms[9].getBonus();
    const bubbleBonusY5 = alchemy.getBubbleBonusForKey("Y5");
    // Not using getBonus here since Lava says the bonus is 5 but it's really 7.
    const meritBonus = (taskBoard.merits.find(merit => merit.descLine1.includes("reduction in Atom Upgrade Costs"))?.level ?? 0) * 7;
    const stampBonus = getStampBonusForKey(stamps, "AtomCost");

    collider.atoms.forEach(atom => {
        atom.bubbleBonus = bubbleBonusY5;
        atom.colliderBuildingLevel = colliderBuildingLevel;
        atom.nenoBonus = nenoBonus;
        atom.meritBonus = meritBonus;
        atom.stampDiscount = stampBonus;
    })

    return collider;
}