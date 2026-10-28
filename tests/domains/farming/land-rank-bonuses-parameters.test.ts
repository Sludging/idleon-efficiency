import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import { Farming } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const parameterSpecs: ParameterTestSpec[] = [
  {
    description: 'effective account Dank Ranks multiplier used by Land Rank upgrades',
    extractionKey: 'account_dank_ranks_multiplier',
    domainExtractor: gameData => {
      const players = gameData.get('players') as Player[];
      const recipient = getTargetPlayer(players);
      return Math.max(1, Talent.getAccountTalentBonus(players, 207, recipient.finalTalentInputs));
    },
  },
  {
    description: 'Plump Database percentage boost used by Land Rank upgrades',
    extractionKey: 'plump_database_bonus',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(14),
  },
];

describe('Farming Domain - Land Rank Database parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  parameterSpecs.forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);

      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
