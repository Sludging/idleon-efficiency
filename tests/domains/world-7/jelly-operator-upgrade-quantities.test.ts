import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import {
  ExtractionResults,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

type UpgradeQuantity = {
  index: number;
  quantity: number;
};

const extractionResultsName = 'jelly-operator-upgrade-quantities-data.json';

describe('Jelly Operator upgrade quantities', () => {
  let extractionResults: ExtractionResults;
  let jellyOperator: JellyOperator;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    jellyOperator = loadGameDataFromSave('latest').get('jellyOperator') as JellyOperator;
  });

  it('matches Jelly Operator upgrade quantities with the game', () => {
    const expected = extractionResults.extractions['jelly_upgrade_quantities']?.result as UpgradeQuantity[] | undefined;
    if (!expected) throw new Error('Jelly Operator expected upgrade quantity records not found');

    const nativeUpgradeIds = expected.map(({ index }) => index).sort((left, right) => left - right);
    const domainUpgradeIds = jellyOperator.upgrades.map(({ index }) => index).sort((left, right) => left - right);
    expect(nativeUpgradeIds).toHaveLength(40);
    expect(domainUpgradeIds).toEqual(nativeUpgradeIds);

    for (const { index, quantity } of expected) {
      const upgrade = jellyOperator.upgrades.find(candidate => candidate.index === index);
      if (!upgrade) throw new Error(`Jelly Operator upgrade record ${index} not found`);

      expect(upgrade.getQuantity()).toMatchLiveGameWithDetails(quantity, {
        tolerance: 0,
        context: `${upgrade.data.name} upgrade quantity`,
        debugInfo: {
          index,
          level: upgrade.level,
          menagerieDoubled: upgrade.menagerieDoubled,
        },
      });
    }
  });
});
