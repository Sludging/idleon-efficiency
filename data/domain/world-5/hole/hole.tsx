import { Domain, RawData } from "../../base/domain";
import { CosmoUpgradeBase, initCosmoUpgradeRepo } from "../../data/CosmoUpgradeRepo";
import { initLampWishRepo, LampWishBase } from "../../data/LampWishRepo";
import { Item } from "../../items";
import { CosmoUpgradeModel } from "../../model/cosmoUpgradeModel";
import { LampWishModel } from "../../model/lampWishModel";
import { HoleContributor, MAX_KAIPU_SCHEMATIC_SLOTS, Villager, VillagerAccountGrowthInputs, VillagerIndex, Villagers, VillagerSharedGrowthInputs } from "./villager";
import { CosmoTypeEnum } from "../../enum/cosmoTypeEnum";
import { HoleBuildingBase, initHoleBuildingRepo } from "../../data/HoleBuildingRepo";
import { HoleBuildingModel } from "../../model/holeBuildingModel";
import { initStudyRepo, StudyBase } from "../../data/StudyRepo";
import { StudyModel } from "../../model/studyModel";
import { MeasurementModel } from "../../model/measurementModel";
import { initMeasurementRepo, MeasurementBase } from "../../data/MeasurementRepo";
import { initMonumentRepo } from "../../data/MonumentRepo";
import { MonumentBonusModel } from "../../model/monumentBonusModel";
import { MonumentUnlockModel } from "../../model/monumentUnlockModel";
import { BellImprovementModel } from "../../model/bellImprovementModel";
import { initBellImprovementRepo } from "../../data/BellImprovementRepo";
import { Well } from "./well";
import { Fountain } from "./fountain";
import { lavaLog } from "../../../utility";
import { TaskBoard } from "../../tasks";
import { Tome } from "../../world-4/tome";
import { Farming } from "../../world-6/farming";
import { Slab } from "../slab";
import { Deathnote } from "../../world-3/construction/deathnote";
import { BellBonusModel } from "../../model/bellBonusModel";
import { initBellBonusRepo } from "../../data/BellBonusRepo";
import { initHarpNotesRepo } from "../../data/HarpNotesRepo";
import { HarpStringModel } from "../../model/harpStringModel";
import { initHarpStringsRepo } from "../../data/HarpStringsRepo";
import { Gambit } from "./gambit";
import { Tesseract } from "../../tesseract";
import { Cove } from "./cove";
import { Jar } from "./jar";
import { LegendTalents } from "../../world-7/legendTalents";
import { ZenithMarket } from "../../world-7/zenithShop";
import { Player } from "../../player";
import { PlayerStatues } from "../../world-1/statues";
import { Storage } from "../../storage";
import { Companion, getCompanionActiveBonus } from "../../companions";
import { Compass } from "../../compass";
import { Grimoire } from "../../grimoire";
import { UpgradeVault } from "../../upgradeVault";
import { Arcade } from "../../world-2/arcade";
import { Sneaking } from "../../world-6/sneaking";
import { Summoning } from "../../world-6/summoning";
import { Emperor } from "../../world-6/emperor";
import { EventShop } from "../../eventShop";
import { GemStore } from "../../gemPurchases";
import { Card } from "../../cards";
import { Gaming } from "../gaming";
import { Stamp, getStampBonusForKey } from "../../world-1/stamps";
import { SushiStation } from "../../world-7/sushi";
import { HoleCurrencyBase, initHoleCurrencyRepo } from "../../data/HoleCurrencyRepo";
import { HoleCurrencyModel } from "../../model/holeCurrencyModel";
import { initGodInfoRepo } from "../../data/GodInfoRepo";
import type { Divinity } from "../divinity";
import type { ImageData } from "../../imageData";
import { SkillsIndex } from "../../SkillsIndex";
import type { Skilling, SkillingSkill } from "../../skilling";

export interface HoleUpgradeEffect {
 key: string;
 value: number | boolean | null;
 unit: "percent" | "multiplier" | "count" | "per-hour" | "rule";
}

const holeCurrencyImages: Partial<Record<number, ImageData>> = {
 0: { location: "HoleSediment0", width: 28, height: 28 },
 1: { location: "HoleSediment1", width: 28, height: 28 },
 2: { location: "HoleSediment2", width: 28, height: 28 },
 3: { location: "HoleSediment3", width: 28, height: 28 },
 4: { location: "HoleSediment4", width: 28, height: 28 },
 5: { location: "HoleSediment5", width: 28, height: 28 },
 6: { location: "HoleSediment6", width: 28, height: 28 },
 7: { location: "HoleSediment7", width: 28, height: 28 },
 8: { location: "HoleSediment8", width: 28, height: 28 },
 9: { location: "HoleSediment9", width: 28, height: 28 },
 10: { location: "HoleHarpNote0", width: 28, height: 28 },
 11: { location: "HoleHarpNote1", width: 28, height: 28 },
 12: { location: "HoleHarpNote2", width: 28, height: 28 },
 13: { location: "HoleHarpNote3", width: 28, height: 28 },
 14: { location: "HoleHarpNote4", width: 28, height: 28 },
 15: { location: "HoleHarpNote5", width: 28, height: 28 },
 16: { location: "HoleHarpNote6", width: 28, height: 28 },
 17: { location: "HoleHarpNote7", width: 28, height: 28 },
 18: { location: "HoleHarpNote8", width: 28, height: 28 },
 19: { location: "HoleHarpNote9", width: 28, height: 28 },
 25: { location: "HoleTurquoiseRupie", width: 28, height: 28 },
 31: { location: "HoleSilverCoins", width: 23, height: 28 },
 32: { location: "HoleGoldenCoins", width: 23, height: 28 },
 33: { location: "HoleDollarBills", width: 35, height: 28 },
 34: { location: "HoleCreditBills", width: 35, height: 28 },
 35: { location: "HoleTreasuryBills", width: 35, height: 28 },
 36: { location: "HoleMoolahStacks", width: 33, height: 28 },
 37: { location: "HoleShillingStacks", width: 33, height: 28 },
 38: { location: "HoleGreaneStacks", width: 33, height: 28 },
};

export class HoleCurrency {
 stock: number = 0;
 imageData: ImageData | null;

 constructor(public index: number, public data: HoleCurrencyModel) {
  this.imageData = holeCurrencyImages[index] ?? null;
 }

 static fromBase(records: HoleCurrencyBase[]): HoleCurrency[] {
  return records.map(record => new HoleCurrency(record.index, record.data));
 }

 parse(wallets: number[]): void {
  this.stock = Number(wallets[this.index] ?? 0);
 }

 getImageData(): ImageData | null {
  return this.imageData;
 }
}

const holeResearchExpUpgradeBasePercent = 1;


export class Wish {
 wishCount: number = 0;

 constructor(public index: number, public data: LampWishModel) { }

 static fromBase(data: LampWishBase[]) {
  return data.map(d => new Wish(d.index, d.data));
 }
}

interface CosmoUpgradePreparationInputs {
 access: boolean;
 enhancementAllowed: boolean;
 remainingPoints: number;
 createdSchematics: number;
}

export class CosmoUpgrade {
 unlocked: boolean = false;
 level: number = 0;
 initialLevel: number = 0;
 enhancementLevel: number = 0;
 enhancementAllowed: boolean = false;
 currentCap: number = 0;
 prerequisiteId: number | null = null;
 prerequisiteMet: boolean = true;
 private prerequisiteLevel: number = 0;
 access: boolean = false;
 pointsRequired: number = 1;
 canPurchase: boolean = false;
 createdSchematics: number = 0;
 equalSpreadPercent: number = 0;

 constructor(public index: number, public data: CosmoUpgradeModel, public treePosition: number) { }

 get name(): string {
  return this.data.name.replace(/_/g, " ");
 }

 static fromBase(data: CosmoUpgradeBase[]): CosmoUpgrade[] {
  const positions = new Map<CosmoTypeEnum, number>();
  return data.flatMap(record => {
   const position = positions.get(record.data.cosmoType) ?? 0;
   positions.set(record.data.cosmoType, position + 1);
   if (record.data.name === "Confused_Bonus") {
    return [];
   }
   return [record.index === 21
    ? new PocketDivinityUpgrade(record.index, record.data, position)
    : new CosmoUpgrade(record.index, record.data, position)];
  });
 }

 parse(investments: number[]): void {
  this.level = Number(investments[this.treePosition] ?? 0);
  this.prerequisiteId = this.treePosition === 0 ? null : this.index - 1;
  this.prerequisiteLevel = this.treePosition === 0 ? 0 : Number(investments[this.treePosition - 1] ?? 0);
  this.unlocked = this.level > 0;
  this.initialLevel = 0;
  this.enhancementLevel = 0;
  this.createdSchematics = 0;
  this.equalSpreadPercent = 0;
  this.enhancementAllowed = false;
  this.currentCap = 0;
  this.prerequisiteMet = true;
  this.canPurchase = false;
  this.access = false;
 }

 prepare(inputs: CosmoUpgradePreparationInputs): void {
  this.initialLevel = Math.min(1, this.level);
  this.enhancementLevel = Math.max(0, this.level - 1);
  this.createdSchematics = inputs.createdSchematics;
  this.enhancementAllowed = inputs.enhancementAllowed;
  this.currentCap = 1 + (this.enhancementAllowed ? this.data.maxEnhance : 0);
  this.prerequisiteMet = this.prerequisiteId === null || this.prerequisiteLevel > 0;
  this.access = inputs.access;
  this.canPurchase = this.access && this.prerequisiteMet && this.level < this.currentCap
   && inputs.remainingPoints >= this.pointsRequired;
 }

 getBonus(): number {
  if (this.index === 22) {
   return Math.floor(Math.max(1, Math.pow(3, this.level)));
  }
  return Math.floor(this.data.perLvl * this.level);
 }

 getEffects(): HoleUpgradeEffect[] {
  if (this.index === 4) {
   return [
    { key: "fountain-stack-capacity", value: this.level, unit: "count" },
    { key: "fountain-coin-value", value: 1 + 25 * this.level / 100, unit: "multiplier" },
    { key: "fountain-marble-rate", value: 1 + 10 * this.level / 100, unit: "multiplier" },
   ];
  }
  if (this.index === 10) {
   return [{ key: "villager-exp", value: this.getBonus() * this.createdSchematics, unit: "percent" }];
  }
  if (this.index === 11) {
   return [
    { key: "enhance-majik", value: this.level >= 1, unit: "rule" },
    { key: "villager-exp", value: this.getBonus(), unit: "percent" },
   ];
  }
  if (this.index === 14) {
   return [{ key: "villager-exp", value: this.equalSpreadPercent, unit: "percent" }];
  }
  return [{ key: `majik:${this.index}`, value: this.getBonus(),
   unit: this.index === 22 ? "multiplier" : this.index === 1 || this.index === 21 ? "count" : "percent" }];
 }

 getDescription(): string {
  return this.data.desc.replace(/_/g, " ")
   .replace(/ x/g, ` ${this.index === 22 ? this.getBonus() : 1 + this.getBonus() / 100}x`)
   .replace(/\+%/g, `+${this.getBonus()}%`)
   .replace(/[{}]/g, this.getBonus().toString())
   .replace(/\|/g, (this.getBonus() * this.createdSchematics).toString())
   .replace(/\$/g, this.equalSpreadPercent.toString());
 }
}

export interface PocketGodSelection {
 slot: number;
 godId: number;
 bonusId: number;
 name: string;
 active: boolean;
}

export interface PocketCharacterActivation {
 playerId: number;
 playerName: string;
 primaryGodId: number | null;
 secondaryGodId: number | null;
 dootEligible: boolean;
 pocketGodIds: number[];
 overlappingGodIds: number[] | null;
 addedGodIds: number[] | null;
 effectiveGodIds: number[] | null;
 allStatPercent: number;
}

export class PocketDivinityUpgrade extends CosmoUpgrade {
 selections: PocketGodSelection[] = [];
 characters: PocketCharacterActivation[] = [];

 get linkedGods(): number[] {
  return [...new Set(this.selections.filter(selection => selection.active).map(selection => selection.godId))];
 }

 parseSelections(savedSelections: (number | null | undefined)[]): void {
  const gods = initGodInfoRepo();
  this.selections = savedSelections.flatMap((value, slot) => {
   const god = gods.find(god => god.index === Number(value));
   return value == null || !god ? [] : [{ slot, godId: god.index, bonusId: god.data.bonusIndex,
    name: god.data.name, active: this.level > slot }];
  });
  this.characters = [];
 }

