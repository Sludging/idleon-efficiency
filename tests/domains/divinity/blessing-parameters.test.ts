/**
 * Divinity Blessing Bonus Validation
 *
 * Tests our divinity blessing bonus calculations against live game data.
 *
 * Standard formula (most gods):
 *   blessLevel * blessingPerLevel * (1 + 0.05 * emporiumBonus33 * max(0, godRank))
 *   where godRank = numberOfUnlockedGods - 10
 *
 * God 2 (Nobisect) uses special BlessyBunDN formula with skill efficiencies and stats.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/divinity';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { Alchemy } from '../../../data/domain/alchemy';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'divinity-blessing-data.json';

const parameterSpecs = {
  emporium_bonus_33: {
    description: 'Jade Emporium upgrade 33 bonus (True Godly Blessings)',
    extractionKey: 'emporium_bonus_33',
    domainExtractor: (gameData: Map<string, any>) => {
      const sneaking = gameData.get("sneaking") as Sneaking;
      const upgrade33 = sneaking.jadeUpgrades.find(upgrade => upgrade.index === 33);
      return upgrade33?.purchased ? 1 : 0;
    }
  },

  gods_unlocked_count: {
    description: 'Number of gods unlocked + god rank',
    extractionKey: 'gods_unlocked_count',
    domainExtractor: (gameData: Map<string, any>) => {
      const divinity = gameData.get("divinity") as Divinity;
      const unlockedGods = divinity.gods.filter(god => god.unlocked).length;
      return unlockedGods + divinity.godRank;
    }
  },

  skill_all_efficiencies: {
    description: 'All skill efficiencies stat (NOT IMPLEMENTED)',
    extractionKey: 'skill_all_efficiencies',
    domainExtractor: (_gameData: Map<string, any>) => {
      // MISSING: We don't currently track "AllEfficiencies" skill stats in the domain
      // This is a game function call: SkillStats("AllEfficiencies")
      throw new Error("NOT IMPLEMENTED - SkillStats('AllEfficiencies') calculation missing from domain");
    }
  },

  alchemy_bubble_mineff: {
    description: 'Mining efficiency bubble',
    extractionKey: 'alchemy_bubble_mineff',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("MinEff");
    }
  },

  alchemy_bubble_chopeff: {
    description: 'Chopping efficiency bubble',
    extractionKey: 'alchemy_bubble_chopeff',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("ChopEff");
    }
  },

  total_stats_str: {
    description: 'Total STR stat (active player)',
    extractionKey: 'total_stats_str',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.strength;
    }
  },

  total_stats_agi: {
    description: 'Total AGI stat (active player)',
    extractionKey: 'total_stats_agi',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.agility;
    }
  },

  total_stats_wis: {
    description: 'Total WIS stat (active player)',
    extractionKey: 'total_stats_wis',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      return players[0].stats.wisdom;
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
