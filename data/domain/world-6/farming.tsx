import { SkillsIndex } from "../SkillsIndex";
import { Domain, RawData } from "../base/domain";
import { initMarketInfoRepo } from "../data/MarketInfoRepo";
import { initSeedInfoRepo } from "../data/SeedInfoRepo";
import { Item } from "../items";
import { MarketInfoModel } from "../model/marketInfoModel";
import { SeedInfoModel } from "../model/seedInfoModel";
import { Player } from "../player";
import { ImageData } from "../imageData";
import { nFormatter } from '../../utility';
import { GemStore } from '../gemPurchases';
import { Lab } from '../lab';
import { Summoning } from './summoning';
import { Stamp } from '../world-1/stamps';
import { Alchemy } from '../alchemy';
import { JadeUpgrade, Sneaking } from "./sneaking";
import { Cooking } from "../cooking";
import { Rift, SkillMastery } from '../rift';
import { StarSigns } from "../starsigns";
import { Achievement } from "../achievements";
import { KillRoy } from "../world-2/killroy";
import { Votes } from "../world-2/votes";
import { TaskBoard } from "../tasks";
import { Grimoire } from "../grimoire";
import { LegendTalents } from "../world-7/legendTalents";

export class LandRankDataBase {
    unlocked: boolean = false;
    upgrades: LandRankUpgrade[] = [];
    totalLandRanks: number = 0;
    spentLandRanksPoints: number = 0;

    constructor() {
        // Do this until the wiki bot can send us those data
        this.upgrades.push(new LandRankUpgrade(0,"Evolution Boost","Increases next crop chance by +{% per rank of the land plot",250,1,false));
        this.upgrades.push(new LandRankUpgrade(1,"Production Boost","Boosts value of crops harvested by +{% per rank of the land plot",5,5,false));
        this.upgrades.push(new LandRankUpgrade(2,"Soil Exp Boost","Each land gains +{% extra Rank EXP per rank of the previous land",25,20,false));
        this.upgrades.push(new LandRankUpgrade(3,"Evolution Megaboost","Increases next crop chance by +{% multiplicatively!",600,30,false));
        this.upgrades.push(new LandRankUpgrade(4,"Seed of Stealth","Increases the Stealth of all Ninja Twins by +{% per Farming LV",2,60,true));
        this.upgrades.push(new LandRankUpgrade(5,"Farmtastic Boost","Increases Farming Skill EXP gained by +{%",90,80,false));
        this.upgrades.push(new LandRankUpgrade(6,"Soil Exp Megaboost","All plots of land gain +{% more Rank EXP",200,125,false));
        this.upgrades.push(new LandRankUpgrade(7,"Overgrowth Boost","Increases chance for Overgrowth by +{%",120,180,false));
        this.upgrades.push(new LandRankUpgrade(8,"Production Megaboost","Increases the amount of crops harvested by +{%",100,250,false));
        this.upgrades.push(new LandRankUpgrade(9,"Seed of Loot","Increases the Drop Rarity of all characters by +{%",10,400,true));
        this.upgrades.push(new LandRankUpgrade(10,"Evolution Superboost","Increases next crop chance by +{% multiplicatively!",3000,500,false));
        this.upgrades.push(new LandRankUpgrade(11,"Overgrowth Megaboost","Increases chance for Overgrowth by +{%",340,600,false));
        this.upgrades.push(new LandRankUpgrade(12,"Farmtastic Megaboost","Increases Farming Skill EXP gained by +{%",110,700,false));
        this.upgrades.push(new LandRankUpgrade(13,"Soil Exp Superboost","All plots of land gain +{% more Rank EXP",520,900,false));
        this.upgrades.push(new LandRankUpgrade(14,"Seed of Damage","Gives a +{% Total Damage bonus to all characters",20,1200,true));
        this.upgrades.push(new LandRankUpgrade(15,"Evolution Ultraboost","Increases next crop chance by +{% multiplicatively!",40000,1300,false));
        this.upgrades.push(new LandRankUpgrade(16,"Farmtastic Superboost","Increases Farming Skill EXP gained by +{%",220,1500,false));
        this.upgrades.push(new LandRankUpgrade(17,"Production Superboost","Increases the amount of crops harvested by +{%",600,1750,false));
        this.upgrades.push(new LandRankUpgrade(18,"Overgrowth Superboost","Increases chance for Overgrowth by +{%",1500,2000,false));
        this.upgrades.push(new LandRankUpgrade(19,"Seed of Stats","Gives a +{% All Stat bonus to your characters",5,3500,true));
    }

    // This function send the sum of all bonus from a same type, Lava use this in his code so having it here helps to "translate" his code into IE code
    getTotalUpgradeBonusForBonus = (bonusType: LandRankBonusType): number => {
        switch(bonusType) {
            case LandRankBonusType.NextCropChance:
                return (1 + this.getUpgradeBonusByIndex(3) / 100) * (1 + this.getUpgradeBonusByIndex(10) / 100) * (1 + this.getUpgradeBonusByIndex(15) / 100);
            case LandRankBonusType.AmountHarvested:
                return this.getUpgradeBonusByIndex(8) + this.getUpgradeBonusByIndex(17);
            case LandRankBonusType.LandRankEXP:
                return this.getUpgradeBonusByIndex(6) + this.getUpgradeBonusByIndex(13);
            case LandRankBonusType.OGChance:
                return this.getUpgradeBonusByIndex(7) + (this.getUpgradeBonusByIndex(11) + this.getUpgradeBonusByIndex(18));
            case LandRankBonusType.FarmingSkillExp:
                return this.getUpgradeBonusByIndex(5) + (this.getUpgradeBonusByIndex(12) + this.getUpgradeBonusByIndex(16));
            default: return 1;
        }
    }

    getUpgradeBonusByIndex = (index: number): number => {
        const upgrade = this.upgrades.find(upgrade => upgrade.index == index);
        if (upgrade) {
            return upgrade.getUpgradeBonus();
        }
        return 0;
    }
}

