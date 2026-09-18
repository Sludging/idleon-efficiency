/**
 * Direct calculated inputs to Hat Rack premium-hat bonuses.
 * Minehead is compared through its owning domain, including a zero earned bonus.
 * Items samples compare unupgraded effects, not saved equipment stones.
 */
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';
import { Item } from '../../../data/domain/items';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const getCollectedItemEffect = (gameData: Map<string, any>, name: string, effect: string): number => {
  const item = (gameData.get('itemsData') as Item[]).find(item => item.internalName === name);
  if (!item) throw new Error(`Missing Hat Rack item definition ${name}`);
  const stat = item.itemStats.find(stat => stat.extra === effect);
  if (!stat) throw new Error(`Missing Hat Rack item effect ${name}: ${effect}`);
  return stat.getValue();
};

const parameterSpecs: Record<string, ParameterTestSpec> = {
  companion: {
    description: 'active Companion 31 Hat Rack multiplier contribution',
    extractionKey: 'hat_rack_companion_31',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 31),
  },
  event_shop: {
    description: 'Event Shop King of the Rack ownership before Hat Rack scaling',
    extractionKey: 'hat_rack_event_shop_30',
    domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(30)),
  },
  minehead: {
    description: 'Minehead bonus quantity contributing to the Hat Rack multiplier',
    extractionKey: 'hat_rack_minehead_21',
    domainExtractor: gameData => {
      const minehead = gameData.get('minehead') as Minehead & {
        getBonusFromIndex?: (index: number) => number;
      };
      if (typeof minehead?.getBonusFromIndex !== 'function') {
        throw new Error('MISSING DEPENDENCY CALCULATION - Minehead bonus quantity; game Minehead("BonusQTY", 21, 0) is not exposed by its owning domain');
      }
      return minehead.getBonusFromIndex(21);
    },
  },
  sushi: {
    description: 'Sushi Abalone Sashimi Hat Rack multiplier contribution',
    extractionKey: 'hat_rack_sushi_36',
    domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(36),
  },
  item_skill_efficiency: {
    description: 'deposited Funny Hat Skill Efficiency without equipped upgrades',
    extractionKey: 'hat_rack_item_hats76_skill_efficiency',
    domainExtractor: gameData => getCollectedItemEffect(gameData, 'EquipmentHats76', '% Skill Efficiency'),
  },
  item_drop_rate: {
    description: 'deposited Ice Cream Topper second unique effect Drop Rate',
    extractionKey: 'hat_rack_item_hats108_drop_rate',
    domainExtractor: gameData => getCollectedItemEffect(gameData, 'EquipmentHats108', '% Drop Rate'),
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
