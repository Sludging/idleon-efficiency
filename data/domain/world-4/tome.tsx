import { Domain, RawData } from '../base/domain';
import { Item } from '../items'
import { lavaLog, nFormatter } from '../../utility';
import { Stamp } from '../world-1/stamps';
import { PlayerStatues, StatusType } from '../world-1/statues';
import { Card } from '../cards';
import { Quests } from '../quests';
import { TalentTab, type Player } from '../player';
import { TaskBoard } from '../tasks';
import { Achievement } from '../achievements';
import { Slab } from '../world-5/slab';
import { Constellation } from '../constellations';
import { Alchemy } from '../world-2/alchemy/alchemy';
import { Sigils } from '../world-2/alchemy/sigils';
import { Dungeons } from '../dungeons';
import { POExtra } from '../world-2/postoffice';
import { initTomeRepo } from '../data/TomeRepo';
import { TomeModel } from '../model/tomeModel';
import { TomeScalingEnum } from '../enum/tomeScalingEnum';
import { Worship } from '../world-3/worship';
import { Equinox } from '../world-3/equinox';
import { Refinery } from '../world-3/construction/refinery';
import { AtomCollider } from '../world-3/construction/atomCollider';
import { Deathnote } from '../world-3/construction/deathnote';
import { Construction } from '../world-3/construction/construction';
import { Rift } from './rift';
import { Breeding } from './breeding';
import { Cooking } from './cooking';
import { Lab } from './lab';
import { Sailing } from '../world-5/sailing/sailing';
import { Divinity } from '../world-5/divinity';
import { ElegantSeashell, Gaming, ImmortalSnail } from '../world-5/gaming';
import { ArtifactStatus } from '../world-5/sailing/artifacts';
import { Account } from '../account';
import { Farming } from '../world-6/farming';
import { RoyalArmory } from '../world-6/royalArmory';
import { SushiStation } from '../world-7/sushi';
import { Sneaking } from '../world-6/sneaking';
import { Summoning } from '../world-6/summoning';
import { Arcade } from '../world-2/arcade';
import { Prayer } from '../world-3/prayers';
import { UpgradeVault } from '../upgradeVault';
import { Hole, WisdomMonument } from '../world-5/hole/hole';
import { SkillsIndex } from '../SkillsIndex';
import { initTomeEpilogueBonusRepo, TomeEpilogueBonusBase } from '../data/TomeEpilogueBonusRepo';
import { initTomeBonusRepo } from '../data/TomeBonusRepo';
import { TomeBonusModel } from '../model/tomeBonusModel';
import type { TomeEpilogueBonusModel } from '../model/tomeEpilogueBonusModel';
import { EquipmentSets } from '../misc/equipmentSets';
import { Grimoire } from '../grimoire';
import { Bubba } from '../world-3/bubba';
import { CoralReef } from '../world-7/coralReef';
import { Spelunking } from '../world-7/spelunking';
import type { CrownCountResearchGridBonus, GlimboTradesResearchGridBonus, ResearchGrid } from '../world-7/research';
import { Minehead } from '../world-7/minehead';
import { JellyOperator } from '../world-7/jellyOperator';
import { EventShop } from '../eventShop';

export enum TomeScoreColors {
    Platinum = "#6EE3FF",
    Gold = "#FAC95D",
    Silver = "#CDE3E6",
    Bronze = "#F1A461",
    Background = "#3C2C26"
}

export class TomeEpilogueBonus {
    unlocked: boolean = false;
    boostFromBonuses: number = 0;

    constructor(public index: number, public data: TomeEpilogueBonusModel) { }

    static fromBase(data: TomeEpilogueBonusBase[]) {
        return data.map(bonus => new TomeEpilogueBonus(bonus.index, bonus.data));
    }

    getBonus(score: number): number {
        if (!this.unlocked) return 0;

        return (1 + this.boostFromBonuses / 100) * this.data.x0
            * Math.max(0, Math.pow(Math.floor(Math.max(0, score - this.data.x1) / 100), .7) / (25 + Math.pow(Math.floor(Math.max(0, score - this.data.x1) / 100), .7)))
    }
}
const localTomeBonusModels: TomeBonusModel[] = [
    { index: 6, description: "}x DMG" },
    { index: 7, description: "}x Drop Rate" },
];

export class TomeBonus {
    unlocked: boolean = false;
    tomeScore: number = 0;
    boostFromBonuses: number = 0;
    alchemy?: Alchemy;

    constructor(public index: number, public data: TomeBonusModel) { }

    getBonus(player?: Player): number {
        if (!this.unlocked) return 0;

        const scoreMultiplier = 1 + this.boostFromBonuses / 100;
        switch (this.index) {
            case 0:
                return 10 * Math.pow(Math.floor(this.tomeScore / 100), 0.7) * scoreMultiplier;
            case 1:
                return 4 * Math.pow(Math.floor(Math.max(0, this.tomeScore - 4000) / 100), 0.7) * scoreMultiplier;
            case 2:
                return 2 * Math.pow(Math.floor(Math.max(0, this.tomeScore - 8000) / 100), 0.7) * scoreMultiplier;
            case 3:
                return this.alchemy?.getBubbleBonusForKey("W8", player) ?? 0;
            case 4:
                return this.alchemy?.getBubbleBonusForKey("A9", player) ?? 0;
            case 5:
                return this.alchemy?.getBubbleBonusForKey("M9", player) ?? 0;
            case 6:
                return 4 * Math.pow(Math.floor(this.tomeScore / 1000), 0.4) * scoreMultiplier;
            case 7:
                return 3 * Math.pow(Math.floor(this.tomeScore / 1000), 0.3) * scoreMultiplier;
            default:
                return 0;
        }
    }

    getDescription(player?: Player): string {
        const bonus = this.getBonus(player);
        return this.data.description
            .replace(/{/g, nFormatter(bonus, "Big"))
            .replace(/}/g, nFormatter(1 + bonus / 100, "MultiplierInfo"));
    }
}


