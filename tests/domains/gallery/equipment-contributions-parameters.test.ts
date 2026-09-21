import { Card } from '../../../data/domain/cards';
import { Companion, getCompanionActiveBonus, isCompanionLevelTwo } from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';
import { Item } from '../../../data/domain/items';
import { Player } from '../../../data/domain/player';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { KillRoy } from '../../../data/domain/world-2/killroy';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { getTargetPlayer } from '../../utils/target-player';

const getCollectedItemEffect = (gameData: Map<string, any>, name: string, effect: string): number => {
  const item = (gameData.get('itemsData') as Item[]).find(item => item.internalName === name);
  if (!item) throw new Error(`Missing Gallery item definition ${name}`);
  const stat = item.itemStats.find(stat => stat.extra === effect);
  if (!stat) throw new Error(`Missing Gallery item effect ${name}: ${effect}`);
  return stat.getValue();
};

const parameterSpecs: Record<string, ParameterTestSpec> = {
  trophy_chip: {
    description: 'target player trophy chip contribution to Gallery scaling',
    extractionKey: 'gallery_chip_troph',
    domainExtractor: gameData => getTargetPlayer(gameData.get('players') as Player[]).getChipBonus('troph'),
  },
  clamworks_podiums: {
    description: 'Clamworks promotion 0 enabling improved podiums',
    extractionKey: 'gallery_clamworks_0',
    domainExtractor: gameData => Number((gameData.get('clamworks') as Clamworks).isBonusUnlocked(0)),
  },
  clamworks_scaling: {
    description: 'Clamworks promotion 7 enabling Gallery scaling',
    extractionKey: 'gallery_clamworks_7',
    domainExtractor: gameData => Number((gameData.get('clamworks') as Clamworks).isBonusUnlocked(7)),
  },
  killroy: {
    description: 'Killroy bonus 3 before Gallery podium and multiplier caps',
    extractionKey: 'gallery_killroy_3',
    domainExtractor: gameData => (gameData.get('killroy') as KillRoy).podiumsOwnedLv2,
  },
  alchemy: {
    description: 'Alchemy Y13 before the Gallery cap',
    extractionKey: 'gallery_alchemy_y13',
    domainExtractor: gameData => (gameData.get('alchemy') as Alchemy).getBubbleBonusForKey('Y13'),
  },
  card: {
    description: 'w7a11 card level used by Gallery scaling',
    extractionKey: 'gallery_card_w7a11',
    domainExtractor: gameData => {
      const card = (gameData.get('cards') as Card[]).find(card => card.id === 'w7a11');
      if (!card) throw new Error('Missing w7a11 card definition for Gallery dependency RunCodeOfTypeXforThingY("CardLv", "w7a11")');
      // CardLv counts an owned zero-star card as level one.
      return card.count > 0 ? card.getLevels() + 1 : 0;
    },
  },
  companion_28: {
    description: 'companion 28 contribution to highest-grade podiums',
    extractionKey: 'gallery_companion_28',
    // The game's companion bonus map chooses the evolved bonus when available.
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 28),
  },
  companion_28_evolution: {
    description: 'companion 28 evolution unlocking another highest-grade podium',
    extractionKey: 'gallery_companion_evolution_28',
    domainExtractor: gameData => isCompanionLevelTwo(gameData.get('companions') as Companion[], 28),
  },
  companion_42: {
    description: 'companion 42 contribution to improved podiums',
    extractionKey: 'gallery_companion_42',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 42),
  },
  companion_49: {
    description: 'companion 49 Gallery scaling bonus',
    extractionKey: 'gallery_companion_49',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 49),
  },
  sushi: {
    description: 'Sushi bonus 54 Gallery scaling contribution',
    extractionKey: 'gallery_sushi_54',
    domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(54),
  },
  legend: {
    description: 'Legend talent 9 improved podium contribution',
    extractionKey: 'gallery_legend_9',
    domainExtractor: gameData => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(9),
  },
  event_shop: {
    description: 'Event Shop 29 highest-grade podium unlock',
    extractionKey: 'gallery_event_shop_29',
    domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(29)),
  },
  trophy_item_effect: {
    description: 'deposited Trophy16 Skill Efficiency effect without equipped upgrades',
    extractionKey: 'gallery_item_trophy16_skill_efficiency',
    domainExtractor: gameData => getCollectedItemEffect(gameData, 'Trophy16', '% Skill Efficiency'),
  },
  nametag_item_effect: {
    description: 'deposited Nametag3 Drop Rate effect without equipped upgrades',
    extractionKey: 'gallery_item_nametag3_drop_rate',
    domainExtractor: gameData => getCollectedItemEffect(gameData, 'EquipmentNametag3', '% Drop Rate'),
  },
  alternate_nametag_item_effect: {
    description: 'nametag index 6 alternate definition Fishing XP effect',
    extractionKey: 'gallery_item_nametag6b_fishing_xp',
    domainExtractor: gameData => getCollectedItemEffect(gameData, 'EquipmentNametag6b', '% Fishing Xp Gain'),
  },
};

describe('Gallery Domain - Equipment Contributions - Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('gallery-equipment-contributions-data.json');
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
