import { Card } from '../../../data/domain/cards';
import type { Player } from '../../../data/domain/player';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { ClassIndex } from '../../../data/domain/talents';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { getStampBonusForKey, Stamp } from '../../../data/domain/world-1/stamps';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { Lab } from '../../../data/domain/world-4/lab';
import type { Family } from '../../../data/domain/family';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { Orion } from '../../../data/domain/world-1/orion';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { Guild } from '../../../data/domain/guild';
import type { Quests } from '../../../data/domain/quests';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const target = (data: Map<string, any>): Player => getTargetPlayer(data.get('players') as Player[]);

function secondTalentBonus(player: Player, index: number): number {
  const talent = player.getTalent(index);
  // Unallocated class talents contribute zero; selector 2 uses the prepared talent's second curve.
  if (!talent || talent.pointsSpent <= 0.5) return 0;
  return talent.getBonus(false, true);
}

function selectedSignBonus(player: Player, attribute: string, percent: boolean): number {
  // All-stat signs enter each attribute channel; flat and percentage signs remain separate.
  return player.starSigns.reduce((total, sign) => total + sign.bonuses
    .filter(bonus => bonus.percent === percent && (bonus.text === attribute || bonus.text.startsWith('All Stat')))
    .reduce((subtotal, bonus) => subtotal + sign.getBonus(bonus.text), 0), 0);
}

type SourceSpec = ParameterTestSpec & { resultsFile: string };