export class LandRankUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    maxLevel: number = 1;

    constructor(public index: number, public name: string, public bonusText: string, public bonus: number, public unlockThreshold: number, public fifthColumnBonus: boolean) {}

    getUpgradeBonus = () => {
        if (!this.unlocked) {
            return 0;
        }

        switch(this.index) {
            case 4:
            case 9:
            case 14:
            case 19:
                return this.bonus * this.level;
            default: 
                return 1.7 * this.bonus * this.level / (this.level + 80);
        }
    }

    getUpgradeBonusText = () => {
        return this.bonusText.replace(/{/, this.getUpgradeBonus().toFixed(2));
    }
}

export class MarketUpgrade {
    level: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: MarketInfoModel) {}

    getTotalCostUntilLevel = (currentLevel: number = this.level, targetLevel: number = this.data.maxLvl): MarketUpgradeCost[] => {
        const costs: MarketUpgradeCost[] = [];

        for (let i = currentLevel; i < targetLevel; i++) {
            const cost = this.getNextLevelCost(i);

            const foundCost = costs.find(foundCost => foundCost.cropId == cost.cropId);
            if (foundCost) {
                foundCost.cropQuantity += cost.cropQuantity;
            } else {
                costs.push(cost);
            }
        }        

        return costs;
    }

    getNextLevelCost = (currentLevel: number = this.level): MarketUpgradeCost => {
        let cropId = 0;
        if (this.index > 7) {
            // Means it's night market so no crop cost, only magic beans
            cropId = -1;
        } else {
            if (this.index == 0) {
                // Special calcul for the first upgrade
                cropId = Math.floor(this.data.cropId + this.data.cropIdIncrement * (currentLevel + (2 * Math.floor(currentLevel / 3) + Math.floor(currentLevel / 4))));
            } else {
                cropId = Math.floor(this.data.cropId + this.data.cropIdIncrement * currentLevel);
            }
        }

        const cropCost = (this.data.maxLvl > currentLevel ? Math.floor(this.data.cost * Math.pow(this.data.costExponent, (currentLevel))) : 0);
        
        return {cropId: cropId, cropQuantity: cropCost};
    }
}

export class Crop {
    discovered: boolean = false;
    quantityOwned: number = 0;
    
    constructor(public index: number, public seed: Seed) { }

    static getCropIconData = (cropId: number): ImageData => {
        return {
            location: `FarmCrop${cropId}`,
            height: 20,
            width: 20
        }
    }

    static getMagicBeanIconData = (): ImageData => {
        return {
            location: `FarmCropBean`,
            height: 20,
            width: 20
        }
    }

    static getCropTransferTicketIconData = (): ImageData => {
        return {
            location: `Quest80_x1`,
            height: 20,
            width: 20
        }
    }
}

export class Seed {
    constructor(public index: number = -1, public data: SeedInfoModel) { }

    getFullCycleGrowthTime = (): number => {
        if (this.index == -1) {
            return 0
        } else {
            return 14400 * Math.pow(1.5, this.index);
        }
    }
}

export class Plot {
    seed: Seed | undefined = undefined;
    // CropId
    cropIndex: number = 0;
    // If true can't evolve, but can still OverGrow
    locked: boolean = false;
    // Time in seconds since last Collecting or Planting, it stop incrementing once the plant is fully grown
    growthTime: number = 0;
    // Base quantity of crops to be collected 
    quantityToCollect: number = 0;
    // Level of Overgrowth 
    OGlevel: number = 0;
    // seconds since last cycle have ended, reset to 0 once an overgrow cycle end
    // Only start incrementing when plant is fully grown
    overgrowthTime: number = 0;
    
    // Multiplyer from multiples sources
    minimumQuantityMultiplyer: number = 0;
    maximumQuantityMultiplyer: number = 0;

    growthRate: number = 0;

    possibleBaseQtyToCollectMin: number = 0;
    possibleBaseQtyToCollectMax: number = 0;

    nextOGChanceAllBonusEffect: number = 0;
    bonusOGChanceFromStarSign67: number = 0;

    landRank: number = 0;
    previousPlotLandRank: number = 0;
    landExp: number = 0;

    overgrowthCycleCompletedSinceLastLoggin: number = 0;
    saveTime: number = 0;
    lastRefresh: number = 0;

    // used to calculate Next Crop Chance
    farmingLevel: number = 0;
    nextCropChanceAllBonusEffect: number = 0;
    bonusCropChanceFromStarSign65: number = 0;

    readyToCollect: boolean = false;

    constructor(public index: number) { }

    updateNextCropChance = (farmingLevel: number, summoningLevel: number, bonusFromMarketUpgrade4: number, bonusFromMarketUpgrade9: number, bonusFromWinningBonus10: number, bonusFromAlchemyBubbleCropChapter: number, bonusFromAlchemyBubbleCropiusMapper: number, bonusFromVial66: number, bonusFromMeal62: number, bonusFromMeal66: number, bonusFromStampCropEvo: number, bonusFromStarSign65: number, bonusFromRiftFarming1: number, bonusFromAchievement355: number, bonusFromKillRoy1: number, bonusFromLandRankTotalEvoChance: number, bonusFromLandRankEvoChanceFromCurrentRank: number, bonusFromVoting29: number) => {
        this.bonusCropChanceFromStarSign65 = bonusFromStarSign65;
        this.farmingLevel = farmingLevel;
        // Needs to add (1 + n._customBlock_Holes("LampBonuses", 2, 0) / 100) from new update
        this.nextCropChanceAllBonusEffect = (1 + bonusFromMarketUpgrade4 / 100) * (1 + bonusFromWinningBonus10 / 100) * (1 + bonusFromAlchemyBubbleCropChapter / 100) * (1 + bonusFromAlchemyBubbleCropiusMapper / 100) * (1 + bonusFromVial66 / 100) * (1 + bonusFromMeal62 / 100) * (1 + bonusFromStampCropEvo / 100) * (1 + bonusFromMeal66 * Math.ceil((summoningLevel + 1) / 50) / 100) * (1 + bonusFromAchievement355 / 100) * Math.max(1, bonusFromKillRoy1) * Math.max(1, bonusFromMarketUpgrade9) * (1 + bonusFromRiftFarming1 / 100) * Math.max(1, bonusFromLandRankTotalEvoChance) * (1 + (bonusFromLandRankEvoChanceFromCurrentRank * this.landRank + bonusFromVoting29) / 100);
    }

