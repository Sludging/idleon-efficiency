import { Card } from '../../../data/domain/cards';
import { getCompanionActiveBonus, type Companion } from '../../../data/domain/companions';
import { Dungeons, PassiveType } from '../../../data/domain/dungeons';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Bribe } from '../../../data/domain/world-1/bribes';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Poppy } from '../../../data/domain/world-2/poppy';
import type { Votes } from '../../../data/domain/world-2/votes';
import { ShrineConstants, type Shrine } from '../../../data/domain/world-3/construction/shrines';
import type { Prayer } from '../../../data/domain/world-3/prayers';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// Every immediate calculated owner has a numerical gate. Raw levels and constants are not owner calculations.
describe('Persistent secondary stats immediate owner results', () => {
  let data: Map<string, unknown>;
  let player: Player;
  let terms: Record<string, number>;
  const owner = <T,>(key: string): T => data.get(key) as T;
  const expected = (file: string, key: string): number => {
    const results = loadExtractionResults(file);
    validateExtractionHealth(results);
    return getExtractedValue(results, key);
  };
  beforeAll(() => {
    const results = loadExtractionResults('player-secondary-stats-data.json');
    validateExtractionHealth(results);
    terms = results.extractions.secondary_stats.result.terms;
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });
  const office = (key: string): number => player.postOffice.reduce((total, box) => total + box.bonuses.reduce(
    (subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === key ? bonus.getBonus(box.level, index) : 0), 0), 0);
  const cards = (): Card[] => [...new Set([...player.cardInfo!.equippedCards, ...player.cardInfo!.cards.filter(card => card.passive)])];
  const selectedCurse = (id: number): number => player.activePrayers.includes(id)
    ? owner<Prayer[]>('prayers').find(prayer => prayer.index === id)!.getCurse() : 0;
  const parameters: { key: string; name: string; getValue: () => number }[] = [
    { key: 'postOfficeDef', name: 'Post Office flat Defence', getValue: () => office('def') },
    { key: 'postOfficeAccuracy', name: 'Post Office flat Accuracy', getValue: () => office('acc') },
    { key: 'card26', name: 'card flat Defence', getValue: () => Card.GetTotalBonusForId(cards(), 26) },
    { key: 'card15', name: 'card gear Defence percentage', getValue: () => Card.GetTotalBonusForId(cards(), 15) },
    { key: 'card23', name: 'card flat Accuracy', getValue: () => Card.GetTotalBonusForId(cards(), 23) },
    { key: 'cardLevelW6A2', name: 'native Defence passive-card level', getValue: () => player.cardInfo!.cards.find(card => card.id === 'w6a2')!.getLevels() },
    { key: 'alchemyDefPct', name: 'Alchemy Defence percentage used in both base channels', getValue: () => owner<Alchemy>('alchemy').getBubbleBonusForKey('DefPct', player) },
    { key: 'stampBaseDef', name: 'base Defence stamps', getValue: () => getStampBonusForKey(owner<Stamp[]>('stamps'), 'BaseDef') },
    { key: 'stampBaseAccuracy', name: 'base Accuracy stamps', getValue: () => getStampBonusForKey(owner<Stamp[]>('stamps'), 'BaseAcc') },
    { key: 'stampBaseDamage', name: 'baseDamageStamp in the same Vault boost group', getValue: () => getStampBonusForKey(owner<Stamp[]>('stamps'), 'BaseDmg') },
    { key: 'arcade1', name: 'Arcade flat Defence', getValue: () => owner<Arcade>('arcade').bonuses[1].getBonus() },
    { key: 'vault46', name: 'Vault gear Defence percentage', getValue: () => owner<UpgradeVault>('upgradeVault').getBonusForId(46) },
    { key: 'vault5', name: 'Vault final flat Defence', getValue: () => owner<UpgradeVault>('upgradeVault').getBonusForId(5) },
    { key: 'vault4', name: 'Vault flat Accuracy', getValue: () => owner<UpgradeVault>('upgradeVault').getBonusForId(4) },
    { key: 'companion21', name: 'active companion gear Defence percentage', getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 21) },
    { key: 'mealDef', name: 'meal flat Defence', getValue: () => owner<Cooking>('cooking').getMealBonusForKey('Def') },
    { key: 'secondTalent122', name: 'allocated talent second-curve flat Defence', getValue: () => {
      const talent = player.getTalent(122);
      return talent && talent.pointsSpent > 0.5 ? talent.getBonus(false, true) : 0;
    } },
    { key: 'bribe22', name: 'purchased bribe Defence percentage', getValue: () => owner<Bribe[]>('bribes').find(bribe => bribe.bribeIndex === 22)!.getBonus() },
    { key: 'selectedPrayer15Curse', name: 'selected first Defence prayer curse', getValue: () => selectedCurse(15) },
    { key: 'selectedPrayer16Curse', name: 'selected second Defence prayer curse', getValue: () => selectedCurse(16) },
    { key: 'talent9', name: 'recipient talent Defence percentage', getValue: () => player.getTalentBonusAtInputs(9, player.finalTalentInputs) },
    { key: 'signDefence', name: 'prepared star-sign Defence percentage including negative signs', getValue: () => player.starSigns.reduce((total, sign) => total + sign.getBonus('Defence'), 0) },
    { key: 'selectedBuff124', name: 'selected ordinary Defence buff', getValue: () => player.activeBuffs.find(talent => talent.skillIndex === 124)?.getBonus() ?? 0 },
    { key: 'cardSet4', name: 'prepared Defence card set', getValue: () => player.cardInfo!.getBonusForId(4) },
    { key: 'flurbo6', name: 'permanent Flurbo Defence purchase', getValue: () => owner<Dungeons>('dungeons').passives.get(PassiveType.Flurbo)![6].getBonus() },
    { key: 'amarokSetPercent', name: 'Amarok set raw Defence percentage', getValue: () => owner<EquipmentSets>('equipmentSets').getSetBonus('AMAROK_SET', player, true) },
    { key: 'recipientSnehebatuMinor', name: 'recipient Snehebatu minor Defence', getValue: () => owner<Divinity>('divinity').gods[0].getMinorLinkBonus(player) },
    { key: 'vote3', name: 'selected vote Defence percentage', getValue: () => owner<Votes>('votes').getCurrentBonus(3) },
    { key: 'vialBaseAccuracy', name: 'Alchemy vial flat Accuracy', getValue: () => owner<Alchemy>('alchemy').getVialBonusForKey('baseACC') },
  ];
  parameters.forEach(({ key, name, getValue }) => {
    it(`matches ${name}`, () => expect(getValue()).toMatchLiveGame(terms[key], 0));
  });

  it.each(['Defence', 'Accuracy'] as const)('matches complete normal gear %s using its paired M1 oracle', property => {
    const results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    expect(player.gear.getProperty(property)).toMatchLiveGame(results.extractions.gear_properties.result[property], 0);
  });
  it.each([
    [EquipmentBonus.BaseDefence, 'equipmentBaseDef'],
    [EquipmentBonus.Defence, 'equipmentDefence'],
    [EquipmentBonus.Accuracy, 'equipmentAccuracy'],
  ] as const)('matches distinct equipment effect %s using its native replay term', (bonus, key) => {
    expect(player.gear.getBonus(bonus)).toMatchLiveGame(terms[key], 0);
  });
  it('matches recipient Thicc Skin statue Defence using its paired oracle', () => {
    expect(owner<PlayerStatues[]>('statues')[player.playerID].statues.find(statue => statue.index === 7)!.getBonus(player))
      .toMatchLiveGame(expected('statue-bonuses-data.json', 'statue_7_bonus'), 0);
  });
  it('matches prepared Defence chips using their paired oracle', () => {
    expect(player.getChipBonus('def')).toMatchLiveGame(expected('player-chip-bonuses-data.json', 'chip_bonus_def'), 0);
  });
  it('matches Poppy final flat Defence using its paired oracle', () => {
    expect(owner<Poppy>('poppy').getGlobalBonus(1)).toMatchLiveGame(expected('poppy-global-bonus-data.json', 'global_bonus_1'), 0);
  });
  it.each([
    ['getDefencePercent', 'golden_defence_percent', 'raw Defence percentage'],
    ['getBaseAccuracy', 'golden_base_accuracy', 'flat base Accuracy'],
  ] as const)('matches golden-food %s directly consumed by secondary stats', (method, key) => {
    const food = owner<GoldenFood>('goldenFood');
    expect(food[method](player)).toMatchLiveGame(expected('golden-food-data.json', key), 0);
  });
  it('matches the permanent map-independent Defence Shrine', () => {
    const shrine = owner<Shrine[]>('shrines')[ShrineConstants.HpDefShrine];
    const results = loadExtractionResults('shrine-map-independent-bonus-data.json');
    validateExtractionHealth(results);
    expect(shrine.getMapIndependentBonus()).toMatchLiveGame(results.extractions.map_independent_shrine.result.bonus, 0);
  });
});
