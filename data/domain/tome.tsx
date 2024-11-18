import { Domain, RawData } from './base/domain';
import { Item } from './items'
import { lavaLog, nFormatter } from '../utility';
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
import { Dungeons } from './dungeons';
import { POExtra } from './postoffice';
import { initTomeRepo } from './data/TomeRepo';
import { TomeModel } from './model/tomeModel';
import { TomeScalingEnum } from './enum/tomeScalingEnum';

export class TomeLine {
    // Needs this to be updated
    // To know how, check game code searching for "_customEvent_TomeQTY: function() {"
    // It's where engine.getGameAttribute("DNSM").h.TomeQTY array is populated with each line current value which is then used to calculate each line points
    private currentValue: number = 0;
    lineScore: number = 0;

    constructor(public index: number, public data: TomeModel) {
        if (data.scalingType == TomeScalingEnum.inverseDecay) {
            // Default value for lines that are supposed to be "the lowest the better"
            this.currentValue = 1000
        }
    }

    getLineMultiplyer = (): number => {
        switch(this.data.scalingType) {
            case TomeScalingEnum.decay:
                if (0 > this.currentValue) {
                    return 0;
                } else {
                    return Math.pow(1.7 * this.currentValue / (this.currentValue + this.data.keyQty), .7) ;
                }
            case TomeScalingEnum.decayLog:
                return 2.4 * lavaLog(this.currentValue) / (2 * lavaLog(this.currentValue) + this.data.keyQty);
            case TomeScalingEnum.linearToMax:
                return Math.min(1, this.currentValue / this.data.keyQty);
            case TomeScalingEnum.inverseDecay:
                if (this.currentValue > 5 * this.data.keyQty) {
                    return 0;
                } else {
                    return Math.pow(1.2 * (6 * this.data.keyQty - this.currentValue) / (7 * this.data.keyQty - this.currentValue), 5);
                }
            default:
                return 0;
        }
    }

    getLineDescription = (): string => {
        return this.data.desc?.replace('(Tap for more info)', '').replace('膛', '').trim() ?? '';
    }

    getLineName = (): string => {
        return this.data.name?.replace('(Tap for more info)', '').replace('膛', '').trim() ?? '';
    }

    getLineScore = (): number => {
        return Math.ceil(this.getLineMultiplyer() * this.data.totalVal);
    }

    getCurrentValueDisplay = (): string => {
        switch(this.index) {
            // Big values
            case 8:
            case 9:
            case 13:
            case 14:
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
            case 46:
            case 61:
                return nFormatter(this.currentValue);
            // Not so big values but with lots of decimals and wanna keep a bit of it
            case 16:
            case 18:
            case 78:
                return (Math.round(100 * this.currentValue) / 100).toString();
            default:
                return this.currentValue.toString();
        }
    }

