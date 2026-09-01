import { Domain, RawData } from "../base/domain";
import { ButtonBonusBase, initButtonBonusRepo } from "../data/ButtonBonusRepo";
import { Item } from "../items";
import { Companion, getCompanionBonus } from "../companions";
import { ResearchGrid } from "./research";

const BUTTON_COMPANION = 147;
const BUTTON_RESEARCH_INDEX = 125;
const BUTTON_BONUS_CATEGORY_COUNT = 9;
const BUTTON_PRESSES_PER_CATEGORY = 5;
const BUTTON_PRESSES_PER_CYCLE = BUTTON_BONUS_CATEGORY_COUNT * BUTTON_PRESSES_PER_CATEGORY;
const BUTTON_PRESS_COUNT_OPTION = 594;

type ButtonBonusData = ButtonBonusBase["data"];

/** A single accumulated bonus category from The Button. */
export class ButtonBonus {
 categoryPresses: number = 0;
 bonusMultiplier: number = 1;

 constructor(public index: number, public data: ButtonBonusData) { }

 static fromBase(data: ButtonBonusBase[]): ButtonBonus[] {
  return data.map(bonus => new ButtonBonus(bonus.index, bonus.data));
 }

 /**
  * Game formula: every five presses advances to the next category, then
  * repeats the nine-category schedule from the beginning.
  */
 getBonus(): number {
  return this.categoryPresses * this.data.bonusPerPress * this.bonusMultiplier;
 }
}

const calculateCategoryPresses = (index: number, pressCount: number): number => {
 const normalizedPressCount = Math.max(0, Math.trunc(pressCount));
 const completedCycles = Math.floor(normalizedPressCount / BUTTON_PRESSES_PER_CYCLE);
 const remainingPresses = normalizedPressCount % BUTTON_PRESSES_PER_CYCLE;
 const remainingCategoryPresses = Math.min(
  BUTTON_PRESSES_PER_CATEGORY,
  Math.max(0, remainingPresses - index * BUTTON_PRESSES_PER_CATEGORY),
 );

 return completedCycles * BUTTON_PRESSES_PER_CATEGORY + remainingCategoryPresses;
};

export class Button extends Domain {
 bonuses: ButtonBonus[] = [];
 private bonusMultiplier: number = 1;

 getRawKeys(): RawData[] {
  return [];
 }

 init(_allItems: Item[], _charCount: number) {
  this.bonuses = ButtonBonus.fromBase(initButtonBonusRepo());
  return this;
 }

 parse(data: Map<string, any>): void {
  const button = data.get(this.getDataKey()) as Button;
  const optionList = data.get("OptLacc") as number[] | undefined;
  const pressCount = Math.max(0, Math.trunc(Number(optionList?.[BUTTON_PRESS_COUNT_OPTION]) || 0));

  button.bonuses.forEach(bonus => {
   bonus.categoryPresses = calculateCategoryPresses(bonus.index, pressCount);
  });
 }

 getBonusMultiplier(): number {
  return this.bonusMultiplier;
 }

 getBonusForIndex(index: number): number {
  return this.bonuses.find(bonus => bonus.index === index)?.getBonus() ?? 0;
 }

 updateCalculationState(companions: Companion[], researchGrid: ResearchGrid): void {
  this.bonusMultiplier = (1 + getCompanionBonus(companions, BUTTON_COMPANION) / 100)
   * (1 + researchGrid.getBonusForId(BUTTON_RESEARCH_INDEX) / 100);

  this.bonuses.forEach(bonus => {
   bonus.bonusMultiplier = this.bonusMultiplier;
  });
 }
}

export const updateButton = (data: Map<string, any>) => {
 const button = data.get("button") as Button | undefined;
 const companions = data.get("companions") as Companion[] | undefined;
 const researchGrid = data.get("research") as ResearchGrid | undefined;

 if (!button || !companions || !researchGrid) {
  throw new Error("Button calculation requires Button, companions, and Research Grid data");
 }

 button.updateCalculationState(companions, researchGrid);
 return button;
};
