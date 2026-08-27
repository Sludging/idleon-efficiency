/**
 * Hole Domain - Fountain bonus calculations
 *
 * Tests Fountain marble and total bonuses across all water types, zero and
 * non-zero upgrade levels, both marbleization branches, and varied factors.
 *
 * @testCovers Hole.getFountainBonus
 * @testCovers Fountain.getBonus
 * @testCovers FountainUpgrade.getMarbleBonus
 * @testCovers FountainUpgrade.getBonus
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'fountain-total-bonus-data.json';

const marbleBonusCases = [
 { waterIndex: 0, upgradeIndex: 8, extractionKey: 'fountain_marble_bonus_0_8', description: 'Fountain marble bonus for water 0 upgrade 8' },
 { waterIndex: 0, upgradeIndex: 13, extractionKey: 'fountain_marble_bonus_0_13', description: 'Fountain marble bonus for water 0 upgrade 13' },
];

const totalBonusCases = [
 { waterIndex: 0, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_0_0', description: 'Fountain total bonus for water 0 upgrade 0' },
 { waterIndex: 0, upgradeIndex: 1, extractionKey: 'fountain_total_bonus_0_1', description: 'Fountain total bonus for water 0 upgrade 1' },
 { waterIndex: 0, upgradeIndex: 5, extractionKey: 'fountain_total_bonus_0_5', description: 'Fountain total bonus for water 0 upgrade 5' },
 { waterIndex: 0, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_0_8', description: 'Fountain total bonus for water 0 upgrade 8' },
 { waterIndex: 0, upgradeIndex: 9, extractionKey: 'fountain_total_bonus_0_9', description: 'Fountain total bonus for water 0 upgrade 9' },
 { waterIndex: 0, upgradeIndex: 13, extractionKey: 'fountain_total_bonus_0_13', description: 'Fountain total bonus for water 0 upgrade 13' },
 { waterIndex: 0, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_0_19', description: 'Fountain total bonus for water 0 upgrade 19' },
 { waterIndex: 1, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_1_0', description: 'Fountain total bonus for water 1 upgrade 0' },
 { waterIndex: 1, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_1_8', description: 'Fountain total bonus for water 1 upgrade 8' },
 { waterIndex: 1, upgradeIndex: 10, extractionKey: 'fountain_total_bonus_1_10', description: 'Fountain total bonus for water 1 upgrade 10' },
 { waterIndex: 1, upgradeIndex: 13, extractionKey: 'fountain_total_bonus_1_13', description: 'Fountain total bonus for water 1 upgrade 13' },
 { waterIndex: 1, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_1_19', description: 'Fountain total bonus for water 1 upgrade 19' },
 { waterIndex: 2, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_2_0', description: 'Fountain total bonus for water 2 upgrade 0' },
 { waterIndex: 2, upgradeIndex: 1, extractionKey: 'fountain_total_bonus_2_1', description: 'Fountain total bonus for water 2 upgrade 1' },
 { waterIndex: 2, upgradeIndex: 2, extractionKey: 'fountain_total_bonus_2_2', description: 'Fountain total bonus for water 2 upgrade 2' },
 { waterIndex: 2, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_2_8', description: 'Fountain total bonus for water 2 upgrade 8' },
 { waterIndex: 2, upgradeIndex: 12, extractionKey: 'fountain_total_bonus_2_12', description: 'Fountain total bonus for water 2 upgrade 12' },
 { waterIndex: 2, upgradeIndex: 18, extractionKey: 'fountain_total_bonus_2_18', description: 'Fountain total bonus for water 2 upgrade 18' },
 { waterIndex: 2, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_2_19', description: 'Fountain total bonus for water 2 upgrade 19' },
];

describe('Hole Domain - Fountain bonuses', () => {
 let extractionResults: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  hole = loadGameDataFromSave(saveName).get('hole') as Hole;
 });

 describe('Marble bonuses', () => {
  marbleBonusCases.forEach(({ waterIndex, upgradeIndex, extractionKey, description }) => {
   it(`validates ${description}`, () => {
    const liveValue = getExtractedValue(extractionResults, extractionKey);
    const upgrade = hole.fountain.upgrades.find(upgrade => upgrade.data.waterIndex == waterIndex && upgrade.data.index == upgradeIndex);
    const domainValue = upgrade?.getMarbleBonus() ?? 0;

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
     tolerance: 0,
     context: description,
    });
   });
  });
 });

 describe('Total bonuses', () => {
  totalBonusCases.forEach(({ waterIndex, upgradeIndex, extractionKey, description }) => {
   it(`validates ${description}`, () => {
    const liveValue = getExtractedValue(extractionResults, extractionKey);
    const domainValue = hole.getFountainBonus(waterIndex, upgradeIndex);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
     tolerance: 0,
     context: description,
    });
   });
  });
 });
});
