import { Domain, RawData } from './base/domain';
import { Item } from './items'
import { lavaLog } from '../utility';
import { Stamp } from './stamps';
import { PlayerStatues } from './statues';
import { Card } from './cards';
import { Quests } from './quests';
import { Player } from './player';
import { TaskBoard } from './tasks';
import { Achievement } from './achievements';
import { initTalentTreeRepo } from './data/TalentTreeRepo';
import { Slab } from './slab';
import { Constellation } from './constellations';
import { Alchemy } from './alchemy';
import { Sigils } from './sigils';

export class TomeLine {
    // Needs this to be updated
    // To know how, check game code searching for "_customEvent_TomeQTY: function() {"
    // It's where engine.getGameAttribute("DNSM").h.TomeQTY array is populated with each line current value which is then used to calculate each line points
    currentValue: number = 0;
    lineScore: number = 0;

    constructor(public index: number, public title: string, public maxValue: number, public calcMethod: number, public maxPoint: number, public text: string, public description: string) {}

    getLineMultiplyer = (): number => {
        switch(this.calcMethod) {
            case 0:
                if (0 > this.currentValue) {
                    return 0;
                } else {
                    return Math.pow(1.7 * this.currentValue / (this.currentValue + this.maxValue), .7) ;
                }
            case 1:
                return 2.4 * lavaLog(this.currentValue) / (2 * lavaLog(this.currentValue) + this.maxValue);
            case 2:
                return Math.min(1, this.currentValue / this.maxValue);
            case 3:
                if (this.currentValue > 5 * this.maxValue) {
                    return 0;
                } else {
                    return Math.pow(1.2 * (6 * this.maxValue - this.currentValue) / (7 * this.maxValue - this.currentValue), 5);
                }
            default:
                return 0;
        }
    }

    getLineScore = (): number => {
        return Math.ceil(this.getLineMultiplyer() * this.maxPoint);
    }

    updateLineScore = () => {
        this.lineScore = this.getLineScore();
    }
}

export class Tome extends Domain {
    lines: TomeLine[] = [];
    totalScore: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "OptLacc", perPlayer: false, default: [] }
        ]
    }

    // n._customBlock_Summoning = function(d, b, e) :

    // "TomeBonus" == d :
    // return null == m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo ? 0 : 0 == b ? 10 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 100), .7) : 1 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[196] ? 4 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 4E3) / 100), .7) : 0 : 2 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[197] ? 2 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 8E3) / 100), .7) : 0 : 3 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W8 : 4 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A9 : 5 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M9 : 6 == b ? 1 == n._customBlock_Summoning("EventShopOwned", 0, 0) ? 4 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 1E3), .4) : 0 : 0;

    // "TomeLvReq" == d :
    // return 500 + (50 * b + (10 * Math.max(0, b - 30) + 10 * Math.max(0, b - 50)));

    // "isTomeUnlocked" == d :
    // return c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[83]) >= n._customBlock_Summoning("TomeLvReq", a.engine.getGameAttribute("CustomLists").h.NinjaInfo[32].indexOf("" + b), 0) ? 1 : 0;

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const tome = data.get(this.dataKey) as Tome;

        var index: number = 0;
        
        tome.lines = [];
        TomeLinesInfo.forEach(lineInfo => {
            const title: string = lineInfo[0]?.replace('_(Tap_for_more_info)', '').replace('_膛', '').replaceAll('_', ' ') ?? ""; // The in-game displayed title of each line
            const maxValue: number = parseInt(lineInfo[1], 10); // The maximum value possible or ceiling value to get maximum points
            const calcMethod: number = parseInt(lineInfo[2], 10); // Index of method used to calculate the score of the line, for now either 0, 1, 2 or 3
            const maxPoints: number = parseInt(lineInfo[3], 10); // Max possible points to get from the line
            const text: string = ((lineInfo[4] ?? "") == "filler") ? "" : (lineInfo[4] ?? ""); // Don't know what it's used for
            const description: string = ((lineInfo[5] ?? "") == "filler") ? "" : (lineInfo[5] ?? "").replaceAll('_', ' '); // Text that is displayed in-game when clicking on the info icon

            tome.lines.push(new TomeLine(index,title,maxValue,calcMethod,maxPoints,text,description));
            index++;
        });
    }

    updateTotalScore = () => {
        this.totalScore = this.lines.reduce((sum, line) => sum+line.lineScore, 0);
    }
}