    updatePlotNextOGchance = (bonusFromMarketUpgrade11: number, bonusFromPristineCharm11: number, bonusFromStarSign67: number, bonusFromTaskBoard: number, bonusFromAchievement365: number, bonusOGChanceFromLandRankTotal: number) => {
        this.bonusOGChanceFromStarSign67 = bonusFromStarSign67;
        this.nextOGChanceAllBonusEffect = Math.max(1, bonusFromMarketUpgrade11) * (1 + bonusFromPristineCharm11 / 100) * (1 + bonusFromTaskBoard / 100) * (1 + bonusFromAchievement365 / 100) * (1 + bonusOGChanceFromLandRankTotal / 100);     
    }

    updatePlotCropQuantityMultiplyer = (bonusFromMarket5: number, bonusFromLandRankTotal: number, bonusFromLandRankCurrent: number, bonusFromVoting: number) => {
        this.minimumQuantityMultiplyer = Math.min(100, Math.round(Math.max(1, Math.floor(1 + (0 + bonusFromMarket5 / 100))) * (1 + bonusFromLandRankTotal / 100) * (1 + (bonusFromLandRankCurrent * this.landRank + bonusFromVoting) / 100)));
        this.maximumQuantityMultiplyer = Math.min(100, Math.round(Math.max(1, Math.floor(1 + (0.9999 + bonusFromMarket5 / 100))) * (1 + bonusFromLandRankTotal / 100) * (1 + (bonusFromLandRankCurrent * this.landRank + bonusFromVoting) / 100)));
    }

    updatePlotGrowthSinceLastRefresh = () => {
        const time = new Date();
        const gapFromLastRefresh = (time.getTime() / 1000) - this.lastRefresh;
        this.lastRefresh = (time.getTime() / 1000);

        let timeLeftToUse = gapFromLastRefresh * this.growthRate;
        const cycleDuration = this.seed?.getFullCycleGrowthTime() ?? 0;

        // Nothing to do for empty plots.
        if (cycleDuration == 0) {
            return;
        }

        if (this.growthTime < cycleDuration) {
            const timeLeftForCycle = cycleDuration - this.growthTime;
            if (timeLeftToUse > timeLeftForCycle) {
                timeLeftToUse -= timeLeftForCycle;
                this.growthTime += timeLeftForCycle;
                this.readyToCollect = true;
            } else {
                this.growthTime += timeLeftToUse;
                timeLeftToUse = 0;
            }
        }

        while (timeLeftToUse > 0) {
            const timeLeftForCycle = cycleDuration - this.overgrowthTime;
            if (timeLeftToUse > timeLeftForCycle) {
                timeLeftToUse -= timeLeftForCycle;
                this.overgrowthTime = 0;
                this.overgrowthCycleCompletedSinceLastLoggin++;
            } else {
                this.overgrowthTime += timeLeftToUse;
                timeLeftToUse = 0;
            }
        }
    }

    getEvolutionChance = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        if (this.farmingLevel < 2 || !this.seed || this.index == this.seed.data.cropIdMax) {
            return 0;            
        } else {                
            const seedBaseEvolutionChance = 0.3; // should be seed.data.nextCropChance but Lava seems to use 0.3 for every seed
            return this.nextCropChanceAllBonusEffect * this.getNextCropChanceStarSignBonus(starSignEquipped, silkrodeBonus) * (seedBaseEvolutionChance) * Math.pow(this.seed.data.nextCropDecay, (this.cropIndex - this.seed.data.cropIdMin));
        }
    }

    getPlotNextOGChance = (starSignEquipped: boolean, silkrodeBonus: boolean, currentOGlevel: number = this.OGlevel) => {
        return Math.pow(0.4, currentOGlevel + 1) * this.nextOGChanceAllBonusEffect * this.getOGChanceStarSignBonus(starSignEquipped, silkrodeBonus);
    }

    getNextCropChanceStarSignBonus = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? (1 + ((this.bonusCropChanceFromStarSign65 * 2) * this.farmingLevel) / 100) : (1 + (this.bonusCropChanceFromStarSign65 * this.farmingLevel) / 100)) : 1;
    }

    getOGChanceStarSignBonus = (starSignEquipped: boolean, silkrodeBonus: boolean) => {
        return starSignEquipped ? (silkrodeBonus ? (1 + (this.bonusOGChanceFromStarSign67*2) / 100) : (1 + this.bonusOGChanceFromStarSign67 / 100)) : 1;
    }

    getGrowthStage(): PlotGrowthStage {
        const cycleTime = this.seed?.getFullCycleGrowthTime() ?? 0;

        switch (true) {
            case this.seed == undefined || this.seed?.index == -1 || cycleTime == 0: return PlotGrowthStage.Empty;
            case this.readyToCollect == true: return PlotGrowthStage.Grown;
            case this.growthTime >= (cycleTime * 4/5): return PlotGrowthStage.GrowStage4;
            case this.growthTime >= (cycleTime * 3/5): return PlotGrowthStage.GrowStage3;
            case this.growthTime >= (cycleTime * 2/5): return PlotGrowthStage.GrowStage2;
            case this.growthTime >= (cycleTime * 1/5): return PlotGrowthStage.GrowStage1;
            case this.growthTime >= 0: return PlotGrowthStage.Planted;
            default: return PlotGrowthStage.Empty;
        }
    }

    getExpToNextRank = () => {
        return (10 + (7 * this.landRank + 25 * Math.floor(this.landRank / 5))) * Math.pow(1.11, this.landRank);
    }

    getMinQuantityToCollect(baseQuantity: number = this.quantityToCollect): number {
        return baseQuantity * Math.max(1, this.getOGmultiplyer()) * this.minimumQuantityMultiplyer;
    }

    getMaxQuantityToCollect(baseQuantity: number = this.quantityToCollect): number {
        return baseQuantity * Math.max(1, this.getOGmultiplyer()) * this.maximumQuantityMultiplyer;
    }

    getOGmultiplyer = (): number => {
        return Math.min(1E9, Math.max(1, Math.pow(2, this.OGlevel)));
    }

    static getPlotGrowStageImageData(stage: PlotGrowthStage, seedId: number): ImageData {
        if (stage == PlotGrowthStage.Empty || seedId < 0) {
            return {
                location: `FarmPlant0`,
                height: 78,
                width: 86
            }
        } else {
            return {
                location: `FarmPlant${stage + (6 * seedId)}`,
                height: 78,
                width: 86
            }
        }
    }
}

