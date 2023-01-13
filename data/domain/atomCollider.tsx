import { Cooking } from './cooking';
import { Construction } from './construction';
import { AtomColliderBase, initAtomColliderRepo } from './data/AtomColliderRepo';
import { AtomColliderModel } from './model/atomColliderModel';

export class Atom {
    level: number = 0;
    constructor(public index: number, public data: AtomColliderModel) { }

    getBonus = (): number => {
        return this.level * this.data.bonusPerLv;
    }

    static fromBase = (data: AtomColliderBase[]) => {
        return data.map(atom => {
            switch(atom.index) {   
                case 0: return new HydrogenAtom(atom.index, atom.data);
                case 5: return new CarbonAtom(atom.index, atom.data);
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
        return Math.min(90, this.level * this.data.bonusPerLv * this.daysSinceUpgrade);
    }
}

export class CarbonAtom extends Atom {
    wizardTowersOver50: number = 0;
    override getBonus = (): number => {
        return 2 * this.wizardTowersOver50;
    }

    getExtraLevels = (): number => {
        return 2 * this.level;
    }
}

export class FluorideAtom extends Atom {
    voidMeals: number = 0;
    override getBonus = (): number => {
        return Math.pow(1 + (this.level * this.data.bonusPerLv) / 100, this.voidMeals);
    }
}

export class AtomCollider {
    particles: number = 0;
    atoms: Atom[] = Atom.fromBase(initAtomColliderRepo())
    
}

export default function parseAtomCollider(atomsData: number[], divinityData: number[]) {
    const collider = new AtomCollider();

    collider.atoms.forEach(atom => {
        atom.level = atomsData[atom.index]
    });

    collider.particles = divinityData[39];

    return collider;
}

export function updateAtomCollider(data: Map<string, any>) {
    const collider = data.get("collider");
    const optLacc = data.get("OptLacc");
    const cooking = data.get("cooking") as Cooking;
    const construction = data.get("construction") as Construction;

    (collider.atoms[0] as HydrogenAtom).daysSinceUpgrade = optLacc[134];
    (collider.atoms[5] as CarbonAtom).wizardTowersOver50 = construction.buildings.slice(9, 18).reduce((sum, tower) => sum += Math.max(0, tower.level - 50), 0);
    (collider.atoms[8] as FluorideAtom).voidMeals = cooking.meals.reduce((count, meal) => count += meal.level >= 30 ? 1 : 0, 0);

    return collider;
}