export class TomeLine {
    // Current Tome-line values are recalculated from each player's tracked progress
    // before the line score is derived.
    private currentValues: number[] = [];
    private lineScores: number[] = [];
    unlocked: boolean = false;

    constructor(public index: number, public data: TomeModel, charCount: number) {
        for (let i = 0; i < charCount; i++) {
            // 1000 is the default value for lines that are supposed to be "the lowest the better"
            this.currentValues.push(data.scalingType == TomeScalingEnum.inverseDecay ? 1000 : 0);
            this.lineScores.push(0);
        }
    }

    getLineMultiplyer = (playerIndex: number): number => {
        // Just to be safe
        if (playerIndex >= this.currentValues.length) {
            return 0;
        }

        if (!this.unlocked) {
            return 0;
        }

        switch (this.data.scalingType) {
            case TomeScalingEnum.decay:
                if (0 > this.currentValues[playerIndex]) {
                    return 0;
                } else {
                    return Math.pow(1.7 * this.currentValues[playerIndex] / (Number(this.currentValues[playerIndex]) + this.data.keyQty), .7);
                }
            case TomeScalingEnum.decayLog:
                return 2.4 * lavaLog(this.currentValues[playerIndex]) / (2 * lavaLog(this.currentValues[playerIndex]) + this.data.keyQty);
            case TomeScalingEnum.linearToMax:
                return Math.min(1, this.currentValues[playerIndex] / this.data.keyQty);
            case TomeScalingEnum.inverseDecay:
                if (this.currentValues[playerIndex] > 5 * this.data.keyQty) {
                    return 0;
                } else {
                    return Math.pow(1.2 * (6 * this.data.keyQty - this.currentValues[playerIndex]) / (7 * this.data.keyQty - this.currentValues[playerIndex]), 5);
                }
            case TomeScalingEnum.boundedDecay:
                return Math.pow(2 * Math.min(this.data.keyQty, this.currentValues[playerIndex]) / (Math.min(this.data.keyQty, this.currentValues[playerIndex]) + this.data.keyQty), .7)
            default:
                return 0;
        }
    }

    getDisplayOrder = (): number => {
        return this.data.uiPositionIndex;
    }

    getLineDescription = (): string => {
        return this.data.desc?.replace('(Tap for more info)', '').replace('膛', '').trim() ?? '';
    }

    getPlayerScore = (playerIndex: number): number => {
        if (playerIndex >= this.lineScores.length) {
            return 0;
        }

        return this.lineScores[playerIndex];
    }

    getLineName = (): string => {
        return this.data.name?.replace('(Tap for more info)', '').replace('膛', '').trim() ?? '';
    }

    private getPlayerLineScore = (playerIndex: number): number => {
        return Math.ceil(this.getLineMultiplyer(playerIndex) * this.data.totalVal);
    }

    getPlayerCurrentValueDisplay = (playerIndex: number): string => {
        // Just to be safe
        if (playerIndex >= this.currentValues.length) {
            return '';
        }

        switch (this.index) {
            // Big values
            case 8:
            case 14:
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
            case 61:
            case 64:
            case 78:
            case 102:
                return nFormatter(this.currentValues[playerIndex]);
            // Not so big values but with lots of decimals and wanna keep a bit of it
            case 18:
                return nFormatter(Math.round(100 * this.currentValues[playerIndex]) / 100, "CommaNotation");
            // Not so big values with lots of decimals and wanna round it to match in-game display
            case 13:
            case 16:
            case 26:
            case 46:
            case 47:
            case 53:
            case 91:
                return nFormatter(Math.round(this.currentValues[playerIndex]), "CommaNotation");
            case 66:
                return nFormatter(this.currentValues[playerIndex], "Bits");
            default:
                return nFormatter(this.currentValues[playerIndex], "CommaNotation");
        }
    }

    getPlayerLineDisplayColor = (playerIndex: number): string => {
        // Just to be safe
        if (playerIndex >= this.lineScores.length) {
            return TomeScoreColors.Bronze;
        }

        switch (true) {
            case this.lineScores[playerIndex] >= this.data.totalVal:
                return TomeScoreColors.Platinum;
            case this.lineScores[playerIndex] >= this.data.totalVal * 0.75:
                return TomeScoreColors.Gold;
            case this.lineScores[playerIndex] >= this.data.totalVal * 0.5:
                return TomeScoreColors.Silver;
            default:
                return TomeScoreColors.Bronze;
        }
    }

    getLineUnlockLevel = (): number => {
        const displayOrder = this.getDisplayOrder()
        return (500 + (50 * displayOrder + (10 * Math.max(0, displayOrder - 30) + 10 * Math.max(0, displayOrder - 50))));
    }

    updateIsLineUnlocked = (accountTotalLevel: number) => {
        this.unlocked = accountTotalLevel >= this.getLineUnlockLevel();
    }

    updatePlayerCurrentValue = (value: number, playerIndex: number) => {
        if (playerIndex < this.currentValues.length) {
            if (this.currentValues[playerIndex] != value) {
                this.currentValues[playerIndex] = value;
            }
            this.updatePlayerLineScore(playerIndex);
        }
    }

    updateAllPlayersCurrentValue = (value: number) => {
        for (let i = 0; i < this.currentValues.length; i++) {
            this.updatePlayerCurrentValue(value, i);
        }
    }

    private updatePlayerLineScore = (playerIndex: number) => {
        if (playerIndex < this.lineScores.length) {
            this.lineScores[playerIndex] = this.unlocked ? this.getPlayerLineScore(playerIndex) : 0;
        }
    }
}

export class Tome extends Domain {
    lines: TomeLine[] = [];
    private highestScore: number = 0;
    highestScoreIndex: number = 0;
    scoreThresholds: number[] = [];
    epilogueBonuses: TomeEpilogueBonus[] = [];
    unlocked: boolean = false;
    charCount: number = 0;
    totalAccountLevel: number = 0;

