// Randolist[13]
const buildMultiplier = "15 200 2250 12000 25000 60000 500000 3000000 15000000 25 700 4500 20000 40000 125000 1250000 500000 35000000 60 1250 6000 27500 70000 200000 2000000 7000000 60000000".split(" ");

interface BuildingInfo {
    description: string
    bonus: string
    lvlUpReq: { item: string, quantity: number}[]
    maxLvl: number
    costIncrement: number[]
    bonusInc: number
    misc: number
    name: string
    index: number
}

export class Building {
    description: string
    bonus: string
    lvlUpReq: { item: string, quantity: number}[]
    maxLvl: number
    costIncrement: number[]
    bonusInc: number
    misc: number
    name: string
    index: number

    level: number = 0;
    nextLevelUnlocked: boolean = false;
    currentXP: number = 0;

    constructor(data: BuildingInfo) {
        this.description = data.description;
        this.bonus = data.description;
        this.lvlUpReq = data.lvlUpReq;
        this.maxLvl = data.maxLvl;
        this.costIncrement = data.costIncrement;
        this.bonusInc = data.bonusInc;
        this.misc = data.misc;
        this.name = data.name;
        this.index = data.index;
    }

    getClass = () => {
        return `icons-6666 icons-ConTowerB${this.index}`
    }

    getBuildCost = (level: number = this.level) => {
        if (this.index == 0) {
            const math1 = Math.pow(level + 1, 2);
            return 20 * math1 * Math.pow(1.6, level + 1);
        }
        else {
            const multiplier = Number(buildMultiplier[this.index]);
            return multiplier * Math.pow(this.bonusInc, level);
        }
    }

    // Gives NEXT level costs, so if input 0 it will give level 1, etc...
    getLevelCosts = (level: number = this.level, costCruncher: Building): { item: string, quantity: number}[] => {
        const toReturn: { item: string, quantity: number}[] = [];
        this.lvlUpReq.forEach(item => {
            const math1 =  Math.min(0.1, 0.1 * Math.floor((costCruncher.level + 999) / 1000));
            const math2 = Math.max(0, costCruncher.level - 1);
            const costReduction = Math.max(0.2, 1 - (math1 + (math2 * costCruncher.costIncrement[0]) / 100))
            if (item.item.includes("Refinery")) {
                toReturn.push({ 
                    item: item.item,
                    quantity: Math.floor(costReduction * item.quantity * (level + 1))
                });
            }
            else {
                toReturn.push({
                    item: item.item,
                    quantity: Math.floor(costReduction * item.quantity * Math.pow(this.bonusInc + 0.03 - ((this.bonusInc + 0.03 - 1.05) * level) / (this.maxLvl / 2 + level), level))
                })
            }
        });

        return toReturn;
    }

