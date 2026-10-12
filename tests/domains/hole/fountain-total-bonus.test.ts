/**
 * Hole Domain - Fountain bonus calculations
 *
 * Tests Fountain marble and total bonuses across all water types, zero and
 * non-zero upgrade levels, both marbleization branches, and varied factors.
 *
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'fountain-total-bonus-data.json';

const marbleBonusCases = [
 { waterIndex: 0, upgradeIndex: 8, extractionKey: 'fountain_marble_bonus_0_8', description: 'Money Back Guarantee marble multiplier before marbleization (no marble levels)' },
 { waterIndex: 0, upgradeIndex: 13, extractionKey: 'fountain_marble_bonus_0_13', description: 'Monumental Boost marble multiplier for Bravery bonuses' },
];

const totalBonusCases = [
 { waterIndex: 0, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_0_0', description: 'Yellow Water unlock and Fountain currency value' },
 { waterIndex: 0, upgradeIndex: 1, extractionKey: 'fountain_total_bonus_0_1', description: 'Currency Booster I increase to Fountain currency value' },
 { waterIndex: 0, upgradeIndex: 5, extractionKey: 'fountain_total_bonus_0_5', description: "Stackin' Silver increase to silver coin value" },
 { waterIndex: 0, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_0_8', description: 'Money Back Guarantee auto-collect value for coins at capacity' },
 { waterIndex: 0, upgradeIndex: 9, extractionKey: 'fountain_total_bonus_0_9', description: 'Fountain Filling coin generation when the Fountain fills' },
 { waterIndex: 0, upgradeIndex: 13, extractionKey: 'fountain_total_bonus_0_13', description: 'Monumental Boost multiplier to Bravery monument bonuses' },
 { waterIndex: 0, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_0_19', description: 'Mythril Transience increase to bronze, silver, and gold coin value' },
 { waterIndex: 1, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_1_0', description: 'Green Water unlock and Fountain currency value' },
 { waterIndex: 1, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_1_8', description: 'Royal Stacks chance and value for coins created when the Fountain fills' },
 { waterIndex: 1, upgradeIndex: 10, extractionKey: 'fountain_total_bonus_1_10', description: 'Marble Filling production of marble for upgrade marbleization' },
 { waterIndex: 1, upgradeIndex: 13, extractionKey: 'fountain_total_bonus_1_13', description: 'Judicial Boost multiplier to Justice monument bonuses' },
 { waterIndex: 1, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_1_19', description: 'Sharp Surrogate increase to dollar, credit, and treasury bill value' },
 { waterIndex: 2, upgradeIndex: 0, extractionKey: 'fountain_total_bonus_2_0', description: 'Red Water unlock and Fountain currency value' },
 { waterIndex: 2, upgradeIndex: 1, extractionKey: 'fountain_total_bonus_2_1', description: 'Currency Booster III increase to Fountain currency value' },
 { waterIndex: 2, upgradeIndex: 2, extractionKey: 'fountain_total_bonus_2_2', description: 'Moolahleluja unlock and Moolah Stack value' },
 { waterIndex: 2, upgradeIndex: 8, extractionKey: 'fountain_total_bonus_2_8', description: "Luck fo' REAL chance to make collected currency lucky" },
 { waterIndex: 2, upgradeIndex: 12, extractionKey: 'fountain_total_bonus_2_12', description: 'Rubber Ducky production from the Fountain bar' },
 { waterIndex: 2, upgradeIndex: 18, extractionKey: 'fountain_total_bonus_2_18', description: 'Bubba Forever permanent Meat Slice production rate' },
 { waterIndex: 2, upgradeIndex: 19, extractionKey: 'fountain_total_bonus_2_19', description: 'Rupie Monie increase to Moolah, Shilling, and Greane Stack value' },
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
    const domainValue = hole.fountain.upgrades.find(upgrade => upgrade.data.waterIndex == waterIndex && upgrade.data.index == upgradeIndex)!.getMarbleBonus();

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
