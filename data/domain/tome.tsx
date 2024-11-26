import { Domain, RawData } from './base/domain';
import { Item } from './items'
import { lavaLog, nFormatter } from '../utility';
import { Stamp } from './stamps';
import { PlayerStatues, StatusType } from './statues';
import { Card } from './cards';
import { Quests } from './quests';
import { Player } from './player';
import { TaskBoard } from './tasks';
import { Achievement } from './achievements';
import { Slab } from './slab';
import { Constellation } from './constellations';
import { Alchemy } from './alchemy';
import { Sigils } from './sigils';
import { Dungeons, PassiveType } from './dungeons';
import { POExtra } from './postoffice';
import { initTomeRepo } from './data/TomeRepo';
import { TomeModel } from './model/tomeModel';
import { TomeScalingEnum } from './enum/tomeScalingEnum';
import { Worship } from './worship';
import { Equinox } from './equinox';
import { Refinery } from './refinery';
import { AtomCollider } from './atomCollider';
import { Deathnote } from './deathnote';
import { Construction } from './construction';
import { Rift } from './rift';
import { Breeding } from './breeding';
import { Cooking } from './cooking';
import { Lab } from './lab';
import { Sailing } from './sailing';
import { Divinity } from './divinity';
import { ElegantSeashell, Gaming, ImmortalSnail } from './gaming';
import { ArtifactStatus } from './sailing/artifacts';
import { Account } from './account';
import { Farming } from './world-6/farming';
import { Sneaking } from './world-6/sneaking';
import { Summoning } from './world-6/summoning';
import { Arcade } from './arcade';
import { Prayer } from './prayers';
import { initTalentNameRepo } from './data/TalentNameRepo';
import { Guild } from './guild';
import { Bribe } from './bribes';
import { IslandExpeditions } from './islandExpedition';
import { Family } from './family';
import { ClassIndex } from './talents';

export enum TomeScoreColors {
    Platinum = "#6EE3FF",
    Gold = "#FAC95D",
    Silver = "#CDE3E6",
    Bronze = "#F1A461",
    Background = "#3C2C26"
}

const tomeLineDisplayOrder: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 53, 10, 11, 12, 75, 13, 14, 80, 15, 16, 17, 18, 19, 21, 22, 23, 24, 79, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 76, 38, 54, 40, 41, 42, 39, 44, 46, 47, 48, 49, 50, 51, 52, 45, 55, 57, 58, 59, 60, 61, 62, 63, 64, 56, 65, 66, 67, 68, 69, 20, 70, 71, 43, 72, 73, 74, 77, 78];

export class TomeLine {
    // Needs this to be updated
    // To know how, check game code searching for "_customEvent_TomeQTY: function() {"
    // It's where engine.getGameAttribute("DNSM").h.TomeQTY array is populated with each line current value which is then used to calculate each line points
    private currentValue: number = 0;
    lineScore: number = 0;

