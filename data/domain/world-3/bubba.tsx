import { lavaLog, lavaLog2, range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { BubbaUpgradeBase, initBubbaUpgradeRepo } from "../data/BubbaUpgradeRepo";
import { Item } from "../items";
import { BubbaUpgradeModel } from "../model/bubbaUpgradeModel";
import { BubbaCharismaBonusBase, initBubbaCharismaBonusRepo } from "../data/BubbaCharismaBonusRepo";
import { BubbaCharismaBonusModel } from "../model/bubbaCharismaBonusModel";
import { BubbaGiftModel } from "../model/bubbaGiftModel";
import { BubbaGiftBase, initBubbaGiftRepo } from "../data/BubbaGiftRepo";
import { BubbaMegafleshBase, initBubbaMegafleshRepo } from "../data/BubbaMegafleshRepo";
import { Companion } from "../companions";

const SmokedMeatValues = [ 2, 3, 4, 6, 10 ];

export class BubbaGlobalBonus {
    constructor(public index: number, public desc: string, public value: number) {}

    static fromBase() {
        return [
            new BubbaGlobalBonus(0, "{/minute", 1),
            new BubbaGlobalBonus(1, "+{% Build Rate", 10),
            new BubbaGlobalBonus(2, "+{% Critter Gain", 5),
            new BubbaGlobalBonus(3, "+{% Soul Gain", 5),
            new BubbaGlobalBonus(4, "+{% Total DMG", 15),
            new BubbaGlobalBonus(5, "+{% All Kills", 1),
            new BubbaGlobalBonus(6, "{% XP Multi", 4),
            new BubbaGlobalBonus(7, "-{% Atom Cost", 3),
        ];
    }
}

export class BubbaGift {
    constructor(public index: number, public data: BubbaGiftModel) {}

    static fromBase(data: BubbaGiftBase[]) {
        return data.map(d => new BubbaGift(d.index, d.data));
    }
}

export class BubbaCharismaBonus {
    level: number = 0;

    constructor(public index: number, public data: BubbaCharismaBonusModel) {}

    static fromBase(data: BubbaCharismaBonusBase[]) {
        return data.map(d => new BubbaCharismaBonus(d.index, d.data));
    }    
}

export class BubbaUpgrade {
    unlocked: boolean = false;
    level1: number = 0;
    level2: number = 0;

    constructor(public index: number, public data: BubbaUpgradeModel) {}

    static fromBase(data : BubbaUpgradeBase[]) {
        return data.map(d => new BubbaUpgrade(d.index, d.data));
    }

    getMeatProductionRequired(): number {
        if (this.index == 0) {
            return 0;
        }

        return 50 * Math.pow(2.8 + this.index / 3.55, this.index - Math.min(1, Math.floor(this.index / 4)));
    }

    getRealLevel(): number {
        return this.level1 + this.level2;
    }

    getBonus(): number {
        return this.getRealLevel() * this.data.bonus;
    }
}

export class Bubba extends Domain {
    unlocked: boolean = false;
    happiness: number = 0;
    
    upgrades: BubbaUpgrade[] = [];
    charismaBonuses: BubbaCharismaBonus[] = [];
    emulsifiedCharisma: number = 0; // this is the charisma index + 1, so 0 means nothing selected
    gifts: BubbaGift[] = BubbaGift.fromBase(initBubbaGiftRepo());
    megaflesh: BubbaMegafleshBase[] = initBubbaMegafleshRepo();
    bonuses: BubbaGlobalBonus[] = BubbaGlobalBonus.fromBase();
    equipedGift1: number = 0; // this is the gift index + 1, so 0 means nothing equiped
    equipedGift2: number = 0; // this is the gift index + 1, so 0 means nothing equiped

    dices: number[] = [];
    smokedMeat: number[] = [];

    spareCoins: number[] = [0, 0, 0, 0];

    ownedFlesh: number = 0;
    totalProducedFlesh: number = 0;

    ownedMegaflesh: number = 0;

    // Not sure what it is, but is used for calculations
    someValue: number = 0;

    companionBonus51: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Bubba", perPlayer: false, default: 0 },
            { key: "KLA_", perPlayer: true, default: [] }
        ]
    }

    init(_allItems: Item[]) {
        this.upgrades = BubbaUpgrade.fromBase(initBubbaUpgradeRepo());
        this.charismaBonuses = BubbaCharismaBonus.fromBase(initBubbaCharismaBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const bubba = data.get(this.getDataKey()) as Bubba;
        const bubbaData = data.get("Bubba") as number[][];
        const charCount = data.get("charCount") as number;
        const optionList = data.get("OptLacc") as number[];
        const klaData = range(0, charCount).map((_, i) => { return data.get(`KLA_${i}`) }) as number[][][];

        bubba.unlocked = klaData.some((playerKillData) => 0 >= (playerKillData[50][0] || 1));
        bubba.ownedFlesh = bubbaData[0][0] || 0;
        bubba.happiness = bubbaData[0][1] || 0;
        bubba.equipedGift1 = bubbaData[0][2] || 0;
        bubba.equipedGift2 = bubbaData[0][3] || 0;
        bubba.totalProducedFlesh = bubbaData[0][4] || 0;

        bubba.spareCoins[0] = bubbaData[0][9];
        bubba.spareCoins[1] = bubbaData[0][10];
        bubba.spareCoins[2] = bubbaData[0][11];
        bubba.spareCoins[3] = bubbaData[0][12];

        bubba.emulsifiedCharisma = bubbaData[0][15] || 0;
        bubba.charismaBonuses.forEach(bonus => {
            bonus.level = bubbaData[3][bonus.index] || 0;
        });

        bubba.dices = bubbaData[4] || [];
        bubba.smokedMeat = bubbaData[5] || [];

        bubba.upgrades.forEach(upgrade => {
            upgrade.unlocked = upgrade.getMeatProductionRequired() <= bubba.totalProducedFlesh;
            upgrade.level1 = bubbaData[1][upgrade.index] || 0;
            upgrade.level2 = bubbaData[2][upgrade.index] || 0;
        });

        bubba.someValue = optionList[267];

        bubba.ownedMegaflesh = bubba.getUpgradeBonus(8);
    }

    getHappinessRank(): number {
        return Math.min(4, lavaLog(Math.pow(Math.max(1, this.happiness / 30 + 1), 1.5)));
    }

    getHappinessBonus(happiness: number = this.happiness): number {
        return 1 + 10 * (lavaLog2(happiness) + 25 * lavaLog(happiness) + Math.pow(happiness, .75)) / 100;
    }

    getHappinessForRank(rank: number): number {
        const power = rank / 1.5;
        const baseTenResult = Math.pow(10, power);
        const happiness = 30 * (baseTenResult - 1);
        
        return Math.max(0, happiness);
    }

    getMeatSliceRate(happinessRank: number = 0): number {
        const happiness = this.getHappinessForRank(happinessRank);

        return (this.getUpgradeBonus(0) + (this.getUpgradeBonus(7) + this.getUpgradeBonus(23))) *
            (1 + (this.getUpgradeBonus(2) + (this.getUpgradeBonus(11) + (this.getUpgradeBonus(19) + this.getUpgradeBonus(24) * lavaLog(this.someValue)))) / 100) *
            this.getHappinessBonus(happiness) * this.getDicesMulti() * this.getSmokedMeatMulti() * (1 + this.getCharismaBonus(0) / 100) *
            (1 + this.getMegafleshQuantity(0) * this.getTotalUpgradeLevel() / 100) * (1 + this.getGiftPassiveBonus(0) / 100) * this.getSpareCoinsMulti();
    }

    getTotalUpgradeLevel(): number {
        return this.upgrades.reduce((sum, upgrade) => sum += upgrade.getRealLevel(), 0);
    }

    getTotalCharismaLevel(): number {
        return this.charismaBonuses.reduce((sum, bonus) => sum += bonus.level, 0);
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index == index)?.getBonus() || 0;
    }

    getUpgradeCost(index: number): number {
        const upgrade = this.upgrades.find(upgrade => upgrade.index == index);

        if (!upgrade) {
            return 0;
        }

        return 1 / (1 + this.getUpgradeBonus(4) / 100) * (1 / (1 + this.getUpgradeBonus(18) / 100)) * (1 / (1 + this.getUpgradeBonus(26) / 100)) * (1 / (1 + this.getCharismaBonus(1) / 100)) * 
            (Math.pow(upgrade.index + 1, 2) * upgrade.level1 + Math.pow(2.4 + upgrade.index / 3.65, upgrade.index) * Math.pow(upgrade.data.x1, upgrade.level1)) * upgrade.data.x0;
    }

    getCharismaBonus(index: number): number {
        const charismaBonus = this.charismaBonuses.find(bonus => bonus.index == index);

        if (!charismaBonus) return 0;

        const multiplier = (index + 1) == this.emulsifiedCharisma ? 3 : 1;

        return multiplier * charismaBonus.level * charismaBonus.data.value * (1 + this.getUpgradeBonus(13) / 100);
    }

    getDicesMulti(): number {
        let result = 0;

        this.dices.forEach(die => {
            if (die > 0) {
                const weightedValue = Math.min(die, 6) + Math.max(die - 6, 0) / 2.5;

                if (result == 0) {
                    result = weightedValue;
                } else {
                    result *= weightedValue;
                }
            }
        });

        return 1 + result / 100;
    }

    getGiftPassiveBonus(index: number): number {
        const gift = this.gifts.find(gift => gift.index = index);

        if (gift && ((index + 1) == this.equipedGift1 || (index + 1) == this.equipedGift2)) {
            return gift.data.value * Math.min(5, 1 + this.getUpgradeBonus(17) / 100);
        } else {
            return 0;
        }
    }

    getSmokedMeatMulti(): number {
        let totalMultiplier = 1;

        this.smokedMeat.forEach((smokedMeat, index) => {
            const powerPerMeat = SmokedMeatValues[index] || 0;

            if (smokedMeat > 0) {
                totalMultiplier *= (1 + (smokedMeat * powerPerMeat) / 100);
            }
        });

        return totalMultiplier;
    }

    getSpareCoinsMulti(): number {
        return 1 + (this.spareCoins[0] + 5 * this.spareCoins[1] + 25 * this.spareCoins[2] + 100 * this.spareCoins[3]) / 100;
    }

    getGlobalBonusMulti(): number {
        return 20 * this.getMegafleshQuantity(1) + 20 * this.getMegafleshQuantity(3) + 20 * this.getMegafleshQuantity(6) + 20 * this.getMegafleshQuantity(9) + 20 * this.getMegafleshQuantity(11);
    }

    getGlobalBonus(index: number): number {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (!bonus) return 0;

        return Math.max(0, (1 + this.getGlobalBonusMulti() / 100) * (1 + this.companionBonus51) * bonus.value * 
            Math.ceil((this.getUpgradeBonus(3) - (index - 1)) / 7));
    }

    getMegafleshQuantity(index: number): number {
        const megafleshUpgrade = this.getUpgradeBonus(8);

        return megafleshUpgrade > index ? 11 == index ? megafleshUpgrade - 11 : 1 : 0
    }
}

export const updateBubba = (data: Map<string, any>) => {
    const bubba = data.get("bubba") as Bubba;
    const companions = data.get("companions") as Companion[];

    bubba.companionBonus51 = companions.find(companion => companion.id == 51)?.owned || false ? companions.find(companion => companion.id == 51)?.data.bonus || 0 : 0;

    return bubba;
}