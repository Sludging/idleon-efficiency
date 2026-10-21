
import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';

const saveName = 'latest';
const extractionResultsName = 'zenith-market-data.json';

describe('ZenithMarket Bonus Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let zenithMarket: ZenithMarket;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  zenithMarket = gameData.get("zenithMarket") as ZenithMarket;
 });

 describe('Market bonuses', () => {
  it.each(Array.from({ length: 11 }, (_, index) => index))('validates upgrade %i current bonus', (index) => {
   const liveBonus = getExtractedValue(extractionResults, `zenith_market_${index}_bonus`);
   const domainBonus = zenithMarket.getBonusForId(index);

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

});
