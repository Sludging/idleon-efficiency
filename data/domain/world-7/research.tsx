import type { StaticRepositories } from "../repositories";
import { Domain, RawData } from "../base/domain";
import { initResearchGridBonusRepo, ResearchGridBonusBase } from "../data/ResearchGridBonusRepo";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { Companion, getCompanionActiveBonus, getCompanionBonus, isCompanionLevelTwo } from "../companions";
import { GambitBonus } from "../world-5/hole/gambit";
import { Equinox } from "../world-3/equinox";
import { SushiStation } from "./sushi";
import { selectResearchSkillProgress } from "./researchInputs";
import { initResearchObservationRepo, ResearchObservationBase } from "../data/ResearchObservationRepo";
import { initResearchLensRepo, ResearchLensBase } from "../data/ResearchLensRepo";
import { initResearchMetadataRepo } from "../data/ResearchMetadataRepo";
import { initResearchPostyNoteRepo, ResearchPostyNoteBase } from "../data/ResearchPostyNoteRepo";
import { initResearchShapeRepo, ResearchShapeBase } from "../data/ResearchShapeRepo";
import { MapInfo } from "../maps";
import { MapDataBase } from "../data/MapDataRepo";
import { Card } from "../cards";
import { Storage } from "../storage";
import { Farming, CropScientistBonusText } from "../world-6/farming";
import { Cooking } from "../world-4/cooking";
import { DancingCoral } from "./dancingCoral";
import { ZenithMarket } from "./zenithShop";
import { Gaming } from "../world-5/gaming";
import { Worship } from "../world-3/worship";
import { Sailing } from "../world-5/sailing/sailing";
import { Spelunking } from "./spelunking";
import { Tome } from "../world-4/tome";
import { Grimoire } from "../grimoire";
import { EquipmentSets } from "../misc/equipmentSets";
import { Arcade } from "../world-2/arcade";
import { Button } from "./button";
import { KillRoy } from "../world-2/killroy";
import { Hole } from "../world-5/hole/hole";
import { JellyOperator } from "./jellyOperator";
import { Minehead } from "./minehead";
import { Sneaking } from "../world-6/sneaking";
import { EventShop } from "../eventShop";
import { RoyalArmory } from "../world-6/royalArmory/royalArmory";
import type { ImageData } from "../imageData";
import { Glimbo } from "./glimbo";
import { TaskBoard } from "../tasks";
import { Rift } from "../world-4/rift";
import { commaNotation, nFormatter, notateNumber } from "../../utility";
import type { Menagerie } from "../menagerie";

const RESEARCH_GRID_ALL_MULTI_CHALLENGES = [71, 72, 76];
const RESEARCH_GRID_ALL_MULTI_COMPANION = 55;
const DOOT_COMPANION = 0;
const DOOT_RESEARCH_INDEX = 173;
const RESEARCH_GRID_ALL_MULTI_SUSHI = 53;

const RESEARCH_GRID_COLUMNS = 20;

type ResearchGridBonusData = ResearchGridBonusBase["data"];

export interface ResearchPointBalance {
 earned: number;
 spent: number;
 available: number;
 contributors: ResearchContributor[];
 milestone: ResearchPointMilestone;
}

export type ResearchGridPrerequisite =
 | { kind: "lore"; tunnelIndex: number; name: string; met: boolean }
 | { kind: "cookingMastery"; met: boolean }
 | { kind: "undeadBattalion"; qualifyingBoatCount: number; totalBoatCount: number; met: boolean };

export type ResearchLinkedState =
 | { kind: "eclecticSigils"; researchGranted: boolean; loreCompleted: boolean; effectiveUnlocked: boolean }
 | { kind: "cookingMastery"; researchGranted: boolean; masteryUnlocked: boolean; effectiveActive: boolean; expMultiplier: number }
 | { kind: "undeadBattalion"; researchGranted: boolean; qualifyingBoatCount: number; totalBoatCount: number; effectiveBoatCount: number }
 | { kind: "crowns"; crownCount: number; bonusPerCrown: number; totalBonus: number }
 | { kind: "glimboTrades"; totalTrades: number; completeTradeBlocks: number; bonusPerBlock: number; totalBonus: number }
 | { kind: "masterclass"; researchGranted: boolean; classes: readonly ["Deathbringer", "Windwalker", "Arcane Cultist"]; dailyReductionPercent: number; accumulatedReduction: number; accumulatedReductionPercent: number; costMultiplier: number }
 | { kind: "divineDesign"; dropRatePercent: number; arctisGranted: boolean; dootActive: boolean; sharedGridContributionPercent: number };

interface ResearchLinkedInputs {
 sigilLore: { index: number; name: string; completed: boolean };
 cookingMasteryUnlocked: boolean;
 undeadBattalion: { qualifyingBoatCount: number; totalBoatCount: number };
}

/**
 * A single Research Grid square.
 *
 * Mode 0 is the square's effective bonus, mode 1 is its saved level, and
 * mode 2 is a square-specific secondary value used by other game systems.
 */
export class ResearchGridBonus {
 level: number = 0;
 allBonusMultiplier: number = 1;
 shapeBonusPercent: number = 0;
 activeOwner: number | undefined;
 reachable: boolean = false;
 affordable: boolean = false;
 prerequisites: ResearchGridPrerequisite[] = [];
 linkedState: ResearchLinkedState | undefined;
 accumulatedReductionPercent: number = 0;

 constructor(
  public index: number,
  public data: ResearchGridBonusData,
 ) { }

 parse(savedOwner: number | undefined, shapes: ResearchShape[]): void {
  this.activeOwner = savedOwner === undefined || Number(savedOwner) === -1 ? undefined : Number(savedOwner);
  this.shapeBonusPercent = this.activeOwner === undefined
   ? 0 : shapes[this.activeOwner].data.bonusPercent;
 }

 protected getLevelValue(): number {
  return this.level;
 }

 getLevel(): number {
  return Math.round(this.level);
 }

 get maxLevel(): number {
  return Math.round(this.data.maxLevel);
 }

 get atCap(): boolean {
  return this.level >= this.maxLevel;
 }

 get primaryBonus(): number {
  return this.getBonus();
 }

 get secondaryBonus(): number {
  return this.getBonusMode2();
 }

 get shapeMultiplier(): number {
  return 1 + this.shapeBonusPercent / 100;
 }

 get primaryMultiplier(): number {
  return 1 + this.getBonus() / 100;
 }

 get secondaryMultiplier(): number {
  return 1 + this.getBonusMode2() / 100;
 }

 protected getDescriptionTemplate(): string {
  return this.data.description;
 }

 getDescription(): string {
  const primary = Math.round(100 * this.getBonus()) / 100;
  const primaryText = primary > 100 ? commaNotation(primary) : notateNumber(primary, "Small");
  return this.getDescriptionTemplate()
   .replace(/{/g, primaryText)
   .replace(/}/g, nFormatter(1 + primary / 100, "MultiplierInfo"))
   .replace(/\$/g, commaNotation(this.getBonusMode2()))
   .replace(/\^/g, nFormatter(this.secondaryMultiplier, "MultiplierInfo"))
   .replace(/&/g, String(this.accumulatedReductionPercent))
   .replace(/\|/g, String(this.getLevel()));
 }

 preparePresentation(bonuses: ResearchGridBonus[], accumulatedReduction: number, inputs: ResearchLinkedInputs): void {
  const column = this.index % RESEARCH_GRID_COLUMNS;
  const startingSquare = column >= 9 && column <= 10 && this.index >= 100 && this.index <= 140;
  const neighbors: number[] = [];
  if (this.index >= RESEARCH_GRID_COLUMNS) neighbors.push(this.index - RESEARCH_GRID_COLUMNS);
  if (column > 0) neighbors.push(this.index - 1);
  if (column < RESEARCH_GRID_COLUMNS - 1) neighbors.push(this.index + 1);
  if (this.index + RESEARCH_GRID_COLUMNS < bonuses.length) neighbors.push(this.index + RESEARCH_GRID_COLUMNS);
  this.reachable = startingSquare || this.level >= 1
   || (this.data.name !== "Name" && neighbors.some(index => bonuses[index].level >= 1));
  this.accumulatedReductionPercent = Math.floor(1e4 * (1 - 1 / (1 + accumulatedReduction / 100))) / 100;
  this.prerequisites = [];
  this.linkedState = undefined;

  switch (this.index) {
   case 128: {
    const researchGranted = this.getBonus() >= 1;
    this.prerequisites = [{
     kind: "lore", tunnelIndex: inputs.sigilLore.index, name: inputs.sigilLore.name, met: inputs.sigilLore.completed,
    }];
    this.linkedState = {
     kind: "eclecticSigils", researchGranted, loreCompleted: inputs.sigilLore.completed,
     effectiveUnlocked: researchGranted && inputs.sigilLore.completed,
    };
    break;
   }
   case 190: {
    const researchGranted = this.level >= 1;
    this.prerequisites = [{ kind: "cookingMastery", met: inputs.cookingMasteryUnlocked }];
    this.linkedState = {
     kind: "cookingMastery", researchGranted, masteryUnlocked: inputs.cookingMasteryUnlocked,
     effectiveActive: researchGranted && inputs.cookingMasteryUnlocked, expMultiplier: this.primaryMultiplier,
    };
    break;
   }
   case 105: {
    const researchGranted = this.getLevel() >= 1;
    const { qualifyingBoatCount, totalBoatCount } = inputs.undeadBattalion;
    this.prerequisites = [{
     kind: "undeadBattalion", qualifyingBoatCount, totalBoatCount, met: qualifyingBoatCount > 0,
    }];
    this.linkedState = {
     kind: "undeadBattalion", researchGranted, qualifyingBoatCount, totalBoatCount,
     effectiveBoatCount: researchGranted ? qualifyingBoatCount : 0,
    };
    break;
   }
   case 150:
    this.linkedState = {
     kind: "masterclass", researchGranted: this.level >= 1,
     classes: ["Deathbringer", "Windwalker", "Arcane Cultist"],
     dailyReductionPercent: this.getBonus(), accumulatedReduction,
     accumulatedReductionPercent: this.accumulatedReductionPercent,
     costMultiplier: 1 / (1 + accumulatedReduction / 100),
    };
    break;
  }
 }

 /**
  * Game formula: base square bonus × level × shape multiplier ×
  * Grid_Bonus_Allmulti, with each multiplier clamped to at least 1.
  */
 getBonus(): number {
  return (
   this.data.bonusPerLevel *
   this.level *
   (1 + this.shapeBonusPercent / 100) *
   Math.max(1, this.allBonusMultiplier)
  );
 }

 getBonusMode2(): number {
  return this.getBonus();
 }

 getGridBonusAllmultiContribution(): number {
  return 0;
 }

 updateDerivedValues(): void { }

