import { getMaximumDamage } from "../player-damage";
import { Button, UPCOMING_BUTTON_TASK_COUNT, type ButtonTaskProgress } from "./button";
import { getClassExperienceMultiplier } from "../player-experience";
import { SkillsIndex } from "../SkillsIndex";
import { BoneType, type Grimoire } from "../grimoire";
import { DustType, type Compass } from "../compass";
import { TesseractType, type Tesseract } from "../tesseract";
import { CauldronIndex, type Alchemy } from "../world-2/alchemy/alchemy";
import { SummonEssenceColor, type Summoning } from "../world-6/summoning";
import type { Player } from "../player";
import type { PlayerStatues } from "../world-1/statues";
import type { Stamp } from "../world-1/stamps";
import type { Printer } from "../world-3/construction/printer";
import { getBestCogBuildRate } from "../world-3/construction/construction";
import type { Worship } from "../world-3/worship";
import type { Bubba } from "../world-3/bubba";
import type { Breeding } from "../world-4/breeding";
import type { Cooking } from "../world-4/cooking";
import type { Tome } from "../world-4/tome";
import type { Divinity } from "../world-5/divinity";
import type { Sailing } from "../world-5/sailing/sailing";
import type { Gaming } from "../world-5/gaming";
import type { Slab } from "../world-5/slab";
import type { Poppy } from "../world-2/poppy";
import type { Orion } from "../world-1/orion";
import type { Farming } from "../world-6/farming";
import type { Sneaking } from "../world-6/sneaking";
import type { Emperor } from "../world-6/emperor";
import type { GoldenFood } from "../golden-food";
import type { Spelunking } from "./spelunking";
import type { SushiStation } from "./sushi";
import { getBoatArtifactFindMultiplier } from "../world-5/sailing/artifactChance";

type Progress = ButtonTaskProgress;

const BUTTON_STATUE_INDEXES = [29, 2, 6, 8, 9, 15, 16] as const;
const BUTTON_SKILL_INDEXES = [
    SkillsIndex.Intellect,
    SkillsIndex.Sneaking,
    SkillsIndex.Spelunking,
    SkillsIndex.Mining,
    SkillsIndex.Chopping,
    SkillsIndex.Divinity,
] as const;


const available = (value: number, characterName?: string): Progress => {
    return characterName === undefined
        ? { currentValue: value }
        : { currentValue: value, characterName };
};

const bestCharacterProgress = (
    players: readonly Player[],
    getValue: (player: Player) => number,
): Progress => {
    let bestValue = getValue(players[0]);
    let bestCharacterName = players[0].playerName;

    for (let index = 1; index < players.length; index++) {
        const player = players[index];
        const value = getValue(player);
        if (value > bestValue) {
            bestValue = value;
            bestCharacterName = player.playerName;
        }
    }

    return available(bestValue, bestCharacterName);
};

const getPlayers = (data: Map<string, any>): Player[] => data.get("players") as Player[];