 prepareCharacters(players: Player[], divinity: Divinity): void {
  this.characters = players.map(player => {
   const links = divinity.playerInfo.find(info => info.playerIndex === player.playerID);
   const ordinaryGodIds = links?.ordinaryGods.map(god => god.index) ?? [];
   const dootEligible = links?.dootActive ?? false;
   const previousGodIds = dootEligible ? divinity.gods.map(god => god.index) : ordinaryGodIds;
   const pocketGodIds = this.linkedGods;
   return {
    playerId: player.playerID, playerName: player.playerName,
    primaryGodId: links?.primaryGod?.index ?? null, secondaryGodId: links?.esGod?.index ?? null,
    dootEligible, pocketGodIds,
    overlappingGodIds: dootEligible || links !== undefined
     ? pocketGodIds.filter(id => previousGodIds.includes(id)) : null,
    addedGodIds: dootEligible || links !== undefined
     ? pocketGodIds.filter(id => !previousGodIds.includes(id)) : null,
    effectiveGodIds: links === undefined ? null : [...new Set([...previousGodIds, ...pocketGodIds])],
    allStatPercent: !dootEligible ? 0 : 15 * this.level,
   };
  });
 }

 getDootAllStatPercent(): number | null {
  let allStatPercent: number | null = null;
  for (const character of this.characters) {
   if (!character.dootEligible) {
    continue;
   }
   if (allStatPercent !== null && character.allStatPercent !== allStatPercent) {
    return null;
   }
   allStatPercent = character.allStatPercent;
  }
  return allStatPercent;
 }

 getDescription(): string {
  return super.getDescription().replace("Y", this.selections.find(selection => selection.slot === 0 && selection.active)?.name ?? "")
   .replace("Z", this.selections.find(selection => selection.slot === 1 && selection.active)?.name ?? "");
 }
}

export class Majiks {
 HoleUpgrades: CosmoUpgrade[];
 VillageUpgrades: CosmoUpgrade[];
 IdleonUpgrades: CosmoUpgrade[];
 villageUpgradesByIndex: Record<number, CosmoUpgrade>;
 earnedPoints: number = 0;
 investedPoints: number = 0;
 remainingPoints: number = 0;
 purchasedPoints: number = 0;
 private investments: { level: number }[] = [];

 constructor() {
  const allUpgrades = CosmoUpgrade.fromBase(initCosmoUpgradeRepo());
  this.HoleUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Hole);
  this.VillageUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Village);
  this.IdleonUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Idleon);
  this.villageUpgradesByIndex = Object.fromEntries(
   this.VillageUpgrades.map(upgrade => [upgrade.index, upgrade]),
  );
 }
 


 get upgrades(): CosmoUpgrade[] {
  return [...this.HoleUpgrades, ...this.VillageUpgrades, ...this.IdleonUpgrades];
 }

 get pocketDivinity(): PocketDivinityUpgrade {
  return this.IdleonUpgrades.find(upgrade => upgrade.index === 21) as PocketDivinityUpgrade;
 }

 getImageData(tree: CosmoTypeEnum): ImageData {
  switch (tree) {
   case CosmoTypeEnum.Hole: return { location: "HoleUIcosmoUpgA1", width: 45, height: 64 };
   case CosmoTypeEnum.Village: return { location: "HoleUIcosmoUpgB1", width: 48, height: 48 };
   case CosmoTypeEnum.Idleon: return { location: "HoleUIcosmoUpgC1", width: 45, height: 45 };
  }
 }

 parse(savedHole: number[][], purchasedPoints: number, pocketSelections: (number | null | undefined)[]): void {
  const trees = [savedHole[4], savedHole[5], savedHole[6]];
  this.investments = trees.flatMap(tree => tree.map(level => ({ level: Number(level ?? 0) })));
  this.purchasedPoints = purchasedPoints;
  [this.HoleUpgrades, this.VillageUpgrades, this.IdleonUpgrades].forEach((upgrades, tree) =>
   upgrades.forEach(upgrade => upgrade.parse(trees[tree])));
  this.pocketDivinity.parseSelections(pocketSelections);
  this.earnedPoints = 0;
  this.investedPoints = 0;
  this.remainingPoints = 0;
 }

 prepare(cosmo: Villager, createdSchematics: number): void {
  this.earnedPoints = Math.round(cosmo.level + this.purchasedPoints);
  this.investedPoints = this.investments.reduce((total, investment) => total + investment.level, 0);
  this.remainingPoints = Math.round(this.earnedPoints - this.investedPoints);
  const enhancement = this.villageUpgradesByIndex[11];
  const inputs: CosmoUpgradePreparationInputs = {
   access: cosmo.rescued,
   enhancementAllowed: enhancement.level >= 1,
   remainingPoints: this.remainingPoints,
   createdSchematics,
  };
  this.upgrades.forEach(upgrade => upgrade.prepare(inputs));
}
}

type SchematicBonusLookup = (schematicIndex: number, baseMultiplier: number) => number;

export class Schematic {
 unlocked: boolean = false;
 orderPosition: number = 0;
 requiredKaipuLevel: number | null = null;
 available: boolean = false;
 declare currency: HoleCurrency;
 discountStacks: number = 0;
 discountMultiplier: number = 1;
 currentCost: number | null = null;
 shortfall: number | null = null;
 affordable: boolean | null = null;
 private readonly imageData: ImageData;

 getImageData(): ImageData {
  return this.imageData;
 }

 get built(): boolean {
  return this.unlocked;
 }

 parse(savedHole: number[][], savedStringTypes: (number | null | undefined)[]): void {
  this.unlocked = Number(savedHole[13][this.index] ?? 0) === 1;
  this.discountStacks = Number(savedHole[21][5] ?? 0);
  this.sedimentMulti = savedHole[8].map(value => Number(value ?? 0));
  this.resourceLayers = {
   motherlode: Number(savedHole[11][1] ?? 0), hive: Number(savedHole[11][3] ?? 0),
   evertree: Number(savedHole[11][5] ?? 0), trench: Number(savedHole[11][7] ?? 0),
  };
  this.walletBalances = {
   gravel: Number(savedHole[9][0] ?? 0), goldust: Number(savedHole[9][1] ?? 0),
   redstone: Number(savedHole[9][2] ?? 0), naturalNotes: Number(savedHole[9][11] ?? 0),
   trebelNotes: Number(savedHole[9][13] ?? 0), quaverNotes: Number(savedHole[9][15] ?? 0),
  };
  this.gloomieColonies = Number(savedHole[11][26] ?? 0);
  this.motherlodeOreMined = Number(savedHole[11][32] ?? 0);
  this.houndBestRuns = Array.from({ length: 4 }, (_, index) => Number(savedHole[11][33 + index] ?? 0));
  this.golemSanctums = Number(savedHole[11][55] ?? 0);
  this.whiteRupies = Number(savedHole[11][38] ?? 0);
  this.darkRupies = Number(savedHole[11][39] ?? 0);
  this.rupieStocks = savedHole[9].slice(20, 30).map(value => Number(value ?? 0));
  this.savedStringTypes = savedStringTypes.map(value => value == null ? null : Number(value));
  this.bellImprovementMethods = savedHole[16].map(value => Number(value ?? 0));
  this.sedimentSum = undefined;
  this.bellSum = undefined;
  this.currentCost = null;
  this.shortfall = null;
  this.affordable = null;
 }

 prepareInspection(kaipuLevel: number, schematicCount: number): void {
  const schematicLimit = Math.min(MAX_KAIPU_SCHEMATIC_SLOTS, schematicCount);
  const unlockedCount = Math.min(schematicLimit, 1 + 3 * kaipuLevel + Math.floor(kaipuLevel / 5));
  this.available = kaipuLevel >= 1 && this.orderPosition < unlockedCount;
  if (this.orderPosition >= schematicLimit) {
   this.requiredKaipuLevel = null;
  } else {
   this.requiredKaipuLevel = 1;
   while (this.orderPosition >= Math.min(schematicLimit,
    1 + 3 * this.requiredKaipuLevel + Math.floor(this.requiredKaipuLevel / 5))) {
    this.requiredKaipuLevel += 1;
   }
  }
  this.discountMultiplier = Math.max(0.01, Math.pow(0.85, this.discountStacks));
  this.currentCost = this.built ? null : this.getCost();
  this.shortfall = this.currentCost === null ? null : Math.max(0, this.currentCost - this.currency.stock);
  this.affordable = this.currentCost === null ? null : this.currency.stock >= this.currentCost;
 }

 getCost(): number {
  const slot = this.orderPosition;
  if (this.data.costCalcType) {
   return this.discountMultiplier * this.data.baseCost;
  }
  if (this.currency.index < 10) {
   return 50 * this.discountMultiplier * Math.pow(1.28, slot + Math.floor(slot / 2.7));
  }
  if (this.currency.index < 20) {
   return 50 * this.discountMultiplier * Math.pow(1.28, slot - 16 + Math.floor((slot - 16) / 2.7))
    * Math.pow(1.23, Math.min(Math.max(0, (slot - 16) / 2), 14));
  }
  return 40 * this.discountMultiplier * Math.pow(1.34, slot - 54 + Math.floor((slot - 54) / 2.7))
   * Math.pow(1.26, Math.min(Math.max(0, (slot - 54) / 2), 14));
 }

 getEffects(): HoleUpgradeEffect[] {
  const effects: HoleUpgradeEffect[] = [
   { key: `schematic:${this.index}:owned`, value: this.built, unit: "rule" },
  ];
  if (this.index === 49) {
   effects.push({ key: "all-skill-efficiency", value: this.getBonus(15), unit: "percent" },
    { key: "all-skill-exp", value: this.getBonus(10), unit: "percent" });
  } else if ([82, 83, 84].includes(this.index)) {
   effects.push({ key: `schematic:${this.index}:bonus`,
    value: this.getBonus(this.index === 82 ? 20 : this.index === 83 ? 40 : 100), unit: "percent" });
  } else if ([14, 45, 46, 47, 48, 52, 53, 54, 55, 56, 57, 58, 59].includes(this.index)) {
   effects.push({ key: `schematic:${this.index}:bonus`,
    value: this.index === 53 ? 1 + this.getBonus() / 100 : this.getBonus(),
    unit: [45, 53, 54, 56].includes(this.index) ? "multiplier" : [58, 59].includes(this.index) ? "per-hour" : "percent" });
  } else if ([15, 38, 41, 72, 73, 76, 80, 94].includes(this.index)) {
   effects.push({ key: `schematic:${this.index}:intrinsic`, value: this.getIntrinsicBonus(),
    unit: [38, 72].includes(this.index) ? "percent" : "multiplier" });
  }
  return effects;
 }

 sedimentMulti: number[] = [];
 resourceLayers = { motherlode: 0, hive: 0, evertree: 0, trench: 0 };
 walletBalances = { gravel: 0, goldust: 0, redstone: 0, naturalNotes: 0, trebelNotes: 0, quaverNotes: 0 };
 gloomieColonies: number = 0;
 motherlodeOreMined: number = 0;
 houndBestRuns: number[] = [];
 golemSanctums: number = 0;
 bellImprovementMethods: number[] = [];
 whiteRupies: number = 0;
 darkRupies: number = 0;
 rupieStocks: number[] = [];
 uniqueHarpStrings: number = 0;
 private savedStringTypes: (number | null)[] = [];

 prepareHarpStrings(stringSlots: number): void {
  this.uniqueHarpStrings = new Set(this.savedStringTypes.slice(0, stringSlots)
   .filter((value): value is number => value !== null)).size;
 }

 getHarpVarietyIntrinsicBonus(): number {
  return (this.built ? 1 : 0) * 30 * this.uniqueHarpStrings;
 }

 getIntrinsicBonus(): number | null {
  const owned = this.built ? 1 : 0;
  switch (this.index) {
   case 15: return Math.max(1, owned * Math.pow(1.1, this.resourceLayers.motherlode));
   case 38: return this.getHarpVarietyIntrinsicBonus();
   case 41: return Math.max(1, owned * Math.pow(1.1, this.resourceLayers.hive));
   case 72: return owned * 10 * lavaLog(this.whiteRupies);
   case 73: return Math.max(1, owned * Math.pow(1.1, lavaLog(this.darkRupies)));
   case 76: return Math.pow(1.02, owned * this.rupieStocks.reduce((sum, stock) => sum + Math.ceil(lavaLog(stock)), 0));
   case 80: return Math.max(1, owned * Math.pow(1.1, this.resourceLayers.evertree));
   case 94: return Math.max(1, owned * Math.pow(1.1, this.resourceLayers.trench));
   default: return null;
  }
 }

 // Study bonus value
 studyBolaiaBonuses: number = 0;


 // Cached calculations for performance
 private sedimentSum?: number;
 private bellSum?: number;

 constructor(
  public index: number,
  public data: HoleBuildingModel,
  private readonly getSchematicBonus: SchematicBonusLookup = () => 0,
 ) {
  this.imageData = { location: `HoleUIbuildUpg${index}`, width: 97, height: 97 };
 }

 static fromBase(data: HoleBuildingBase[], getSchematicBonus: SchematicBonusLookup = () => 0) {
  return data.map(d => new Schematic(d.index, d.data, getSchematicBonus));
 }

 prepareStudyBonus(bonus: number): void {
  this.studyBolaiaBonuses = bonus;
  this.sedimentSum = undefined;
  this.bellSum = undefined;
 }

