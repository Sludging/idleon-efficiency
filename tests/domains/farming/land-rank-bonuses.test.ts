import type { Player } from '../../../data/domain/player';
import { Farming } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const bonusSpecs = [
  // Evolution Boost represents the diminishing formula; Seed of Stats represents the linear formula.
  { index: 0, extractionKey: 'land_rank_0_bonus', description: 'Evolution Boost bonus for crop evolution' },
  { index: 19, extractionKey: 'land_rank_19_bonus', description: 'Seed of Stats All Stat percentage' },
];

describe('Farming Domain - Land Rank Database bonuses', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  bonusSpecs.forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const farming = gameData.get('farming') as Farming;
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const recipient = getTargetPlayer(gameData.get('players') as Player[]);
      const domainValue = farming.landrankDatabase.getUpgradeBonusForPlayer(spec.index, recipient);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Recipient Land Rank Database ${spec.description}`,
      });
    });
  });
});
