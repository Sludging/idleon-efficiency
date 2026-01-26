/**
 * Talent Max Level Parameter Validation
 *
 * Tests our talent max level calculations against live game data
 * extracted from running game using the debug tool.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';

const talentMaxLevelParameterSpecs = {
  talent_max_level_149_bonus: {
    description: 'Max level bonus - Symbols of Beyond - Sludgadin',
    extractionKey: 'talent_max_level_149_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromTalent ?? 0;
    }
  },
  talent_max_level_family_bonus_68: {
    description: 'Max level bonus - Family bonus 68 - Sludgadin',
    extractionKey: 'talent_max_family_bonus_68',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromES ?? 0;
    }
  },
  talent_max_level_companion_bonus: {
    description: 'Max level bonus - Companion 1 - Sludgadin',
    extractionKey: 'talent_max_level_companion_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromSlug ?? 0;
    }
  },
  talent_max_level_divinity_bonus: {
    description: 'Max level bonus - Divinity bonus - Sludgadin',
    extractionKey: 'talent_max_level_divinity_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromBear ?? 0;
    }
  },
  talent_max_level_equinox_12_bonus: {
    description: 'Max level bonus - Equinox 12 - Sludgadin',
    extractionKey: 'talent_max_level_equinox_12_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromEquinox ?? 0;
    }
  },
  talent_max_level_ninja_mastery_bonus: {
    description: 'Max level bonus - Ninja Mastery - Sludgadin',
    extractionKey: 'talent_max_level_ninja_mastery_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromNinjaMastery ?? 0;
    }
  },
  talent_max_level_grimoire_39_bonus: {
    description: 'Max level bonus - Grimoire 39 - Sludgadin',
    extractionKey: 'talent_max_level_grimoire_39_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromGrimoire ?? 0;
    }
  },
  talent_max_level_set_kattlekruk_bonus: {
    description: 'Max level bonus - Kattlekruk set - Sludgadin',
    extractionKey: 'talent_max_level_set_kattlekruk_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromKattlekrukSet ?? 0;
    }
  },
  talent_max_level_tesseract_57_bonus: {
    description: 'Max level bonus - Tesseract 57 - Sludgadin',
    extractionKey: 'talent_max_level_tesseract_57_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      return sludgadin?.extraLevelsFromTesseract ?? 0;
    }
  },
  talent_max_level_final_bonus: {
    description: 'Max level bonus - Final - Sludgadin',
    extractionKey: 'all_talent_level_146',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      const sludgadin = players.find(player => player.playerID == 0) ?? undefined;
      const talent146 = sludgadin?.talents.find(talent => talent.skillIndex == 146);
      return talent146 ? talent146.maxLevel - talent146.bookMaxLevel : 0;
    }
  }
};

describe('Talent Domain - Max Level - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(talentMaxLevelParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