export const getButtonTaskProgress = (data: Map<string, any>, taskIndex: number): Progress => {
    switch (taskIndex) {
        case 0:
            return bestCharacterProgress(getPlayers(data), player => player.stats.strength);
        case 1:
            return bestCharacterProgress(getPlayers(data), player => player.stats.agility);
        case 2:
            return bestCharacterProgress(getPlayers(data), player => player.stats.wisdom);
        case 3:
            return bestCharacterProgress(getPlayers(data), player => player.stats.luck);
        case 4: {
            const grimoire = data.get("grimoire") as Grimoire;
            return available(grimoire.resources[BoneType.Femur]);
        }
        case 5: {
            const compass = data.get("compass") as Compass;
            return available(compass.availableDust[DustType.Moondust]);
        }
        case 6:
        case 7: {
            const tesseract = data.get("tesseract") as Tesseract;
            const resource = taskIndex === 6 ? TesseractType.Green : TesseractType.Red;
            return available(tesseract.resources[resource]);
        }
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14: {
            const statuesByPlayer = data.get("statues") as PlayerStatues[];
            const statueIndex = BUTTON_STATUE_INDEXES[taskIndex - 8];
            return bestCharacterProgress(getPlayers(data), player => statuesByPlayer[player.playerID].statues[statueIndex].level);
        }
        case 15:
            return bestCharacterProgress(getPlayers(data), player => getClassExperienceMultiplier(data, player));
        case 16:
            return bestCharacterProgress(getPlayers(data), player => player.stats.dropRateMultiplier);
        case 17: {
            const stamps = data.get("stamps") as Stamp[][];
            return available(stamps[2][2].level);
        }
        case 18:
        case 19:
        case 20: {
            const alchemy = data.get("alchemy") as Alchemy;
            const cauldron = taskIndex === 18
                ? CauldronIndex.Power
                : taskIndex === 19
                    ? CauldronIndex.Quicc
                    : CauldronIndex.HighIQ;
            return available(alchemy.cauldrons[cauldron].bubbles[0].level);
        }
        case 21: {
            const best = getBestCogBuildRate(data);
            return available(best.rate, best.characterName);
        }
        case 22: {
            const printer = data.get("printer") as Printer;
            for (const player of getPlayers(data)) {
                const sample = printer.samples[player.playerID]?.find(item => item.item === "Copper");
                if (sample !== undefined) {
                    return available(sample.quantity, player.playerName);
                }
            }
            return available(0);
        }
        case 23: {
            const orion = data.get("orion") as Orion;
            return available(orion.ownedFeather);
        }
        case 24: {
            const worship = data.get("worship") as Worship;
            return available(worship.totalizer.totalWaves);
        }
        case 25: {
            const breeding = data.get("breeding") as Breeding;
            return available(breeding.firstStoredPetPower);
        }
        case 26: {
            const breeding = data.get("breeding") as Breeding;
            return available(breeding.territory[0].trekkingSpeedHr);
        }
        case 27:
        case 28: {
            const cooking = data.get("cooking") as Cooking;
            const meal = taskIndex === 27
                ? cooking.meals.find(meal => meal.name === "Yumi Peachring")!
                : cooking.meals.find(meal => meal.name === "Sausy Sausage")!;
            return available(taskIndex === 27 ? meal.ribbonLevel : meal.level);
        }
        case 29: {
            const tome = data.get("tome") as Tome;
            const players = getPlayers(data);
            return available(tome.getHighestScore(), players[tome.highestScoreIndex].playerName);
        }
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35: {
            const skillIndex = BUTTON_SKILL_INDEXES[taskIndex - 30];
            return bestCharacterProgress(getPlayers(data), player => player.skills.get(skillIndex)!.level);
        }
        case 36: {
            const divinity = data.get("divinity") as Divinity;
            return available(divinity.currentDivinity);
        }
        case 37: {
            const sailing = data.get("sailing") as Sailing;
            return available(sailing.loot[0]);
        }
        case 38:
            return bestCharacterProgress(getPlayers(data), player => getBoatArtifactFindMultiplier(data, 0, player));
        case 39: {
            const gaming = data.get("gaming") as Gaming;
            return available(gaming.bits);
        }
        case 40: {
            const gaming = data.get("gaming") as Gaming;
            return available(gaming.evolvedPlantCount);
        }
        case 41: {
            const gaming = data.get("gaming") as Gaming;
            return available(gaming.palette.bonusLuck);
        }
        case 42: {
            const slab = data.get("slab") as Slab;
            return available(slab.registeredItemCount);
        }
        case 43:
        case 44: {
            const summoning = data.get("summoning") as Summoning;
            return available(taskIndex === 43
                ? summoning.summonEssences.find(essence => essence.color === SummonEssenceColor.White)!.quantity
                : summoning.summonBattles.getTotalVictories());
        }
        case 45: {
            const farming = data.get("farming") as Farming;
            return available(farming.magicBeansFromDepot);
        }
        case 46: {
            const sneaking = data.get("sneaking") as Sneaking;
            return available(sneaking.jade);
        }
        case 47: {
            const goldenFood = data.get("goldenFood") as GoldenFood;
            return bestCharacterProgress(getPlayers(data), player =>
                Math.max(0, 100 * (goldenFood.getEffectivity(player) - 1)));
        }
        case 48: {
            const farming = data.get("farming") as Farming;
            return available(farming.registeredCropCount);
        }
        case 49:
            return bestCharacterProgress(getPlayers(data), player => getMaximumDamage(data, player));
        case 50: {
            const spelunking = data.get("spelunking") as Spelunking;
            return available(spelunking.persistentPower);
        }
        case 51: {
            const spelunking = data.get("spelunking") as Spelunking;
            return available(spelunking.tunnels[4].bestDepth);
        }
        case 52:
            return bestCharacterProgress(getPlayers(data), player => player.money);
        case 53: {
            const emperor = data.get("emperor") as Emperor;
            return available(emperor.emperorKills + 1);
        }
        case 54: {
            const sushi = data.get("sushi") as SushiStation;
            return available(sushi.bucks);
        }
        case 55: {
            const poppy = data.get("poppy") as Poppy;
            return available(poppy.ownedFishes);
        }
        case 56: {
            const bubba = data.get("bubba") as Bubba;
            return available(bubba.ownedFlesh);
        }
        default:
            throw new Error(`No Button task progress resolver exists for task ${taskIndex}`);
    }
};

export const updateButtonTaskProgress = (data: Map<string, any>): readonly ButtonTaskProgress[] => {
    const button = data.get("button") as Button;
    const progress = Array.from({ length: UPCOMING_BUTTON_TASK_COUNT }, (_, offset) =>
        getButtonTaskProgress(data, button.getUpcomingTaskIndex(offset)));
    button.upcomingTaskProgress = progress;
    return progress;
};
