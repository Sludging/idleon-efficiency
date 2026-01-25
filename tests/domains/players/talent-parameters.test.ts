/**
 * Cooking Domain Live Game Validation
 * 
 * Tests our cooking domain calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Player } from '../../../data/domain/player';
import { ClassIndex } from '../../../data/domain/talents';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';


const generalTalentParameterSpecs: Record<string, ParameterTestSpec> = {
  talent_146_bonus: {
    description: 'Apocalypse Chow - Talent 146 Enhanced bonus',
    extractionKey: 'talent_146_bonus',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const lastIndexBloodBerserker = players.filter(player => player.getEliteClass() == ClassIndex.Blood_Berserker).sort((player1, player2) => player2.playerID - player1.playerID)[0] ?? undefined;
      return lastIndexBloodBerserker.getTalentEnhancedBonus(146);
    }
  },
  all_talent_level_146: {
    description: 'All talent level 146',
    extractionKey: 'all_talent_level_146',
    domainExtractor: (gameData) => {
        const players = gameData.get("players") as Player[];
        const talent146 = players.flatMap(player => player.talents).find(talent => talent.skillIndex == 146);
        return talent146 ? talent146.maxLevel - talent146.bookMaxLevel : 0;
    }
  },
  all_talent_level_49: {
    description: 'All talent level - 49',
    extractionKey: 'all_talent_level_49',
    domainExtractor: (gameData) => {
      const players = gameData.get("players") as Player[];
      const talent49 = players.flatMap(player => player.talents).find(talent => talent.skillIndex == 49);
      return talent49 ? talent49.maxLevel - talent49.bookMaxLevel : 0;
    }
  },
};

describe('Talent Domain - General - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(generalTalentParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0.001);
    });
  });
});
