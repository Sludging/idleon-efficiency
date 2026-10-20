import { Coins } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { ButtonBonusBase, initButtonBonusRepo } from "../data/ButtonBonusRepo";
import type { ImageData } from "../imageData";
import { Item } from "../items";
import { Skilling } from "../skilling";
import { SkillsIndex } from "../SkillsIndex";
import { ClassIndex } from "../talents";
import { Companion, getCompanionActiveBonus } from "../companions";
import { ResearchGrid } from "./research";
import { ButtonTaskBase, initButtonTaskRepo } from "../data/ButtonTaskRepo";
import type { ButtonTaskModel } from "../model/buttonTaskModel";
import { sushiBucksImage } from "components/world-7/sushi/sushiImages";

const BUTTON_TASK_CYCLE_LENGTH = 100;
export const UPCOMING_BUTTON_TASK_COUNT = 5;

export type ButtonTaskProgress = { currentValue: number; characterName?: string };

export type UpcomingButtonTask = {
  index: number;
  description: string;
  pressCount: number;
  pressNumber: number;
  requiredValue: number;
  progress: ButtonTaskProgress & { isReady: boolean };
};

// Native Button_REQ uses completed presses; only linear and step requirements round up.
const getButtonTaskRequirement = (task: ButtonTaskModel, pressCount: number): number => {
 switch (task.scalingType) {
  case "linear":
   return Math.ceil(task.baseRequirement + pressCount * task.scalingValue);
  case "step":
   return Math.ceil(task.baseRequirement + pressCount / task.scalingValue);
  case "exponent":
   return task.baseRequirement * Math.pow(task.scalingValue, pressCount);
  default:
   throw new Error(`Unsupported Button task scaling type: ${task.scalingType}`);
 }
};

const BUTTON_COMPANION = 147;
const BUTTON_RESEARCH_INDEX = 125;
const BUTTON_BONUS_CATEGORY_COUNT = 9;
const BUTTON_PRESSES_PER_CATEGORY = 5;
const BUTTON_PRESSES_PER_CYCLE = BUTTON_BONUS_CATEGORY_COUNT * BUTTON_PRESSES_PER_CATEGORY;
const BUTTON_PRESS_COUNT_OPTION = 594;

type ButtonBonusData = ButtonBonusBase["data"];

// Representative existing game artwork; the Button has no category-specific art records.
const BUTTON_BONUS_IMAGES: ReadonlyArray<ImageData> = [
 Skilling.getSkillImageData(SkillsIndex.Research),
 { location: `Coins${Coins.Copper}`, width: 21, height: 21 },
 sushiBucksImage,
 { location: "Arti0", width: 22, height: 20 },
 { location: `ClassIcons${ClassIndex.Death_Bringer}`, width: 38, height: 36 },
 Skilling.getSkillImageData(SkillsIndex.Spelunking),
 Skilling.getSkillImageData(SkillsIndex.Cooking),
 Skilling.getSkillImageData(SkillsIndex.Farming),
 { location: `ClassIcons${ClassIndex.Beginner}`, width: 38, height: 36 },
];


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

 getImageData(): ImageData {
  return BUTTON_BONUS_IMAGES[this.index];
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
 tasks: ButtonTaskBase[] = [];
 pressCount: number = 0;
 upcomingTaskProgress: readonly ButtonTaskProgress[] = [];
 private taskByPosition: Array<ButtonTaskBase | undefined> = [];
 private bonusMultiplier: number = 1;

 getRawKeys(): RawData[] {
  return [];
 }

 init(_allItems: Item[], _charCount: number) {
  this.bonuses = ButtonBonus.fromBase(initButtonBonusRepo());
  this.tasks = initButtonTaskRepo();
  this.upcomingTaskProgress = [];
  this.taskByPosition = Array.from({ length: BUTTON_TASK_CYCLE_LENGTH });

  this.tasks.forEach(task => {
   task.data.cycleIndexes.forEach(position => {
    if (this.taskByPosition[position]) {
     throw new Error(`Duplicate Button task cycle position: ${position}`);
    }
    this.taskByPosition[position] = task;
   });
  });

  if (this.taskByPosition.some(task => task === undefined)) {
   throw new Error("Button task cycle must cover all 100 positions");
  }

  return this;
 }

 parse(data: Map<string, any>): void {
  const button = data.get(this.getDataKey()) as Button;
  const optionList = data.get("OptLacc") as number[] | undefined;
  const pressCount = Math.max(0, Math.trunc(Number(optionList?.[BUTTON_PRESS_COUNT_OPTION]) || 0));
  button.pressCount = pressCount;

  button.bonuses.forEach(bonus => {
   bonus.categoryPresses = calculateCategoryPresses(bonus.index, pressCount);
  });
 }

 getBonusMultiplier(): number {
  return this.bonusMultiplier;
 }

 getNextBonusIndex(): number {
  return Math.floor(this.pressCount / BUTTON_PRESSES_PER_CATEGORY) % BUTTON_BONUS_CATEGORY_COUNT;
 }

 getBonusForIndex(index: number): number {
  return this.bonuses.find(bonus => bonus.index === index)?.getBonus() ?? 0;
 }
 getUpcomingTaskIndex(offset: number): number {
  const pressCount = this.pressCount + offset;
  const task = this.taskByPosition[pressCount % BUTTON_TASK_CYCLE_LENGTH];
  if (!task) {
   throw new Error(`Button task cycle has no task at position ${pressCount % BUTTON_TASK_CYCLE_LENGTH}`);
  }
  return task.index;
 }


 getUpcomingTasks(): UpcomingButtonTask[] {
  return Array.from({ length: UPCOMING_BUTTON_TASK_COUNT }, (_, offset) => {
   const pressCount = this.pressCount + offset;
   const task = this.taskByPosition[pressCount % BUTTON_TASK_CYCLE_LENGTH];
   if (!task) {
    throw new Error(`Button task cycle has no task at position ${pressCount % BUTTON_TASK_CYCLE_LENGTH}`);
   }
   const progress = this.upcomingTaskProgress[offset];

   if (!progress) {
    throw new Error(`Button task progress is missing for queue position ${offset}`);
   }

   const scheduledTask = {
    index: task.index,
    description: task.data.description,
    pressCount,
    pressNumber: pressCount + 1,
    requiredValue: getButtonTaskRequirement(task.data, pressCount),
   };

   return {
    ...scheduledTask,
    progress: {
     ...progress,
     isReady: progress.currentValue >= scheduledTask.requiredValue,
    },
   };
  });
 }

 updateCalculationState(companions: Companion[], researchGrid: ResearchGrid): void {
  this.bonusMultiplier = (1 + getCompanionActiveBonus(companions, BUTTON_COMPANION) / 100)
   * (1 + researchGrid.getBonusForId(BUTTON_RESEARCH_INDEX) / 100);

  this.bonuses.forEach(bonus => {
   bonus.bonusMultiplier = this.bonusMultiplier;
  });
 }
}


export const updateButton = (data: Map<string, any>) => {
 const button = data.get("button") as Button;
 const companions = data.get("companions") as Companion[];
 const researchGrid = data.get("research") as ResearchGrid;

 button.updateCalculationState(companions, researchGrid);
 return button;
};