export const updateTomeScores = (data: Map<string, any>) => {
    const tome = data.get("tome") as Tome;
    const stamps = data.get("stamps") as Stamp[][];
    const statues = data.get("statues") as PlayerStatues[];
    const cards = data.get("cards") as Card[];
    const players = data.get("players") as Player[];
    const questsData = data.get("quests") as Quests;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const achievements = data.get("achievements") as Achievement[];
    const optionListAccount = data.get("OptLacc") as number[];
    const constellations = data.get("constellations") as Constellation[];
    const alchemy = data.get("alchemy") as Alchemy;
    const sigils = data.get("sigils") as Sigils;

    // Calculate how many trophy and obols have been found
    const slab = data.get("slab") as Slab;
    var trophyCount: number = 0;
    var obolCount: number = 0;
    slab.obtainableItems.forEach((item) => {
        if (item.obtained) {
            if (item.internalName.indexOf("Trophy") == 0) {
                trophyCount++;
            } else if (item.internalName.indexOf("Obol") == 0) {
                obolCount++;
            }
        }
    });

    tome.lines.forEach(line => {
        switch(line.index) {
            case 0:
                // Total Level of all stamps
                line.currentValue = stamps.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.level, 0);
                break;
            case 1:
                // Sum of statues levels
                var statueLevels: number[] = [];
                statues.forEach(playerStatue => {
                    statueLevels.push(playerStatue.statues.reduce((sum, statue) => sum+statue.level,0));
                })
                // Get the highest sum of statues for a single char in case the account don't have all statues golden
                line.currentValue = Math.max(...statueLevels);
                break;
            case 2:
                // Sum of cards levels
                line.currentValue = cards.reduce((sum, card) => sum+(card.count > 0 ? card.getStars()+1 : 0), 0);
                break;
            case 3:
                // Sum of highest level of each talent (if multiple classes share a same talent, can be counted only once)
                // Needs to be fixed, not getting the good value even if starting to get close
                var talentsTotalMaxLevel: number = 0;
                const allTalents = initTalentTreeRepo();
                allTalents.flatMap(page => page).filter(page => !page.id.startsWith("Special Talent ")).forEach(page => {
                    Object.entries(page.data.talents).forEach(([_, info], index) => {
                        talentsTotalMaxLevel += Math.max(...players.map((player, index) => (![149, 374, 539, 505].includes(info.skillIndex) && info.skillIndex <= 614 && !(49 <= info.skillIndex && 59 >= info.skillIndex)) ? Math.max(100, player.getTalentMaxLevel(info.skillIndex) - player.extraLevelsFromBear - player.extraLevelsFromTalent - player.extraLevelsFromES - player.extraLevelsFromAchievements - player.extraLevelsFromSlug - player.extraLevelsFromEquinox) : player.getTalentMaxLevel(info.skillIndex)));
                    });                    
                });
                line.currentValue = talentsTotalMaxLevel;
                break;
            case 4:
                // Number of quests completed (by account, not by player)
                const badNPCNames = [
                    "Secretkeeper",
                    "Game Message",
                    "Unmade Character",
                    "FillerNPC"
                ]
                // remove NPCs that should be ignored
                var filteredNPCs = Object.entries(questsData?.npcData ?? {}).filter(([name, info]) => !badNPCNames.includes(name) && Object.entries(info.data.quests).length > 0);
                var completedQuests: number = 0;
                const playerQuestData = questsData?.playerData ?? {};
                filteredNPCs.forEach(([_, npc], npcIndex) => {
                    Object.entries(npc.data.quests).forEach(([_, info], index) => {
                        if (Object.entries(playerQuestData).some(playerData => playerData[1][info.QuestName.replace(/ /g, "_")] == 1)) {
                            completedQuests++;
                        }
                    });
                });
                line.currentValue = completedQuests;
                break;
            case 5:
                // Sum of players levels
                line.currentValue = players.reduce((sum, player) => sum+player.level,0);
                break;
            case 6:
                // Number of tasks completed (except dailies)
                line.currentValue = taskBoard.tasks.reduce((sum, task) => sum+(task.isDaily() ? 0 : task.level),0);
                break;
            case 7:
                // Number of achievements completed
                line.currentValue = achievements.filter(achievement => achievement.completed).length;
                break;
            case 8:
                // Most money held in Storage
                line.currentValue = optionListAccount[198];
                break;
            case 9:
                // Most Spore caps held in Storage
                line.currentValue = optionListAccount[208];
                break;
            case 10:
                // Number of different trophies found
                line.currentValue = trophyCount;
                break;
            case 11:
                // Sum of all skills lmevels of all players
                line.currentValue = players.reduce((sum, player) => {
                    var skillTotalLv: number = 0;
                    player.skills.forEach((skill) => {
                        skillTotalLv += skill.level;
                    });
                    return sum+skillTotalLv;
                },0);
                break;
            case 12:
                // Best spike trap round reached
                line.currentValue = optionListAccount[201];
                break;
            case 13:
                // Total afk hours claimed
                line.currentValue = taskBoard.tasks.find(task => task.index == 2)?.count ?? 0;
                break;
            case 14:
                // DPS record on Shimmer Island on dummy in W2
                line.currentValue = optionListAccount[172];
                break;
            case 15:
                // TODO
                // Sum of star talent points owned
                // Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[0]) + k._customBlock_GetTalentNumber(1, 8) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[5]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h["64"]) + (k._customBlock_GetTalentNumber(1, 622) + (k._customBlock_StampBonusOfTypeX("TalentS") + (k._customBlock_GetTalentNumber(1, 17) + (Math.floor(q._customBlock_GuildBonuses(11)) + (q._customBlock_FlurboShop(1) + (Math.min(5 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "w4b2"), 50) + (Math.min(15 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss2C"), 100) + Math.min(4 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "fallEvent1"), 100)) + (q._customBlock_Labb("SigilBonus", "Blank", 9, 0) + (10 * q._customBlock_AchieveStatus(212) + (20 * q._customBlock_AchieveStatus(289) + (20 * q._customBlock_AchieveStatus(305) + (q._customBlock_Breeding("ShinyBonusS", "Nah", 14, -1) + (r._customBlock_GetBribeBonus("32") + 100 * n._customBlock_RandomEvent("FractalIslandBonus", 5, 999))))))))))))))) - c.asNumber(d[5]))
                line.currentValue = 0;
                break;
            case 16:
                // Lowest average kill for crystal spawn
                line.currentValue = 1 / optionListAccount[202];
                break;
            case 17:
                // TODO
                // Dungeon rank
                // m.__cast(a.engine.getGameAttribute("PixelHelperActor")[9].behaviors.getBehavior("ActorEvents_498"), da)._GenINFO[12];
                line.currentValue = 0;
                break;
            case 18:
                // Highest drop multi
                line.currentValue = optionListAccount[200];
                break;
            case 19:
                // Number of constellations completed
                line.currentValue = constellations.reduce((sum, constellation) => sum+(constellation.isComplete ? 1 : 0),0);
                break;
            case 20:
                // Highest damage dealt to gravestone (weekly battle in W2 town)
                line.currentValue = optionListAccount[203];
                break;
            case 21:
                // Number of different Obols found
                line.currentValue = obolCount;
                break;
            case 22:
                // Sum of all alchemy bubbles levels
                var totalBubblesLevel = 0;
                alchemy.cauldrons.forEach(cauldron => {
                    totalBubblesLevel += cauldron.bubbles.reduce((sum, bubble) => sum+bubble.level,0);
                });
                line.currentValue = totalBubblesLevel;
                break;
            case 23:
                // Sum of all vials levels
                line.currentValue = alchemy.vials.reduce((sum, vial) => sum+vial.level,0);
                break;
            case 24:
                // Sum of sigils level in alchemy
                line.currentValue = sigils.sigils.reduce((sum, sigil) => sum+(sigil.boostLevel+1),0);
                break;
            case 25:
                // Number of times Jackpot is hit in arcade
                line.currentValue = optionListAccount[199];
                break;
            case 26:
                // TODO
                // Number of office box earned
                line.currentValue = 0;
                break;
            case 27:
                // Highest Killroy score on a Warrior
                line.currentValue = optionListAccount[204];
                break;
            case 28:
                // Highest Killroy score on an Archer
                line.currentValue = optionListAccount[205];
                break;
            case 29:
                // Highest Killroy score on a Mage
                line.currentValue = optionListAccount[206];
                break;
            case 30:
                // Fastest time to kill Efaunt
                line.currentValue = 1E3 - optionListAccount[207];
                break;
            case 31:
                // Largest Oak Log sample
                line.currentValue = optionListAccount[211];
                break;
            case 32:
                // Largest Copper Ore sample
                line.currentValue = optionListAccount[212];
                break;
            case 33:
                // Largest Spore Cap sample
                line.currentValue = optionListAccount[213];
                break;
            case 34:
                // Largest Goldfish sample
                line.currentValue = optionListAccount[214];
                break;
            case 35:
                // Largest Fly sample
                line.currentValue = optionListAccount[215];
                break;
            case 36:
                // Best non duplicate Goblin Gorefest wave (worship)
                line.currentValue = optionListAccount[209];
                break;
            case 37:
                // TODO
                // Sum of best waves for worship
                line.currentValue = 0;
                break;
            case 38:
                // TODO
                // Total digits of all Deathnote kills
                line.currentValue = 0;
                break;
            case 39:
                // TODO
                // Number of equinox cloud completed
                line.currentValue = 0;
                break;
            case 40:
                // TODO
                // Sum of Refinery rank
                line.currentValue = 0;
                break;
            case 41:
                // TODO
                // Sum of Atom upgrade levels
                line.currentValue = 0;
                break;
            case 42:
                // TODO
                // Sum of construction levels
                line.currentValue = 0;
                break;
            case 43:
                // TODO
                // Most Tottoise in storage
                line.currentValue = 0;
                break;
            case 44:
                // Most Greenstacks in storage
                line.currentValue = optionListAccount[224];
                break;
            case 45:
                // TODO
                // Number of Rift levels completed
                line.currentValue = 0;
                break;
            case 46:
                // TODO
                // Highest pet power
                line.currentValue = 0;
                break;
            case 47:
                // Fastest time to reach Round 100 in Arena
                line.currentValue = 1E3 - optionListAccount[220];
                break;
            case 48:
                // TODO
                // Sum of all kitchen levels
                line.currentValue = 0;
                break;
            case 49:
                // TODO
                // Sum of all shiny pets levels
                line.currentValue = 0;
                break;
            case 50:
                // TODO
                // Sum of all meals levels
                line.currentValue = 0;
                break;
            case 51:
                // TODO
                // Sum of all pet breedability levels
                line.currentValue = 0;
                break;
            case 52:
                // TODO
                // Number of lab chips owned
                line.currentValue = 0;
                break;
            case 53:
                // TODO
                // Total colosseum score
                line.currentValue = 0;
                break;
            case 54:
                // Most Giants killed in a single week
                line.currentValue = optionListAccount[217];
                break;
            case 55:
                // TODO
                // Number of Onyx statues
                line.currentValue = 0;
                break;
            case 56:
                // Fastest time to kill 200 Tremor wurms
                line.currentValue = 1E3 - optionListAccount[218];
                break;
            case 57:
                // TODO
                // Sum of all sailing boats levels
                line.currentValue = 0;
                break;
            case 58:
                // TODO
                // God ranks in divinity
                line.currentValue = 0;
                break;
            case 59:
                // TODO
                // Total gaming plants evolved
                line.currentValue = 0;
                break;
            case 60:
                // TODO
                // Number of artifacts found
                line.currentValue = 0;
                break;
            case 61:
                // TODO
                // Sailing gold bars owned
                line.currentValue = 0;
                break;
            case 62:
                // TODO
                // Highest sailing capitain level
                line.currentValue = 0;
                break;
            case 63:
                // TODO
                // Highest immortal snail level
                line.currentValue = 0;
                break;
            case 64:
                // TODO
                // Best gold nugget
                line.currentValue = 0;
                break;
            case 65:
                // TODO
                // Number of items found
                line.currentValue = 0;
                break;
            case 66:
                // TODO
                // Most gaming bits owned
                line.currentValue = 0;
                break;
            case 67:
                // Highest Crop OG
                line.currentValue = Math.pow(2, optionListAccount[219]);
                break;
            case 68:
                // TODO
                // Number of crops discovered
                line.currentValue = 0;
                break;
            case 69:
                // TODO
                // Number of golden food goldstack
                line.currentValue = 0;
                break;
            case 70:
                // TODO
                // Sum of all summoning upgrade levels
                line.currentValue = 0;
                break;
            case 71:
                // TODO
                // Number of summoning wins
                line.currentValue = 0;
                break;
            case 72:
                // TODO
                // Number of ninja floors unlocked
                line.currentValue = 0;
                break;
            case 73:
                // TODO
                // Familiars owned in Summoning
                line.currentValue = 0;
                break;
            case 74:
                // TODO
                // Number of Jade Emporium upgrades bought
                line.currentValue = 0;
                break;
            case 75:
                // TODO
                // Sum of all highest minigame highscore
                line.currentValue = 0;
                break;
            case 76:
                // TODO
                // Sum of all prayer upgrade levels
                line.currentValue = 0;
                break;
            case 77:
                // TODO
                // Sum of all plot land rank levels
                line.currentValue = 0;
                break;
            case 78:
                // Largest Magic Bean trade
                line.currentValue = optionListAccount[221];
                break;
            case 79:
                // Most balls earned from LBoFaF (bonus balls from arcade)
                line.currentValue = optionListAccount[222];
                break;
            case 80:
                // TODO
                // Sum of all Gold Ball shop upgrades levels
                line.currentValue = 0;
                break;
            default:
                line.currentValue = 0;
                break;
        }

        line.updateLineScore();
    });

    tome.updateTotalScore();
}

