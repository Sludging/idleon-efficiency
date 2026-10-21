import { Card } from '../../../data/domain/cards';
import type { Player } from '../../../data/domain/player';
import type { GoldenFood } from '../../../data/domain/golden-food';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { getStampBonusForKey, Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import { Shrine, ShrineConstants } from '../../../data/domain/world-3/construction/shrines';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { Bribe } from '../../../data/domain/world-1/bribes';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Family } from '../../../data/domain/family';
import { ClassIndex } from '../../../data/domain/talents';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import type { Equinox } from '../../../data/domain/world-3/equinox';
import type { Grimoire } from '../../../data/domain/grimoire';
import type { Tesseract } from '../../../data/domain/tesseract';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { CoralKid } from '../../../data/domain/world-7/coralKid';
import type { Rift } from '../../../data/domain/world-4/rift';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { Achievement } from '../../../data/domain/achievements';
import type { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import type { Compass } from '../../../data/domain/compass';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { EventShop } from '../../../data/domain/eventShop';

const extractionResultsName = 'player-health-data.json';

type ParameterSpec = {
  key: string;
  description: string;
  resultsFile?: 'player-attribute-sources-data.json';
  getValue: (gameData: Map<string, any>, player: Player) => number;
};

const parameterSpecs: ParameterSpec[] = [
  ...[37, 380, 383].map((index): ParameterSpec => ({
    key: `gold_food_achievement_${index}`,
    description: `achievement ${index} golden-food effectiveness unlock`,
    // AchieveStatus gives achievement 37 five points; the other two calls return one.
    getValue: (gameData) => (gameData.get('achievements') as Achievement[])[index].completed ? (index === 37 ? 5 : 1) : 0,
  })),
  {
    key: 'card_ruby_unlock',
    description: 'Rift Ruby Cards unlock used by owned card levels',
    getValue: (gameData) => Number((gameData.get('rift') as Rift).bonuses.find(bonus => bonus.name === 'Ruby Cards')!.active),
  },
  {
    key: 'card_six_star_unlock',
    description: 'Spelunking six-star unlock used by owned card levels',
    getValue: (gameData) => Number((gameData.get('spelunking') as Spelunking).tunnels[2].loreCompleted),
  },
  {
    key: 'vault_base_hp',
    description: 'Upgrade Vault base-HP stamp effectiveness',
    getValue: (gameData) => (gameData.get('upgradeVault') as UpgradeVault).getBonusForId(16),
  },
  {
    key: 'total_strength',
    description: 'total Strength used by the maximum HP power term',
    getValue: (_gameData, player) => player.stats.strength,
  },
  {
    key: 'total_wisdom',
    description: 'total Wisdom added to maximum MP',
    getValue: (_gameData, player) => player.stats.wisdom,
  },
  ...[
    { index: 0, effect: 'flat HP' },
    { index: 1, effect: 'flat MP' },
    { index: 642, effect: 'additional flat HP' },
    { index: 95, effect: 'Strength scaling for maximum HP' },
    { index: 92, effect: 'maximum HP percentage' },
    { index: 272, effect: 'maximum HP and MP percentage' },
    { index: 452, effect: 'maximum MP percentage' },
  ].map(({ index, effect }): ParameterSpec => ({
    key: `talent_${index}`,
    description: `the talent contribution to ${effect}`,
    getValue: (_gameData, player) => player.getTalentBonus(index),
  })),
  ...[
    { index: 1, effect: 'base HP' },
    { index: 3, effect: 'base MP' },
    { index: 8, effect: 'total HP percentage' },
    { index: 29, effect: 'total MP percentage' },
  ].map(({ index, effect }): ParameterSpec => ({
    key: `card_${index}`,
    description: `equipped-card ${effect}`,
    getValue: (_gameData, player) => Card.GetTotalBonusForId(player.cardInfo!.equippedCards, index),
  })),
  ...[
    { key: 'stamp_base_hp', bonusKey: 'BaseHP', effect: 'base HP' },
    { key: 'stamp_base_mp', bonusKey: 'BaseMP', effect: 'base MP' },
  ].map(({ key, bonusKey, effect }): ParameterSpec => ({
    key,
    description: `the stamp contribution to ${effect}`,
    getValue: (gameData) => getStampBonusForKey(gameData.get('stamps') as Stamp[][], bonusKey),
  })),
  {
    key: 'health_statue',
    description: 'the health statue contribution with target-character modifiers',
    getValue: (gameData, player) => {
      const statues = gameData.get('statues') as PlayerStatues[];
      const statue = statues[player.playerID].statues.find(candidate => candidate.index === 4);
      if (!statue) {
        throw new Error('Missing health statue record for ArbitraryCode("StatueBonusGiven4").');
      }
      return statue.getBonus(player);
    },
  },
  {
    key: 'hp_shrine',
    description: 'the HP shrine bonus on the target character map',
    getValue: (gameData, player) => {
      const shrines = gameData.get('shrines') as Shrine[];
      return shrines[ShrineConstants.HpDefShrine].getBonus(player.currentMapId);
    },
  },
  {
    key: 'equipment_hp',
    description: 'maximum HP percentage from equipment effects',
    getValue: (_gameData, player) => {
      return player.gear.getBonus(EquipmentBonus.MaxHp);
    },
  },
  {
    key: 'active_hp_penalty',
    description: 'the HP penalty only while the matching buff is active',
    // The game uses the first talent formula for this penalty, not its second formula.
    getValue: (_gameData, player) => player.activeBuffs.find(talent => talent.skillIndex === 108)?.getBonus() ?? 0,
  },
  ...[
    { bonusKey: 'baseHP', effect: 'flat HP' },
    { bonusKey: 'pctHP', effect: 'HP percentage' },
    { bonusKey: 'baseMP', effect: 'flat MP' },
    { bonusKey: 'pctMP', effect: 'MP percentage' },
  ].map(({ bonusKey, effect }): ParameterSpec => ({
    key: `post_office_${bonusKey}`,
    description: `the post-office contribution to ${effect}`,
    getValue: (_gameData, player) => player.postOffice.reduce((total, box) => {
      return total + box.bonuses.reduce((boxTotal, bonus, index) => {
        return boxTotal + (bonus.data.bonusKey === bonusKey ? bonus.getBonus(box.level, index) : 0);
      }, 0);
    }, 0),
  })),
  {
    key: 'star_sign_hp',
    description: 'total HP percentage from the target character star signs',
    getValue: (_gameData, player) => player.starSigns.reduce((total, sign) => total + sign.getBonus('Total HP'), 0),
  },
  {
    key: 'family_hp',
    description: 'the prepared Family HP contribution used by maximum HP',
    // Prepared Family keys use twice the class entry; slot 18 is Squire's HP bonus.
    getValue: (gameData, player) => (gameData.get('family') as Family).getClassBonus(ClassIndex.Squire)!.getBonus(player),
  },
  {
    key: 'secret_set',
    description: 'the Secret equipment-set golden-food percentage',
    // The game returns a percentage here; the default website API returns its multiplier.
    getValue: (gameData) => (gameData.get('equipmentSets') as EquipmentSets).getSetBonus('SECRET_SET', true),
  },
  ...[174, 48, 155].map((index): ParameterSpec => ({
    key: `companion_${index}`,
    description: `companion ${index} golden-food effectiveness`,
    getValue: (gameData) => getCompanionActiveBonus(gameData.get('companions') as Companion[], index),
  })),
  {
    key: 'equipment_gold_food',
    description: 'golden-food effectiveness from equipment',
    getValue: (_gameData, player) => {
      return player.gear.getBonus(EquipmentBonus.GoldFoodEffect);
    },
  },
  {
    key: 'talent_99',
    description: 'the talent contribution to golden-food effectiveness',
    getValue: (_gameData, player) => player.getTalentBonus(99),
  },
  {
    key: 'stamp_gold_food',
    description: 'golden-food effectiveness from stamps',
    getValue: (gameData) => getStampBonusForKey(gameData.get('stamps') as Stamp[][], 'GFood'),
  },
  {
    key: 'bubble_gold_food',
    description: 'the target character golden-food Alchemy contribution',
    getValue: (gameData, player) => (gameData.get('alchemy') as Alchemy).getBubbleBonusForKey('GFoodz', player),
  },
  {
    key: 'sigil_gold_food',
    description: 'golden-food effectiveness from the matching sigil',
    getValue: (gameData) => (gameData.get('sigils') as Sigils).sigils[14].getBonus(),
  },
  {
    key: 'meal_gold_food',
    description: 'golden-food effectiveness from Cooking meals',
    getValue: (gameData) => (gameData.get('cooking') as Cooking).getMealBonusForKey('zGoldFood'),
  },
  {
    key: 'star_sign_gold_food',
    description: 'golden-food effectiveness from the target character star sign',
    getValue: (_gameData, player) => player.starSigns.find(sign => sign.name === 'Beanbie Major')?.getBonus('Golden Food') ?? 0,
  },
  {
    key: 'bribe_gold_food',
    description: 'the purchased golden-food bribe contribution',
    getValue: (gameData) => (gameData.get('bribes') as Bribe[]).find(bribe => bribe.bribeIndex === 36)!.getBonus(),
  },
  {
    key: 'pristine_gold_food',
    description: 'golden-food effectiveness from the unlocked pristine charm',
    getValue: (gameData) => {
      const charm = (gameData.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 14)!;
      return charm.unlocked ? charm.data.x1 : 0;
    },
  },
  {
    key: 'vote_gold_food',
    description: 'golden-food effectiveness from current Voting',
    getValue: (gameData) => (gameData.get('votes') as Votes).getCurrentBonus(26),
  },
  {
    key: 'legend_gold_food',
    description: 'golden-food effectiveness from the Legend Talent',
    getValue: (gameData) => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(25),
  },
  {
    key: 'vault_gold_food',
    description: 'golden-food effectiveness from the Upgrade Vault',
    getValue: (gameData) => (gameData.get('upgradeVault') as UpgradeVault).getBonusForId(86),
  },
  ...[10, 51].map((index): ParameterSpec => ({
    key: `jelly_${index}`,
    description: `golden-food effectiveness from Jelly obstruction ${index}`,
    resultsFile: 'player-attribute-sources-data.json',
    getValue: (gameData) => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(index),
  })),
  {
    key: 'family_gold_food',
    description: 'Family golden-food effectiveness',
    // Slot 66 is Shaman's account-candidate maximum with the recipient's Family Guy context.
    getValue: (gameData, player) => (gameData.get('family') as Family).getClassBonus(ClassIndex.Shaman)!.getBonus(player),
  },
  ...[
    { key: 'shrine_card_level', cardID: 'Boss3B', description: 'the Chaotic Chizoar card level used by shrine effects' },
    { key: 'card_level_cropfallEvent1', cardID: 'cropfallEvent1', description: 'the Crop Fall event card level used by golden foods' },
    { key: 'card_level_anni5Event1', cardID: 'anni5Event1', description: 'the fifth-anniversary card level used by golden foods' },
  ].map(({ key, cardID, description }): ParameterSpec => ({
    key,
    description,
    getValue: (gameData) => {
      const card = (gameData.get('cards') as Card[]).find(card => card.id === cardID)!;
      return card.getLevels();
    },
  })),
  {
    key: 'deathbringer_gold_food',
    description: 'the account Death Bringer golden-food contribution',
    getValue: (gameData, player) => (gameData.get('goldenFood') as GoldenFood).getDeathBringerBonus(player),
  },
  {
    key: 'exalted_stamp_bonus',
    description: 'complete exalted stamp percentage bonus',
    getValue: (gameData) => {
      const compass = gameData.get('compass') as Compass;
      return compass.getExaltedStampBonus();
    },
  },
  {
    key: 'exalted_atom_bonus',
    description: 'Collider percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('collider') as AtomCollider).atoms[12].getBonus(),
  },
  {
    key: 'exalted_pristine_bonus',
    description: 'unlocked Pristine Charm percentage bonus for exalted stamps',
    getValue: (gameData) => {
      const charm = (gameData.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 20)!;
      return charm.unlocked ? charm.data.x1 : 0;
    },
  },
  {
    key: 'exalted_compass_bonus',
    description: 'Compass upgrade percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('compass') as Compass).getUpgradeBonus(76),
  },
  {
    key: 'exalted_emperor_set',
    description: 'permanently owned Emperor set percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('equipmentSets') as EquipmentSets).getSetBonus('EMPEROR_SET', true),
  },
  {
    key: 'exalted_event_shop_owned',
    description: 'Event Shop ownership used by exalted stamp bonuses',
    getValue: (gameData) => Number((gameData.get('eventShop') as EventShop).isBonusOwned(18)),
  },
  {
    key: 'exalted_palette_bonus',
    description: 'Gaming Palette percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('gaming') as Gaming).getPaletteBonus(23),
  },
  {
    key: 'exalted_exotic_market_bonus',
    description: 'Farming Exotic Market percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('farming') as Farming).getExoticMarketBonusValue(49),
  },
  {
    key: 'exalted_legend_bonus',
    description: 'Legend Talent percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(36),
  },
  {
    key: 'exalted_sushi_bonus',
    description: 'Sushi unlock percentage bonus for exalted stamps',
    getValue: (gameData) => (gameData.get('sushi') as SushiStation).getBonusFromIndex(17),
  },
  {
    key: 'exalted_jelly_bonus',
    description: 'Jelly Operator quantity used by exalted stamp bonuses',
    getValue: (gameData) => {
      const jelly = gameData.get('jellyOperator') as JellyOperator;
      return jelly.getObstructionBonus(50);
    },
  },
];

// Shared HP/MP inputs stay in the MP gate so HP-only failures cannot block normal MP.
const mpParameterKeys: Record<string, true> = {
  total_wisdom: true, talent_1: true, talent_272: true, talent_452: true,
  card_3: true, card_29: true, stamp_base_mp: true,
  post_office_baseMP: true, post_office_pctMP: true,
};

describe.each([
  ['MP', parameterSpecs.filter(spec => mpParameterKeys[spec.key])],
  ['HP-only', parameterSpecs.filter(spec => !mpParameterKeys[spec.key])],
] as const)('Player maximum %s direct parameters', (_aspect, specs) => {
  let gameData: Map<string, any>;
  let player: Player;
  let extractionResults: ExtractionResults;
  let attributeResults: ExtractionResults;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    attributeResults = loadExtractionResults('player-attribute-sources-data.json');
    validateExtractionHealth(attributeResults);
  });

  specs.forEach(({ key, description, getValue, resultsFile }) => {
    it(`matches ${description}`, () => {
      const expected = getExtractedValue(resultsFile ? attributeResults : extractionResults, key);
      expect(getValue(gameData, player)).toMatchLiveGame(expected, 0);
    });
  });

  if (_aspect === 'HP-only') {
    it('matches the BaseHP bubble contribution with source-defined absent-key semantics', () => {
      const oracle = extractionResults.extractions.alchemy_health_context?.result;
      if (!oracle) {
        throw new Error('Missing actual Alchemy health context for the BaseHP direct comparison.');
      }
      const actual = (gameData.get('alchemy') as Alchemy).getBubbleBonusForKey('BaseHP', player);
      expect(actual).toMatchLiveGame(oracle.early.baseHP, 0);
    });
  }
});

