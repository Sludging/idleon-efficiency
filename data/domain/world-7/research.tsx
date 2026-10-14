import { Domain, RawData } from "../base/domain";
import { initResearchGridBonusRepo, ResearchGridBonusBase } from "../data/ResearchGridBonusRepo";
import { Item } from "../items";
import { Companion, getCompanionActiveBonus, getCompanionBonus, isCompanionLevelTwo } from "../companions";
import { Equinox } from "../world-3/equinox";
import { SushiStation } from "./sushi";
import { SkillsIndex } from "../SkillsIndex";
import { initResearchObservationRepo, ResearchObservationBase } from "../data/ResearchObservationRepo";
import { initResearchLensRepo, ResearchLensBase } from "../data/ResearchLensRepo";
import { initResearchMetadataRepo } from "../data/ResearchMetadataRepo";
import { initResearchPostyNoteRepo, ResearchPostyNoteBase } from "../data/ResearchPostyNoteRepo";
import { initResearchShapeRepo, ResearchShapeBase } from "../data/ResearchShapeRepo";
import { MapInfo } from "../maps";
import { MapDataBase } from "../data/MapDataRepo";
import { Player } from "../player";
import { Card } from "../cards";
import { Storage } from "../storage";
import { GemPurchase, GemStore } from "../gemPurchases";
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
  ) {}

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

  updateDerivedValues(): void {}

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
  researchSkillLevels: number[] = [];
  totalObservationLevels: number = 0;

  override updateDerivedValues(): void {
    const occurrencesToBeFound = getOccurrencesToBeFound(
      this.occurrenceFoundState,
      this.researchSkillLevels,
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
  researchSkillLevels: number[] = [];
  totalOccurrencesFound: number = 0;

  override updateDerivedValues(): void {
    const occurrencesToBeFound = getOccurrencesToBeFound(
      this.occurrenceFoundState,
      this.researchSkillLevels,
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
  characterID?: number;
  components?: ResearchContributor[];
  companionGroups?: ResearchCompanionGroup[];
  reward?: ResearchContributorReward;
}

export interface ResearchProgress {
  highestLevel: number;
  savedExpCopy: {
    characterID: number;
    characterName: string;
    level: number;
    currentXP: number;
    xpReq: number | undefined;
    provenance: string;
  } | undefined;
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
  consumable: { item: Item; count: number; grantHours: number; includesMineheadCurrency: true; explanation: string };
  permanent: { purchase: GemPurchase; purchasedCount: number; offlinePercent: number };
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

  constructor(public index: number, public data: ResearchShapeBase["data"]) {}

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
  ) {}

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

  constructor(public index: number, public data: ResearchPostyNoteBase["data"]) {}

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
  observations: Observation[] = [];
  lenses: ResearchLens[] = [];
  lensDefinitions: ResearchLensBase[] = [];
  postyNotes: PostyNote[] = [];
  metadata = initResearchMetadataRepo()[0].data;
  progress: ResearchProgress = {
    highestLevel: 0, savedExpCopy: undefined, saveGlobalTime: undefined,
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
  private researchSkillLevels: number[] = [];
  private allBonusMultiplier: number = 1;
  private accumulatedFirstThreeUpgradeCostReduction: number = 0;

  getRawKeys(): RawData[] {
    return [
      { key: "Research", perPlayer: false, default: [] },
      // Research level is stored in each character's Lv0 array at SkillsIndex.Research.
      { key: "Lv0_", perPlayer: true, default: [] },
      { key: "TimeAway", perPlayer: false, default: {} },
    ];
  }

  init(allItems: Item[], _charCount: number) {
    this.bonuses = ResearchGridBonus.fromBase(initResearchGridBonusRepo());
    this.upgrades = this.bonuses.filter(bonus => bonus.data.name !== "Name");
    this.purchasedLevels = [];
    this.accumulatedFirstThreeUpgradeCostReduction = 0;
    this.observations = Observation.fromBase(initResearchObservationRepo());
    this.lensDefinitions = initResearchLensRepo();
    this.postyNotes = PostyNote.fromBase(initResearchPostyNoteRepo());
    this.shapes = ResearchShape.fromBase(initResearchShapeRepo());
    this.paperItem = allItems.find(item => item.internalName === "Quest115")!;
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
    // The raw Lv0_i arrays are declared above; SkillsIndex keeps the skill slot explicit.
    const researchSkillLevels = getResearchSkillLevels(data);
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
    researchGrid.researchSkillLevels = researchSkillLevels;
    researchGrid.observations.forEach(observation => observation.parse(
      Number(occurrenceFoundState[observation.index] ?? 0),
      Number(research[3]?.[observation.index] ?? 0),
      Number(observationInsightLevels[observation.index] ?? 0),
    ));
    researchGrid.progress = {
      highestLevel: 0, savedExpCopy: undefined, saveGlobalTime: saveTime,
      eligibleObservationCount: 0, discoveries: 0, totalObservationLevels: 0,
    };
    const savedLenses = research[5] || [];
    const lensKinds: ResearchLensKind[] = ["magnifyingGlass", "opticalMonocle", "kaleidoscope"];
    researchGrid.lenses = [];
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
    observationLevelBonus.researchSkillLevels = researchSkillLevels;
    const occurrenceCountBonus = researchGrid.bonuses[112] as OccurrenceCountResearchGridBonus;
    occurrenceCountBonus.occurrenceFoundState = occurrenceFoundState;
    occurrenceCountBonus.researchSkillLevels = researchSkillLevels;
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
    this.progress.highestLevel = Math.max(...this.researchSkillLevels, 0);
    this.progress.eligibleObservationCount = getOccurrencesToBeFound(
      this.observations.map(observation => observation.found ? 1 : 0), this.researchSkillLevels,
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
  prepareDisplay(inputs: ResearchDisplayInputs, referencePlayer: Player | undefined): void {
    const level = this.progress.highestLevel;
    if (referencePlayer) {
      const skill = referencePlayer.skills.get(SkillsIndex.Research)!;
      this.progress.savedExpCopy = {
        characterID: referencePlayer.playerID, characterName: referencePlayer.playerName,
        level: skill.level, currentXP: skill.currentXP, xpReq: skill.xpReq,
        provenance: `Saved EXP copy from ${referencePlayer.playerName} at Research level ${skill.level}. This copy is not account-authoritative EXP.`,
      };
    } else {
      this.progress.savedExpCopy = undefined;
    }
    const smartEyeLevel = this.getBonusForId(31, 1);
    const failedRollBonusCap = this.getBonusForId(31, 2);
    const currentFailedRollBonus = Math.min(this.failedRollCount * smartEyeLevel, failedRollBonusCap);
    this.discoveryAllowance = {
      remainingAttempts: this.remainingAttempts,
      dailyAllocation: Math.round(sumContributors(inputs.dailyAllocation)),
      minimumRoll: Math.floor(this.metadata.baseDiscoveryMinRoll + currentFailedRollBonus),
      maximumRoll: Math.floor(sumContributors(inputs.maximumRoll)),
      inclusiveRollBounds: true,
      failedRollCount: this.failedRollCount, currentFailedRollBonus, failedRollBonusCap,
      minimumRollContributors: [
        { source: "Base discovery roll", value: this.metadata.baseDiscoveryMinRoll, inputValue: this.metadata.baseDiscoveryMinRoll, operation: "add" },
        { source: this.bonuses.find(bonus => bonus.index === 31)!.data.name, value: currentFailedRollBonus, inputValue: this.failedRollCount * smartEyeLevel, cap: failedRollBonusCap, operation: "add", gate: "Shared failed-roll counter. This counter is not attempts used today." },
      ],
      maximumRollContributors: inputs.maximumRoll,
      dailyAllocationContributors: inputs.dailyAllocation,
    };
    const reachedLensNotes = this.postyNotes.filter(note =>
      LENS_POSTY_NOTE_INDEXES.includes(note.index) && level >= note.data.requiredResearchLevel);
    const ownership = [...inputs.ownership, ...reachedLensNotes.map(note => ({
      source: `Posty Note: Research level ${note.data.requiredResearchLevel}`, value: 1, inputValue: 1, operation: "add" as const,
    }))];
    const uncappedTotal = Math.round(sumContributors(ownership));
    const total = Math.min(RESEARCH_LENS_CAP, uncappedTotal);
    this.lenses = this.savedLenses.slice(0, total);
    const capacityContributors = [
      researchContribution("Base lens capacity per Observation", 1, "add"),
      ...this.postyNotes.filter(note => CAPACITY_POSTY_NOTE_INDEXES.includes(note.index)).map(note => {
        const reached = level >= note.data.requiredResearchLevel;
        const contribution = researchContribution(`Posty Note: Research level ${note.data.requiredResearchLevel}`,
          reached ? 1 : 0, "add", undefined, `Research level ${note.data.requiredResearchLevel}`);
        contribution.reward = {
          value: 1, operation: "add", unit: "lens capacity per Observation", basis: "milestone",
          acquired: reached, active: reached, requiredResearchLevel: note.data.requiredResearchLevel,
        };
        return contribution;
      }),
    ];
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
      additiveExpContributors: inputs.additiveExp, expMultiplierContributors: inputs.expMultipliers,
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
      baselinePercent: 1, floorPercent: 1, capPercent: 100, contributors: inputs.offline,
    };
    const shapeContributors = [...inputs.shapeOwnership, ...this.postyNotes
      .filter(note => SHAPE_POSTY_NOTE_INDEXES.includes(note.index))
      .map(note => ({
        source: `Posty Note: Research level ${note.data.requiredResearchLevel}`,
        value: level >= note.data.requiredResearchLevel ? 1 : 0, inputValue: 1, operation: "add" as const,
        gate: `Research level ${note.data.requiredResearchLevel}`,
        reward: {
          value: 1, operation: "add" as const, unit: "Shapes", basis: "milestone",
          acquired: level >= note.data.requiredResearchLevel, active: level >= note.data.requiredResearchLevel,
          requiredResearchLevel: note.data.requiredResearchLevel,
        },
      }))];
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

  prepareGridDisplay(outsidePointContributors: ResearchContributor[], linkedInputs: ResearchLinkedInputs): void {
    const contributors = [
      researchContribution("Research level", this.progress.highestLevel, "add"),
      ...outsidePointContributors,
      researchContribution("Posty Notes: Points every ten Research levels", this.pointMilestone.cumulativeMilestonePoints, "add"),
    ];
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

/** Reads each character's Research level from the parsed per-player Lv0_i arrays. */
const getResearchSkillLevels = (data: Map<string, any>): number[] => {
  return [...data.entries()]
    .filter(([key, value]) => /^Lv0_\d+$/.test(key) && Array.isArray(value))
    .map(([, value]) => Number(value[SkillsIndex.Research]) || 0);
};

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

/** Keep the highest-character-level and raw first-discovery adapter semantics. */
const getOccurrencesToBeFound = (
  occurrenceFoundState: number[],
  researchSkillLevels: number[],
): number => getRevealedObservationCount(
  Math.max(...researchSkillLevels, 0),
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
  cap?: number, gate?: string, characterID?: number,
): ResearchContributor => {
  const value = cap === undefined ? inputValue : Math.min(cap, inputValue);
  return { source, inputValue, value, operation, cap, gate, characterID };
};

const researchPercentMultiplier = (
  source: string, percent: number, gate?: string, reward?: ResearchContributorReward,
): ResearchContributor => {
  return {
    source, inputValue: percent, value: 1 + percent / 100, operation: "multiply", gate,
    reward: reward && { ...reward, value: 1 + reward.value / 100, operation: "multiply" },
  };
};

/** Prepare Research presentation after all producers, including late Royal Armory inputs. */
export const updateResearchDisplay = (data: Map<string, any>): ResearchGrid => {
  const research = data.get("research") as ResearchGrid;
  const players = data.get("players") as Player[];
  const companions = data.get("companions") as Companion[];
  const farming = data.get("farming") as Farming;
  const cooking = data.get("cooking") as Cooking;
  const coral = data.get("dancingCoral") as DancingCoral;
  const zenith = data.get("zenithMarket") as ZenithMarket;
  const gaming = data.get("gaming") as Gaming;
  const worship = data.get("worship") as Worship;
  const sailing = data.get("sailing") as Sailing;
  const spelunking = data.get("spelunking") as Spelunking;
  const tome = data.get("tome") as Tome;
  const grimoire = data.get("grimoire") as Grimoire;
  const cards = data.get("cards") as Card[];
  const arcade = data.get("arcade") as Arcade;
  const sets = data.get("equipmentSets") as EquipmentSets;
  const equinox = data.get("equinox") as Equinox;
  const button = data.get("button") as Button;
  const killroy = data.get("killroy") as KillRoy;
  const sushi = data.get("sushi") as SushiStation;
  const hole = data.get("hole") as Hole;
  const jelly = data.get("jellyOperator") as JellyOperator;
  const minehead = data.get("minehead") as Minehead;
  const sneaking = data.get("sneaking") as Sneaking;
  const events = data.get("eventShop") as EventShop;
  const armory = data.get("royalArmory") as RoyalArmory;
  const gems = data.get("gems") as GemStore;
  const storage = data.get("storage") as Storage;

  // This selects a saved display context, not a best production rate or authoritative account EXP.
  let referencePlayer: Player | undefined;
  for (const player of players) {
    const skill = player.skills.get(SkillsIndex.Research)!;
    if (skill.level === research.progress.highestLevel
      && (!referencePlayer || player.playerID < referencePlayer.playerID)) {
      referencePlayer = player;
    }
  }
  const gridContribution = (
    index: number, mode: number = 0,
    operation: ResearchContributor["operation"] = "addPercent", unit: string = "EXP",
  ): ResearchContributor => {
    const bonus = research.bonuses.find(bonus => bonus.index === index)!;
    const contribution = researchContribution(`Research Grid: ${bonus.data.name}`, research.getBonusForId(index, mode), operation);
    let conditionalBasis: { count: number; unit: string } | undefined;
    if (mode === 2 && bonus instanceof ObservationLevelResearchGridBonus) {
      conditionalBasis = { count: bonus.totalObservationLevels, unit: "total Insight level" };
    } else if (mode === 2 && bonus instanceof OccurrenceCountResearchGridBonus) {
      conditionalBasis = { count: bonus.totalOccurrencesFound, unit: "found Observation" };
    }
    const condition = conditionalBasis?.unit ?? (index === 93 ? "Observation Insight level" : undefined);
    const acquired = bonus.getLevel() > 0;
    contribution.reward = {
      value: mode === 1 ? 1 : bonus.data.bonusPerLevel, operation, unit,
      basis: `per Grid level${condition ? ` per ${condition}` : ""}`,
      acquired, active: acquired && (conditionalBasis === undefined || conditionalBasis.count > 0),
      grid: { level: bonus.getLevel(), mode, conditionalBasis },
    };
    return contribution;
  };
  const sushiContribution = (
    index: number, operation: ResearchContributor["operation"] = "addPercent", unit: string = "EXP",
  ): ResearchContributor => {
    const sushiReward = sushi.sushi.find(reward => reward.index === index)!;
    const contribution = researchContribution(`Sushi: ${sushiReward.data.name}`, sushi.getBonusFromIndex(index), operation, undefined, "Discovered Sushi reward");
    contribution.reward = {
      value: sushiReward.getBaseBonus(), operation, unit, basis: "unlock",
      acquired: sushiReward.unlocked, active: sushiReward.unlocked,
    };
    return contribution;
  };
  const jellyContribution = (
    index: number, operation: ResearchContributor["operation"] = "addPercent", unit: string = "EXP",
  ): ResearchContributor => {
    const obstruction = jelly.obstructions.find(obstruction => obstruction.index === index)!;
    const contribution = researchContribution(`Jelly Operator: ${obstruction.data.name}`, jelly.getObstructionBonus(index), operation, undefined, "Completed obstruction");
    contribution.reward = {
      value: jelly.getObstructionBonus(index, true), operation, unit, basis: "unlock",
      acquired: obstruction.completed, active: obstruction.completed,
    };
    return contribution;
  };
  const mineheadContribution = (index: number, operation: ResearchContributor["operation"]): ResearchContributor => {
    const opponent = minehead.opponents.find(opponent => opponent.index === index)!;
    const contribution = researchContribution(`Minehead: ${opponent.data.name}`, minehead.getBonusFromIndex(index), operation, undefined, "Defeated opponent reward");
    contribution.reward = {
      value: opponent.getBaseBonus(), operation, unit: operation === "addPercent" ? "AFK gains" : "Magnifying Glasses",
      basis: "unlock", acquired: opponent.defeated, active: opponent.defeated,
    };
    return contribution;
  };
  const eventContribution = (index: number, scale: number = 1): ResearchContributor => {
    const bonus = events.bonuses.find(bonus => bonus.index === index)!;
    const owned = events.isBonusOwned(index);
    const contribution = researchContribution(`Event Shop: ${bonus.data.name}`, Number(owned) * scale, "add", undefined, "Owned Event Shop bonus");
    const units: Record<number, string> = {
      33: "Kaleidoscopes", 34: "Magnifying Glasses", 35: "attempts/day", 36: "Shapes",
    };
    contribution.reward = { value: scale, operation: "add", unit: units[index], basis: "unlock", acquired: owned, active: owned };
    return contribution;
  };
  const activeCompanionBonuses = new Map([28, 52, 54, 153].map(index =>
    [index, getCompanionActiveBonus(companions, index)] as const));
  const levelTwoCompanionBonuses = new Map([54, 153].map(index =>
    [index, isCompanionLevelTwo(companions, index)] as const));
  const companionReward = (
    companion: Companion, value: number, operation: ResearchContributor["operation"],
    unit: string, requiredLevel: 1 | 2,
  ): ResearchContributorReward => ({
    value, operation, unit, basis: requiredLevel === 2 ? "level two" : "unlock",
    acquired: companion.owned && companion.level >= requiredLevel,
    active: requiredLevel === 2 ? companion.owned && companion.level === 2
      : companion.owned || companion.bonusTokenActive,
    companion: {
      owned: companion.owned, level: companion.level,
      bonusTokenActive: companion.bonusTokenActive, requiredLevel,
    },
  });
  const companionContribution = (
    index: number, scale: number, operation: ResearchContributor["operation"],
    unit: string = "factor units", rewardScale: number = scale,
  ): ResearchContributor => {
    const companion = companions.find(companion => companion.id === index)!;
    const gate = companion.bonusTokenActive ? "Active through a Pet Bonus Token" : "Owned companion's active bonus";
    const contribution = researchContribution(`Companion: ${companion.name}`, scale * activeCompanionBonuses.get(index)!, operation, undefined, gate);
    const metadataBonus = companion.level === 2 && !companion.bonusTokenActive
      ? companion.data.bonus2! : companion.data.bonus;
    contribution.reward = companionReward(companion, rewardScale * metadataBonus, operation, unit, 1);
    return contribution;
  };
  const companionLevelTwoContribution = (
    index: number, scale: number, operation: ResearchContributor["operation"] = "addPercent", unit: string = "factor units",
  ): ResearchContributor => {
    const companion = companions.find(companion => companion.id === index)!;
    const contribution = researchContribution(`Companion: ${companion.name} level two`, scale * levelTwoCompanionBonuses.get(index)!, operation, undefined, "Owned at level two. Pet Bonus Tokens do not grant level two.");
    contribution.reward = companionReward(companion, scale, operation, unit, 2);
    return contribution;
  };
  const sticker = farming.stickers.find(sticker => sticker.index === 1)!;
  const coralBonus = coral.bonuses.find(bonus => bonus.index === 4)!;
  const zenithBonus = zenith.bonuses.find(bonus => bonus.index === 8)!;
  const researchSuperbit = gaming.superbits.find(superbit => superbit.superbitId === 44)!;
  const slabSuperbit = gaming.superbits.find(superbit => superbit.superbitId === 34)!;
  const shopUpgrade = spelunking.upgrades.find(upgrade => upgrade.index === 63)!;
  const shopExp = researchContribution(`Spelunking shop: ${shopUpgrade.data.name}`, spelunking.getUpgradeBonus(63), "addPercent");
  shopExp.reward = {
    value: shopUpgrade.data.bonusPerLevel, operation: "addPercent", unit: "EXP", basis: "per shop level",
    acquired: shopUpgrade.purchasedLevel > 0, active: shopUpgrade.purchasedLevel > 0,
  };
  const prehistoricSet = sets.equipmentSets.find(set => set.data.name === "PREHISTORIC_SET")!;
  const prehistoricExp = researchContribution("Equipment set: Prehistoric set", sets.getSetBonus("PREHISTORIC_SET", referencePlayer, true), "addPercent", 50, "Permanent activation or reference character's equipped set", referencePlayer?.playerID);
  prehistoricExp.reward = {
    // Research caps this set's raw EXP reward at 50%.
    value: Math.min(prehistoricExp.cap!, prehistoricSet.getBonus(true)), operation: "addPercent", unit: "EXP",
    basis: "when active or equipped",
    acquired: prehistoricSet.unlocked, active: prehistoricSet.isActiveFor(referencePlayer),
  };
  const additiveExp = [
    researchContribution(`Farming sticker: ${sticker.name}`, farming.getStickerBonus(1), "addPercent"),
    researchContribution("Cooking meals: Research EXP", cooking.getMealBonusForKey("ResearchXP"), "addPercent"),
    researchContribution(`Dancing Coral: ${coralBonus.data.name}`, coral.getBonusFromIndex(4), "addPercent"),
    researchContribution("Crop Scientist: Research EXP", farming.cropScientist.getBonus(CropScientistBonusText.ResearchExp), "addPercent"),
    ...[50, 90, 110].map(index => gridContribution(index)),
    gridContribution(112, 2),
    researchContribution(`Zenith Market: ${zenithBonus.data.name}`, zenith.getBonusForId(8), "addPercent"),
    researchContribution(`Gaming: ${researchSuperbit.name}`, worship.totalizer.getResearchExpBonus(), "addPercent", undefined, `Purchased ${researchSuperbit.name} Superbit and total Worship best waves`),
    researchContribution(`Sailing: ${slabSuperbit.name}`, sailing.getResearchExpSlabBonus(), "addPercent", undefined, `Purchased ${slabSuperbit.name} Superbit`),
    researchContribution("Spelunking epilogue: Research EXP", referencePlayer ? spelunking.getResearchExpEpilogueBonus(referencePlayer, tome, grimoire, sets) : 0, "addPercent", undefined, "Owned epilogue and reference character's Tome and set inputs", referencePlayer?.playerID),
    ...[{ id: "w7b1", scale: 1, cap: 10 }, { id: "w7b4", scale: 2, cap: 15 }].map(({ id, scale, cap }) => {
      const card = cards.find(card => card.id === id)!;
      return researchContribution(`Owned card: ${card.displayName}`, scale * card.getLevels(), "addPercent", cap);
    }),
    researchContribution(`Arcade: ${arcade.bonuses[63].effect}`, arcade.bonuses[63].getBonus(), "addPercent"),
    prehistoricExp,
    gridContribution(94, 2), gridContribution(31), gridContribution(51),
    ...[{ id: "w7a11", scale: 1, cap: 10 }, { id: "w7b8", scale: 3, cap: 20 }].map(({ id, scale, cap }) => {
      const card = cards.find(card => card.id === id)!;
      return researchContribution(`Owned card: ${card.displayName}`, scale * card.getLevels(), "addPercent", cap);
    }),
    shopExp,
  ];
  const companion52 = companionContribution(52, 1, "add");
  const companion153 = companionContribution(153, 1, "add");
  const companion153LevelTwo = companionLevelTwoContribution(153, 1, "add");
  const companion54LevelTwo = companionLevelTwoContribution(54, 0.15, "add");
  const jellofishFactor = 1 + companion52.value;
  const riftStalkerFactor = 1 + companion153.value + companion153LevelTwo.value;
  const neonscaleFactor = 1 + companion54LevelTwo.value;
  const companionFactor = Math.max(1, jellofishFactor * riftStalkerFactor * neonscaleFactor);
  const companionGroup = (
    id: ResearchCompanionGroup["id"], index: number, components: ResearchContributor[],
    factor: number, requiredLevel: 1 | 2 = 1,
  ): ResearchCompanionGroup => {
    const companion = companions.find(companion => companion.id === index)!;
    const intrinsicTerms = components.filter(component =>
      component.reward!.companion!.requiredLevel === 1 || requiredLevel === 2 || companion.level === 2);
    const intrinsicFactor = 1 + intrinsicTerms.reduce((sum, component) => sum + component.reward!.value, 0);
    return {
      id, name: companion.name, components, factor,
      reward: companionReward(companion, intrinsicFactor, "multiply", "EXP", requiredLevel),
    };
  };
  const fountain = hole.fountain.upgrades.find(upgrade => upgrade.data.waterIndex === 2 && upgrade.data.index === 16)!;
  const buttonBonus = button.bonuses.find(bonus => bonus.index === 0)!;
  const sushiExp = sushiContribution(0);
  const gridExp = gridContribution(70);
  const outpostReward = armory.getResearchExpOutpostReward();
  const outpostExp = researchContribution("Royal Armory: Research Outpost", Math.max(1, armory.getResearchExpOutpostMultiplier()), "multiply", undefined, "Selected Research Outpost category");
  outpostExp.reward = {
    value: outpostReward.multiplier, operation: "multiply", unit: "EXP",
    basis: `with Research EXP selected (${outpostReward.builtOutpostCount} built Outposts)${outpostReward.available ? "" : "; requires the selector to be unlocked"}`,
    acquired: outpostReward.available, active: outpostReward.selected,
  };
  const expMultipliers = [
    researchPercentMultiplier(gridExp.source, research.getBonusForId(70), gridExp.gate, gridExp.reward),
    researchPercentMultiplier(`Equinox: ${equinox.upgrades.find(upgrade => upgrade.index === 12)!.data.name}`, equinox.getResearchExpBonus()),
    researchPercentMultiplier(`The Button: ${buttonBonus.data.name}`, button.getBonusForIndex(0)),
    researchPercentMultiplier("Killroy: Research EXP", killroy.spelunkingExpMulti),
    { source: "Companions", inputValue: companionFactor, value: companionFactor, operation: "multiply" as const,
      gate: "Combined companion factor has a minimum of one.", components: [companion52, companion153, companion153LevelTwo, companion54LevelTwo],
      companionGroups: [
        companionGroup("jellofish", 52, [companion52], jellofishFactor),
        companionGroup("riftStalker", 153, [companion153, companion153LevelTwo], riftStalkerFactor),
        companionGroup("neonscale", 54, [companion54LevelTwo], neonscaleFactor, 2),
      ] },
    researchPercentMultiplier(sushiExp.source, sushiExp.value, sushiExp.gate, sushiExp.reward),
    researchPercentMultiplier("The Hole: Researchy", hole.getResearchExpUpgradeBonus()),
    researchPercentMultiplier(`The Hole Fountain: ${fountain.data.name}`, hole.fountain.getBonus(2, 16), undefined, {
      value: fountain.data.bonusPerLevel, operation: "addPercent", unit: "EXP", basis: "per Fountain level before Marbleization",
      acquired: fountain.level > 0, active: fountain.level > 0,
    }),
    ...[0, 23, 46, 54].map(index => {
      const contribution = jellyContribution(index);
      return researchPercentMultiplier(contribution.source, contribution.value, contribution.gate, contribution.reward);
    }),
    outpostExp,
  ];
  const purchase = gems.purchases.find(purchase => purchase.no === 45)!;
  const artifact = sailing.artifacts.find(artifact => artifact.index === 36)!;
  const offlineCard = cards.find(card => card.id === "w7b11")!;
  const gambit = hole.gambit.bonuses.find(bonus => bonus.index === 15)!;
  const offline = [
    companionContribution(28, 1, "addPercent", "AFK gains"),
    researchContribution(`The Hole Gambit: ${gambit.data.name}`, referencePlayer ? hole.gambit.getBonus(15, referencePlayer) : 0, "addPercent", undefined,
      `Requires score ${gambit.getScoreThreshold()} and a non-Tutorial scene for the reference character`, referencePlayer?.playerID),
    mineheadContribution(1, "addPercent"), mineheadContribution(10, "addPercent"),
    gridContribution(71, 0, "addPercent", "AFK gains"), gridContribution(111, 0, "addPercent", "AFK gains"),
    researchContribution(`Sailing artifact: ${artifact.data.name}`, Math.round(artifact.status), "addPercent", 6),
    researchContribution(`Owned card: ${offlineCard.displayName}`, offlineCard.getLevels(), "addPercent", 10),
    companionContribution(153, 20, "addPercent", "AFK gains"), companionLevelTwoContribution(153, 10, "addPercent", "AFK gains"),
    researchContribution(purchase.name, 2 * purchase.pucrhased, "addPercent", undefined, "Two percentage points per permanent purchase"),
    sushiContribution(4, "addPercent", "AFK gains"), sushiContribution(24, "addPercent", "AFK gains"),
  ];
  const opticalMonocles = Math.round(research.getBonusForId(91, 1));
  const kaleidoscopeSources = [gridContribution(72, 1, "add", "Kaleidoscopes"), eventContribution(33)];
  const kaleidoscopes = Math.round(sumContributors(kaleidoscopeSources));
  const ownership = [
    researchContribution("Base Magnifying Glass", 1, "add"),
    gridContribution(91, 1, "add", "Optical Monocles"), ...kaleidoscopeSources,
    ...[2, 12, 20].map(index => mineheadContribution(index, "add")),
    eventContribution(34), companionContribution(153, 1, "add", "Magnifying Glasses"), sushiContribution(8, "add", "Magnifying Glasses"),
  ];
  const maximumRoll = [
    researchContribution("Base maximum discovery roll", research.metadata.baseDiscoveryMaxRoll, "add"),
    gridContribution(51, 1, "add", "maximum discovery roll"), sushiContribution(30, "add", "maximum discovery roll"),
    jellyContribution(12, "add", "maximum discovery roll"),
  ];
  const dailyAllocation = [
    researchContribution("Base daily discovery attempts", research.metadata.baseDiscoveryRollsPerDay, "add"),
    gridContribution(90, 1, "add", "attempts/day"), eventContribution(35, 3), sushiContribution(2, "add", "attempts/day"),
  ];
  const jade = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 46)!;
  const jadeOwned = Number(jade.purchased);
  const jellyInsight = jellyContribution(7, "addPercent", "Insight");
  const insight = [
    gridContribution(92, 0, "addPercent", "Insight"), gridContribution(91, 0, "addPercent", "Insight"),
    researchPercentMultiplier(`Sneaking Emporium: ${jade.data.name}`, 35 * jadeOwned, "Purchased Emporium upgrade"),
    researchPercentMultiplier(jellyInsight.source, jellyInsight.value, jellyInsight.gate, jellyInsight.reward),
  ];
  const kaleidoscope = [
    researchContribution("Base Kaleidoscope adjacent boost", research.metadata.baseKaleidoscopeAdjacentBoostPercent, "addPercent"),
    gridContribution(52, 0, "addPercent", "Kaleidoscope effect"), gridContribution(72, 0, "addPercent", "Kaleidoscope effect"),
    researchContribution(`Sneaking Emporium: ${jade.data.name}`, 6 * jadeOwned, "addPercent", undefined, "Purchased Emporium upgrade"),
    jellyContribution(25, "addPercent", "Kaleidoscope effect"),
  ];
  const shapeLevelGate = Math.floor(research.progress.highestLevel / research.postyNotes.find(note => note.index === 1)!.data.requiredResearchLevel);
  const shapeCompanion = companionContribution(54, shapeLevelGate, "add", "Shapes", 1);
  shapeCompanion.value = Math.min(1, Math.max(0, shapeCompanion.inputValue));
  shapeCompanion.cap = 1;
  shapeCompanion.gate += ". Requires Research level 20.";
  const shapeRequiredLevel = research.postyNotes.find(note => note.index === 1)!.data.requiredResearchLevel;
  shapeCompanion.reward!.requiredResearchLevel = shapeRequiredLevel;
  shapeCompanion.reward!.active = shapeCompanion.reward!.active && research.progress.highestLevel >= shapeRequiredLevel;
  const lore = spelunking.tunnels.find(tunnel => tunnel.index === 7)!;
  const shapeOwnership = [
    eventContribution(36), shapeCompanion,
    researchContribution(`Spelunking Lore: ${lore.data.name}`, shapeLevelGate * Number(lore.loreCompleted), "add", 1, "Completed Lore and Research level 20"),
  ];
  const papers: ResearchPapers = {
    consumable: {
      item: research.getPaperItem(), count: storage.amountInStorage("Quest115"), grantHours: 2,
      includesMineheadCurrency: true,
      explanation: "Each Half Finished Research Paper grants two hours of progress, including Minehead Currency. Pending progress is not applied to this saved view.",
    },
    permanent: { purchase, purchasedCount: purchase.pucrhased, offlinePercent: offline.find(contributor => contributor.source === purchase.name)!.value },
  };
  research.prepareDisplay({
    additiveExp, expMultipliers, offline, ownership, opticalMonocles, kaleidoscopes,
    maximumRoll, dailyAllocation, insight, kaleidoscope, shapeOwnership, papers, localInsight: gridContribution(93),
  }, referencePlayer);
  const taskboard = data.get("taskboard") as TaskBoard;
  const rift = data.get("rift") as Rift;
  const pointMerit = taskboard.merits.find(merit => merit.index === 51)!;
  const pointArtifact = sailing.artifacts.find(artifact => artifact.index === 37)!;
  const sigilLore = spelunking.tunnels.find(tunnel => tunnel.index === 6)!;
  research.prepareGridDisplay([
    companionContribution(153, 10, "add", "Points"),
    companionLevelTwoContribution(153, 5, "add", "Points"),
    sushiContribution(3, "add", "Points"), sushiContribution(13, "add", "Points"),
    researchContribution(`Sailing artifact: ${pointArtifact.data.name}`, Math.round(pointArtifact.status), "add", 10),
    researchContribution(`World 7 merit: ${pointMerit.descLine1}`, pointMerit.level, "add"),
    jellyContribution(4, "add", "Points"), jellyContribution(57, "add", "Points"),
  ], {
    sigilLore: { index: sigilLore.index, name: sigilLore.data.name, completed: sigilLore.loreCompleted },
    cookingMasteryUnlocked: cooking.isCookingMasteryUnlocked(rift, companions),
    undeadBattalion: sailing.getUndeadBattalionQualification(),
  });
  return research;
};
