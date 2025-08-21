export enum VillagerIndex {
    Polonai = 0,
    Kaipu = 1,
    Cosmo = 2,
    Minau = 3,
    Bolai = 4
}

const villagerMetadata = {
    [VillagerIndex.Polonai]: {
        name: "Polonai",
        title: "Explorer of the Hole",
    },
    [VillagerIndex.Kaipu]: {
        name: "Kaipu",
        title: "Engineer of Schematics",
    },
    [VillagerIndex.Cosmo]: {
        name: "Cosmo",
        title: "Conjuror of bonuses",
    },  
    [VillagerIndex.Minau]: {
        name: "Minau",
        title: "Taker of Measurements",
    },
    [VillagerIndex.Bolai]: {
        name: "Bolai",
        title: "Student of Cavern Lore",
    },
}

export class Villager {
    level: number = 0;
    currentExp: number = 0;
    opals: number = 0;
    gemshopUpgrade: boolean = false;
    constructor(public index: number, public name: string, public title: string) { }
}

/* class Polonai extends Villager {
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
        super(VillagerIndex.Minau, "Minau", "Taker of Measurements");
    }
} */

export class Villagers {
    static getVillagers(): Villager[] {
        return Object.entries(villagerMetadata).map(([index, metadata]) => {
            return new Villager(Number(index), metadata.name, metadata.title);
        });
    }
}