 static fromBase(data: ResearchGridBonusBase[]): ResearchGridBonus[] {
  return data.map((bonus) => {
   switch (bonus.index) {
    case 31:
     return new SmartEyeResearchGridBonus(bonus.index, bonus.data);
    case 67:
    case 68:
    case 107:
     return new CrownCountResearchGridBonus(bonus.index, bonus.data);
    case 94:
     return new ObservationLevelResearchGridBonus(bonus.index, bonus.data);
    case 112:
     return new OccurrenceCountResearchGridBonus(bonus.index, bonus.data);
    case 151:
     return new AccountOptionResearchGridBonus(bonus.index, bonus.data);
    case 168:
     return new GlimboTradesResearchGridBonus(bonus.index, bonus.data);
    case 173:
     return new DivineDesignResearchGridBonus(bonus.index, bonus.data);
    default:
     return new ResearchGridBonus(bonus.index, bonus.data);
   }
  });
 }
}

/** Smart Eye mode 2 raises the minimum search roll by 25 per level. */
export class SmartEyeResearchGridBonus extends ResearchGridBonus {
 override getBonusMode2(): number {
  return 25 * this.getLevelValue();
 }
}

/** Sticky/Boony/Palettable Crown mode 2 scales the effective bonus by crowns. */
export class CrownCountResearchGridBonus extends ResearchGridBonus {
 crownCount: number = 0;

 override getBonusMode2(): number {
  return this.getBonus() * this.crownCount;
 }

 override preparePresentation(bonuses: ResearchGridBonus[], accumulatedReduction: number, inputs: ResearchLinkedInputs): void {
  super.preparePresentation(bonuses, accumulatedReduction, inputs);
  this.linkedState = {
   kind: "crowns", crownCount: this.crownCount, bonusPerCrown: this.getBonus(), totalBonus: this.getBonusMode2(),
  };
 }
}

/**
 * Game Design 102 adds Research EXP per total Observation level. Observation
 * levels are counted only for observations currently revealed by Research.
 */
export class ObservationLevelResearchGridBonus extends ResearchGridBonus {
 occurrenceFoundState: number[] = [];
 observationInsightLevels: number[] = [];
 researchLevel: number = 0;
 totalObservationLevels: number = 0;
 override updateDerivedValues(): void {
  const occurrencesToBeFound = getOccurrencesToBeFound(
   this.occurrenceFoundState,
   this.researchLevel,
  );
  this.totalObservationLevels = this.observationInsightLevels
   .slice(0, occurrencesToBeFound)
   .reduce((sum, value) => sum + (Number(value) >= 1 ? Number(value) : 0), 0);
 }

 override getBonusMode2(): number {
  return this.getBonus() * this.totalObservationLevels;
 }
}

/** See 'Em All adds Research EXP per unlocked Observation. */
export class OccurrenceCountResearchGridBonus extends ResearchGridBonus {
 occurrenceFoundState: number[] = [];
 researchLevel: number = 0;
 totalOccurrencesFound: number = 0;

 override updateDerivedValues(): void {
  const occurrencesToBeFound = getOccurrencesToBeFound(
   this.occurrenceFoundState,
   this.researchLevel,
  );
  this.totalOccurrencesFound = this.occurrenceFoundState
   .slice(0, occurrencesToBeFound)
   .reduce((sum, value) => sum + (Number(value) >= 1 ? 1 : 0), 0);
 }

 override getBonusMode2(): number {
  return this.getBonus() * this.totalOccurrencesFound;
 }
}

/** This mode 2 branch reads the account option used by the game directly. */
export class AccountOptionResearchGridBonus extends ResearchGridBonus {
 optionValue: number = 0;

 override getBonusMode2(): number {
  return this.optionValue;
 }
}

/** Glimbo Insider Trading Secrets grants a secondary bonus per 100 trades. */
export class GlimboTradesResearchGridBonus extends ResearchGridBonus {
 totalGlimboTrades: number = 0;

 override getBonusMode2(): number {
  return this.getBonus() * Math.floor(this.totalGlimboTrades / 100);
 }

 override preparePresentation(bonuses: ResearchGridBonus[], accumulatedReduction: number, inputs: ResearchLinkedInputs): void {
  super.preparePresentation(bonuses, accumulatedReduction, inputs);
  this.linkedState = {
   kind: "glimboTrades", totalTrades: this.totalGlimboTrades,
   completeTradeBlocks: Math.floor(this.totalGlimboTrades / 100),
   bonusPerBlock: this.getBonus(), totalBonus: this.getBonusMode2(),
  };
 }
}

/**
 * Divine Design is normally a drop-rate square, but its saved level also
 * contributes up to +5% to Grid_Bonus_Allmulti when King Doot is owned.
 */
export class DivineDesignResearchGridBonus extends ResearchGridBonus {
 dootBonus: number = 0;
 activeDootBonus: number = 0;

 protected override getDescriptionTemplate(): string {
  const sentence = this.activeDootBonus === 1
   ? "Arctis_nods_in_approval..._all_Research_Grid_bonuses_are_1.05x_higher"
   : "You_are_now_permanently_linked_to_Arctis_on_all_characters.";
  return this.data.description.replace("<", sentence);
 }

 override preparePresentation(bonuses: ResearchGridBonus[], accumulatedReduction: number, inputs: ResearchLinkedInputs): void {
  super.preparePresentation(bonuses, accumulatedReduction, inputs);
  this.linkedState = {
   kind: "divineDesign", dropRatePercent: this.getBonus(), arctisGranted: this.getBonus() >= 1,
   dootActive: this.activeDootBonus === 1,
   sharedGridContributionPercent: this.getGridBonusAllmultiContribution(),
  };
 }

 override getGridBonusAllmultiContribution(): number {
  return 5 * Math.min(1, this.getLevelValue() * this.dootBonus);
 }
}
// Observation targets use eight columns. Saved pixel coordinates do not define neighbors.
const RESEARCH_OBSERVATION_COLUMNS = 8;
const RESEARCH_OBSERVATION_REVEAL_CAP = 43;
const RESEARCH_LENS_CAP = 80;
const RESEARCH_OBSERVATION_SUPPORT_SLOTS = 80;
const RESEARCH_SHAPE_CAP = 10;
const RESEARCH_PAPER_GRANT_HOURS = 2;
const RESEARCH_PAPER_EXPLANATION = "Each Half Finished Research Paper grants two hours of progress, including Minehead Currency. Pending progress is not applied to this saved view.";
const LENS_POSTY_NOTE_INDEXES = [0, 9, 12, 13];
const CAPACITY_POSTY_NOTE_INDEXES = [3, 6, 11];
const SHAPE_POSTY_NOTE_INDEXES = [1, 2, 4, 7, 10];
// Game 1.22, Research menu drawing: next Insight level selects the progress-fill color.
const RESEARCH_INSIGHT_PROGRESS_PALETTE = [
 [149, 148, 148], [152, 116, 99], [116, 187, 207], [204, 167, 93],
 [77, 115, 239], [202, 47, 225], [225, 47, 47], [44, 151, 69],
 [255, 138, 195], [255, 137, 46], [118, 104, 121],
];

export interface ResearchContributorReward {
 value: number;
 operation: ResearchContributor["operation"];
 unit: string;
 basis?: string;
 acquired: boolean;
 active: boolean;
 requiredResearchLevel?: number;
 grid?: {
  level: number;
  mode: number;
  conditionalBasis?: { count: number; unit: string };
 };
 companion?: {
  owned: boolean;
  level: 1 | 2;
  bonusTokenActive: boolean;
  requiredLevel: 1 | 2;
 };
}

export interface ResearchCompanionGroup {
 id: "jellofish" | "riftStalker" | "neonscale";
 name: string;
 components: ResearchContributor[];
 factor: number;
 reward: ResearchContributorReward;
}

export interface ResearchContributor {
 source: string;
 value: number;
 operation: "add" | "addPercent" | "multiply";
 inputValue: number;
 cap?: number;
 gate?: string;
 components?: ResearchContributor[];
 companionGroups?: ResearchCompanionGroup[];
 reward?: ResearchContributorReward;
}


export interface ResearchProgress {
 highestLevel: number;
 currentXP: number;
 xpReq: number;
 saveGlobalTime: number | undefined;
 discoveries: number;
 totalObservationLevels: number;
 eligibleObservationCount: number;
}

export interface ResearchDiscoveryAllowance {
 remainingAttempts: number;
 dailyAllocation: number;
 minimumRoll: number;
 maximumRoll: number;
 inclusiveRollBounds: true;
 failedRollCount: number;
 currentFailedRollBonus: number;
 failedRollBonusCap: number;
 minimumRollContributors: ResearchContributor[];
 maximumRollContributors: ResearchContributor[];
 dailyAllocationContributors: ResearchContributor[];
}

export interface ResearchLensOwnership {
 total: number;
 uncappedTotal: number;
 cap: number;
 magnifyingGlasses: number;
 opticalMonocles: number;
 kaleidoscopes: number;
 capacityPerObservation: number;
 capacityContributors: ResearchContributor[];
 unplacedLensCount: number;
 contributors: ResearchContributor[];
}

export interface ResearchProduction {
 expPerHour: number;
 expBeforeSharedMultiplierPerHour: number;
 expMultiplier: number;
 additiveExpPercent: number;
 additiveExpContributors: ResearchContributor[];
 expMultiplierContributors: ResearchContributor[];
 insightAccrualPerHour: number;
 gameDisplayedInsightPerHour: number;
 insightDisplayDiscrepancy: string;
 insightMultiplier: number;
 insightContributors: ResearchContributor[];
 kaleidoscopeBoostPercent: number;
 kaleidoscopeContributors: ResearchContributor[];
 totalInsightExpBonusPercent: number;
 localInsightExpPerLevelContributor: ResearchContributor;
}

export interface ResearchOfflineGains {
 onlinePercent: number;
 percent: number;
 fraction: number;
 unclampedPercent: number;
 baselinePercent: number;
 floorPercent: number;
 capPercent: number;
 contributors: ResearchContributor[];
}

export interface ResearchShapeOwnership {
 count: number;
 uncappedCount: number;
 cap: number;
 ownedShapes: { index: number; name: string }[];
 contributors: ResearchContributor[];
 rotationUnlocked: boolean;
 rotationRequiredLevel: number;
 rotationStepDegrees: number;
}

export interface ResearchPointMilestone {
 reachedTenLevelBlocks: number;
 pointsPerTenLevelBlock: number;
 cumulativeMilestonePoints: number;
 purchasedGrid50Level: number;
 level60Reached: boolean;
 explanation: string;
}

export interface ResearchPapers {
 consumable: { item: Item; count: number; grantHours: 2; includesMineheadCurrency: true; explanation: string };
 permanent: { purchasedCount: number; offlinePercent: number };
}

export interface ResearchShapePlacement {
 x: number;
 y: number;
 rotationDegrees: number;
}

