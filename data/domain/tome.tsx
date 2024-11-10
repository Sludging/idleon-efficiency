import { Domain, RawData } from './base/domain';
import { initSlabItemSortRepo } from './data/SlabItemSortRepo';
import { Item } from './items'
import { Lab, SlabSovereigntyBonus } from './lab';
import { Sailing } from './sailing';
import { SlabInfluencedArtifact } from './sailing/artifacts';
import { Sneaking } from './world-6/sneaking';
import { ImageData } from "./imageData";

export class TomeLine {
    constructor(public index: number, public title: string, public maxValue: number, public calcMethod: number, public maxPoint: number, public text: string, public description: string) {}
}

export class Tome extends Domain {
    lines: TomeLine[] = [];

    getRawKeys(): RawData[] {
        return [
            {key: "Cards1", perPlayer: false, default: []}
        ]
    }

    // n._customBlock_Summoning = function(d, b, e) :

    // "TomeBonus" == d :
    // return null == m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo ? 0 : 0 == b ? 10 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 100), .7) : 1 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[196] ? 4 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 4E3) / 100), .7) : 0 : 2 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[197] ? 2 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 8E3) / 100), .7) : 0 : 3 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W8 : 4 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A9 : 5 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M9 : 6 == b ? 1 == n._customBlock_Summoning("EventShopOwned", 0, 0) ? 4 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 1E3), .4) : 0 : 0;

    // "TomeLvReq" == d :
    // return 500 + (50 * b + (10 * Math.max(0, b - 30) + 10 * Math.max(0, b - 50)));

    // "isTomeUnlocked" == d :
    // return c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[83]) >= n._customBlock_Summoning("TomeLvReq", a.engine.getGameAttribute("CustomLists").h.NinjaInfo[32].indexOf("" + b), 0) ? 1 : 0;

    // "TomePCT" == d :
    // return g = a.engine.getGameAttribute("DNSM"),
    // Object.prototype.hasOwnProperty.call(g.h, "TomeQTY") ? 0 == n._customBlock_Summoning("isTomeUnlocked", b, 0) ? 0 : 0 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? 0 > c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) ? 0 : Math.pow(1.7 * c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])), .7) : 1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? 2.4 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) / (2 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])) : 2 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? Math.min(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) / c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])) : 3 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) > 5 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) ? 0 : Math.pow(1.2 * (6 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) - c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) / (7 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) - c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])), 5) : 0 : 0;

    // "TomePTS" == d :
    // return Math.ceil(n._customBlock_Summoning("TomePCT", b, 0) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][3]));

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const tome = data.get(this.dataKey) as Tome;

