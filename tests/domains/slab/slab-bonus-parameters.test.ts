/**
 * Validates the direct account-wide inputs used by Slab's bonus multiplier.
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Meritocraty } from '../../../data/domain/world-7/meritocraty';

const saveName = 'latest';
const extractionResultsName = 'slab-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  meritocracy_bonus_23: {
    description: 'Multi Meritocracy bonus 23 used by the Slab-wide multiplier',
    extractionKey: 'meritocracy_bonus_23',
    domainExtractor: gameData => (gameData.get('meritocraty') as Meritocraty).getCurrentBonus(23),
  },
  legend_talent_bonus_28: {
    description: 'Legend Talent bonus 28 used by the Slab-wide multiplier',
    extractionKey: 'legend_talent_bonus_28',
    domainExtractor: gameData => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(28),
  },
  vault_upgrade_bonus_74: {
    description: 'Upgrade Vault bonus 74 used by the Slab-wide multiplier',
    extractionKey: 'vault_upgrade_bonus_74',
    domainExtractor: gameData => (gameData.get('upgradeVault') as UpgradeVault).getBonusForId(74),
  },
};

describe('Slab Domain - Slab Bonus - Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