export class ResearchShape {
 placement: ResearchShapePlacement | undefined;
 owned: boolean = false;
 coveredUpgrades: ResearchGridBonus[] = [];
 rotationUnlocked: boolean = false;
 rotationRequiredLevel: number = 0;
 rotationStepDegrees: number = 0;

 constructor(public index: number, public data: ResearchShapeBase["data"]) { }

 static fromBase(definitions: ResearchShapeBase[]): ResearchShape[] {
  return definitions.map(shape => new ResearchShape(shape.index, shape.data));
 }

 parse(savedPlacement: number[]): void {
  const offset = 4 * this.index;
  this.placement = savedPlacement[offset] === undefined
   || savedPlacement[offset + 1] === undefined || savedPlacement[offset + 2] === undefined
   ? undefined : {
    x: Number(savedPlacement[offset]), y: Number(savedPlacement[offset + 1]),
    rotationDegrees: Number(savedPlacement[offset + 2]),
   };
  this.coveredUpgrades = [];
 }

 get rotationModuloDegrees(): number | undefined {
  if (this.placement === undefined) {
   return undefined;
  }
  const rotationDegrees = this.placement.rotationDegrees;
  return rotationDegrees - 360 * Math.floor(rotationDegrees / 360);
 }

 get bonusMultiplier(): number {
  return 1 + this.data.bonusPercent / 100;
 }

 getImageData(): ImageData {
  return { location: `ResShape${this.index}`, width: this.data.width, height: this.data.height };
 }

 getDescription(): string {
  return this.data.descriptionTemplate
   .replace(/{/g, String(this.data.bonusPercent))
   .replace(/}/g, nFormatter(this.bonusMultiplier, "MultiplierInfo"));
 }

 prepareCoverage(ownership: ResearchShapeOwnership, upgrades: ResearchGridBonus[]): void {
  this.owned = this.index < ownership.count;
  this.rotationUnlocked = ownership.rotationUnlocked;
  this.rotationRequiredLevel = ownership.rotationRequiredLevel;
  this.rotationStepDegrees = ownership.rotationStepDegrees;
  // The saved square owner selects one effective Shape, even when Shapes overlap.
  this.coveredUpgrades = upgrades.filter(upgrade => upgrade.activeOwner === this.index);
 }
}

export type ResearchLensKind = "magnifyingGlass" | "opticalMonocle" | "kaleidoscope";

export class ResearchLens {
 constructor(
  public index: number,
  public kind: ResearchLensKind,
  public data: ResearchLensBase["data"],
  public x: number,
  public y: number,
  public targetObservationIndex: number | undefined,
 ) { }

 getImageData(): ImageData {
  const imageIndex = this.kind === "magnifyingGlass" ? 0 : this.kind === "opticalMonocle" ? 1 : 2;
  return { location: `ResMagni${imageIndex}`, width: 36, height: 36 };
 }

 get placed(): boolean {
  return this.targetObservationIndex !== undefined;
 }

 supports(observationIndex: number): boolean {
  if (this.kind !== "kaleidoscope" || this.targetObservationIndex === undefined) return false;
  const target = this.targetObservationIndex;
  const column = target % RESEARCH_OBSERVATION_COLUMNS;
  return (column < RESEARCH_OBSERVATION_COLUMNS - 1 && observationIndex === target + 1)
   || (column > 0 && observationIndex === target - 1)
   || (target >= RESEARCH_OBSERVATION_COLUMNS && observationIndex === target - RESEARCH_OBSERVATION_COLUMNS)
   || (target < RESEARCH_OBSERVATION_SUPPORT_SLOTS - RESEARCH_OBSERVATION_COLUMNS && observationIndex === target + RESEARCH_OBSERVATION_COLUMNS);
 }
}

export interface ResearchDiscoveryConditions {
 outsideRevealedPrefix: boolean;
 alreadyDiscovered: boolean;
 exhaustedAttempts: boolean;
 insufficientMaximumRoll: boolean;
}

export interface ResearchObservationStudy {
 requiredResearchLevel: number;
 unmetResearchLevel: boolean;
 eligible: boolean;
 state: "notRevealed" | "notFound" | "requiresResearchLevel" | "eligible";
}

export class Observation {
 found: boolean = false;
 insightExperience: number = 0;
 insightLevel: number = 0;
 nextInsightRequirement: number = 0;
 eligibleForProduction: boolean = false;
 revealed: boolean = false;
 study: ResearchObservationStudy;
 discoveryConditions: ResearchDiscoveryConditions = {
  outsideRevealedPrefix: true, alreadyDiscovered: false, exhaustedAttempts: false, insufficientMaximumRoll: false,
 };
 assignedLenses: ResearchLens[] = [];
 supportingKaleidoscopes: ResearchLens[] = [];
 kaleidoscopeMultiplier: number = 1;
 localInsightExpBonusPercent: number = 0;
 baseExpPerGlassPerHour: number = 0;
 expBeforeSharedMultiplierPerHour: number = 0;
 expPerHour: number = 0;
 insightAccrualPerHour: number = 0;
 gameDisplayedInsightPerHour: number = 0;
 localInsightExpContributor!: ResearchContributor;
 expContributors: ResearchContributor[] = [];
 insightContributors: ResearchContributor[] = [];

 constructor(
  public index: number,
  public data: ResearchObservationBase["data"],
  public map: MapDataBase,
 ) {
  this.study = {
   requiredResearchLevel: data.requiredResearchLevel,
   unmetResearchLevel: true,
   eligible: false,
   state: "notRevealed",
  };
 }

 getImageData(): ImageData {
  return { location: `ResObj${this.index}`, width: 36, height: 36 };
 }

 getInsightProgressColor(): string {
  const nextInsightLevel = Math.round(this.insightLevel + 1);
  const color = RESEARCH_INSIGHT_PROGRESS_PALETTE[Math.min(10, nextInsightLevel)];
  const darkening = 8 * Math.max(0, nextInsightLevel - 10);
  return `rgb(${color.map(channel => Math.max(0, channel - darkening)).join(", ")})`;
 }

 getInsightImageFilter(): string {
  // Use a stable palette hue for UI artwork, not game image parity.
  const level = Math.min(10, Math.max(0, Math.round(this.insightLevel)));
  if (level === 0) return "grayscale(1) brightness(1.3)";

  const [red, green, blue] = RESEARCH_INSIGHT_PROGRESS_PALETTE[level];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;
  if (delta !== 0) {
   if (maximum === red) hue = 60 * (((green - blue) / delta) % 6);
   else if (maximum === green) hue = 60 * ((blue - red) / delta + 2);
   else hue = 60 * ((red - green) / delta + 4);
   if (hue < 0) hue += 360;
  }
  const strength = 5 * delta / maximum;
  return `sepia(1) saturate(${strength}) hue-rotate(${hue - 40}deg) brightness(1.3)`;
 }

 static fromBase(data: ResearchObservationBase[]): Observation[] {
  return data.map(observation => new Observation(
   observation.index, observation.data,
   MapInfo.find(map => map.data.map.id === observation.data.mapId)!,
  ));
 }

 parse(found: number, experience: number, level: number): void {
  this.found = found >= 1;
  this.insightExperience = experience;
  this.insightLevel = level;
 }

 update(
  level: number, allowance: ResearchDiscoveryAllowance, eligibleCount: number,
  lenses: ResearchLens[], savedLenses: ResearchLens[], production: ResearchProduction,
 ): void {
  this.revealed = this.index < eligibleCount;
  const unmetStudyLevel = level < this.data.requiredResearchLevel;
  this.study = {
   requiredResearchLevel: this.data.requiredResearchLevel,
   unmetResearchLevel: unmetStudyLevel,
   eligible: this.revealed && this.found && !unmetStudyLevel,
   state: !this.revealed ? "notRevealed" : !this.found ? "notFound"
    : unmetStudyLevel ? "requiresResearchLevel" : "eligible",
  };
  this.discoveryConditions = {
   outsideRevealedPrefix: !this.revealed,
   alreadyDiscovered: this.found,
   exhaustedAttempts: allowance.remainingAttempts <= 0,
   insufficientMaximumRoll: allowance.maximumRoll < this.data.discoveryRollRequirement,
  };
  this.assignedLenses = lenses.filter(lens => lens.targetObservationIndex === this.index);
  this.supportingKaleidoscopes = lenses.filter(lens => lens.supports(this.index));
  // Production helpers traverse all saved slots, not only the owned prefix.
  const assignedSavedLenses = savedLenses.filter(lens => lens.targetObservationIndex === this.index);
  const supportingSavedKaleidoscopes = savedLenses.filter(lens => lens.supports(this.index));
  this.kaleidoscopeMultiplier = 1 + supportingSavedKaleidoscopes.length * production.kaleidoscopeBoostPercent / 100;
  this.eligibleForProduction = this.index < eligibleCount;
  this.nextInsightRequirement = (2 + 0.7 * this.index)
   * Math.pow(1.75 + this.index / 200, this.insightLevel)
   * (1 + Math.pow(this.index, 2) / 100) + this.insightLevel;
  this.localInsightExpBonusPercent = production.localInsightExpPerLevelContributor.value * this.insightLevel;
  this.localInsightExpContributor = researchPercentMultiplier(
   production.localInsightExpPerLevelContributor.source, this.localInsightExpBonusPercent,
   `Observation Insight level ${this.insightLevel}`,
   production.localInsightExpPerLevelContributor.reward,
  );
  const localReward = this.localInsightExpContributor.reward;
  if (localReward) {
   localReward.active = localReward.acquired && this.insightLevel > 0;
   localReward.grid = {
    ...localReward.grid!,
    conditionalBasis: { count: this.insightLevel, unit: "Observation Insight level" },
   };
  }
  this.baseExpPerGlassPerHour = (4 + (this.index / 2 + Math.floor(this.index / 4)))
   * (1 + Math.pow(this.index, 1 + this.index / 15 * 0.4) / 10)
   + (Math.pow(this.index, 1.5) + 1.5 * this.index);
  const glasses = assignedSavedLenses.filter(lens => lens.kind === "magnifyingGlass").length;
  const monocles = assignedSavedLenses.filter(lens => lens.kind === "opticalMonocle").length;
  const support = researchContribution("Supporting Kaleidoscopes", this.kaleidoscopeMultiplier, "multiply", undefined, "Orthogonal neighbors only. Each supporting lens adds its boost.");
  this.expContributors = [
   researchContribution("Assigned Magnifying Glasses", glasses, "multiply"),
   researchContribution("Observation base Research EXP per hour", this.baseExpPerGlassPerHour, "multiply"),
   this.localInsightExpContributor, support,
  ];
  this.expBeforeSharedMultiplierPerHour = this.expContributors.reduce((product, contributor) => product * contributor.value, 1);
  this.expContributors.push(researchContribution("Shared Research EXP multiplier", production.expMultiplier, "multiply"));
  this.expPerHour = this.eligibleForProduction
   ? this.expBeforeSharedMultiplierPerHour * production.expMultiplier : 0;
  this.insightContributors = [
   researchContribution("Base Insight per Monocle per hour", 3, "multiply"),
   researchContribution("Assigned Optical Monocles", monocles, "multiply"),
   { source: "Shared Insight multiplier", inputValue: production.insightMultiplier, value: production.insightMultiplier, operation: "multiply", components: production.insightContributors },
   support,
  ];
  this.insightAccrualPerHour = this.eligibleForProduction
   ? this.insightContributors.reduce((product, contributor) => product * contributor.value, 1) : 0;
  this.gameDisplayedInsightPerHour = this.insightAccrualPerHour * production.expMultiplier;
 }
}

