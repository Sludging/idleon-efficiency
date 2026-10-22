import { Minehead, MineheadOpponent } from '../../../data/domain/world-7/minehead';
import {
 normalizeExtractedValue,
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'minehead-data.json';

const getOpponent = (minehead: Minehead, index: number): MineheadOpponent => {
 const opponent = minehead.opponents.find(candidate => candidate.index === index);
 if (!opponent) {
  throw new Error(`Minehead opponent ${index} is not present in the initialized domain`);
 }
 return opponent;
};
const getUpgrade = (minehead: Minehead, index: number) => {
 const upgrade = minehead.upgrades.find(candidate => candidate.index === index);
 if (!upgrade) {
  throw new Error(`Minehead upgrade ${index} is not present in the initialized domain`);
 }
 return upgrade;
};

describe('Minehead Domain - overview and opponents', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let minehead: Minehead;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  minehead = gameData.get('minehead') as Minehead;
 });

 it('matches the saved Mine Currency balance from the genuine account save', () => {
  const researchData = JSON.parse(loadTestSave(saveName).get('Research') as string) as number[][];
  expect(minehead.currency).toMatchLiveGameWithDetails(researchData[7][5], {
   tolerance: 0,
   context: 'Saved Mine Currency balance',
  });
 });

 it('matches the parsed remaining attempts to the genuine account save', () => {
  const researchData = JSON.parse(loadTestSave(saveName).get('Research') as string) as number[][];
  expect(minehead.remainingDailyAttempts).toBe(researchData[7][8]);
 });
 it('matches daily tries, maximum lives, base damage, and native currency gain', () => {
  expect(minehead.dailyTries).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'daily_tries'), {
   tolerance: 0,
   context: 'Minehead daily tries allowance',
  });
  expect(minehead.maxLives).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'max_lives'), {
   tolerance: 0,
   context: 'Minehead maximum lives',
  });
  expect(minehead.baseDamage).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'base_damage'), {
   tolerance: 0,
   context: 'Minehead base damage multiplier',
  });
  expect(minehead.currencyGain).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'currency_gain'), {
   tolerance: 0,
   context: 'Mine Currency gained per hour',
  });
 });
it('matches the multiplier-tile damage value shown in upgrade description', () => {
 const upgrade = getUpgrade(minehead, 12);
 const nativeValue = getExtractedValue(extractionResults, 'minehead_description_multiplier_tile');

 expect(upgrade.getDescriptionValue(minehead)).toMatchLiveGameWithDetails(nativeValue, {
  tolerance: 0,
  context: 'Multiplier Madness description multiplier for genuine saved quantity',
 });
});

 it('matches the saved opponents beaten count', () => {
  expect(minehead.getOpponentsDefeated()).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'opponents_beaten'), {
   tolerance: 0,
   context: 'Saved Minehead opponents beaten count',
  });
 });

 it.each([0, 9, 17])('matches opponent %i maximum HP and Depth Charges', (index) => {
  const opponent = getOpponent(minehead, index);
  const nativeMaximumHp = normalizeExtractedValue(
   extractionResults.extractions.minehead_opponent_maximum_hp.result[index],
  );
  const nativeDepthCharges = normalizeExtractedValue(
   extractionResults.extractions.minehead_opponent_depth_charges.result[index],
  );
  expect(opponent.maximumHp).toMatchLiveGameWithDetails(nativeMaximumHp, {
   tolerance: 0,
   context: `Minehead opponent ${index} maximum HP`,
  });
  expect(opponent.depthCharges).toMatchLiveGameWithDetails(nativeDepthCharges, {
   tolerance: 0,
   context: `Minehead opponent ${index} Depth Charges`,
  });
 });


});