// Data from engine.gameAttributes.h.CustomLists.h.Tome, might need to update them from time to time
const TomeLinesInfo = [
    [
        "Stamp_Total_LV",
        "10000",
        "0",
        "800",
        "filler",
        "filler"
    ],
    [
        "Statue_Total_LV",
        "2300",
        "0",
        "350",
        "filler",
        "filler"
    ],
    [
        "Cards_Total_LV",
        "1344",
        "2",
        "350",
        "filler",
        "filler"
    ],
    [
        "Total_Talent_Max_LV_膛_(Tap_for_more_info)",
        "12000",
        "0",
        "400",
        "filler",
        "For_each_talent,_the_tome_counts_the_highest_Max_LV_out_of_all_your_players."
    ],
    [
        "Unique_Quests_Completed_膛",
        "323",
        "2",
        "300",
        "filler",
        "Doing_the_same_quest_on_multiple_players_doesn't_count_for_this."
    ],
    [
        "Account_LV",
        "5500",
        "0",
        "900",
        "filler",
        "filler"
    ],
    [
        "Total_Tasks_Completed",
        "470",
        "2",
        "470",
        "filler",
        "filler"
    ],
    [
        "Total_Achievements_Completed",
        "266",
        "2",
        "750",
        "filler",
        "filler"
    ],
    [
        "Most_Money_held_in_Storage",
        "25",
        "1",
        "300",
        "filler",
        "filler"
    ],
    [
        "Most_Spore_Caps_held_in_Inventory_at_once",
        "9",
        "1",
        "200",
        "filler",
        "filler"
    ],
    [
        "Trophies_Found",
        "21",
        "2",
        "660",
        "filler",
        "filler"
    ],
    [
        "Account_Skills_LV",
        "15000",
        "0",
        "750",
        "filler",
        "filler"
    ],
    [
        "Best_Spiketrap_Surprise_round",
        "13",
        "2",
        "100",
        "filler",
        "filler"
    ],
    [
        "Total_AFK_Hours_claimed",
        "2000000",
        "0",
        "350",
        "filler",
        "filler"
    ],
    [
        "DPS_Record_on_Shimmer_Island",
        "20",
        "1",
        "350",
        "filler",
        "filler"
    ],
    [
        "Star_Talent_Points_Owned",
        "2500",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Average_kills_for_a_Crystal_Spawn_膛",
        "30",
        "3",
        "350",
        "filler",
        "In_other_words,_the_chance_for_a_crystal_mob_spawn_on_kill,_so_1_in_N."
    ],
    [
        "Dungeon_Rank",
        "30",
        "0",
        "250",
        "filler",
        "filler"
    ],
    [
        "Highest_Drop_Rarity_Multi",
        "40",
        "0",
        "350",
        "1",
        "filler"
    ],
    [
        "Constellations_Completed",
        "49",
        "2",
        "300",
        "filler",
        "filler"
    ],
    [
        "Most_DMG_Dealt_to_Gravestone_in_a_Weekly_Battle_膛",
        "300000",
        "0",
        "200",
        "filler",
        "Gravestone_appears_when_you_defeat_all_weekly_bosses._This_is_the_negative_number_shown_after."
    ],
    [
        "Unique_Obols_Found",
        "107",
        "2",
        "250",
        "filler",
        "filler"
    ],
    [
        "Total_Bubble_LV",
        "200000",
        "0",
        "1000",
        "filler",
        "filler"
    ],
    [
        "Total_Vial_LV",
        "962",
        "2",
        "500",
        "filler",
        "filler"
    ],
    [
        "Total_Sigil_LV",
        "72",
        "2",
        "250",
        "filler",
        "filler"
    ],
    [
        "Jackpots_Hit_in_Arcade",
        "1",
        "0",
        "50",
        "filler",
        "filler"
    ],
    [
        "Post_Office_PO_Boxes_Earned",
        "20000",
        "0",
        "300",
        "filler",
        "filler"
    ],
    [
        "Highest_Killroy_Score_on_a_Warrior",
        "3000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Highest_Killroy_Score_on_an_Archer",
        "3000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Highest_Killroy_Score_on_a_Mage",
        "3000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Fastest_Time_to_kill_Chaotic_Efaunt_(in_Seconds)",
        "10",
        "3",
        "200",
        "filler",
        "filler"
    ],
    [
        "Largest_Oak_Log_Printer_Sample",
        "9",
        "1",
        "400",
        "filler",
        "filler"
    ],
    [
        "Largest_Copper_Ore_Printer_Sample",
        "9",
        "1",
        "400",
        "filler",
        "filler"
    ],
    [
        "Largest_Spore_Cap_Printer_Sample",
        "9",
        "1",
        "300",
        "filler",
        "filler"
    ],
    [
        "Largest_Goldfish_Printer_Sample",
        "9",
        "1",
        "300",
        "filler",
        "filler"
    ],
    [
        "Largest_Fly_Printer_Sample",
        "9",
        "1",
        "300",
        "filler",
        "filler"
    ],
    [
        "Best_Non_Duplicate_Goblin_Gorefest_Wave_膛",
        "120",
        "0",
        "200",
        "filler",
        "Non_Duplicate_means_you_can_only_place_1_of_each_Wizard_Type,_2_or_more_invalidates_the_attempt."
    ],
    [
        "Total_Best_Wave_in_Worship",
        "1000",
        "0",
        "300",
        "filler",
        "filler"
    ],
    [
        "Total_Digits_of_all_Deathnote_Kills_膛",
        "700",
        "0",
        "600",
        "filler",
        "For_example,_1,520_kills_would_be_4_digits,_and_this_is_for_all_monster_types."
    ],
    [
        "Equinox_Clouds_Completed",
        "31",
        "2",
        "750",
        "filler",
        "filler"
    ],
    [
        "Total_Refinery_Rank",
        "120",
        "0",
        "450",
        "filler",
        "filler"
    ],
    [
        "Total_Atom_Upgrade_LV",
        "150",
        "0",
        "400",
        "filler",
        "filler"
    ],
    [
        "Total_Construct_Buildings_LV",
        "3000",
        "0",
        "600",
        "filler",
        "filler"
    ],
    [
        "Most_Tottoise_in_Storage_膛",
        "7",
        "1",
        "150",
        "filler",
        "Tottoise_is_the_11th_Shiny_Critter_unlocked_from_the_Jade_Emporium_in_World_6"
    ],
    [
        "Most_Greenstacks_in_Storage_膛",
        "150",
        "0",
        "600",
        "filler",
        "Greenstack_is_when_you_have_10,000,000_or_more_of_a_single_item_in_your_Storage_Chest."
    ],
    [
        "Rift_Levels_Completed",
        "49",
        "2",
        "500",
        "filler",
        "filler"
    ],
    [
        "Highest_Power_Pet",
        "8",
        "1",
        "150",
        "filler",
        "filler"
    ],
    [
        "Fastest_Time_reaching_Round_100_Arena_(in_Seconds)",
        "50",
        "3",
        "180",
        "filler",
        "filler"
    ],
    [
        "Total_Kitchen_Upgrade_LV",
        "8000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Shiny_Pet_LV",
        "750",
        "0",
        "250",
        "filler",
        "filler"
    ],
    [
        "Total_Cooking_Meals_LV",
        "5400",
        "0",
        "750",
        "filler",
        "filler"
    ],
    [
        "Total_Pet_Breedability_LV",
        "500",
        "2",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Lab_Chips_Owned",
        "100",
        "0",
        "150",
        "filler",
        "filler"
    ],
    [
        "Total_Colosseum_Score",
        "10",
        "1",
        "200",
        "filler",
        "filler"
    ],
    [
        "Most_Giants_Killed_in_a_Single_Week",
        "25",
        "0",
        "250",
        "filler",
        "filler"
    ],
    [
        "Total_Onyx_Statues",
        "28",
        "2",
        "450",
        "filler",
        "filler"
    ],
    [
        "Fastest_Time_to_Kill_200_Tremor_Wurms_(in_Seconds)",
        "30",
        "3",
        "150",
        "filler",
        "filler"
    ],
    [
        "Total_Boat_Upgrade_LV",
        "10000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "God_Rank_in_Divinity",
        "10",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Gaming_Plants_Evolved",
        "100000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Artifacts_Found_膛",
        "132",
        "2",
        "800",
        "filler",
        "Rarer_versions_of_an_artifact_count_for_more,_so_Ancient_would_count_as_2_Artifacts."
    ],
    [
        "Gold_Bar_Sailing_Treasure_Owned",
        "14",
        "1",
        "200",
        "filler",
        "filler"
    ],
    [
        "Highest_Captain_LV",
        "25",
        "0",
        "150",
        "filler",
        "filler"
    ],
    [
        "Highest_Immortal_Snail_LV",
        "25",
        "2",
        "150",
        "filler",
        "filler"
    ],
    [
        "Best_Gold_Nugget",
        "9",
        "1",
        "200",
        "filler",
        "filler"
    ],
    [
        "Items_Found",
        "1590",
        "2",
        "1000",
        "filler",
        "filler"
    ],
    [
        "Most_Gaming_Bits_Owned",
        "45",
        "1",
        "250",
        "filler",
        "filler"
    ],
    [
        "Highest_Crop_OG",
        "6",
        "1",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Crops_Discovered",
        "120",
        "2",
        "350",
        "filler",
        "filler"
    ],
    [
        "Total_Golden_Food_Beanstacks_膛",
        "28",
        "2",
        "400",
        "filler",
        "Supersized_Gold_Food_Beanstacks_count_as_2_Beanstacks."
    ],
    [
        "Total_Summoning_Upgrades_LV",
        "10000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Career_Summoning_Wins_膛",
        "160",
        "0",
        "500",
        "filler",
        "Rack_up_those_wins!_Endless_Summoning_wins_count_for_this_too,_of_course!"
    ],
    [
        "Ninja_Floors_Unlocked",
        "12",
        "2",
        "250",
        "filler",
        "filler"
    ],
    [
        "Familiars_Owned_in_Summoning_膛",
        "600",
        "0",
        "150",
        "filler",
        "Measured_in_terms_of_Grey_Slime,_so_a_Vrumbi_would_count_as_3,_Bloomy_as_12,_and_so_on."
    ],
    [
        "Jade_Emporium_Upgrades_Purchased",
        "38",
        "2",
        "500",
        "filler",
        "filler"
    ],
    [
        "Total_Minigame_Highscore_膛",
        "450",
        "2",
        "100",
        "filler",
        "This_is_Choppin_game,_Mining_Cart_game,_Fishing_game,_Catching_Hoops_game,_and_Trapping_game"
    ],
    [
        "Total_Prayer_Upgrade_LV",
        "673",
        "2",
        "200",
        "filler",
        "filler"
    ],
    [
        "Total_Land_Rank_膛",
        "5000",
        "0",
        "200",
        "filler",
        "Land_Ranks_are_from_the_Farming_skill,_in_World_6._Unlocked_from_the_Night_Market!"
    ],
    [
        "Largest_Magic_Bean_Trade",
        "1000",
        "0",
        "200",
        "filler",
        "filler"
    ],
    [
        "Most_Balls_earned_from_LBoFaF_膛",
        "1000",
        "0",
        "150",
        "filler",
        "LBoFaF_means_Lava's_Ballpit_of_Fire_and_Fury,_the_bonus_round_in_Arcade"
    ],
    [
        "Total_Arcade_Gold_Ball_Shop_Upgrade_LV",
        "3800",
        "2",
        "300",
        "filler",
        "filler"
    ]
]