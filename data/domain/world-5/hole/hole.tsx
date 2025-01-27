import { Domain, RawData } from "../../base/domain";
import { CosmoUpgradeBase, initCosmoUpgradeRepo } from "../../data/CosmoUpgradeRepo";
import { initLampWishRepo, LampWishBase } from "../../data/LampWishRepo";
import { Item } from "../../items";
import { CosmoUpgradeModel } from "../../model/cosmoUpgradeModel";
import { LampWishModel } from "../../model/lampWishModel";
import { Villagers } from "./villager";
import { CosmoTypeEnum } from "../../enum/cosmoTypeEnum";
import { HoleBuildingBase, initHoleBuildingRepo } from "../../data/HoleBuildingRepo";
import { HoleBuildingModel } from "../../model/holeBuildingModel";

export class Villager {
    level: number = 0;
    currentExp: number = 0;
    opals: number = 0;
    gemshopUpgrade: boolean = false;
    constructor(public index: number, public name: string, public title: string) { }
}

export class Wish {
    wishCount: number = 0;

    constructor(public index: number, public data: LampWishModel) { }

    static fromBase(data: LampWishBase[]) {
        return data.map(d => new Wish(d.index, d.data));
    }
}

export class CosmoUpgrade {
    level: number = 0;

    constructor(public index: number, public data: CosmoUpgradeModel) { }

    static fromBase(data: CosmoUpgradeBase[]) {
        return data.map(d => {
            // Special handling for Pocket Divinity upgrade
            if (d.data.name === "Pocket_Divinity") {
                return new PocketDivinityUpgrade(d.index, d.data);
            }
            return new CosmoUpgrade(d.index, d.data);
        });
    }
}


export class PocketDivinityUpgrade extends CosmoUpgrade {
    linkedGods: number[] = [];

    constructor(public index: number, public data: CosmoUpgradeModel) {
        super(index, data);
    }
}

export class Majiks {
    HoleUpgrades: CosmoUpgrade[] = [];
    VillageUpgrades: CosmoUpgrade[] = [];
    IdleonUpgrades: CosmoUpgrade[] = [];

    constructor() { 
        const allUpgrades = CosmoUpgrade.fromBase(initCosmoUpgradeRepo());
        this.HoleUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Hole);
        this.VillageUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Village);
        this.IdleonUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Idleon);
    }
}

export class Schematic {
    unlocked: boolean = false;

    constructor(public index: number, public data: HoleBuildingModel) { }

    static fromBase(data: HoleBuildingBase[]) {
        return data.map(d => new Schematic(d.index, d.data));
    }
}

export class Hole extends Domain {
    // Raw
    playerLocationData: number[] = []

    // Processed
    villagers: Villager[] = Villagers.getVillagers();
    wishes: Wish[] = Wish.fromBase(initLampWishRepo());
    majiks = new Majiks();
    schematics: Schematic[] = Schematic.fromBase(initHoleBuildingRepo());
    // TODO: 
    // Well
    // Caverns
    // Engineer - DONE?
    // Bravery
    // Bell
    // Wishes - DONE?
    // Harp?
    // Measurement?

    getRawKeys(): RawData[] {
        return [
            { key: "Holes", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const hole = data.get(this.getDataKey()) as Hole;
        const holeData = data.get("Holes") as number[][];

        // Old accounts won't have data, so exit early.
        if (!holeData || holeData.length == 0) {
            return;
        }

        hole.playerLocationData = holeData[0];
        hole.villagers.forEach(villager => {
            villager.level = holeData[1][villager.index];
            villager.currentExp = holeData[2][villager.index];
            villager.opals = holeData[3][villager.index];
            villager.gemshopUpgrade = holeData[23][villager.index] == 1;
        });

        // Parse cosmo upgrades based on their type
        hole.majiks.HoleUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[4][index];
        });

        hole.majiks.VillageUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[5][index];
        }); 

        hole.majiks.IdleonUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[6][index];

            if (upgrade.data.name == "Pocket_Divinity") {
                const pocketUpgrade = upgrade as PocketDivinityUpgrade;
                if (pocketUpgrade.level >= 1) {
                    pocketUpgrade.linkedGods.push(holeData[11][29]);
                }
                if (pocketUpgrade.level == 2) {
                    pocketUpgrade.linkedGods.push(holeData[11][30]);
                }
            }
        });

        hole.wishes.forEach(wish => {
            wish.wishCount = holeData[21][wish.index];
        });

        hole.schematics.forEach(schematic => {
            schematic.unlocked = holeData[13][schematic.index] == 1;
        });
    }
}