    bonuses: TomeBonus[] = [];
    getRawKeys(): RawData[] {
        return [
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        const bonusModels = [
            ...initTomeBonusRepo().map(bonus => bonus.data),
            ...localTomeBonusModels,
        ].sort((bonusA, bonusB) => bonusA.index - bonusB.index);

        this.epilogueBonuses = TomeEpilogueBonus.fromBase(initTomeEpilogueBonusRepo());
        this.bonuses = bonusModels.map(bonus => new TomeBonus(bonus.index, bonus));
        return this;
    }

    parse(data: Map<string, any>): void {
        const tome = data.get(this.dataKey) as Tome;
        const serverVars = data.get("servervars") as Record<string, any>;
        const charCount = data.get("charCount") as number;
        const spelunk = data.get("Spelunk") as any[];

        tome.charCount = charCount;

        tome.scoreThresholds = [];
        if (serverVars && Object.keys(serverVars).includes("TomePct")) {
            tome.scoreThresholds = serverVars["TomePct"] as number[];
        }

        tome.lines = initTomeRepo()
            .map(lineInfo => new TomeLine(lineInfo.index, lineInfo.data, tome.charCount))
            .sort((line1, line2) => line1.getDisplayOrder() - line2.getDisplayOrder());

        // Protect against old accounts.
        if (!spelunk || spelunk.length == 0) {
            return
        }

        // Check how many tome epilog bonuses we unlocked from Spelunking.
        const spelunkEpilogUnlocks = spelunk[13][2] as number;
        tome.epilogueBonuses.forEach(bonus => {
            bonus.unlocked = spelunkEpilogUnlocks > bonus.index;
        });
    }

    updateHighestScore = () => {
        this.highestScore = 0;
        this.highestScoreIndex = 0;

        for (let i = 0; i < this.charCount; i++) {
            const playerScore = this.getPlayerTotalScore(i);
            if (this.highestScore < playerScore) {
                this.highestScore = playerScore;
                this.highestScoreIndex = i;
            }
        }
    }

    getPlayerTotalScore = (charIndex: number) => {
        return this.lines.reduce((sum, line) => sum + line.getPlayerScore(charIndex), 0);
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
    getTomeBonus = (index: number, player?: Player): number => {
        const bonus = this.bonuses.find(bonus => bonus.index == index);
        return bonus?.getBonus(player) ?? 0;
    }

    getEpilogueBonus = (index: number, playerIndex: number = -1): number => {
        const bonus = this.epilogueBonuses.find(bonus => bonus.index == index);

        const scoreToUse = playerIndex >= 0 ? this.getPlayerTotalScore(playerIndex) : this.highestScore;

        return bonus?.getBonus(scoreToUse) ?? 0;
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
    const sushiStation = data.get("sushi") as SushiStation;
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
    const royalArmory = data.get("royalArmory") as RoyalArmory;
    const sneaking = data.get("sneaking") as Sneaking;
    const summoning = data.get("summoning") as Summoning;
    const arcade = data.get("arcade") as Arcade;
    const prayers = data.get("prayers") as Prayer[];
    const upgVault = data.get("upgradeVault") as UpgradeVault;
    const hole = data.get("hole") as Hole;
    const equipmentSet = data.get("equipmentSets") as EquipmentSets;
    const grimoire = data.get("grimoire") as Grimoire;
    const bubba = data.get("bubba") as Bubba;
    const coralReef = data.get("coralReef") as CoralReef;
    const spelunking = data.get("spelunking") as Spelunking;
    const researchGrid = data.get("research") as ResearchGrid;
    const minehead = data.get("minehead") as Minehead;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;


    // Count obtained trophies, obols, and equipment nametags from the Slab.
    const slab = data.get("slab") as Slab;
    let trophyCount: number = 0;
    let obolCount: number = 0;
    let nametagCount: number = 0;
    slab.obtainableItems.forEach((item) => {
        if (item.obtained) {
            if (item.internalName.indexOf("Trophy") == 0) {
                trophyCount++;
            } else if (item.internalName.indexOf("Obol") == 0) {
                obolCount++;
            } else if (item.internalName.indexOf("EquipmentNametag") == 0) {
                nametagCount++;
            }
        }
    });

    // Sum all skill levels across players.
    const sumOfSkillsLevels = players.reduce((sum, player) =>
        sum + [...player.skills.values()].reduce((skillSum, skill) => skillSum + skill.level, 0),
        0);

    // Total level of all stamps
    const stampsTotalLevels = stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + stamp.level, 0);

    // Total star levels across all cards.
    const cardsTotalLevels = cards.reduce((sum, card) => sum + (card.count > 0 ? card.getLevels() + 1 : 0), 0);

    // Sum of the highest level for each talent; shared talents count once.
    const talentsSumHighestLevel = account.talentsMaxLevels.reduce((sum, talentMaxLevel) => sum + Math.round(talentMaxLevel), 0);

    // Total levels of all players.
    const totalPlayersLevels = players.reduce((sum, player) => sum + player.level, 0);

    // Sum of non-daily task rank levels.
    const tasksCompleted = taskBoard.tasks.reduce((sum, task) => sum + (task.isDaily() ? 0 : task.level), 0);

    // Number of achievements completed
    const achievementsCompleted = achievements.filter(achievement => achievement.completed).length;

    // Total afk time claimed
    const totalAFKTime = (taskBoard.tasks.find(task => task.index == 2)?.count ?? 0);

    // Number of constellations completed
    const constellationCompleted = constellations.reduce((sum, constellation) => sum + (constellation.isComplete ? 1 : 0), 0);

    // Sum of visible and hidden alchemy bubble levels.
    const totalBubblesLevel = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).reduce((sum, bubble) => sum + bubble.level, 0) + alchemy.cauldrons.reduce((sum, cauldron) => sum + cauldron.hiddenBubbleLevels, 0);

    // Sum of all vials levels
    const totalVialsLevels = alchemy.vials.reduce((sum, vial) => sum + vial.level, 0);

    // Sum of effective sigil levels (boostLevel + 1).
    const totalSigilsLevels = sigils.sigils.reduce((sum, sigil) => sum + (sigil.boostLevel + 1), 0);

    // Sum of best worship waves
    const totalBestWorshipWaves = worshipData.totemInfo.reduce((sum, totem) => sum + totem.maxWave, 0);

    // Sum of digit counts for all Deathnote kill totals.
    let totalDeathnoteDigits = 0;
    const killsMap = deathnote.getKillsMap();
    [...killsMap.entries()].forEach(([_, deathnoteMobs]) => {
        totalDeathnoteDigits += [...deathnoteMobs.values()].reduce((sum, killCount) => sum + Math.ceil(lavaLog(killCount)), 0);
    });

    // Number of completed equinox challenges/cloud
    const completedEquinoxCloud = equinoxData.challenges.filter(challenge => challenge.complete).length;

    // Sum ranks for the six refinery rows used by the game.
    const totalRefineryRanks = Object.values(refineryData.salts)
        .slice(0, 6)
        .reduce((sum, refinery) => sum + refinery.rank, 0);

    // Sum of Atoms upgrades levels
    const totalAtomUpgradeLevels = atomCollider.atoms.reduce((sum, atom) => sum + atom.level, 0);

    // Sum of construction buildings levels 
    const totalBuildingsLevel = construction.buildings.reduce((sum, building) => sum + building.level, 0);

    // Number of Tottoise in storage
    const tottoiseInStorage = storage.amountInStorage("Critter11A");

    // Highest power among pets in the fenceyard, storage, and territories.
    const highestPowerPet = Math.max(
        0, // default value if there's no pets
        ...breeding.fenceyardPets.map(pet => pet.power),
        ...breeding.storedPets.map(pet => pet.power),
        ...breeding.territory.flatMap(territory => territory.pets.map(pet => pet.power))
    );

    // Sum of Kitchen luck, recipe, and meal upgrade levels.
    const totalKitchenLevels = cooking.kitchens.reduce((sum, kitchen) => sum + kitchen.luckLevels + kitchen.recipeLevels + kitchen.mealLevels, 0);

    // Sum of Shiny pet bonus levels.
    const totalShinyLevels = breeding.shinyBonuses.reduce((sum, bonus) => sum + bonus.totalLevels, 0);

    // Sum of all meals levels
    const totalMealLevels = cooking.meals.reduce((sum, meal) => sum + meal.level, 0);

    // Sum of base pet breedability levels, excluding placeholder pets.
    const totalPetBreedingLevels = breeding.basePets.filter(pet => pet.data.petId != "_").reduce((sum, pet) => sum + pet.breedingLevel, 0);

    // Total Lab chips: global chip counts plus occupied player-chip slots.
    const labChipsOwned = lab.chips.reduce((sum, chip) => sum + chip.count, 0) + Object.entries(lab.playerChips).reduce((sum, [_, chips]) => sum + chips.filter(chip => chip && chip.data).length, 0);

    // Sum of all Colosseum highscores.
    const totalColoHighscore = account.coloHighscores.reduce((sum, score) => sum + score, 0);

    // Sum of boat loot and speed upgrade levels.
    const totalBoatLevels = sailing.boats.reduce((sum, boat) => sum + boat.lootUpgrades + boat.speedUpgrades, 0);

    // Weighted artifact progression by status: Obtained +1, Ancient +2, Eldritch +3, Sovereign +4, Omnipotent +5, Transcendent +6.
    const totalArtifactFound = sailing.artifacts.reduce((sum, artifact) =>
        artifact.status == ArtifactStatus.Obtained ? sum + 1
            : artifact.status == ArtifactStatus.Ancient ? sum + 2
                : artifact.status == ArtifactStatus.Eldritch ? sum + 3
                    : artifact.status == ArtifactStatus.Sovereign ? sum + 4
                        : artifact.status == ArtifactStatus.Omnipotent ? sum + 5
                            : artifact.status == ArtifactStatus.Transcendent ? sum + 6
                                : sum + 0
        , 0);

    // Highest Sailing captain level.
    const highestLevelCaptain = Math.max(0, ...sailing.captains.map(captain => captain.level));

    // Highest Crop OG value, derived as 2^OptionsListAccount[219].
    const highestCropOG = Math.pow(2, optionListAccount[219] ?? 0);

    // Number of discovered crops; use the Farming depot because CropScientist is not loaded yet when updating the Tome.
    const cropsDiscovered = farming.cropDepot.filter(crop => crop.discovered).length;

    // Total Golden Food Beanstacks, represented by the sum of Beanstalking bonus levels.
    const beanStacks = sneaking.beanstalking.bonuses.reduce((sum, bonus) => sum + bonus.level, 0);

    // Sum of Summoning upgrade levels.
    const totalSummoningUpgradeLevels = summoning.summonUpgrades.reduce((sum, upgrade) => sum + upgrade.level, 0);

    // Total Summoning victories.
    const summoningVictories = summoning.summonBattles.getTotalVictories();

    // Number of Ninja floors unlocked
    let ninjaFloorsUnlocked = 0;
    if (0 < (optionListAccount[232] ?? 0)) {
        ninjaFloorsUnlocked = 12 * optionListAccount[232];
    } else {
        ninjaFloorsUnlocked = Math.min(12, sneaking.getUnlockedFloors());
    }

    // Weighted Summoning familiar count; tiers above Slime use cumulative multipliers.
    let totalFamiliarsOwned = 0;
    let multiplyer = 1;
    let i = 0;
    for (i = 0; i < 9; i++) {
        totalFamiliarsOwned += multiplyer * summoning.summonFamiliarRaw[i];
        multiplyer *= i + 3;
    }

    // Total of all summoning boss victories
    const totalSummoningBossesVictories = summoning.summonEssences.reduce((sum, essence) => sum += essence.stoneBossVictories, 0);

    // Number of displayed Jade Emporium upgrades purchased.
    const jadeEmporiumUpgradesBought = sneaking.jadeUpgrades.filter(upgrade => upgrade.display && upgrade.purchased).length;

    // Sum of all ninja upgrades levels
    const totalNinjaUpgradeLevels = sneaking.sneakingUpgrades.reduce((sum, upgrade) => sum + upgrade.level, 0);

    // Sum of all minigame highscores plus the Trapping minigame score.
    const totalMinigamesScores = account.minigameHighscores.reduce((sum, score) => sum + score, 0) + (optionListAccount[99] ?? 0);

    // Sum of Prayer upgrade levels.
    const totalPrayersLevels = prayers.reduce((sum, prayer) => sum + prayer.level, 0);

    // Sum of farm plot Land Rank levels.
    const totalPlotRank = farming.farmPlots.reduce((sum, plot) => sum + plot.landRank, 0);

    // Sum of Arcade Gold Ball shop upgrade levels.
    const totalArcadeUpgradeLevel = arcade.bonuses.reduce((sum, bonus) => sum + bonus.level, 0);

    // Total Gambit time in seconds.
    const totalGambitTime = hole.gambit.getGambitTotalTime();

    // Sum of digit counts for resources extracted from Hole caverns.
    const totalDigitsHoleResources = hole.well.getTotalResourceDigits();

    // Sum of Hole villager levels.
    const totalVillagersLevels = hole.villagers.reduce((sum, villager) => sum + villager.level, 0);

    // Sum of resource layers destroyed in the Hole.
    const totalDestroyedResourceLayers = hole.resourceCavrens.getTotalResourceLayers();

    // Highest Spelunker skill level across all players.
    const highestSpelunkingLevel = Math.max(0, ...players.map(player => player.skills.get(SkillsIndex.Spelunking)?.level ?? 0));

    // Number of reclaimed King Rat Crowns from Research Grid bonus 67.
    const crownBonus = researchGrid.bonuses[67] as CrownCountResearchGridBonus;
    const researchCrownCount = crownBonus.crownCount;

    // Research Grid points spent, represented by the sum of upgrade levels.
    const researchGridPointsSpent = researchGrid.bonuses.reduce((sum, bonus) => sum + bonus.level, 0);

    // Total Glimbo trades completed from Research Grid bonus 168.
    const glimboBonus = researchGrid.bonuses[168] as GlimboTradesResearchGridBonus;
    const totalResearchGlimboTrades = glimboBonus.totalGlimboTrades;

    tome.totalAccountLevel = totalPlayersLevels;
    tome.lines.forEach(line => {
        line.updateIsLineUnlocked(tome.totalAccountLevel);

        switch (line.index) {
            case 0:
                // Total Level of all stamps
                line.updateAllPlayersCurrentValue(stampsTotalLevels);
                break;
            case 1:
                // Sum of this player's statue levels.
                for (let i = 0; i < statues.length; i++) {
                    line.updatePlayerCurrentValue(statues[i].statues.reduce((sum, statue) => sum + statue.level, 0), i);
                }
                break;
            case 2:
                // Sum of discovered card levels.
                line.updateAllPlayersCurrentValue(cardsTotalLevels);
                break;
            case 3:
                // Sum of the highest level for each talent; shared talents count once.
                line.updateAllPlayersCurrentValue(talentsSumHighestLevel);
                break;
            case 4:
                // Number of quests completed (by account, not by player)
                line.updateAllPlayersCurrentValue(questsData.getTotalQuestsComplete());
                break;
            case 5:
                // Total levels of all players.
                line.updateAllPlayersCurrentValue(totalPlayersLevels);
                break;
            case 6:
                // Sum of non-daily task rank levels.
                line.updateAllPlayersCurrentValue(tasksCompleted);
                break;
            case 7:
                // Number of achievements completed
                line.updateAllPlayersCurrentValue(achievementsCompleted);
                break;
            case 8:
                // Most money held in Storage
                line.updateAllPlayersCurrentValue((optionListAccount[198] ?? 0));
                break;
            case 9:
                // Most Spore caps held in Storage
                line.updateAllPlayersCurrentValue((optionListAccount[208] ?? 0));
                break;
            case 10:
                // Number of different trophies found
                line.updateAllPlayersCurrentValue(trophyCount);
                break;
            case 11:
                // Sum of all skills levels of all players
                line.updateAllPlayersCurrentValue(sumOfSkillsLevels);
                break;
            case 12:
                // Best spike trap round reached
                line.updateAllPlayersCurrentValue((optionListAccount[201] ?? 0));
                break;
            case 13:
                // Total afk hours claimed
                line.updateAllPlayersCurrentValue(totalAFKTime);
                break;
            case 14:
                // DPS record on Shimmer Island on dummy in W2
                line.updateAllPlayersCurrentValue((optionListAccount[172] ?? 0));
                break;
            case 15:
                // Star Talent points are character-specific.
                players.forEach((player, playerIndex) => {
                    const starTalentPoints = player.talentPoints.find(talentPoints => talentPoints.tab === TalentTab.SpecialTab)?.totalOwned ?? 0;
                    line.updatePlayerCurrentValue(starTalentPoints, playerIndex);
                });
                break;
            case 16:
                // Average kills per Crystal Spawn, stored as a reciprocal because lower is better.
                line.updateAllPlayersCurrentValue((1 / (optionListAccount[202] ?? 1)));
                break;
            case 17:
                // Dungeon rank
                line.updateAllPlayersCurrentValue(dungeonsData.rank);
                break;
            case 18:
                // Highest drop multiplier.
                line.updateAllPlayersCurrentValue((optionListAccount[200] ?? 0));
                break;
            case 19:
                // Number of constellations completed
                line.updateAllPlayersCurrentValue(constellationCompleted);
                break;
            case 20:
                // Highest damage dealt to gravestone (weekly battle in W2 town)
                line.updateAllPlayersCurrentValue((optionListAccount[203] ?? 0));
                break;
            case 21:
                // Number of different Obols found
                line.updateAllPlayersCurrentValue(obolCount);
                break;
            case 22:
                // Sum of visible and hidden Alchemy bubble levels.
                line.updateAllPlayersCurrentValue(totalBubblesLevel);
                break;
            case 23:
                // Sum of all vials levels
                line.updateAllPlayersCurrentValue(totalVialsLevels);
                break;
            case 24:
                // Sum of effective sigil levels (boostLevel + 1).
                line.updateAllPlayersCurrentValue(totalSigilsLevels);
                break;
            case 25:
                // Number of times Jackpot is hit in arcade
                line.updateAllPlayersCurrentValue((optionListAccount[199] ?? 0));
                break;
            case 26:
                // Sum of complete, miscellaneous, and streak Post Office box counts.
                line.updateAllPlayersCurrentValue(postOfficeData.complete + postOfficeData.misc + postOfficeData.streak);
                break;
            case 27:
                // Highest Killroy score on a Warrior
                line.updateAllPlayersCurrentValue((optionListAccount[204] ?? 0));
                break;
            case 28:
                // Highest Killroy score on an Archer
                line.updateAllPlayersCurrentValue((optionListAccount[205] ?? 0));
                break;
            case 29:
                // Highest Killroy score on a Mage
                line.updateAllPlayersCurrentValue((optionListAccount[206] ?? 0));
                break;
            case 30:
                // Fastest time to kill Efaunt, stored as 1,000 minus the recorded time for inverse scaling.
                line.updateAllPlayersCurrentValue(1E3 - (optionListAccount[207] ?? 0));
                break;
            case 31:
                // Largest Oak Log sample
                line.updateAllPlayersCurrentValue((optionListAccount[211] ?? 0));
                break;
            case 32:
                // Largest Copper Ore sample
                line.updateAllPlayersCurrentValue((optionListAccount[212] ?? 0));
                break;
            case 33:
                // Largest Spore Cap sample
                line.updateAllPlayersCurrentValue((optionListAccount[213] ?? 0));
                break;
            case 34:
                // Largest Goldfish sample
                line.updateAllPlayersCurrentValue((optionListAccount[214] ?? 0));
                break;
            case 35:
                // Largest Fly sample
                line.updateAllPlayersCurrentValue((optionListAccount[215] ?? 0));
                break;
            case 36:
                // Best non-duplicate Goblin Gorefest wave in Worship.
                line.updateAllPlayersCurrentValue((optionListAccount[209] ?? 0));
                break;
            case 37:
                // Sum of the best waves across all Worship totems.
                line.updateAllPlayersCurrentValue(totalBestWorshipWaves);
                break;
            case 38:
                // Sum of digit counts for all Deathnote kill totals.
                line.updateAllPlayersCurrentValue(totalDeathnoteDigits);
                break;
            case 39:
                // Number of equinox cloud completed
                line.updateAllPlayersCurrentValue(completedEquinoxCloud);
                break;
            case 40:
                // Sum of the ranks of the six Refinery rows used by the game.
                line.updateAllPlayersCurrentValue(totalRefineryRanks);
                break;
            case 41:
                // Sum of Atom upgrade levels
                line.updateAllPlayersCurrentValue(totalAtomUpgradeLevels);
                break;
            case 42:
                // Sum of construction buildings levels
                line.updateAllPlayersCurrentValue(totalBuildingsLevel);
                break;
            case 43:
                // Current Tottoise count in Storage; the game label says most, but this is the current amount.
                line.updateAllPlayersCurrentValue(tottoiseInStorage);
                break;
            case 44:
                // Most Greenstacks in storage
                line.updateAllPlayersCurrentValue((optionListAccount[224] ?? 0));
                break;
            case 45:
                // Number of Rift levels completed
                line.updateAllPlayersCurrentValue(rift.level);
                break;
            case 46:
                // Highest power among pets in the fenceyard, storage, and territories.
                line.updateAllPlayersCurrentValue(highestPowerPet);
                break;
            case 47:
                // Fastest time to reach Arena Round 100, stored as 1,000 minus the recorded time for inverse scaling.
                line.updateAllPlayersCurrentValue(1E3 - (optionListAccount[220] ?? 0));
                break;
            case 48:
                // Sum of Kitchen luck, recipe, and meal upgrade levels.
                line.updateAllPlayersCurrentValue(totalKitchenLevels);
                break;
            case 49:
                // Sum of Shiny pet bonus levels.
                line.updateAllPlayersCurrentValue(totalShinyLevels);
                break;
            case 50:
                // Sum of all meals levels
                line.updateAllPlayersCurrentValue(totalMealLevels);
                break;
            case 51:
                // Sum of base pet breedability levels, excluding placeholder pets.
                line.updateAllPlayersCurrentValue(totalPetBreedingLevels);
                break;
            case 52:
                // Total Lab chips: global chip counts plus occupied player-chip slots.
                line.updateAllPlayersCurrentValue(labChipsOwned);
                break;
            case 53:
                // Sum of all Colosseum highscores.
                line.updateAllPlayersCurrentValue(totalColoHighscore);
                break;
            case 54:
                // Most Giants killed in a single week
                line.updateAllPlayersCurrentValue((optionListAccount[217] ?? 0));
                break;
            case 55:
                // Number of Onyx statues
                for (let i = 0; i < statues.length; i++) {
                    line.updatePlayerCurrentValue((statues[i].statues.filter(statue => statue && statue.type >= StatusType.Onyx).length ?? 0), i);
                }
                break;
            case 56:
                // Fastest time to kill 200 Tremor Wurms, stored as 1,000 minus the recorded time for inverse scaling.
                line.updateAllPlayersCurrentValue(1E3 - (optionListAccount[218] ?? 0));
                break;
            case 57:
                // Sum of boat loot and speed upgrade levels.
                line.updateAllPlayersCurrentValue(totalBoatLevels);
                break;
            case 58:
                // Divinity God Rank.
                line.updateAllPlayersCurrentValue(divinity.godRank);
                break;
            case 59:
                // Number of evolved Gaming plants.
                line.updateAllPlayersCurrentValue((gaming.importBoxes.find(box => box.index == 3) as ElegantSeashell).plantsEvolved ?? 0);
                break;
            case 60:
                // Weighted artifact progression by status: Obtained +1, Ancient +2, Eldritch +3, Sovereign +4, Omnipotent +5, Transcendent +6.
                line.updateAllPlayersCurrentValue(totalArtifactFound);
                break;
            case 61:
                // Sailing gold bars owned
                line.updateAllPlayersCurrentValue((sailing.loot[0] ?? 0));
                break;
            case 62:
                // Highest Sailing captain level.
                line.updateAllPlayersCurrentValue(highestLevelCaptain);
                break;
            case 63:
                // Highest immortal snail level
                line.updateAllPlayersCurrentValue(((gaming.importBoxes.find(box => box.index == 7) as ImmortalSnail).highestSnailLevel ?? 0));
                break;
            case 64:
                // Best gold nugget
                line.updateAllPlayersCurrentValue(gaming.biggestGoldNugget);
                break;
            case 65:
                // Number of items found.
                line.updateAllPlayersCurrentValue(slab.rawObtainedCount);
                break;
            case 66:
                // Gaming bits owned.
                line.updateAllPlayersCurrentValue(gaming.currenBitsOwned);
                break;
            case 67:
                // Highest Crop OG value, derived as 2^OptionsListAccount[219].
                line.updateAllPlayersCurrentValue(highestCropOG);
                break;
            case 68:
                // Number of crops discovered
                line.updateAllPlayersCurrentValue(cropsDiscovered);
                break;
            case 69:
                // Total Golden Food Beanstacks, represented by the sum of Beanstalking bonus levels.
                line.updateAllPlayersCurrentValue(beanStacks);
                break;
            case 70:
                // Sum of all summoning upgrade levels
                line.updateAllPlayersCurrentValue(totalSummoningUpgradeLevels);
                break;
            case 71:
                // Total Summoning victories.
                line.updateAllPlayersCurrentValue(summoningVictories);
                break;
            case 72:
                // Number of ninja floors unlocked
                line.updateAllPlayersCurrentValue(ninjaFloorsUnlocked);
                break;
            case 73:
                // Weighted Summoning familiar count; tiers above Slime use cumulative multipliers.
                line.updateAllPlayersCurrentValue(totalFamiliarsOwned);
                break;
            case 74:
                // Number of displayed Jade Emporium upgrades purchased.
                line.updateAllPlayersCurrentValue(jadeEmporiumUpgradesBought);
                break;
            case 75:
                // Sum of all minigame highscores plus the Trapping minigame score.
                line.updateAllPlayersCurrentValue(totalMinigamesScores);
                break;
            case 76:
                // Sum of Prayer upgrade levels.
                line.updateAllPlayersCurrentValue(totalPrayersLevels);
                break;
            case 77:
                // Sum of farm plot Land Rank levels.
                line.updateAllPlayersCurrentValue(totalPlotRank);
                break;
            case 78:
                // Largest Magic Bean trade
                line.updateAllPlayersCurrentValue((optionListAccount[221] ?? 0));
                break;
            case 79:
                // Most balls earned from LBoFaF (bonus balls from arcade)
                line.updateAllPlayersCurrentValue((optionListAccount[222] ?? 0));
                break;
            case 80:
                // Sum of Arcade Gold Ball shop upgrade levels.
                line.updateAllPlayersCurrentValue(totalArcadeUpgradeLevel);
                break;
            case 81:
                // Teh TOM bonus from Upgrade Vault bonus 57.
                line.updateAllPlayersCurrentValue(upgVault.bonuses.find(bonus => bonus.id == 57)?.getBonus(upgVault.bonuses) ?? 0);
                break;
            case 82:
                // Total Gambit time in seconds.
                line.updateAllPlayersCurrentValue(totalGambitTime);
                break;
            case 83:
                // Sum of digit counts for resources extracted from Hole caverns.
                line.updateAllPlayersCurrentValue(totalDigitsHoleResources);
                break;
            case 84:
                // Sum of Hole villager levels.
                line.updateAllPlayersCurrentValue(totalVillagersLevels);
                break;
            case 85:
                // Megafeathers earned from the Orion minigame.
                line.updateAllPlayersCurrentValue((optionListAccount[262] ?? 0));
                break;
            case 86:
                // Megafish earned from the Poppy minigame.
                line.updateAllPlayersCurrentValue((optionListAccount[279] ?? 0));
                break;
            case 87:
                // Best Bravery Monument round.
                line.updateAllPlayersCurrentValue(hole.monuments.monuments["Bravery"].highestRound);
                break;
            case 88:
                // Best Justice Monument round.
                line.updateAllPlayersCurrentValue(hole.monuments.monuments["Justice"].highestRound);
                break;
            case 89:
                // Best Wisdom Monument round.
                line.updateAllPlayersCurrentValue(hole.monuments.monuments["Wisdom"].highestRound);
                break;
            case 90:
                // Best Deathbringer max damage in Wraith mode.
                line.updateAllPlayersCurrentValue((optionListAccount[356] ?? 0));
                break;
            case 91:
                // Best Dawg Den score
                line.updateAllPlayersCurrentValue(hole.dawgDen.bestScore);
                break;
            case 92:
                // Sum of resource layers destroyed in the Hole.
                line.updateAllPlayersCurrentValue(totalDestroyedResourceLayers);
                break;
            case 93:
                // Total Opals found in the Hole.
                line.updateAllPlayersCurrentValue(hole.ownedOpals);
                break;
            case 94:
                // Best Pure Memory round reached.
                line.updateAllPlayersCurrentValue((hole.monuments.monuments["Wisdom"] as WisdomMonument).highestPureMemoryRound);
                break;
            case 95:
                // Current World 6 Spirited Valley Emperor boss kills; resets when the bonuses are reset.
                line.updateAllPlayersCurrentValue(Math.round(optionListAccount[369] ?? 0));
                break;
            case 96:
                // Total Summoning boss stone victories.
                line.updateAllPlayersCurrentValue(totalSummoningBossesVictories);
                break;
            case 97:
                // Sum of Coral Reef upgrade levels.
                line.updateAllPlayersCurrentValue(coralReef.upgrades.reduce((sum, upgrade) => sum += upgrade.level, 0));
                break;
            case 98:
                // Deepest Delve depth reached in a single run.
                line.updateAllPlayersCurrentValue(spelunking.getDeepestDelveDepth());
                break;
            case 99:
                // Sum of Ninja Knowledge upgrade levels.
                line.updateAllPlayersCurrentValue(totalNinjaUpgradeLevels);
                break;
            case 100:
                // Best Windwalker max damage in Tempest mode.
                line.updateAllPlayersCurrentValue(optionListAccount[445] ?? 0);
                break;
            case 101:
                // Best Arcane Cultist max damage in Arcanist mode.
                line.updateAllPlayersCurrentValue(optionListAccount[446] ?? 0);
                break;
            case 102:
                // Biggest haul in a single Delve.
                line.updateAllPlayersCurrentValue(spelunking.getBiggestDelveHaul());
                break;
            case 103:
                // Total Spelunk Shop upgrade levels.
                line.updateAllPlayersCurrentValue(spelunking.getTotalShopUpgradeLevels());
                break;
            case 104:
                // Total Spelunk discoveries made.
                line.updateAllPlayersCurrentValue(spelunking.getTotalDiscoveries());
                break;
            case 105:
                // Highest Spelunker skill level across all players.
                line.updateAllPlayersCurrentValue(highestSpelunkingLevel);
                break;
            case 106:
                // Number of Lava Dev Streams watched.
                line.updateAllPlayersCurrentValue(optionListAccount[443] ?? 0);
                break;
            case 107:
                // Number of Nametags found.
                line.updateAllPlayersCurrentValue(nametagCount);
                break;
            case 108:
                // Megaflesh earned from Bubba.
                line.updateAllPlayersCurrentValue(bubba.ownedMegaflesh);
                break;
            case 109:
                // Premium Hats found.
                line.updateAllPlayersCurrentValue(spelunking.premiumHatsFound);
                break;
            case 110:
                // Number of Minehead opponents defeated.
                line.updateAllPlayersCurrentValue(minehead.getOpponentsDefeated());
                break;
            case 111:
                // Number of King Rat Crowns reclaimed through the Research Grid.
                line.updateAllPlayersCurrentValue(researchCrownCount);
                break;
            case 112:
                // Number of Farming stickers discovered.
                line.updateAllPlayersCurrentValue(farming.getTotalStickers());
                break;
            case 113:
                // Tournament registrations, currently mapped to OptionsListAccount[498].
                // TODO: confirm this mapping.
                line.updateAllPlayersCurrentValue(optionListAccount[498] ?? 0);
                break;
            case 114:
                // Research Grid points spent, represented by the sum of upgrade levels.
                line.updateAllPlayersCurrentValue(researchGridPointsSpent);
                break;
            case 115:
                // Total Glimbo trades completed from Research Grid bonus 168.
                line.updateAllPlayersCurrentValue(totalResearchGlimboTrades);
                break;
            case 116:
                // Unique Sushi created.
                line.updateAllPlayersCurrentValue(sushiStation.getUniqueSushi());
                break;
            case 117:
                // Button presses, currently mapped to OptionsListAccount[594].
                // TODO: confirm this mapping.
                line.updateAllPlayersCurrentValue(optionListAccount[594] ?? 0);
                break;
            case 118:
                // Total levels of Royal Statues.
                line.updateAllPlayersCurrentValue(royalArmory.getTotalRoyalStatueLevels());
                break;
            case 119:
                // Number of Royal Guardian outposts built.
                line.updateAllPlayersCurrentValue(royalArmory.getTotalStat(4));
                break;
            case 120:
                // Total Royal Armory resource grade.
                line.updateAllPlayersCurrentValue(royalArmory.getTotalStat(0));
                break;
            case 121:
                line.updateAllPlayersCurrentValue(jellyOperator.getSuccessfulOperations());
                break;
            default:
                line.updateAllPlayersCurrentValue(0);
                break;
        }
    });

    tome.updateHighestScore();
    // If at least one line of the higesht score player is unlocked, Tome is considered unlocked
    tome.unlocked = tome.lines.some(line => line.unlocked);

    // Update Tome Epilogue bonuses
    const grimoireBonus = grimoire.getUpgradeBonus(17);
    const equipmentSetBonus = equipmentSet.getSetBonus("TROLL_SET", undefined, true);
    tome.epilogueBonuses.forEach(bonus => {
        bonus.boostFromBonuses = grimoireBonus + equipmentSetBonus;
    });
}

export const updateTomeBonuses = (data: Map<string, any>) => {
    const tome = data.get("tome") as Tome;
    const alchemy = data.get("alchemy") as Alchemy;
    const grimoire = data.get("grimoire") as Grimoire;
    const equipmentSet = data.get("equipmentSets") as EquipmentSets;
    const eventShop = data.get("eventShop") as EventShop;
    const optionListAccount = data.get("OptLacc") as number[];
    const tomeScore = tome.getHighestScore();
    const boostFromBonuses = grimoire.getUpgradeBonus(17) + equipmentSet.getSetBonus("TROLL_SET", undefined, true);

    // Several tome bonuses get unlocked by certain conditions.
    const unlockedByIndex: Record<number, boolean> = {
        0: true,
        1: optionListAccount[196] === 1,
        2: optionListAccount[197] === 1,
        3: alchemy.getBubbleBonusForKey("W8") > 0,
        4: alchemy.getBubbleBonusForKey("A9") > 0,
        5: alchemy.getBubbleBonusForKey("M9") > 0,
        6: eventShop.isBonusOwned(0),
        7: eventShop.isBonusOwned(27),
    };

    tome.bonuses.forEach(bonus => {
        bonus.unlocked = unlockedByIndex[bonus.index] ?? false;
        bonus.tomeScore = tomeScore;
        bonus.boostFromBonuses = boostFromBonuses;
        bonus.alchemy = alchemy;
    });

    return tome;
}