    constructor(public index: number, public data: TomeModel, public displayOrder: number = 0) {
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
            case 53:
            case 61:
            case 64:
            case 66:
            case 78:
                return nFormatter(this.currentValue);
            // Not so big values but with lots of decimals and wanna keep a bit of it
            case 16:
            case 18:
                return (Math.round(100 * this.currentValue) / 100).toString();
            default:
                return this.currentValue.toString();
        }
    }

    getLineDisplayColor = (): string => {
        switch(true) {
            case this.lineScore >= this.data.totalVal:
                return TomeScoreColors.Platinum;
            case this.lineScore >= this.data.totalVal*0.75:
                return TomeScoreColors.Gold;
            case this.lineScore >= this.data.totalVal*0.5:
                return TomeScoreColors.Silver;
            default:
                return TomeScoreColors.Bronze;
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
    scoreThresholds: number[] = [];

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
        const serverVars = data.get("servervars") as Record<string, any>;

        tome.scoreThresholds = [];
        if (serverVars && Object.keys(serverVars).includes("TomePct")) {
            tome.scoreThresholds = serverVars["TomePct"] as number[];
        }
        
        tome.lines = [];
        const tomeLinesBase = initTomeRepo();
        tomeLinesBase.forEach(lineInfo => {
            tome.lines.push(new TomeLine(lineInfo.index,lineInfo.data,tomeLineDisplayOrder.indexOf(lineInfo.index)));
        });
    }

    updateTotalScore = () => {
        this.totalScore = this.lines.reduce((sum, line) => sum+line.lineScore, 0);
    }

    getScoreRankingDisplay = (): string => {
        switch (true) {
            case (this.scoreThresholds.length >= 7 && this.totalScore >= this.scoreThresholds[6]):
                return 'Top 0.1%';
            case (this.scoreThresholds.length >= 6 && this.totalScore >= this.scoreThresholds[5]):
                return 'Top 0.5%';
            case (this.scoreThresholds.length >= 5 && this.totalScore >= this.scoreThresholds[4]):
                return 'Top 1%';
            case (this.scoreThresholds.length >= 4 && this.totalScore >= this.scoreThresholds[3]):
                return 'Top 5%';
            case (this.scoreThresholds.length >= 3 && this.totalScore >= this.scoreThresholds[2]):
                return 'Top 10%';
            case (this.scoreThresholds.length >= 2 && this.totalScore >= this.scoreThresholds[1]):
                return 'Top 25%';
            case (this.scoreThresholds.length >= 1 && this.totalScore >= this.scoreThresholds[0]):
                return 'Top 50%';
            default:
                return '';
        }
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
    const worshipData = data.get("worship") as Worship;
    const equinoxData = data.get("equinox") as Equinox;
    const refineryData = data.get("refinery") as Refinery;
    const atomCollider = data.get("collider") as AtomCollider;
    const deathnote = data.get("deathnote") as Deathnote;
    const construction = data.get("construction") as Construction;
    const rift = data.get("rift") as Rift;
    const storage = data.get("storage") as Storage;
    const breeding = data.get("breeding") as Breeding;
    const cooking = data.get("cooking") as Cooking;
    const lab = data.get("lab") as Lab;
    const sailing = data.get("sailing") as Sailing;
    const divinity = data.get("divinity") as Divinity;
    const gaming = data.get("gaming") as Gaming;
    const account = data.get("account") as Account;
    const farming = data.get("farming") as Farming;
    const sneaking = data.get("sneaking") as Sneaking;
    const summoning = data.get("summoning") as Summoning;
    const arcade = data.get("arcade") as Arcade;
    const prayers = data.get("prayers") as Prayer[];
    const guild = data.get("guild") as Guild;
    const bribes = data.get("bribes") as Bribe[];
    const islandExpeditions = data.get("islandExpeditions") as IslandExpeditions;
    const family = data.get("family") as Family;

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
                line.updateCurrentValue(Math.max(0, ...statueLevels));
                break;
            case 2:
                // Sum of cards levels
                line.updateCurrentValue(cards.reduce((sum, card) => sum+(card.count > 0 ? card.getStars()+1 : 0), 0));
                break;
            case 3:
                // Sum of highest level of each talent (if multiple classes share a same talent, can be counted only once)
                line.updateCurrentValue(account.talentsMaxLevels.reduce((sum, talentMaxLevel) => sum+talentMaxLevel, 0));
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
                line.updateCurrentValue(optionListAccount[198] ?? 0);
                break;
            case 9:
                // Most Spore caps held in Storage
                line.updateCurrentValue(optionListAccount[208] ?? 0);
                break;
            case 10:
                // Number of different trophies found
                line.updateCurrentValue(trophyCount);
                break;
            case 11:
                // Sum of all skills levels of all players
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
                line.updateCurrentValue(optionListAccount[201] ?? 0);
                break;
            case 13:
                // Total afk hours claimed
                line.updateCurrentValue(taskBoard.tasks.find(task => task.index == 2)?.count ?? 0);
                break;
            case 14:
                // DPS record on Shimmer Island on dummy in W2
                line.updateCurrentValue(optionListAccount[172] ?? 0);
                break;
            case 15:
                // TODO
                // Sum of star talent points owned
                // in-game code :
                /*
                    a.engine.getGameAttribute("DNSM").h.TomeQTY[15] = k._customBlock_TotalTalentPoints(a.engine.getGameAttribute("DummyList2"))[5];
                */
                // in-game code for _customBlock_TotalTalentPoints :
                /*
                    k._customBlock_TotalTalentPoints = function(d) {
                        a.engine.getGameAttribute("SkillLevelsMAX")[10] = 100 + (k._customBlock_GetTalentNumber(1, 81) + (k._customBlock_GetTalentNumber(2, 143) + q._customBlock_getbonus2(1, 51, -1)));
                        5 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[11]) && (a.engine.getGameAttribute("SkillLevelsMAX")[11] = 100 + (k._customBlock_GetTalentNumber(1, 293) + (k._customBlock_GetTalentNumber(2, 368) + q._customBlock_getbonus2(1, 52, -1))));
                        5 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[12]) && (a.engine.getGameAttribute("SkillLevelsMAX")[12] = 100 + (k._customBlock_GetTalentNumber(1, 488) + (k._customBlock_GetTalentNumber(2, 533) + q._customBlock_getbonus2(1, 53, -1))));
                        10 < c.asNumber(a.engine.getGameAttribute("Lv0")[0]) && (a.engine.getGameAttribute("SkillLevelsMAX")[75] = 100 + k._customBlock_GetTalentNumber(1, 38));
                        5 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[23]) && (a.engine.getGameAttribute("SkillLevelsMAX")[23] = 100 + (k._customBlock_GetTalentNumber(2, 38) + q._customBlock_getbonus2(1, 54, -1)));
                        1 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[87]) && (a.engine.getGameAttribute("SkillLevelsMAX")[87] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 114), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[87])),
                        a.engine.getGameAttribute("SkillLevelsMAX")[86] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 129), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[0][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[86])));
                        1 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[266]) && (a.engine.getGameAttribute("SkillLevelsMAX")[266] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 294), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[1][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[266])),
                        a.engine.getGameAttribute("SkillLevelsMAX")[267] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 309), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[1][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[267])));
                        1 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[446]) && (a.engine.getGameAttribute("SkillLevelsMAX")[446] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 474), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[2][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[446])),
                        a.engine.getGameAttribute("SkillLevelsMAX")[447] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 489), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[2][1])), c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[447])));
                        1 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[79]) && (a.engine.getGameAttribute("SkillLevelsMAX")[79] = Math.max(100 + Math.min(k._customBlock_GetTalentNumber(1, 39), c.asNumber(a.engine.getGameAttribute("CauldronInfo")[3][0])), 100));
                        -.5 < c.asNumber(a.engine.getGameAttribute("SkillLevelsMAX")[625]) && (a.engine.getGameAttribute("SkillLevelsMAX")[625] = Math.floor(Math.max(1, c.asNumber(a.engine.getGameAttribute("CauldronInfo")[3][5]) + r._customBlock_MealBonus("TPpete"))));
                        var b = a.engine.getGameAttribute("DNSM")
                        , e = [];
                        b.h.TalentDL = e;
                        b = a.engine.getGameAttribute("DNSM");
                        e = [];
                        b.h.TalentDLbonus = e;
                        a.engine.getGameAttribute("DNSM").h.TalentDN4 = -3;
                        for (var f = 0; 9 > f; )
                            e = f++,
                            b = a.engine.getGameAttribute("DNSM"),
                            e = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDN4) + c.asNumber(a.engine.getGameAttribute("Lv0")[e + 1]),
                            b.h.TalentDN4 = e;
                        b = a.engine.getGameAttribute("DNSM");
                        e = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDN4) + Math.round(k._customBlock_GetTalentNumber(1, 275));
                        b.h.TalentDN4 = e;
                        a.engine.getGameAttribute("DNSM").h.TalentDL.push(a.engine.getGameAttribute("DNSM").h.TalentDN4);
                        for (f = a.engine.getGameAttribute("DNSM").h.TalentDN4 = 0; 9 > f; )
                            e = f++,
                            b = a.engine.getGameAttribute("DNSM"),
                            e = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDN4) + Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[e + 1]) / 2),
                            b.h.TalentDN4 = e;
                        a.engine.getGameAttribute("DNSM").h.TalentDL.push(a.engine.getGameAttribute("DNSM").h.TalentDN4);
                        for (f = a.engine.getGameAttribute("DNSM").h.TalentDN4 = 0; 9 > f; )
                            e = f++,
                            b = a.engine.getGameAttribute("DNSM"),
                            e = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDN4) + Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[e + 1]) / 5),
                            b.h.TalentDN4 = e;
                        a.engine.getGameAttribute("DNSM").h.TalentDL.push(a.engine.getGameAttribute("DNSM").h.TalentDN4);
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[0]));
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[1]));
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[2]));
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[3]));
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[4]));
                        a.engine.getGameAttribute("DNSM").h.TalentDLbonus.push(c.asNumber(a.engine.getGameAttribute("CurrenciesOwned").h.TalentPoints[5]));
                        for (f = 0; 4 > f; )
                            e = f++,
                            7 > a.engine.getGameAttribute("CharacterClass") ? a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e] = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TalArchers) : 19 > a.engine.getGameAttribute("CharacterClass") ? a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e] = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TalWarrior) : 31 > a.engine.getGameAttribute("CharacterClass") ? a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e] = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TalArchers) : a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e] = c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[e]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.TalWiz);
                        b = a.engine.getGameAttribute("DNSM");
                        e = [];
                        b.h.TalentDL2 = e;
                        a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(3 * (c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 1) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[0]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[0]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Tab1Pts) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h.TalPts1) + (k._customBlock_StampBonusOfTypeX("Talent1") + (5 * q._customBlock_AchieveStatus(54) + (q._customBlock_FlurboShop(1) + (q._customBlock_ArcadeBonus(16) + (6 * q._customBlock_AchieveStatus(216) + q._customBlock_Breeding("ShinyBonusS", "Nah", 10, -1)))))))))) - c.asNumber(d[0])));
                        a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(3 * (c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 9) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[1]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[1]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Tab2Pts) + (k._customBlock_GetTalentNumber(1, 119) + (k._customBlock_GetTalentNumber(1, 299) + (k._customBlock_GetTalentNumber(1, 494) + (k._customBlock_StampBonusOfTypeX("Talent2") + (k._customBlock_GetTalentNumber(1, 44) + (2 * q._customBlock_AchieveStatus(76) + 3 * q._customBlock_AchieveStatus(78) + (q._customBlock_FlurboShop(1) + (8 * q._customBlock_AchieveStatus(230) + q._customBlock_Breeding("ShinyBonusS", "Nah", 11, -1))))))))))) - c.asNumber(d[1])));
                        a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(3 * (c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 29) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[1]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[2]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Tab3Pts) + (k._customBlock_StampBonusOfTypeX("Talent3") + (5 * q._customBlock_AchieveStatus(166) + 10 * q._customBlock_AchieveStatus(170) + (q._customBlock_FlurboShop(1) + (8 * q._customBlock_AchieveStatus(219) + q._customBlock_Breeding("ShinyBonusS", "Nah", 12, -1))))))) - c.asNumber(d[2])));
                        4 == a.engine.getGameAttribute("CharacterClass") ? a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(Math.max(0, 1 + k._customBlock_GetTalentNumber(1, 34) + k._customBlock_GetTalentNumber(2, 45) * c.asNumber(a.engine.getGameAttribute("OptionsListAccount")[158]) - c.asNumber(d[3])))) : a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(Math.max(0, 3 * Math.min(c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 89, 100) + Math.max(0, 2 * (c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 189)) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[2]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[3]) + (k._customBlock_StampBonusOfTypeX("Talent4") + (q._customBlock_FlurboShop(1) + (Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[14]) / 2) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.AlchVials.h.Tab4Pts) + (3 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][4][0]) + (10 * q._customBlock_AchieveStatus(292) + (10 * q._customBlock_AchieveStatus(295) + (10 * q._customBlock_AchieveStatus(239) + (15 * q._customBlock_AchieveStatus(240) + (12 * q._customBlock_AchieveStatus(241) + q._customBlock_Breeding("ShinyBonusS", "Nah", 13, -1))))))))))))) - c.asNumber(d[3]))));
                        a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(Math.max(0, 3 * (c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 149) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[2]) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[4]) + (k._customBlock_StampBonusOfTypeX("Talent5") + (q._customBlock_FlurboShop(1) + 2 * c.asNumber(a.engine.getGameAttribute("Tasks")[2][5][0]))))) - c.asNumber(d[4]))));
                        a.engine.getGameAttribute("DNSM").h.TalentDL2.push(Math.floor(c.asNumber(a.engine.getGameAttribute("Lv0")[0]) - 1 + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDL[0]) + k._customBlock_GetTalentNumber(1, 8) + (c.asNumber(a.engine.getGameAttribute("DNSM").h.TalentDLbonus[5]) + c.asNumber(a.engine.getGameAttribute("DNSM").h.FamBonusQTYs.h["64"]) + (k._customBlock_GetTalentNumber(1, 622) + (k._customBlock_StampBonusOfTypeX("TalentS") + (k._customBlock_GetTalentNumber(1, 17) + (Math.floor(q._customBlock_GuildBonuses(11)) + (q._customBlock_FlurboShop(1) + (Math.min(5 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "w4b2"), 50) + (Math.min(15 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "Boss2C"), 100) + Math.min(4 * u._customBlock_RunCodeOfTypeXforThingY("CardLv", "fallEvent1"), 100)) + (q._customBlock_Labb("SigilBonus", "Blank", 9, 0) + (10 * q._customBlock_AchieveStatus(212) + (20 * q._customBlock_AchieveStatus(289) + (20 * q._customBlock_AchieveStatus(305) + (q._customBlock_Breeding("ShinyBonusS", "Nah", 14, -1) + (r._customBlock_GetBribeBonus("32") + 100 * n._customBlock_RandomEvent("FractalIslandBonus", 5, 999))))))))))))))) - c.asNumber(d[5])));
                        return a.engine.getGameAttribute("DNSM").h.TalentDL2
                    }
                */
                const totalStarPoints: number [] = [];
                players.forEach(player => {
                    var playerSkillsLevelsToUse = -3;
                    var i = 0;
                    for (i = 0; i < 9; i++) {
                        playerSkillsLevelsToUse += player.skills.get(i)?.level ?? 0;
                    }
                    playerSkillsLevelsToUse += Math.floor(player.getTalentBonus(275));

                    var playerStarPoints = player.level - 1 + 
                        (playerSkillsLevelsToUse + player.getTalentBonus(8) + 
                        ((account.talentPointsOwned[5] ?? 0) + Math.floor(family.classBonus.get(ClassIndex.Wizard)?.getBonus(player) ?? 0) + 
                        (player.getTalentBonus(622) + 
                        (stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + stamp.data.effect == "TalentS" ? stamp.getBonus() : 0, 0) + 
                        (player.getTalentBonus(17) + 
                        (Math.floor(guild.guildBonuses.find(bonus => bonus.index == 11)?.getBonus() ?? 0) + 
                        (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0 + 
                        (Math.min(cards.find(card => card.id == "w4b2")?.getBonus() ?? 0, 50) + 
                        (Math.min(cards.find(card => card.id == "Boss2C")?.getBonus() ?? 0, 100) + Math.min(cards.find(card => card.id == "fallEvent1")?.getBonus() ?? 0, 100)) + 
                        (sigils.sigils.find(sigil => sigil.index == 9)?.getBonus() ?? 0 + 
                        (achievements[212].completed ? 10 : 0 + 
                        (achievements[289].completed ? 20 : 0 + 
                        (achievements[305].completed ? 20 : 0 + 
                        (breeding.shinyBonuses.find(bonus => bonus.data.index == 14)?.getBonus() ?? 0 + 
                        ((bribes.find(bribe => bribe.bribeIndex == 32)?.getBonus() ?? 0) + islandExpeditions.bonusStarTalentPoints))))))))))))));
                    player.talents
                    totalStarPoints.push(Math.floor(playerStarPoints));
                });
                line.updateCurrentValue(Math.max(...totalStarPoints));
                break;
            case 16:
                // Lowest average kill for crystal spawn
                line.updateCurrentValue(1 / (optionListAccount[202] ?? 1));
                break;
            case 17:
                // Dungeon rank
                line.updateCurrentValue(dungeonsData.rank);
                break;
            case 18:
                // Highest drop multi
                line.updateCurrentValue(optionListAccount[200] ?? 0);
                break;
            case 19:
                // Number of constellations completed
                line.updateCurrentValue(constellations.reduce((sum, constellation) => sum+(constellation.isComplete ? 1 : 0),0));
                break;
            case 20:
                // Highest damage dealt to gravestone (weekly battle in W2 town)
                line.updateCurrentValue(optionListAccount[203] ?? 0);
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
                line.updateCurrentValue(optionListAccount[199] ?? 0);
                break;
            case 26:
                // Sum of all post office boxes found
                line.updateCurrentValue(postOfficeData.complete + postOfficeData.misc + postOfficeData.streak);
                break;
            case 27:
                // Highest Killroy score on a Warrior
                line.updateCurrentValue(optionListAccount[204] ?? 0);
                break;
            case 28:
                // Highest Killroy score on an Archer
                line.updateCurrentValue(optionListAccount[205] ?? 0);
                break;
            case 29:
                // Highest Killroy score on a Mage
                line.updateCurrentValue(optionListAccount[206] ?? 0);
                break;
            case 30:
                // Fastest time to kill Efaunt
                line.updateCurrentValue(1E3 - (optionListAccount[207] ?? 0));
                break;
            case 31:
                // Largest Oak Log sample
                line.updateCurrentValue(optionListAccount[211] ?? 0);
                break;
            case 32:
                // Largest Copper Ore sample
                line.updateCurrentValue(optionListAccount[212] ?? 0);
                break;
            case 33:
                // Largest Spore Cap sample
                line.updateCurrentValue(optionListAccount[213] ?? 0);
                break;
            case 34:
                // Largest Goldfish sample
                line.updateCurrentValue(optionListAccount[214] ?? 0);
                break;
            case 35:
                // Largest Fly sample
                line.updateCurrentValue(optionListAccount[215] ?? 0);
                break;
            case 36:
                // Best non duplicate Goblin Gorefest wave (worship)
                line.updateCurrentValue(optionListAccount[209] ?? 0);
                break;
            case 37:
                // Sum of best waves for worship
                line.updateCurrentValue(worshipData.totemInfo.reduce((sum, totem) => sum+totem.maxWave, 0));
                break;
            case 38:
                // Total digits of all Deathnote kills
                var totalDigits = 0;
                const killsMap = deathnote.getKillsMap();
                [...killsMap.entries()].forEach(([_, deathnoteMobs]) => {
                    totalDigits += [...deathnoteMobs.values()].reduce((sum, killCount) => sum+Math.ceil(lavaLog(killCount)), 0);
                });
                line.updateCurrentValue(totalDigits);
                break;
            case 39:
                // Number of equinox cloud completed
                line.updateCurrentValue(equinoxData.challenges.filter(challenge => challenge.complete).length);
                break;
            case 40:
                // Sum of Refinery rank
                line.updateCurrentValue(Object.entries(refineryData.salts).reduce((sum, [_, refinery]) => sum+refinery.rank, 0));
                break;
            case 41:
                // Sum of Atom upgrade levels
                line.updateCurrentValue(atomCollider.atoms.reduce((sum, atom) => sum+atom.level, 0));
                break;
            case 42:
                // Sum of construction buildings levels
                line.updateCurrentValue(construction.buildings.reduce((sum, building) => sum+building.level, 0));
                break;
            case 43:
                // Most Tottoise in storage
                line.updateCurrentValue(storage.amountInStorage("Critter11A"));
                break;
            case 44:
                // Most Greenstacks in storage
                line.updateCurrentValue(optionListAccount[224] ?? 0);
                break;
            case 45:
                // Number of Rift levels completed
                line.updateCurrentValue(rift.level);
                break;
            case 46:
                // Highest pet power
                line.updateCurrentValue(
                    Math.max(
                        0, // default value if there's no pets
                        ...breeding.fenceyardPets.map(pet => pet.power), 
                        ...breeding.storedPets.map(pet => pet.power), 
                        ...breeding.territory.flatMap(territory => territory.pets.map(pet => pet.power))
                    )
                );
                break;
            case 47:
                // Fastest time to reach Round 100 in Arena
                line.updateCurrentValue(1E3 - (optionListAccount[220] ?? 0));
                break;
            case 48:
                // Sum of all kitchen levels
                line.updateCurrentValue(cooking.kitchens.reduce((sum, kitchen) => sum+kitchen.luckLevels+kitchen.recipeLevels+kitchen.mealLevels, 0));
                break;
            case 49:
                // Sum of all shiny pets levels
                line.updateCurrentValue(breeding.shinyBonuses.reduce((sum, bonus) => sum+bonus.totalLevels, 0));
                break;
            case 50:
                // Sum of all meals levels
                line.updateCurrentValue(cooking.meals.reduce((sum, meal) => sum+meal.level, 0));
                break;
            case 51:
                // Sum of all pet breedability levels
                line.updateCurrentValue(breeding.basePets.filter(pet => pet.data.petId != "_").reduce((sum, pet) => sum+pet.breedingLevel, 0));
                break;
            case 52:
                // Number of lab chips owned
                line.updateCurrentValue(
                    lab.chips.reduce((sum, chip) => sum+chip.count, 0)+
                    Object.entries(lab.playerChips).reduce((sum, [_, chips]) => sum+chips.filter(chip => chip && chip.data).length, 0)
                );
                break;
            case 53:
                // Total colosseum score
                line.updateCurrentValue(account.coloHighscores.reduce((sum, score) => sum+score, 0));
                break;
            case 54:
                // Most Giants killed in a single week
                line.updateCurrentValue(optionListAccount[217] ?? 0);
                break;
            case 55:
                // Number of Onyx statues
                var firstPlayerStatues: PlayerStatues | undefined = statues.find(statues => statues.playerID == 0);
                if (firstPlayerStatues) {
                    line.updateCurrentValue(firstPlayerStatues.statues.filter(statue => statue && statue.type == StatusType.Onyx).length);
                }
                break;
            case 56:
                // Fastest time to kill 200 Tremor wurms
                line.updateCurrentValue(1E3 - (optionListAccount[218] ?? 0));
                break;
            case 57:
                // Sum of all sailing boats levels
                line.updateCurrentValue(sailing.boats.reduce((sum, boat) => sum+boat.lootUpgrades+boat.speedUpgrades, 0));
                break;
            case 58:
                // God ranks in divinity
                line.updateCurrentValue(divinity.godRank);
                break;
            case 59:
                // Total gaming plants evolved
                line.updateCurrentValue((gaming.importBoxes.find(box => box.index == 3) as ElegantSeashell).plantsEvolved ?? 0);
                break;
            case 60:
                // Number of artifacts found
                line.updateCurrentValue(sailing.artifacts.reduce((sum, artifact) => 
                    artifact.status == ArtifactStatus.Obtained ? sum+1
                    : artifact.status == ArtifactStatus.Ancient ? sum+2
                    : artifact.status == ArtifactStatus.Eldritch ? sum+3
                    : artifact.status == ArtifactStatus.Sovereign ? sum+4 
                    : 0
                , 0));
                break;
            case 61:
                // Sailing gold bars owned
                line.updateCurrentValue(sailing.loot[0] ?? 0);
                break;
            case 62:
                // Highest sailing capitain level
                line.updateCurrentValue(Math.max(0, ...sailing.captains.map(captain => captain.level)));
                break;
            case 63:
                // Highest immortal snail level
                line.updateCurrentValue((gaming.importBoxes.find(box => box.index == 7) as ImmortalSnail).highestSnailLevel ?? 0);
                break;
            case 64:
                // Best gold nugget
                line.updateCurrentValue(gaming.biggestGoldNugget);
                break;
            case 65:
                // Number of items found
                line.updateCurrentValue(slab.rawObtainedCount);
                break;
            case 66:
                // Gaming bits owned
                line.updateCurrentValue(gaming.currenBitsOwned);
                break;
            case 67:
                // Highest Crop OG
                line.updateCurrentValue(Math.pow(2, optionListAccount[219] ?? 0));
                break;
            case 68:
                // Number of crops discovered
                // Use this instead of the value in CropScientist as it's not loaded yet when updating the Tome
                line.updateCurrentValue(farming.cropDepot.filter(crop => crop.discovered).length);
                break;
            case 69:
                // Number of golden food goldstack
                line.updateCurrentValue(sneaking.beanstalking.bonuses.reduce((sum, bonus) => sum+bonus.level, 0));
                break;
            case 70:
                // Sum of all summoning upgrade levels
                line.updateCurrentValue(summoning.summonUpgrades.reduce((sum, upgrade) => sum+upgrade.level, 0));
                break;
            case 71:
                // Number of summoning wins
                line.updateCurrentValue(summoning.summonBattles.allVictories.reduce((sum, victories) => sum+victories, 0));
                break;
            case 72:
                // Number of ninja floors unlocked
                var floorsUnlocked = 0;
                if (0 < (optionListAccount[232] ?? 0)) {
                    floorsUnlocked = 12 * optionListAccount[232];
                } else {
                    floorsUnlocked = Math.min(12, sneaking.getUnlockedFloors());
                }
                line.updateCurrentValue(floorsUnlocked);
                break;
            case 73:
                // Familiars owned in Summoning
                var totalFamiliarsOwned = 0;
                var multiplyer = 1;
                var i = 0;
                for (i = 0; i < 9; i++) {
                    totalFamiliarsOwned += multiplyer * summoning.summonFamiliarRaw[i];
                    multiplyer *= i + 3;
                }
                line.updateCurrentValue(totalFamiliarsOwned);
                break;
            case 74:
                // Number of Jade Emporium upgrades bought
                line.updateCurrentValue(sneaking.jadeUpgrades.filter(upgrade => upgrade.display && upgrade.purchased).length);
                break;
            case 75:
                // Sum of all highest minigame highscore (also includes catching hoop from optionListAccount)
                line.updateCurrentValue(account.minigameHighscores.reduce((sum, score) => sum+score, 0) + (optionListAccount[99] ?? 0));
                break;
            case 76:
                // Sum of all prayer upgrade levels
                line.updateCurrentValue(prayers.reduce((sum, prayer) => sum+prayer.level, 0));
                break;
            case 77:
                // Sum of all plot land rank levels
                line.updateCurrentValue(farming.farmPlots.reduce((sum, plot) => sum+plot.landRank, 0));
                break;
            case 78:
                // Largest Magic Bean trade
                line.updateCurrentValue(optionListAccount[221] ?? 0);
                break;
            case 79:
                // Most balls earned from LBoFaF (bonus balls from arcade)
                line.updateCurrentValue(optionListAccount[222] ?? 0);
                break;
            case 80:
                // Sum of all Gold Ball shop upgrades levels
                line.updateCurrentValue(arcade.bonuses.reduce((sum, bonus) => sum+bonus.level, 0));
                break;
            default:
                line.updateCurrentValue(0);
                break;
        }
    });

    tome.updateTotalScore();
}