export const updateHole = (data: Map<string, any>) => {
}


// 0	Cavern number each character is currently in	All of the Caverns are within a single Map. This subnumber is used to track which Cavern their AFK time should apply to. In this example, CavernIndex of -1 means Camp. CavernIndex of 0 means The Well, etc. 	List of ints	12	[3,8,8,3,8,8,3,3,8,9,-1,-1	[3,-1,3,3,3,3,3,3,3,3,-1,-1],			
// 1	Villager levels	"The completed levels of the Villagers, with placeholders for future Villagers. The order matches the UI for the first 4 villagers at least.
// 0 = Explorer, 1 = Engineer, 2 = Bonuses, 3 = Measure"	List of ints	8	[10,17,17,9,0,0,0,0	[5,5,2,0,0,0,0,0],			
// 2	Villagers current exp	Each level starts from 0. Levels are NOT redeemed until you visit Camp and open the Campfire menu. This has potential for a dashboard alert, current exp >= required exp. Values are floats but may eventually turn into strings if large enough.	List of floats, maybe strings	8	[2225588.2996061645,47114766.27550666,3267048.2266837177,39232233.31780148,0,0,0,0,0,0,0,0	"[34684.61688211596,
// 33983.523391658644,
// 246.07954861113993,
// 0,0,0,0,0,0,0,0,0]"			
// 3	Opals invested per Villager	Same order as above, but weirdly this is 12 long instead of 8?	List of ints	12	[1,8,40,80,0,0,0,0,0,0,0,0	[12,10,1,0,0,0,0,0,0,0,0,0],			
// 4	Hole Majiks		List of ints	9	[4,5,3,0,0,0,0,0,0	[1,0,0,0,0,0,0,0,0],			
// 5	Village Majiks	Total levels, including Enhancements	List of ints	12	[5,4,1,4,0,0,0,0,0,0,0,0	[5,4,1,0,0,0,0,0,0,0,0,0],			
// 6	IdleOn Majiks		List of ints	12	[1,1,1,0,0,0,0,0,0,0,0,0	[0,0,0,0,0,0,0,0,0,0,0,0],			
// 7	Opals found per cavern	No placeholder for camp	List of ints	30	[12,21,12,8,19,5,3,18,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	[4,5,10,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 8	Well Bar expansions	"Number of times each sediment bar has been expanded
// 14 = max width on the screen"	List of ints	10	[48,47,43,36,29,24,16,12,8,5	[8,8,5,0,0,0,0,0,0,0],			
// 9	Well Sediment owned	Positive = owned, negative = locked / rock layer	List of ints and floats	9	[16869814234.047375,11258225901.222668,19279089806.195732,1500914595.8708072,3463180631.2884607,2340218817.137407,1865184294.8938458,9465508536.724354,4944961417.633785,5428214084.536194,86898274396.69736,1034411498317.0394,60012137960.20055,1034649865950.0394,18864892308.489395,1410554820218.0398,123522752026.00372,255710655971.1084,1701590889829.1335,1035313547608.0394	"[329.5831455332012,
// 680.8759802643383,
// 852.4456753647637,
// -9000,
// -125000,
// -1500000,
// -20000000,
// -100000000,
// -500000000,
// -2000000000],"			
// 10	Well Bucket Targets	"Might be a combined use list. First ~10 should be Well Bucket targets
// 0 = not collecting, 1 = gravel, 2 = goldust, etc."	List of ints	60	[0,1,2,3,4,5,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	[3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 11	Well's Opal cost, Motherlode's OreREQ and Efficiency	"0 = ores mined on current Motherlode layer
// 1 = ore layers destroyed
// 2, 3 for bugs
// 4, 5 for logs
// 6, 7 for fish
// 8 = ???
// 9 = used in calc for WellOpal_cost formula, but it is just the number of completed opal trades duplicated from Holes[7][0]"			[6328,21,156,18,0,0,0,0,831307.1845561796,12,1,65783.85399961287,1044908.6029952243,0,0,0,0,0,1000,1,9,7,721.0392389281558,1,4,5,11,774499993.2464428,2435153672.9658065,3,0,1,11029503043,277,442,424,419,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	[4602464437,5,0,0,0,0,0,0,282490.9266846729,4,1,15793.200000008595,0,0,0,0,0,0,1000,1,0,0,0,0,0,7,0,0,0,0,0,0,4661798426,277,442,424,419,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 12	Dawg Den Amplifier levels	These can be reset any time of course, but this tracks current levels	List of ints	8	[100,60,7,100,30,0,0,0	[69,0,0,0,0,0,0,0],			
// 13	Engineer Schematics	0 = unpurchased, 1 = purchased			[1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	[1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 14	Bravery Monument	"0 = Bravery Hours, 1 = Bravery layers broken
// I assume this will repeat, 2 indexes per future Monument
// 12/2 = probably 6 monuments"	List of ints	12	[2224,5,0,0,0,0,0,0,0,0,0,0	"[90,2,
// 0,0,
// 0,0,
// 0,0,
// 0,0,
// 0,0],"			
// 15	Bravery Bonuses / Rewards	"Like the above, I assume this huge list will contain future Monument upgrades too.
// 60/6 = 10 upgrades per Monument"	List of ints	60	[426,159,12,642,105,120,11,84,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	"[0,5,0,5,0,0,0,0,0,0,
// 0,0,0,0,0,0,0,0,0,0,
// 0,0,0,0,0,0,0,0,0,0,
// 0,0,0,0,0,0,0,0,0,0,
// 0,0,0,0,0,0,0,0,0,0,
// 0,0,0,0,0,0,0,0,0,0],"			
// 16	Bell Improvement Methods	These are unlocked by Cleaning the Bell	List of ints	12	[186,174,277,192,143,0,0,0,0,0,0,0	[173,0,0,0,0,0,0,0,0,0,0,0],			
// 17	Bell Ring levels	"First 4 are Bell Upgrades from Ringing
// 0 = Bucket Rate, 1 = Villager EXP,
// 2 =  Harp Notes, 3 = Daily Lamp Wishes"	List of ints	12	[96,114,116,76,0,0,0,0,0,0,0,0	[0,1,0,1,0,0,0,0,0,0,0,0],			
// 18	Bell charges	"0 = Ring Charge, 1 = Ring Uses
// 2 = Ping Charge, 3 = Ping Uses 
// 4 = Clean Charge, 5 = Clean Uses
// 6 = Renew Charge, 7 = Renew Uses"	List of ints and floats		[2422265.7800254133,218,61152156.407799155,19,20321.91255491933,5,134.88639999504113,1	[1.6094111111109624,2,35.0450000000012,1,0.005,0,0.006111111111111111,0],			
// 19			List of ints		[94,33202180.450669177,90,16467382.601412607,89,13106125.654141566,90,11910340.52459144,88,14278822.883559888,92,432625.51712662727,0,0,0,0,0,0,0,0	[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 20			List of ints		[1,3,4,4,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 21	Wishes Used	Numbers of times each wish has been used. This value can essentially be used as a level, but is used in the code to track the cost of the next Wish	List of ints		[4,2,3,0,1,0,0,0,0,0,0,0,0,0,0	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 22	Measurement buff levels	Levels from resources invested into Measurements	List of ints		[136,166,132,157,150,122,148,106,153,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],			
// 23	Parallel Villagers in Gem Shop	Tracks which Villager was purchased in Gem Shop for Parallel Villagers	List of ints		[1,1,1,1,0,0,0,0]	[1,1,1,1,0,0,0,0],			