export class CropScientistBonus {
    unlocked: boolean = false;
    bonusValue: number = 0;

    constructor(public bonusText: CropScientistBonusText, public bonusPerCrop: number, public jadeUpgradeId: number) {}
}

export class CropScientist {
    unlocked: boolean = false;
    bonuses: CropScientistBonus[] = [];
    discoveredCrops: number = 0;
    jadeUpgradeId = 22;

    constructor() {
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.TotalDamage, 20, 27));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.PlantEvolutionChance, 1.02, 24));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.JadeCoinGain, 8, 25));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.CookingSpeed, 1.10, 26));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.CashBonus, 15, 23));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.ShinyPetLvlUpRate, 7, 28));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.BaseCritterPerTrap, 0.1, 29));
    }

    updateCropScientistBonusValues = (cropsFound: number, bonusFromLabBonus17: number, bonusFromGrimoireBonus22: number) => {
        this.discoveredCrops = cropsFound;
        const multiplier = (1 + bonusFromLabBonus17 / 100) * (1 + bonusFromGrimoireBonus22 / 100);

        this.bonuses.forEach(bonus => {
            switch (bonus.bonusText) {
                case CropScientistBonusText.CookingSpeed:
                case CropScientistBonusText.PlantEvolutionChance:
                    bonus.bonusValue = Math.pow(bonus.bonusPerCrop, cropsFound) * multiplier;
                    break;
                case CropScientistBonusText.ShinyPetLvlUpRate:
                case CropScientistBonusText.CashBonus:
                case CropScientistBonusText.JadeCoinGain:
                case CropScientistBonusText.TotalDamage:
                case CropScientistBonusText.BaseCritterPerTrap:
                default:
                    bonus.bonusValue = (bonus.bonusPerCrop * cropsFound) * multiplier;
                    break;
            }
        })
    }

    updateUnlockedCropScientist = (jadeUpgrades: JadeUpgrade[]) => {
        this.unlocked = jadeUpgrades.find(upgrade => upgrade.index == this.jadeUpgradeId)?.purchased ?? false;

        if (this.unlocked) {
            this.bonuses.forEach(bonus => {
                bonus.unlocked = jadeUpgrades.find(upgrade => upgrade.index == bonus.jadeUpgradeId)?.purchased ?? false;
            })
        }
    }

    getBonus(bonus: CropScientistBonusText): number {
        const foundBonus = this.bonuses.find(foundBonus => foundBonus.bonusText == bonus && foundBonus.unlocked == true);

        if (foundBonus) {
            return foundBonus.bonusValue;
        } else {
            return 0;
        }
    }

    getBonusText(bonus: CropScientistBonusText): string {
        return bonus.replace(/{/, nFormatter(this.getBonus(bonus)));
    }

    getShortBonusText(bonus: CropScientistBonusText): string {
        const bonusValue = this.getBonus(bonus);

        switch (bonus) {
            case CropScientistBonusText.CookingSpeed:
            case CropScientistBonusText.PlantEvolutionChance:
                return `x${nFormatter(bonusValue)}`;
            case CropScientistBonusText.BaseCritterPerTrap:
                return `+${nFormatter(bonusValue)}`;
            case CropScientistBonusText.ShinyPetLvlUpRate:
            case CropScientistBonusText.CashBonus:
            case CropScientistBonusText.JadeCoinGain:
            case CropScientistBonusText.TotalDamage:
            default:
                return `+${nFormatter(bonusValue)}%`;
        }
    }

    static getBonusTitle(bonus: CropScientistBonusText): string {
        switch (bonus) {
            case CropScientistBonusText.CookingSpeed:
                return "Meal Speed";
            case CropScientistBonusText.PlantEvolutionChance:
                return "Gaming Evo";
            case CropScientistBonusText.ShinyPetLvlUpRate:
                return "Pet Rate";
            case CropScientistBonusText.CashBonus:
                return "Cash";
            case CropScientistBonusText.JadeCoinGain:
                return "Jade coins";
            case CropScientistBonusText.TotalDamage:
                return "Damage";
            case CropScientistBonusText.BaseCritterPerTrap:
                return "Critters";
            default:
                return "Unknown bonus";
        }
    }
}

export class Farming extends Domain {
    farmPlots: Plot[] = [];
    landrankDatabase: LandRankDataBase = new LandRankDataBase(); // Should init here like marketUpgrades and seeds when available from wiki bot
    marketUpgrades: MarketUpgrade[] = initMarketInfoRepo().map((upgrade) => { return new MarketUpgrade(upgrade.index, upgrade.data) });
    seeds: Seed[] = initSeedInfoRepo().map((seed) => { return new Seed(seed.index, seed.data) });
    starSignEvoUnlocked: boolean = false;
    starSignEvoInfinity: boolean = false;
    starSignOGUnlocked: boolean = false;
    starSignOGInfinity: boolean = false;

    cropDepot: Crop[] = [];
    cropsToCollect: CropQuantity[] = [];
    cropScientist: CropScientist = new CropScientist();

    canOvergrow: boolean = false;
    canLevelLandRank: boolean = false;
    magicBeansOwned: number = 0;
    landRankPointsTotal: number = 0;
    landRankPointsSpent: number = 0;
    instaGrowToolLeft: number = 0;    
    farmingLevel: number = 0;
    growthRate: number = 0;
    magicBeansFromDepot: number = 0;
    discoveredCrops: number = 0;