const parameterSpecs: SourceSpec[] = [
  {
    description: "Alchemy TotalSTR attribute contribution",
    extractionKey: "bubble_TotalSTR",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('TotalSTR', target(data)),
  },
  {
    description: "Alchemy TotalAGI attribute contribution",
    extractionKey: "bubble_TotalAGI",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('TotalAGI', target(data)),
  },
  {
    description: "Alchemy TotalWIS attribute contribution",
    extractionKey: "bubble_TotalWIS",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('TotalWIS', target(data)),
  },
  {
    description: "Alchemy TotalLUK attribute contribution",
    extractionKey: "bubble_TotalLUK",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('TotalLUK', target(data)),
  },
  {
    description: "Alchemy W4 attribute contribution",
    extractionKey: "bubble_W4",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('W4', target(data)),
  },
  {
    description: "Alchemy A4 attribute contribution",
    extractionKey: "bubble_A4",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('A4', target(data)),
  },
  {
    description: "Alchemy M4 attribute contribution",
    extractionKey: "bubble_M4",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('M4', target(data)),
  },
  {
    description: "Alchemy W8 attribute contribution",
    extractionKey: "tome_w8_final_bonus",
    resultsFile: "bubble-bonus-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('W8', target(data)),
  },
  {
    description: "Alchemy A9 attribute contribution",
    extractionKey: "tome_a9_final_bonus",
    resultsFile: "bubble-bonus-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('A9', target(data)),
  },
  {
    description: "Alchemy M9 attribute contribution",
    extractionKey: "tome_m9_final_bonus",
    resultsFile: "bubble-bonus-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('M9', target(data)),
  },
  {
    description: "Talent 10 attribute contribution",
    extractionKey: "talent_10",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(10, target(data).finalTalentInputs),
  },
  {
    description: "Talent 11 attribute contribution",
    extractionKey: "talent_11",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(11, target(data).finalTalentInputs),
  },
  {
    description: "Talent 12 attribute contribution",
    extractionKey: "talent_12",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(12, target(data).finalTalentInputs),
  },
  {
    description: "Talent 13 attribute contribution",
    extractionKey: "talent_13",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(13, target(data).finalTalentInputs),
  },
  {
    description: "Talent 98 attribute contribution",
    extractionKey: "talent_98",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(98, target(data).finalTalentInputs),
  },
  {
    description: "Talent 203 attribute contribution",
    extractionKey: "talent_203",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(203, target(data).finalTalentInputs),
  },
  {
    description: "Talent 278 attribute contribution",
    extractionKey: "talent_278",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(278, target(data).finalTalentInputs),
  },
  {
    description: "Talent 428 attribute contribution",
    extractionKey: "talent_428",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(428, target(data).finalTalentInputs),
  },
  {
    description: "Talent 459 attribute contribution",
    extractionKey: "talent_459",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(459, target(data).finalTalentInputs),
  },
  {
    description: "Talent 593 attribute contribution",
    extractionKey: "talent_593",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(593, target(data).finalTalentInputs),
  },
  {
    description: "Talent 23 attribute contribution",
    extractionKey: "talent_23",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(23, target(data).finalTalentInputs),
  },
  {
    description: "Talent 652 attribute contribution",
    extractionKey: "talent_652",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(652, target(data).finalTalentInputs),
  },
  {
    description: "Talent 618 attribute contribution",
    extractionKey: "talent_618",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(618, target(data).finalTalentInputs),
  },
  {
    description: "Talent 143 attribute contribution",
    extractionKey: "talent_143",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(143, target(data).finalTalentInputs),
  },
  {
    description: "Talent 368 attribute contribution",
    extractionKey: "talent_368",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(368, target(data).finalTalentInputs),
  },
  {
    description: "Talent 533 attribute contribution",
    extractionKey: "talent_533",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(533, target(data).finalTalentInputs),
  },
  {
    description: "Talent 653 attribute contribution",
    extractionKey: "talent_653",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).getTalentBonusAtInputs(653, target(data).finalTalentInputs),
  },
  {
    description: "Talent 142 second-curve flat attribute contribution",
    extractionKey: "talent_142_second",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => secondTalentBonus(target(data), 142),
  },
  {
    description: "Talent 367 second-curve flat attribute contribution",
    extractionKey: "talent_367_second",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => secondTalentBonus(target(data), 367),
  },
  {
    description: "Talent 532 second-curve flat attribute contribution",
    extractionKey: "talent_532_second",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => secondTalentBonus(target(data), 532),
  },
  {
    description: "Stamp BaseSTR attribute contribution",
    extractionKey: "stamp_BaseSTR",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseSTR'),
  },
  {
    description: "Stamp BaseAGI attribute contribution",
    extractionKey: "stamp_BaseAGI",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseAGI'),
  },
  {
    description: "Stamp BaseWIS attribute contribution",
    extractionKey: "stamp_BaseWIS",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseWIS'),
  },
  {
    description: "Stamp BaseLUK attribute contribution",
    extractionKey: "stamp_BaseLUK",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseLUK'),
  },
  {
    description: "Stamp BaseAllStat attribute contribution",
    extractionKey: "stamp_BaseAllStat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseAllStat'),
  },
  {
    description: "Stamp AllStatPct attribute contribution",
    extractionKey: "stamp_AllStatPct",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'AllStatPct'),
  },
  {
    description: "Warrior Family attribute contribution for recipient",
    extractionKey: "family_bonus_14",
    resultsFile: "family-class-bonus-data.json",
    domainExtractor: data => (data.get('family') as Family).getClassBonus(ClassIndex.Warrior)?.getBonus(target(data)) ?? 0,
  },
  {
    description: "Archer Family attribute contribution for recipient",
    extractionKey: "family_bonus_38",
    resultsFile: "family-class-bonus-data.json",
    domainExtractor: data => (data.get('family') as Family).getClassBonus(ClassIndex.Archer)?.getBonus(target(data)) ?? 0,
  },
  {
    description: "Mage Family attribute contribution for recipient",
    extractionKey: "family_bonus_62",
    resultsFile: "family-class-bonus-data.json",
    domainExtractor: data => (data.get('family') as Family).getClassBonus(ClassIndex.Mage)?.getBonus(target(data)) ?? 0,
  },
  {
    description: "Journeyman Family luck contribution for recipient",
    extractionKey: "family_bonus_4",
    resultsFile: "family-class-bonus-data.json",
    domainExtractor: data => (data.get('family') as Family).getClassBonus(ClassIndex.Journeyman)?.getBonus(target(data)) ?? 0,
  },
  {
    description: "Bubonic Conjuror Family all-stat contribution for recipient",
    extractionKey: "family_bonus_72",
    resultsFile: "family-class-bonus-data.json",
    domainExtractor: data => (data.get('family') as Family).getClassBonus(ClassIndex.Bubonic_Conjuror)?.getBonus(target(data)) ?? 0,
  },
  {
    description: "Selected Star Signs STR complete contribution",
    extractionKey: "sign_STR",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'STR', false),
  },
  {
    description: "Selected Star Signs pctSTR complete contribution",
    extractionKey: "sign_pctSTR",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'STR', true),
  },
  {
    description: "Selected Star Signs AGI complete contribution",
    extractionKey: "sign_AGI",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'AGI', false),
  },
  {
    description: "Selected Star Signs pctAGI complete contribution",
    extractionKey: "sign_pctAGI",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'AGI', true),
  },
  {
    description: "Selected Star Signs WIS complete contribution",
    extractionKey: "sign_WIS",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'WIS', false),
  },
  {
    description: "Selected Star Signs pctWIS complete contribution",
    extractionKey: "sign_pctWIS",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'WIS', true),
  },
  {
    description: "Selected Star Signs LUK complete contribution",
    extractionKey: "sign_LUK",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'LUK', false),
  },
  {
    description: "Selected Star Signs pctLUK complete contribution",
    extractionKey: "sign_pctLUK",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => selectedSignBonus(target(data), 'LUK', true),
  },
  {
    description: "Post Office 23b flat attribute contribution",
    extractionKey: "post_office_23b",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '23b' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Post Office 21b flat attribute contribution",
    extractionKey: "post_office_21b",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '21b' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Post Office 22b flat attribute contribution",
    extractionKey: "post_office_22b",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '22b' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Post Office 15c flat attribute contribution",
    extractionKey: "post_office_15c",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '15c' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Post Office LUK flat attribute contribution",
    extractionKey: "post_office_LUK",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === 'LUK' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Post Office 20a flat attribute contribution",
    extractionKey: "post_office_20a",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).postOffice.reduce((sum, box) => sum + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '20a' ? bonus.getBonus(box.level, index) : 0), 0), 0),
  },
  {
    description: "Prepared active and passive card effect 9 attribute contribution",
    extractionKey: "card_9",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => Card.GetTotalBonusForId([...new Set([...target(data).cardInfo!.equippedCards, ...target(data).cardInfo!.cards.filter(card => card.passive)])], 9),
  },
  {
    description: "Prepared active and passive card effect 7 attribute contribution",
    extractionKey: "card_7",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => Card.GetTotalBonusForId([...new Set([...target(data).cardInfo!.equippedCards, ...target(data).cardInfo!.cards.filter(card => card.passive)])], 7),
  },
  {
    description: "Prepared active and passive card effect 5 attribute contribution",
    extractionKey: "card_5",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => Card.GetTotalBonusForId([...new Set([...target(data).cardInfo!.equippedCards, ...target(data).cardInfo!.cards.filter(card => card.passive)])], 5),
  },
  {
    description: "Prepared active and passive card effect 2 attribute contribution",
    extractionKey: "card_2",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => Card.GetTotalBonusForId([...new Set([...target(data).cardInfo!.equippedCards, ...target(data).cardInfo!.cards.filter(card => card.passive)])], 2),
  },
  {
    description: "Prepared active and passive card effect 82 attribute contribution",
    extractionKey: "card_82",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => Card.GetTotalBonusForId([...new Set([...target(data).cardInfo!.equippedCards, ...target(data).cardInfo!.cards.filter(card => card.passive)])], 82),
  },
  {
    description: "Sigil 0 flat attribute contribution",
    extractionKey: "sigil_0",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('sigils') as Sigils).sigils[0].getBonus(),
  },
  {
    description: "Shiny pet 6 flat attribute contribution",
    extractionKey: "shiny_6",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 6)!.getBonus(),
  },
  {
    description: "Arcade 19 flat attribute contribution",
    extractionKey: "arcade_19",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('arcade') as Arcade).bonuses[19].getBonus(),
  },
  {
    description: "Shimmer investment 0 complete attribute contribution",
    extractionKey: "shimmer_bonus_0",
    resultsFile: "island-expeditions-shimmer-bonuses-data.json",
    domainExtractor: data => (data.get('islandExpeditions') as IslandExpeditions).getShimmerBonus(0),
  },
  {
    description: "Sigil 1 flat attribute contribution",
    extractionKey: "sigil_1",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('sigils') as Sigils).sigils[1].getBonus(),
  },
  {
    description: "Shiny pet 7 flat attribute contribution",
    extractionKey: "shiny_7",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 7)!.getBonus(),
  },
  {
    description: "Arcade 20 flat attribute contribution",
    extractionKey: "arcade_20",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('arcade') as Arcade).bonuses[20].getBonus(),
  },
  {
    description: "Shimmer investment 1 complete attribute contribution",
    extractionKey: "shimmer_bonus_1",
    resultsFile: "island-expeditions-shimmer-bonuses-data.json",
    domainExtractor: data => (data.get('islandExpeditions') as IslandExpeditions).getShimmerBonus(1),
  },
  {
    description: "Sigil 2 flat attribute contribution",
    extractionKey: "sigil_2",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('sigils') as Sigils).sigils[2].getBonus(),
  },
  {
    description: "Shiny pet 8 flat attribute contribution",
    extractionKey: "shiny_8",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 8)!.getBonus(),
  },
  {
    description: "Arcade 21 flat attribute contribution",
    extractionKey: "arcade_21",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('arcade') as Arcade).bonuses[21].getBonus(),
  },
  {
    description: "Shimmer investment 2 complete attribute contribution",
    extractionKey: "shimmer_bonus_2",
    resultsFile: "island-expeditions-shimmer-bonuses-data.json",
    domainExtractor: data => (data.get('islandExpeditions') as IslandExpeditions).getShimmerBonus(2),
  },
  {
    description: "Sigil 3 flat attribute contribution",
    extractionKey: "sigil_3",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('sigils') as Sigils).sigils[3].getBonus(),
  },
  {
    description: "Shiny pet 9 flat attribute contribution",
    extractionKey: "shiny_9",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 9)!.getBonus(),
  },
  {
    description: "Arcade 22 flat attribute contribution",
    extractionKey: "arcade_22",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('arcade') as Arcade).bonuses[22].getBonus(),
  },
  {
    description: "Shimmer investment 3 complete attribute contribution",
    extractionKey: "shimmer_bonus_3",
    resultsFile: "island-expeditions-shimmer-bonuses-data.json",
    domainExtractor: data => (data.get('islandExpeditions') as IslandExpeditions).getShimmerBonus(3),
  },
  {
    description: "Orion shared flat All Stat contribution",
    extractionKey: "global_bonus_5",
    resultsFile: "orion-global-bonus-data.json",
    domainExtractor: data => (data.get('orion') as Orion).getGlobalBonus(5),
  },
  {
    description: "Companion 8 active attribute contribution",
    extractionKey: "companion_8",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => getCompanionActiveBonus(data.get('companions') as Companion[], 8),
  },
  {
    description: "Companion 0 active attribute contribution",
    extractionKey: "companion_bonus_0",
    resultsFile: "research-grid-bonus-data.json",
    domainExtractor: data => getCompanionActiveBonus(data.get('companions') as Companion[], 0),
  },
  {
    description: "Unlocked pristine charm 4 attribute percentage",
    extractionKey: "pristine_4",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (() => { const charm = (data.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 4)!; return charm.unlocked ? charm.getBonus() : 0; })(),
  },
  {
    description: "Unlocked pristine charm 1 attribute percentage",
    extractionKey: "pristine_1",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (() => { const charm = (data.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 1)!; return charm.unlocked ? charm.getBonus() : 0; })(),
  },
  {
    description: "Unlocked pristine charm 10 attribute percentage",
    extractionKey: "pristine_10",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (() => { const charm = (data.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 10)!; return charm.unlocked ? charm.getBonus() : 0; })(),
  },
  {
    description: "Unlocked pristine charm 5 attribute percentage",
    extractionKey: "pristine_5",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (() => { const charm = (data.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 5)!; return charm.unlocked ? charm.getBonus() : 0; })(),
  },
  {
    description: "Selected ordinary Strength buff contribution",
    extractionKey: "buff_94",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).activeBuffs.find(talent => talent.skillIndex === 94)?.getBonus() ?? 0,
  },
  {
    description: "Account completed quest count for Quest Chungus",
    extractionKey: "quest_count",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('quests') as Quests).getTotalQuestsComplete(),
  },
  {
    description: "Cooking naturally empty Stat meal sum",
    extractionKey: "meal_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('cooking') as Cooking).getMealBonusForKey('Stat'),
  },
  {
    description: "Guild shared flat All Stat contribution",
    extractionKey: "guild_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('guild') as Guild).guildBonuses[1].getBonus(),
  },
  {
    description: "Alchemy vial All Stat percentage",
    extractionKey: "vial_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('alchemy') as Alchemy).getVialBonusForKey('AllStatPCT'),
  },
  {
    description: "Pocket Divinity Cosmo contribution",
    extractionKey: "hole_pocket_divinity",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('hole') as Hole).majiks.IdleonUpgrades.find(upgrade => upgrade.index === 21)!.getBonus(),
  },
  {
    description: "Sapphire Navette active All Stat percentage",
    extractionKey: "jewel_4_bonus",
    resultsFile: "lab-jewel-bonus-data.json",
    domainExtractor: data => (data.get('lab') as Lab).jewels[4].getBonus(),
  },
  {
    description: "Summoning victory All Stat percentage",
    extractionKey: "summoning_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('summoning') as Summoning).summonBonuses.find(bonus => bonus.data.bonusId === 19)!.getBonus(),
  },
  {
    description: "Sailing artifact All Stat percentage with tier modifiers",
    extractionKey: "sailing_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('sailing') as Sailing).artifacts[28].getBonus(),
  },
  {
    description: "Jelly obstruction 10 normal unlocked reward",
    extractionKey: "jelly_10",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('jellyOperator') as JellyOperator).getObstructionBonus(10),
  },
  {
    description: "Jelly obstruction 51 normal unlocked reward",
    extractionKey: "jelly_51",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('jellyOperator') as JellyOperator).getObstructionBonus(51),
  },
  {
    description: "Equipment StrengthFlat attribute contribution",
    extractionKey: "equipment_51",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.StrengthFlat),
  },
  {
    description: "Equipment AgilityFlat attribute contribution",
    extractionKey: "equipment_52",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.AgilityFlat),
  },
  {
    description: "Equipment WisdomFlat attribute contribution",
    extractionKey: "equipment_53",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.WisdomFlat),
  },
  {
    description: "Equipment LuckFlat attribute contribution",
    extractionKey: "equipment_54",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.LuckFlat),
  },
  {
    description: "Equipment Strength attribute contribution",
    extractionKey: "equipment_57",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.Strength),
  },
  {
    description: "Equipment Wisdom attribute contribution",
    extractionKey: "equipment_58",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => target(data).gear.getBonus(EquipmentBonus.Wisdom),
  },
  {
    description: "Land Rank upgrade All Stat percentage for the recipient",
    extractionKey: "farming_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => {
      const farming = data.get('farming') as Farming;
      return farming.landrankDatabase.getUpgradeBonusForPlayer(19, target(data));
    },
  },
  {
    description: "Current vote All Stat percentage",
    extractionKey: "votes_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    domainExtractor: data => (data.get('votes') as Votes).getCurrentBonus(2),
  },
  {
    description: "Marbiglass equipment set additive All Stat percentage",
    extractionKey: "marbiglass_all_stat",
    resultsFile: "player-attribute-sources-data.json",
    // Marbiglass supplies percentage points, not an equipment-set multiplier.
    domainExtractor: data => (data.get('equipmentSets') as EquipmentSets).getSetBonus('MARBIGLASS_SET'),
  },
];

describe('Player attribute source parameters — retained target character', () => {
  let gameData: Map<string, any>;
  const results = new Map<string, ExtractionResults>();

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
  });

  parameterSpecs.forEach(spec => {
    it(`matches ${spec.description}`, () => {
      if (!results.has(spec.resultsFile)) {
        const extracted = loadExtractionResults(spec.resultsFile);
        validateExtractionHealth(extracted);
        results.set(spec.resultsFile, extracted);
      }
      const expected = getExtractedValue(results.get(spec.resultsFile)!, spec.extractionKey);
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(expected, 0);
    });
  });
});