 getBonus(baseMultiplier: number = 1): number {
  // Return 0 if not unlocked
  if (!this.unlocked) {
   return 0;
  }

  switch (this.index) {
   case 14: return this.getSedimentBonus();
   case 45: return this.getBellBonus();
   case 46: return 5 * this.gloomieColonies;
   case 47: return 25 * this.gloomieColonies;
   case 48: return 10 * this.gloomieColonies;
   case 49: return this.resourceLayersBonus(baseMultiplier);
   case 52: return 60 * Math.floor(lavaLog(this.walletBalances.gravel));
   case 53: return 4 * Math.floor(lavaLog(this.walletBalances.trebelNotes));
   case 54: return Math.pow(1.2, Math.floor(lavaLog(this.walletBalances.quaverNotes)));
   case 55: return 10 * Math.floor(lavaLog(this.walletBalances.naturalNotes));
   case 56: return Math.pow(1.3, Math.floor(lavaLog(this.walletBalances.redstone)));
   case 57: return 20 * Math.floor(lavaLog(this.walletBalances.goldust));
   case 58: return 5 * lavaLog(this.motherlodeOreMined);
   case 59: return this.houndBestRuns.reduce((sum, bestRun) => sum + bestRun, 0) / 100 * 10;
   case 82:
   case 83:
   case 84: return baseMultiplier * this.golemSanctums;
   default: return baseMultiplier;
  }
 }

 private getSedimentBonus(): number {
  if (this.sedimentSum === undefined) {
   this.sedimentSum = this.sedimentMulti.slice(0, 10).reduce((sum, val) => sum + val, 0);
   this.sedimentSum *= (20 + this.studyBolaiaBonuses);
  }
  return this.sedimentSum;
 }

 private getBellBonus(): number {
  if (this.bellSum === undefined) {
   this.bellSum = this.bellImprovementMethods.reduce((sum, val) => sum + val, 0);
  }
  return Math.max(1, Math.pow(1.1, Math.floor(this.bellSum / 25)));
 }

 private resourceLayersBonus(baseMultiplier: number = 1): number {
  // Match B_UPG(49): apply the caller factor to the weighted resource-layer total.
  const resourceLayers = this.resourceLayers.motherlode +
   (this.resourceLayers.hive * this.getSchematicBonus(50, 1) +
    (this.resourceLayers.evertree * this.getSchematicBonus(79, 1) +
     this.resourceLayers.trench * this.getSchematicBonus(98, 1)));

  return baseMultiplier * resourceLayers;
 }

 getDescription(): string {
  const bonus = this.getIntrinsicBonus() ?? (this.index === 53 ? 1 + this.getBonus() / 100
   : this.index === 82 ? this.getBonus(20) : this.index === 83 ? this.getBonus(40)
    : this.index === 84 ? this.getBonus(100) : this.getBonus());
  let description = this.data.desc.replace(/[{}]/g, bonus.toFixed(2));
  if (this.index === 58) {
   description = description.replace("#", this.motherlodeOreMined.toString());
  } else if (this.index === 59) {
   ["!", "#", "$", "%"].forEach((placeholder, index) => {
    description = description.replace(placeholder, this.houndBestRuns[index].toString());
   });
  } else if (this.index === 38) {
   description = description.replace("$", this.uniqueHarpStrings.toString()).replace("#", bonus.toString());
  }
  return description;
 }
}

type StudyEffectUnit = "percent" | "multiplier" | "levels" | "wishes/day" | "attempts" | "days" | "upgrades" | "rule";
type StudyNumericEffectUnit = Exclude<StudyEffectUnit, "rule">;

export type StudyEffect =
 | {
  key: string;
  value: number;
  unit: StudyNumericEffectUnit;
  owner: string;
  scope: "owned-study-contribution";
  note: string | null;
 }
 | {
  key: string;
  value: boolean;
  unit: "rule";
  owner: string;
  scope: "owned-study-rule";
  note: string | null;
 };

export class Study {
 level: number = 0;
 progress: number = 0;
 unlocked: boolean = false;
 access: boolean = false;
 participation: "target" | "neighbor" | "inactive" = "inactive";
 declare progressPerHour: number;
 contributors: HoleContributor[] = [];
 completedLayers: number = 0;
 dailyCoveUpgradesPurchased: number = 0;

 constructor(public index: number, public data: StudyModel) { }

 static fromBase(data: StudyBase[]) {
  return data.map(d => new Study(d.index, d.data));
 }

 parse(savedHoleData: number[][], optionListAccount: number[]): void {
  this.level = Number(savedHoleData[26][this.index] ?? 0);
  this.progress = Number(savedHoleData[27][this.index] ?? 0);
  this.access = false;
  this.unlocked = false;
  this.participation = "inactive";
  this.contributors = [];
  const resourceIndex = [1, 7, 11, 16].indexOf(this.index);
  this.completedLayers = resourceIndex < 0 ? 0 : Number(savedHoleData[11][2 * resourceIndex + 1] ?? 0);
  this.dailyCoveUpgradesPurchased = this.index === 17 ? Number(optionListAccount[604] ?? 0) : 0;
 }
 prepareAccess(cavernCount: number): void {
  this.access = this.index < cavernCount;
  this.unlocked = this.access;
 }

 getRequirement(): number {
  return 4000 * Math.pow(1.25, this.level) * Math.pow(1.5, Math.floor(this.index / 5));
 }

 get claimReady(): boolean {
  return this.access && this.progress >= this.getRequirement();
 }

 get ownedRule(): boolean {
  return this.level >= 1;
 }

 getBonus(): number {
  if (this.index === 9) return this.ownedRule ? 50 + this.level * this.data.multiplier : 0;
  if (this.index === 3) return this.ownedRule ? Math.min(32, 12 + this.level * this.data.multiplier) : 0;
  return this.level * this.data.multiplier;
 }

 prepareRate(participation: Study["participation"], rate: number, contributors: HoleContributor[]): void {
  this.participation = participation;
  this.progressPerHour = participation === "inactive" ? 0 : rate;
  this.contributors = participation === "inactive" ? [] : contributors;
 }

 getEffects(): StudyEffect[] {
  const bonus = this.getBonus();
  const owned = this.ownedRule;
  const owner = `cavern:${this.index}`;
  const effects: StudyEffect[] = [];
  const effect = (key: string, value: number, unit: StudyNumericEffectUnit,
   note: string | null = null) => {
   effects.push({ key, value, unit, owner, scope: "owned-study-contribution", note });
  };
  const ruleEffect = (key: string, value: boolean, note: string | null = null) => {
   effects.push({ key, value, unit: "rule", owner, scope: "owned-study-rule", note });
  };
  switch (this.index) {
   case 0:
    effect("sediment-retained-after-expansion", owned ? 75 : 50, "percent");
    effect("bucket-fill-per-expansion", bonus, "percent");
    break;
   case 1:
   case 7:
   case 11:
   case 16:
    effect("skilling-requirement-divisor-contribution-per-layer", bonus, "percent",
     "Each completed layer adds this percentage to the Study divisor contribution.");
    effect("skilling-requirement-divisor-contribution", bonus * this.completedLayers, "percent",
     "Summed Study and collectible contributions form the denominator 1 + sum / 100. This additive contribution is not a literal requirement reduction.");
    break;
   case 2:
    effect("score-per-defeated-golden-hound", 1 + bonus / 100, "multiplier");
    ruleEffect("golden-hound-respawns", owned);
    break;
   case 3:
    effect("minimum-damage-share-of-maximum", bonus, "percent");
    ruleEffect("skip-guaranteed-one-hit-fights", owned);
    break;
   case 4:
    effect("random-bonus-levels-every-twentieth-ring", bonus, "levels");
    break;
   case 5:
    effect("string-experience", 1 + Number(owned), "multiplier");
    effect("exceptional-string-experience-chance", owned ? 1 : 0, "percent");
    effect("exceptional-string-experience", owned ? 1 + bonus : 1, "multiplier");
    break;
   case 6:
    effect("additional-daily-wishes", bonus, "wishes/day");
    break;
   case 8:
    effect("credited-gloomie-kills", 1 + bonus / 100, "multiplier");
    break;
   case 9:
    effect("additional-linear-reward-days", owned ? 14 : 0, "days");
    effect("opal-reward-chance", 1 + bonus / 100, "multiplier");
    break;
   case 10:
    ruleEffect("choose-enchantment-target", owned);
    effect("enchantment-chance", 1 + bonus / 100, "multiplier");
    break;
   case 12:
    ruleEffect("instamatch-when-round-ends-with-none", owned,
     "The round caller also requires normal-story instamatch capacity of at least one.");
    effect("additional-starting-attempts", bonus, "attempts");
    break;
   case 13:
    effect("total-gambit-points", bonus, "percent");
    effect("preserve-daily-attempt-chance", owned ? 50 : 0, "percent");
    break;
   case 14:
    effect("additional-double-torch-chance", bonus, "percent");
    break;
   case 15:
    ruleEffect("owned-repeat-marbleization-rule", owned,
     "This is the owned Study rule, not cavern permission. The delivered marbleization caller checks upgrade exclusions without a Study check.");
    effect("marble-production", 1 + bonus / 100, "multiplier");
    break;
   case 17:
    effect("daily-discounted-upgrades", bonus, "upgrades");
    effect("discounted-upgrade-cost", owned ? 0.85 : 1, "multiplier");
    effect("current-upgrade-cost", this.dailyCoveUpgradesPurchased < bonus ? 0.85 : 1, "multiplier");
    break;
  }
  return effects;
 }

 getDescription(): string {
  if (this.data.description.includes("}x")) {
   return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
  }
  return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
 }
}

export type MeasurementStatisticUnit = "kills" | "crops" | "levels" | "points" | "damage" | "items" | "study-levels" | "none";

export class Measurement {
 unlocked!: boolean;
 access!: boolean;
 level: number = 0;
 cosmosBonus: number = 0;
 fountainDiscountPercent!: number;
 declare currency: HoleCurrency;
 shortfall!: number;
 affordable!: boolean;
 gloomieKills: number = 0;
 cropsCount: number = 0;
 accountLevel: number = 0;
 tomeScore: number = 0;
 allSkillLevel: number = 0;
 deathnotePts: number = 0;
 highestDmg: number = 0;
 slabItems: number = 0;
 studiesDone: number = 0;
 golemKills: number = 0;

 constructor(public index: number, public data: MeasurementModel) { }

 get requiredMinauLevel(): number {
  return this.index + 1;
 }

 static fromBase(data: MeasurementBase[]): Measurement[] {
  return data.map(record => new Measurement(record.index, record.data));
 }

 get statisticType(): number {
  return Number(this.data.measurementType.type);
 }

 get statisticId(): string {
  return `hole-measurement-statistic:${this.statisticType}`;
 }

 get statisticUnit(): MeasurementStatisticUnit {
  switch (this.statisticType) {
   case 0: case 10: return "kills";
   case 1: return "crops";
   case 2: case 4: return "levels";
   case 3: case 6: return "points";
   case 7: return "damage";
   case 8: return "items";
   case 9: return "study-levels";
   default: return "none";
  }
 }

 get rawStatistic(): number {
  return this.getMeasurementQTYfound();
 }

 get normalizedQuantity(): number {
  return this.getMeasurementQTYfound(true);
 }

 get multiplier(): number {
  return this.getMeasurementMulti();
 }

 get baseBenefit(): number {
  return this.getMeasurementBaseBonus();
 }

 get effectiveBenefit(): number {
  return this.getBonus();
 }

 get nextCost(): number {
  return this.getCost();
 }

 parse(savedHole: number[][]): void {
  this.level = Number(savedHole[22][this.index] ?? 0);
  this.gloomieKills = Number(savedHole[11][28] ?? 0);
  this.golemKills = Number(savedHole[11][63] ?? 0);
 }

 prepareCampEffects(minau: Villager, lengthmeister: CosmoUpgrade): void {
  this.access = minau.level > this.index;
  this.unlocked = this.access;
  this.cosmosBonus = lengthmeister.getBonus();
 }

 prepare(inputs: { minau: Villager; lengthmeister: CosmoUpgrade; fountainDiscountPercent: number;
  crops: number; accountLevel: number; tomeScore: number; skillLevel: number;
  deathnotePoints: number; highestDamage: number; slabItems: number; studyLevels: number }): void {
  this.prepareCampEffects(inputs.minau, inputs.lengthmeister);
  this.fountainDiscountPercent = inputs.fountainDiscountPercent;
  this.cropsCount = inputs.crops;
  this.accountLevel = inputs.accountLevel;
  this.tomeScore = inputs.tomeScore;
  this.allSkillLevel = inputs.skillLevel;
  this.deathnotePts = inputs.deathnotePoints;
  this.highestDmg = inputs.highestDamage;
  this.slabItems = inputs.slabItems;
  this.studiesDone = inputs.studyLevels;
 }

 prepareInspection(): void {
  this.shortfall = Math.max(0, this.nextCost - this.currency.stock);
  this.affordable = this.currency.stock >= this.nextCost;
 }