    cropNames = ["Apple", "Orange", "Lemon", "Pear", "Strawberry", "Bananas", "Blueberry", "Red Grapes", "Red Pear", "Pineapple", "Lime", "Raspberry", "Fig", "Peach", "Purple Grapes", "Yellow Pear", "Watermelon", "Green Grapes", "Dragon Fruit", "Mango", "Gold Blueberry",
        "Carrot", "Potato", "Beat", "Tomato", "Artichoke", "Roma Tomato", "Butternut Squash", "Avocado", "Red Pepper", "Broccoli", "Beatroot", "Coconut", "Sliced Tomato", "Cashew", "Turnip", "Coffee Bean", "Pumpkin", "Sliced Cucumber", "Eggplant", "Lettuce", "Garlic", "Green Beans", "Bell Pepper", "Corn", "Gold Sliced Tomato",
        "Daisy", "Flour", "Stargazer Lily", "Rose", "Sunflower", "Blue Daisy", "Pansy", "Tulip", "Pink Daisy", "Cauliflower", "Cape Marguerite Daisy", "Papua Black Orchid", "Muffin", "Black Rose", "Golden Tulip",
        "Sake Maki", "Salmon Nigiri", "Temaki", "Hamaguri", "Onigiri", "Ama-ebi", "Cup Ramen", "Daikon Maki", "Sushi 9", "Kake Soba", "Ikura", "Sushi 12", "Miso Soup", "Sushi 13", "Avocado Maki", "Ebi Nigiri", "Instant Noodles", "Blue Ikura", "Tako Nigiri", "Soy Sauce", "Sushi 14", "Neko Rice", "Shrimp Tempura",
        "Mushroom 1", "Mushroom 2", "Mushroom 3", "Mushroom 4", "Mushroom 5", "Mushroom 6", "Mushroom 7", "Mushroom 8", "Mushroom 9", "Mushroom 10", "Mushroom 11", "Mushroom 12", "Mushroom 13", "Mushroom 14", "Mushroom 15", "Mushroom 16", "Mushroom 17", "Mushroom 18", "Mushroom 19", "Mushroom 20", "Mushroom 21", "Mushroom 22", "Mushroom 23",
        "Glassy Bananas", "Glassy Mango", "Glassy Mushroom 21", "Glassy Maki", "Glassy Broccoli", "Glassy Carrot", "Glassy Sliced Tomato", "Glassy Watermellon", "Glassy Shrimp Tempura", "Glassy Rose", "Glassy Lettuce", "Glassy Onigiri", "Glassy Corn",
        "Red Glassy Bananas", "Red Glassy Mango", "Red Glassy Broccoli", "Red Glassy Carrot", "Red Glassy Sliced Tomato", "Red Glassy Watermellon", "Red Glassy Shrimp Tempura", "Red Glassy Rose", "Red Glassy Onigiri", "Red Glassy Corn",
        "Green Glassy Bananas", "Green Glassy Mango", "Green Glassy Broccoli", "Green Glassy Carrot", "Green Glassy Sliced Tomato", "Green Glassy Watermellon", "Green Glassy Shrimp Tempura", "Green Glassy Rose", "Green Glassy Onigiri", "Green Glassy Corn",
        "White Glassy Bananas", "White Glassy Mango", "White Glassy Broccoli", "White Glassy Carrot", "White Glassy Sliced Tomato", "White Glassy Watermellon", "White Glassy Shrimp Tempura", "White Glassy Rose", "White Glassy Onigiri", "White Glassy Corn",
        "Purple Glassy Bananas", "Purple Glassy Mango", "Purple Glassy Broccoli", "Purple Glassy Carrot", "Purple Glassy Sliced Tomato", "Purple Glassy Watermellon", "Purple Glassy Shrimp Tempura", "Purple Glassy Rose", "Purple Glassy Onigiri", "Purple Glassy Corn"];