        // Data from engine.gameAttributes.h.CustomLists.h.Tome, might need to update them from time to time
        tome.lines.push(new TomeLine(0,"Stamp Total LV",10000,0,800,"",""));
        tome.lines.push(new TomeLine(1,"Statue Total LV",2300,0,350,"",""));
        tome.lines.push(new TomeLine(2,"Cards Total LV",1344,2,350,"",""));
        tome.lines.push(new TomeLine(3,"Total Talent Max LV",12000,0,400,"","For each talent, the tome counts the highest Max LV out of all your players."));
        tome.lines.push(new TomeLine(4,"Unique Quests Completed",323,2,300,"","Doing the same quest on multiple players doesn't count for this."));
        tome.lines.push(new TomeLine(5,"Account LV",5500,0,900,"",""));
        tome.lines.push(new TomeLine(6,"Total Tasks Completed",470,2,470,"",""));
        tome.lines.push(new TomeLine(7,"Total Achievements Completed",266,2,750,"",""));
        tome.lines.push(new TomeLine(8,"Most Money held in Storage",25,1,300,"",""));
        tome.lines.push(new TomeLine(9,"Most Spore Caps held in Inventory at once",9,1,200,"",""));
        tome.lines.push(new TomeLine(10,"Trophies Found",21,2,660,"",""));
        tome.lines.push(new TomeLine(11,"Account Skills LV",15000,0,750,"",""));
        tome.lines.push(new TomeLine(12,"Best Spiketrap Surprise round",13,2,100,"",""));
        tome.lines.push(new TomeLine(13,"Total AFK Hours claimed",2000000,0,350,"",""));
        tome.lines.push(new TomeLine(14,"DPS Record on Shimmer Island",20,1,350,"",""));
        tome.lines.push(new TomeLine(15,"Star Talent Points Owned",2500,0,200,"",""));
        tome.lines.push(new TomeLine(16,"Average kills for a Crystal Spawn",30,3,350,"","In other words, the chance for a crystal mob spawn on kill, so 1 in N."));
        tome.lines.push(new TomeLine(17,"Dungeon Rank",30,0,250,"",""));
        tome.lines.push(new TomeLine(18,"Highest Drop Rarity Multi",40,0,350,"1",""));
        tome.lines.push(new TomeLine(19,"Constellations Completed",49,2,300,"",""));
        tome.lines.push(new TomeLine(20,"Most DMG Dealt to Gravestone in a Weekly Battle",300000,0,200,"","Gravestone appears when you defeat all weekly bosses. This is the negative number shown after."));
        tome.lines.push(new TomeLine(21,"Unique Obols Found",107,2,250,"",""));
        tome.lines.push(new TomeLine(22,"Total Bubble LV",200000,0,1000,"",""));
        tome.lines.push(new TomeLine(23,"Total Vial LV",962,2,500,"",""));
        tome.lines.push(new TomeLine(24,"Total Sigil LV",72,2,250,"",""));
        tome.lines.push(new TomeLine(25,"Jackpots Hit in Arcade",1,0,50,"",""));
        tome.lines.push(new TomeLine(26,"Post Office PO Boxes Earned",20000,0,300,"",""));
        tome.lines.push(new TomeLine(27,"Highest Killroy Score on a Warrior",3000,0,200,"",""));
        tome.lines.push(new TomeLine(28,"Highest Killroy Score on an Archer",3000,0,200,"",""));
        tome.lines.push(new TomeLine(29,"Highest Killroy Score on a Mage",3000,0,200,"",""));
        tome.lines.push(new TomeLine(30,"Fastest Time to kill Chaotic Efaunt (in Seconds)",10,3,200,"",""));
        tome.lines.push(new TomeLine(31,"Largest Oak Log Printer Sample",9,1,400,"",""));
        tome.lines.push(new TomeLine(32,"Largest Copper Ore Printer Sample",9,1,400,"",""));
        tome.lines.push(new TomeLine(33,"Largest Spore Cap Printer Sample",9,1,300,"",""));
        tome.lines.push(new TomeLine(34,"Largest Goldfish Printer Sample",9,1,300,"",""));
        tome.lines.push(new TomeLine(35,"Largest Fly Printer Sample",9,1,300,"",""));
        tome.lines.push(new TomeLine(36,"Best Non Duplicate Goblin Gorefest Wave",120,0,200,"","Non Duplicate means you can only place 1 of each Wizard Type, 2 or more invalidates the attempt."));
        tome.lines.push(new TomeLine(37,"Total Best Wave in Worship",1000,0,300,"",""));
        tome.lines.push(new TomeLine(38,"Total Digits of all Deathnote Kills",700,0,600,"","For example, 1,520 kills would be 4 digits, and this is for all monster types."));
        tome.lines.push(new TomeLine(39,"Equinox Clouds Completed",31,2,750,"",""));
        tome.lines.push(new TomeLine(40,"Total Refinery Rank",120,0,450,"",""));
        tome.lines.push(new TomeLine(41,"Total Atom Upgrade LV",150,0,400,"",""));
        tome.lines.push(new TomeLine(42,"Total Construct Buildings LV",3000,0,600,"",""));
        tome.lines.push(new TomeLine(43,"Most Tottoise in Storage",7,1,150,"","Tottoise is the 11th Shiny Critter unlocked from the Jade Emporium in World 6"));
        tome.lines.push(new TomeLine(44,"Most Greenstacks in Storage",150,0,600,"","Greenstack is when you have 10,000,000 or more of a single item in your Storage Chest."));
        tome.lines.push(new TomeLine(45,"Rift Levels Completed",49,2,500,"",""));
        tome.lines.push(new TomeLine(46,"Highest Power Pet",8,1,150,"",""));
        tome.lines.push(new TomeLine(47,"Fastest Time reaching Round 100 Arena (in Seconds)",50,3,180,"",""));
        tome.lines.push(new TomeLine(48,"Total Kitchen Upgrade LV",8000,0,200,"",""));
        tome.lines.push(new TomeLine(49,"Total Shiny Pet LV",750,0,250,"",""));
        tome.lines.push(new TomeLine(50,"Total Cooking Meals LV",5400,0,750,"",""));
        tome.lines.push(new TomeLine(51,"Total Pet Breedability LV",500,2,200,"",""));
        tome.lines.push(new TomeLine(52,"Total Lab Chips Owned",100,0,150,"",""));
        tome.lines.push(new TomeLine(53,"Total Colosseum Score",10,1,200,"",""));
        tome.lines.push(new TomeLine(54,"Most Giants Killed in a Single Week",25,0,250,"",""));
        tome.lines.push(new TomeLine(55,"Total Onyx Statues",28,2,450,"",""));
        tome.lines.push(new TomeLine(56,"Fastest Time to Kill 200 Tremor Wurms (in Seconds)",30,3,150,"",""));
        tome.lines.push(new TomeLine(57,"Total Boat Upgrade LV",10000,0,200,"",""));
        tome.lines.push(new TomeLine(58,"God Rank in Divinity",10,0,200,"",""));
        tome.lines.push(new TomeLine(59,"Total Gaming Plants Evolved",100000,0,200,"",""));
        tome.lines.push(new TomeLine(60,"Total Artifacts Found",132,2,800,"","Rarer versions of an artifact count for more, so Ancient would count as 2 Artifacts."));
        tome.lines.push(new TomeLine(61,"Gold Bar Sailing Treasure Owned",14,1,200,"",""));
        tome.lines.push(new TomeLine(62,"Highest Captain LV",25,0,150,"",""));
        tome.lines.push(new TomeLine(63,"Highest Immortal Snail LV",25,2,150,"",""));
        tome.lines.push(new TomeLine(64,"Best Gold Nugget",9,1,200,"",""));
        tome.lines.push(new TomeLine(65,"Items Found",1590,2,1000,"",""));
        tome.lines.push(new TomeLine(66,"Most Gaming Bits Owned",45,1,250,"",""));
        tome.lines.push(new TomeLine(67,"Highest Crop OG",6,1,200,"",""));
        tome.lines.push(new TomeLine(68,"Total Crops Discovered",120,2,350,"",""));
        tome.lines.push(new TomeLine(69,"Total Golden Food Beanstacks",28,2,400,"","Supersized Gold Food Beanstacks count as 2 Beanstacks."));
        tome.lines.push(new TomeLine(70,"Total Summoning Upgrades LV",10000,0,200,"",""));
        tome.lines.push(new TomeLine(71,"Best Endless Summoning Round",100,0,200,"","No, this isn't out yet. It's on the Weekly Update Roadmap though!"));
        tome.lines.push(new TomeLine(72,"Ninja Floors Unlocked",12,2,250,"",""));
        tome.lines.push(new TomeLine(73,"Familiars Owned in Summoning",600,0,150,"","Measured in terms of Grey Slime, so a Vrumbi would count as 3, Bloomy as 12, and so on."));
        tome.lines.push(new TomeLine(74,"Jade Emporium Upgrades Purchased",38,2,500,"",""));
        tome.lines.push(new TomeLine(75,"Total Minigame Highscore",450,2,100,"","This is Choppin game, Mining Cart game, Fishing game, Catching Hoops game, and Trapping game"));
        tome.lines.push(new TomeLine(76,"Total Prayer Upgrade LV",673,2,200,"",""));
        tome.lines.push(new TomeLine(77,"Total Land Rank",5000,0,200,"","Land Ranks are from the Farming skill, in World 6. Unlocked from the Night Market!"));
        tome.lines.push(new TomeLine(78,"Largest Magic Bean Trade",1000,0,200,"",""));
        tome.lines.push(new TomeLine(79,"Most Balls earned from LBoFaF",1000,0,150,"","LBoFaF means Lava's Ballpit of Fire and Fury, the bonus round in Arcade"));
        tome.lines.push(new TomeLine(80,"Total Arcade Gold Ball Shop Upgrade LV",3800,2,300,"",""));
    }
}