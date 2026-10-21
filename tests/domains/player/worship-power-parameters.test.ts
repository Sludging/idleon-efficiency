import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';

const extractionResultsName = 'player-worship-power-data.json';

// Worship Power adds both bubble results. Equipment power already includes parsed upgrades.
const parameterSpecs = [
  {
    key: 'alchemy_worship_power_m2',
    bonusKey: 'M2',
    description: 'Slabe Logsoul bubble contribution to the target character Worship Power',
  },
  {
    key: 'alchemy_worship_power_m7',
    bonusKey: 'M7',
    description: 'Endgame Eff Iii bubble contribution to the target character Worship Power',
  },
];

describe('Player Worship Power direct parameters', () => {
  let extractionResults: ExtractionResults;
  let alchemy: Alchemy;
  let player: Player;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    alchemy = gameData.get('alchemy') as Alchemy;
    player = getTargetPlayer(gameData.get('players') as Player[]);
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
  });

  parameterSpecs.forEach(({ key, bonusKey, description }) => {
    it(`matches ${description}`, () => {
      const expected = getExtractedValue(extractionResults, key);
      const actual = alchemy.getBubbleBonusForKey(bonusKey, player);
      expect(actual).toMatchLiveGame(expected, 0);
    });
  });
});