    getRawKeys(): RawData[] {
        return [
            { key: "FarmPlot", perPlayer: false, default: []},
            { key: "FarmCrop", perPlayer: false, default: []},
            { key: "FarmUpg", perPlayer: false, default: []},
            { key: "FarmRank", perPlayer: false, default: []},
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const farming = data.get(this.dataKey) as Farming;
        const cropsData = data.get("FarmCrop") as object;
        const plotsData = data.get("FarmPlot") as number[][];
        const landRankData = data.get("FarmRank") as number[][];
        const upgradesData = data.get("FarmUpg") as number[];
        
        // Old accounts won't have this data, exit early.
        if (!cropsData || (!plotsData || plotsData.length == 0) || (!upgradesData || upgradesData.length == 0) || (!landRankData || landRankData.length == 0)) {
            return;
        }
        
        const upgradesLevels = upgradesData.slice(2, -2);

        farming.magicBeansOwned = upgradesData[1];
        farming.instaGrowToolLeft = upgradesData[19];

        farming.cropDepot = [];
        farming.seeds.forEach((seed) => {
            for (let i = (seed.data.cropIdMin); i <= (seed.data.cropIdMax); i++) {
                farming.cropDepot.push(new Crop(i, seed));
            }
        })
        
        farming.discoveredCrops = 0;
        for (const [cropId, qty] of Object.entries(cropsData)) {
            const crop = farming.cropDepot.find(crop => crop.index == Number(cropId));
            if (crop) {
                crop.discovered = true;
                crop.quantityOwned = Number(qty);
                farming.discoveredCrops++;
            }
        }

        farming.updateUnlockedMarketBonuses();
        farming.marketUpgrades.forEach((upgrade) => {
            if (upgrade.index < upgradesLevels.length) {
                upgrade.level = upgradesLevels[upgrade.index];
            }
        });
        farming.canOvergrow = (farming.getMarketUpgradeBonusValue(8) > 0);
        farming.canLevelLandRank = (farming.getMarketUpgradeBonusValue(13) > 0);

        // landRankData[0] contains all land rank levels
        farming.landRankPointsTotal = landRankData[0].reduce((sum, rank) => sum + rank, 0);
        // landRankData[2] contains all upgrades levels
        farming.landRankPointsSpent = landRankData[2].reduce((sum, rank) => sum + rank, 0);
        farming.updateUnlockedLandRankUpgrades();
        farming.landrankDatabase.upgrades.forEach((upgrade) => {
            if (upgrade.index < landRankData[2].length) {
                upgrade.level = landRankData[2][upgrade.index];
            }
        });

        farming.farmPlots = [];
        plotsData.forEach((plotInfo, index) => {
            const plot: Plot = new Plot(index);            
            // If seedIndex = -1 then the plot is empty, so no more information are needed (all other plotInfo should be at 0 anyway in this case)
            plot.seed = farming.seeds.find(seed => seed.index == plotInfo[0]) ?? undefined;
            if (plot.seed) {
                plot.growthTime = plotInfo[1];
                plot.cropIndex = plotInfo[2] + (plot.seed.data?.cropIdMin ?? 0);
                plot.locked = (plotInfo[3] == 1);
                plot.quantityToCollect = plotInfo[4];
                plot.OGlevel = plotInfo[5];
                plot.overgrowthTime = plotInfo[6];

                if (index < landRankData[0].length) {
                    plot.landRank = landRankData[0][index] ?? 0;
                }
                if (index < landRankData[1].length) {
                    plot.landExp = landRankData[1][index] ?? 0;
                }

                plot.readyToCollect = (plot.quantityToCollect > 0)
            }
            farming.farmPlots.push(plot);
        });
    }
    
    updateUnlockedMarketBonuses = () => {
        this.marketUpgrades.forEach(upgrade => {
            upgrade.unlocked = (upgrade.data.cropReq <= this.discoveredCrops);
        });
    }

    updateUnlockedLandRankUpgrades = () => {
        this.landrankDatabase.upgrades.forEach(upgrade => {
            upgrade.unlocked = this.canLevelLandRank ? (this.landRankPointsTotal >= upgrade.unlockThreshold) : false;
        });
    }
    
    updateGrowthRate = (bonusFromVial64: number, bonusFromWinnerBonus2: number) => {
        const growthRate = Math.max(1, this.getMarketUpgradeBonusValue(10)) * (1 + (this.getMarketUpgradeBonusValue(2) + bonusFromVial64) / 100) * (1 + bonusFromWinnerBonus2 / 100);
        
        this.growthRate = growthRate;
        this.farmPlots.forEach(plot => {
            plot.growthRate = growthRate;
        })
    }

    updateCropsToCollect = () => {
        this.cropsToCollect = [];

        this.farmPlots.forEach(plot => {
            if (plot.quantityToCollect > 0) {
                const collect = this.cropsToCollect.find(collect => collect.crop.index == plot.cropIndex);
                if (collect) {
                    collect.minQuantity += plot.getMinQuantityToCollect();
                    collect.maxQuantity += plot.getMaxQuantityToCollect();
                } else {
                    const crop = this.cropDepot.find(crop => crop.index == plot.cropIndex);
                    if (crop) {
                        this.cropsToCollect.push({ crop: crop, minQuantity: plot.getMinQuantityToCollect(), maxQuantity: plot.getMaxQuantityToCollect() });
                    }
                }
            }
        })

        this.cropsToCollect.sort((collect1, collect2) => { return collect1.crop.index > collect2.crop.index ? 1 : -1 });
    }
    
    updateBeansFromConvertinCurrentDepot = (jadeUpgradeBonus15: number) => {
        let fromCrops = 0;
        
        this.cropDepot.filter(crop => crop.quantityOwned > 0).forEach(crop => {
            fromCrops += (crop.quantityOwned * Math.pow(2.5, crop.seed.index) * Math.pow(1.08, crop.index - crop.seed.data.cropIdMin));
        });
        
        this.magicBeansFromDepot = Math.pow(fromCrops, 0.5) * ( 1 + this.getMarketUpgradeBonusValue(6) / 100) * Math.max(1, jadeUpgradeBonus15);
    }

    updatePlotsOGChance = (bonusFromMarketUpgrade11: number, bonusFromPristineCharm11: number, bonusFromStarSign67: number, bonusFromTaskBoard: number, bonusFromAchievement365: number) => {
        this.farmPlots.forEach(plot => {
            plot.updatePlotNextOGchance(bonusFromMarketUpgrade11, bonusFromPristineCharm11, bonusFromStarSign67, bonusFromTaskBoard, bonusFromAchievement365, this.landrankDatabase.getTotalUpgradeBonusForBonus(LandRankBonusType.OGChance));
        });
    }
    
    updateCropsEvolutionChance = (summoningLevel: number, bonusFromMarketUpgrade4: number, bonusFromMarketUpgrade9: number, bonusFromWinningBonus10: number, bonusFromAlchemyBubbleCropChapter: number, bonusFromAlchemyBubbleCropiusMapper: number, bonusFromVial66: number, bonusFromMeal62: number, bonusFromMeal66: number, bonusFromStampCropEvo: number, bonusFromStarSign65: number, bonusFromRiftFarming1: number, bonusFromAchievement355: number, bonusFromKillRoy1: number, bonusFromVoting29: number) => {
        const landRankBonusTotal = this.landrankDatabase.getTotalUpgradeBonusForBonus(LandRankBonusType.NextCropChance);
        const landRankBonusCurrentRank = this.landrankDatabase.getUpgradeBonusByIndex(0);
        this.farmPlots.forEach(plot => {
            plot.updateNextCropChance(this.farmingLevel, summoningLevel, bonusFromMarketUpgrade4, bonusFromMarketUpgrade9, bonusFromWinningBonus10, bonusFromAlchemyBubbleCropChapter, bonusFromAlchemyBubbleCropiusMapper, bonusFromVial66, bonusFromMeal62, bonusFromMeal66, bonusFromStampCropEvo, bonusFromStarSign65, bonusFromRiftFarming1, bonusFromAchievement355, bonusFromKillRoy1, landRankBonusTotal, landRankBonusCurrentRank, bonusFromVoting29);
        });
    }

    updatePossibleQuantityToCollect = (bonusFromMarketUpgrade1: number, purchasesFromGemShopBonus139: number) => {
        const min = Math.floor(1 + (0 + (bonusFromMarketUpgrade1 + 20 * purchasesFromGemShopBonus139) / 100));
        const max = Math.floor(1 + (0.9999 + (bonusFromMarketUpgrade1 + 20 * purchasesFromGemShopBonus139) / 100));

        this.farmPlots.forEach(plot => {
            plot.possibleBaseQtyToCollectMin = min;
            plot.possibleBaseQtyToCollectMax = max;
        });
    }

    updatePlotGrowthSinceSave = (saveTime: number) => {
        this.farmPlots.forEach(plot => {
            plot.lastRefresh = saveTime;
            plot.updatePlotGrowthSinceLastRefresh();
        });
    }

    updatePlotQuantityMultiplyer = (bonusFromMarketUpgrade5: number, bonusFromVoting29: number) => {
        const landRankBonusTotal = this.landrankDatabase.getTotalUpgradeBonusForBonus(LandRankBonusType.AmountHarvested);
        const landRankBonusCurrentRank = this.landrankDatabase.getUpgradeBonusByIndex(1);
        this.farmPlots.forEach(plot => {
            plot.updatePlotCropQuantityMultiplyer(bonusFromMarketUpgrade5, landRankBonusTotal, landRankBonusCurrentRank, bonusFromVoting29);
        });
    }
    
    getCropsWithStockEqualOrGreaterThan = (stockLimit: number): number => {
        return this.cropDepot.filter(crop => crop.quantityOwned >= stockLimit).length;
    }

    getMarketUpgradeBonusValue = (upgradeId: number): number  => {
        const upgrade = this.marketUpgrades.find(upgrade => upgrade.index == upgradeId);

        if (upgrade) {
            switch (upgradeId) {
                case 9: // GMO
                    return this.getMarketUpgradeBonusValue(15) * Math.pow(1 + upgrade.level * upgrade.data.bonusPerLvl / 100, this.getCropsWithStockEqualOrGreaterThan(200));
                case 11:
                    return 1 + (upgrade.level * upgrade.data.bonusPerLvl) / 100;
                case 10: //GMO
                    return this.getMarketUpgradeBonusValue(15) * (1 + upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(1000) / 100);
                case 12: //GMO
                    return this.getMarketUpgradeBonusValue(15) * (1 + upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(2500) / 100);
                case 14: //GMO
                    return this.getMarketUpgradeBonusValue(15) * (1 + (upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(10000)) / 100);
                case 15: //GMO
                    return 1 + (upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(100000)) / 100;
                default:    
                    return upgrade.level * upgrade.data.bonusPerLvl;
            }
        } else {
            return 0;
        }
    }

    getMarketUpgradeBonusText = (upgradeId: number): string  => {
        const upgrade = this.marketUpgrades.find(upgrade => upgrade.index == upgradeId);

        if (upgrade) {
            switch (upgradeId) {
                case 9: // GMO
                    return upgrade.data.bonus.replace(/}/, nFormatter(1 + upgrade.level * upgrade.data.bonusPerLvl / 100)) + " (Total bonus : x"+ nFormatter(this.getMarketUpgradeBonusValue(upgradeId))+")";
                case 11:
                    return upgrade.data.bonus.replace(/}/, nFormatter(this.getMarketUpgradeBonusValue(upgradeId)));
                case 10: //GMO
                case 12: //GMO
                case 15: //GMO
                    return upgrade.data.bonus.replace(/{/, nFormatter(upgrade.level * upgrade.data.bonusPerLvl)) + " (Total bonus : +"+nFormatter((this.getMarketUpgradeBonusValue(upgradeId)-1)*100)+"%)";
                case 14: //GMO
                    return upgrade.data.bonus.replace(/{/, nFormatter(upgrade.level * upgrade.data.bonusPerLvl)) + " (Total bonus : +"+nFormatter((this.getMarketUpgradeBonusValue(upgradeId)-1)*100)+"%)";
                default:    
                    return upgrade.data.bonus.replace(/{/, nFormatter(this.getMarketUpgradeBonusValue(upgradeId)));
            }
        } else {
            return "";
        }
    }

    getCropName = (cropIndex: number): string => {
        if (cropIndex < this.cropNames.length) {
            return this.cropNames[cropIndex];
        } else {
            return "";
        }
    }

    static getDayMarketImageData = (): ImageData => {
        return {
            location: `FarmStT0`,
            height: 53,
            width: 60
        }
    }

    static getNightMarketImageData = (): ImageData => {
        return {
            location: `FarmStT1`,
            height: 53,
            width: 60
        }
    }

    static getCropDepotImageData = (): ImageData => {
        return {
            location: `FarmStT2`,
            height: 53,
            width: 60
        }
    }

    static getInstaGrowImageData = (): ImageData => {
        return {
            location: `GemP31`,
            height: 20,
            width: 20
        }
    }
}

export const updateFarmingLevel = (data: Map<string, any>) => {
    const farming = data.get("farming") as Farming;
    const players = data.get("players") as Player[];

    const levels: number[] = [];
    players.forEach(player => {
        levels.push(player.skills.get(SkillsIndex.Farming)?.level ?? 0);
    })

    farming.farmingLevel = Math.max(...levels);
}

export const updateFarmingCropScientistBonuses = (data: Map<string, any>) => {
    const farming = data.get("farming") as Farming;
    const mainframe = data.get("lab") as Lab;
    const sneaking = data.get("sneaking") as Sneaking;
    const grimoire = data.get("grimoire") as Grimoire;

    // Set bonus to unlocked if the corresponding Jade Upgrade have been purchased
    farming.cropScientist.updateUnlockedCropScientist(sneaking.jadeUpgrades);

    // Update all CropScientist bonuses so we can use those values in other pages (cooking for example)
    const labBonusCropScientist = mainframe.bonuses.find(bonus => bonus.index == 17)?.getBonus() ?? 0;
    const grimoire22Bonus = grimoire.getUpgradeBonus(22);
    farming.cropScientist.updateCropScientistBonusValues(farming.discoveredCrops, labBonusCropScientist, grimoire22Bonus);
}

export const updateFarmingDisplayData = (data: Map<string, any>) => {
    const farming = data.get("farming") as Farming;
    const gemStore = data.get("gems") as GemStore;
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const cooking = data.get("cooking") as Cooking;
    const summoning = data.get("summoning") as Summoning;
    const sneaking = data.get("sneaking") as Sneaking;
    const rift = data.get("rift") as Rift;
    const timeAway = JSON.parse((data.get("rawData") as { [k: string]: any })["TimeAway"]);
    const starSigns = data.get("starsigns") as StarSigns;    
    const achievements = data.get("achievements") as Achievement[];
    const killroy = data.get("killroy") as KillRoy;
    const votes = data.get("votes") as Votes;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const grimoire = data.get("grimoire") as Grimoire;

    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;
    
    // Update Min and Max possible quantity to collect from one fully grown crop 
    const gemInstagrowPurchase = gemStore.purchases.find(purchase => purchase.index == 140)?.pucrhased ?? 0;
    farming.updatePossibleQuantityToCollect(farming.getMarketUpgradeBonusValue(1), gemInstagrowPurchase);
    
    // Update growth speed for displayng when crops will be ready
    const vialGrowthSpeedBonus = alchemy.getVialBonusForKey("6FarmSpd");
    const summoningWinnerBonus2 = summoning.summonBonuses.find(bonus => bonus.index == 2)?.getBonus() ?? 0;
    farming.updateGrowthRate(vialGrowthSpeedBonus, summoningWinnerBonus2);

    // Update Magic beans collected if collecting now
    const jadeUpgrade15 = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 15)?.purchased ? 1.25 : 1;
    farming.updateBeansFromConvertinCurrentDepot(jadeUpgrade15);
    
    // Update each Crops Evolution chance in plots
    const summoningWinnerBonus10 = summoning.summonBonuses.find(bonus => bonus.index == 10)?.getBonus() ?? 0;
    const bubbleBonusCropChapter = alchemy.getBubbleBonusForKey("W10AllCharz");
    const bubbleBonusCropiusMapper = alchemy.getBubbleBonusForKey("Y6");
    const vialEvolutionChanceBonus = alchemy.getVialBonusForKey("6FarmEvo");
    const mealBonusZCropEvo = cooking.getMealBonusForKey("zCropEvo");
    const mealBonusZCropEvoSumm = cooking.getMealBonusForKey("zCropEvoSumm");
    const stampCropEvolutionChance = stamps.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.data.effect == "CropEvo" ? stamp.getBonus() : 0, 0);
    const starSignBonus65 = starSigns.unlockedStarSigns.find(sign => sign.name == "Cropiovo Minor")?.getBonus("Crop Evo chance per Farming LV") ?? 0;
    const riftBonusCropEvolutionChance = skillMastery.getSkillBonus(SkillsIndex.Farming, 1);
    const achievementBonus355 = achievements[355].completed ? 5 : 0; // x1.05
    const killroyBonus1 = killroy.farmingNextEvoChanceBonus;
    const votingBonus29 = votes.getCurrentBonus(29);
    farming.updateCropsEvolutionChance(summoning.summoningLevel, farming.getMarketUpgradeBonusValue(4), farming.getMarketUpgradeBonusValue(9), summoningWinnerBonus10, bubbleBonusCropChapter, bubbleBonusCropiusMapper, vialEvolutionChanceBonus, mealBonusZCropEvo, mealBonusZCropEvoSumm, stampCropEvolutionChance, starSignBonus65, riftBonusCropEvolutionChance, achievementBonus355, killroyBonus1, votingBonus29);
    // Update each Crops multiplyer when collecting for each plot
    farming.updatePlotQuantityMultiplyer(farming.getMarketUpgradeBonusValue(5), votingBonus29);