export type ResearchPostyNoteContext =
 | { kind: "lens"; additionalLenses: number; currentTotal: number; cap: number }
 | { kind: "capacity"; capacity: number; currentCapacity: number }
 | { kind: "shape"; additionalShapes: number; canAddOwnedShape: boolean; currentOwnership: ResearchShapeOwnership; explanation: string }
 | { kind: "rotation"; requiredLevel: number; unlocked: boolean; stepDegrees: number }
 | { kind: "points"; current: ResearchPointMilestone };

export class PostyNote {
 reached: boolean = false;
 upcoming: boolean = true;
 context!: ResearchPostyNoteContext;

 constructor(public index: number, public data: ResearchPostyNoteBase["data"]) { }

 static fromBase(data: ResearchPostyNoteBase[]): PostyNote[] {
  return data.map(note => new PostyNote(note.index, note.data));
 }

 getImageData(): ImageData {
  return {
   location: `ResPosty${this.index}`,
   width: 112,
   height: 111,
  };
 }

 update(level: number, lenses: ResearchLensOwnership, shapes: ResearchShapeOwnership, points: ResearchPointMilestone): void {
  this.reached = level >= this.data.requiredResearchLevel;
  this.upcoming = !this.reached;
  if (LENS_POSTY_NOTE_INDEXES.includes(this.index)) {
   this.context = { kind: "lens", additionalLenses: 1, currentTotal: lenses.total, cap: lenses.cap };
  } else if (CAPACITY_POSTY_NOTE_INDEXES.includes(this.index)) {
   this.context = { kind: "capacity", capacity: CAPACITY_POSTY_NOTE_INDEXES.indexOf(this.index) + 2, currentCapacity: lenses.capacityPerObservation };
  } else if (SHAPE_POSTY_NOTE_INDEXES.includes(this.index)) {
   this.context = {
    kind: "shape", additionalShapes: 1, canAddOwnedShape: shapes.count < shapes.cap,
    currentOwnership: shapes,
    explanation: "This note adds one Shape before the ownership cap. Outside rewards change current ownership, not this note's reward.",
   };
  } else if (this.index === 5) {
   this.context = { kind: "points", current: points };
  } else {
   this.context = { kind: "rotation", requiredLevel: shapes.rotationRequiredLevel, unlocked: shapes.rotationUnlocked, stepDegrees: shapes.rotationStepDegrees };
  }
 }
}

interface ResearchDisplayInputs {
 additiveExp: ResearchContributor[];
 expMultipliers: ResearchContributor[];
 offline: ResearchContributor[];
 ownership: ResearchContributor[];
 opticalMonocles: number;
 kaleidoscopes: number;
 maximumRoll: ResearchContributor[];
 dailyAllocation: ResearchContributor[];
 insight: ResearchContributor[];
 kaleidoscope: ResearchContributor[];
 shapeOwnership: ResearchContributor[];
 localInsight: ResearchContributor;
 papers: ResearchPapers;
}

const sumContributors = (contributors: ResearchContributor[]): number =>
 contributors.reduce((total, contributor) => total + contributor.value, 0);



export class ResearchGrid extends Domain {
 bonuses: ResearchGridBonus[] = [];
 upgrades: ResearchGridBonus[] = [];
 shapes: ResearchShape[] = [];
 points!: ResearchPointBalance;
 sources!: ResearchSourceCatalogue;
 observations: Observation[] = [];
 lenses: ResearchLens[] = [];
 lensDefinitions: ResearchLensBase[] = [];
 postyNotes: PostyNote[] = [];
 metadata = initResearchMetadataRepo()[0].data;
 progress: ResearchProgress = {
  highestLevel: 0, currentXP: 0, xpReq: 0, saveGlobalTime: undefined,
  discoveries: 0, totalObservationLevels: 0, eligibleObservationCount: 0,
 };
 discoveryAllowance!: ResearchDiscoveryAllowance;
 lensOwnership!: ResearchLensOwnership;
 production!: ResearchProduction;
 offlineGains!: ResearchOfflineGains;
 shapeOwnership!: ResearchShapeOwnership;
 pointMilestone!: ResearchPointMilestone;
 papers!: ResearchPapers;
 pendingEffectiveProgressSeconds: number = 0;
 private purchasedLevels: number[] = [];
 private savedLenses: ResearchLens[] = [];
 private paperItem!: Item;
 private remainingAttempts: number = 0;
 private failedRollCount: number = 0;
 private allBonusMultiplier: number = 1;
 private accumulatedFirstThreeUpgradeCostReduction: number = 0;

 getRawKeys(): RawData[] {
  return [
   { key: "Research", perPlayer: false, default: [] },
   { key: "Lv0_", perPlayer: true, default: [] },
   { key: "Exp0_", perPlayer: true, default: [] },
   { key: "ExpReq0_", perPlayer: true, default: [] },
   { key: "TimeAway", perPlayer: false, default: {} },
  ];
 }

 /** Reset parsed state, bind raw metadata, and prepare neutral display before save parsing. */
 init(allItems: Item[], _charCount: number, repositories: StaticRepositories) {
  this.bonuses = ResearchGridBonus.fromBase(initResearchGridBonusRepo());
  this.upgrades = this.bonuses.filter(bonus => bonus.data.name !== "Name");
  this.purchasedLevels = [];
  this.remainingAttempts = 0;
  this.failedRollCount = 0;
  this.pendingEffectiveProgressSeconds = 0;
  this.allBonusMultiplier = 1;
  this.accumulatedFirstThreeUpgradeCostReduction = 0;
  this.progress = {
   highestLevel: 0, currentXP: 0, xpReq: 0, saveGlobalTime: undefined,
   discoveries: 0, totalObservationLevels: 0, eligibleObservationCount: 0,
  };
  this.observations = Observation.fromBase(initResearchObservationRepo());
  this.lensDefinitions = initResearchLensRepo();
  this.savedLenses = [];
  this.lenses = [];
  this.postyNotes = PostyNote.fromBase(initResearchPostyNoteRepo());
  this.shapes = ResearchShape.fromBase(initResearchShapeRepo());
  this.paperItem = allItems.find(item => item.internalName === "Quest115")!;
  this.sources = new ResearchSourceCatalogue(this, repositories);
  this.sources.prepare();
  return this;
 }

 parse(data: Map<string, any>): void {
  const researchGrid = data.get(this.getDataKey()) as ResearchGrid;
  const research = (data.get("Research") as number[][]) || [];
  const gridLevels = research[0] || [];
  researchGrid.purchasedLevels = gridLevels.map(level => Number(level) || 0);
  // Research[1] identifies the shape covering each square; -1 means none.
  const shapeIndexes = research[1] || [];
  // Research[2] tracks which observations have been found.
  const occurrenceFoundState = research[2] || [];
  // Research[4] stores each found observation's Insight level.
  const observationInsightLevels = research[4] || [];
  const skillProgress = selectResearchSkillProgress(data, data.get("charCount") as number);
  researchGrid.shapes.forEach(shape => shape.parse(research[6] || []));
  // OptionsListAccount[500] is the direct mode-2 value for square 151.
  // This saved value records Research's cumulative first-three cost reduction.
  researchGrid.accumulatedFirstThreeUpgradeCostReduction = Number(
   (data.get("OptLacc") as number[] | undefined)?.[499] ?? 0,
  );
  const accountOption500 = Number((data.get("OptLacc") as number[] | undefined)?.[500]) || 0;
  researchGrid.remainingAttempts = Number(research[7]?.[2] ?? 0);
  researchGrid.pendingEffectiveProgressSeconds = Number(research[7]?.[3] ?? 0);
  researchGrid.failedRollCount = Number((data.get("OptLacc") as number[] | undefined)?.[514] ?? 0);
  const timeAway = data.get("TimeAway");
  const saveTime = timeAway && typeof timeAway === "object" && "GlobalTime" in timeAway
   ? Number(timeAway.GlobalTime) : undefined;
  researchGrid.observations.forEach(observation => observation.parse(
   Number(occurrenceFoundState[observation.index] ?? 0),
   Number(research[3]?.[observation.index] ?? 0),
   Number(observationInsightLevels[observation.index] ?? 0),
  ));
  researchGrid.progress = {
   ...skillProgress, saveGlobalTime: saveTime,
   eligibleObservationCount: 0, discoveries: 0, totalObservationLevels: 0,
  };
  const savedLenses = research[5] || [];
  const lensKinds: ResearchLensKind[] = ["magnifyingGlass", "opticalMonocle", "kaleidoscope"];
  researchGrid.savedLenses = [];
  for (let offset = 0; offset < savedLenses.length; offset += 4) {
   const kindIndex = Number(savedLenses[offset + 3]);
   const target = Number(savedLenses[offset + 2]);
   researchGrid.savedLenses.push(new ResearchLens(
    offset / 4, lensKinds[kindIndex], researchGrid.lensDefinitions.find(lens => lens.index === kindIndex)!.data,
    Number(savedLenses[offset]), Number(savedLenses[offset + 1]), target === -1 ? undefined : target,
   ));
  }

  researchGrid.bonuses.forEach((bonus) => {
   bonus.level = Number(gridLevels[bonus.index]) || 0;

   bonus.parse(shapeIndexes[bonus.index], researchGrid.shapes);
  });

  // The repository keeps each square at its numeric game index, so these casts
  // assign raw inputs to the matching specialized square objects.
  const observationLevelBonus = researchGrid.bonuses[94] as ObservationLevelResearchGridBonus;
  observationLevelBonus.occurrenceFoundState = occurrenceFoundState;
  observationLevelBonus.observationInsightLevels = observationInsightLevels;
  observationLevelBonus.researchLevel = skillProgress.highestLevel;
  const occurrenceCountBonus = researchGrid.bonuses[112] as OccurrenceCountResearchGridBonus;
  occurrenceCountBonus.occurrenceFoundState = occurrenceFoundState;
  occurrenceCountBonus.researchLevel = skillProgress.highestLevel;
  (researchGrid.bonuses[151] as AccountOptionResearchGridBonus).optionValue = accountOption500;
 }

