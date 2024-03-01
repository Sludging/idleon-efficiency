import { SkillsIndex } from "../SkillsIndex";
import { Domain, RawData } from "../base/domain";
import { initMarketInfoRepo } from "../data/MarketInfoRepo";
import { SeedInfoBase, initSeedInfoRepo } from "../data/SeedInfoRepo";
import { Item } from "../items";
import { MarketInfoModel } from "../model/marketInfoModel";
import { SeedInfoModel } from "../model/seedInfoModel";
import { Player } from "../player";
import { ImageData } from "../imageData";
import { nFormatter } from '../../utility';
import { BracketsAngle } from "@phosphor-icons/react";

export class MarketUpgrade {
    level: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: MarketInfoModel) {}

    // TODO : calculate crop id
    getNextLevelCost = (currentLevel: number = this.level): MarketUpgradeCost => {
        let cropId = 0;
        if (this.index == 0 && currentLevel == 0) {
            // cropId = Math.floor((this.data.cropId) + (this.data.cropIdIncrement) * ((a.engine.getGameAttribute("FarmUpg")[2]) + (2 * Math.floor((a.engine.getGameAttribute("FarmUpg")[2]) / 3) + Math.floor((a.engine.getGameAttribute("FarmUpg")[2]) / 4))));
        } else {
            // cropId = Math.floor((a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(e + 8 * b)][2]) + (a.engine.getGameAttribute("CustomLists").h.MarketInfo[Math.round(e + 8 * b)][3]) * (a.engine.getGameAttribute("FarmUpg")[Math.round(2 + e + 8 * b)]));
        }

        const cropCost = Math.floor(this.data.cost * Math.pow(this.data.costExponent, Math.max(0,currentLevel-1)));
        
        return {cropId: cropId, cropQuantity: cropCost};
    }
}

export class Crop {
    discovered: boolean = false;
    quantityOwned: number = 0;

    constructor(public index: number) { }

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
}

export class Seed {
    constructor(public index: number, public data: SeedInfoModel) {}

    isCropFromThisSeed = (cropId: number): boolean => {
        return (cropId >= this.data.cropIdMin && cropId <= this.data.cropIdMax);
    }
}

export class Plot {
    // -1 means the Plot is empty
    seedIndex: number = -1;
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

    constructor(public index: number) { }

    getQuantityToCollect(): number {
        if (this.OGlevel > 0) {
            return this.quantityToCollect * (this.OGlevel * 2);
        } else {
            return this.quantityToCollect;
        }
    }

    getGrowthTimeRequired = (): number => {
        if (this.seedIndex == -1) {
            return 0;
        } else {
            return 14400 * Math.pow(1.5, this.seedIndex);
        }
    }

    getOGmultiplyer = (): number => {
        return Math.min(1E9, Math.max(1, Math.pow(2, this.OGlevel)));
    }

    static getPlotGrowStage(stage: PlotGrowthStage, seedId: number): ImageData {
        if (stage == PlotGrowthStage.Empty || seedId < 0) {
            return {
                location: `FarmPlant0`,
                height: 78,
                width: 86
            }
        } else {
            return {
                location: `FarmPlant${stage + (5 * seedId)}`,
                height: 78,
                width: 86
            }
        }
    }
}

export class CropScientistBonus {
    unlocked: boolean = false;

    constructor(public bonusText: CropScientistBonusText, public bonusPerCrop: number, public jadeUpgradeId: number) {}
}

export class CropScientist {
    unlocked: boolean = false;
    bonuses: CropScientistBonus[] = [];
    // TODO : get the bonus from lab once it's added to lab
    bonusFromLabBonus17: number = 0;