    // Update OG chances for all plots
    const marketBonus11 = farming.getMarketUpgradeBonusValue(11);
    const pristineCharm11 = sneaking.pristineCharms.find(charm => charm.data.itemId == 11);
    const starSignBonus67 = starSigns.unlockedStarSigns.find(sign => sign.name == "O.G. Signalais")?.getBonus("OG Chance") ?? 0;
    const taskBoardOGChanceBonus = (taskBoard.merits.find(merit => merit.index == 44)?.level ?? 0) * 2;
    const achievementBonus365 = achievements[365].completed ? 15 : 0; // x1.15;
    farming.updatePlotsOGChance(marketBonus11, (pristineCharm11 && pristineCharm11.unlocked) ? pristineCharm11.data.x1 : 0, starSignBonus67, taskBoardOGChanceBonus, achievementBonus365);

    farming.updateCropsToCollect();

    farming.updatePlotGrowthSinceSave(timeAway['GlobalTime']);

    // Fifth land ranks column bonuses max level
    const grimoireBonus = grimoire.getUpgradeBonus(9);
    // TODO : add the exotic market value here (bonus 15) once implemented
    const exoticMarketBonus = 0;
    const legendTalentsBonus = legendTalents.legendTalents.find(talent => talent.index == 3)?.getBonus() ?? 0;
    farming.landrankDatabase.upgrades.filter(upgrade => upgrade.fifthColumnBonus).forEach(upgrade => {
        upgrade.maxLevel = Math.round(1 + grimoireBonus + Math.ceil(exoticMarketBonus) + legendTalentsBonus);
    });