 getAccumulatedFirstThreeUpgradeCostReduction(): number {
  return this.accumulatedFirstThreeUpgradeCostReduction;
 }

 getBonusForId(index: number, mode: number = 0): number {
  const bonus = this.bonuses.find((bonus) => bonus.index === index);
  if (!bonus) {
   return 0;
  }

  // The game uses mode 1 for the level and mode 2 for the square's secondary value.
  switch (mode) {
   case 1:
    return bonus.getLevel();
   case 2:
    return bonus.getBonusMode2();
   default:
    return bonus.getBonus();
  }
 }

 getGridBonusAllmulti(): number {
  return this.allBonusMultiplier;
 }

 getObservationRevealRequirement(index: number): { researchLevel: number; requiresFirstDiscovery: boolean } | undefined {
  if (!Number.isInteger(index) || index < 0 || index >= RESEARCH_OBSERVATION_REVEAL_CAP) {
   return undefined;
  }

  // Find the first level that reveals this index after the first discovery.
  let researchLevel = 1;
  while (getRevealedObservationCount(researchLevel, true) <= index) {
   researchLevel += 1;
  }

  return {
   researchLevel,
   requiresFirstDiscovery: index > 0 && !this.observations[0].found,
  };
 }

 /**
  * Game formula:
  * 1 + (Companions(55) + Divine Design's Doot contribution +
  * CloudBonus(71, 72, 76) + SushiStuff(53)) / 100.
  */
 updateCalculationState(companions: Companion[], equinox: Equinox, sushi: SushiStation): void {
  const divineDesignActiveBonus = getCompanionActiveBonus(companions, DOOT_COMPANION);
  (this.bonuses[DOOT_RESEARCH_INDEX] as DivineDesignResearchGridBonus).activeDootBonus = divineDesignActiveBonus;
  this.progress.eligibleObservationCount = getOccurrencesToBeFound(
   this.observations.map(observation => observation.found ? 1 : 0), this.progress.highestLevel,
  );
  this.progress.discoveries = this.observations.filter(observation =>
   observation.index < this.progress.eligibleObservationCount && observation.found).length;
  this.progress.totalObservationLevels = this.observations.reduce((total, observation) =>
   total + (observation.index < this.progress.eligibleObservationCount && observation.insightLevel >= 1
    ? observation.insightLevel : 0), 0);
  const divineDesign = this.bonuses[DOOT_RESEARCH_INDEX] as DivineDesignResearchGridBonus;
  divineDesign.dootBonus = getCompanionBonus(companions, DOOT_COMPANION);

  const companion55Bonus = getCompanionActiveBonus(companions, RESEARCH_GRID_ALL_MULTI_COMPANION);
  const cloudBonus = RESEARCH_GRID_ALL_MULTI_CHALLENGES.reduce(
   (sum, index) => sum + equinox.getChallengeBonus(index),
   0,
  );
  const sushiBonus = sushi.getBonusFromIndex(RESEARCH_GRID_ALL_MULTI_SUSHI);

  this.allBonusMultiplier =
   1 +
   (companion55Bonus +
    divineDesign.getGridBonusAllmultiContribution() +
    cloudBonus +
    sushiBonus) /
   100;

  // Derived counters are populated only after all raw Research data has been parsed.
  this.bonuses.forEach((bonus) => {
   bonus.allBonusMultiplier = this.allBonusMultiplier;
   bonus.updateDerivedValues();
  });
 }
 prepareDisplay(inputs: ResearchDisplayInputs): void {
  const level = this.progress.highestLevel;
  const smartEyeLevel = this.getBonusForId(31, 1);
  const failedRollBonusCap = this.getBonusForId(31, 2);
  const currentFailedRollBonus = Math.min(this.failedRollCount * smartEyeLevel, failedRollBonusCap);
  this.sources.failedRoll.cap = failedRollBonusCap;
  this.sources.failedRoll.setInput(this.failedRollCount * smartEyeLevel);
  this.discoveryAllowance = {
   remainingAttempts: this.remainingAttempts,
   dailyAllocation: Math.round(sumContributors(inputs.dailyAllocation)),
   minimumRoll: Math.floor(this.metadata.baseDiscoveryMinRoll + currentFailedRollBonus),
   maximumRoll: Math.floor(sumContributors(inputs.maximumRoll)),
   inclusiveRollBounds: true,
   failedRollCount: this.failedRollCount, currentFailedRollBonus, failedRollBonusCap,
   minimumRollContributors: this.sources.minimumRoll,
   maximumRollContributors: inputs.maximumRoll,
   dailyAllocationContributors: inputs.dailyAllocation,
  };
  const ownership = inputs.ownership;
  const uncappedTotal = Math.round(sumContributors(ownership));
  const total = Math.min(RESEARCH_LENS_CAP, uncappedTotal);
  this.lenses = this.savedLenses.slice(0, total);
  const capacityContributors = this.sources.capacity;
  const capacity = Math.min(4, sumContributors(capacityContributors));
  this.lensOwnership = {
   total, uncappedTotal, cap: RESEARCH_LENS_CAP,
   magnifyingGlasses: total - inputs.opticalMonocles - inputs.kaleidoscopes,
   opticalMonocles: inputs.opticalMonocles, kaleidoscopes: inputs.kaleidoscopes,
   capacityPerObservation: capacity, capacityContributors,
   unplacedLensCount: this.lenses.filter(lens => !lens.placed).length, contributors: ownership,
  };
  const additiveExpPercent = sumContributors(inputs.additiveExp);
  const expMultiplier = (1 + additiveExpPercent / 100)
   * inputs.expMultipliers.reduce((product, contributor) => product * contributor.value, 1);
  this.production = {
   expPerHour: 0, expBeforeSharedMultiplierPerHour: 0, expMultiplier, additiveExpPercent,
   additiveExpContributors: inputs.additiveExp,
   expMultiplierContributors: inputs.expMultipliers,
   insightAccrualPerHour: 0, gameDisplayedInsightPerHour: 0,
   insightDisplayDiscrepancy: "The game displays Insight per hour multiplied by Research EXP bonuses. Actual Insight accrual does not use that multiplier.",
   insightMultiplier: (1 + sumContributors(inputs.insight.filter(contributor => contributor.operation === "addPercent")) / 100)
    * inputs.insight.filter(contributor => contributor.operation === "multiply")
     .reduce((product, contributor) => product * contributor.value, 1),
   insightContributors: inputs.insight,
   kaleidoscopeBoostPercent: sumContributors(inputs.kaleidoscope),
   kaleidoscopeContributors: inputs.kaleidoscope,
   totalInsightExpBonusPercent: this.getBonusForId(94, 2),
   localInsightExpPerLevelContributor: inputs.localInsight,
  };
  this.observations.forEach(observation => {
   observation.update(level, this.discoveryAllowance, this.progress.eligibleObservationCount, this.lenses, this.savedLenses, this.production);
   if (observation.eligibleForProduction) {
    this.production.expBeforeSharedMultiplierPerHour += observation.expBeforeSharedMultiplierPerHour;
   }
   this.production.insightAccrualPerHour += observation.insightAccrualPerHour;
   this.production.gameDisplayedInsightPerHour += observation.gameDisplayedInsightPerHour;
  });
  this.production.expPerHour = this.production.expBeforeSharedMultiplierPerHour * this.production.expMultiplier;
  const offlineBonusPercent = sumContributors(inputs.offline);
  const unclampedPercent = 1 + offlineBonusPercent;
  const fraction = Math.max(0.01, Math.min(1, 0.01 + offlineBonusPercent / 100));
  this.offlineGains = {
   onlinePercent: 100, percent: 100 * fraction, fraction, unclampedPercent,
   baselinePercent: 1, floorPercent: 1, capPercent: 100,
   contributors: inputs.offline,
  };
  const shapeContributors = inputs.shapeOwnership;
  const uncappedCount = Math.round(sumContributors(shapeContributors));
  const count = Math.min(RESEARCH_SHAPE_CAP, uncappedCount);
  this.shapeOwnership = {
   count, uncappedCount, cap: RESEARCH_SHAPE_CAP,
   ownedShapes: this.shapes.slice(0, count).map(shape => ({ index: shape.index, name: shape.data.name })),
   contributors: shapeContributors, rotationUnlocked: level >= this.metadata.shapeRotationResearchLevel,
   rotationRequiredLevel: this.metadata.shapeRotationResearchLevel, rotationStepDegrees: this.metadata.shapeRotationStepDegrees,
  };
  const level60Reached = level >= this.postyNotes.find(note => note.index === 5)!.data.requiredResearchLevel;
  const purchasedGrid50Level = this.getBonusForId(50, 1);
  const pointsPerTenLevelBlock = Math.round(1 + (level60Reached ? 1 : 0) + purchasedGrid50Level);
  const reachedTenLevelBlocks = Math.floor(level / 10);
  this.pointMilestone = {
   reachedTenLevelBlocks, pointsPerTenLevelBlock, purchasedGrid50Level, level60Reached,
   cumulativeMilestonePoints: reachedTenLevelBlocks * pointsPerTenLevelBlock,
   explanation: "From Research level 60, each reached ten-level block gains one additional Grid Point. Purchased Grid levels also increase Points per block.",
  };
  this.papers = inputs.papers;
  this.postyNotes.forEach(note => note.update(level, this.lensOwnership, this.shapeOwnership, this.pointMilestone));
 }

 prepareGridDisplay(contributors: ResearchContributor[], linkedInputs: ResearchLinkedInputs): void {
  this.sources.pointMilestone.setInput(this.pointMilestone.cumulativeMilestonePoints);
  const earned = Math.floor(sumContributors(contributors));
  // Every purchased rank costs one Point. The game rounds each running addition.
  let spent = 0;
  for (const purchasedLevel of this.purchasedLevels) {
   spent = Math.round(spent + purchasedLevel);
  }
  spent = Math.round(spent);
  this.points = {
   earned, spent, available: Math.round(earned - spent), contributors, milestone: this.pointMilestone,
  };
  this.upgrades.forEach(upgrade => {
   upgrade.affordable = this.points.available > 0;
   upgrade.preparePresentation(this.bonuses, this.accumulatedFirstThreeUpgradeCostReduction, linkedInputs);
  });
  this.shapes.forEach(shape => shape.prepareCoverage(this.shapeOwnership, this.upgrades));
 }

 getPaperItem(): Item {
  return this.paperItem;
 }
}

/**
 * The game reveals a level-based Observation prefix after the first discovery.
 * The delivered formula caps this prefix at 43 Observations.
 */