 getMeasurementQTYfound(isForMultiplier: boolean = false): number {
  switch (this.statisticType) {
   case 0: return isForMultiplier ? lavaLog(this.gloomieKills) : this.gloomieKills;
   case 1: return isForMultiplier ? this.cropsCount / 14 : this.cropsCount;
   case 2: return isForMultiplier ? this.accountLevel / 500 : this.accountLevel;
   case 3: return isForMultiplier ? this.tomeScore / 2500 : this.tomeScore;
   case 4: return isForMultiplier
    ? this.allSkillLevel / 5000 + Math.max(0, this.allSkillLevel - 18000) / 1500 : this.allSkillLevel;
   case 6: return isForMultiplier ? this.deathnotePts / 125 : this.deathnotePts;
   case 7: return isForMultiplier ? lavaLog(this.highestDmg) / 2 : this.highestDmg;
   case 8: return isForMultiplier ? this.slabItems / 150 : this.slabItems;
   case 9: return isForMultiplier ? this.studiesDone / 6 : this.studiesDone;
   case 10: return isForMultiplier ? Math.max(0, lavaLog(this.golemKills) - 2) : this.golemKills;
   default: return 0;
  }
 }

 getMeasurementMulti(): number {
  const quantity = this.getMeasurementQTYfound(true);
  return quantity < 5 ? 1 + 18 * quantity / 100 : 1 + (18 * quantity + 8 * (quantity - 5)) / 100;
 }

 getMeasurementBaseBonus(): number {
  const base = parseFloat(this.data.formula);
  const multiplier = 1 + this.cosmosBonus / 100;
  return this.data.formulaType === "TOT" ? multiplier * (base * this.level / (100 + this.level))
   : multiplier * base * this.level;
 }

 getBonus(): number {
  return this.getMeasurementBaseBonus() * this.getMeasurementMulti();
 }

 getCost(): number {
  return 1 / (1 + this.fountainDiscountPercent / 100)
   * (250 + 50 * this.level) * Math.pow(1.6, this.index - 6 * Math.floor(this.index / 10))
   * Math.pow(1.1, this.level);
 }

 getDescription(): string {
  return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
 }
}

export class MonumentBonus {
 level: number = 0;
 monumentSelfBoost: number = 0;
 cosmoBonus: number = 0;
 fountainBonus: number = 0;
 constructor(public index: number, public data: MonumentBonusModel, public monumentIndex: number) { }

 getBonus(): number {
  let bonusMultiplier = 1;

  // Apply ROG and Cosmo bonuses if i != 9
  if (this.index !== 9) {
   bonusMultiplier = 1 + this.monumentSelfBoost / 100;
   bonusMultiplier += this.cosmoBonus / 100;
  }

  // Fountain bonuses apply to every monument bonus, including bonus 9.
  bonusMultiplier *= 1 + this.fountainBonus / 100;

  if (this.data.multiplier < 30) {
   return this.level * this.data.multiplier * Math.max(1, bonusMultiplier);
  } else {
   return (
    0.1 *
    Math.ceil(
     (this.level / (250 + this.level)) *
     10 *
     this.data.multiplier *
     Math.max(1, bonusMultiplier)
    )
   );
  }
 }

 getDescription(): string {
  if (this.data.description.includes("}x")) {
   return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
  }
  return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
 }
}

export class MonumentUnlock {
 unlocked: boolean = false;
 constructor(public index: number, public data: MonumentUnlockModel) { }
}

export class Monument {
 hours: number = 0;
 bonuses: MonumentBonus[] = [];
 unlocks: MonumentUnlock[] = [];
 highestRound: number = 0;

 constructor(
  public index: number,
  public name: string,
  public bonusesData: MonumentBonusModel[],
  public unlocksData: MonumentUnlockModel[],
 ) {
  this.bonusesData.forEach(bonus => {
   this.bonuses.push(new MonumentBonus(bonus.index, bonus, this.index));
  })
  this.unlocksData.forEach(unlock => {
   this.unlocks.push(new MonumentUnlock(unlock.index, unlock));
  })
 }
}

export class WisdomMonument extends Monument {
 highestPureMemoryRound: number = 0;
}

export class Monuments {
 monuments: Record<string, Monument> = {}
 constructor() {
  const data = initMonumentRepo();
  data.forEach(monument => {
   if (monument.data.name == "Wisdom") {
    this.monuments[monument.data.name] = new WisdomMonument(monument.index, monument.data.name, monument.data.bonuses, monument.data.unlocks);
   } else {
    this.monuments[monument.data.name] = new Monument(monument.index, monument.data.name, monument.data.bonuses, monument.data.unlocks);
   }
  })
 }
}

export type BellImprovementWallet =
 | { type: "character"; currency: string; values: { playerID: number; balance: number; affordable: boolean }[] }
 | { type: "account"; currency: string; balance: number | null; affordable: boolean | null };

export class BellImprovement {
 level: number = 0;
 cost: number = 0;
 quantity: number = 0;
 declare wallet: BellImprovementWallet;

 constructor(public index: number, public data: BellImprovementModel) { }
}

export class BellBonus {
 level: number = 0;

 constructor(public index: number, public data: BellBonusModel) { }

 getBonus(): number {
  return this.level * Number(this.data.value);
 }

 getDescription(): string {
  const bonus = this.getBonus();
  if (this.data.description.includes("}x")) {
   return this.data.description.replace(/}/g, (1 + bonus / 100).toFixed(2));
  }
  return this.data.description.replace(/[{}]/g, bonus.toFixed(2));
 }
}

export class Bell {
 improvements: BellImprovement[] = [];
 bonuses: BellBonus[] = [];
 modeNames = ["Ringing", "Pinging", "Cleaning", "Renewing"];
 mode: number | null = null;
 // Game's BellTypesOwned is 3, the maximum mode index; modes 0 through 3 are available.
 maximumModeIndex = 3;
 unlockedModeCount = this.maximumModeIndex + 1;
 xpBanks: number[] = [];
 improvementProgress: number[] = [];
 modeRates: number[] = [];
 modeRequirements: number[] = [];
 cleanMethodCount: number = 0;
 cleanFailures: number = 0;
 cleanOdds: number = 0;
 get ringsSinceRenew(): number {
  return this.improvementProgress[0];
 }
 get methodsOwned(): number {
  return Math.min(6, this.cleanMethodCount + 1);
 }
 renewEffects: { resetBellXp: number; renewXpConsumed: number; clearedBonusLevels: number[]; retainedImprovementLevels: number[]; retainedOpals: number } =
  { resetBellXp: 0, renewXpConsumed: 0, clearedBonusLevels: [], retainedImprovementLevels: [], retainedOpals: 0 };

 constructor() {
  this.improvements = initBellImprovementRepo().map(record => new BellImprovement(record.index, record.data));
  this.bonuses = initBellBonusRepo().map(record => new BellBonus(record.index, record.data));
 }

 parse(holeData: number[][], selectedMode: number | null): void {
  const improvementLevels = holeData[16];
  const bonusLevels = holeData[17];
  const bellState = holeData[18];
  this.mode = selectedMode == null ? null : Number(selectedMode);
  this.cleanMethodCount = Number(bellState[5] ?? 0);
  this.cleanFailures = Number(holeData[11][31] ?? 0);
  this.xpBanks = Array.from({ length: 4 }, (_, index) => Number(bellState[index * 2] ?? 0));
  this.improvementProgress = Array.from({ length: 4 }, (_, index) => Number(bellState[index * 2 + 1] ?? 0));
  this.modeRates = [];
  this.modeRequirements = [];
  this.improvements.forEach(improvement => {
   improvement.level = Number(improvementLevels[improvement.index] ?? 0);
   improvement.cost = 0;
   improvement.quantity = 0;
  });
  this.bonuses.forEach(bonus => {
   bonus.level = Number(bonusLevels[bonus.index] ?? 0);
  });
  this.cleanOdds = 0;
  this.renewEffects = {
   resetBellXp: this.xpBanks[0],
   renewXpConsumed: this.xpBanks[3],
   clearedBonusLevels: Array.from({ length: 12 }, (_, index) => Number(bonusLevels[index] ?? 0)),
   retainedImprovementLevels: this.improvements.map(improvement => improvement.level),
   retainedOpals: Number(holeData[9][0] ?? 0),
  };
 }

 prepare(hole: Hole, players: Player[], gaming: Gaming, divinity: Divinity): void {
  const methodCount = this.cleanMethodCount;
  const failures = this.cleanFailures;
  const cleanUpgrade = hole.schematics[43];
  const cleanModifier = cleanUpgrade.getBonus(25) * failures;
  this.cleanOdds = Math.min(0.9,
   (0.6 / Math.max(1, 0.8 * methodCount + 1)) * (1 + cleanModifier / 100));

  const quantitySchematic = hole.schematics[45];
  const quantityMultiplier = quantitySchematic.getBonus(0);
  this.improvements.forEach(improvement => {
   const level = improvement.level;
   const baseCost = Number(improvement.data.baseValue);
   const exponent = improvement.index === 0 ? 1.25 : improvement.index === 2 ? 1.5 : 1.1;
   improvement.cost = baseCost * Math.pow(exponent, level);
   improvement.quantity = 2 * level * Math.max(1, quantityMultiplier * improvement.data.quantityCoefficient);
   const cost = improvement.cost;

   if (improvement.index === 0) {
    improvement.wallet = { type: "character", currency: improvement.data.resource, values: players.map(player => ({
     playerID: player.playerID,
     balance: player.money,
     affordable: player.money >= cost,
    })) };
    return;
   }

   let walletBalance: number | null;
   switch (improvement.index) {
    case 1: walletBalance = hole.currencies[3].stock; break;
    case 2: walletBalance = gaming.bits; break;
    case 3: walletBalance = hole.currencies[14].stock; break;
    case 4: walletBalance = divinity.atomsBalance; break;
    case 5: walletBalance = hole.currencies[25].stock; break;
    default: walletBalance = null;
   }
   improvement.wallet = {
    type: "account",
    currency: improvement.data.resource,
    balance: walletBalance,
    affordable: walletBalance === null ? null : walletBalance >= cost,
   };
  });

  const ringQuantities = [this.improvements[0].quantity, this.improvements[2].quantity,
   this.improvements[4].quantity, this.improvements[5].quantity];
  const pingQuantity = this.improvements[3].quantity;
  const cleanQuantity = this.improvements[1].quantity;
  const monument = hole.getMonumentBonus("Bravery", 7);
  const measurement = hole.measurements[2].effectiveBenefit;
  const jar11 = hole.jar.jarBonuses[11].getBonus();
  const jar36 = hole.jar.jarBonuses[36].getBonus();
  const ringRate = 10 * (1 + monument / 100) * (1 + measurement / 100) *
   (1 + ringQuantities.reduce((sum, value) => sum + value, 0) / 100) *
   (1 + jar11 / 100) * (1 + jar36 / 100);
  const pingRate = 10 * (1 + monument / 100) * (1 + measurement / 100) * (1 + pingQuantity / 100);
  const cleanRate = 10 * (1 + cleanQuantity / 100);
  this.modeRates = [ringRate, pingRate, cleanRate, 10];

  const ringProgress = this.improvementProgress[0];
  const pingProgress = this.improvementProgress[1];
  const cleanProgress = this.improvementProgress[2];
  this.modeRequirements = [
   (5 + 3 * ringProgress) * Math.pow(1.05, ringProgress),
   (10 + 10 * pingProgress + Math.pow(pingProgress, 2.5)) * Math.pow(1.75, pingProgress),
   100 * Math.pow(3, cleanProgress),
   25,
  ];
 }
 getMethodTiming(index: number):
  | { status: "ready"; hours: 0 }
  | { status: "estimate"; hours: number }
  | { status: "no-rate"; hours: null } {
  const bank = this.xpBanks[index];
  const rate = this.modeRates[index];
  const requirement = this.modeRequirements[index];
  if (bank >= requirement) return { status: "ready", hours: 0 };
  if (rate <= 0) return { status: "no-rate", hours: null };
  return { status: "estimate", hours: (requirement - bank) / rate };
 }
 get selectedRate(): number | null {
  return this.mode === null ? null : this.modeRates[this.mode] ?? null;
 }

 get selectedRequirement(): number | null {
  return this.mode === null ? null : this.modeRequirements[this.mode] ?? null;
 }

}

export interface HoleCharacterCapability {
 playerID: number;
 playerName: string;
 skill: SkillingSkill;
 efficiency: number;
 meetsThreshold: boolean | null;
}
const resourceCavernSkills = [
 SkillsIndex.Mining, SkillsIndex.Catching, SkillsIndex.Chopping, SkillsIndex.Fishing,
] as const;

export class ResourceCavren {
 layer: number = 0;
 layerState: number = 0;
 resourceExtracted: number = 0;
 resourceCurrent: number = 0;
 completedLayers: number = 0;
 declare resourceRequirement: number;
 declare resourceRemaining: number;
 declare resourceRequirementMet: boolean;
 declare efficiencyThreshold: number;
 efficiencyType: string = "";
 readonly cavernId: number;
 characterCapabilities: HoleCharacterCapability[] = [];

 constructor(public index: number, public name: string, public resource: string) {
  this.cavernId = [1, 7, 11, 16][index];
  switch (resource) {
   case "Ores":
    this.efficiencyType = "Mining";
    break;
   case "Bugs":
    this.efficiencyType = "Catching";
    break;
   case "Logs":
    this.efficiencyType = "Chopping";
    break;
   case "Fish":
    this.efficiencyType = "Fishing";
    break;
   default:
    this.efficiencyType = "";
    break;
  }
 }