    // Nice info to have for the UI
    farming.starSignOGUnlocked = starSigns.isStarSignUnlocked("O.G. Signalais");
    farming.starSignOGInfinity = (starSigns.infinityStarSigns.find(sign => sign.name == "O.G. Signalais") != undefined);
    farming.starSignEvoUnlocked = starSigns.isStarSignUnlocked("Cropiovo Minor");
    farming.starSignEvoInfinity = (starSigns.infinityStarSigns.find(sign => sign.name == "Cropiovo Minor") != undefined);

    return farming;
}

export interface MarketUpgradeCost {
    cropId: number,
    cropQuantity: number,
}

export interface CropQuantity {
    crop: Crop,
    minQuantity: number,
    maxQuantity: number
}

export enum CropScientistBonusText {
    CashBonus = "+{% cash from mobs",
    PlantEvolutionChance = "{x Plant Evolution Chance in Gaming (multiplicative)",
    JadeCoinGain = "+{% Jade Coin Gain",
    CookingSpeed = "{x Cooking Speed (multiplicative)",
    TotalDamage = "+{% Total Damage",
    ShinyPetLvlUpRate = "+{% Shiny Pet Lv Up Rate and Pet Breeding Rate",
    BaseCritterPerTrap = "+{ Base Critter caught in Trapping"
}

export enum PlotGrowthStage {
    Empty = 0,
    Planted = 1,
    GrowStage1 = 2,
    GrowStage2 = 3,
    GrowStage3 = 4,
    GrowStage4 = 5,
    Grown = 6,
}

// It's the same number as in-game function 
// q._customBlock_FarmingStuffs("LandRankUpgBonusTOTAL",1,0) will be used in-game code to retrieve the sum of all bonuses from land rank upgrades that grant increased amount harvested
export enum LandRankBonusType {
    NextCropChance = 0,
    AmountHarvested = 1,
    LandRankEXP = 2,
    OGChance = 3,
    FarmingSkillExp = 4
}