const getRevealedObservationCount = (
 researchLevel: number,
 firstDiscoveryComplete: boolean,
): number => {
 if (researchLevel < 1) {
  return 0;
 }
 if (!firstDiscoveryComplete) {
  return 1;
 }

 return Math.min(
  RESEARCH_OBSERVATION_REVEAL_CAP,
  5 * Math.floor((researchLevel + 10) / 10) -
  Math.floor(researchLevel / 20) -
  Math.floor(researchLevel / 30) -
  Math.floor(researchLevel / 50),
 );
};

/** Preserve first-discovery semantics while using shared account Research level. */
const getOccurrencesToBeFound = (
 occurrenceFoundState: number[],
 researchLevel: number,
): number => getRevealedObservationCount(
 researchLevel,
 Number(occurrenceFoundState[0]) !== 0,
);

export const updateResearchGrid = (data: Map<string, any>) => {
 const researchGrid = data.get("research") as ResearchGrid;
 const companions = data.get("companions") as Companion[];
 const equinox = data.get("equinox") as Equinox;
 const sushi = data.get("sushi") as SushiStation;
 const gaming = data.get("gaming") as Gaming;
 const glimbo = data.get("glimbo") as Glimbo;

 for (const index of [67, 68, 107]) {
  (researchGrid.bonuses[index] as CrownCountResearchGridBonus).crownCount = gaming.reclaimedCrownCount;
 }
 (researchGrid.bonuses[168] as GlimboTradesResearchGridBonus).totalGlimboTrades = glimbo.totalTrades;
 researchGrid.updateCalculationState(companions, equinox, sushi);
 return researchGrid;
};

// These records supply both displayed contributors and the actual Research totals.
const researchContribution = (
 source: string, inputValue: number, operation: ResearchContributor["operation"],
 cap?: number, gate?: string,
): ResearchContributor => {
 const value = cap === undefined ? inputValue : Math.min(cap, inputValue);
 return { source, inputValue, value, operation, cap, gate };
};

const researchPercentMultiplier = (
 source: string, percent: number, gate?: string, reward?: ResearchContributorReward,
): ResearchContributor => {
 return {
  source, inputValue: percent, value: 1 + percent / 100, operation: "multiply", gate,
  reward: reward && { ...reward, value: 1 + reward.value / 100, operation: "multiply" },
 };
};

/** A declared source keeps its identity while account processing replaces its contribution. */
class ResearchSource implements ResearchContributor {
 inputValue: number;
 value: number;
 reward?: ResearchContributorReward;
 components?: ResearchContributor[];
 companionGroups?: ResearchCompanionGroup[];
 private readonly stateUpdates: Array<() => void> = [];

 constructor(
  public source: string,
  public operation: ResearchContributor["operation"],
  private readonly readInput?: () => number,
  public cap?: number,
  public gate?: string,
  private readonly percentMultiplier = false,
 ) {
  this.inputValue = operation === "multiply" && !percentMultiplier ? 1 : 0;
  this.value = operation === "multiply" ? 1 : 0;
 }

 setInput(input: number): void {
  this.inputValue = input;
  const capped = this.cap === undefined ? input : Math.min(this.cap, input);
  this.value = this.percentMultiplier ? 1 + capped / 100 : capped;
 }

 onUpdate(update: () => void): void {
  this.stateUpdates.push(update);
 }

 update(): void {
  if (this.readInput) this.setInput(this.readInput());
  for (const update of this.stateUpdates) update();
 }

 setRewardState(acquired: boolean, active = acquired): void {
  this.reward!.acquired = acquired;
  this.reward!.active = active;
 }
}

/**
 * Register sources from raw metadata during init. Callback readers access account state during calculate.
 */
class ResearchSourceCatalogue {
 private readonly records: ResearchSource[] = [];
 private data!: Map<string, any>;
 readonly inputs: ResearchDisplayInputs;
 readonly minimumRoll: ResearchSource[];
 readonly failedRoll: ResearchSource;
 readonly capacity: ResearchSource[];
 readonly points: ResearchSource[];
 readonly pointMilestone: ResearchSource;
 readonly linked: ResearchLinkedInputs;
 private readonly monocles: ResearchSource;
 private readonly kaleidoscopeSources: ResearchSource[];
 private readonly papersOffline: ResearchSource;