    updateCurrentValue = (value: number) => {
        if (this.currentValue != value) {
            this.currentValue = value;
            this.updateLineScore();
        }
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
        
        tome.lines = [];
        const tomeLinesBase = initTomeRepo();
        tomeLinesBase.forEach(lineInfo => {
            tome.lines.push(new TomeLine(lineInfo.index,lineInfo.data));
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
    const dungeonsData = data.get("dungeons") as Dungeons;
    const postOfficeData = data.get("POExtra") as POExtra;

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
                line.updateCurrentValue(stamps.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.level, 0));
                break;
            case 1:
                // Sum of statues levels
                var statueLevels: number[] = [];
                statues.forEach(playerStatue => {
                    statueLevels.push(playerStatue.statues.reduce((sum, statue) => sum+statue.level,0));
                })
                // Get the highest sum of statues for a single char in case the account don't have all statues golden
                line.updateCurrentValue(Math.max(...statueLevels));
                break;
            case 2:
                // Sum of cards levels
                line.updateCurrentValue(cards.reduce((sum, card) => sum+(card.count > 0 ? card.getStars()+1 : 0), 0));
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
                line.updateCurrentValue(talentsTotalMaxLevel);
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
                line.updateCurrentValue(completedQuests);
                break;
            case 5:
                // Sum of players levels
                line.updateCurrentValue(players.reduce((sum, player) => sum+player.level,0));
                break;
            case 6:
                // Number of tasks completed (except dailies)
                line.updateCurrentValue(taskBoard.tasks.reduce((sum, task) => sum+(task.isDaily() ? 0 : task.level),0));
                break;
            case 7:
                // Number of achievements completed
                line.updateCurrentValue(achievements.filter(achievement => achievement.completed).length);
                break;
            case 8:
                // Most money held in Storage
                line.updateCurrentValue(optionListAccount[198]);
                break;
            case 9:
                // Most Spore caps held in Storage
                line.updateCurrentValue(optionListAccount[208]);
                break;
            case 10:
                // Number of different trophies found
                line.updateCurrentValue(trophyCount);
                break;
            case 11:
                // Sum of all skills lmevels of all players
                line.updateCurrentValue(players.reduce((sum, player) => {
                    var skillTotalLv: number = 0;
                    player.skills.forEach((skill) => {
                        skillTotalLv += skill.level;
                    });
                    return sum+skillTotalLv;
                },0));
                break;
            case 12:
                // Best spike trap round reached
                line.updateCurrentValue(optionListAccount[201]);
                break;
            case 13:
                // Total afk hours claimed
                line.updateCurrentValue(taskBoard.tasks.find(task => task.index == 2)?.count ?? 0);
                break;
            case 14:
                // DPS record on Shimmer Island on dummy in W2
                line.updateCurrentValue(optionListAccount[172]);
                break;
            case 15:
                // TODO
                // Sum of star talent points owned
                // Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[0]) + k._customBlock_GetTalentNumber(1, 8) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[5]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h["64"]) + (k._customBlock_GetTalentNumber(1, 622) + (k._customBlock_StampBonusOfTypeX("TalentS") + (k._customBlock_GetTalentNumber(1, 17) + (Math.floor(q._customBlock_GuildBonuses(11)) + (q._customBlock_FlurboShop(1) + (Math.min(5 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "w4b2"), 50) + (Math.min(15 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss2C"), 100) + Math.min(4 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "fallEvent1"), 100)) + (q._customBlock_Labb("SigilBonus", "Blank", 9, 0) + (10 * q._customBlock_AchieveStatus(212) + (20 * q._customBlock_AchieveStatus(289) + (20 * q._customBlock_AchieveStatus(305) + (q._customBlock_Breeding("ShinyBonusS", "Nah", 14, -1) + (r._customBlock_GetBribeBonus("32") + 100 * n._customBlock_RandomEvent("FractalIslandBonus", 5, 999))))))))))))))) - c.asNumber(d[5]))
                line.updateCurrentValue(0);
                break;
            case 16:
                // Lowest average kill for crystal spawn
                line.updateCurrentValue(1 / optionListAccount[202]);
                break;
            case 17:
                // Dungeon rank
                line.updateCurrentValue(dungeonsData.rank);
                break;
            case 18:
                // Highest drop multi
                line.updateCurrentValue(optionListAccount[200]);
                break;
            case 19:
                // Number of constellations completed
                line.updateCurrentValue(constellations.reduce((sum, constellation) => sum+(constellation.isComplete ? 1 : 0),0));
                break;
            case 20:
                // Highest damage dealt to gravestone (weekly battle in W2 town)
                line.updateCurrentValue(optionListAccount[203]);
                break;
            case 21:
                // Number of different Obols found
                line.updateCurrentValue(obolCount);
                break;
            case 22:
                // Sum of all alchemy bubbles levels
                var totalBubblesLevel = 0;
                alchemy.cauldrons.forEach(cauldron => {
                    totalBubblesLevel += cauldron.bubbles.reduce((sum, bubble) => sum+bubble.level,0);
                });
                line.updateCurrentValue(totalBubblesLevel);
                break;
            case 23:
                // Sum of all vials levels
                line.updateCurrentValue(alchemy.vials.reduce((sum, vial) => sum+vial.level,0));
                break;
            case 24:
                // Sum of sigils level in alchemy
                line.updateCurrentValue(sigils.sigils.reduce((sum, sigil) => sum+(sigil.boostLevel+1),0));
                break;
            case 25:
                // Number of times Jackpot is hit in arcade
                line.updateCurrentValue(optionListAccount[199]);
                break;
            case 26:
                // Sum of all post office boxes found
                line.updateCurrentValue(postOfficeData.complete + postOfficeData.misc + postOfficeData.streak);
                break;
            case 27:
                // Highest Killroy score on a Warrior
                line.updateCurrentValue(optionListAccount[204]);
                break;
            case 28:
                // Highest Killroy score on an Archer
                line.updateCurrentValue(optionListAccount[205]);
                break;
            case 29:
                // Highest Killroy score on a Mage
                line.updateCurrentValue(optionListAccount[206]);
                break;
            case 30:
                // Fastest time to kill Efaunt
                line.updateCurrentValue(1E3 - optionListAccount[207]);
                break;
            case 31:
                // Largest Oak Log sample
                line.updateCurrentValue(optionListAccount[211]);
                break;
            case 32:
                // Largest Copper Ore sample
                line.updateCurrentValue(optionListAccount[212]);
                break;
            case 33:
                // Largest Spore Cap sample
                line.updateCurrentValue(optionListAccount[213]);
                break;
            case 34:
                // Largest Goldfish sample
                line.updateCurrentValue(optionListAccount[214]);
                break;
            case 35:
                // Largest Fly sample
                line.updateCurrentValue(optionListAccount[215]);
                break;
            case 36:
                // Best non duplicate Goblin Gorefest wave (worship)
                line.updateCurrentValue(optionListAccount[209]);
                break;
            case 37:
                // TODO
                // Sum of best waves for worship
                line.updateCurrentValue(0);
                break;
            case 38:
                // TODO
                // Total digits of all Deathnote kills
                line.updateCurrentValue(0);
                break;
            case 39:
                // TODO
                // Number of equinox cloud completed
                line.updateCurrentValue(0);
                break;
            case 40:
                // TODO
                // Sum of Refinery rank
                line.updateCurrentValue(0);
                break;
            case 41:
                // TODO
                // Sum of Atom upgrade levels
                line.updateCurrentValue(0);
                break;
            case 42:
                // TODO
                // Sum of construction levels
                line.updateCurrentValue(0);
                break;
            case 43:
                // TODO
                // Most Tottoise in storage
                line.updateCurrentValue(0);
                break;
            case 44:
                // Most Greenstacks in storage
                line.updateCurrentValue(optionListAccount[224]);
                break;
            case 45:
                // TODO
                // Number of Rift levels completed
                line.updateCurrentValue(0);
                break;
            case 46:
                // TODO
                // Highest pet power
                line.updateCurrentValue(0);
                break;
            case 47:
                // Fastest time to reach Round 100 in Arena
                line.updateCurrentValue(1E3 - optionListAccount[220]);
                break;
            case 48:
                // TODO
                // Sum of all kitchen levels
                line.updateCurrentValue(0);
                break;
            case 49:
                // TODO
                // Sum of all shiny pets levels
                line.updateCurrentValue(0);
                break;
            case 50:
                // TODO
                // Sum of all meals levels
                line.updateCurrentValue(0);
                break;
            case 51:
                // TODO
                // Sum of all pet breedability levels
                line.updateCurrentValue(0);
                break;
            case 52:
                // TODO
                // Number of lab chips owned
                line.updateCurrentValue(0);
                break;
            case 53:
                // TODO
                // Total colosseum score
                line.updateCurrentValue(0);
                break;
            case 54:
                // Most Giants killed in a single week
                line.updateCurrentValue(optionListAccount[217]);
                break;
            case 55:
                // TODO
                // Number of Onyx statues
                line.updateCurrentValue(0);
                break;
            case 56:
                // Fastest time to kill 200 Tremor wurms
                line.updateCurrentValue(1E3 - optionListAccount[218]);
                break;
            case 57:
                // TODO
                // Sum of all sailing boats levels
                line.updateCurrentValue(0);
                break;
            case 58:
                // TODO
                // God ranks in divinity
                line.updateCurrentValue(0);
                break;
            case 59:
                // TODO
                // Total gaming plants evolved
                line.updateCurrentValue(0);
                break;
            case 60:
                // TODO
                // Number of artifacts found
                line.updateCurrentValue(0);
                break;
            case 61:
                // TODO
                // Sailing gold bars owned
                line.updateCurrentValue(0);
                break;
            case 62:
                // TODO
                // Highest sailing capitain level
                line.updateCurrentValue(0);
                break;
            case 63:
                // TODO
                // Highest immortal snail level
                line.updateCurrentValue(0);
                break;
            case 64:
                // TODO
                // Best gold nugget
                line.updateCurrentValue(0);
                break;
            case 65:
                // TODO
                // Number of items found
                line.updateCurrentValue(0);
                break;
            case 66:
                // TODO
                // Most gaming bits owned
                line.updateCurrentValue(0);
                break;
            case 67:
                // Highest Crop OG
                line.updateCurrentValue(Math.pow(2, optionListAccount[219]));
                break;
            case 68:
                // TODO
                // Number of crops discovered
                line.updateCurrentValue(0);
                break;
            case 69:
                // TODO
                // Number of golden food goldstack
                line.updateCurrentValue(0);
                break;
            case 70:
                // TODO
                // Sum of all summoning upgrade levels
                line.updateCurrentValue(0);
                break;
            case 71:
                // TODO
                // Number of summoning wins
                line.updateCurrentValue(0);
                break;
            case 72:
                // TODO
                // Number of ninja floors unlocked
                line.updateCurrentValue(0);
                break;
            case 73:
                // TODO
                // Familiars owned in Summoning
                line.updateCurrentValue(0);
                break;
            case 74:
                // TODO
                // Number of Jade Emporium upgrades bought
                line.updateCurrentValue(0);
                break;
            case 75:
                // TODO
                // Sum of all highest minigame highscore
                line.updateCurrentValue(0);
                break;
            case 76:
                // TODO
                // Sum of all prayer upgrade levels
                line.updateCurrentValue(0);
                break;
            case 77:
                // TODO
                // Sum of all plot land rank levels
                line.updateCurrentValue(0);
                break;
            case 78:
                // Largest Magic Bean trade
                line.updateCurrentValue(optionListAccount[221]);
                break;
            case 79:
                // Most balls earned from LBoFaF (bonus balls from arcade)
                line.updateCurrentValue(optionListAccount[222]);
                break;
            case 80:
                // TODO
                // Sum of all Gold Ball shop upgrades levels
                line.updateCurrentValue(0);
                break;
            default:
                line.updateCurrentValue(0);
                break;
        }
    });

    tome.updateTotalScore();
}