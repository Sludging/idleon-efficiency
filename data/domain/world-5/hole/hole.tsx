import { Domain, RawData } from "../../base/domain";
import { CosmoUpgradeBase, initCosmoUpgradeRepo } from "../../data/CosmoUpgradeRepo";
import { initLampWishRepo, LampWishBase } from "../../data/LampWishRepo";
import { Item } from "../../items";
import { CosmoUpgradeModel } from "../../model/cosmoUpgradeModel";
import { LampWishModel } from "../../model/lampWishModel";
import { HoleContributor, Villager, VillagerAccountGrowthInputs, VillagerIndex, Villagers, VillagerSharedGrowthInputs } from "./villager";
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
 stock: number | null = null;
 imageData: ImageData | null;

 constructor(public index: number, public data: HoleCurrencyModel) {
  this.imageData = holeCurrencyImages[index] ?? null;
 }

 static fromBase(records: HoleCurrencyBase[]): HoleCurrency[] {
  return records.map(record => new HoleCurrency(record.index, record.data));
 }

 parse(wallets: number[] | undefined): void {
  this.stock = wallets?.[this.index] == null ? null : Number(wallets[this.index]);
 }

 getImageData(): ImageData | null {
  return this.imageData;
 }
}

const holeResearchExpUpgradeBasePercent = 1;


export class Wish {
 wishCount: number | null = null;

 constructor(public index: number, public data: LampWishModel) { }

 static fromBase(data: LampWishBase[]) {
  return data.map(d => new Wish(d.index, d.data));
 }
}

interface CosmoUpgradePreparationInputs {
 access: boolean | null;
 enhancementAllowed: boolean | null;
 remainingPoints: number | null;
 createdSchematics: number | null;
}

export class CosmoUpgrade {
 unlocked: boolean = false;
 level: number = 0;
 saveAvailable: boolean = false;
 initialLevel: number = 0;
 enhancementLevel: number = 0;
 enhancementAllowed: boolean | null = null;
 currentCap: number | null = null;
 prerequisiteId: number | null = null;
 prerequisiteMet: boolean | null = null;
 private prerequisiteLevel: number | null = null;
 access: boolean | null = null;
 pointsRequired: number = 1;
 canPurchase: boolean | null = null;
 createdSchematics: number | null = null;
 equalSpreadPercent: number | null = null;

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

 parse(investments: number[] | undefined): void {
  this.saveAvailable = investments?.[this.treePosition] != null;
  this.level = Number(investments?.[this.treePosition] ?? 0);
  this.prerequisiteId = this.treePosition === 0 ? null : this.index - 1;
  const previousLevel = investments?.[this.treePosition - 1];
  this.prerequisiteLevel = previousLevel == null ? null : Number(previousLevel);
  this.unlocked = this.level > 0;
  this.initialLevel = 0;
  this.enhancementLevel = 0;
  this.createdSchematics = null;
  this.equalSpreadPercent = null;
  this.enhancementAllowed = null;
  this.currentCap = null;
  this.prerequisiteMet = null;
  this.canPurchase = null;
  this.access = null;
 }

 prepare(inputs: CosmoUpgradePreparationInputs): void {
  this.initialLevel = Math.min(1, this.level);
  this.enhancementLevel = Math.max(0, this.level - 1);
  this.createdSchematics = inputs.createdSchematics;
  this.access = inputs.access;
  this.enhancementAllowed = inputs.enhancementAllowed;
  this.currentCap = this.enhancementAllowed === null ? null
   : 1 + (this.enhancementAllowed ? this.data.maxEnhance : 0);
  this.prerequisiteMet = this.prerequisiteId === null ? true
   : this.prerequisiteLevel === null ? null : this.prerequisiteLevel > 0;
  this.canPurchase = !this.saveAvailable || this.access === null || this.prerequisiteMet === null
   || this.currentCap === null || inputs.remainingPoints === null ? null
   : this.access && this.prerequisiteMet && this.level < this.currentCap && inputs.remainingPoints >= this.pointsRequired;
 }

 getBonus(): number {
  if (this.index === 22) {
   return Math.floor(Math.max(1, Math.pow(3, this.level)));
  }
  return Math.floor(this.data.perLvl * this.level);
 }

 getEffects(): HoleUpgradeEffect[] {
  if (!this.saveAvailable) {
   return [{ key: `majik:${this.index}`, value: null, unit: "rule" }];
  }
  if (this.index === 4) {
   return [
    { key: "fountain-stack-capacity", value: this.level, unit: "count" },
    { key: "fountain-coin-value", value: 1 + 25 * this.level / 100, unit: "multiplier" },
    { key: "fountain-marble-rate", value: 1 + 10 * this.level / 100, unit: "multiplier" },
   ];
  }
  if (this.index === 10) {
   return [{ key: "villager-exp", value: this.createdSchematics === null ? null
    : this.getBonus() * this.createdSchematics, unit: "percent" }];
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
  if (!this.saveAvailable) {
   return this.data.desc.replace(/_/g, " ");
  }
  return this.data.desc.replace(/_/g, " ")
   .replace(/ x/g, ` ${this.index === 22 ? this.getBonus() : 1 + this.getBonus() / 100}x`)
   .replace(/\+%/g, `+${this.getBonus()}%`)
   .replace(/[{}]/g, this.getBonus().toString())
   .replace(/\|/g, this.createdSchematics === null ? "|" : (this.getBonus() * this.createdSchematics).toString())
   .replace(/\$/g, this.equalSpreadPercent === null ? "$" : this.equalSpreadPercent.toString());
 }
}

export interface PocketGodSelection {
 slot: number;
 godId: number;
 bonusId: number;
 name: string;
 active: boolean | null;
}

export interface PocketCharacterActivation {
 playerId: number;
 playerName: string;
 primaryGodId: number | null;
 secondaryGodId: number | null;
 dootEligible: boolean;
 ordinaryLinksAvailable: boolean;
 pocketActivationAvailable: boolean;
 pocketGodIds: number[] | null;
 overlappingGodIds: number[] | null;
 addedGodIds: number[] | null;
 effectiveGodIds: number[] | null;
 allStatPercent: number | null;
}

export class PocketDivinityUpgrade extends CosmoUpgrade {
 selections: PocketGodSelection[] = [];
 characters: PocketCharacterActivation[] = [];
 selectionSaveAvailable: boolean = false;

 get linkedGods(): number[] {
  return [...new Set(this.selections.filter(selection => selection.active).map(selection => selection.godId))];
 }

 parseSelections(savedSelections: (number | undefined)[]): void {
  const gods = initGodInfoRepo();
  this.selectionSaveAvailable = savedSelections.every(selection => selection != null);
  this.selections = savedSelections.flatMap((value, slot) => {
   const god = gods.find(god => god.index === Number(value));
   return value == null || !god ? [] : [{ slot, godId: god.index, bonusId: god.data.bonusIndex,
    name: god.data.name, active: this.saveAvailable ? this.level > slot : null }];
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
   const pocketActivationAvailable = this.saveAvailable &&
    this.selections.filter(selection => selection.active === true).length === Math.min(2, this.level);
   return {
    playerId: player.playerID, playerName: player.playerName,
    primaryGodId: links?.primaryGod?.index ?? null, secondaryGodId: links?.esGod?.index ?? null,
    dootEligible, ordinaryLinksAvailable: links !== undefined,
    pocketActivationAvailable, pocketGodIds: pocketActivationAvailable ? pocketGodIds : null,
    overlappingGodIds: pocketActivationAvailable && (dootEligible || links !== undefined)
     ? pocketGodIds.filter(id => previousGodIds.includes(id)) : null,
    addedGodIds: pocketActivationAvailable && (dootEligible || links !== undefined)
     ? pocketGodIds.filter(id => !previousGodIds.includes(id)) : null,
    effectiveGodIds: dootEligible || pocketActivationAvailable && links !== undefined
     ? [...new Set([...previousGodIds, ...pocketGodIds])] : null,
    allStatPercent: !dootEligible ? 0 : this.saveAvailable ? 15 * this.level : null,
   };
  });
 }

 getDootAllStatPercent(): number | null {
  if (!this.saveAvailable) {
   return null;
  }
  let allStatPercent: number | null = null;
  for (const character of this.characters) {
   if (!character.dootEligible) {
    continue;
   }
   if (character.allStatPercent === null ||
    allStatPercent !== null && character.allStatPercent !== allStatPercent) {
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
 earnedPoints: number | null = null;
 investedPoints: number | null = null;
 remainingPoints: number | null = null;
 purchasedPoints: number | null = null;
 private investments: { level: number }[] | null = null;

 constructor() {
  const allUpgrades = CosmoUpgrade.fromBase(initCosmoUpgradeRepo());
  this.HoleUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Hole);
  this.VillageUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Village);
  this.IdleonUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType === CosmoTypeEnum.Idleon);
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

 parse(savedHole: number[][], purchasedPoints: number | undefined): void {
  const trees = [savedHole[4], savedHole[5], savedHole[6]];
  this.investments = trees.every(tree => tree != null)
   ? trees.flatMap(tree => tree.map(level => ({ level: Number(level) }))) : null;
  this.purchasedPoints = purchasedPoints == null ? null : Number(purchasedPoints);
  [this.HoleUpgrades, this.VillageUpgrades, this.IdleonUpgrades].forEach((upgrades, tree) =>
   upgrades.forEach(upgrade => upgrade.parse(trees[tree])));
  this.pocketDivinity.parseSelections([savedHole[11]?.[29], savedHole[11]?.[30]]);
  this.earnedPoints = null;
  this.investedPoints = null;
  this.remainingPoints = null;
 }

 prepare(cosmo: Villager, createdSchematics: number | null): void {
  this.earnedPoints = this.purchasedPoints === null || !cosmo.saveAvailable ? null
   : Math.round(cosmo.level + this.purchasedPoints);
  this.investedPoints = this.investments === null ? null
   : this.investments.reduce((total, investment) => total + investment.level, 0);
  this.remainingPoints = this.earnedPoints === null || this.investedPoints === null ? null
   : Math.round(this.earnedPoints - this.investedPoints);
  const enhancement = this.VillageUpgrades.find(upgrade => upgrade.index === 11)!;
  const inputs: CosmoUpgradePreparationInputs = {
   access: cosmo.rescued,
   enhancementAllowed: enhancement.saveAvailable ? enhancement.level >= 1 : null,
   remainingPoints: this.remainingPoints,
   createdSchematics,
  };
  this.upgrades.forEach(upgrade => upgrade.prepare(inputs));
 }
}

type SchematicBonusLookup = (schematicIndex: number, baseMultiplier: number) => number;

export class Schematic {
 unlocked: boolean = false;
 saveAvailable: boolean = false;
 availabilitySlot: number = -1;
 released: boolean = false;
 available: boolean | null = null;
 requiredKaipuLevel: number | null = null;
 currency!: HoleCurrency;
 discountStacks: number | null = null;
 discountMultiplier: number | null = null;
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