 parse(savedHole: number[][]): void {
  this.resourceCurrent = Number(savedHole[11][this.index * 2] ?? 0);
  this.layerState = Number(savedHole[11][this.index * 2 + 1] ?? 0);
  this.completedLayers = Number(savedHole[7][this.cavernId] ?? 0);
  this.layer = this.layerState;
  this.resourceExtracted = this.resourceCurrent;
 }

 prepare(reductions: number): void {
  this.efficiencyThreshold = 0.25 * 20000 * (1 + 99 * Math.floor(this.index / 3))
   * Math.pow(1.8, 1 + this.layerState);

  const requirementBase = (1 + 99 * Math.floor(this.index / 3)) * 200;
  this.resourceRequirement = requirementBase * Math.pow(2.2, 1 + this.layerState) / (1 + reductions / 100);
  this.resourceRemaining = Math.max(0, this.resourceRequirement - this.resourceCurrent);
  this.resourceRequirementMet = this.resourceCurrent >= this.resourceRequirement;
 }

 prepareCharacterCapabilities(players: Player[], assignments: (number | null)[], skilling: Skilling): void {
  this.characterCapabilities = [];
  const skill = resourceCavernSkills[this.index];

  assignments.forEach((assignedCavernId, playerIndex) => {
   if (assignedCavernId !== this.cavernId) return;
   const player = players.find(candidate => candidate.playerID === playerIndex);
   if (!player) return;

   const efficiency = skilling.getSkillEfficiency(player.playerID, skill);
   if (efficiency === null) return;
   this.characterCapabilities.push({
    playerID: player.playerID,
    playerName: player.playerName,
    skill,
    efficiency,
    meetsThreshold: efficiency >= this.efficiencyThreshold,
   });
  });
 }
}

export class ResourceCavrens {
 cavrens: Record<string, ResourceCavren> = {
  "Motherload": new ResourceCavren(0, "Motherload", "Ores"),
  "The Hive": new ResourceCavren(1, "The Hive", "Bugs"),
  "Evertree": new ResourceCavren(2, "Evertree", "Logs"),
  "The Bottomless Trench": new ResourceCavren(3, "The Bottomless Trench", "Fish"),
 };
 lifetimeMotherlodeOre: number = 0;
 sharedClaimCounter: number = 0;
 characterAssignments: number[] = [];

 parse(savedHole: number[][], optionListAccount: number[], assignments: number[]): void {
  Object.values(this.cavrens).forEach(cavern => cavern.parse(savedHole));
  this.lifetimeMotherlodeOre = Number(savedHole[11][32] ?? 0);
  this.sharedClaimCounter = Number(optionListAccount[318] ?? 0);
  this.characterAssignments = assignments.map(assignment => Number(assignment ?? 0));
 }
 getRemainingSharedClaims(): number {
  return Math.max(0, 6 - this.sharedClaimCounter);
 }

 prepare(reductions: number): void {
  Object.values(this.cavrens).forEach(cavern => cavern.prepare(reductions));
 }

 getTotalResourceLayers(): number {
  return Object.values(this.cavrens).reduce(
   (sum, cavern) => sum + Math.round(Math.max(0, cavern.layer)),
   0,
  );
 }
}

const harpStringImages: ImageData[] = [
 { location: "HoleHarpString0", width: 25, height: 28 },
 { location: "HoleHarpString1", width: 25, height: 28 },
 { location: "HoleHarpString2", width: 25, height: 28 },
 { location: "HoleHarpString3", width: 25, height: 28 },
 { location: "HoleHarpString4", width: 25, height: 28 },
 { location: "HoleHarpString5", width: 25, height: 28 },
 { location: "HoleHarpString6", width: 25, height: 28 },
];
export class HarpString {
 level: number = 0;
 experience: number = 0;
 unlocked: boolean = false;
 assignedSlots: number[] = [];
 imageData: ImageData;
 passiveBonus: number = 0;
 nextLevelExperience: number = 0;

 constructor(public index: number, public data: HarpStringModel) {
  this.imageData = harpStringImages[index];
 }

 getBonus(): number {
  return this.level * this.data.multiplier;
 }

 getPassiveDescription(): string | null {
  if (this.data.multiplier === 0) return null;

  const bonus = this.getBonus();
  const descriptionStart = this.data.description.indexOf("@ LV bonus:");
  if (descriptionStart === -1) return null;
  const passiveDescription = this.data.description.slice(descriptionStart + 2);
  if (passiveDescription.includes("+}%")) {
   return passiveDescription.replace("+}%", `+${bonus}%`);
  }
  return passiveDescription.replace(/\s+x/, ` ${(1 + bonus / 100).toFixed(2)}x`);
 }
}

export type HarpTriggerEffectContext =
 | { type: "notes"; noteCount: number | null; firstNoteIndex: number | null; lastNoteIndex: number | null; produced: number | null }
 | { type: "opal"; chance: number | null }
 | { type: "experience"; additionalRecipients: number[] | null }
 | { type: "none" };

export interface HarpExperienceContext {
 regularGain: number | null;
 studyBonusGain: number | null;
 randomBranchChance: number;
 studyBonusGateActive: boolean;
 effectiveStudyBonusChance: number | null;
}

export interface HarpAssignedStringContext {
 slot: number;
 stringIndex: number;
 sequenceOrder: number;
 passiveBonus: number;
 triggerStatus: "power-below-threshold" | "runtime-cycle-state-unavailable";
 effect: HarpTriggerEffectContext;
 experience: HarpExperienceContext;
}

export class Harp {
 notes: { name: string; index: number; current: number; accessible: boolean }[] = [];
 strings: HarpString[] = [];
 stringCount: number = 0;
 slotCount: number = 0;
 opals: number = 0;
 declare baselineOpalChance: number;
 power: number = 0;
 powerPerHour: number = 0;
 tune: number | null = null;
 selectedNote: number | null = null;
 layout: (number | null)[] = [];
 highestUnlockedNoteIndex: number = 0;
 noteCost: number | null = null;
 assignedStringEffects: HarpAssignedStringContext[] = [];
 studyBonusGateActive: boolean = false;

 constructor() {
  this.notes = initHarpNotesRepo().map(note => ({
   name: note.data.noteName, index: note.index, current: 0, accessible: false,
  }));
  this.strings = initHarpStringsRepo().map(string => new HarpString(string.index, string.data));
 }

 parse(holeData: number[][], selectedNote: number | null, layout: (number | null | undefined)[]): void {
  const noteBalances = holeData[9];
  const savedHarp = holeData[11];
  const stringData = holeData[19];
  this.highestUnlockedNoteIndex = Number(savedHarp[20] ?? 0);
  this.selectedNote = selectedNote == null ? null : Number(selectedNote);
  this.opals = Number(holeData[7][5] ?? 0);
  this.tune = this.selectedNote;
  this.power = Number(savedHarp[22] ?? 0);
  this.layout = layout.map(value => value == null ? null : Number(value));
  this.slotCount = 0;
  this.notes.forEach(note => {
   note.current = Number(noteBalances[10 + note.index] ?? 0);
   note.accessible = note.index <= this.highestUnlockedNoteIndex;
  });
  this.strings.forEach(string => {
   string.level = Number(stringData[2 * string.index] ?? 0);
   string.unlocked = string.level > 0;
   string.experience = Number(stringData[2 * string.index + 1] ?? 0);
   string.passiveBonus = string.getBonus();
   string.nextLevelExperience = (4 + string.level) * Math.pow(1.15, string.level);
   string.assignedSlots = this.layout.flatMap((assigned, slot) => assigned === string.index ? [slot] : []);
  });
  this.stringCount = this.strings.reduce((sum, string) => sum + (string.unlocked ? 1 : 0), 0);
  this.noteCost = this.highestUnlockedNoteIndex >= 9
   ? null : Harp.getNextNoteCost(this.highestUnlockedNoteIndex);
 }

 prepare(hole: Hole): void {
  const powerString = this.strings[2];
  this.powerPerHour = 200 * (1 + powerString.level * powerString.data.multiplier / 100);
  const opals = this.opals;
  const savedPower = this.power;
  const stringyEffect = hole.schematics[39];
  const varietyEffect = hole.schematics[38];
  const q = Math.pow(0.2, opals + 1);
  const varietyContribution = varietyEffect.getHarpVarietyIntrinsicBonus();
  const bonus = 1 + (stringyEffect.getBonus(15) + varietyContribution) / 100;
  this.baselineOpalChance = Math.min(1,
   bonus * (1 - Math.pow(1 - q, Math.max(1, savedPower / 100))));

  const stringExperienceStudy = hole.studies[5];
  this.studyBonusGateActive = stringExperienceStudy.ownedRule;
  const triggerStatus = this.power < 100 ? "power-below-threshold" : "runtime-cycle-state-unavailable";
  const assignedEffects: HarpAssignedStringContext[] = [];
  for (let slot = 0; slot < this.slotCount; slot++) {
   const stringIndex = this.layout[slot];
   if (stringIndex == null) continue;
   const string = this.strings[stringIndex];
   if (string === undefined) continue;
   const experience: HarpExperienceContext = {
    regularGain: null, studyBonusGain: null, randomBranchChance: 0.01,
    studyBonusGateActive: this.studyBonusGateActive,
    effectiveStudyBonusChance: this.studyBonusGateActive ? 0.01 : 0,
   };
   let effect: HarpTriggerEffectContext;
   if ([0, 3, 5].includes(stringIndex)) {
    const count = stringIndex === 0 ? 1 : stringIndex === 3 ? 3
     : Math.round(1 + this.highestUnlockedNoteIndex);
    const noteLimit = Math.round(this.highestUnlockedNoteIndex);
    const first = stringIndex === 0 ? this.selectedNote === null ? null : Math.round(this.selectedNote)
     : stringIndex === 3 ? this.selectedNote === null ? null : Math.round(this.selectedNote - 1) : 0;
    const firstNoteIndex = first === null ? null : Math.max(0, Math.min(noteLimit, first));
    const lastNoteIndex = first === null || count < 1 ? null
     : Math.max(0, Math.min(noteLimit, first + count - 1));
    effect = { type: "notes", noteCount: count, firstNoteIndex, lastNoteIndex, produced: null };
   } else if (stringIndex === 1) {
    effect = { type: "opal", chance: null };
   } else if (stringIndex === 4) {
    const additionalRecipients: number[] = [];
    this.strings.forEach(candidate => {
     if (candidate.index !== 4 && candidate.unlocked) additionalRecipients.push(candidate.index);
    });
    effect = { type: "experience", additionalRecipients };
   } else {
    effect = { type: "none" };
   }
   assignedEffects.push({ slot, stringIndex, sequenceOrder: assignedEffects.length,
    passiveBonus: string.passiveBonus, triggerStatus, effect, experience });
  }
  this.assignedStringEffects = assignedEffects;
 }

 static getNextNoteCost(highestUnlockedNoteIndex: number): number {
  return 150 * Math.pow(1 + highestUnlockedNoteIndex, 1.5) * Math.pow(4.5, highestUnlockedNoteIndex);
 }
}

export class Lamp {
 zenithMarketBonus: number = 0;
 wishes: Wish[] = [];
 wishStock: number = 0;
 wishesPerDay: number = 0;
 schematicCostDiscount: number = 1;
 resetConsequences: { category: string; before: number[]; after: number[] }[] = [];
 specialBonusArray = "25,10,8;15,40,10;20,35,12;5,1,1;2,2,2".split(";");

 constructor() {
  this.wishes = Wish.fromBase(initLampWishRepo());
 }

 parse(holeData: number[][]): void {
  const levels = holeData[21];
  this.wishStock = Number(holeData[11][25] ?? 0);
  this.wishes.forEach(wish => {
   wish.wishCount = Number(levels[wish.index] ?? 0);
  });
  this.wishesPerDay = 0;
  this.schematicCostDiscount = Math.max(0.01, Math.pow(0.85, this.wishes[5].wishCount));
  const resetSources = [
   ["All Opals Invested", holeData[3]],
   ["Conjuror PTS Invested", [...holeData[4], ...holeData[5], ...holeData[6]]],
   ["Jar Collectible Enchantment LVs", holeData[24]],
   ["All Summoning Doublers", holeData[28]],
  ] as const;
  this.resetConsequences = resetSources.map(([category, values]) => ({
   category,
   before: values.map(Number),
   after: values.map(value => category === "Jar Collectible Enchantment LVs"
    ? Math.min(Number(value), 1) : category === "All Summoning Doublers" ? -1 : 0),
  }));
 }

 prepare(hole: Hole, cavernCount: number): void {
  const measurement = hole.measurements[4].effectiveBenefit;
  const cosmo = hole.majiks.HoleUpgrades[2];
  const monument = hole.getMonumentBonus("Wisdom", 7);
  const bell = hole.bell.bonuses[3].getBonus();
  const study = hole.getStudyBolaiaBonuses(6);
  this.wishesPerDay = cavernCount < 6 ? 0
   : 1 + (measurement + cosmo.getBonus() + bell + monument + 100 * study) / 100;
  this.schematicCostDiscount = Math.max(0.01, Math.pow(0.85, this.wishes[5].wishCount));
 }

