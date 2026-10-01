/**
 * Direct calculated inputs to Hat Rack's Bonus Multi: Companion, Event Shop,
 * Minehead, and Sushi terms added to the deposited-hat count.
 */
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  companion: {
    description: 'Pet2 companion contribution to the Hat Rack Bonus Multi',
    extractionKey: 'hat_rack_companion_31',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 31),
  },
  event_shop: {
    description: 'King of the Rack Event Shop ownership adds 10% to the Hat Rack Bonus Multi',
    extractionKey: 'hat_rack_event_shop_30',
    domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(30)),
  },
  minehead: {
    description: 'Brainhead Minehead bonus increases the Hat Rack Bonus Multi',
    extractionKey: 'hat_rack_minehead_21',
    domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(21),
  },
  sushi: {
    description: 'Wholesale Pricing Sushi upgrade bonus value contributing to the Hat Rack Bonus Multi',
    extractionKey: 'hat_rack_sushi_36',
    domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(36),
  },
};

describe('Hat Rack Domain - Premium Hat Bonuses - Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('hat-rack-premium-hat-bonuses-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