 parse(savedHole: number[][]): void {
  this.saveAvailable = savedHole[13]?.[this.index] != null;
  this.unlocked = Number(savedHole[13]?.[this.index] ?? 0) === 1;
  this.discountStacks = savedHole[21]?.[5] == null ? null : Number(savedHole[21][5]);
  this.sedimentMulti = savedHole[8]?.map(Number) ?? [];
  this.resourceLayers = {
   motherlode: Number(savedHole[11]?.[1] ?? 0), hive: Number(savedHole[11]?.[3] ?? 0),
   evertree: Number(savedHole[11]?.[5] ?? 0), trench: Number(savedHole[11]?.[7] ?? 0),
  };
  this.walletBalances = {
   gravel: Number(savedHole[9]?.[0] ?? 0), goldust: Number(savedHole[9]?.[1] ?? 0),
   redstone: Number(savedHole[9]?.[2] ?? 0), naturalNotes: Number(savedHole[9]?.[11] ?? 0),
   trebelNotes: Number(savedHole[9]?.[13] ?? 0), quaverNotes: Number(savedHole[9]?.[15] ?? 0),
  };
  this.gloomieColonies = Number(savedHole[11]?.[26] ?? 0);
  this.motherlodeOreMined = Number(savedHole[11]?.[32] ?? 0);
  this.houndBestRuns = savedHole[11]?.slice(33, 37).map(Number) ?? [];
  this.golemSanctums = Number(savedHole[11]?.[55] ?? 0);
  this.whiteRupies = Number(savedHole[11]?.[38] ?? 0);
  this.darkRupies = Number(savedHole[11]?.[39] ?? 0);
  this.rupieStocks = savedHole[9]?.slice(20, 30).map(Number) ?? [];
  this.savedStringTypes = savedHole[20]?.map(Number) ?? null;
  this.uniqueHarpStrings = null;
  this.bellImprovementMethods = savedHole[16]?.map(Number) ?? [];
  let requiredInputs: unknown[] = [];
  switch (this.index) {
   case 14: requiredInputs = [savedHole[8], savedHole[26]?.[0]]; break;
   case 15: requiredInputs = [savedHole[11]?.[1]]; break;
   case 38: requiredInputs = [savedHole[20]]; break;
   case 41: requiredInputs = [savedHole[11]?.[3]]; break;
   case 45: requiredInputs = [savedHole[16]]; break;
   case 46: case 47: case 48: requiredInputs = [savedHole[11]?.[26]]; break;
   case 49: requiredInputs = [savedHole[11]?.[1], savedHole[11]?.[3], savedHole[11]?.[5], savedHole[11]?.[7], savedHole[13]]; break;
   case 52: requiredInputs = [savedHole[9]?.[0]]; break;
   case 53: requiredInputs = [savedHole[9]?.[13]]; break;
   case 54: requiredInputs = [savedHole[9]?.[15]]; break;
   case 55: requiredInputs = [savedHole[9]?.[11]]; break;
   case 56: requiredInputs = [savedHole[9]?.[2]]; break;
   case 57: requiredInputs = [savedHole[9]?.[1]]; break;
   case 58: requiredInputs = [savedHole[11]?.[32]]; break;
   case 59: requiredInputs = [savedHole[11]?.[33], savedHole[11]?.[34], savedHole[11]?.[35], savedHole[11]?.[36]]; break;
   case 72: requiredInputs = [savedHole[11]?.[38]]; break;
   case 73: requiredInputs = [savedHole[11]?.[39]]; break;
   case 76: requiredInputs = Array.from({ length: 10 }, (_, index) => savedHole[9]?.[20 + index]); break;
   case 80: requiredInputs = [savedHole[11]?.[5]]; break;
   case 82: case 83: case 84: requiredInputs = [savedHole[11]?.[55]]; break;
   case 94: requiredInputs = [savedHole[11]?.[7]]; break;
  }
  this.numericBenefitAvailable = this.saveAvailable && (!this.built || requiredInputs.every(value => value != null));
  this.sedimentSum = undefined;
  this.bellSum = undefined;
  this.available = null;
  this.currentCost = null;
  this.shortfall = null;
  this.affordable = null;
 }

 prepareInspection(kaipu: Villager, availableCount: number | null): void {
  this.available = availableCount === null ? null : this.released && this.availabilitySlot < availableCount;
  this.requiredKaipuLevel = null;
  if (this.released) {
   let level = 0;
   while (Math.min(105, Math.round(1 + 3 * level + Math.floor(level / 5))) <= this.availabilitySlot) {
    level++;
   }
   this.requiredKaipuLevel = Math.max(1, level);
  }
  if (kaipu.rescued === false) {
   this.available = false;
  }
  this.discountMultiplier = this.discountStacks === null ? null : Math.max(0.01, Math.pow(0.85, this.discountStacks));
  this.currentCost = !this.saveAvailable || this.built ? null : this.getCost();
  this.shortfall = this.currentCost === null || this.currency.stock === null ? null
   : Math.max(0, this.currentCost - this.currency.stock);
  this.affordable = this.currentCost === null || this.currency.stock === null ? null
   : this.currency.stock >= this.currentCost;
 }

