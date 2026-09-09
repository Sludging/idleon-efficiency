/**
 * SkillStats AllEfficiencies owner-domain dependency validation.
 *
 * These comparisons isolate the producer values consumed by the delivered
 * SkillStats("AllEfficiencies") formula. Missing owner APIs intentionally
 * throw so their prerequisites remain visible instead of being duplicated in
 * Skilling.
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Player } from '../../../data/domain/player';
import { Card } from '../../../data/domain/cards';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Prayer } from '../../../data/domain/world-3/prayers';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Guild } from '../../../data/domain/guild';
import { Companion, getCompanionBonus } from '../../../data/domain/companions';
import { Quests } from '../../../data/domain/quests';

const saveName = 'latest';
const extractionResultsName = 'skill-stats-all-efficiencies-data.json';

const getPlayer0 = (gameData: Map<string, any>): Player => {
  const player = (gameData.get('players') as Player[])[0];
  if (!player) {
    throw new Error('Player 0 not found in save data');
  }
  return player;
};

const missingOwnerApi = (signature: string): never => {
  throw new Error(`MISSING OWNER API - ${signature} is not exposed by its owning domain`);
};

const parameterSpecs: Record<string, ParameterTestSpec> = {
  all_eff_family_bonus_42: {
    description: 'Family bonus quantity 42',
    extractionKey: 'all_eff_family_bonus_42',
    domainExtractor: () =>  missingOwnerApi('FamBonusQTYs[42]'),
  },
  all_eff_etc_bonus_48: {
    description: 'Player 0 equipment EtcBonuses(48) / Skill Efficiency',
    extractionKey: 'all_eff_etc_bonus_48',
    domainExtractor: (gameData) => getPlayer0(gameData).getMiscBonusFromGear('Skill Efficiency'),
  },
  all_eff_vial_6_skill_eff: {
    description: 'Alchemy 6SkillEff vial bonus',
    extractionKey: 'all_eff_vial_6_skill_eff',
    domainExtractor: (gameData) => (gameData.get('alchemy') as Alchemy).getVialBonusForKey('6SkillEff'),
  },
  all_eff_artifact_15: {
    description: 'Sailing artifact 15 bonus',
    extractionKey: 'all_eff_artifact_15',
    domainExtractor: (gameData) => (gameData.get('sailing') as Sailing).artifacts[15].getBonus(),
  },
  all_eff_total_quests_complete: {
    description: 'TotalQuestsComplete used by the Talent 617 cap',
    extractionKey: 'all_eff_total_quests_complete',
    domainExtractor: (gameData) => (gameData.get('quests') as Quests).getTotalQuestsComplete(),
  },
  all_eff_talent_617: {
    description: 'Player 0 Talent 617 bonus',
    extractionKey: 'all_eff_talent_617',
    domainExtractor: (gameData) => getPlayer0(gameData).getTalentBonus(617),
  },
  all_eff_meal_seff: {
    description: 'Cooking MealBonus("Seff")',
    extractionKey: 'all_eff_meal_seff',
    domainExtractor: (gameData) => (gameData.get('cooking') as Cooking).getMealBonusForKey('Seff'),
  },
  all_eff_talent_646: {
    description: 'Player 0 Talent 646 bonus',
    extractionKey: 'all_eff_talent_646',
    domainExtractor: (gameData) => getPlayer0(gameData).getTalentBonus(646),
  },
  all_eff_tome_bonus_1: {
    description: 'TomeBonus(1, 0)',
    extractionKey: 'all_eff_tome_bonus_1',
    domainExtractor: () => missingOwnerApi('Summoning("TomeBonus", 1, 0)'),
  },
  all_eff_palette_10: {
    description: 'Gaming PaletteBonus(10, 0)',
    extractionKey: 'all_eff_palette_10',
    domainExtractor: (gameData) => (gameData.get('gaming') as Gaming).getPaletteBonus(10),
  },
  all_eff_chip_toteff: {
    description: 'Lab chipBonuses("toteff")',
    extractionKey: 'all_eff_chip_toteff',
    domainExtractor: () => missingOwnerApi('chipBonuses("toteff")'),
  },
  all_eff_card_lv_crystal4: {
    description: 'CardLv("Crystal4")',
    extractionKey: 'all_eff_card_lv_crystal4',
    domainExtractor: (gameData) => {
      const cards = gameData.get('cards') as Card[];
      return cards.find((card) => card.id === 'Crystal4')?.getLevels() ?? 0;
    },
  },
  all_eff_friend_bonus_stat_2: {
    description: 'Thingies FriendBonusStatz(2, 0)',
    extractionKey: 'all_eff_friend_bonus_stat_2',
    domainExtractor: () => missingOwnerApi('Thingies("FriendBonusStatz", 2, 0)'),
  },
  all_eff_rift_skill_etc_2: {
    description: 'RiftSkillETC(2) all-skill-efficiency total',
    extractionKey: 'all_eff_rift_skill_etc_2',
    domainExtractor: (gameData) => {
      const rift = gameData.get('rift') as Rift;
      const skillMastery = rift.bonuses.find((bonus) => bonus.name === 'Skill Mastery') as SkillMastery | undefined;
      if (!skillMastery) {
        throw new Error('Skill Mastery owner calculation is missing from Rift domain');
      }
      return skillMastery.getTotalBonusByIndex(4);
    },
  },
  all_eff_hole_b_upg_49_15: {
    description: 'Hole B_UPG(49, 15)',
    extractionKey: 'all_eff_hole_b_upg_49_15',
    domainExtractor: (gameData) => (gameData.get('hole') as Hole).getSchematicBonus(49, 15),
  },
  all_eff_shimmer_multiplier: {
    description: 'Dreamstuff AllShimmerBonuses(0)',
    extractionKey: 'all_eff_shimmer_multiplier',
    domainExtractor: () => missingOwnerApi('Dreamstuff("AllShimmerBonuses", 0)'),
  },
  all_eff_card_bonus_84: {
    description: 'CardBonusREAL(84)',
    extractionKey: 'all_eff_card_bonus_84',
    domainExtractor: (gameData) => {
      const player0cards = getPlayer0(gameData).cardInfo?.equippedCards ?? [];
      return Card.GetTotalBonusForId(player0cards, 84);
    }
  },
  all_eff_companion_5: {
    description: 'Companions(5) bonus',
    extractionKey: 'all_eff_companion_5',
    domainExtractor: (gameData) => getCompanionBonus(gameData.get('companions') as Companion[], 5),
  },
  all_eff_win_bonus_14: {
    description: 'Summoning WinBonus(14, 0)',
    extractionKey: 'all_eff_win_bonus_14',
    domainExtractor: (gameData) => (gameData.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(14),
  },
  all_eff_guild_bonus_6: {
    description: 'GuildBonuses(6)',
    extractionKey: 'all_eff_guild_bonus_6',
    domainExtractor: (gameData) => (gameData.get('guild') as Guild).guildBonuses.find((bonus) => bonus.index === 6)?.getBonus() ?? 0,
  },
  all_eff_card_set_2: {
    description: 'Player 0 CardSetBonuses(0, "2")',
    extractionKey: 'all_eff_card_set_2',
    domainExtractor: (gameData) => getPlayer0(gameData).cardInfo?.getBonusForId(2) ?? 0,
  },
  all_eff_prayer_1_bonus: {
    description: 'prayersReal(1, 0) bonus',
    extractionKey: 'all_eff_prayer_1_bonus',
    domainExtractor: (gameData) => {
      const prayer1bonus = (gameData.get('prayers') as Prayer[]).find((prayer) => prayer.index === 1)?.getBonus() ?? 0;
      return getPlayer0(gameData).activePrayers.includes(1) ? prayer1bonus : 0;
    }
  },
  all_eff_buff_40_2: {
    description: 'Player 0 GetBuffBonuses(40, 2) Maestro Transfusion efficiency penalty',
    extractionKey: 'all_eff_buff_40_2',
    domainExtractor: (gameData) => getPlayer0(gameData).activeBuffs.find((talent) => talent.skillIndex === 40)?.getBonus(false, true) ?? 0,
  },
  all_eff_prayer_17_curse: {
    description: 'prayersReal(17, 1) curse',
    extractionKey: 'all_eff_prayer_17_curse',
    domainExtractor: (gameData) => {
      const prayer17curse = (gameData.get('prayers') as Prayer[]).find((prayer) => prayer.index === 17)?.getCurse() ?? 0;
      return getPlayer0(gameData).activePrayers.includes(17) ? prayer17curse : 0;
    }
  },
};

describe('SkillStats Domain - AllEfficiencies - Owner Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