 constructor(
  private readonly research: ResearchGrid,
  private readonly repositories: StaticRepositories,
 ) {
  const farmingSticker = this.repositories.get("FarmingSticker").find(entry => entry.index === 1)!;
  const coralBonus = this.repositories.get("DancingCoralBonus").find(entry => entry.index === 4)!;
  const zenithBonus = this.repositories.get("ZenithMarket").find(entry => entry.index === 8)!;
  const researchSuperbit = this.repositories.get("GamingSuperbits").find(entry => entry.data.superbitId === 44)!;
  const slabSuperbit = this.repositories.get("GamingSuperbits").find(entry => entry.data.superbitId === 34)!;
  const shopUpgrade = this.repositories.get("SpelunkingUpgrade").find(entry => entry.index === 63)!;
  const prehistoricSet = this.repositories.get("EquipmentSets").find(entry => entry.data.name === "PREHISTORIC_SET")!;
  const cardNames = this.repositories.get("EnemyDetails");
  const shopExp = this.add(`Spelunking shop: ${shopUpgrade.data.name}`,
   () => this.get<Spelunking>("spelunking").getUpgradeBonus(63));
  shopExp.reward = this.reward(shopUpgrade.data.bonusPerLevel, "addPercent", "EXP", "per shop level");
  shopExp.onUpdate(() => shopExp.setRewardState(
   this.get<Spelunking>("spelunking").upgrades.find(entry => entry.index === 63)!.purchasedLevel > 0));
  const prehistoricExp = this.add("Equipment set: Prehistoric set",
   () => this.get<EquipmentSets>("equipmentSets").getSetBonus("PREHISTORIC_SET", true),
   "addPercent", 50, "Permanent activation or account-wide set activation");
  prehistoricExp.reward = this.reward(Math.min(50, prehistoricSet.data.bonusValue),
   "addPercent", "EXP", "when the set is unlocked");
  prehistoricExp.onUpdate(() => prehistoricExp.setRewardState(
   this.get<EquipmentSets>("equipmentSets").equipmentSets.find(entry => entry.data.name === "PREHISTORIC_SET")!.unlocked));
  const cardSource = (id: string, scale: number, cap: number) => {
   return this.add(`Owned card: ${cardNames.find(entry => entry.id === id)!.data.Name}`,
    () => scale * this.get<Card[]>("cards").find(entry => entry.id === id)!.getLevels(), "addPercent", cap);
  };
  const additiveExp = [
   this.add(`Farming sticker: ${farmingSticker.data.name}`, () => this.get<Farming>("farming").getStickerBonus(1)),
   this.add("Cooking meals: Research EXP", () => this.get<Cooking>("cooking").getMealBonusForKey("ResearchXP")),
   this.add(`Dancing Coral: ${coralBonus.data.name}`, () => this.get<DancingCoral>("dancingCoral").getBonusFromIndex(4)),
   this.add("Crop Scientist: Research EXP", () => this.get<Farming>("farming").cropScientist.getBonus(CropScientistBonusText.ResearchExp)),
   ...[50, 90, 110].map(index => this.grid(index)),
   this.grid(112, 2),
   this.add(`Zenith Market: ${zenithBonus.data.name}`, () => this.get<ZenithMarket>("zenithMarket").getBonusForId(8)),
   this.add(`Gaming: ${researchSuperbit.data.name}`, () => this.get<Worship>("worship").totalizer.getResearchExpBonus(),
    "addPercent", undefined, `Purchased ${researchSuperbit.data.name} Superbit and total Worship best waves`),
   this.add(`Sailing: ${slabSuperbit.data.name}`, () => this.get<Sailing>("sailing").getResearchExpSlabBonus(),
    "addPercent", undefined, `Purchased ${slabSuperbit.data.name} Superbit`),
   this.add("Spelunking epilogue: Research EXP", () => this.get<Spelunking>("spelunking").getResearchExpEpilogueBonus(
    this.get<Tome>("tome"), this.get<Grimoire>("grimoire"), this.get<EquipmentSets>("equipmentSets")),
    "addPercent", undefined, "Owned epilogue and account Tome and set inputs"),
   cardSource("w7b1", 1, 10), cardSource("w7b4", 2, 15),
   this.add(`Arcade: ${this.repositories.get("ArcadeBonus")[63].data.effect}`, () => this.get<Arcade>("arcade").bonuses[63].getBonus()),
   prehistoricExp,
   this.grid(94, 2), this.grid(31), this.grid(51),
   cardSource("w7a11", 1, 10), cardSource("w7b8", 3, 20),
   shopExp,
  ];

  const companion52 = this.companion(52, 1, "add");
  const companion153 = this.companion(153, 1, "add");
  const companion153LevelTwo = this.companionTwo(153, 1, "add");
  const companion54LevelTwo = this.companionTwo(54, 0.15, "add");
  const jellofishFactor = () => 1 + companion52.value;
  const riftStalkerFactor = () => 1 + companion153.value + companion153LevelTwo.value;
  const neonscaleFactor = () => 1 + companion54LevelTwo.value;
  const companionFactor = this.add("Companions",
   () => Math.max(1, jellofishFactor() * riftStalkerFactor() * neonscaleFactor()),
   "multiply", undefined, "Combined companion factor has a minimum of one.");
  companionFactor.components = [companion52, companion153, companion153LevelTwo, companion54LevelTwo];
  companionFactor.companionGroups = [
   this.companionGroup(companionFactor, "jellofish", 52, [companion52], jellofishFactor),
   this.companionGroup(companionFactor, "riftStalker", 153, [companion153, companion153LevelTwo], riftStalkerFactor),
   this.companionGroup(companionFactor, "neonscale", 54, [companion54LevelTwo], neonscaleFactor, 2),
  ];
  const fountain = this.repositories.get("FountainUpgrade").find(entry => entry.data.waterIndex === 2 && entry.data.index === 16)!;
  const fountainExp = this.add(`The Hole Fountain: ${fountain.data.name}`,
   () => this.get<Hole>("hole").fountain.getUpgrade(2, 16).getBonus());
  fountainExp.reward = this.reward(fountain.data.bonusPerLevel, "addPercent", "EXP", "per Fountain level before Marbleization");
  fountainExp.onUpdate(() => fountainExp.setRewardState(this.get<Hole>("hole").fountain.getUpgrade(2, 16).level > 0));
  const outpostExp = this.add("Royal Armory: Research Outpost",
   () => Math.max(1, this.get<RoyalArmory>("royalArmory").getResearchExpOutpostMultiplier()),
   "multiply", undefined, "Selected Research Outpost category");
  const outpostBasis = (count: number, available: boolean) =>
   `with Research EXP selected (${count} built Outposts)${available ? "" : "; requires the selector to be unlocked"}`;
  outpostExp.reward = this.reward(1, "multiply", "EXP", outpostBasis(0, false));
  outpostExp.onUpdate(() => {
   const state = this.get<RoyalArmory>("royalArmory").getResearchExpOutpostReward();
   outpostExp.reward!.value = state.multiplier;
   outpostExp.reward!.basis = outpostBasis(state.builtOutpostCount, state.available);
   outpostExp.setRewardState(state.available, state.selected);
  });
  const buttonBonus = this.repositories.get("ButtonBonus").find(entry => entry.index === 0)!;
  const expMultipliers = [
   this.asMultiplier(this.grid(70)),
   this.percent(`Equinox: ${this.repositories.get("DreamUpgrade").find(entry => entry.index === 12)!.data.name}`,
    () => this.get<Equinox>("equinox").getResearchExpBonus()),
   this.percent(`The Button: ${buttonBonus.data.name}`, () => this.get<Button>("button").getBonusForIndex(0)),
   this.percent("Killroy: Research EXP", () => this.get<KillRoy>("killroy").spelunkingExpMulti),
   companionFactor,
   this.asMultiplier(this.sushi(0)),
   this.percent("The Hole: Researchy", () => this.get<Hole>("hole").getResearchExpUpgradeBonus()),
   this.asMultiplier(fountainExp),
   ...[0, 23, 46, 54].map(index => this.asMultiplier(this.jelly(index))),
   this.add("Menagerie: Research EXP", () => this.get<Menagerie>("menagerie").getBonusMultiplier(3), "multiply"),
   outpostExp,
  ];

  const artifact = this.repositories.get("Artifact").find(entry => entry.index === 36)!;
  const offlineCardId = "w7b11";
  const gambit = this.repositories.get("GambitBonus").find(entry => entry.index === 15)!;
  const paperPurchase = this.repositories.get("GemShop").find(entry => entry.data.no === 45)!;
  const papersOffline = this.papersOffline = this.add(paperPurchase.data.name,
   () => 2 * this.get<GemStore>("gems").purchases.find(entry => entry.no === 45)!.pucrhased,
   "addPercent", undefined, "Two percentage points per permanent purchase");
  const gambitOffline = this.add(`The Hole Gambit: ${gambit.data.name}`,
   () => this.get<Hole>("hole").gambit.getBonus(15), "addPercent", undefined,
   `Requires score ${GambitBonus.getScoreThreshold(15)}`);
  const offline = [
   this.companion(28, 1, "addPercent", "AFK gains"), gambitOffline,
   this.minehead(1, "addPercent"), this.minehead(10, "addPercent"),
   this.grid(71, 0, "addPercent", "AFK gains"), this.grid(111, 0, "addPercent", "AFK gains"),
   this.add(`Sailing artifact: ${artifact.data.name}`,
    () => Math.round(this.get<Sailing>("sailing").artifacts.find(entry => entry.index === 36)!.status), "addPercent", 6),
   this.add(`Owned card: ${cardNames.find(entry => entry.id === offlineCardId)!.data.Name}`,
    () => this.get<Card[]>("cards").find(entry => entry.id === offlineCardId)!.getLevels(), "addPercent", 10),
   this.companion(153, 20, "addPercent", "AFK gains"), this.companionTwo(153, 10, "addPercent", "AFK gains"),
   papersOffline, this.sushi(4, "addPercent", "AFK gains"), this.sushi(24, "addPercent", "AFK gains"),
  ];
  this.monocles = this.grid(91, 1, "add", "Optical Monocles");
  this.kaleidoscopeSources = [this.grid(72, 1, "add", "Kaleidoscopes"), this.event(33)];
  const ownership = [
   this.base("Base Magnifying Glass", 1, "add"), this.monocles, ...this.kaleidoscopeSources,
   ...[2, 12, 20].map(index => this.minehead(index, "add")),
   this.event(34), this.companion(153, 1, "add", "Magnifying Glasses"), this.sushi(8, "add", "Magnifying Glasses"),
   ...LENS_POSTY_NOTE_INDEXES.map(index => this.note(index, "lens", true)),
  ];
  const maximumRoll = [
   this.base("Base maximum discovery roll", this.research.metadata.baseDiscoveryMaxRoll, "add"),
   this.grid(51, 1, "add", "maximum discovery roll"), this.sushi(30, "add", "maximum discovery roll"),
   this.jelly(12, "add", "maximum discovery roll"),
  ];
  const dailyAllocation = [
   this.base("Base daily discovery attempts", this.research.metadata.baseDiscoveryRollsPerDay, "add"),
   this.grid(90, 1, "add", "attempts/day"), this.event(35, 3), this.sushi(2, "add", "attempts/day"),
  ];
  const jade = this.repositories.get("JadeUpgrade").find(entry => entry.index === 46)!;
  const jadeOwned = () => Number(this.get<Sneaking>("sneaking").jadeUpgrades.find(entry => entry.index === 46)!.purchased);
  const insight = [
   this.grid(92, 0, "addPercent", "Insight"), this.grid(91, 0, "addPercent", "Insight"),
   this.percent(`Sneaking Emporium: ${jade.data.name}`, () => 35 * jadeOwned(), "Purchased Emporium upgrade"),
   this.asMultiplier(this.jelly(7, "addPercent", "Insight")),
  ];
  const kaleidoscope = [
   this.base("Base Kaleidoscope adjacent boost", this.research.metadata.baseKaleidoscopeAdjacentBoostPercent, "addPercent"),
   this.grid(52, 0, "addPercent", "Kaleidoscope effect"), this.grid(72, 0, "addPercent", "Kaleidoscope effect"),
   this.add(`Sneaking Emporium: ${jade.data.name}`, () => 6 * jadeOwned(), "addPercent", undefined, "Purchased Emporium upgrade"),
   this.jelly(25, "addPercent", "Kaleidoscope effect"),
  ];
  const shapeRequiredLevel = this.repositories.get("ResearchPostyNote").find(note => note.index === 1)!.data.requiredResearchLevel;
  const shapeLevelGate = () => Math.floor(this.research.progress.highestLevel / shapeRequiredLevel);
  const shapeCompanion = this.companion(54, shapeLevelGate, "add", "Shapes", 1);
  shapeCompanion.cap = 1;
  shapeCompanion.reward!.requiredResearchLevel = shapeRequiredLevel;
  shapeCompanion.gate += ". Requires Research level 20.";
  shapeCompanion.onUpdate(() => {
   shapeCompanion.value = Math.min(1, Math.max(0, shapeCompanion.inputValue));
   shapeCompanion.gate += ". Requires Research level 20.";
   shapeCompanion.reward!.active = shapeCompanion.reward!.active && this.research.progress.highestLevel >= shapeRequiredLevel;
  });
  const lore = this.repositories.get("SpelunkingTunnel").find(entry => entry.index === 7)!;
  const shapeOwnership = [
   this.event(36), shapeCompanion,
   this.add(`Spelunking Lore: ${lore.data.name}`,
    () => shapeLevelGate() * Number(this.get<Spelunking>("spelunking").tunnels.find(entry => entry.index === 7)!.loreCompleted),
    "add", 1, "Completed Lore and Research level 20"),
   ...SHAPE_POSTY_NOTE_INDEXES.map(index => this.note(index, "Shapes", true)),
  ];
  this.capacity = [
   this.base("Base lens capacity per Observation", 1, "add"),
   ...CAPACITY_POSTY_NOTE_INDEXES.map(index => this.note(index, "lens capacity per Observation")),
  ];
  this.failedRoll = this.base(this.research.bonuses.find(entry => entry.index === 31)!.data.name, 0, "add");
  this.failedRoll.cap = 0;
  this.failedRoll.gate = "Shared failed-roll counter. This counter is not attempts used today.";
  this.minimumRoll = [this.base("Base discovery roll", this.research.metadata.baseDiscoveryMinRoll, "add"), this.failedRoll];
  const pointMerit = this.repositories.get("TaskShopDesc").find(entry => entry.index === 51)!;
  const pointArtifact = this.repositories.get("Artifact").find(entry => entry.index === 37)!;
  this.pointMilestone = this.base("Posty Notes: Points every ten Research levels", 0, "add");
  this.points = [
   this.add("Research level", () => this.research.progress.highestLevel, "add"),
   this.companion(153, 10, "add", "Points"), this.companionTwo(153, 5, "add", "Points"),
   this.sushi(3, "add", "Points"), this.sushi(13, "add", "Points"),
   this.add(`Sailing artifact: ${pointArtifact.data.name}`,
    () => Math.round(this.get<Sailing>("sailing").artifacts.find(entry => entry.index === 37)!.status), "add", 10),
   this.add(`World 7 merit: ${pointMerit.data.descLine1}`, () => this.get<TaskBoard>("taskboard").merits[51]!.level, "add"),
   this.jelly(4, "add", "Points"), this.jelly(57, "add", "Points"), this.pointMilestone,
  ];
  const sigilLore = this.repositories.get("SpelunkingTunnel").find(entry => entry.index === 6)!;
  this.linked = {
   sigilLore: { index: sigilLore.index, name: sigilLore.data.name, completed: false },
   cookingMasteryUnlocked: false,
   undeadBattalion: { qualifyingBoatCount: 0, totalBoatCount: 0 },
  };
  this.inputs = {
   additiveExp, expMultipliers, offline, ownership, maximumRoll, dailyAllocation, insight, kaleidoscope, shapeOwnership,
   opticalMonocles: 0, kaleidoscopes: 0, localInsight: this.grid(93),
   papers: {
    consumable: {
     item: this.research.getPaperItem(), count: 0, grantHours: RESEARCH_PAPER_GRANT_HOURS,
     includesMineheadCurrency: true, explanation: RESEARCH_PAPER_EXPLANATION,
    },
    permanent: { purchasedCount: 0, offlinePercent: 0 },
   },
  };
 }

 private get<T>(key: string): T {
  return this.data.get(key) as T;
 }


 private add(source: string, read: () => number, operation: ResearchContributor["operation"] = "addPercent",
  cap?: number, gate?: string): ResearchSource {
  const entry = new ResearchSource(source, operation, read, cap, gate);
  this.records.push(entry);
  return entry;
 }

 private base(source: string, value: number, operation: ResearchContributor["operation"]): ResearchSource {
  const entry = new ResearchSource(source, operation);
  entry.setInput(value);
  return entry;
 }

 private percent(source: string, read: () => number, gate?: string): ResearchSource {
  const entry = new ResearchSource(source, "multiply", read, undefined, gate, true);
  this.records.push(entry);
  return entry;
 }

 private reward(value: number, operation: ResearchContributor["operation"], unit: string, basis?: string): ResearchContributorReward {
  return { value, operation, unit, basis, acquired: false, active: false };
 }