 getCost(): number | null {
  if (this.discountMultiplier === null || this.availabilitySlot < 0) {
   return null;
  }
  const slot = this.availabilitySlot;
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
   { key: `schematic:${this.index}:owned`, value: this.saveAvailable ? this.built : null, unit: "rule" },
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
  return effects.map(effect => effect.unit === "rule" || this.numericBenefitAvailable ? effect : { ...effect, value: null });
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
 uniqueHarpStrings: number | null = null;
 private savedStringTypes: number[] | null = null;
 numericBenefitAvailable: boolean = false;

 prepareHarpStrings(stringSlots: number | null): void {
  this.uniqueHarpStrings = this.savedStringTypes === null || stringSlots === null ? null
   : new Set(this.savedStringTypes.slice(0, stringSlots)).size;
 }

 getIntrinsicBonus(): number | null {
  if (!this.numericBenefitAvailable) {
   return null;
  }
  const owned = this.built ? 1 : 0;
  switch (this.index) {
   case 15: return Math.max(1, owned * Math.pow(1.1, this.resourceLayers.motherlode));
   case 38: return this.uniqueHarpStrings === null ? null : owned * 30 * this.uniqueHarpStrings;
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
   this.sedimentSum = this.sedimentMulti.slice(0, 10).reduce((sum, val) => sum + (val || 0), 0);
   this.sedimentSum *= (20 + this.studyBolaiaBonuses);
  }
  return this.sedimentSum;
 }

 private getBellBonus(): number {
  if (this.bellSum === undefined) {
   this.bellSum = this.bellImprovementMethods.reduce((sum, val) => sum + (val || 0), 0);
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
  if (!this.numericBenefitAvailable) {
   return this.data.desc;
  }
  const bonus = this.getIntrinsicBonus() ?? (this.index === 53 ? 1 + this.getBonus() / 100
   : this.index === 82 ? this.getBonus(20) : this.index === 83 ? this.getBonus(40)
    : this.index === 84 ? this.getBonus(100) : this.getBonus());
  let description = this.data.desc.replace(/[{}]/g, bonus.toFixed(2));
  if (this.index === 58) {
   description = description.replace("#", this.motherlodeOreMined.toString());
  } else if (this.index === 59) {
   ["!", "#", "$", "%"].forEach((placeholder, index) => {
    description = description.replace(placeholder, (this.houndBestRuns[index] ?? 0).toString());
   });
  } else if (this.index === 38 && this.uniqueHarpStrings !== null) {
   description = description.replace("$", this.uniqueHarpStrings.toString()).replace("#", bonus.toString());
  }
  return description;
 }
}

export interface StudyEffect {
 key: string;
 value: number | boolean | null;
 unit: "percent" | "multiplier" | "levels" | "wishes/day" | "attempts" | "days" | "upgrades" | "rule";
 owner: string;
 scope: "owned-study-contribution" | "owned-study-rule";
 note: string | null;
 unavailableReason: string | null;
}

export class Study {
 level: number = 0;
 progress: number = 0;
 unlocked: boolean = false;
 levelAvailable: boolean = false;
 progressAvailable: boolean = false;
 saveAvailable: boolean = false;
 access: boolean | null = null;
 participation: "target" | "neighbor" | "inactive" | "unavailable" = "unavailable";
 progressPerHour: number | null = null;
 rateUnavailableReason: string | null = null;
 contributors: HoleContributor[] = [];
 completedLayers: number | null = null;
 dailyCoveUpgradesPurchased: number | null = null;

 constructor(public index: number, public data: StudyModel) { }

 static fromBase(data: StudyBase[]) {
  return data.map(d => new Study(d.index, d.data));
 }

 parse(savedHoleData: number[][], optionListAccount: number[]): void {
  const level = savedHoleData[26]?.[this.index];
  const progress = savedHoleData[27]?.[this.index];
  this.level = Number(level ?? 0);
  this.progress = Number(progress ?? 0);
  this.saveAvailable = level != null && progress != null;
  this.levelAvailable = level != null;
  this.progressAvailable = progress != null;
  this.access = null;
  this.unlocked = false;
  this.participation = "unavailable";
  this.progressPerHour = null;
  this.rateUnavailableReason = null;
  this.contributors = [];
  this.completedLayers = null;
  this.dailyCoveUpgradesPurchased = null;

  const resourceIndex = [1, 7, 11, 16].indexOf(this.index);
  this.completedLayers = resourceIndex < 0 || savedHoleData[11]?.[2 * resourceIndex + 1] == null
   ? null : Number(savedHoleData[11][2 * resourceIndex + 1]);
  if (this.index === 17) {
   this.dailyCoveUpgradesPurchased = optionListAccount[604] == null ? null : Number(optionListAccount[604]);
  }
 }

 prepareAccess(cavernCount: number | null): void {
  this.access = cavernCount === null ? null : this.index < cavernCount;
  this.unlocked = this.access === true;
 }

 getRequirement(): number | null {
  return this.levelAvailable ? 4000 * Math.pow(1.25, this.level) * Math.pow(1.5, Math.floor(this.index / 5)) : null;
 }

 get claimReady(): boolean | null {
  const requirement = this.getRequirement();
  return requirement === null || !this.progressAvailable || this.access === null ? null : this.access && this.progress >= requirement;
 }

 get ownedRule(): boolean {
  return this.level >= 1;
 }

 getBonus(): number {
  if (this.index === 9) return this.ownedRule ? 50 + this.level * this.data.multiplier : 0;
  if (this.index === 3) return this.ownedRule ? Math.min(32, 12 + this.level * this.data.multiplier) : 0;
  return this.level * this.data.multiplier;
 }

 prepareRate(participation: Study["participation"], rate: number | null, contributors: HoleContributor[], reason: string | null): void {
  this.participation = participation;
  this.progressPerHour = participation === "inactive" ? 0 : rate;
  this.contributors = participation === "inactive" ? [] : contributors;
  this.rateUnavailableReason = reason;
 }

 getEffects(): StudyEffect[] {
  const bonus = this.getBonus();
  const owned = this.ownedRule;
  const owner = `cavern:${this.index}`;
  const effects: StudyEffect[] = [];
  const effect = (key: string, value: number | boolean | null, unit: StudyEffect["unit"], reason: string | null = null,
   note: string | null = null) => {
   effects.push({ key, value: this.levelAvailable ? value : null, unit, owner,
    scope: unit === "rule" ? "owned-study-rule" : "owned-study-contribution", note,
    unavailableReason: this.levelAvailable ? reason : "Saved Study level is missing." });
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
    effect("skilling-requirement-divisor-contribution-per-layer", bonus, "percent", null,
     "Each completed layer adds this percentage to the Study divisor contribution.");
    effect("skilling-requirement-divisor-contribution", this.completedLayers === null ? null : bonus * this.completedLayers,
     "percent", this.completedLayers === null ? "Saved skilling progression is missing." : null,
     "Summed Study and collectible contributions form the denominator 1 + sum / 100. This additive contribution is not a literal requirement reduction.");
    break;
   case 2:
    effect("score-per-defeated-golden-hound", 1 + bonus / 100, "multiplier");
    effect("golden-hound-respawns", owned, "rule");
    break;
   case 3:
    effect("minimum-damage-share-of-maximum", bonus, "percent");
    effect("skip-guaranteed-one-hit-fights", owned, "rule");
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
    effect("choose-enchantment-target", owned, "rule");
    effect("enchantment-chance", 1 + bonus / 100, "multiplier");
    break;
   case 12:
    effect("instamatch-when-round-ends-with-none", owned, "rule", null,
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
    effect("owned-repeat-marbleization-rule", owned, "rule", null,
     "This is the owned Study rule, not cavern permission. The delivered marbleization caller checks upgrade exclusions without a Study check.");
    effect("marble-production", 1 + bonus / 100, "multiplier");
    break;
   case 17:
    effect("daily-discounted-upgrades", bonus, "upgrades");
    effect("discounted-upgrade-cost", owned ? 0.85 : 1, "multiplier");
    effect("current-upgrade-cost", this.dailyCoveUpgradesPurchased === null ? null
     : this.dailyCoveUpgradesPurchased < bonus ? 0.85 : 1, "multiplier",
     this.dailyCoveUpgradesPurchased === null ? "Saved Cove purchases today are missing." : null);
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
 unlocked: boolean = false;
 access: boolean | null = null;
 level: number = 0;
 saveAvailable: boolean = false;
 cosmosBonus: number = 0;
 fountainDiscountPercent: number | null = null;
 currency!: HoleCurrency;
 shortfall: number | null = null;
 affordable: boolean | null = null;
 statisticAvailable: boolean = false;
 statisticUnavailableReason: string | null = "Not prepared.";
 benefitAvailable: boolean = false;
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
 private savedGloomieKills: number | null = null;
 private savedGolemKills: number | null = null;

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

 get rawStatistic(): number | null {
  return this.statisticAvailable ? this.getMeasurementQTYfound() : null;
 }

 get normalizedQuantity(): number | null {
  return this.statisticAvailable ? this.getMeasurementQTYfound(true) : null;
 }

 get multiplier(): number | null {
  return this.statisticAvailable ? this.getMeasurementMulti() : null;
 }

 get baseBenefit(): number | null {
  return this.saveAvailable && this.level === 0 ? 0 : this.benefitAvailable ? this.getMeasurementBaseBonus() : null;
 }

 get effectiveBenefit(): number | null {
  return this.saveAvailable && this.level === 0 ? 0
   : this.benefitAvailable && this.statisticAvailable ? this.getBonus() : null;
 }

 get nextCost(): number | null {
  return this.saveAvailable && this.fountainDiscountPercent !== null ? this.getCost() : null;
 }

 parse(savedHole: number[][]): void {
  this.saveAvailable = savedHole[22]?.[this.index] != null;
  this.level = Number(savedHole[22]?.[this.index] ?? 0);
  this.savedGloomieKills = savedHole[11]?.[28] == null ? null : Number(savedHole[11][28]);
  this.savedGolemKills = savedHole[11]?.[63] == null ? null : Number(savedHole[11][63]);
  this.access = null;
  this.unlocked = false;
  this.statisticAvailable = false;
  this.statisticUnavailableReason = "Not prepared.";
  this.benefitAvailable = false;
  this.fountainDiscountPercent = null;
  this.shortfall = null;
  this.affordable = null;
 }

 prepareCampEffects(minau: Villager, lengthmeister: CosmoUpgrade): void {
  this.access = minau.saveAvailable ? minau.level > this.index : null;
  this.unlocked = this.access === true;
  this.cosmosBonus = lengthmeister.getBonus();
  this.benefitAvailable = this.saveAvailable && lengthmeister.saveAvailable;
 }

 prepare(inputs: { minau: Villager; lengthmeister: CosmoUpgrade; fountainDiscountPercent: number | null;
  crops: number | null; accountLevel: number | null; tomeScore: number | null; skillLevel: number | null;
  deathnotePoints: number | null; highestDamage: number | null; slabItems: number | null; studyLevels: number | null }): void {
  this.prepareCampEffects(inputs.minau, inputs.lengthmeister);
  this.fountainDiscountPercent = inputs.fountainDiscountPercent;
  const statistics: Record<number, number | null> = {
   0: this.savedGloomieKills, 1: inputs.crops, 2: inputs.accountLevel, 3: inputs.tomeScore,
   4: inputs.skillLevel, 5: 0, 6: inputs.deathnotePoints, 7: inputs.highestDamage,
   8: inputs.slabItems, 9: inputs.studyLevels, 10: this.savedGolemKills,
  };
  this.statisticAvailable = statistics[this.statisticType] != null;
  this.statisticUnavailableReason = this.statisticAvailable ? null : "Saved statistic inputs are missing.";
  this.gloomieKills = this.savedGloomieKills ?? 0;
  this.golemKills = this.savedGolemKills ?? 0;
  this.cropsCount = inputs.crops ?? 0;
  this.accountLevel = inputs.accountLevel ?? 0;
  this.tomeScore = inputs.tomeScore ?? 0;
  this.allSkillLevel = inputs.skillLevel ?? 0;
  this.deathnotePts = inputs.deathnotePoints ?? 0;
  this.highestDmg = inputs.highestDamage ?? 0;
  this.slabItems = inputs.slabItems ?? 0;
  this.studiesDone = inputs.studyLevels ?? 0;
 }

 prepareInspection(): void {
  const cost = this.nextCost;
  this.shortfall = cost === null || this.currency.stock === null ? null : Math.max(0, cost - this.currency.stock);
  this.affordable = cost === null || this.currency.stock === null ? null : this.currency.stock >= cost;
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
  return 1 / (1 + (this.fountainDiscountPercent ?? 0) / 100)
   * (250 + 50 * this.level) * Math.pow(1.6, this.index - 6 * Math.floor(this.index / 10))
   * Math.pow(1.1, this.level);
 }

 getDescription(): string {
  const benefit = this.effectiveBenefit;
  return benefit === null ? this.data.description : this.data.description.replace(/[{}]/g, benefit.toFixed(2));
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
 | { type: "character"; currency: string; values: { playerID: number; balance: number; affordable: boolean | null }[] }
 | { type: "account"; currency: string; balance: number | null; affordable: boolean | null };

export class BellImprovement {
 level: number | null = null;
 cost: number | null = null;
 quantity: number | null = null;
 wallet: BellImprovementWallet | null = null;

 constructor(public index: number, public data: BellImprovementModel) { }
}

export class BellBonus {
 level: number | null = null;

 constructor(public index: number, public data: BellBonusModel) { }

 getBonus(): number | null {
  return this.level === null ? null : this.level * Number(this.data.value);
 }

 getDescription(): string {
  const bonus = this.getBonus();
  if (bonus === null) return this.data.description;
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
 xpBanks: (number | null)[] = [];
 improvementProgress: (number | null)[] = [];
 modeRates: (number | null)[] = [];
 modeRequirements: (number | null)[] = [];
 cleanMethodCount: number | null = null;
 cleanFailures: number | null = null;
 cleanOdds: number | null = null;
 get ringsSinceRenew(): number | null {
  return this.improvementProgress[0];
 }
 get methodsOwned(): number | null {
  return this.cleanMethodCount === null ? null : Math.min(6, this.cleanMethodCount + 1);
 }
 renewEffects: { resetBellXp: number | null; renewXpConsumed: number | null; clearedBonusLevels: (number | null)[]; retainedImprovementLevels: (number | null)[]; retainedOpals: number | null } =
  { resetBellXp: null, renewXpConsumed: null, clearedBonusLevels: [], retainedImprovementLevels: [], retainedOpals: null };

 constructor() {
  this.improvements = initBellImprovementRepo().map(record => new BellImprovement(record.index, record.data));
  this.bonuses = initBellBonusRepo().map(record => new BellBonus(record.index, record.data));
 }

 parse(holeData: number[][]): void {
  const improvementLevels = holeData[16];
  const bonusLevels = holeData[17];
  const bellState = holeData[18];
  const mode = holeData[11]?.[19];
  this.mode = mode == null ? null : Number(mode);
  const methodCount = bellState?.[5];
  const failures = holeData[11]?.[31];
  this.cleanMethodCount = methodCount == null ? null : Number(methodCount);
  this.cleanFailures = failures == null ? null : Number(failures);
  this.xpBanks = Array.from({ length: 4 }, (_, index) => bellState?.[index * 2] == null
   ? null : Number(bellState[index * 2]));
  this.improvementProgress = Array.from({ length: 4 }, (_, index) => bellState?.[index * 2 + 1] == null
   ? null : Number(bellState[index * 2 + 1]));
  this.modeRates = [];
  this.modeRequirements = [];
  this.improvements.forEach(improvement => {
   const level = improvementLevels?.[improvement.index];
   improvement.level = level == null ? null : Number(level);
   improvement.cost = null;
   improvement.quantity = null;
   improvement.wallet = null;
  });
  this.bonuses.forEach(bonus => {
   const level = bonusLevels?.[bonus.index];
   bonus.level = level == null ? null : Number(level);
  });
  this.cleanOdds = null;
  this.renewEffects = {
   resetBellXp: this.xpBanks[0] ?? null,
   renewXpConsumed: this.xpBanks[3] ?? null,
   clearedBonusLevels: Array.from({ length: 12 }, (_, index) => bonusLevels?.[index] == null ? null : Number(bonusLevels[index])),
   retainedImprovementLevels: this.improvements.map(improvement => improvement.level),
   retainedOpals: holeData[9]?.[0] == null ? null : Number(holeData[9][0]),
  };
 }

 prepare(hole: Hole, players: Player[], gaming: Gaming, divinity: Divinity): void {
  const methodCount = this.cleanMethodCount;
  const failures = this.cleanFailures;
  const cleanUpgrade = hole.schematics.find(schematic => schematic.index === 43);
  const cleanModifier = cleanUpgrade?.saveAvailable && failures !== null
   ? cleanUpgrade.getBonus(25) * failures : null;
  this.cleanOdds = methodCount === null || cleanModifier === null ? null
   : Math.min(0.9, (0.6 / Math.max(1, 0.8 * methodCount + 1)) * (1 + cleanModifier / 100));

  const quantitySchematic = hole.schematics.find(schematic => schematic.index === 45);
  const quantityMultiplier = quantitySchematic?.numericBenefitAvailable ? quantitySchematic.getBonus(0) : null;
  this.improvements.forEach(improvement => {
   const level = improvement.level;
   if (level === null) {
    improvement.cost = null;
    improvement.quantity = null;
   } else {
    const baseCost = Number(improvement.data.baseValue);
    const exponent = improvement.index === 0 ? 1.25 : improvement.index === 2 ? 1.5 : 1.1;
    improvement.cost = baseCost * Math.pow(exponent, level);
    improvement.quantity = quantityMultiplier === null ? null
     : 2 * level * Math.max(1, quantityMultiplier * improvement.data.quantityCoefficient);
   }
   const cost = improvement.cost;

   if (improvement.index === 0) {
    improvement.wallet = { type: "character", currency: improvement.data.resource, values: players.map(player => ({
     playerID: player.playerID,
     balance: player.money,
     affordable: cost === null ? null : player.money >= cost,
    })) };
    return;
   }

   let walletBalance: number | null;
   switch (improvement.index) {
    case 1: walletBalance = hole.currencies.find(currency => currency.index === 3)!.stock; break;
    case 2: walletBalance = gaming.bits; break;
    case 3: walletBalance = hole.currencies.find(currency => currency.index === 14)!.stock; break;
    case 4: walletBalance = divinity.atomsBalance; break;
    case 5: walletBalance = hole.currencies.find(currency => currency.index === 25)!.stock; break;
    default: walletBalance = null;
   }
   improvement.wallet = {
    type: "account",
    currency: improvement.data.resource,
    balance: walletBalance,
    affordable: cost === null || walletBalance === null ? null : walletBalance >= cost,
   };
  });

  const ringQuantities = [this.improvements[0].quantity, this.improvements[2].quantity,
   this.improvements[4].quantity, this.improvements[5].quantity];
  const pingQuantity = this.improvements[3].quantity;
  const cleanQuantity = this.improvements[1].quantity;
  const monument = hole.getMonumentBonus("Bravery", 7);
  const measurement = hole.measurements[2].effectiveBenefit;
  const jar11 = hole.jar.getBonus(11);
  const jar36 = hole.jar.getBonus(36);
  const ringRate = ringQuantities.some(value => value === null) || measurement === null ? null
   : 10 * (1 + monument / 100) * (1 + measurement / 100) *
    (1 + ringQuantities.reduce((sum, value) => sum + (value ?? 0), 0) / 100) *
    (1 + jar11 / 100) * (1 + jar36 / 100);
  const pingRate = pingQuantity === null || measurement === null
   ? null : 10 * (1 + monument / 100) * (1 + measurement / 100) * (1 + pingQuantity / 100);
  const cleanRate = cleanQuantity === null ? null : 10 * (1 + cleanQuantity / 100);
  this.modeRates = [ringRate, pingRate, cleanRate, 10];

  const ringProgress = this.improvementProgress[0];
  const pingProgress = this.improvementProgress[1];
  const cleanProgress = this.improvementProgress[2];
  this.modeRequirements = [
   ringProgress === null ? null : (5 + 3 * ringProgress) * Math.pow(1.05, ringProgress),
   pingProgress === null ? null : (10 + 10 * pingProgress + Math.pow(pingProgress, 2.5)) * Math.pow(1.75, pingProgress),
   cleanProgress === null ? null : 100 * Math.pow(3, cleanProgress),
   25,
  ];
 }
 getMethodTiming(index: number): { status: "ready" | "estimate" | "no-rate" | "unavailable"; hours: number | null } {
  const bank = this.xpBanks[index] ?? null;
  const rate = this.modeRates[index] ?? null;
  const requirement = this.modeRequirements[index] ?? null;
  if (bank === null || rate === null || requirement === null) return { status: "unavailable", hours: null };
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

export class ResourceCavren {
 layer: number = 0;
 layerState: number | null = null;
 resourceExtracted: number = 0;
 resourceCurrent: number | null = null;
 completedLayers: number | null = null;
 resourceRequirement: number | null = null;
 resourceRemaining: number | null = null;
 resourceRequirementMet: boolean | null = null;
 efficiencyThreshold: number | null = null;
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
  const current = savedHole[11]?.[this.index * 2];
  const layerState = savedHole[11]?.[this.index * 2 + 1];
  const completedLayers = savedHole[7]?.[this.cavernId];
  this.resourceCurrent = current == null ? null : Number(current);
  this.layerState = layerState == null ? null : Number(layerState);
  this.completedLayers = completedLayers == null ? null : Number(completedLayers);
  this.layer = this.layerState ?? 0;
  this.resourceExtracted = this.resourceCurrent ?? 0;
  this.resourceRequirement = null;
  this.resourceRemaining = null;
  this.resourceRequirementMet = null;
  this.efficiencyThreshold = null;
 }

 prepare(reductions: number | null): void {
  if (this.layerState === null) {
   this.efficiencyThreshold = null;
   this.resourceRequirement = null;
   this.resourceRemaining = null;
   this.resourceRequirementMet = null;
   return;
  }

  this.efficiencyThreshold = 0.25 * 20000 * (1 + 99 * Math.floor(this.index / 3))
   * Math.pow(1.8, 1 + this.layerState);
  if (reductions === null || this.resourceCurrent === null) {
   this.resourceRequirement = null;
   this.resourceRemaining = null;
   this.resourceRequirementMet = null;
   return;
  }

  const requirementBase = (1 + 99 * Math.floor(this.index / 3)) * 200;
  this.resourceRequirement = requirementBase * Math.pow(2.2, 1 + this.layerState) / (1 + reductions / 100);
  this.resourceRemaining = Math.max(0, this.resourceRequirement - this.resourceCurrent);
  this.resourceRequirementMet = this.resourceCurrent >= this.resourceRequirement;
 }

 prepareCharacterCapabilities(players: Player[], assignments: (number | null)[], skilling: Skilling): void {
  this.characterCapabilities = [];
  const skill = ([SkillsIndex.Mining, SkillsIndex.Catching, SkillsIndex.Chopping, SkillsIndex.Fishing] as const)[this.index]!;

  assignments.forEach((assignedCavernId, playerIndex) => {
   if (assignedCavernId !== this.cavernId) return;
   const player = players.find(candidate => candidate.playerID === playerIndex);
   if (!player) return;

   const efficiency = skilling.getSkillEfficiency(player.playerID, skill);
   this.characterCapabilities.push({
    playerID: player.playerID,
    playerName: player.playerName,
    skill,
    efficiency,
    meetsThreshold: this.efficiencyThreshold === null ? null : efficiency >= this.efficiencyThreshold,
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
 lifetimeMotherlodeOre: number | null = null;
 sharedClaimCounter: number | null = null;
 characterAssignments: (number | null)[] | null = null;

 parse(savedHole: number[][], optionListAccount: number[], assignments: number[]): void {
  Object.values(this.cavrens).forEach(cavern => cavern.parse(savedHole));
  const lifetimeOre = savedHole[11]?.[32];
  const claimCounter = optionListAccount[318];
  this.lifetimeMotherlodeOre = lifetimeOre == null ? null : Number(lifetimeOre);
  this.sharedClaimCounter = claimCounter == null ? null : Number(claimCounter);
  this.characterAssignments = assignments.map(assignment => assignment == null ? null : Number(assignment));
 }
 getRemainingSharedClaims(): number | null {
  return this.sharedClaimCounter === null ? null : Math.max(0, 6 - this.sharedClaimCounter);
 }

 prepare(reductions: number | null): void {
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
 level: number | null = null;
 experience: number | null = null;
 unlocked: boolean | null = null;
 assignedSlots: number[] = [];
 imageData: ImageData;
 passiveBonus: number | null = null;
 nextLevelExperience: number | null = null;

 constructor(public index: number, public data: HarpStringModel) {
  this.imageData = harpStringImages[index];
 }

 getBonus(): number | null {
  return this.level === null ? null : this.level * this.data.multiplier;
 }

 getPassiveDescription(): string | null {
  if (this.data.multiplier === 0) return null;

  const bonus = this.getBonus();
  const descriptionStart = this.data.description.indexOf("@ LV bonus:");
  if (bonus === null || descriptionStart === -1) return null;

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
 randomBranchChance: 0.01;
 studyBonusGateActive: boolean | null;
 effectiveStudyBonusChance: number | null;
}

export interface HarpAssignedStringContext {
 slot: number;
 stringIndex: number;
 sequenceOrder: number;
 passiveBonus: number | null;
 triggerStatus: "power-below-threshold" | "runtime-cycle-state-unavailable" | "power-unavailable";
 effect: HarpTriggerEffectContext;
 experience: HarpExperienceContext;
}

export class Harp {
 notes: { name: string; index: number; current: number | null; accessible: boolean | null }[] = [];
 strings: HarpString[] = [];
 stringCount: number | null = null;
 power: number | null = null;
 powerPerHour: number | null = null;
 tune: number | null = null;
 selectedNote: number | null = null;
 layout: (number | null)[] = [];
 layoutAvailable: boolean = false;
 highestUnlockedNoteIndex: number | null = null;
 noteCost: number | null = null;
 assignedStringEffects: HarpAssignedStringContext[] = [];
 stringEffectUnavailableReason: string | null = null;
 studyBonusGateActive: boolean | null = null;
 studyBonusGateUnavailableReason: string | null = null;

 constructor() {
  this.notes = initHarpNotesRepo().map(note => ({
   name: note.data.noteName, index: note.index, current: null, accessible: null,
  }));
  this.strings = initHarpStringsRepo().map(string => new HarpString(string.index, string.data));
 }

 parse(holeData: (number[] | undefined)[]): void {
  const noteBalances = holeData[9];
  const savedHarp = holeData[11];
  const stringData = holeData[19];
  const assignments = holeData[20];
  this.highestUnlockedNoteIndex = savedHarp?.[20] == null ? null : Number(savedHarp[20]);
  this.selectedNote = savedHarp?.[21] == null ? null : Number(savedHarp[21]);
  this.tune = this.selectedNote;
  this.power = savedHarp?.[22] == null ? null : Number(savedHarp[22]);
  this.layoutAvailable = assignments != null;
  this.layout = assignments == null ? [] : assignments.map(value => value == null ? null : Number(value));
  this.slotCount = null;
  this.notes.forEach(note => {
   const balance = noteBalances?.[10 + note.index];
   note.current = balance == null ? null : Number(balance);
   note.accessible = this.highestUnlockedNoteIndex === null ? null : note.index <= this.highestUnlockedNoteIndex;
  });
  this.strings.forEach(string => {
   const level = stringData?.[2 * string.index];
   const experience = stringData?.[2 * string.index + 1];
   string.level = level == null ? null : Number(level);
   string.unlocked = string.level === null ? null : string.level > 0;
   string.experience = experience == null ? null : Number(experience);
   string.passiveBonus = string.getBonus();
   string.nextLevelExperience = string.level === null ? null : (4 + string.level) * Math.pow(1.15, string.level);
   string.assignedSlots = this.layout.flatMap((assigned, slot) => assigned === string.index ? [slot] : []);
  });
  this.stringCount = this.strings.some(string => string.unlocked === null) ? null
   : this.strings.reduce((sum, string) => sum + (string.unlocked ? 1 : 0), 0);
  this.noteCost = this.highestUnlockedNoteIndex === null || this.highestUnlockedNoteIndex >= 9
   ? null : Harp.getNextNoteCost(this.highestUnlockedNoteIndex);
  this.powerPerHour = null;
 }

 prepare(hole: Hole): void {
  const powerString = this.strings[2];
  this.powerPerHour = powerString.level === null ? null
   : 200 * (1 + powerString.level * powerString.data.multiplier / 100);

  const stringExperienceStudy = hole.studies[5];
  this.studyBonusGateActive = stringExperienceStudy.levelAvailable ? stringExperienceStudy.ownedRule : null;
  this.studyBonusGateUnavailableReason = stringExperienceStudy.levelAvailable ? null : "Saved Study 5 level is missing.";
  this.stringEffectUnavailableReason = !this.layoutAvailable ? "Saved Harp assignment layout is missing."
   : this.slotCount === null ? "Prepared Harp active slot count is unavailable."
    : this.layout.length < this.slotCount ? "Saved Harp assignment layout does not contain all active slots."
     : "Harp trigger counters 128 and 129 and cycle flag 113 are transient runtime state, not saved or exposed by prepared owner APIs.";
  if (!this.layoutAvailable || this.slotCount === null || this.layout.length < this.slotCount) {
   this.assignedStringEffects = [];
   return;
  }
  const triggerStatus = this.power === null ? "power-unavailable"
   : this.power < 100 ? "power-below-threshold" : "runtime-cycle-state-unavailable";
  const assignedEffects: HarpAssignedStringContext[] = [];
  for (let slot = 0; slot < this.slotCount; slot++) {
   const stringIndex = this.layout[slot];
   if (stringIndex == null) continue;
   const string = this.strings[stringIndex];
   if (string === undefined) continue;
   const experience: HarpExperienceContext = {
    regularGain: null, studyBonusGain: null, randomBranchChance: 0.01,
    studyBonusGateActive: this.studyBonusGateActive,
    effectiveStudyBonusChance: this.studyBonusGateActive === null ? null : this.studyBonusGateActive ? 0.01 : 0,
   };
   let effect: HarpTriggerEffectContext;
   if ([0, 3, 5].includes(stringIndex)) {
    const count = stringIndex === 0 ? 1 : stringIndex === 3 ? 3
     : this.highestUnlockedNoteIndex === null ? null : Math.round(1 + this.highestUnlockedNoteIndex);
    const noteLimit = this.highestUnlockedNoteIndex === null ? null : Math.round(this.highestUnlockedNoteIndex);
    const first = stringIndex === 0 ? this.selectedNote === null ? null : Math.round(this.selectedNote)
     : stringIndex === 3 ? this.selectedNote === null ? null : Math.round(this.selectedNote - 1) : 0;
    const firstNoteIndex = first === null || noteLimit === null ? null : Math.max(0, Math.min(noteLimit, first));
    const lastNoteIndex = first === null || count === null || count < 1 || noteLimit === null ? null
     : Math.max(0, Math.min(noteLimit, first + count - 1));
    effect = { type: "notes", noteCount: count, firstNoteIndex, lastNoteIndex, produced: null };
   } else if (stringIndex === 1) {
    effect = { type: "opal", chance: null };
   } else if (stringIndex === 4) {
    const additionalRecipients: number[] = [];
    let additionalRecipientsAvailable = true;
    this.strings.forEach(candidate => {
     if (candidate.index === 4) return;
     if (candidate.unlocked === null) additionalRecipientsAvailable = false;
     else if (candidate.unlocked) additionalRecipients.push(candidate.index);
    });
    effect = { type: "experience", additionalRecipients: additionalRecipientsAvailable ? additionalRecipients : null };
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
 wishStock: number | null = null;
 wishesPerDay: number | null = null;
 schematicCostDiscount: number | null = null;
 resetConsequences: { category: string; before: number[] | null; after: number[] | null }[] = [];
 specialBonusArray = "25,10,8;15,40,10;20,35,12;5,1,1;2,2,2".split(";");
 wishStockImageData: ImageData = { location: "HoleLampWishStock", width: 91, height: 18 };

 constructor() {
  this.wishes = Wish.fromBase(initLampWishRepo());
 }

 parse(holeData: (number[] | undefined)[]): void {
  const levels = holeData[21];
  const stock = holeData[11]?.[25];
  this.wishStock = stock == null ? null : Number(stock);
  this.wishes.forEach(wish => {
   const level = levels?.[wish.index];
   wish.wishCount = level == null ? null : Number(level);
  });
  this.wishesPerDay = null;
  this.schematicCostDiscount = this.wishes[5].wishCount === null ? null
   : Math.max(0.01, Math.pow(0.85, this.wishes[5].wishCount));
  const resetSources = [
   ["All Opals Invested", holeData[3]],
   ["Conjuror PTS Invested", holeData[4] && holeData[5] && holeData[6] ? [...holeData[4], ...holeData[5], ...holeData[6]] : undefined],
   ["Jar Collectible Enchantment LVs", holeData[24]],
   ["All Summoning Doublers", holeData[28]],
  ] as const;
  this.resetConsequences = resetSources.map(([category, values]) => ({
   category,
   before: values == null ? null : values.map(Number),
   after: values == null ? null : values.map(value => category === "Jar Collectible Enchantment LVs"
    ? Math.min(Number(value), 1) : category === "All Summoning Doublers" ? -1 : 0),
  }));
 }

 prepare(hole: Hole, cavernCount: number | null): void {
  const measurement = hole.measurements[4].effectiveBenefit;
  const cosmo = hole.majiks.HoleUpgrades.find(upgrade => upgrade.index === 2);
  const monument = hole.getMonumentBonus("Wisdom", 7);
  const bell = hole.bell.bonuses[3]?.getBonus() ?? null;
  const study = hole.getStudyBolaiaBonuses(6);
  this.wishesPerDay = cavernCount === null || measurement === null || !cosmo?.saveAvailable || monument === null || bell === null
   ? null : cavernCount < 6 ? 0
    : 1 + (measurement + cosmo.getBonus() + bell + monument + 100 * study) / 100;
  this.schematicCostDiscount = this.wishes[5].wishCount === null ? null
   : Math.max(0.01, Math.pow(0.85, this.wishes[5].wishCount));
 }

 getWishCost(wishIndex: number): number | null {
  const wish = this.wishes[wishIndex];
  if (!wish || wish.wishCount === null) return null;
  const level = wish.wishCount;
  if (wishIndex === 0) return level < 11 ? Math.floor(1 + 2 * level + Math.pow(level, 2)) : 999999;
  if (wishIndex === 2) return Math.floor(1 + 2 * level + Math.pow(level, 1.7));
  return Math.floor(level * wish.data.x2 + wish.data.x1);
 }

 getBonus(holeBonus: boolean = false, specialIndex?: number, inlineIndex?: number): number | null {
  if (holeBonus) {
   const wishLevel = this.wishes[7].wishCount;
   return wishLevel === null ? null : 25 * wishLevel * (1 + this.zenithMarketBonus / 100);
  }
  if (specialIndex != undefined && inlineIndex != undefined) {
   const wishIndex = Math.min(11, Math.round(4 + 2 * specialIndex));
   const wishLevel = this.wishes[wishIndex].wishCount;
   return wishLevel === null ? null
    : Number(this.specialBonusArray[specialIndex].split(",")[inlineIndex]) * wishLevel * (1 + this.zenithMarketBonus / 100);
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
 unavailableReason: string | null;
}

export interface OpalLedger {
 sources: OpalSource[];
 cavernEarned: number | null;
 externalEarned: number | null;
 emperorSchematicFloorAdjustment: number | null;
 externalRoundingAdjustment: number | null;
 earned: number | null;
 invested: number | null;
 uninvested: number | null;
 unavailableReason: string | null;
}

export interface LanternLocation {
 kind: "storage" | "character";
 playerId: number | null;
 playerName: string | null;
 quantity: number | null;
 unavailableReason: string | null;
}

export interface LanternSummary {
 itemId: "Quest90";
 name: "Blinding Lantern";
 locations: LanternLocation[];
 totalStock: number | null;
 usesToday: number | null;
 usageUnavailableReason: string | null;
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
 schematicAvailabilityCount: number | null = null;
 savedGemShopBucketPurchase: number | null = null;
 wellExpansionLevel: number | null = null;

 get schematicCatalogue(): Schematic[] {
  return [...this.schematics].sort((left, right) => left.availabilitySlot - right.availabilitySlot);
 }

 get releasedSchematics(): Schematic[] {
  return this.schematicCatalogue.filter(schematic => schematic.released);
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
 gambit: Gambit = new Gambit();
 cavernEarnedOpals: number = 0;
 cavernOpalSources: OpalSource[] = [];
 cavernAttributionUnavailableReason: string | null = null;
 opalLedger: OpalLedger = { sources: [], cavernEarned: null, externalEarned: null,
  emperorSchematicFloorAdjustment: null, externalRoundingAdjustment: null,
  earned: null, invested: null, uninvested: null, unavailableReason: "Not prepared." };
 private reservedVillagerInvestments: number[] | null = null;
 private unreleasedCavernOpals: number[] = [];
 savedStudyTarget: number | null = null;
 savedStudyLevelsForMeasurements: number[] | null = null;
 studyTargetAvailable: boolean = false;
 studyTargetUnavailableReason: string | null = null;
 eligibleStudyNeighbors: number[] | null = null;
 studyNeighborEligibilityUnavailableReason: string | null = "Not prepared.";
 superbitOwnershipSaveAvailable: boolean = false;
 studyRate: number | null = null;
 studyContributors: HoleContributor[] = [];
 dailyLanternUses: number | null = null;
 lanterns: LanternSummary = { itemId: "Quest90", name: "Blinding Lantern", locations: [],
  totalStock: null, usesToday: null, usageUnavailableReason: "Saved Lantern usage is missing.",
  dailyLimit: 12, hoursPerUse: 2, advances: [], excludes: [] };
 earlyExplorerExpUpgrade: number | null = null;
 villagerBundleBonus: number | null = null;
 wishesAvailable: number | null = null;
 anotherTry: { access: boolean | null; wishCost: number | null; availableWishes: number | null; affordable: boolean | null; resets: AnotherTryReset[] } =
  { access: null, wishCost: null, availableWishes: null, affordable: null, resets: [] };
 allocationEffects: { leastUnlockedInvestment: number | null; equalSpreadPercent: number | null;
  unavailableReason: string | null; equalSpreadUnavailableReason: string | null;
  opalEnthusiasm: { villagerId: number; investedTens: number | null; percent: number | null; unavailableReason: string | null }[] } =
  { leastUnlockedInvestment: null, equalSpreadPercent: null, unavailableReason: "Not prepared.",
   equalSpreadUnavailableReason: "Not prepared.", opalEnthusiasm: [] };
 storageSaveAvailable: boolean = false;
 inventorySaveAvailable: Map<number, boolean> = new Map();
 statueSaveAvailable: Map<number, boolean> = new Map();
 sourceSaveAvailable: Record<string, boolean> = {};
 sharedGrowthUnavailableReason: string | null = null;
 studyInputsUnavailableReason: string | null = null;
 growthInputs: VillagerAccountGrowthInputs | null = null;
 researchExpUpgradeLevel: number = 0;

 getResearchExpUpgradeBonus(): number {
  return this.researchExpUpgradeLevel * holeResearchExpUpgradeBasePercent;
 }

 getResourceRequirementReduction(): number | null {
  const studyIds = [1, 7, 11, 16];
  const progressionIndices = [1, 3, 5, 7];
  const studies = studyIds.map(index => this.studies[index]);
  const caverns = Object.values(this.resourceCavrens.cavrens);
  if (!this.sourceSaveAvailable.collectibles || studies.some(study => !study.levelAvailable) ||
   progressionIndices.some(index => caverns[Math.floor(index / 2)].layerState === null)) {
   return null;
  }

  return this.jar.getBonus(5) + studies.reduce((sum, study, index) =>
   sum + study.getBonus() * caverns[index].layerState!, 0);
 }

 // Engineer - DONE?
 // Bravery
 // Bell
 // Wishes - DONE?
 // Harp?
 // Measurement?

 // Get the bonus for a specific schematic by index
 getSchematicBonus(schematicIndex: number, baseMultiplier: number = 1): number {
  const schematic = this.schematics.find(s => s.index === schematicIndex);
  return schematic?.getBonus(baseMultiplier) || 0;
 }

 /**
  * Get study bonus
  * @param studyIndex - Index of the study to get bonus for
  */
 getStudyBolaiaBonuses(studyIndex: number): number {
  const study = this.studies.find(s => s.index === studyIndex);
  return study?.getBonus() || 0;
 }

 getMonumentBonus(monumentName: string, bonusIndex: number): number {
  const monument = this.monuments.monuments[monumentName];
  return monument.bonuses.find(bonus => bonus.index == bonusIndex)?.getBonus() ?? 0;
 }

 getFountainBonus(waterIndex: number, upgradeIndex: number): number {
  return this.fountain.getBonus(waterIndex, upgradeIndex);
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
  this.cavernEarnedOpals = this.cavernOpalSources.reduce((sum, source) => sum + (source.opals ?? 0), 0)
   + this.unreleasedCavernOpals.reduce((sum, opals) => sum + opals, 0);
  const explorer = this.villagers[VillagerIndex.Polonai];
  const cavernCount = explorer.saveAvailable ? Math.min(this.studies.length, explorer.level) : null;
  this.studies.forEach(study => study.prepareAccess(cavernCount));
  this.schematics.forEach(schematic => {
   schematic.prepareStudyBonus(this.getStudyBolaiaBonuses(0));
  });
 }

 prepareSharedUpgradeEffects(): void {
  const lengthmeister = this.majiks.VillageUpgrades.find(upgrade => upgrade.index === 12)!;
  this.measurements.forEach(measurement => measurement.prepareCampEffects(this.villagers[VillagerIndex.Minau], lengthmeister));
  const additionalStrings = this.majiks.HoleUpgrades.find(upgrade => upgrade.index === 1)!;
  const stringSlots = additionalStrings.saveAvailable && this.sourceSaveAvailable.schematics
   ? Math.min(15, Math.round(1 + additionalStrings.getBonus() +
    [32, 33, 34, 35, 36].reduce((sum, id) => sum + this.getSchematicBonus(id, 1), 0))) : null;
  this.harp.slotCount = stringSlots;
  this.schematics.forEach(schematic => schematic.prepareHarpStrings(stringSlots));
 }

 prepareInspection(): void {
  const explorer = this.villagers[VillagerIndex.Polonai];
  const cavernCount = explorer.saveAvailable ? Math.min(this.studies.length, explorer.level) : null;
  // The exported order stores catalogue IDs by availability slot, not inverse ranks.
  const schematicOrder = this.schematics.map(schematic => schematic.data.order);
  this.villagers.forEach(villager => villager.prepareNextUnlock(schematicOrder, this.measurements.length, this.studies.length));
  const wishCost = this.lamp.getWishCost(1);
  const access = cavernCount === null ? null : cavernCount > 6;
  this.anotherTry = { access, wishCost, availableWishes: this.wishesAvailable,
   affordable: access === null || this.wishesAvailable === null || wishCost === null
    ? null : access && this.wishesAvailable >= wishCost,
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
  const kaipu = this.villagers[VillagerIndex.Kaipu];
  this.schematicAvailabilityCount = kaipu.saveAvailable
   ? Math.min(105, this.schematics.length, Math.round(1 + 3 * kaipu.level + Math.floor(kaipu.level / 5))) : null;
  this.schematics.forEach(schematic => schematic.prepareInspection(kaipu, this.schematicAvailabilityCount));
  const createdSchematics = this.sourceSaveAvailable.schematics
   ? this.schematics.filter(schematic => schematic.built).length : null;
  this.majiks.prepare(this.villagers[VillagerIndex.Cosmo], createdSchematics);
  const equalSpread = this.majiks.VillageUpgrades.find(upgrade => upgrade.index === 14)!;
  equalSpread.equalSpreadPercent = this.allocationEffects.equalSpreadPercent;
  this.majiks.pocketDivinity.prepareCharacters(players, divinity);
  this.measurements.forEach(measurement => measurement.prepareInspection());
 }

 prepareOpalLedger(externalSources: OpalSource[]): void {
  const sources = [...this.cavernOpalSources, ...externalSources];
  const missingCavern = this.cavernOpalSources.find(source => source.opals === null);
  const missingExternal = externalSources.find(source => source.opals === null);
  const investmentsAvailable = this.villagers.every(villager => villager.investmentAvailable)
   && this.reservedVillagerInvestments !== null;
  const invested = investmentsAvailable ? this.villagers.reduce((sum, villager) => sum + villager.opals, 0)
   + this.reservedVillagerInvestments!.reduce((sum, opals) => sum + opals, 0) : null;
  const cavernEarned = missingCavern || this.cavernAttributionUnavailableReason !== null ? null : this.cavernEarnedOpals;
  const gemShop = externalSources.find(source => source.id === "gem-shop")!.opals;
  const grimoire = externalSources.find(source => source.id === "grimoire")!.opals;
  const companion = externalSources.find(source => source.id === "companion")!.opals;
  const compass = externalSources.find(source => source.id === "compass")!.opals;
  const emperor = externalSources.find(source => source.id === "emperor")!.opals;
  const schematic = externalSources.find(source => source.id === "schematic")!.opals;
  const arcane = externalSources.find(source => source.id === "arcane")!.opals;
  const sushi = externalSources.find(source => source.id === "sushi")!.opals;
  const combinedFloor = emperor === null || schematic === null ? null : Math.floor(emperor + schematic);
  const emperorSchematicFloorAdjustment = combinedFloor === null ? null : combinedFloor - (emperor! + schematic!);
  // Refresh floors the two contributions together, then rounds the nested account subtotal.
  const externalUnrounded = missingExternal ? null : gemShop! + grimoire!
   + (companion! + (compass! + (combinedFloor! + (arcane! + sushi!))));
  const externalEarned = externalUnrounded === null ? null : Math.round(externalUnrounded);
  const earned = cavernEarned === null || externalEarned === null ? null : cavernEarned + externalEarned;
  this.opalLedger = { sources, cavernEarned, externalEarned, emperorSchematicFloorAdjustment,
   externalRoundingAdjustment: externalUnrounded === null ? null : externalEarned! - externalUnrounded,
   earned, invested,
   uninvested: earned === null || invested === null ? null : earned - invested,
   unavailableReason: this.cavernAttributionUnavailableReason ?? missingCavern?.unavailableReason ?? missingExternal?.unavailableReason
    ?? (invested === null ? "Saved Opal investments are missing." : null) };
 }

 prepareLanternSummary(storage: Storage, players: Player[]): void {
  const locations: LanternLocation[] = [{
   kind: "storage", playerId: null, playerName: null,
   quantity: this.storageSaveAvailable
    ? storage.chest.reduce((sum, item) => sum + (item.internalName === "Quest90" ? item.count : 0), 0) : null,
   unavailableReason: this.storageSaveAvailable ? null : "Saved storage contents are missing.",
  }, ...players.map((player): LanternLocation => ({
   kind: "character", playerId: player.playerID, playerName: player.playerName,
   quantity: this.inventorySaveAvailable.get(player.playerID)
    ? storage.playerStorage[player.playerID].reduce((sum, item) => sum + (item.internalName === "Quest90" ? item.count : 0), 0) : null,
   unavailableReason: this.inventorySaveAvailable.get(player.playerID) ? null : "Saved character inventory is missing.",
  }))];
  this.lanterns = { itemId: "Quest90", name: "Blinding Lantern", locations,
   totalStock: locations.some(location => location.quantity === null) ? null : locations.reduce((sum, location) => sum + location.quantity!, 0),
   usesToday: this.dailyLanternUses, usageUnavailableReason: this.dailyLanternUses === null ? "Saved Lantern usage is missing." : null,
   dailyLimit: 12, hoursPerUse: 2,
   advances: ["Rescued villager EXP", "Selected and eligible adjacent Study progress", "Supported passive cavern accrual", "Monument lifetime hours"],
   excludes: ["Skilling layers and resource extraction", "Active challenges", "Other daily claim allowances"],
  };
 }

 prepareStudyProgress(superbitOwned: boolean | null, stampBonus: number): void {
  const bolaia = this.villagers[VillagerIndex.Bolaia];
  const fountain = this.getFountainBonus(1, 14);
  const perLevel = 5 + (this.getSchematicBonus(85, 2) + (this.getSchematicBonus(87, 3)
   + (this.getSchematicBonus(88, 5) + this.getSchematicBonus(99, 5))));
  const schematicUnavailableReason = this.sourceSaveAvailable.schematics ? null : "Saved Hole schematic inputs are missing.";
  const fountainUnavailableReason = !this.sourceSaveAvailable.fountainUpgrades ? "Saved Fountain upgrade inputs are missing."
   : !this.sourceSaveAvailable.fountainMarbleization ? "Saved Fountain marbleization inputs are missing." : null;
  const villageMajikUnavailableReason = this.sourceSaveAvailable.villageMajik ? null : "Saved Village Majik inputs are missing.";
  const stampUnavailableReason = this.sourceSaveAvailable.studyStamps ? null : "Saved Study stamp inputs are missing.";
  const bolaiaUnavailableReason = bolaia.saveAvailable ? null : "Saved Bolaia level is missing.";
  const collectibleUnavailableReason = !this.sourceSaveAvailable.collectibleLegendTalent
   ? "Saved collectible Legend Talent input is missing."
   : !this.sourceSaveAvailable.collectibles ? "Saved Hole collectible inputs are missing." : null;
  const collectible = collectibleUnavailableReason === null ? this.jar.getBonus(16) : null;
  const majik = this.majiks.VillageUpgrades[4].getBonus();
  this.studyContributors = [
   { source: "Base Study rate", owner: "hole", value: 100, unit: "progress/hour", combination: "base" },
   { source: "Bolaia level", owner: "villager:4", value: bolaia.saveAvailable ? bolaia.level : null,
    unit: "count", combination: "additive", unavailableReason: bolaiaUnavailableReason },
   { source: "Base progress per Bolaia level", owner: "villager:4", value: 5, unit: "percent", combination: "additive" },
   { source: this.schematics[85].data.name, owner: "schematic:85",
    value: schematicUnavailableReason === null ? this.getSchematicBonus(85, 2) : null,
    unit: "percent", combination: "additive", unavailableReason: schematicUnavailableReason },
   { source: this.schematics[87].data.name, owner: "schematic:87",
    value: schematicUnavailableReason === null ? this.getSchematicBonus(87, 3) : null,
    unit: "percent", combination: "additive", unavailableReason: schematicUnavailableReason },
   { source: this.schematics[88].data.name, owner: "schematic:88",
    value: schematicUnavailableReason === null ? this.getSchematicBonus(88, 5) : null,
    unit: "percent", combination: "additive", unavailableReason: schematicUnavailableReason },
   { source: this.schematics[99].data.name, owner: "schematic:99",
    value: schematicUnavailableReason === null ? this.getSchematicBonus(99, 5) : null,
    unit: "percent", combination: "additive", unavailableReason: schematicUnavailableReason },
   { source: "Fountain Study rate", owner: "cavern:15", value: fountainUnavailableReason === null ? fountain : null,
    unit: "percent", combination: "multiplicative", unavailableReason: fountainUnavailableReason },
   { source: this.jar.jarBonuses[16].data.name, owner: "jar-collectible:16", value: collectible, unit: "percent", combination: "additive",
    unavailableReason: collectibleUnavailableReason },
   { source: "Study stamp", owner: "stamps", value: stampUnavailableReason === null ? stampBonus : null,
    unit: "percent", combination: "additive", unavailableReason: stampUnavailableReason },
   { source: "Study All Nighter", owner: "majik:13", value: villageMajikUnavailableReason === null ? majik : null,
    unit: "percent", combination: "additive", unavailableReason: villageMajikUnavailableReason },
  ];
  const reason = bolaiaUnavailableReason ?? this.studyInputsUnavailableReason;
  this.studyRate = reason === null ? 100 * (1 + fountain / 100) * (1 + perLevel * bolaia.level / 100)
   * (1 + (collectible! + (stampBonus + majik)) / 100) : null;
  this.eligibleStudyNeighbors = [];
  this.studyNeighborEligibilityUnavailableReason = null;
  const target = this.savedStudyTarget === null ? null : this.studies[this.savedStudyTarget];
  const targetReason = !this.studyTargetAvailable ? "Saved Study target is missing."
   : this.savedStudyTarget !== null && (!target || target.access !== true) ? "Saved Study target is not an available released Study." : null;
  this.studyTargetUnavailableReason = targetReason;
  const potentialNeighbors = target && target.access === true && bolaia.rescued === true
   ? [target.index - 1, target.index + 1]
    .filter(index => index >= 0 && index < this.studies.length && this.studies[index].access === true)
   : [];
  if (bolaia.rescued === false || (this.studyTargetAvailable && target === null)) {
   this.eligibleStudyNeighbors = [];
  } else if (targetReason !== null || target?.access === null || bolaia.rescued === null) {
   this.eligibleStudyNeighbors = null;
   this.studyNeighborEligibilityUnavailableReason = targetReason ?? "Saved Study access is missing.";
  } else if (superbitOwned === null && potentialNeighbors.length > 0) {
   this.eligibleStudyNeighbors = null;
   this.studyNeighborEligibilityUnavailableReason = "Saved Superbit ownership is missing.";
  } else if (superbitOwned === true) {
   this.eligibleStudyNeighbors = potentialNeighbors;
  }
  this.studies.forEach(study => {
   if (study.access === false || bolaia.rescued === false || (this.studyTargetAvailable && target === null)) {
    study.prepareRate("inactive", 0, [], null);
   } else if (study.access === null || bolaia.rescued === null || targetReason !== null || target === null) {
    study.prepareRate("unavailable", null, [], targetReason ?? "Saved Study access is missing.");
   } else if (study.index === target.index) {
    study.prepareRate("target", this.studyRate, [...this.studyContributors], reason);
   } else if (potentialNeighbors.includes(study.index) && superbitOwned === null) {
    study.prepareRate("unavailable", null, [], "Saved Superbit ownership is missing.");
   } else if (this.eligibleStudyNeighbors?.includes(study.index)) {
    study.prepareRate("neighbor", this.studyRate, [...this.studyContributors], reason);
   } else {
    study.prepareRate("inactive", 0, [], null);
   }
  });
 }

 prepareVillagerGrowth(players: Player[], statues: PlayerStatues[], inputs: VillagerAccountGrowthInputs): void {
  this.growthInputs = this.sharedGrowthUnavailableReason === null ? inputs : null;
  const villageMajiks = this.majiks.VillageUpgrades;
  const unlockedVillagers = this.villagers.filter(villager => villager.rescued === true);
  const allocationsAvailable = this.villagers.every(villager => villager.saveAvailable)
   && this.villagers[0].investmentAvailable && unlockedVillagers.every(villager => villager.investmentAvailable);
  const leastInvestment = allocationsAvailable
   ? unlockedVillagers.length > 0 ? Math.min(...unlockedVillagers.map(villager => villager.opals)) : this.villagers[0].opals
   : null;
  const villageMajikReason = this.sourceSaveAvailable.villageMajik ? null : "Saved Village Majik inputs are missing.";
  const schematicUnavailableReason = this.sourceSaveAvailable.schematics ? null : "Saved Hole schematic inputs are missing.";
  const gloomieSchematicUnavailableReason = schematicUnavailableReason
   ?? (this.schematics[48].unlocked && !this.sourceSaveAvailable.gloomieColonyCounter
    ? "Saved Gloomie colony counter is missing." : null);
  const fountainUnavailableReason = !this.sourceSaveAvailable.fountainUpgrades ? "Saved Fountain upgrade inputs are missing."
   : !this.sourceSaveAvailable.fountainMarbleization ? "Saved Fountain marbleization inputs are missing." : null;
  const monumentUnavailableReason = !this.sourceSaveAvailable.monumentalVibes ? "Saved Monumental Vibes input is missing."
   : !this.sourceSaveAvailable.monumentRewards ? "Saved monument reward inputs are missing." : fountainUnavailableReason;
  const collectibleUnavailableReason = !this.sourceSaveAvailable.collectibleLegendTalent
   ? "Saved collectible Legend Talent input is missing."
   : !this.sourceSaveAvailable.collectibles ? "Saved Hole collectible inputs are missing." : null;
  const legendUnavailableReason = this.sourceSaveAvailable.legendTalents ? null : "Saved Legend Talent and Tome inputs are missing.";
  const pristineUnavailableReason = this.sourceSaveAvailable.sneaking ? null : "Saved Sneaking inputs are missing.";
  const farmingUnavailableReason = this.sourceSaveAvailable.farming ? null : "Saved Farming inputs are missing.";
  const arcadeUnavailableReason = this.sourceSaveAvailable.arcade ? null : "Saved Arcade inputs are missing.";
  const grimoireUnavailableReason = this.sourceSaveAvailable.grimoire ? null : "Saved Grimoire inputs are missing.";
  const arcaneUnavailableReason = this.sourceSaveAvailable.tesseract ? null : "Saved Tesseract inputs are missing.";
  const gemPurchasesUnavailableReason = this.sourceSaveAvailable.gems ? null : "Saved Gem Shop purchase inputs are missing.";
  const emperorUnavailableReason = this.sourceSaveAvailable.emperor ? null : "Saved Emperor inputs are missing.";
  const summoningUnavailableReason = !this.sourceSaveAvailable.summoning ? "Saved Summoning inputs are missing."
   : pristineUnavailableReason ?? gemPurchasesUnavailableReason ?? emperorUnavailableReason;
  const vaultUnavailableReason = this.sourceSaveAvailable.vault ? null : "Saved Vault inputs are missing.";
  const measurementUnavailableReason = !this.sourceSaveAvailable.measurements ? "Saved Hole Measurement inputs are missing." : villageMajikReason;
  const bellUnavailableReason = this.sourceSaveAvailable.bellBonuses ? null : "Saved Bell bonus inputs are missing.";
  const contentedCreatorUnavailableReason = villageMajikReason ?? schematicUnavailableReason;
  const tomeUnavailableReason = legendUnavailableReason ?? grimoireUnavailableReason;
  const compassUnavailableReason = this.sourceSaveAvailable.compass ? null : "Saved Compass inputs are missing.";
  const allocationReason = allocationsAvailable ? null : "Saved villager access or Opal investment is missing.";
  const equalSpreadReason = allocationReason ?? villageMajikReason;
  const equalSpread = equalSpreadReason === null ? villageMajiks[5].getBonus() * Math.floor(leastInvestment! / 5) : null;
  const enthusiasmPerTen = villageMajikReason === null ? villageMajiks[0].getBonus() : null;
  this.allocationEffects = { leastUnlockedInvestment: leastInvestment, equalSpreadPercent: equalSpread,
   unavailableReason: equalSpreadReason, equalSpreadUnavailableReason: equalSpreadReason,
   opalEnthusiasm: this.villagers.map(villager => ({ villagerId: villager.index,
    investedTens: villager.investmentAvailable ? Math.floor(villager.opals / 10) : null,
    percent: villager.investmentAvailable && enthusiasmPerTen !== null ? enthusiasmPerTen * Math.floor(villager.opals / 10) : null,
    unavailableReason: villager.investmentAvailable ? villageMajikReason : "Saved Opal investment is missing." })) };
  const jarPercent = collectibleUnavailableReason === null
   ? this.jar.getBonus(4) + (this.jar.getBonus(10) + (this.jar.getBonus(12)
    + (this.jar.getBonus(22) + (this.jar.getBonus(29) + this.jar.getBonus(35))))) : null;
  const builtSchematics = this.schematics.filter(schematic => schematic.unlocked).length;
  const sharedInputs: VillagerSharedGrowthInputs = {
   ...inputs, unavailableReason: this.sharedGrowthUnavailableReason,
   earlyExplorerExpUpgrade: this.earlyExplorerExpUpgrade, cosmoFountainPercent: this.getFountainBonus(0, 14),
   bundleBonus: this.villagerBundleBonus, opalExp: 100 + this.getSchematicBonus(0, 25), jarPercent,
   collectibleUnavailableReason, compassUnavailableReason,
   legendUnavailableReason, tomeUnavailableReason, pristineUnavailableReason, farmingUnavailableReason,
   arcadeUnavailableReason, grimoireUnavailableReason, arcaneUnavailableReason, summoningUnavailableReason, vaultUnavailableReason,
   schematicUnavailableReason, fountainUnavailableReason, measurementUnavailableReason, bellUnavailableReason, contentedCreatorUnavailableReason,
   equalSpreadPercent: equalSpread, equalSpreadUnavailableReason: equalSpreadReason,
   enthusiasmPerTen, villageMajikUnavailableReason: villageMajikReason,
   contentedCreator: villageMajiks[1].getBonus() * builtSchematics, enhancedMajik: villageMajiks[2].getBonus(),
   bravery: monumentUnavailableReason === null ? this.getMonumentBonus("Bravery", 3) : null,
   justice: monumentUnavailableReason === null ? this.getMonumentBonus("Justice", 3) : null,
   wisdom: monumentUnavailableReason === null ? this.getMonumentBonus("Wisdom", 3) : null,
   monumentUnavailableReason, slabItemsMeasurement: this.measurements[7].effectiveBenefit,
   gloomieSchematic: this.getSchematicBonus(48),
   gloomieSchematicUnavailableReason,
   gloomieCardPercent: this.sourceSaveAvailable.cards ? Math.min(4 * inputs.gloomieCardLevel, 50) : null,
   gloomieCardUnavailableReason: this.sourceSaveAvailable.cards ? null : "Saved card inputs are missing.",
   bell: this.bell.bonuses[1].getBonus(), tomeMeasurement: this.measurements[0].effectiveBenefit,
  };
  const characterInputs = players.map(player => {
   const playerStatues = statues.find(statues => statues.playerID === player.playerID)!;
   const statue = playerStatues.statues.find(statue => statue.index === 28)!;
   return {
    playerId: player.playerID, playerName: player.playerName,
    statueBonus: this.statueSaveAvailable.get(player.playerID) ? statue.getBonus(player) : null,
   };
  });
  this.villagers.forEach(villager => villager.prepareCharacterRates(characterInputs, sharedInputs));
 }

 getRawKeys(): RawData[] {
  return [
   { key: "Holes", perPlayer: false, default: [] },
   { key: "DoOnceREAL", perPlayer: false, default: null },
   { key: "BundlesReceived", perPlayer: false, default: null },
   { key: "Gaming", perPlayer: false, default: null },
   { key: "Spelunk", perPlayer: false, default: null },
   { key: "GemItemsPurchased", perPlayer: false, default: null },
  ]
 }

 init(_allItems: Item[], _charCount: number) {
  // The generated order maps an availability slot to a stable building ID.
  const buildingOrder = this.schematics.map(schematic => schematic.data.order);
  this.schematics.forEach(schematic => {
   schematic.availabilitySlot = buildingOrder.indexOf(schematic.index);
   schematic.released = schematic.availabilitySlot >= 0 && schematic.availabilitySlot < 105;
   schematic.currency = this.currencies.find(currency => currency.index === schematic.data.costCurrencyId)!;
  });
  this.measurements.forEach(measurement => {
   measurement.currency = this.currencies.find(currency => currency.index === Number(measurement.data.itemRequirement.id))!;
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
  const spelunkData = data.get("Spelunk") as number[][] | null;
  const holeData = Array.from({ length: 35 }, (_, index) => savedHoleData[index] ?? []);
  const aspectHoleData = [...holeData] as (number[] | undefined)[];
  [3, 4, 5, 6, 20, 21, 24, 28].forEach(index => {
   if (savedHoleData[index] == null) aspectHoleData[index] = undefined;
  });
  const optionListAccount = (data.get("OptLacc") ?? []) as number[];
  const rawData = data.get("rawData") as Record<string, unknown>;
  const playerNames = data.get("playerNames") as string[];
  const releaseVersion = data.get("DoOnceREAL") == null ? null : Number(data.get("DoOnceREAL"));
  const bundles = (data.get("BundlesReceived") ?? null) as Record<string, number> | null;
  hole.researchExpUpgradeLevel = Number(optionListAccount[641] ?? 0);
  hole.earlyExplorerExpUpgrade = optionListAccount[355] == null ? null : Number(optionListAccount[355]);
  hole.villagerBundleBonus = bundles === null ? null : Number(bundles.bun_u ?? 0);
  hole.playerLocationData = [...holeData[0]];
  hole.villagers.forEach(villager => villager.parse(savedHoleData, releaseVersion));
  hole.studies.forEach(study => study.parse(savedHoleData, optionListAccount));
  hole.savedStudyLevelsForMeasurements = savedHoleData[26]?.map(Number) ?? null;
  const target = savedHoleData[11]?.[61];
  hole.studyTargetAvailable = target != null;
  hole.savedStudyTarget = target == null || Number(target) < 0 ? null : Number(target);
  hole.studyTargetUnavailableReason = target == null ? "Saved Study target is missing." : null;
  hole.eligibleStudyNeighbors = null;
  hole.studyNeighborEligibilityUnavailableReason = "Not prepared.";
  const gamingData = data.get("Gaming") as unknown[] | null;
  hole.superbitOwnershipSaveAvailable = gamingData?.[12] != null;
  hole.studyRate = null;
  hole.studyContributors = [];
  hole.growthInputs = null;
  hole.allocationEffects = { leastUnlockedInvestment: null, equalSpreadPercent: null,
   unavailableReason: "Not prepared.", equalSpreadUnavailableReason: "Not prepared.", opalEnthusiasm: [] };
  hole.anotherTry = { access: null, wishCost: null, availableWishes: null, affordable: null, resets: [] };
  hole.dailyLanternUses = savedHoleData[11]?.[84] == null ? null : Number(savedHoleData[11][84]);
  hole.wishesAvailable = savedHoleData[11]?.[25] == null ? null : Number(savedHoleData[11][25]);
  const reservedInvestments = savedHoleData[3]?.slice(5, 8);
  hole.reservedVillagerInvestments = reservedInvestments?.length === 3 && reservedInvestments.every(value => value != null)
   ? reservedInvestments.map(Number) : null;
  hole.unreleasedCavernOpals = holeData[7].slice(hole.studies.length).map(Number);
  hole.cavernEarnedOpals = 0;
  hole.cavernAttributionUnavailableReason = hole.unreleasedCavernOpals.some(value => value !== 0)
   ? "Saved Opals include an unreleased cavern source." : null;
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
   acquisition: cavernAcquisitions[study.index],
   opals: savedHoleData[7]?.[study.index] == null ? null : Number(savedHoleData[7][study.index]),
   unit: "Opals", unavailableReason: savedHoleData[7]?.[study.index] == null ? "Saved cavern Opals are missing." : null,
  }));
  hole.opalLedger = { sources: [], cavernEarned: null, externalEarned: null,
   emperorSchematicFloorAdjustment: null, externalRoundingAdjustment: null,
   earned: null, invested: null, uninvested: null, unavailableReason: "Not prepared." };
  hole.lanterns = { itemId: "Quest90", name: "Blinding Lantern", locations: [], totalStock: null,
   usesToday: hole.dailyLanternUses, usageUnavailableReason: hole.dailyLanternUses === null ? "Saved Lantern usage is missing." : null,
   dailyLimit: 12, hoursPerUse: 2, advances: [], excludes: [] };
  hole.storageSaveAvailable = rawData.ChestOrder != null && rawData.ChestQuantity != null;
  hole.inventorySaveAvailable = new Map(playerNames.map((_, id) =>
   [id, rawData[`InventoryOrder_${id}`] != null && rawData[`ItemQTY_${id}`] != null]));
  hole.statueSaveAvailable = new Map(playerNames.map((_, id) => [id, rawData[`StatueLevels_${id}`] != null]));
  hole.sourceSaveAvailable = {
   measurementCharacterLevels: playerNames.every((_, id) => rawData[`Lv0_${id}`] != null),
   measurementDeathnote: playerNames.every((_, id) => rawData[`KLA_${id}`] != null),
   measurementCrops: rawData.FarmCrop != null,
   measurementTome: rawData.Spelunk != null,
   measurementTasks: rawData.TaskZZ0 != null && rawData.TaskZZ1 != null,
   measurementSlab: rawData.Cards1 != null,
   gems: rawData.GemItemsPurchased != null, grimoire: rawData.Grimoire != null,
   compass: rawData.Compass != null, emperor: rawData.OptLacc != null,
   tesseract: rawData.Arcane != null, sushi: rawData.Sushi != null,
   schematics: savedHoleData[13] != null,
   gloomieColonyCounter: savedHoleData[11]?.[26] != null,
   cards: rawData.Cards0 != null, villageMajik: savedHoleData[5] != null,
   monumentalVibes: savedHoleData[4]?.[0] != null,
   collectibleLegendTalent: spelunkData?.[18]?.[29] != null,
   legendTalents: rawData.Spelunk != null, sneaking: rawData.Ninja != null,
   summoning: rawData.Summon != null, farming: rawData.FarmUpg != null,
   arcade: rawData.ArcadeUpg != null, vault: rawData.UpgVault != null,
   monumentRewards: savedHoleData[15] != null, bellBonuses: savedHoleData[17] != null,
   measurements: savedHoleData[22] != null, collectibles: savedHoleData[24] != null,
   fountainUpgrades: savedHoleData[31] != null, fountainMarbleization: savedHoleData[32] != null,
   studyStamps: rawData.StampLv != null,
  };
  const missingGrowthInputs = [
   ["Compass", rawData.Compass], ["Legend Talents and Tome", rawData.Spelunk],
   ["Collectible Legend Talent", hole.sourceSaveAvailable.collectibleLegendTalent ? true : null],
   ["Sneaking", rawData.Ninja], ["Summoning", rawData.Summon],
   ["Gem Shop purchases", hole.sourceSaveAvailable.gems ? true : null],
   ["Emperor", hole.sourceSaveAvailable.emperor ? true : null],
   ["Farming", rawData.FarmUpg], ["Arcade", rawData.ArcadeUpg],
   ["Grimoire", rawData.Grimoire], ["Tesseract", rawData.Arcane], ["Vault", rawData.UpgVault],
   ["Cards", rawData.Cards0],
   ["Hole Majik", savedHoleData[5]], ["Hole schematics", savedHoleData[13]],
   ["Monumental Vibes", savedHoleData[4]?.[0]],
   ["Hole monument rewards", savedHoleData[15]], ["Hole Bell bonuses", savedHoleData[17]],
   ["Hole Measurements", savedHoleData[22]], ["Hole collectibles", savedHoleData[24]],
   ["Hole Fountain upgrades", savedHoleData[31]], ["Hole Fountain marbleization", savedHoleData[32]],
  ].filter(([, value]) => value == null).map(([name]) => name);
  hole.sharedGrowthUnavailableReason = missingGrowthInputs.length > 0
   ? `Saved inputs are missing: ${missingGrowthInputs.join(", ")}.` : null;
  const missingStudyInputs = [
   ["Hole Majik", savedHoleData[5]], ["Hole schematics", savedHoleData[13]],
   ["Hole collectibles", savedHoleData[24]], ["Hole Fountain upgrades", savedHoleData[31]],
   ["Hole Fountain marbleization", savedHoleData[32]], ["Study stamps", rawData.StampLv],
   ["Collectible Legend Talent", spelunkData?.[18]?.[29]],
  ].filter(([, value]) => value == null).map(([name]) => name);
  hole.studyInputsUnavailableReason = missingStudyInputs.length > 0
   ? `Saved Study inputs are missing: ${missingStudyInputs.join(", ")}.` : null;

  const gemPurchases = data.get("GemItemsPurchased") as number[] | null;
  hole.savedGemShopBucketPurchase = gemPurchases?.[2] == null ? null : Number(gemPurchases[2]);
  hole.wellExpansionLevel = savedHoleData[11]?.[1] == null ? null : Number(savedHoleData[11][1]);
  hole.majiks.parse(savedHoleData, gemPurchases?.[4]);
  hole.currencies.forEach(currency => currency.parse(savedHoleData[9]));
  hole.lamp.parse(aspectHoleData);
  hole.wishesAvailable = hole.lamp.wishStock;



  hole.schematics.forEach(schematic => schematic.parse(savedHoleData));
  hole.measurements.forEach(measurement => measurement.parse(savedHoleData));

  hole.fountain.parse(holeData);

  // Monument Jazz
  const braveryMonument = hole.monuments.monuments["Bravery"];
  braveryMonument.hours = holeData[14][2 * braveryMonument.index] || 0;
  braveryMonument.highestRound = holeData[11][73] || 0;

  const justiceMonument = hole.monuments.monuments["Justice"];
  justiceMonument.hours = holeData[14][2 * justiceMonument.index] || 0;
  justiceMonument.highestRound = holeData[11][74] || 0;

  const wisdomMonument = hole.monuments.monuments["Wisdom"] as WisdomMonument;
  wisdomMonument.hours = holeData[14][2 * wisdomMonument.index] || 0;
  wisdomMonument.highestRound = holeData[11][75] || 0;
  wisdomMonument.highestPureMemoryRound = Math.round(Math.min(12, optionListAccount[353] ?? 0) + 1);

  [braveryMonument, justiceMonument, wisdomMonument].forEach(monument => {
   monument.unlocks.forEach(unlock => {
    unlock.unlocked = monument.hours > unlock.data.hours_required;
   });
   monument.bonuses.forEach(bonus => {
    bonus.level = holeData[15][10 * monument.index + bonus.index] || 0;
    // Monumental Vibes
    bonus.cosmoBonus = hole.majiks.HoleUpgrades.find(upgrade => upgrade.index == 0)?.getBonus() || 0;
    bonus.fountainBonus = hole.fountain.getBonus(monument.index, 13);
   });
   monument.bonuses.forEach(bonus => {
    bonus.monumentSelfBoost = monument.bonuses[9].getBonus();
   });
  });

  hole.bell.parse(holeData);

  hole.resourceCavrens.parse(holeData, optionListAccount, hole.playerLocationData);

  hole.well.parse(hole, holeData);
  hole.harp.parse(aspectHoleData);

  hole.dawgDen.bestScore = holeData[11][8] || 0;


  // Gambit
  hole.gambit.challenges.forEach(challenge => {
   challenge.maxTime = holeData[11][challenge.index + 65] || 0;
  });

  // Jar
  const ownedJars = holeData[11][37] || 0;
  hole.jar.jarTypes.forEach(jar => {
   jar.unlocked = ownedJars >= jar.index;
  });
  const jarBonusesLevels = holeData[24] as number[];
  this.jar.jarBonuses.forEach(bonus => {
   bonus.level = Number(jarBonusesLevels[bonus.index] ?? 0);
  });
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
 const players = data.get("players") as Player[];
 const divinity = data.get("divinity") as Divinity;

 // Tome quantities are numeric prepared inputs, not display-formatted strings.
 const studyLevels = hole.savedStudyLevelsForMeasurements === null ? null
  : hole.savedStudyLevelsForMeasurements.reduce((sum, level) => sum + level, 0);
 const lengthmeister = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 12)!;
 const fountainDiscountPercent = hole.sourceSaveAvailable.fountainUpgrades && hole.sourceSaveAvailable.fountainMarbleization
  ? hole.getFountainBonus(2, 14) : null;
 hole.measurements.forEach(measurement => measurement.prepare({
  minau: hole.villagers[VillagerIndex.Minau], lengthmeister, fountainDiscountPercent,
  crops: hole.sourceSaveAvailable.measurementCrops ? farming.registeredCropCount : null,
  accountLevel: hole.sourceSaveAvailable.measurementCharacterLevels ? tome.totalAccountLevel : null,
  tomeScore: hole.sourceSaveAvailable.measurementTome ? tome.getHighestScore() : null,
  skillLevel: hole.sourceSaveAvailable.measurementCharacterLevels ? tome.totalSkillLevel : null,
  deathnotePoints: hole.sourceSaveAvailable.measurementDeathnote ? deathnote.getTotalWorldRank() : null,
  highestDamage: hole.sourceSaveAvailable.measurementTasks ? Number(taskboard.tasks.find(task => task.name === "Road to Max Damage")!.count) : null,
  slabItems: hole.sourceSaveAvailable.measurementSlab ? slab.rawObtainedCount : null,
  studyLevels,
 }));

 // Update jar bonuses from legendary talents
 const legendTalentBonus = 1 + legendTalents.getBonusFromIndex(29) / 100;
 hole.jar.jarBonuses.forEach(bonus => {
  bonus.legendTalentBonus = legendTalentBonus;
 });

 // Update the lamp bonuses from zenith market
 hole.lamp.zenithMarketBonus = zenithMarket.getBonusForId(2);

 // Update the gambit multiplier
 const measurementGambitBonus = hole.measurements[13].effectiveBenefit;
 if (measurementGambitBonus === null) {
  hole.gambit.gambitPointsMulti = null;
 } else {
  let gambitMultipliers = measurementGambitBonus + hole.getStudyBolaiaBonuses(13);
  gambitMultipliers += tesseract.getUpgradeBonus(47) + (hole.monuments.monuments["Wisdom"].bonuses.find(bonus => bonus.index == 7)?.getBonus() ?? 0);
  gambitMultipliers += hole.schematics.find(schem => schem.index == 78)?.getBonus(10) ?? 0;
  gambitMultipliers += hole.jar.getBonus(23) + hole.jar.getBonus(30);
  hole.gambit.gambitPointsMulti = 1 + gambitMultipliers / 100;
 }
 hole.gambit.updateUnlockedBonuses();
 hole.bell.prepare(hole, players, gaming, divinity);
 const explorer = hole.villagers[VillagerIndex.Polonai];
 const cavernCount = explorer.saveAvailable ? Math.min(hole.studies.length, explorer.level) : null;
 hole.lamp.prepare(hole, cavernCount);
 hole.harp.prepare(hole);
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
 const pristineCharm = sneaking.pristineCharms.find(charm => charm.data.itemId === 21)!;
 const externalSources: OpalSource[] = [
  { id: "gem-shop", owner: "gems", name: "Gem Shop", acquisition: "Purchased Opals.",
   opals: gems.purchases.find(purchase => purchase.no === 5)!.pucrhased, unit: "Opals", unavailableReason: null },
  { id: "grimoire", owner: "grimoire", name: "Grimoire", acquisition: "Earned the Opal upgrade bonus.",
   opals: grimoire.getUpgradeBonus(11), unit: "Opals", unavailableReason: null },
  { id: "companion", owner: "companions", name: "Companion", acquisition: "Current active Opal companion bonus.",
   opals: 25 * companionBonus, unit: "Opals", unavailableReason: null },
  { id: "compass", owner: "compass", name: "Compass", acquisition: "Earned the Opal upgrade bonus.",
   opals: compass.getUpgradeBonus(52), unit: "Opals", unavailableReason: null },
  { id: "emperor", owner: "emperor", name: "Emperor", acquisition: "Unrounded Opal contribution from Emperor victories.",
   opals: emperor.emperorBonuses[3].getBonus(), unit: "Opals", unavailableReason: null },
  { id: "schematic", owner: "schematics", name: "Schematic", acquisition: "Unrounded Opal contribution from the built reward schematic.",
   opals: hole.getSchematicBonus(102, 1), unit: "Opals", unavailableReason: null },
  { id: "arcane", owner: "tesseract", name: "Arcane", acquisition: "Earned the Opal upgrade bonus.",
   opals: tesseract.getUpgradeBonus(25), unit: "Opals", unavailableReason: null },
  { id: "sushi", owner: "sushi", name: "Sushi", acquisition: "Unlocked the Opal Sushi reward.",
   opals: sushi.getBonusFromIndex(56), unit: "Opals", unavailableReason: null },
 ];
 hole.prepareOpalLedger(externalSources.map(source => {
  const owner = source.owner;
  if (owner !== "companions" && !hole.sourceSaveAvailable[owner]) {
   return { ...source, opals: null, unavailableReason: `Saved ${source.name} inputs are missing.` };
  }
  return source;
 }));
 hole.prepareInspection();
 hole.prepareLanternSummary(storage, players);
 hole.prepareStudyProgress(hole.superbitOwnershipSaveAvailable ? gaming.isSuperbitPurchased(43) : null,
  getStampBonusForKey(stamps, "VillageStudy"));
 hole.prepareVillagerGrowth(players, statues, {
  compassPercent: compass.getUpgradeBonus(59),
  legendPercent: legendTalents.getBonusFromIndex(12),
  pristinePercent: pristineCharm.unlocked ? (pristineCharm.getBonus() - 1) * 100 : 0,
  companionBonus, eventShopOwned: eventShop.isBonusOwned(6), lorePercent: tome.getEpilogueBonus(1),
  exoticPercent: farming.getExoticMarketBonusValue(51), arcadePercent: arcade.bonuses[38].getBonus(),
  grimoirePercent: grimoire.getUpgradeBonus(29), arcanePercent: tesseract.getUpgradeBonus(32),
  gloomieCardLevel: cards.find(card => card.id === "caveB")!.getLevels(),
  summoningPercent: summoning.getSummoningWinnerBonusFromIndex(21), vaultPercent: vault.getBonusForId(73),
 });
 hole.prepareUpgradeInspection(players, data.get("divinity") as Divinity);
};

export const updateHoleCharacterCapabilities = (data: Map<string, any>): void => {
 const hole = data.get("hole") as Hole;
 const players = data.get("players") as Player[];
 const skilling = data.get("skilling") as Skilling;
 const resourceCavrens = hole.resourceCavrens;
 const assignments = resourceCavrens.characterAssignments ?? [];

 Object.values(resourceCavrens.cavrens).forEach(cavern => {
  cavern.prepareCharacterCapabilities(players, assignments, skilling);
 });
};