    constructor() {
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.TotalDamage, 20, 27));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.PlantEvolutionChance, 1.02, 24));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.JadeCoinGain, 8, 25));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.CookingSpeed, 1.10, 26));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.CashBonus, 15, 23));
        this.bonuses.push(new CropScientistBonus(CropScientistBonusText.ShinyPetLvlUpRate, 7, 28));
    }

    getBonus(bonus: CropScientistBonusText, cropsFound: number): number {
        const foundBonus = this.bonuses.find(foundBonus => foundBonus.bonusText == bonus && foundBonus.unlocked == true);

        if (foundBonus) {
            switch (bonus) {
                case CropScientistBonusText.CookingSpeed:
                case CropScientistBonusText.PlantEvolutionChance:
                        return Math.pow(foundBonus.bonusPerCrop, cropsFound) * (1 + (this.bonusFromLabBonus17 / 100))
                case CropScientistBonusText.ShinyPetLvlUpRate:
                case CropScientistBonusText.CashBonus:
                case CropScientistBonusText.JadeCoinGain:
                case CropScientistBonusText.TotalDamage:
                default:
                    return (foundBonus.bonusPerCrop * cropsFound) * (1 + (this.bonusFromLabBonus17 / 100));
            }
        } else {
            return 0;
        }
    }

    getBonusText(bonus: CropScientistBonusText, cropsFound: number): string {
        return bonus.replace(/{/, nFormatter(this.getBonus(bonus, cropsFound)));
    }
}

export class Farming extends Domain {
    farmPlots: Plot[] = [];
    marketUpgrades: MarketUpgrade[] = initMarketInfoRepo().map((upgrade) => { return new MarketUpgrade(upgrade.index, upgrade.data) });
    seeds: Seed[] = initSeedInfoRepo().map((seed) => { return new Seed(seed.index, seed.data) });;
    cropDepot: Crop[] = [];
    cropScientist: CropScientist = new CropScientist();