 getWishCost(wishIndex: number): number | null {
  const wish = this.wishes[wishIndex];
  if (!wish) return null;
  const level = wish.wishCount;
  if (wishIndex === 0) return level < 11 ? Math.floor(1 + 2 * level + Math.pow(level, 2)) : 999999;
  if (wishIndex === 2) return Math.floor(1 + 2 * level + Math.pow(level, 1.7));
  return Math.floor(level * wish.data.x2 + wish.data.x1);
 }

 getBonus(holeBonus: boolean = false, specialIndex?: number, inlineIndex?: number): number {
  if (holeBonus) {
   const wishLevel = this.wishes[7].wishCount;
   return 25 * wishLevel * (1 + this.zenithMarketBonus / 100);
  }
  if (specialIndex != undefined && inlineIndex != undefined) {
   const wishIndex = Math.min(11, Math.round(4 + 2 * specialIndex));
   const wishLevel = this.wishes[wishIndex].wishCount;
   return Number(this.specialBonusArray[specialIndex].split(",")[inlineIndex]) * wishLevel * (1 + this.zenithMarketBonus / 100);
  }
  return 0;
 }
}

export class DawgDen {
 bestScore: number = 0;
}

export interface OpalSource {
 id: string;
 owner: string;
 name: string;
 acquisition: string;
 opals: number | null;
 unit: "Opals";
}
export interface OpalExternalSourceValues {
 "gem-shop": number | null;
 grimoire: number | null;
 companion: number | null;
 compass: number | null;
 emperor: number | null;
 schematic: number | null;
 arcane: number | null;
 sushi: number | null;
}

export interface OpalLedger {
 sources: OpalSource[];
 cavernEarned: number;
 externalEarned: number | null;
 emperorSchematicFloorAdjustment: number | null;
 externalRoundingAdjustment: number | null;
 earned: number | null;
 invested: number;
 uninvested: number | null;
}

export interface LanternLocation {
 kind: "storage" | "character";
 playerId: number | null;
 playerName: string | null;
 quantity: number;
}

export interface LanternSummary {
 itemId: "Quest90";
 name: string;
 locations: LanternLocation[];
 totalStock: number;
 usesToday: number;
 dailyLimit: number;
 hoursPerUse: number;
 advances: string[];
 excludes: string[];
}

export interface AnotherTryReset {
 category: "Opals" | "Majik" | "Jar enchantments" | "Summoning doublers";
 clears: string[];
 retains: string[];
}


export class Hole extends Domain {
 // Raw
 playerLocationData: number[] = []

 // Processed
 villagers: Villager[] = Villagers.getVillagers();
 majiks = new Majiks();
 schematics: Schematic[] = Schematic.fromBase(
  initHoleBuildingRepo(),
  (schematicIndex, baseMultiplier) => this.getSchematicBonus(schematicIndex, baseMultiplier),
 );
 studies: Study[] = Study.fromBase(initStudyRepo());
 measurements: Measurement[] = Measurement.fromBase(initMeasurementRepo());
 currencies: HoleCurrency[] = HoleCurrency.fromBase(initHoleCurrencyRepo());
 savedGemShopBucketPurchase: number = 0;
 wellExpansionLevel: number = 0;

 get schematicCatalogue(): Schematic[] {
  return [...this.schematics].sort((left, right) => left.orderPosition - right.orderPosition);
 }
 monuments: Monuments = new Monuments();
 bell: Bell = new Bell();
 well: Well = new Well();
 fountain: Fountain = new Fountain();
 resourceCavrens = new ResourceCavrens();
 harp: Harp = new Harp();
 lamp: Lamp = new Lamp();
 dawgDen: DawgDen = new DawgDen();
 jar: Jar = new Jar();
 cove: Cove = new Cove();
 gambit: Gambit = new Gambit();
 cavernEarnedOpals: number = 0;
 cavernOpalSources: (Omit<OpalSource, "opals"> & { opals: number })[] = [];
 declare opalLedger: OpalLedger;
 private reservedVillagerInvestments: number[] = [0, 0, 0];
 savedStudyTarget: number | null = null;
 savedStudyLevelsForMeasurements: number[] = [];
 eligibleStudyNeighbors: number[] = [];
 declare studyRate: number;
 studyContributors: HoleContributor[] = [];
 dailyLanternUses: number = 0;
 lanterns: LanternSummary = { itemId: "Quest90", name: "Blinding Lantern", locations: [],
  totalStock: 0, usesToday: 0,
  dailyLimit: 12, hoursPerUse: 2, advances: [], excludes: [] };
 earlyExplorerExpUpgrade: number = 0;
 villagerBundleBonus: number = 0;
 wishesAvailable: number = 0;
 anotherTry: { access: boolean; wishCost: number; availableWishes: number; affordable: boolean; resets: AnotherTryReset[] } =
  { access: false, wishCost: 0, availableWishes: 0, affordable: false, resets: [] };
 allocationEffects: { leastUnlockedInvestment: number; equalSpreadPercent: number;
  opalEnthusiasm: { villagerId: number; investedTens: number; percent: number }[] } =
  { leastUnlockedInvestment: 0, equalSpreadPercent: 0, opalEnthusiasm: [] };
 researchExpUpgradeLevel: number = 0;

 getResearchExpUpgradeBonus(): number {
  return this.researchExpUpgradeLevel * holeResearchExpUpgradeBasePercent;
 }

 getResourceRequirementReduction(): number {
  const studyIds = [1, 7, 11, 16];
  const studies = studyIds.map(index => this.studies[index]);
  const caverns = Object.values(this.resourceCavrens.cavrens);
  const jarBonus = this.jar.jarBonuses[5].getBonus();

  return jarBonus + studies.reduce((sum, study, index) =>
   sum + study.getBonus() * caverns[index].layerState, 0);
 }

 // Engineer - DONE?
 // Bravery
 // Bell
 // Wishes - DONE?
 // Harp?
 // Measurement?

 // Get the bonus for a specific schematic by index
 getSchematicBonus(schematicIndex: number, baseMultiplier: number = 1): number {
  return this.schematics[schematicIndex].getBonus(baseMultiplier);
 }

 getFountainBonus(waterIndex: number, upgradeIndex: number): number {
  return this.fountain.getBonus(waterIndex, upgradeIndex);
 }

 /**
  * Get study bonus
  * @param studyIndex - Index of the study to get bonus for
  */
 getStudyBolaiaBonuses(studyIndex: number): number {
  return this.studies[studyIndex].getBonus();
 }

 getMonumentBonus(monumentName: string, bonusIndex: number): number {
  return this.monuments.monuments[monumentName].bonuses[bonusIndex].getBonus();
 }


 getMonumentBonusByText(text: string): number {
  const allBonuses = Object.values(this.monuments.monuments).flatMap(monument => monument.bonuses);
  return allBonuses.reduce((sum, bonus) => {
   if (bonus.data.description.includes(text)) {
    return sum + bonus.getBonus();
   }
   return sum;
  }, 0);
 }

 prepareSharedStudyEffects(): void {
  const explorer = this.villagers[VillagerIndex.Polonai];
  const cavernCount = Math.min(this.studies.length, explorer.level);
  this.studies.forEach(study => study.prepareAccess(cavernCount));
  this.schematics.forEach(schematic => {
   schematic.prepareStudyBonus(this.getStudyBolaiaBonuses(0));
  });
 }

 prepareSharedUpgradeEffects(): void {
  const lengthmeister = this.majiks.villageUpgradesByIndex[12];
  this.measurements.forEach(measurement => measurement.prepareCampEffects(this.villagers[VillagerIndex.Minau], lengthmeister));
  const additionalStrings = this.majiks.HoleUpgrades[1];
  const stringSlots = Math.min(15, Math.round(1 + additionalStrings.getBonus() +
   [32, 33, 34, 35, 36].reduce((sum, id) => sum + this.getSchematicBonus(id, 1), 0)));
  this.harp.slotCount = stringSlots;
  this.schematics.forEach(schematic => schematic.prepareHarpStrings(stringSlots));
 }

 prepareInspection(): void {
  const explorer = this.villagers[VillagerIndex.Polonai];
  const cavernCount = Math.min(this.studies.length, explorer.level);
  // The exported order stores catalogue IDs by availability slot, not inverse ranks.
  const schematicOrder = this.schematics.map(schematic => schematic.data.order);
  this.villagers.forEach(villager => villager.prepareNextUnlock(schematicOrder, this.measurements.length, this.studies.length));
  const wish = this.lamp.wishes[1];
  const wishCost = Math.floor(wish.wishCount * wish.data.x2 + wish.data.x1);
  const access = cavernCount > 6;
  this.anotherTry = { access, wishCost, availableWishes: this.wishesAvailable,
   affordable: access && this.wishesAvailable >= wishCost,
   resets: [
    { category: "Opals", clears: ["All villager Opal investments"],
     retains: ["Earned Opals", "Villager levels", "Stored villager EXP"] },
    { category: "Majik", clears: ["All three Majik investment categories"],
     retains: ["Cosmo's saved level", "Purchased Majik points"] },
    { category: "Jar enchantments", clears: ["Collectible enchantment levels above one"],
     retains: ["Discovered collectibles at level one", "Undiscovered collectibles at level zero"] },
    { category: "Summoning doublers", clears: ["All doubler assignments"],
     retains: ["Earned Summoning doublers", "Summoning victories"] },
   ] };
 }

 prepareUpgradeInspection(players: Player[], divinity: Divinity): void {
  const kaipuLevel = this.villagers[VillagerIndex.Kaipu].level;
  this.schematics.forEach(schematic =>
   schematic.prepareInspection(kaipuLevel, this.schematics.length));
  const createdSchematics = this.schematics.filter(schematic => schematic.built).length;
  this.majiks.prepare(this.villagers[VillagerIndex.Cosmo], createdSchematics);
  this.majiks.villageUpgradesByIndex[14].equalSpreadPercent = this.allocationEffects.equalSpreadPercent;
  this.majiks.pocketDivinity.prepareCharacters(players, divinity);
  this.measurements.forEach(measurement => measurement.prepareInspection());
 }

 prepareOpalLedger(externalSourceOpals: OpalExternalSourceValues, externalSources: OpalSource[]): void {
  const sources = [...this.cavernOpalSources, ...externalSources];
  const invested = this.villagers.reduce((sum, villager) => sum + villager.opals, 0)
   + this.reservedVillagerInvestments.reduce((sum, opals) => sum + opals, 0);
  const { "gem-shop": gemShop, grimoire, companion, compass, emperor, schematic, arcane, sushi } = externalSourceOpals;
  const combinedFloor = emperor === null || schematic === null ? null : Math.floor(emperor + schematic);
  const emperorSchematicFloorAdjustment = combinedFloor === null || emperor === null || schematic === null
   ? null : combinedFloor - emperor - schematic;
  // Refresh floors the two contributions together, then rounds the nested account subtotal.
  const externalUnrounded = gemShop === null || grimoire === null || companion === null || compass === null
   || combinedFloor === null || arcane === null || sushi === null ? null
   : gemShop + grimoire + (companion + (compass + (combinedFloor + (arcane + sushi))));
  let externalEarned: number | null = null;
  let externalRoundingAdjustment: number | null = null;
  if (externalUnrounded !== null) {
   externalEarned = Math.round(externalUnrounded);
   externalRoundingAdjustment = externalEarned - externalUnrounded;
  }
  const earned = externalEarned === null ? null : this.cavernEarnedOpals + externalEarned;
  this.opalLedger = { sources, cavernEarned: this.cavernEarnedOpals, externalEarned, emperorSchematicFloorAdjustment,
   externalRoundingAdjustment,
   earned, invested, uninvested: earned === null ? null : earned - invested };
 }

 prepareLanternSummary(storage: Storage, players: Player[]): void {
  const locations: LanternLocation[] = [{
   kind: "storage", playerId: null, playerName: null,
   quantity: storage.chest.reduce((sum, item) => sum + (item.internalName === "Quest90" ? item.count : 0), 0),
  }, ...players.map((player): LanternLocation => ({
   kind: "character", playerId: player.playerID, playerName: player.playerName,
   quantity: storage.playerStorage[player.playerID].reduce((sum, item) => sum + (item.internalName === "Quest90" ? item.count : 0), 0),
  }))];
  this.lanterns = { itemId: "Quest90", name: "Blinding Lantern", locations,
   totalStock: locations.reduce((sum, location) => sum + location.quantity, 0),
   usesToday: this.dailyLanternUses,
   dailyLimit: 12, hoursPerUse: 2,
   advances: ["Rescued villager EXP", "Selected and eligible adjacent Study progress", "Supported passive cavern accrual", "Monument lifetime hours"],
   excludes: ["Skilling layers and resource extraction", "Active challenges", "Other daily claim allowances"],
  };
 }

