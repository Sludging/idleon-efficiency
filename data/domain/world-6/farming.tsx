import { SkillsIndex } from "../SkillsIndex";
import { Domain, RawData } from "../base/domain";
import { initMarketInfoRepo } from "../data/MarketInfoRepo";
import { SeedInfoBase, initSeedInfoRepo } from "../data/SeedInfoRepo";
import { Item } from "../items";
import { MarketInfoModel } from "../model/marketInfoModel";
import { SeedInfoModel } from "../model/seedInfoModel";
import { Player } from "../player";
import { ImageData } from "../imageData";

export class MarketUpgrade {
    level: number = 0;

    constructor(public index: number, public data: MarketInfoModel) {}
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
}

enum PlotGrowthStage {
    Empty = 0,
    Planted = 1,
    GrowStage1 = 2,
    GrowStage2 = 3,
    GrowStage3 = 4,
    GrowStage4 = 5,
    Grown = 6,
}

export class Plot {
    // -1 means the Plot is empty
    seedIndex: number = -1;
    // CropId
    cropIndex: number = 0;
    // If true can't evolve, but can still OverGrow
    locked: boolean = false;
    // Time in seconds since last Collecting or Planting, it stop incrementing once the plant is fully grown
    growthTimeInSeconds: number = 0;
    // Base quantity of crops to be collected 
    quantityToCollect: number = 0;
    // Level of Overgrowth 
    OGlevel: number = 0;
    // seconds since last cycle have ended, reset to 0 once an overgrow cycle end
    // Only start incrementing when plant is fully grown
    overgrowthTimeInSeconds: number = 0;

    constructor(public index: number) { }

    getQuantityToCollect(): number {
        if (this.OGlevel > 0) {
            return this.quantityToCollect * (this.OGlevel * 2);
        } else {
            return this.quantityToCollect;
        }
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

export class Farming extends Domain {
    farmPlots: Plot[] = [];
    marketUpgrades: MarketUpgrade[] = initMarketInfoRepo().map((upgrade) => { return new MarketUpgrade(upgrade.index, upgrade.data) });
    seeds: Seed[] = initSeedInfoRepo().map((seed) => { return new Seed(seed.index, seed.data) });;
    cropDepot: Crop[] = [];
    farmingLevel: number = 0;
    canOvergrow: boolean = false;

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
            if (upgrade.index < upgradesData.length) {
                upgrade.level = upgradesData[upgrade.index];
            }
        });
        
        farming.farmPlots = [];
        plotsData.forEach((plotInfo, index) => {
            let plot: Plot = new Plot(index);
            plot.seedIndex = plotInfo[0];
            // If seedIndex = -1 then the plot is empty, so no more information are needed
            if (plot.seedIndex > -1) {
                plot.growthTimeInSeconds = plotInfo[1];
                plot.cropIndex = plotInfo[2] + (farming.seeds.find(seed => seed.index == plot.seedIndex)?.data.cropIdMin ?? 0);
                plot.locked = (plotInfo[3] == 1);
                plot.quantityToCollect = plotInfo[4];
                plot.OGlevel = plotInfo[5];
                plot.overgrowthTimeInSeconds = plotInfo[6];
            }
            farming.farmPlots.push(plot);
        });

        console.log(farming.farmPlots);
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

export const updateFarmingLevel = (data: Map<string, any>) => {
    const farming = data.get("farming") as Farming;
    const players = data.get("players") as Player[];

    farming.farmingLevel = players[0]?.skills.get(SkillsIndex.Farming)?.level ?? 0;
}