// Compare actual producers, not an invented account-wide all-talent getter.
const alchemyManaParameterSpecs: ParameterSpec[] = [
  {
    key: 'baseMP', description: 'the BaseMP bubble contribution available during Alchemy preparation',
    // The delivered map has no BaseMP entry; the existing bubble lookup also returns zero.
    getValue: (gameData, player) => (gameData.get('alchemy') as Alchemy).getBubbleBonusForKey('BaseMP', player),
  },
  ...parameterSpecs.filter(spec => mpParameterKeys[spec.key] && spec.key !== 'talent_1').map(spec => ({
    ...spec,
    key: ({
      total_wisdom: 'wisdom', talent_272: 'talent272', talent_452: 'talent452',
      card_3: 'card3', card_29: 'card29', stamp_base_mp: 'stampBaseMP',
      post_office_baseMP: 'boxBaseMP', post_office_pctMP: 'boxPercentMP',
    } as Record<string, string>)[spec.key],
  })),
  ...[149, 374, 539].map(index => ({
    key: `talent${index}`,
    description: `elite talent ${index} contribution to all-talent levels`,
    getValue: (_gameData: Map<string, any>, player: Player) => player.getTalentBonus(index),
  })),
  {
    key: 'familyTalentLevels', description: 'Elemental Sorcerer Family talent-level bonus before rounding',
    getValue: (gameData, player) => (gameData.get('family') as Family).getClassBonus(ClassIndex.Elemental_Sorcerer)!.getBonus(player),
  },
  {
    key: 'companionTalentLevels', description: 'active Rift Slug talent-level bonus',
    getValue: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 1),
  },
  {
    key: 'coralKidMinorLinkPercent', description: 'Coral Kid percentage applied to the early minor-link bonus',
    getValue: gameData => (gameData.get('coralKid') as CoralKid).getBonusFromIndex(3),
  },
  {
    key: 'equinoxTalentLevels', description: 'Equinox talent-level bonus',
    getValue: gameData => (gameData.get('equinox') as Equinox).upgrades[10].getBonus(),
  },
  {
    key: 'grimoireTalentLevels', description: 'Grimoire talent-level bonus',
    getValue: gameData => (gameData.get('grimoire') as Grimoire).getUpgradeBonus(39),
  },
  {
    key: 'equipmentTalentLevels', description: 'Kattlekruk equipment-set talent-level bonus',
    getValue: (gameData) => (gameData.get('equipmentSets') as EquipmentSets).getSetBonus('KATTLEKRUK_SET'),
  },
  {
    key: 'tesseractTalentLevels', description: 'Tesseract talent-level bonus before the game cap',
    getValue: gameData => (gameData.get('tesseract') as Tesseract).getUpgradeBonus(57),
  },
  {
    key: 'gamingTalentLevelsUnlocked', description: 'Gaming Super Bit talent-level unlock',
    getValue: gameData => (gameData.get('gaming') as Gaming).isSuperbitPurchased(47) ? 1 : 0,
  },
  {
    key: 'superTalentLevels', description: 'Legend Talent super-talent levels before membership selection',
    getValue: gameData => (gameData.get('legendTalents') as LegendTalents).superTalentBonusLevels,
  },
];

describe('Player Alchemy-preparation mana direct parameters', () => {
  let gameData: Map<string, any>;
  let player: Player;
  let oracle: { early: Record<string, number>; final: Record<string, number> };

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    const results = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(results);
    const capture = results.extractions.alchemy_mana_context;
    if (!capture) {
      throw new Error('Missing alchemy_mana_context extraction: capture TalentCalc(-2) before testing its MP inputs.');
    }
    oracle = capture.result;
  });

  alchemyManaParameterSpecs.forEach(({ key, description, getValue }) => {
    it(`matches ${description} during Alchemy preparation`, () => {
      expect(getValue(gameData, player)).toMatchLiveGame(oracle.early[key], 0);
    });
  });

  it('matches final minor-link talent levels before deriving the Alchemy context', () => {
    const divinity = gameData.get('divinity') as Divinity;
    // Minor index 2 selects god 1. DivinityGod already maps its passive maximum to Nobisect's record.
    expect(divinity.gods[1].getMinorLinkBonus(player)).toMatchLiveGame(oracle.final.divinityTalentLevels, 0);
  });
});
