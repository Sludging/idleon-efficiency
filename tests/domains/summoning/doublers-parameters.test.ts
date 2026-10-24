import type { EventShop } from '../../../data/domain/eventShop';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const parameterSpecs: ParameterTestSpec[] = [
  {
    description: 'Gambit rewards that increase Summoning Doubler capacity',
    extractionKey: 'gambit_summoning_doublers',
    domainExtractor: (gameData) => {
      const hole = gameData.get('hole') as Hole;
      return hole.gambit.getBonus(0);
    },
  },
  {
    description: 'Summoning Star ownership that adds ten Summoning Doublers',
    extractionKey: 'summoning_star_owned',
    domainExtractor: (gameData) => {
      const eventShop = gameData.get('eventShop') as EventShop;
      return Number(eventShop.isBonusOwned(15));
    },
  },
];

describe('Summoning Doubler capacity parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('summoning-doublers-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  it.each(parameterSpecs)('matches $description', ({ extractionKey, domainExtractor }) => {
    const gameValue = getExtractedValue(extractionResults, extractionKey);
    expect(domainExtractor(gameData)).toMatchLiveGame(gameValue, 0);
  });
});
