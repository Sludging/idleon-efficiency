import { Domain, RawData } from './base/domain';
import { Item } from './items'
import { lavaLog, nFormatter } from '../utility';
import { Stamp } from './stamps';
import { PlayerStatues, StatusType } from './statues';
import { Card } from './cards';
import { Quests } from './quests';
import { Player, TalentTab } from './player';
import { TaskBoard } from './tasks';
import { Achievement } from './achievements';
import { Slab } from './slab';
import { Constellation } from './constellations';
import { Alchemy } from './alchemy';
import { Sigils } from './sigils';
import { Dungeons } from './dungeons';
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
    accountTotalLevel: number = 0;
    unlocked: boolean = false;

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

    private getLineScore = (): number => {
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

    getLineUnlockLevel = (): number => {
        return (500 + (50 * TomeLineUnlockLevel[this.index] + (10 * Math.max(0, TomeLineUnlockLevel[this.index] - 30) + 10 * Math.max(0, TomeLineUnlockLevel[this.index] - 50))));
    }

    private updateIsLineUnlocked = () => {
        this.unlocked = this.accountTotalLevel >= this.getLineUnlockLevel();
    }

    updateCurrentValue = (value: number, totalAccountLevel: number) => {
        if (this.currentValue != value) {
            this.currentValue = value;
        }
        if (this.accountTotalLevel != totalAccountLevel) {
            this.accountTotalLevel = totalAccountLevel;
            this.updateIsLineUnlocked();
        }
        this.updateLineScore();
    }

    private updateLineScore = () => {
        this.lineScore = this.unlocked ? this.getLineScore() : 0;
    }
}

export class Tome extends Domain {
    // Per player
    lines: TomeLine[][] = [];
    private highestScore: number = 0;
    highestScoreIndex: number = 0;
    scoreThresholds: number[] = [];
    unlocked: boolean = false;
    numberOfLines: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "OptLacc", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const tome = data.get(this.dataKey) as Tome;
        const serverVars = data.get("servervars") as Record<string, any>;
        const charCount = data.get("charCount") as number;

        tome.scoreThresholds = [];
        if (serverVars && Object.keys(serverVars).includes("TomePct")) {
            tome.scoreThresholds = serverVars["TomePct"] as number[];
        }
        