 prepareStudyProgress(superbitOwned: boolean, stampBonus: number): void {
  const bolaia = this.villagers[VillagerIndex.Bolaia];
  const fountain = this.fountain.getBonus(1, 14);
  const perLevel = 5 + this.getSchematicBonus(85, 2) + this.getSchematicBonus(87, 3)
   + this.getSchematicBonus(88, 5) + this.getSchematicBonus(99, 5);
  const collectible = this.jar.jarBonuses[16].getBonus();
  const majik = this.majiks.VillageUpgrades[4].getBonus();
  this.studyContributors = [
   { source: "Base Study rate", owner: "hole", value: 100, unit: "progress/hour", combination: "base" },
   { source: "Bolaia level", owner: "villager:4", value: bolaia.level, unit: "count", combination: "additive" },
   { source: "Base progress per Bolaia level", owner: "villager:4", value: 5, unit: "percent", combination: "additive" },
   { source: this.schematics[85].data.name, owner: "schematic:85", value: this.getSchematicBonus(85, 2),
    unit: "percent", combination: "additive" },
   { source: this.schematics[87].data.name, owner: "schematic:87", value: this.getSchematicBonus(87, 3),
    unit: "percent", combination: "additive" },
   { source: this.schematics[88].data.name, owner: "schematic:88", value: this.getSchematicBonus(88, 5),
    unit: "percent", combination: "additive" },
   { source: this.schematics[99].data.name, owner: "schematic:99", value: this.getSchematicBonus(99, 5),
    unit: "percent", combination: "additive" },
   { source: "Fountain Study rate", owner: "cavern:15", value: fountain,
    unit: "percent", combination: "multiplicative" },
   { source: this.jar.jarBonuses[16].data.name, owner: "jar-collectible:16", value: collectible,
    unit: "percent", combination: "additive" },
   { source: "Study stamp", owner: "stamps", value: stampBonus, unit: "percent", combination: "additive" },
   { source: "Study All Nighter", owner: "majik:13", value: majik, unit: "percent", combination: "additive" },
  ];
  this.studyRate = 100 * (1 + fountain / 100) * (1 + perLevel * bolaia.level / 100)
   * (1 + (collectible + stampBonus + majik) / 100);
  const target = this.savedStudyTarget === null ? null : this.studies[this.savedStudyTarget];
  const potentialNeighbors = target !== null && target !== undefined && target.access && bolaia.rescued
   ? [target.index - 1, target.index + 1]
    .filter(index => index >= 0 && index < this.studies.length && this.studies[index].access)
   : [];
  this.eligibleStudyNeighbors = superbitOwned ? potentialNeighbors : [];
  this.studies.forEach(study => {
   if (!study.access || !bolaia.rescued || target === null || target === undefined || !target.access) {
    study.prepareRate("inactive", 0, []);
   } else if (study.index === target.index) {
    study.prepareRate("target", this.studyRate, [...this.studyContributors]);
   } else if (potentialNeighbors.includes(study.index) && superbitOwned) {
    study.prepareRate("neighbor", this.studyRate, [...this.studyContributors]);
   } else {
    study.prepareRate("inactive", 0, []);
  }
  });
 }

 prepareVillagerGrowth(players: Player[], statues: PlayerStatues[], inputs: VillagerAccountGrowthInputs): void {
  const villageMajiks = this.majiks.VillageUpgrades;
  const unlockedVillagers = this.villagers.filter(villager => villager.rescued);
  const leastInvestment = unlockedVillagers.length > 0
   ? Math.min(...unlockedVillagers.map(villager => villager.opals)) : this.villagers[0].opals;
  const equalSpread = villageMajiks[5].getBonus() * Math.floor(leastInvestment / 5);
  const enthusiasmPerTen = villageMajiks[0].getBonus();
  this.allocationEffects = { leastUnlockedInvestment: leastInvestment, equalSpreadPercent: equalSpread,
   opalEnthusiasm: this.villagers.map(villager => ({ villagerId: villager.index,
    investedTens: Math.floor(villager.opals / 10),
    percent: enthusiasmPerTen * Math.floor(villager.opals / 10) })) };
  const jarPercent = [4, 10, 12, 22, 29, 35].reduce(
   (sum, index) => sum + this.jar.jarBonuses[index].getBonus(), 0);
  const fountainBonus = this.fountain.getBonus(0, 14);
  const builtSchematics = this.schematics.filter(schematic => schematic.unlocked).length;
  const sharedInputs: VillagerSharedGrowthInputs = {
   ...inputs, earlyExplorerExpUpgrade: this.earlyExplorerExpUpgrade,
   cosmoFountainPercent: fountainBonus, bundleBonus: this.villagerBundleBonus,
   opalExp: 100 + this.getSchematicBonus(0, 25), jarPercent,
   equalSpreadPercent: equalSpread, enthusiasmPerTen,
   contentedCreator: villageMajiks[1].getBonus() * builtSchematics,
   enhancedMajik: villageMajiks[2].getBonus(),
   bravery: this.getMonumentBonus("Bravery", 3), justice: this.getMonumentBonus("Justice", 3),
   wisdom: this.getMonumentBonus("Wisdom", 3),
   slabItemsMeasurement: this.measurements[7].effectiveBenefit,
   gloomieSchematic: this.getSchematicBonus(48),
   gloomieCardPercent: Math.min(4 * inputs.gloomieCardLevel, 50),
   bell: this.bell.bonuses[1].getBonus(), tomeMeasurement: this.measurements[0].effectiveBenefit,
  };
  const characterInputs = players.map(player => {
   const playerStatues = statues[statues.findIndex(record => record.playerID === player.playerID)];
   const statue = playerStatues.statues[playerStatues.statues.findIndex(record => record.index === 28)];
   return { playerId: player.playerID, playerName: player.playerName, statueBonus: statue.getBonus(player) };
  });
  this.villagers.forEach(villager => villager.prepareCharacterRates(characterInputs, sharedInputs));
 }

 getRawKeys(): RawData[] {
  return [
   { key: "Holes", perPlayer: false, default: [] },
   { key: "Jars", perPlayer: false, default: null },
   { key: "BundlesReceived", perPlayer: false, default: null },
   { key: "Gaming", perPlayer: false, default: null },
   { key: "GemItemsPurchased", perPlayer: false, default: null },
  ]
 }

 init(_allItems: Item[], _charCount: number) {
  // The generated order maps a catalogue position to a stable building ID.
  const buildingOrder = this.schematics.map(schematic => schematic.data.order);
  this.schematics.forEach(schematic => {
   schematic.orderPosition = buildingOrder.indexOf(schematic.index);
   schematic.currency = this.currencies[schematic.data.costCurrencyId];
  });
  this.measurements.forEach(measurement => {
   const currencyIndex = Number(measurement.data.itemRequirement.id);
   measurement.currency = this.currencies[currencyIndex];
  });
  this.currencies.forEach(currency => {
   const requirement = this.measurements.find(measurement => Number(measurement.data.itemRequirement.id) === currency.index)
    ?.data.itemRequirement;
   if (requirement && requirement.name !== "Unknown30") {
    currency.imageData = Item.getImageData(requirement.name);
   }
  });
  return this;
 }

 parse(data: Map<string, any>): void {
  const hole = data.get(this.getDataKey()) as Hole;
  const savedHoleData = (data.get("Holes") ?? []) as number[][];
  const holeData = Array.from({ length: 35 }, (_, index) =>
   (savedHoleData[index] ?? []).map(value => Number(value ?? 0)));
  const rawAccountOptions = data.get("OptLacc") as number[] | undefined;
  const optionListAccount = rawAccountOptions ?? [];
  const bundles = (data.get("BundlesReceived") ?? null) as Record<string, number> | null;
  hole.researchExpUpgradeLevel = Number(optionListAccount[641] ?? 0);
  hole.earlyExplorerExpUpgrade = Number(optionListAccount[355] ?? 0);
  hole.villagerBundleBonus = Number(bundles?.bun_u ?? 0);
  hole.playerLocationData = [...holeData[0]];
  hole.villagers.forEach(villager => villager.parse(holeData));
  hole.studies.forEach(study => study.parse(holeData, optionListAccount));
  hole.savedStudyLevelsForMeasurements = Array.from({ length: hole.studies.length },
   (_, index) => Number(holeData[26][index] ?? 0));
  const target = savedHoleData[11]?.[61];
  hole.savedStudyTarget = target == null || Number(target) < 0 ? null : Number(target);
  hole.studyContributors = [];
  hole.allocationEffects = { leastUnlockedInvestment: 0, equalSpreadPercent: 0, opalEnthusiasm: [] };
  hole.anotherTry = { access: false, wishCost: 0, availableWishes: hole.wishesAvailable, affordable: false, resets: [] };
  hole.dailyLanternUses = Number(holeData[11][84] ?? 0);
  hole.wishesAvailable = Number(holeData[11][25] ?? 0);
  hole.reservedVillagerInvestments = holeData[3].slice(5, 8);
  hole.cavernEarnedOpals = holeData[7].reduce((sum, opals) => sum + opals, 0);
  const cavernAcquisitions = [
   "Purchased an Opal with Well sediment.",
   "Destroyed a Motherlode layer.",
   "Reached a Den score milestone.",
   "Collected an Opal reward from a Bravery run.",
   "Received an Opal from a Bell Ping.",
   "Plucked an Opal reward from a Harp string.",
   "Received an Opal from a Lamp wish.",
   "Harvested a Hive layer.",
   "Defeated a Gloomie colony.",
   "Collected an Opal reward from a Justice run.",
   "Broke a Tall Jar that contained an Opal.",
   "Whittled an Evertree trunk.",
   "Collected an Opal reward from a Wisdom run.",
   "Reached a Gambit points milestone.",
   "Defeated the Temple challenge golem.",
   "Purchased an Opal with Fountain currency.",
   "Completed a Trench depth.",
   "Purchased an Opal upgrade in the Cove.",
  ];
  hole.cavernOpalSources = hole.studies.map(study => ({
   id: `cavern:${study.index}`, owner: `cavern:${study.index}`, name: study.data.name,
   acquisition: cavernAcquisitions[study.index], opals: Number(holeData[7][study.index] ?? 0), unit: "Opals",
  }));
  hole.lanterns = { itemId: "Quest90", name: "Blinding Lantern", locations: [],
   totalStock: 0, usesToday: hole.dailyLanternUses,
   dailyLimit: 12, hoursPerUse: 2, advances: [], excludes: [] };
  const gemPurchases = (data.get("GemItemsPurchased") as number[] | null) ?? [];
  hole.savedGemShopBucketPurchase = Number(gemPurchases[2] ?? 0);
  hole.wellExpansionLevel = Number(holeData[11][1] ?? 0);
  hole.majiks.parse(holeData, Number(gemPurchases[4] ?? 0),
   [savedHoleData[11]?.[29], savedHoleData[11]?.[30]]);
  hole.currencies.forEach(currency => currency.parse(holeData[9]));
  hole.lamp.parse(holeData);
  hole.wishesAvailable = hole.lamp.wishStock;
  hole.schematics.forEach(schematic => schematic.parse(holeData, savedHoleData[20] ?? []));
  hole.measurements.forEach(measurement => measurement.parse(holeData));
  const rawFountainData: { [index: number]: unknown; 29?: number[][]; 31?: number[][]; 32?: number[][] } =
   data.get("Holes") ?? [];
  hole.fountain.parse(savedHoleData, optionListAccount, rawFountainData[31], rawFountainData[32], rawFountainData[29]);

  hole.cove.parse(optionListAccount);
  // Monument Jazz
  const braveryMonument = hole.monuments.monuments["Bravery"];
  braveryMonument.hours = Number(holeData[14][2 * braveryMonument.index] ?? 0);
  braveryMonument.highestRound = Number(holeData[11][73] ?? 0);

  const justiceMonument = hole.monuments.monuments["Justice"];
  justiceMonument.hours = Number(holeData[14][2 * justiceMonument.index] ?? 0);
  justiceMonument.highestRound = Number(holeData[11][74] ?? 0);

  const wisdomMonument = hole.monuments.monuments["Wisdom"] as WisdomMonument;
  wisdomMonument.hours = Number(holeData[14][2 * wisdomMonument.index] ?? 0);
  wisdomMonument.highestRound = Number(holeData[11][75] ?? 0);
  wisdomMonument.highestPureMemoryRound = Math.round(Math.min(12, optionListAccount[353] ?? 0) + 1);

  [braveryMonument, justiceMonument, wisdomMonument].forEach(monument => {
   monument.unlocks.forEach(unlock => {
    unlock.unlocked = monument.hours > unlock.data.hours_required;
   });
   monument.bonuses.forEach(bonus => {
    bonus.level = Number(holeData[15][10 * monument.index + bonus.index] ?? 0);
    // Monumental Vibes
    bonus.cosmoBonus = hole.majiks.HoleUpgrades[0].getBonus();
    bonus.fountainBonus = hole.fountain.getBonus(monument.index, 13);
   });
   monument.bonuses.forEach(bonus => {
    bonus.monumentSelfBoost = monument.bonuses[9].getBonus();
   });
  });

  hole.bell.parse(holeData, savedHoleData[11]?.[19] ?? null);

  hole.resourceCavrens.parse(holeData, optionListAccount, hole.playerLocationData);

  hole.well.parse(hole, holeData);
  hole.harp.parse(holeData, savedHoleData[11]?.[21] ?? null, savedHoleData[20] ?? []);

  hole.dawgDen.bestScore = Number(holeData[11][8] ?? 0);


  // Gambit
  hole.gambit.challenges.forEach(challenge => {
   challenge.maxTime = Number(holeData[11][challenge.index + 65] ?? 0);
  });

  hole.jar.parse(holeData, (data.get("Jars") as number[][] | undefined) ?? null);
 }
}