 private asMultiplier(source: ResearchSource): ResearchSource {
  const entry = this.percent(source.source, () => source.value, source.gate);
  if (source.reward) {
   entry.reward = { ...source.reward, value: 1 + source.reward.value / 100, operation: "multiply" };
   entry.onUpdate(() => {
    Object.assign(entry.reward!, source.reward);
    entry.reward!.value = 1 + source.reward!.value / 100;
    entry.reward!.operation = "multiply";
   });
  }
  return entry;
 }

 private grid(index: number, mode = 0, operation: ResearchContributor["operation"] = "addPercent", unit = "EXP"): ResearchSource {
  const bonus = this.research.bonuses.find(entry => entry.index === index)!;
  const entry = this.add(`Research Grid: ${bonus.data.name}`, () => this.research.getBonusForId(index, mode), operation);
  const conditionalBasis = mode === 2 && bonus instanceof ObservationLevelResearchGridBonus
   ? { count: 0, unit: "total Insight level" }
   : mode === 2 && bonus instanceof OccurrenceCountResearchGridBonus ? { count: 0, unit: "found Observation" } : undefined;
  const condition = conditionalBasis?.unit ?? (index === 93 ? "Observation Insight level" : undefined);
  entry.reward = this.reward(mode === 1 ? 1 : bonus.data.bonusPerLevel, operation, unit,
   `per Grid level${condition ? ` per ${condition}` : ""}`);
  entry.reward.grid = { level: 0, mode, conditionalBasis };
  entry.onUpdate(() => {
   const current = this.research.bonuses.find(value => value.index === index)!;
   if (conditionalBasis) {
    conditionalBasis.count = current instanceof ObservationLevelResearchGridBonus
     ? current.totalObservationLevels : (current as OccurrenceCountResearchGridBonus).totalOccurrencesFound;
   }
   const acquired = current.getLevel() > 0;
   entry.reward!.grid!.level = current.getLevel();
   entry.setRewardState(acquired, acquired && (conditionalBasis === undefined || conditionalBasis.count > 0));
  });
  return entry;
 }

 private sushi(index: number, operation: ResearchContributor["operation"] = "addPercent", unit = "EXP"): ResearchSource {
  const reward = this.repositories.get("Sushi").find(entry => entry.index === index)!;
  const entry = this.add(`Sushi: ${reward.data.name}`, () => this.get<SushiStation>("sushi").getBonusFromIndex(index),
   operation, undefined, "Discovered Sushi reward");
  entry.reward = this.reward(reward.data.unlockBonus, operation, unit, "unlock");
  entry.onUpdate(() => {
   const current = this.get<SushiStation>("sushi").sushi.find(value => value.index === index)!;
   entry.reward!.value = current.getBaseBonus();
   entry.setRewardState(current.unlocked);
  });
  return entry;
 }

 private jelly(index: number, operation: ResearchContributor["operation"] = "addPercent", unit = "EXP"): ResearchSource {
  const obstruction = this.repositories.get("JellyObstruction").find(entry => entry.index === index)!;
  const entry = this.add(`Jelly Operator: ${obstruction.data.name}`,
   () => this.get<JellyOperator>("jellyOperator").getObstructionBonus(index), operation, undefined, "Completed obstruction");
  entry.reward = this.reward(obstruction.data.bonusValue, operation, unit, "unlock");
  entry.onUpdate(() => {
   const current = this.get<JellyOperator>("jellyOperator").obstructions.find(value => value.index === index)!;
   entry.reward!.value = current.getBaseBonus();
   entry.setRewardState(current.completed);
  });
  return entry;
 }

 private minehead(index: number, operation: ResearchContributor["operation"]): ResearchSource {
  const opponent = this.repositories.get("MineheadOpponent").find(entry => entry.index === index)!;
  const entry = this.add(`Minehead: ${opponent.data.name}`, () => this.get<Minehead>("minehead").getBonusFromIndex(index),
   operation, undefined, "Defeated opponent reward");
  entry.reward = this.reward(opponent.data.bonusValue, operation, operation === "addPercent" ? "AFK gains" : "Magnifying Glasses", "unlock");
  entry.onUpdate(() => {
   const current = this.get<Minehead>("minehead").opponents.find(value => value.index === index)!;
   entry.reward!.value = current.getBaseBonus();
   entry.setRewardState(current.defeated);
  });
  return entry;
 }

 private event(index: number, scale = 1): ResearchSource {
  const bonus = this.repositories.get("EventShopBonus").find(entry => entry.index === index)!;
  const units: Record<number, string> = { 33: "Kaleidoscopes", 34: "Magnifying Glasses", 35: "attempts/day", 36: "Shapes" };
  const entry = this.add(`Event Shop: ${bonus.data.name}`,
   () => Number(this.get<EventShop>("eventShop").isBonusOwned(index)) * scale, "add", undefined, "Owned Event Shop bonus");
  entry.reward = this.reward(scale, "add", units[index], "unlock");
  entry.onUpdate(() => entry.setRewardState(this.get<EventShop>("eventShop").isBonusOwned(index)));
  return entry;
 }

 private companionState(reward: ResearchContributorReward, companion: Companion, requiredLevel: 1 | 2): void {
  reward.acquired = companion.owned && companion.level >= requiredLevel;
  reward.active = requiredLevel === 2 ? companion.owned && companion.level === 2 : companion.owned || companion.bonusTokenActive;
  reward.companion!.owned = companion.owned;
  reward.companion!.level = companion.level;
  reward.companion!.bonusTokenActive = companion.bonusTokenActive;
 }

 private companionMetadata(index: number) {
  const metadata = this.repositories.get("Companion").find(entry => entry.index === index)!;
  return {
   metadata,
   name: this.repositories.get("EnemyDetails").find(entry => entry.id === metadata.data.id)?.data.Name ?? "Unknown",
  };
 }

 private companion(index: number, scale: number | (() => number), operation: ResearchContributor["operation"],
  unit = "factor units", rewardScale = typeof scale === "number" ? scale : 1): ResearchSource {
  const companion = this.companionMetadata(index);
  const entry = this.add(`Companion: ${companion.name}`,
   () => (typeof scale === "number" ? scale : scale()) * getCompanionActiveBonus(this.get<Companion[]>("companions"), index),
   operation, undefined, "Owned companion's active bonus");
  entry.reward = this.reward(rewardScale * companion.metadata.data.bonus, operation, unit, "unlock");
  entry.reward.companion = { owned: false, level: 1, bonusTokenActive: false, requiredLevel: 1 };
  entry.onUpdate(() => {
   const current = this.get<Companion[]>("companions").find(value => value.id === index)!;
   entry.gate = current.bonusTokenActive ? "Active through a Pet Bonus Token" : "Owned companion's active bonus";
   entry.reward!.value = rewardScale * (current.level === 2 && !current.bonusTokenActive
    ? companion.metadata.data.bonus2! : companion.metadata.data.bonus);
   this.companionState(entry.reward!, current, 1);
  });
  return entry;
 }

 private companionTwo(index: number, scale: number, operation: ResearchContributor["operation"] = "addPercent", unit = "factor units"): ResearchSource {
  const companion = this.companionMetadata(index);
  const entry = this.add(`Companion: ${companion.name} level two`,
   () => scale * isCompanionLevelTwo(this.get<Companion[]>("companions"), index),
   operation, undefined, "Owned at level two. Pet Bonus Tokens do not grant level two.");
  entry.reward = this.reward(scale, operation, unit, "level two");
  entry.reward.companion = { owned: false, level: 1, bonusTokenActive: false, requiredLevel: 2 };
  entry.onUpdate(() => this.companionState(entry.reward!, this.get<Companion[]>("companions").find(value => value.id === index)!, 2));
  return entry;
 }

 private companionGroup(parent: ResearchSource, id: ResearchCompanionGroup["id"], index: number,
  components: ResearchSource[], factor: () => number, requiredLevel: 1 | 2 = 1): ResearchCompanionGroup {
  const companion = this.companionMetadata(index);
  const reward = this.reward(1, "multiply", "EXP", requiredLevel === 2 ? "level two" : "unlock");
  reward.companion = { owned: false, level: 1, bonusTokenActive: false, requiredLevel };
  const intrinsicFactor = (level: number) => {
   let total = 0;
   for (const component of components) {
    if (component.reward!.companion!.requiredLevel === 1 || requiredLevel === 2 || level === 2) total += component.reward!.value;
   }
   return 1 + total;
  };
  reward.value = intrinsicFactor(1);
  const group = { id, name: companion.name, components, factor: 1, reward };
  parent.onUpdate(() => {
   const current = this.get<Companion[]>("companions").find(entry => entry.id === index)!;
   group.factor = factor();
   reward.value = intrinsicFactor(current.level);
   this.companionState(reward, current, requiredLevel);
  });
  return group;
 }
 private note(index: number, unit: string, retainRewardInput = false): ResearchSource {
  const note = this.repositories.get("ResearchPostyNote").find(entry => entry.index === index)!;
  const reached = () => this.research.progress.highestLevel >= note.data.requiredResearchLevel;
  const entry = this.add(`Posty Note: Research level ${note.data.requiredResearchLevel}`, () => Number(reached()),
   "add", undefined, `Research level ${note.data.requiredResearchLevel}`);
  entry.reward = this.reward(1, "add", unit, "milestone");
  entry.reward.requiredResearchLevel = note.data.requiredResearchLevel;
  entry.onUpdate(() => {
   if (retainRewardInput) entry.inputValue = 1;
   entry.setRewardState(reached());
  });
  return entry;
 }

 prepare(): void {
  this.research.prepareDisplay(this.inputs);
  this.research.prepareGridDisplay(this.points, this.linked);
 }

 update(data: Map<string, any>): void {
  this.data = data;
  for (const source of this.records) source.update();
  this.inputs.opticalMonocles = Math.round(this.monocles.value);
  this.inputs.kaleidoscopes = Math.round(sumContributors(this.kaleidoscopeSources));
  this.inputs.papers.consumable.count = this.get<Storage>("storage").amountInStorage("Quest115");
  this.inputs.papers.permanent.purchasedCount = this.get<GemStore>("gems").purchases.find(entry => entry.no === 45)!.pucrhased;
  this.inputs.papers.permanent.offlinePercent = this.papersOffline.value;
  this.linked.sigilLore.completed = this.get<Spelunking>("spelunking").tunnels.find(entry => entry.index === 6)!.loreCompleted;
  this.linked.cookingMasteryUnlocked = this.get<Cooking>("cooking").isCookingMasteryUnlocked(this.get<Rift>("rift"), this.get<Companion[]>("companions"));
  Object.assign(this.linked.undeadBattalion, this.get<Sailing>("sailing").getUndeadBattalionQualification());
  this.prepare();
 }
}

/** Static metadata is bound during init; account callbacks refresh during calculate after producers settle. */
export const updateResearchDisplay = (data: Map<string, any>): ResearchGrid => {
 const research = data.get("research") as ResearchGrid;
 research.sources.update(data);
 return research;
};
