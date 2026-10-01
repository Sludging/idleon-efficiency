/**
 * Direct comparisons for inputs used by blessing bonuses shown by the website.
 * Nobisect's bonus is the saved case that depends on the active player's stats.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/divinity';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { Alchemy } from '../../../data/domain/alchemy';
import { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { getTargetPlayer } from '../../utils/target-player';
const saveName = 'latest';
const extractionResultsName = 'divinity-blessing-data.json';

const parameterSpecs = {
 emporium_bonus_33: {
  description: 'Jade Emporium upgrade 33 True Godly Blessings input to website blessing bonuses',
  extractionKey: 'emporium_bonus_33',
  domainExtractor: (gameData: Map<string, any>) => {
   const sneaking = gameData.get("sneaking") as Sneaking;
   const upgrade33 = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 33);
   return upgrade33?.purchased ? 1 : 0;
  }
 },

 gods_unlocked_count: {
  description: 'Unlocked-god count plus god rank input to website blessing bonuses',
  extractionKey: 'gods_unlocked_count',
  domainExtractor: (gameData: Map<string, any>) => {
   const divinity = gameData.get("divinity") as Divinity;
   const unlockedGods = divinity.gods.filter(god => god.unlocked).length;
   return unlockedGods + divinity.godRank;
  }
 },

 skill_all_efficiencies: {
  description: 'Active player all-skill efficiency input to Nobisect blessing bonus',
  extractionKey: 'skill_all_efficiencies',
  domainExtractor: (gameData: Map<string, any>) => {
   const skilling = gameData.get("skilling") as Skilling;
   const players = gameData.get("players") as Player[];
   return skilling.getAllEfficiencies(getTargetPlayer(players));
  }
 },

 alchemy_bubble_mineff: {
  description: 'Active player mining-efficiency bubble input to Nobisect blessing bonus',
  extractionKey: 'alchemy_bubble_mineff',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const players = gameData.get("players") as Player[];
   return alchemy.getBubbleBonusForKey("MinEff", getTargetPlayer(players));
  }
 },

 alchemy_bubble_chopeff: {
  description: 'Active player chopping-efficiency bubble input to Nobisect blessing bonus',
  extractionKey: 'alchemy_bubble_chopeff',
  domainExtractor: (gameData: Map<string, any>) => {
   const alchemy = gameData.get("alchemy") as Alchemy;
   const players = gameData.get("players") as Player[];
   return alchemy.getBubbleBonusForKey("ChopEff", getTargetPlayer(players));
  }
 },

 total_stats_str: {
  description: 'Active player STR input to Nobisect blessing bonus',
  extractionKey: 'total_stats_str',
  domainExtractor: (gameData: Map<string, any>) => {
   const players = gameData.get("players") as Player[];
   return getTargetPlayer(players).stats.strength;
  }
 },

 total_stats_agi: {
  description: 'Active player AGI input to Nobisect blessing bonus',
  extractionKey: 'total_stats_agi',
  domainExtractor: (gameData: Map<string, any>) => {
   const players = gameData.get("players") as Player[];
   return getTargetPlayer(players).stats.agility;
  }
 },

 total_stats_wis: {
  description: 'Active player WIS input to Nobisect blessing bonus',
  extractionKey: 'total_stats_wis',
  domainExtractor: (gameData: Map<string, any>) => {
   const players = gameData.get("players") as Player[];
   return getTargetPlayer(players).stats.wisdom;
  }
 },
};

describe('Divinity Domain - Blessing Bonus - Parameters', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