export const updateHole = (data: Map<string, any>) => {
 const hole = data.get("hole") as Hole;
 const slab = data.get("slab") as Slab;
 const taskboard = data.get("taskboard") as TaskBoard;
 const tome = data.get("tome") as Tome;
 const farming = data.get("farming") as Farming;
 const deathnote = data.get("deathnote") as Deathnote;
 const tesseract = data.get("tesseract") as Tesseract;
 const legendTalents = data.get("legendTalents") as LegendTalents;
 const zenithMarket = data.get("zenithMarket") as ZenithMarket;
 const gaming = data.get("gaming") as Gaming;
 const arcade = data.get("arcade") as Arcade;
 const players = data.get("players") as Player[];
 const divinity = data.get("divinity") as Divinity;

 // Tome quantities are numeric prepared inputs, not display-formatted strings.
 const studyLevels = hole.savedStudyLevelsForMeasurements.reduce((sum, level) => sum + level, 0);
 const lengthmeister = hole.majiks.villageUpgradesByIndex[12];
 const fountainDiscountPercent = hole.fountain.getBonus(2, 14);
 hole.measurements.forEach(measurement => measurement.prepare({
  minau: hole.villagers[VillagerIndex.Minau], lengthmeister, fountainDiscountPercent,
  crops: farming.registeredCropCount, accountLevel: tome.totalAccountLevel,
  tomeScore: tome.getHighestScore(), skillLevel: tome.totalSkillLevel,
  deathnotePoints: deathnote.getTotalWorldRank(),
  highestDamage: Number(taskboard.tasks[36].count),
  slabItems: slab.rawObtainedCount,
  studyLevels,
 }));

 // Update jar bonuses from legendary talents
 const legendTalentBonus = 1 + legendTalents.getBonusFromIndex(29) / 100;
 hole.jar.jarBonuses.forEach(bonus => {
  bonus.legendTalentBonus = legendTalentBonus;
 });
 const jarCavernLog = lavaLog(hole.jar.holdings[10]);
 const jarExplorer = hole.villagers[VillagerIndex.Polonai];
 const jarMeasurementBonus = hole.measurements[12].effectiveBenefit;
 const jarCollectibleBonus = [1, 15, 24].reduce(
  (sum, index) => sum + hole.jar.jarBonuses[index].getBonus(), jarMeasurementBonus);
 const jarProducerCount = 1 + Number(hole.getSchematicBonus(63) > 0) + Number(hole.getSchematicBonus(66) > 0);
 hole.jar.prepare({
  collectibleBonus: jarCollectibleBonus,
  cavernCount: Math.min(hole.studies.length, jarExplorer.level),
  producerCount: jarProducerCount,
  productionUpgrade67: hole.getSchematicBonus(67, 30),
  productionUpgrade74: hole.getSchematicBonus(74, 5),
  productionUpgrade72: hole.getSchematicBonus(72, 10),
  cavernLog: jarCavernLog,
 });

 // Update the lamp bonuses from zenith market
 hole.lamp.zenithMarketBonus = zenithMarket.getBonusForId(2);

 // Update the gambit multiplier
 const measurementGambitBonus = hole.measurements[13].effectiveBenefit;
 const wisdomMonumentBonus = hole.getMonumentBonus("Wisdom", 7);
 const jarBonuses = [hole.jar.jarBonuses[23].getBonus(), hole.jar.jarBonuses[30].getBonus()];
 let gambitMultipliers = measurementGambitBonus + hole.getStudyBolaiaBonuses(13);
 gambitMultipliers += tesseract.getUpgradeBonus(47) + wisdomMonumentBonus;
 gambitMultipliers += hole.schematics[78].getBonus(10);
 gambitMultipliers += jarBonuses.reduce((sum, bonus) => sum + bonus, 0);
 hole.gambit.gambitPointsMulti = 1 + gambitMultipliers / 100;
 hole.gambit.updateUnlockedBonuses();
 hole.bell.prepare(hole, players, gaming, divinity);
 const explorer = hole.villagers[VillagerIndex.Polonai];
 const cavernCount = Math.min(hole.studies.length, explorer.level);
 hole.lamp.prepare(hole, cavernCount);
 hole.harp.prepare(hole);
 hole.fountain.prepare({
  arcadeBonus68: arcade.bonuses[68].getBonus(),
  bUpgrade94Level1: hole.getSchematicBonus(94, 1),
  bUpgrade95Level10: hole.getSchematicBonus(95, 10),
  bUpgrade97Level3: hole.getSchematicBonus(97, 3),
  coveUpgrade14: hole.cove.upgrades[14].getBonus(),
  cosmoBonusQuantity4: hole.majiks.HoleUpgrades[4].getBonus(),
  lampBonus99: hole.lamp.getBonus(true),
  measurementBonus16: hole.measurements[16].effectiveBenefit,
  bellBonus6: hole.bell.bonuses[6].getBonus(),
  studyBonus15: hole.getStudyBolaiaBonuses(15),
  ownedCaverns: cavernCount,
  currencyValueExponent: hole.fountain.currencyValueExponent,
  duckCount: hole.fountain.duckCount,
 });
 const stamps = data.get("stamps") as Stamp[][];
 const stampBonus = getStampBonusForKey(stamps, "CavernRes");
 hole.well.prepare(hole, hole.savedGemShopBucketPurchase, stampBonus, gaming.getCglunkoBonus());
 hole.resourceCavrens.prepare(hole.getResourceRequirementReduction());
}


export const updateHoleStudyEffects = (data: Map<string, any>): void => {
 const hole = data.get("hole") as Hole;
 hole.prepareSharedStudyEffects();
};

export const updateHoleUpgradeEffects = (data: Map<string, any>): void => {
 const hole = data.get("hole") as Hole;
 hole.prepareSharedUpgradeEffects();
};

export const updateHolePresentation = (data: Map<string, any>): void => {
 const hole = data.get("hole") as Hole;
 const stampGroups = data.get("stamps") as Stamp[][];
 hole.jar.prepareRupieValue({
  schematicBonus62: hole.getSchematicBonus(62, 1),
  schematicBonus65: hole.getSchematicBonus(65, 2),
  schematicBonus68: hole.getSchematicBonus(68, 4),
  earlyExplorerExpUpgrade: hole.earlyExplorerExpUpgrade,
  lampBonus99: hole.lamp.getBonus(true),
  wisdomMonumentBonus: hole.getMonumentBonus("Wisdom", 1),
  measurementBonus10: hole.measurements[10].effectiveBenefit,
  measurementBonus14: hole.measurements[14].effectiveBenefit,
  evertreeMultiplier: hole.schematics[80].getIntrinsicBonus()!,
  stampBonus: getStampBonusForKey(stampGroups, "CavernRes"),
  coveUpgrade14Bonus: hole.cove.upgrades[14].getBonus(),
 });
 const players = data.get("players") as Player[];
 const statues = data.get("statues") as PlayerStatues[];
 const storage = data.get("storage") as Storage;
 const compass = data.get("compass") as Compass;
 const grimoire = data.get("grimoire") as Grimoire;
 const tesseract = data.get("tesseract") as Tesseract;
 const emperor = data.get("emperor") as Emperor;
 const sushi = data.get("sushi") as SushiStation;
 const gems = data.get("gems") as GemStore;
 const companions = data.get("companions") as Companion[];
 const legendTalents = data.get("legendTalents") as LegendTalents;
 const sneaking = data.get("sneaking") as Sneaking;
 const arcade = data.get("arcade") as Arcade;
 const farming = data.get("farming") as Farming;
 const summoning = data.get("summoning") as Summoning;
 const vault = data.get("upgradeVault") as UpgradeVault;
 const eventShop = data.get("eventShop") as EventShop;
 const tome = data.get("tome") as Tome;
 const cards = data.get("cards") as Card[];
 const gaming = data.get("gaming") as Gaming;
 const stamps = data.get("stamps") as Stamp[][];
 const companionBonus = getCompanionActiveBonus(companions, 13);
 const pristineCharm = sneaking.pristineCharms[sneaking.pristineCharms.findIndex(charm => charm.data.itemId === 21)];
 const externalSourceOpals = {
  "gem-shop": gems.purchases.find(purchase => purchase.no === 5)?.pucrhased ?? null,
  grimoire: grimoire.getUpgradeBonus(11),
  companion: 25 * companionBonus,
  compass: compass.getUpgradeBonus(52),
  emperor: emperor.getEffectiveBonus(3),
  schematic: hole.getSchematicBonus(102, 1),
  arcane: tesseract.getUpgradeBonus(25),
  sushi: sushi.getBonusFromIndex(56),
 };
 const externalSources: OpalSource[] = [
  { id: "gem-shop", owner: "gems", name: "Gem Shop", acquisition: "Purchased Opals.",
   opals: externalSourceOpals["gem-shop"], unit: "Opals" },
  { id: "grimoire", owner: "grimoire", name: "Grimoire", acquisition: "Earned the Opal upgrade bonus.",
   opals: externalSourceOpals.grimoire, unit: "Opals" },
  { id: "companion", owner: "companions", name: "Companion", acquisition: "Current active Opal companion bonus.",
   opals: externalSourceOpals.companion, unit: "Opals" },
  { id: "compass", owner: "compass", name: "Compass", acquisition: "Earned the Opal upgrade bonus.",
   opals: externalSourceOpals.compass, unit: "Opals" },
  { id: "emperor", owner: "emperor", name: "Emperor", acquisition: "Unrounded Opal contribution from Emperor victories.",
   opals: externalSourceOpals.emperor, unit: "Opals" },
  { id: "schematic", owner: "schematics", name: "Schematic", acquisition: "Unrounded Opal contribution from the built reward schematic.",
   opals: externalSourceOpals.schematic, unit: "Opals" },
  { id: "arcane", owner: "tesseract", name: "Arcane", acquisition: "Earned the Opal upgrade bonus.",
   opals: externalSourceOpals.arcane, unit: "Opals" },
  { id: "sushi", owner: "sushi", name: "Sushi", acquisition: "Unlocked the Opal Sushi reward.",
   opals: externalSourceOpals.sushi, unit: "Opals" },
 ];
 hole.prepareOpalLedger(externalSourceOpals, externalSources);
 hole.prepareLanternSummary(storage, players);
 hole.prepareStudyProgress(gaming.isSuperbitPurchased(43), getStampBonusForKey(stamps, "VillageStudy"));
 hole.prepareVillagerGrowth(players, statues, {
  compassPercent: compass.getUpgradeBonus(59),
  legendPercent: legendTalents.getBonusFromIndex(12),
  pristinePercent: pristineCharm.unlocked ? (pristineCharm.getBonus() - 1) * 100 : 0,
  companionBonus, eventShopOwned: eventShop.isBonusOwned(6), lorePercent: tome.getEpilogueBonus(1),
  exoticPercent: farming.getExoticMarketBonusValue(51), arcadePercent: arcade.bonuses[38].getBonus(),
  grimoirePercent: grimoire.getUpgradeBonus(29), arcanePercent: tesseract.getUpgradeBonus(32),
  gloomieCardLevel: cards[cards.findIndex(card => card.id === "caveB")].getLevels(),
  summoningPercent: summoning.getSummoningWinnerBonusFromIndex(21), vaultPercent: vault.getBonusForId(73),
 });
 hole.prepareUpgradeInspection(players, data.get("divinity") as Divinity);
 hole.prepareInspection();
};

export const updateHoleCharacterCapabilities = (data: Map<string, any>): void => {
 const hole = data.get("hole") as Hole;
 const players = data.get("players") as Player[];
 const skilling = data.get("skilling") as Skilling;
 const resourceCavrens = hole.resourceCavrens;
 const assignments = resourceCavrens.characterAssignments;

 Object.values(resourceCavrens.cavrens).forEach(cavern => {
  cavern.prepareCharacterCapabilities(players, assignments, skilling);
 });
 hole.cove.prepareCharacters(players.map(player => ({
  playerId: player.playerID,
  mapId: player.currentMapId,
  cavernId: assignments[player.playerID] ?? -1,
  campUpgrade100Bonus: hole.getSchematicBonus(100, 25),
  campUpgrade101Bonus: hole.getSchematicBonus(101, 10),
  campUpgrade103Bonus: hole.getSchematicBonus(103, 10),
  campUpgrade105Bonus: hole.getSchematicBonus(105, 10),
  gameLog: lavaLog,
 })));
};