        tome.lines = [];
        for (var i = 0; i < charCount; i++) {
            tome.lines.push([]);
        }
        const tomeLinesBase = initTomeRepo();
        tome.numberOfLines = tomeLinesBase.length;
        tomeLinesBase.forEach(lineInfo => {
            for (var i = 0; i < charCount; i++) {
                tome.lines[i].push(new TomeLine(lineInfo.index,lineInfo.data,tomeLineDisplayOrder.indexOf(lineInfo.index)));
            }
        });
    }

    updateHighestScore = () => {
        this.highestScore = 0;
        this.highestScoreIndex = 0;
        
        for (var i = 0; i < this.lines.length; i++) {
            const playerScore = this.lines[i].reduce((sum, line) => sum+line.lineScore, 0);
            if (this.highestScore < playerScore) {
                this.highestScore = playerScore;
                this.highestScoreIndex = i;
            }
        }
    }

    getScoreRankingDisplay = (): string => {
        switch (true) {
            case (this.scoreThresholds.length >= 7 && this.highestScore >= this.scoreThresholds[6]):
                return 'Top 0.1%';
            case (this.scoreThresholds.length >= 6 && this.highestScore >= this.scoreThresholds[5]):
                return 'Top 0.5%';
            case (this.scoreThresholds.length >= 5 && this.highestScore >= this.scoreThresholds[4]):
                return 'Top 1%';
            case (this.scoreThresholds.length >= 4 && this.highestScore >= this.scoreThresholds[3]):
                return 'Top 5%';
            case (this.scoreThresholds.length >= 3 && this.highestScore >= this.scoreThresholds[2]):
                return 'Top 10%';
            case (this.scoreThresholds.length >= 2 && this.highestScore >= this.scoreThresholds[1]):
                return 'Top 25%';
            case (this.scoreThresholds.length >= 1 && this.highestScore >= this.scoreThresholds[0]):
                return 'Top 50%';
            default:
                return '';
        }
    }

    getHighestScore = (): number => {
        return this.unlocked ? this.highestScore : 0;
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

    // Sum of all skills levels of all players
    const sumOfSkillsLevels = players.reduce((sum, player) => {
        var skillTotalLv: number = 0;
        player.skills.forEach((skill) => {
            skillTotalLv += skill.level;
        });
        return sum + skillTotalLv;
    }, 0);

    // Total level of all stamps
    const stampsTotalLevels = stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + stamp.level, 0);

    // Total level of all cards
    const cardsTotalLevels = cards.reduce((sum, card) => sum + (card.count > 0 ? card.getStars()+1 : 0), 0);

    // Sum of highest level for each talent
    const talentsSumHighestLevel = account.talentsMaxLevels.reduce((sum, talentMaxLevel) => sum + talentMaxLevel, 0);

    // Sum of players Levels
    const totalPlayersLevels = players.reduce((sum, player) => sum + player.level, 0);

    // Number of tasks completed
    const tasksCompleted = taskBoard.tasks.reduce((sum, task) => sum + (task.isDaily() ? 0 : task.level), 0);

    // Number of achievements completed
    const achievementsCompleted = achievements.filter(achievement => achievement.completed).length;

    // Total afk time claimed
    const totalAFKTime = (taskBoard.tasks.find(task => task.index == 2)?.count ?? 0);

    // Number of constellations completed
    const constellationCompleted = constellations.reduce((sum, constellation) => sum + (constellation.isComplete ? 1 : 0), 0);

    // Sum of all bubbles levels
    const totalBubblesLevel = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).reduce((sum, bubble) => sum + bubble.level, 0)+alchemy.cauldrons.reduce((sum, cauldron) => sum + cauldron.hiddenBubbleLevels, 0);

    // Sum of all vials levels
    const totalVialsLevels = alchemy.vials.reduce((sum, vial) => sum+vial.level,0);

    // Sum of all sigils levels
    const totalSigilsLevels = sigils.sigils.reduce((sum, sigil) => sum+(sigil.boostLevel+1),0);

    // Sum of best worship waves
    const totalBestWorshipWaves = worshipData.totemInfo.reduce((sum, totem) => sum+totem.maxWave, 0);

    // Sum of all deathnote kills digit
    var totalDeathnoteDigits = 0;
    const killsMap = deathnote.getKillsMap();
    [...killsMap.entries()].forEach(([_, deathnoteMobs]) => {
        totalDeathnoteDigits += [...deathnoteMobs.values()].reduce((sum, killCount) => sum+Math.ceil(lavaLog(killCount)), 0);
    });

    // Number of completed equinox challenges/cloud
    const completedEquinoxCloud = equinoxData.challenges.filter(challenge => challenge.complete).length;

    // Sum of all refinery ranks
    const totalRefineryRanks = Object.entries(refineryData.salts).reduce((sum, [_, refinery]) => sum+refinery.rank, 0);

    // Sum of Atoms upgrades levels
    const totalAtomUpgradeLevels = atomCollider.atoms.reduce((sum, atom) => sum+atom.level, 0);

    // Sum of construction buildings levels 
    const totalBuildingsLevel = construction.buildings.reduce((sum, building) => sum+building.level, 0);

    // Number of Tottoise in storage
    const tottoiseInStorage = storage.amountInStorage("Critter11A");

    // Highest power pet
    const highestPowerPet = Math.max(
        0, // default value if there's no pets
        ...breeding.fenceyardPets.map(pet => pet.power), 
        ...breeding.storedPets.map(pet => pet.power), 
        ...breeding.territory.flatMap(territory => territory.pets.map(pet => pet.power))
    );

    // Sum of kitchens levels
    const totalKitchenLevels = cooking.kitchens.reduce((sum, kitchen) => sum+kitchen.luckLevels+kitchen.recipeLevels+kitchen.mealLevels, 0);

    // Sum of shiny pet bonuses levels
    const totalShinyLevels = breeding.shinyBonuses.reduce((sum, bonus) => sum+bonus.totalLevels, 0);

    // Sum of all meals levels
    const totalMealLevels = cooking.meals.reduce((sum, meal) => sum+meal.level, 0);

    // Sum of all pet breeding level
    const totalPetBreedingLevels = breeding.basePets.filter(pet => pet.data.petId != "_").reduce((sum, pet) => sum+pet.breedingLevel, 0);

    // Number of lab chips owned
    const labChipsOwned = lab.chips.reduce((sum, chip) => sum+chip.count, 0)+Object.entries(lab.playerChips).reduce((sum, [_, chips]) => sum+chips.filter(chip => chip && chip.data).length, 0);

    // Sum of all colosseum highscores
    const totalColoHighscore = account.coloHighscores.reduce((sum, score) => sum+score, 0);

    // Sum of all boats levels
    const totalBoatLevels = sailing.boats.reduce((sum, boat) => sum+boat.lootUpgrades+boat.speedUpgrades, 0);

    // Number of artifact found
    const totalArtifactFound = sailing.artifacts.reduce((sum, artifact) => 
        artifact.status == ArtifactStatus.Obtained ? sum+1
        : artifact.status == ArtifactStatus.Ancient ? sum+2
        : artifact.status == ArtifactStatus.Eldritch ? sum+3
        : artifact.status == ArtifactStatus.Sovereign ? sum+4 
        : 0
    , 0);

    // Highest level captain
    const highestLevelCaptain = Math.max(0, ...sailing.captains.map(captain => captain.level));

    // Highest Crop OG
    const highestCropOG = Math.pow(2, optionListAccount[219] ?? 0);

    // Number of crops discovered
    // Use this instead of the value in CropScientist as it's not loaded yet when updating the Tome
    const cropsDiscovered = farming.cropDepot.filter(crop => crop.discovered).length;

    // Number of beanstack
    const beanStacks = sneaking.beanstalking.bonuses.reduce((sum, bonus) => sum+bonus.level, 0);

    // Sum of all summoning upgrades levels
    const totalSummoningUpgradeLevels = summoning.summonUpgrades.reduce((sum, upgrade) => sum+upgrade.level, 0);

    // Sum of summoning victories
    const summoningVictories = summoning.summonBattles.allVictories.reduce((sum, victories) => sum+victories, 0);

    // Number of Ninja floors unlocked
    var ninjaFloorsUnlocked = 0;
    if (0 < (optionListAccount[232] ?? 0)) {
        ninjaFloorsUnlocked = 12 * optionListAccount[232];
    } else {
        ninjaFloorsUnlocked = Math.min(12, sneaking.getUnlockedFloors());
    }

    // Number of summoning familiar (with multiplyer for those above slime)
    var totalFamiliarsOwned = 0;
    var multiplyer = 1;
    var i = 0;
    for (i = 0; i < 9; i++) {
        totalFamiliarsOwned += multiplyer * summoning.summonFamiliarRaw[i];
        multiplyer *= i + 3;
    }

    // Number of Jade Emporium upgrades bought
    const jadeEmporiumUpgradesBought = sneaking.jadeUpgrades.filter(upgrade => upgrade.display && upgrade.purchased).length;

    // Sum of all minigame scores, including basket
    const totalMinigamesScores = account.minigameHighscores.reduce((sum, score) => sum+score, 0) + (optionListAccount[99] ?? 0);

    // Sum of all prayers levels
    const totalPrayersLevels = prayers.reduce((sum, prayer) => sum+prayer.level, 0);

    // Sum of all farming plots land rank
    const totalPlotRank = farming.farmPlots.reduce((sum, plot) => sum+plot.landRank, 0);

    // SUm of all gold ball upgrade levels in arcade
    const totalArcadeUpgradeLevel = arcade.bonuses.reduce((sum, bonus) => sum+bonus.level, 0);

    for(var i = 0; i < tome.numberOfLines; i++) {
        for(var p = 0; p < tome.lines.length; p++) {
            const line = tome.lines[p][i];                
            switch(line.index) {
                case 0:
                    // Total Level of all stamps
                    line.updateCurrentValue(stampsTotalLevels, totalPlayersLevels);
                    break;
                case 1:
                    // Sum of statues levels
                    line.updateCurrentValue(statues[p].statues.reduce((sum, statue) => sum+statue.level,0), totalPlayersLevels);
                    break;
                case 2:
                    // Sum of cards levels
                    line.updateCurrentValue(cardsTotalLevels, totalPlayersLevels);
                    break;
                case 3:
                    // Sum of highest level of each talent (if multiple classes share a same talent, can be counted only once)
                    line.updateCurrentValue(talentsSumHighestLevel, totalPlayersLevels);
                    break;
                case 4:
                    // Number of quests completed (by account, not by player)
                    line.updateCurrentValue(completedQuests, totalPlayersLevels);
                    break;
                case 5:
                    // Sum of players levels
                    line.updateCurrentValue(totalPlayersLevels, totalPlayersLevels);
                    break;
                case 6:
                    // Number of tasks completed (except dailies)
                    line.updateCurrentValue(tasksCompleted, totalPlayersLevels);
                    break;
                case 7:
                    // Number of achievements completed
                    line.updateCurrentValue(achievementsCompleted, totalPlayersLevels);
                    break;
                case 8:
                    // Most money held in Storage
                    line.updateCurrentValue((optionListAccount[198] ?? 0), totalPlayersLevels);
                    break;
                case 9:
                    // Most Spore caps held in Storage
                    line.updateCurrentValue((optionListAccount[208] ?? 0), totalPlayersLevels);
                    break;
                case 10:
                    // Number of different trophies found
                    line.updateCurrentValue(trophyCount, totalPlayersLevels);
                    break;
                case 11:
                    // Sum of all skills levels of all players
                    line.updateCurrentValue(sumOfSkillsLevels, totalPlayersLevels);
                    break;
                case 12:
                    // Best spike trap round reached
                    line.updateCurrentValue((optionListAccount[201] ?? 0), totalPlayersLevels);
                    break;
                case 13:
                    // Total afk hours claimed
                    line.updateCurrentValue(totalAFKTime, totalPlayersLevels);
                    break;
                case 14:
                    // DPS record on Shimmer Island on dummy in W2
                    line.updateCurrentValue((optionListAccount[172] ?? 0), totalPlayersLevels);
                    break;
                case 15:
                    // Sum of star talent points owned
                    line.updateCurrentValue((players[p].talentPoints.find(talentPoints => talentPoints.tab == TalentTab.SpecialTab)?.totalOwned ?? 0), totalPlayersLevels);
                    break;
                case 16:
                    // Lowest average kill for crystal spawn
                    line.updateCurrentValue((1 / (optionListAccount[202] ?? 1)), totalPlayersLevels);
                    break;
                case 17:
                    // Dungeon rank
                    line.updateCurrentValue(dungeonsData.rank, totalPlayersLevels);
                    break;
                case 18:
                    // Highest drop multi
                    line.updateCurrentValue((optionListAccount[200] ?? 0), totalPlayersLevels);
                    break;
                case 19:
                    // Number of constellations completed
                    line.updateCurrentValue(constellationCompleted, totalPlayersLevels);
                    break;
                case 20:
                    // Highest damage dealt to gravestone (weekly battle in W2 town)
                    line.updateCurrentValue((optionListAccount[203] ?? 0), totalPlayersLevels);
                    break;
                case 21:
                    // Number of different Obols found
                    line.updateCurrentValue(obolCount, totalPlayersLevels);
                    break;
                case 22:
                    // Sum of all alchemy bubbles levels
                    line.updateCurrentValue(totalBubblesLevel, totalPlayersLevels);
                    break;
                case 23:
                    // Sum of all vials levels
                    line.updateCurrentValue(totalVialsLevels, totalPlayersLevels);
                    break;
                case 24:
                    // Sum of sigils level in alchemy
                    line.updateCurrentValue(totalSigilsLevels, totalPlayersLevels);
                    break;
                case 25:
                    // Number of times Jackpot is hit in arcade
                    line.updateCurrentValue((optionListAccount[199] ?? 0), totalPlayersLevels);
                    break;
                case 26:
                    // Sum of all post office boxes found
                    line.updateCurrentValue(postOfficeData.complete + postOfficeData.misc + postOfficeData.streak, totalPlayersLevels);
                    break;
                case 27:
                    // Highest Killroy score on a Warrior
                    line.updateCurrentValue((optionListAccount[204] ?? 0), totalPlayersLevels);
                    break;
                case 28:
                    // Highest Killroy score on an Archer
                    line.updateCurrentValue((optionListAccount[205] ?? 0), totalPlayersLevels);
                    break;
                case 29:
                    // Highest Killroy score on a Mage
                    line.updateCurrentValue((optionListAccount[206] ?? 0), totalPlayersLevels);
                    break;
                case 30:
                    // Fastest time to kill Efaunt
                    line.updateCurrentValue(1E3 - (optionListAccount[207] ?? 0), totalPlayersLevels);
                    break;
                case 31:
                    // Largest Oak Log sample
                    line.updateCurrentValue((optionListAccount[211] ?? 0), totalPlayersLevels);
                    break;
                case 32:
                    // Largest Copper Ore sample
                    line.updateCurrentValue((optionListAccount[212] ?? 0), totalPlayersLevels);
                    break;
                case 33:
                    // Largest Spore Cap sample
                    line.updateCurrentValue((optionListAccount[213] ?? 0), totalPlayersLevels);
                    break;
                case 34:
                    // Largest Goldfish sample
                    line.updateCurrentValue((optionListAccount[214] ?? 0), totalPlayersLevels);
                    break;
                case 35:
                    // Largest Fly sample
                    line.updateCurrentValue((optionListAccount[215] ?? 0), totalPlayersLevels);
                    break;
                case 36:
                    // Best non duplicate Goblin Gorefest wave (worship)
                    line.updateCurrentValue((optionListAccount[209] ?? 0), totalPlayersLevels);
                    break;
                case 37:
                    // Sum of best waves for worship
                    line.updateCurrentValue(totalBestWorshipWaves, totalPlayersLevels);
                    break;
                case 38:
                    // Total digits of all Deathnote kills                    
                    line.updateCurrentValue(totalDeathnoteDigits, totalPlayersLevels);
                    break;
                case 39:
                    // Number of equinox cloud completed
                    line.updateCurrentValue(completedEquinoxCloud, totalPlayersLevels);
                    break;
                case 40:
                    // Sum of Refinery rank
                    line.updateCurrentValue(totalRefineryRanks, totalPlayersLevels);
                    break;
                case 41:
                    // Sum of Atom upgrade levels
                    line.updateCurrentValue(totalAtomUpgradeLevels, totalPlayersLevels);
                    break;
                case 42:
                    // Sum of construction buildings levels
                    line.updateCurrentValue(totalBuildingsLevel, totalPlayersLevels);
                    break;
                case 43:
                    // Most Tottoise in storage (actually it says Most but it's current)
                    line.updateCurrentValue(tottoiseInStorage, totalPlayersLevels);
                    break;
                case 44:
                    // Most Greenstacks in storage
                    line.updateCurrentValue((optionListAccount[224] ?? 0), totalPlayersLevels);
                    break;
                case 45:
                    // Number of Rift levels completed
                    line.updateCurrentValue(rift.level, totalPlayersLevels);
                    break;
                case 46:
                    // Highest pet power
                    line.updateCurrentValue(highestPowerPet, totalPlayersLevels);
                    break;
                case 47:
                    // Fastest time to reach Round 100 in Arena
                    line.updateCurrentValue(1E3 - (optionListAccount[220] ?? 0), totalPlayersLevels);
                    break;
                case 48:
                    // Sum of all kitchen levels
                    line.updateCurrentValue(totalKitchenLevels, totalPlayersLevels);
                    break;
                case 49:
                    // Sum of all shiny pets levels
                    line.updateCurrentValue(totalShinyLevels, totalPlayersLevels);
                    break;
                case 50:
                    // Sum of all meals levels
                    line.updateCurrentValue(totalMealLevels, totalPlayersLevels);
                    break;
                case 51:
                    // Sum of all pet breedability levels
                    line.updateCurrentValue(totalPetBreedingLevels, totalPlayersLevels);
                    break;
                case 52:
                    // Number of lab chips owned
                    line.updateCurrentValue(labChipsOwned, totalPlayersLevels);
                    break;
                case 53:
                    // Total colosseum score
                    line.updateCurrentValue(totalColoHighscore, totalPlayersLevels);
                    break;
                case 54:
                    // Most Giants killed in a single week
                    line.updateCurrentValue((optionListAccount[217] ?? 0), totalPlayersLevels);
                    break;
                case 55:
                    // Number of Onyx statues
                    line.updateCurrentValue((statues[p].statues.filter(statue => statue && statue.type == StatusType.Onyx).length ?? 0), totalPlayersLevels);
                    break;
                case 56:
                    // Fastest time to kill 200 Tremor wurms
                    line.updateCurrentValue(1E3 - (optionListAccount[218] ?? 0), totalPlayersLevels);
                    break;
                case 57:
                    // Sum of all sailing boats levels
                    line.updateCurrentValue(totalBoatLevels, totalPlayersLevels);
                    break;
                case 58:
                    // God ranks in divinity
                    line.updateCurrentValue(divinity.godRank, totalPlayersLevels);
                    break;
                case 59:
                    // Total gaming plants evolved
                    line.updateCurrentValue(((gaming.importBoxes.find(box => box.index == 3) as ElegantSeashell).plantsEvolved ?? 0), totalPlayersLevels);
                    break;
                case 60:
                    // Number of artifacts found
                    line.updateCurrentValue(totalArtifactFound, totalPlayersLevels);
                    break;
                case 61:
                    // Sailing gold bars owned
                    line.updateCurrentValue((sailing.loot[0] ?? 0), totalPlayersLevels);
                    break;
                case 62:
                    // Highest sailing capitain level
                    line.updateCurrentValue(highestLevelCaptain, totalPlayersLevels);
                    break;
                case 63:
                    // Highest immortal snail level
                    line.updateCurrentValue(((gaming.importBoxes.find(box => box.index == 7) as ImmortalSnail).highestSnailLevel ?? 0), totalPlayersLevels);
                    break;
                case 64:
                    // Best gold nugget
                    line.updateCurrentValue(gaming.biggestGoldNugget, totalPlayersLevels);
                    break;
                case 65:
                    // Number of items found
                    line.updateCurrentValue(slab.rawObtainedCount, totalPlayersLevels);
                    break;
                case 66:
                    // Gaming bits owned
                    line.updateCurrentValue(gaming.currenBitsOwned, totalPlayersLevels);
                    break;
                case 67:
                    // Highest Crop OG
                    line.updateCurrentValue(highestCropOG, totalPlayersLevels);
                    break;
                case 68:
                    // Number of crops discovered
                    line.updateCurrentValue(cropsDiscovered, totalPlayersLevels);
                    break;
                case 69:
                    // Number of golden food goldstack
                    line.updateCurrentValue(beanStacks, totalPlayersLevels);
                    break;
                case 70:
                    // Sum of all summoning upgrade levels
                    line.updateCurrentValue(totalSummoningUpgradeLevels, totalPlayersLevels);
                    break;
                case 71:
                    // Number of summoning wins
                    line.updateCurrentValue(summoningVictories, totalPlayersLevels);
                    break;
                case 72:
                    // Number of ninja floors unlocked
                    line.updateCurrentValue(ninjaFloorsUnlocked, totalPlayersLevels);
                    break;
                case 73:
                    // Familiars owned in Summoning
                    line.updateCurrentValue(totalFamiliarsOwned, totalPlayersLevels);
                    break;
                case 74:
                    // Number of Jade Emporium upgrades bought
                    line.updateCurrentValue(jadeEmporiumUpgradesBought, totalPlayersLevels);
                    break;
                case 75:
                    // Sum of all highest minigame highscore (also includes catching hoop from optionListAccount)
                    line.updateCurrentValue(totalMinigamesScores, totalPlayersLevels);
                    break;
                case 76:
                    // Sum of all prayer upgrade levels
                    line.updateCurrentValue(totalPrayersLevels, totalPlayersLevels);
                    break;
                case 77:
                    // Sum of all plot land rank levels
                    line.updateCurrentValue(totalPlotRank, totalPlayersLevels);
                    break;
                case 78:
                    // Largest Magic Bean trade
                    line.updateCurrentValue((optionListAccount[221] ?? 0), totalPlayersLevels);
                    break;
                case 79:
                    // Most balls earned from LBoFaF (bonus balls from arcade)
                    line.updateCurrentValue((optionListAccount[222] ?? 0), totalPlayersLevels);
                    break;
                case 80:
                    // Sum of all Gold Ball shop upgrades levels
                    line.updateCurrentValue(totalArcadeUpgradeLevel, totalPlayersLevels);
                    break;
                default:
                    line.updateCurrentValue(0, totalPlayersLevels);
                    break;
            }
        };
    }

    tome.updateHighestScore();
    // If at least one line of the higesht score player is unlocked, Tome is considered unlocked
    tome.unlocked = tome.lines[tome.highestScoreIndex].some(line => line.unlocked);
}

// engine.getGameAttribute("CustomLists").h.NinjaInfo[32]
const TomeLineUnlockLevel = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    53,
    10,
    11,
    12,
    75,
    13,
    14,
    80,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    79,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    76,
    38,
    54,
    40,
    41,
    42,
    39,
    44,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    45,
    55,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    56,
    65,
    66,
    67,
    68,
    69,
    20,
    70,
    71,
    43,
    72,
    73,
    74,
    77,
    78
]