    farmingLevel: number = 0;
    canOvergrow: boolean = false;    
    magicBeanBonusFromEmporium: number = 1;
    magicBeansOwned: number = 0;
    instaGrowToolLeft: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "FarmPlot", perPlayer: false, default: []},
            { key: "FarmCrop", perPlayer: false, default: []},
            { key: "FarmUpg", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const farming = data.get(this.dataKey) as Farming;
        const cropsData = data.get("FarmCrop") as Object;
        const plotsData = data.get("FarmPlot") as number[][];
        const upgradesData = data.get("FarmUpg") as number[];
        const upgradesLevels = upgradesData.slice(2, -2);

        farming.magicBeansOwned = upgradesData[1];
        farming.instaGrowToolLeft = upgradesData[19];

        farming.cropDepot = [];
        farming.seeds.forEach((seed) => {
            for (let i = seed.data.cropIdMin; i <= seed.data.cropIdMax; i++) {
                farming.cropDepot.push(new Crop(i));
            }
        })
        
        for (const [cropId, qty] of Object.entries(cropsData)) {
            const crop = farming.cropDepot.find(crop => crop.index == Number(cropId));
            if (crop) {
                crop.discovered = true;
                crop.quantityOwned = Number(qty);
            }
        }

        farming.marketUpgrades.forEach((upgrade) => {
            if (upgrade.index < upgradesLevels.length) {
                upgrade.level = upgradesLevels[upgrade.index];
            }
        });

        farming.farmPlots = [];
        plotsData.forEach((plotInfo, index) => {
            let plot: Plot = new Plot(index);
            plot.seedIndex = plotInfo[0];
            // If seedIndex = -1 then the plot is empty, so no more information are needed (all other plotInfo should be at 0 anyway in this case)
            if (plot.seedIndex > -1) {
                plot.growthTime = plotInfo[1];
                plot.cropIndex = plotInfo[2] + (farming.seeds.find(seed => seed.index == plot.seedIndex)?.data.cropIdMin ?? 0);
                plot.locked = (plotInfo[3] == 1);
                plot.quantityToCollect = plotInfo[4];
                plot.OGlevel = plotInfo[5];
                plot.overgrowthTime = plotInfo[6];
            }
            farming.farmPlots.push(plot);
        });
    }

    // TODO : calculate this
    getPlotNextCropChance = (plotIndex: number): number => {
        // return 2 > (a.engine.getGameAttribute("Lv0")[16]) ? 0 : 99 == b ? (1 + q._customBlock_FarmingStuffs("BasketUpgQTY", 0, 4) / 100) * (1 + q._customBlock_Summoning("WinBonus", 10, 0) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W10AllCharz) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmEvo"]) / 100) * (1 + p._customBlock_MealBonus("zCropEvo") / 100) * (1 + l._customBlock_StampBonusOfTypeX("CropEvo") / 100) * (1 + p._customBlock_MealBonus("zCropEvoSumm") * Math.ceil(((a.engine.getGameAttribute("Lv0")[18]) + 1) / 50) / 100) * Math.max(1, q._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1)) * (1 + 15 * q._customBlock_RiftStuff("RiftSkillBonus,15", 1) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.StarSigns.h["65"]) * (a.engine.getGameAttribute("Lv0")[16]) / 100) : q._customBlock_FarmingStuffs("CropType", b, 0) == (a.engine.getGameAttribute("CustomLists").h.SeedInfo[(a.engine.getGameAttribute("FarmPlot")[b | 0][0]) | 0][3]) ? 0 : (1 + q._customBlock_FarmingStuffs("BasketUpgQTY", 0, 4) / 100) * (1 + q._customBlock_Summoning("WinBonus", 10, 0) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W10AllCharz) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.Y6) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmEvo"]) / 100) * (1 + p._customBlock_MealBonus("zCropEvo") / 100) * (1 + l._customBlock_StampBonusOfTypeX("CropEvo") / 100) * (1 + p._customBlock_MealBonus("zCropEvoSumm") * Math.ceil(((a.engine.getGameAttribute("Lv0")[18]) + 1) / 50) / 100) * Math.max(1, q._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1)) * (1 + 15 * q._customBlock_RiftStuff("RiftSkillBonus,15", 1) / 100) * (1 + (a.engine.getGameAttribute("DNSM").h.StarSigns.h["65"]) * (a.engine.getGameAttribute("Lv0")[16]) / 100) * (a.engine.getGameAttribute("PixelHelperActor")[24].getValue("ActorEvents_623", "_GenINFO")[68][(a.engine.getGameAttribute("FarmPlot")[b | 0][0]) | 0]) * Math.pow((a.engine.getGameAttribute("CustomLists").h.SeedInfo[(a.engine.getGameAttribute("FarmPlot")[b | 0][0]) | 0][6]), (a.engine.getGameAttribute("FarmPlot")[b | 0][2]));
        
        return 0;
    }

    // TODO : calculate this
    getPlotNextOGchance = (): number => {
        // return Math.pow(.4, c.asNumber(a.engine.getGameAttribute("FarmPlot")[b | 0][5]) + 1) * Math.max(1, q._customBlock_FarmingStuffs("BasketUpgQTY", 1, 3)) * (1 + q._customBlock_Ninja("PristineBon", 11, 0) / 100) * (1 + c.asNumber(a.engine.getGameAttribute("DNSM").h.StarSigns.h["67"]) / 100);
        
        return 0;
    }

    getCropsWithStockEqualOrGreaterThan = (stockLimit: number): number => {
        return this.cropDepot.filter(crop => crop.quantityOwned >= stockLimit).length;
    }

    updateUnlockedMarketBonuses = () => {
        const cropsFound = this.getDiscoveredCropsNumber();
        this.marketUpgrades.forEach(upgrade => {
            upgrade.unlocked = (upgrade.data.cropReq <= cropsFound);
        });
    }

    // TODO : calculate this
    getGrowthRate = (): number => {
        // return Math.max(1, q._customBlock_FarmingStuffs("BasketUpgQTY", 99, 2)) * (1 + (q._customBlock_FarmingStuffs("BasketUpgQTY", 0, 2) + (a.engine.getGameAttribute("DNSM").h.AlchVials.h["6FarmSpd"])) / 100) * (1 + q._customBlock_Summoning("WinBonus", 2, 0) / 100);

        return 0;
    }

    // TODO : calculate this
    getMagicBeansFromConvertinCurrentDepot = (): number => {
        let magicBeans = 0;

        const bonusFromMarket = 0;

        return Math.pow(magicBeans, 0.5) * bonusFromMarket * this.magicBeanBonusFromEmporium;
    }

    getMarketUpgradeBonusValue = (upgradeId: number): number  => {
        const upgrade = this.marketUpgrades.find(upgrade => upgrade.index == upgradeId);

        if (upgrade) {
            switch (upgradeId) {
                case 7:
                    // No bonus there yet
                    return 0;
                case 9: // GMO
                    return this.getMarketUpgradeBonusValue(15) * Math.pow(1 + upgrade.level * upgrade.data.bonusPerLvl / 100, this.getCropsWithStockEqualOrGreaterThan(200));
                case 11:
                    return 1 + (upgrade.level * upgrade.data.bonusPerLvl) / 100;
                case 10: //GMO
                    return this.getMarketUpgradeBonusValue(15) * (1 + upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(1000) / 100);
                case 12: //GMO
                    return this.getMarketUpgradeBonusValue(15) * (1 + upgrade.level * upgrade.data.bonusPerLvl * this.getCropsWithStockEqualOrGreaterThan(2500) / 100);
                case 13:
                    // No bonus there yet
                    return 0;
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
                case 7:
                    // No bonus there yet
                    return upgrade.data.bonus;
                case 9: // GMO
                    return upgrade.data.bonus.replace(/}/, nFormatter(upgrade.level * upgrade.data.bonusPerLvl)) + " (Total bonus : x"+ this.getMarketUpgradeBonusValue(upgradeId).toString()+")";
                case 11:
                    return upgrade.data.bonus.replace(/}/, nFormatter(this.getMarketUpgradeBonusValue(upgradeId)));
                case 13:
                    // No bonus there yet
                    return upgrade.data.bonus;
                case 10: //GMO
                case 12: //GMO
                case 14: //GMO
                case 15: //GMO
                    return upgrade.data.bonus.replace(/{/, nFormatter(upgrade.level * upgrade.data.bonusPerLvl)) + " (Total bonus : +"+nFormatter((this.getMarketUpgradeBonusValue(upgradeId)-1)*100)+"%)";
                default:    
                    return upgrade.data.bonus.replace(/{/, nFormatter(this.getMarketUpgradeBonusValue(upgradeId)));
            }
        } else {
            return "";
        }
    }

    getDiscoveredCropsNumber = (): number => {
        return this.cropDepot.filter(crop => crop.discovered == true).length;
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
}

// TODO : Once all calculations have been done, need to make other upgrade function to load bonus from other sources
export const updateFarmingLevel = (data: Map<string, any>) => {
    const farming = data.get("farming") as Farming;
    const players = data.get("players") as Player[];

    farming.farmingLevel = players[0]?.skills.get(SkillsIndex.Farming)?.level ?? 0;
}

export interface MarketUpgradeCost {
    cropId: number,
    cropQuantity: number,
}

export enum CropScientistBonusText {
    CashBonus = "+{% cash from mobs",
    PlantEvolutionChance = "{x Plant Evolution Chance in Gaming (multiplicative)",
    JadeCoinGain = "+{% Jade Coin Gain",
    CookingSpeed = "{x Cooking Speed (multiplicative)",
    TotalDamage = "+{% Total Damage",
    ShinyPetLvlUpRate = "+{% Shiny Pet Lv Up Rate and Pet Breeding Rate"
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