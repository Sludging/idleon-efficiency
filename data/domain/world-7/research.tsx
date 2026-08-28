import { Domain, RawData } from "../base/domain";
import { initResearchGridBonusRepo, ResearchGridBonusBase } from "../data/ResearchGridBonusRepo";
import { Item } from "../items";
import { Companion, getCompanionBonus } from "../companions";
import { Equinox, getCloudBonus } from "../world-3/equinox";
import { SushiStation } from "./sushi";
import { SkillsIndex } from "../SkillsIndex";

const RESEARCH_GRID_ALL_MULTI_CHALLENGES = [71, 72, 76];
const RESEARCH_GRID_ALL_MULTI_COMPANION = 55;
const DOOT_COMPANION = 0;
const DOOT_RESEARCH_INDEX = 173;
const RESEARCH_GRID_ALL_MULTI_SUSHI = 53;

// Research[1] stores the shape index covering each grid square. -1 means no shape.
// These are the shape multipliers from CustomLists.Research[5].
const RESEARCH_GRID_SHAPE_BONUS_PERCENTAGES = [25, 15, 50, 20, 20, 35, 25, 30, 35, 60];

type ResearchGridBonusData = ResearchGridBonusBase["data"];

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

 constructor(public index: number, public data: ResearchGridBonusData) { }

 protected getLevelValue(): number {
  return this.level;
 }

 getLevel(): number {
  return Math.round(this.level);
 }

 /**
  * Game formula: base square bonus × level × shape multiplier ×
  * Grid_Bonus_Allmulti, with each multiplier clamped to at least 1.
  */
 getBonus(): number {
  return this.data.bonusPerLevel
   * this.level
   * (1 + this.shapeBonusPercent / 100)
   * Math.max(1, this.allBonusMultiplier);
 }

 getBonusMode2(): number {
  return this.getBonus();
 }

 getGridBonusAllmultiContribution(): number {
  return 0;
 }

 updateDerivedValues(): void { }

 static fromBase(data: ResearchGridBonusBase[]): ResearchGridBonus[] {
  return data.map(bonus => {
   switch (bonus.index) {
    case 31: return new SmartEyeResearchGridBonus(bonus.index, bonus.data);
    case 67:
    case 68:
    case 107: return new CrownCountResearchGridBonus(bonus.index, bonus.data);
    case 94: return new ObservationLevelResearchGridBonus(bonus.index, bonus.data);
    case 112: return new OccurrenceCountResearchGridBonus(bonus.index, bonus.data);
    case 151: return new AccountOptionResearchGridBonus(bonus.index, bonus.data);
    case 168: return new GlimboTradesResearchGridBonus(bonus.index, bonus.data);
    case 173: return new DivineDesignResearchGridBonus(bonus.index, bonus.data);
    default: return new ResearchGridBonus(bonus.index, bonus.data);
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
  const occurrencesToBeFound = getOccurrencesToBeFound(this.occurrenceFoundState, this.researchSkillLevels);
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
  const occurrencesToBeFound = getOccurrencesToBeFound(this.occurrenceFoundState, this.researchSkillLevels);
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
 glimboTradeCounts: number[] = [];
 totalGlimboTrades: number = 0;

 override updateDerivedValues(): void {
  this.totalGlimboTrades = this.glimboTradeCounts
   .reduce((sum, value) => sum + (Number(value) || 0), 0);
 }

 override getBonusMode2(): number {
  return this.getBonus() * Math.floor(this.totalGlimboTrades / 100);
 }
}

/**
 * Divine Design is normally a drop-rate square, but its saved level also
 * contributes up to +5% to Grid_Bonus_Allmulti when King Doot is owned.
 */
export class DivineDesignResearchGridBonus extends ResearchGridBonus {
 dootBonus: number = 0;

 override getGridBonusAllmultiContribution(): number {
  return 5 * Math.min(1, this.getLevelValue() * this.dootBonus);
 }
}

export class ResearchGrid extends Domain {
 bonuses: ResearchGridBonus[] = [];
 private allBonusMultiplier: number = 1;

 getRawKeys(): RawData[] {
  return [
   { key: "Research", perPlayer: false, default: [] },
   // Research level is stored in each character's Lv0 array at SkillsIndex.Research.
   { key: "Lv0_", perPlayer: true, default: [] },
  ];
 }

 init(_allItems: Item[], _charCount: number) {
  this.bonuses = ResearchGridBonus.fromBase(initResearchGridBonusRepo());
  return this;
 }

 parse(data: Map<string, any>): void {
  const researchGrid = data.get(this.getDataKey()) as ResearchGrid;
  const research = data.get("Research") as number[][] || [];
  const gridLevels = research[0] || [];
  // Research[1] identifies the shape covering each square; -1 means none.
  const shapeIndexes = research[1] || [];
  // Research[2] tracks which observations have been found.
  const occurrenceFoundState = research[2] || [];
  // Research[4] stores each found observation's Insight level.
  const observationInsightLevels = research[4] || [];
  // The raw Lv0_i arrays are declared above; SkillsIndex keeps the skill slot explicit.
  const researchSkillLevels = getResearchSkillLevels(data);
  // Research[11] contains one entry for every reclaimed King Rat Crown.
  const crownCount = (research[11] || []).length;
  // Research[12] stores Glimbo trade counts by trade.
  const glimboTradeCounts = research[12] || [];
  // OptionsListAccount[500] is the direct mode-2 value for square 151.
  const accountOption500 = Number((data.get("OptLacc") as number[] | undefined)?.[500]) || 0;

  researchGrid.bonuses.forEach(bonus => {
   bonus.level = Number(gridLevels[bonus.index]) || 0;

   const shapeIndex = Number(shapeIndexes[bonus.index]);
   const shapeBonus = Number.isFinite(shapeIndex) && shapeIndex >= 0
    ? RESEARCH_GRID_SHAPE_BONUS_PERCENTAGES[shapeIndex] || 0
    : 0;
   bonus.shapeBonusPercent = shapeBonus;
  });

  // The repository keeps each square at its numeric game index, so these casts
  // assign raw inputs to the matching specialized square objects.
  (researchGrid.bonuses[67] as CrownCountResearchGridBonus).crownCount = crownCount;
  (researchGrid.bonuses[68] as CrownCountResearchGridBonus).crownCount = crownCount;
  (researchGrid.bonuses[107] as CrownCountResearchGridBonus).crownCount = crownCount;
  const observationLevelBonus = researchGrid.bonuses[94] as ObservationLevelResearchGridBonus;
  observationLevelBonus.occurrenceFoundState = occurrenceFoundState;
  observationLevelBonus.observationInsightLevels = observationInsightLevels;
  observationLevelBonus.researchSkillLevels = researchSkillLevels;
  const occurrenceCountBonus = researchGrid.bonuses[112] as OccurrenceCountResearchGridBonus;
  occurrenceCountBonus.occurrenceFoundState = occurrenceFoundState;
  occurrenceCountBonus.researchSkillLevels = researchSkillLevels;
  (researchGrid.bonuses[151] as AccountOptionResearchGridBonus).optionValue = accountOption500;
  (researchGrid.bonuses[168] as GlimboTradesResearchGridBonus).glimboTradeCounts = glimboTradeCounts;
 }

 getBonusForId(index: number, mode: number = 0): number {
  const bonus = this.bonuses.find(bonus => bonus.index === index);
  if (!bonus) {
   return 0;
  }

  // The game uses mode 1 for the level and mode 2 for the square's secondary value.
  switch (mode) {
   case 1: return bonus.getLevel();
   case 2: return bonus.getBonusMode2();
   default: return bonus.getBonus();
  }
 }

 getGridBonusAllmulti(): number {
  return this.allBonusMultiplier;
 }

 /**
  * Game formula:
  * 1 + (Companions(55) + Divine Design's Doot contribution +
  * CloudBonus(71, 72, 76) + SushiStuff(53)) / 100.
  */
 updateCalculationState(
  companions: Companion[],
  equinox: Equinox,
  sushi: SushiStation,
 ): void {
  const divineDesign = this.bonuses[DOOT_RESEARCH_INDEX] as DivineDesignResearchGridBonus;
  divineDesign.dootBonus = getCompanionBonus(companions, DOOT_COMPANION);

  const companion55Bonus = getCompanionBonus(companions, RESEARCH_GRID_ALL_MULTI_COMPANION);
  const cloudBonus = RESEARCH_GRID_ALL_MULTI_CHALLENGES.reduce(
   (sum, index) => sum + getCloudBonus(equinox, index),
   0
  );
  const sushiBonus = sushi.getBonusFromIndex(RESEARCH_GRID_ALL_MULTI_SUSHI);

  this.allBonusMultiplier = 1 + (
   companion55Bonus
   + divineDesign.getGridBonusAllmultiContribution()
   + cloudBonus
   + sushiBonus
  ) / 100;

  // Derived counters are populated only after all raw Research data has been parsed.
  this.bonuses.forEach(bonus => {
   bonus.allBonusMultiplier = this.allBonusMultiplier;
   bonus.updateDerivedValues();
  });
 }
}

/** Reads each character's Research level from the parsed per-player Lv0_i arrays. */
const getResearchSkillLevels = (data: Map<string, any>): number[] => {
 return [...data.entries()]
  .filter(([key, value]) => /^Lv0_\d+$/.test(key) && Array.isArray(value))
  .map(([, value]) => Number(value[SkillsIndex.Research]) || 0);
};

/**
 * The game unlocks Research observations from the highest character Research
 * level. Once Research[2][0] is non-zero, the delivered formula reveals up to
 * 43 observations using the level thresholds below.
 */
const getOccurrencesToBeFound = (
 occurrenceFoundState: number[],
 researchSkillLevels: number[],
): number => {
 const researchLevel = Math.max(...researchSkillLevels, 0);
 if (researchLevel < 1) {
  return 0;
 }
 if (Number(occurrenceFoundState[0]) === 0) {
  return 1;
 }

 return Math.min(
  43,
  5 * Math.floor((researchLevel + 10) / 10)
  - Math.floor(researchLevel / 20)
  - Math.floor(researchLevel / 30)
  - Math.floor(researchLevel / 50)
 );
};

export const updateResearchGrid = (data: Map<string, any>) => {
 const researchGrid = data.get("research") as ResearchGrid | undefined;
 const companions = data.get("companions") as Companion[] | undefined;
 const equinox = data.get("equinox") as Equinox | undefined;
 const sushi = data.get("sushi") as SushiStation | undefined;

 if (!researchGrid || !companions || !equinox || !sushi) {
  throw new Error("Research Grid calculation requires Research, companions, Equinox, and Sushi data");
 }

 researchGrid.updateCalculationState(companions, equinox, sushi);
 return researchGrid;
};
