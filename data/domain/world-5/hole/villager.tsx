export enum VillagerIndex {
    Polonai = 0,
    Kaipu = 1,
    Cosmo = 2,
    Minau = 3
}

abstract class Villager {
    level: number = 0;
    currentExp: number = 0;
    opals: number = 0;
    gemshopUpgrade: boolean = false;
    constructor(public index: number, public name: string, public title: string) { }
}

class Polonai extends Villager {
    constructor() {
        super(VillagerIndex.Polonai, "Polonai", "Explorer of the Hole");
    }
}

class Kaipu extends Villager {
    constructor() {
        super(VillagerIndex.Kaipu, "Kaipu", "Engineer of Schematics");
    }
}

class Cosmo extends Villager {
    constructor() {
        super(VillagerIndex.Cosmo, "Cosmo", "Conjuror of bonuses");
    }
}

class Minau extends Villager {
    constructor() {
        super(VillagerIndex.Cosmo, "Minau", "Taker of Measurements");
    }
}

export class Villagers {
    static getVillagers(): Villager[] {
        return [
            new Polonai(),
            new Kaipu(),
            new Cosmo(),
            new Minau(),
        ]
    }
}