    // if ("TowerBuildReq" == t) {
    //     if (0 == n) {
    //         var ws = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //             Qs = Math.pow(parsenum(ws) + 1, 2),
    //             Xs = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //         return 20 * Qs * Math.pow(1.6, parsenum(Xs) + 1);
    //     }
    //     var zs = b.engine.getGameAttribute("CustomLists"),
    //         Ls = (null != d.RANDOlist ? zs.getReserved("RANDOlist") : zs.h.RANDOlist)[13][0 | n],
    //         Zs = parsenum(Ls),
    //         Ws = b.engine.getGameAttribute("CustomLists"),
    //         Ys = (null != d.TowerInfo ? Ws.getReserved("TowerInfo") : Ws.h.TowerInfo)[0 | n][9],
    //         Hs = parsenum(Ys),
    //         Js = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Zs * Math.pow(Hs, parsenum(Js));
    // }
    // if ("TowerSaltCost" == t) {
    //     var js = b.engine.getGameAttribute("TowerInfo")[5],
    //         qs = Math.min(0.1, 0.1 * Math.floor((parsenum(js) + 999) / 1000)),
    //         Ks = b.engine.getGameAttribute("TowerInfo")[5],
    //         $s = Math.max(0, parsenum(Ks) - 1),
    //         ea = b.engine.getGameAttribute("CustomLists"),
    //         ta = (null != d.TowerInfo ? ea.getReserved("TowerInfo") : ea.h.TowerInfo)[5][2],
    //         na = Math.max(0.2, 1 - (qs + ($s * parsenum(ta)) / 100)),
    //         sa = b.engine.getGameAttribute("CustomLists"),
    //         aa = (null != d.TowerInfo ? sa.getReserved("TowerInfo") : sa.h.TowerInfo)[0 | n][6],
    //         Aa = parsenum(aa),
    //         ra = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Math.floor(na * Aa * (parsenum(ra) + 1));
    // }
    // if ("TowerMatCost" == t) {
    //     var la = b.engine.getGameAttribute("TowerInfo")[5],
    //         ia = Math.min(0.1, 0.1 * Math.floor((parsenum(la) + 999) / 1000)),
    //         oa = b.engine.getGameAttribute("TowerInfo")[5],
    //         ua = Math.max(0, parsenum(oa) - 1),
    //         ga = b.engine.getGameAttribute("CustomLists"),
    //         ma = (null != d.TowerInfo ? ga.getReserved("TowerInfo") : ga.h.TowerInfo)[5][2],
    //         da = Math.max(0.2, 1 - (ia + (ua * parsenum(ma)) / 100)),
    //         ca = b.engine.getGameAttribute("CustomLists"),
    //         pa = (null != d.TowerInfo ? ca.getReserved("TowerInfo") : ca.h.TowerInfo)[0 | n][7],
    //         ha = parsenum(pa),
    //         ba = b.engine.getGameAttribute("CustomLists"),
    //         fa = (null != d.TowerInfo ? ba.getReserved("TowerInfo") : ba.h.TowerInfo)[0 | n][9],
    //         Ra = parsenum(fa),
    //         ya = b.engine.getGameAttribute("CustomLists"),
    //         va = (null != d.TowerInfo ? ya.getReserved("TowerInfo") : ya.h.TowerInfo)[0 | n][9],
    //         Fa = parsenum(va),
    //         Na = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //         Ia = parsenum(Na),
    //         Da = b.engine.getGameAttribute("CustomLists"),
    //         Ua = (null != d.TowerInfo ? Da.getReserved("TowerInfo") : Da.h.TowerInfo)[0 | n][8],
    //         Ea = parsenum(Ua),
    //         Sa = b.engine.getGameAttribute("TowerInfo")[0 | n],
    //         Ta = parsenum(Sa),
    //         _a = b.engine.getGameAttribute("TowerInfo")[0 | n];
    //     return Math.floor(da * ha * Math.pow(Ra + 0.03 - ((Fa + 0.03 - 1.05) * Ia) / (Ea / 2 + Ta), parsenum(_a)));
    // }
    // if ("TowerBuildSlots" == t) {
    //     var Ga = b.engine.getGameAttribute("GemItemsPurchased")[117],
    //         Ma = parsenum(Ga),
    //         Va = b.engine.getGameAttribute("Tasks")[2][2][0];
    //     return Math.round(2 + (Ma + Math.ceil(parsenum(Va) / 2)));
    // }
}

export const initBuildings = (): Building[] => {
    return [
        new Building({"description": "Using the new Star Talent (on the 2nd tab of Star Talents), you can collect samples to start printing resources! ", "bonus": " $ Player Slots Unlocked", "lvlUpReq": [{"item": "Refinery1", "quantity": 3}, {"item": "Blank", "quantity": 0}], "maxLvl": 9, "costIncrement": [1, 30], "bonusInc": 1, "misc": 0, "name": "3D Printer", "index": 0}),
        new Building({"description": "Relive your youth by checking out books, and further relive your youth by never returning them! Instead, use them to boost your talent max levels. ", "bonus": " +{% Checkout Refresh Speed", "lvlUpReq": [{"item": "Refinery1", "quantity": 6}, {"item": "Critter1", "quantity": 100}], "maxLvl": 50, "costIncrement": [5, 30], "bonusInc": 1.34, "misc": 0, "name": "Talent Book Library", "index": 1}),
        new Building({"description": "Defeat TONS of monsters to boost your Multikill Rate for each world. Upgrading this tower also boosts your base Multikill Bonus in all worlds. ", "bonus": " +{% Multikill Bonus", "lvlUpReq": [{"item": "Refinery2", "quantity": 10}, {"item": "Soul1", "quantity": 200}], "maxLvl": 50, "costIncrement": [2, 50], "bonusInc": 1.23, "misc": 0, "name": "Death Note", "index": 2}),
        new Building({"description": "Spend refinery salts and other World 3 Resources in return for bonuses from the hungry blobulytes! ", "bonus": " $ Available Upgrades", "lvlUpReq": [{"item": "Refinery2", "quantity": 20}, {"item": "Critter2", "quantity": 60}], "maxLvl": 10, "costIncrement": [1, 30], "bonusInc": 2, "misc": 0, "name": "Salt Lick", "index": 3}),
        new Building({"description": "Just gives more Storage Chest slots, straight up. Better late than never, eh? (Passive Upgrade) ", "bonus": " +2 Storage Chest Slots @ +{ more Storage Chest Slots", "lvlUpReq": [{"item": "Refinery2", "quantity": 25}, {"item": "OakTree", "quantity": 500}], "maxLvl": 25, "costIncrement": [2, 30], "bonusInc": 1.27, "misc": 0, "name": "Chest Space", "index": 4}),
        new Building({"description": "Reduces the resource costs of upgrading buildings. Doesn't affect 'building' phase cost (Passive Upgrade) ", "bonus": " -10% Resource Cost @ -{% more Resource Cost", "lvlUpReq": [{"item": "Refinery3", "quantity": 20}, {"item": "Bug4", "quantity": 500}], "maxLvl": 60, "costIncrement": [1, 30], "bonusInc": 1.106, "misc": 0, "name": "Cost Cruncher", "index": 5}),
        new Building({"description": "Every day, you can claim a random item from the pile! It could be a ton of different things, even Gems! ", "bonus": " +{% Chance for 2 items instead", "lvlUpReq": [{"item": "Refinery4", "quantity": 30}, {"item": "FillerMaterial", "quantity": 100}], "maxLvl": 100, "costIncrement": [10, 1], "bonusInc": 1.105, "misc": 0, "name": "Junk Pile", "index": 6}),
        new Building({"description": "Every day, you can claim a random candy from the pile! It could even be 72 hour candy! ", "bonus": " +{% Chance for 2 candies instead", "lvlUpReq": [{"item": "Refinery5", "quantity": 20}, {"item": "StumpTree", "quantity": 0}], "maxLvl": 100, "costIncrement": [10, 1], "bonusInc": 1.1, "misc": 0, "name": "Candy Pile", "index": 7}),
        new Building({"description": "Don't worry, by the time you read this I'll probably have already added this building into the game! Actually wait no, I probably won't.", "bonus": "", "lvlUpReq": [{"item": "FillerMaterial", "quantity": 15}, {"item": "Blank", "quantity": 0}], "maxLvl": 1, "costIncrement": [10, 30], "bonusInc": 0, "misc": 0, "name": "Coming Soon", "index": 8}),
        new Building({"description": "Zaps a single nearby monster. @ Has fast speed, and low damage. ", "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery1", "quantity": 2}, {"item": "Blank", "quantity": 0}], "maxLvl": 50, "costIncrement": [15, 1.4], "bonusInc": 1.365, "misc": 0, "name": "Pulse Mage", "index": 9}),
        new Building({"description": "Lobs exploding fireballs. @ Has medium speed, and medium damage. ", "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery1", "quantity": 4}, {"item": "Critter1", "quantity": 50}], "maxLvl": 50, "costIncrement": [20, 1.5], "bonusInc": 1.33, "misc": 0, "name": "Fireball Lobber", "index": 10}),
        new Building({"description": "Rolls a boulder forward. @ Has slow speed, and medium damage, but reliably hits multiple enemies. ", "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery2", "quantity": 4}, {"item": "IronBar", "quantity": 30}], "maxLvl": 50, "costIncrement": [25, 1.6], "bonusInc": 1.276, "misc": 0, "name": "Boulder Roller", "index": 11}),
        new Building({"description": "Casts a wave of freezing snow. @ Has slow speed, but can stack it's effect with other Freeze Towers. ", "bonus": " +{% Range @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery2", "quantity": 7}, {"item": "BirchTree", "quantity": 200}], "maxLvl": 50, "costIncrement": [1.5, 1.6], "bonusInc": 1.246, "misc": 0, "name": "Frozone Malone", "index": 12}),
        new Building({"description": "Smites enemies with lightning @ Has super slow speed, but high damage. ", "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery3", "quantity": 5}, {"item": "Critter3", "quantity": 200}], "maxLvl": 50, "costIncrement": [30, 1.7], "bonusInc": 1.23, "misc": 0, "name": "Stormcaller", "index": 13}),
        new Building({"description": "Confetti! @ Has no function other than its Trait Boosts. ", "bonus": " +{% Range @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery3", "quantity": 9}, {"item": "Bug5", "quantity": 300}], "maxLvl": 50, "costIncrement": [4, 1.7], "bonusInc": 1.222, "misc": 0, "name": "Party Starter", "index": 14}),
        new Building({"description": "Summons eyeball defenders. @ Has slow speed, and just keeps monsters away. ", "bonus": " +{% Spawn Rate @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery4", "quantity": 7}, {"item": "Dementia", "quantity": 200}], "maxLvl": 50, "costIncrement": [3, 1.6], "bonusInc": 1.22, "misc": 0, "name": "Kraken Cosplayer", "index": 15}),
        new Building({"description": "Poisons enemies. @ Has slow speed, and deals big damage over time. ", "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery5", "quantity": 10}, {"item": "FillerMaterial", "quantity": 600}], "maxLvl": 50, "costIncrement": [15, 1.6], "bonusInc": 1.21, "misc": 0, "name": "Poisonic Elder", "index": 16}),
        new Building({"description": "Teleports monsters back to the start, and sets them all to a certain amount of HP. ", "bonus": " +{% Recharge Speed @ +}% Lower Upgrade Costs in Worship", "lvlUpReq": [{"item": "Refinery6", "quantity": 10}, {"item": "SnowC4a", "quantity": 1}], "maxLvl": 50, "costIncrement": [15, 1.6], "bonusInc": 1.19, "misc": 0, "name": "Voidinator", "index": 17}),
        new Building({"description": "This shrine increases the Total Damage of all characters on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery1", "quantity": 2}, {"item": "Blank", "quantity": 0}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.16, "misc": 0, "name": "Woodular Shrine", "index": 18}),
        new Building({"description": "This shrine increases the Max HP and Total Defence of characters on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery1", "quantity": 5}, {"item": "Soul1", "quantity": 30}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.15, "misc": 0, "name": "Isaccian Shrine", "index": 19}),
        new Building({"description": "This shrine increases Shrine Level Up Rate for all other shrines on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery2", "quantity": 4}, {"item": "GoldBar", "quantity": 25}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.13, "misc": 0, "name": "Crystal Shrine", "index": 20}),
        new Building({"description": "This shrine increases the Carry Capacity of all characters on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery2", "quantity": 7}, {"item": "JungleTree", "quantity": 300}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.115, "misc": 0, "name": "Pantheon Shrine", "index": 21}),
        new Building({"description": "This shrine increases the Drop Rate of all characters on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery3", "quantity": 5}, {"item": "Soul3", "quantity": 50}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.11, "misc": 0, "name": "Clover Shrine", "index": 22}),
        new Building({"description": "This shrine increases all EXP gain for all characters on the same map. Level it up by claiming AFK Gains on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery3", "quantity": 10}, {"item": "Bug6", "quantity": 100}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.106, "misc": 0, "name": "Summereading Shrine", "index": 23}),
        new Building({"description": "This shrine increases Crystal and Giant Spawn chance, and Active EXP gain, of all characters on the same map. U know how to lvl it up lol. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery4", "quantity": 12}, {"item": "Void", "quantity": 200}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.106, "misc": 0, "name": "Crescent Shrine", "index": 24}),
        new Building({"description": "This shrine increases the Respawn rate of all monsters on the same map. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery5", "quantity": 14}, {"item": "Tree7", "quantity": 350}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.1, "misc": 0, "name": "Undead Shrine", "index": 25}),
        new Building({"description": "This shrine increases the AFK Gain Rate of all characters on the same map, but only if you have less than 80%. ", "bonus": " +{% Level Up Rate", "lvlUpReq": [{"item": "Refinery6", "quantity": 10}, {"item": "SnowC4a", "quantity": 1}], "maxLvl": 100, "costIncrement": [10, 30], "bonusInc": 1.09, "misc": 0, "name": "Primordial Shrine", "index": 26}),
    ]
}
