import { Card } from '../../../data/domain/cards';
import { getCompanionActiveBonus, type Companion } from '../../../data/domain/companions';
import { Dungeons, PassiveType } from '../../../data/domain/dungeons';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { Food } from '../../../data/domain/items';
import type { Player } from '../../../data/domain/player';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Poppy } from '../../../data/domain/world-2/poppy';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { Prayer } from '../../../data/domain/world-3/prayers';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { SaltLick } from '../../../data/domain/world-3/construction/saltLick';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Bribe } from '../../../data/domain/world-1/bribes';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Divinity } from '../../../data/domain/world-5/divinity';

type Terms = {
  selectedAttribute: 'STR' | 'AGI' | 'WIS' | 'LUK';
  accuracyTerms: Record<string, number>;
  speedTerms: Record<string, number>;
};

describe('Combat Accuracy and movement speed direct owner parameters', () => {
  let data: Map<string, unknown>;
  let player: Player;
  let terms: Terms;
  const owner = <T,>(key: string): T => data.get(key) as T;

  beforeAll(() => {
    const extracted = loadExtractionResults('player-combat-accuracy-movement-speed-data.json');
    validateExtractionHealth(extracted);
    terms = extracted.extractions.combat_speed.result as Terms;
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  const cards = (): Card[] => [...new Set([...player.cardInfo!.equippedCards, ...player.cardInfo!.cards.filter(card => card.passive)])];
  const activeCurse = (id: number): number => player.activePrayers.includes(id)
    ? owner<Prayer[]>('prayers').find(prayer => prayer.index === id)!.getCurse() : 0;
  const activePrayer = (id: number): number => player.activePrayers.includes(id)
    ? owner<Prayer[]>('prayers').find(prayer => prayer.index === id)!.getBonus() : 0;
  const talent = (id: number, secondCurve = false): number => player.getTalent(id)?.getBonus(false, secondCurve) ?? 0;
  const selectedBuff = (id: number, secondCurve = false): number => player.activeBuffs.find(buff => buff.skillIndex === id)?.getBonus(false, secondCurve) ?? 0;

  const foodContribution = (): number => Food.getMovementSpeedContribution(player, {
    boostFoodStamp: getStampBonusForKey(owner<Stamp[][]>('stamps'), 'BFood'),
    foodStatue: owner<PlayerStatues[]>('statues')[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
  }, player.finalTalentInputs);

  const accuracy: { key: string; name: string; value: () => number }[] = [
    {
      key: 'selectedAttributeValue',
      name: 'class-selected Accuracy attribute',
      value: () => ({
        STR: player.stats.strength,
        AGI: player.stats.agility,
        WIS: player.stats.wisdom,
        LUK: player.stats.luck,
      })[terms.selectedAttribute],
    },
    { key: 'alchemyAccuracyPercent', name: 'Alchemy AccPct', value: () => owner<Alchemy>('alchemy').getBubbleBonusForKey('AccPct', player) },
    { key: 'buff288SecondCurve', name: 'selected buff 288 second curve', value: () => selectedBuff(288, true) },
    { key: 'card17', name: 'card 17 Accuracy percentage', value: () => Card.GetTotalBonusForId(cards(), 17) },
    { key: 'accuracySign', name: 'Accuracy star signs', value: () => player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Accuracy'), 0) },
    { key: 'buff124FirstCurve', name: 'selected buff 124 first curve', value: () => selectedBuff(124) },
    { key: 'accuracyStatue14', name: 'Accuracy statue 14', value: () => owner<PlayerStatues[]>('statues')[player.playerID].statues[14].getBonus(player) },
    { key: 'arcade2', name: 'Arcade Accuracy percentage', value: () => owner<Arcade>('arcade').bonuses[2].getBonus() },
    { key: 'flurbo5', name: 'Flurbo Accuracy purchase', value: () => owner<Dungeons>('dungeons').passives.get(PassiveType.Flurbo)![5].getBonus() },
    { key: 'bribe21', name: 'Accuracy bribe', value: () => owner<Bribe[]>('bribes').find(bribe => bribe.bribeIndex === 21)!.getBonus() },
    { key: 'companion23', name: 'active companion 23 Accuracy', value: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 23) },
    { key: 'talent641Second', name: 'talent 641 second curve', value: () => talent(641, true) },
    { key: 'cardSet4', name: 'Accuracy card set 4', value: () => player.cardInfo!.getBonusForId(4) },
    { key: 'prayer6', name: 'selected prayer 6 bonus', value: () => activePrayer(6) },
    { key: 'prayer15Curse', name: 'selected prayer 15 curse', value: () => activeCurse(15) },
    { key: 'prayer16Curse', name: 'selected prayer 16 curse', value: () => activeCurse(16) },
    { key: 'accuracyChip', name: 'Accuracy chip', value: () => player.getChipBonus('acc') },
    { key: 'totalAccuracyMeal', name: 'TotAcc meal', value: () => owner<Cooking>('cooking').getMealBonusForKey('TotAcc') },
    { key: 'rooAccuracy', name: 'Roo Accuracy bonus', value: () => owner<Poppy>('poppy').getGlobalBonus(3) },
    { key: 'voteAccuracy', name: 'Accuracy vote', value: () => owner<Votes>('votes').getCurrentBonus(3) },
    { key: 'amarokSetAccuracy', name: 'Amarok set Accuracy', value: () => owner<EquipmentSets>('equipmentSets').getSetBonus('AMAROK_SET', true) },
    { key: 'divinityMinor', name: 'Divinity minor link Accuracy', value: () => owner<Divinity>('divinity').gods[0].getMinorLinkBonus(player) },
  ];
  accuracy.forEach(({ key, name, value }) => it(`matches ${name}`, () => expect(value()).toMatchLiveGame(terms.accuracyTerms[key], 0)));

  const speed: { key: string; name: string; value: () => number }[] = [
    { key: 'food', name: 'occupied MoveSpdBoosts food contribution', value: foodContribution },
    { key: 'talent266', name: 'speed talent 266', value: () => talent(266) },
    { key: 'speedStamp', name: 'PctMoveSpd stamp', value: () => getStampBonusForKey(owner<Stamp[][]>('stamps'), 'PctMoveSpd') },
    { key: 'buff273', name: 'selected speed buff 273 first curve', value: () => selectedBuff(273) },
    { key: 'agility', name: 'AGI attribute', value: () => player.stats.agility },
    { key: 'speedStatue1', name: 'speed statue 1', value: () => owner<PlayerStatues[]>('statues')[player.playerID].statues[1].getBonus(player) },
    { key: 'speedSign', name: 'MoveSpd star signs', value: () => player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Movement Speed'), 0) },
    { key: 'movementEquipment', name: 'MovementSpeed equipment bonus', value: () => player.gear.getBonus(EquipmentBonus.MovementSpeed) },
    { key: 'speedCard6', name: 'speed card 6', value: () => Card.GetTotalBonusForId(cards(), 6) },
    { key: 'talent77', name: 'speed talent 77', value: () => talent(77) },
    { key: 'talent641First', name: 'talent 641 first curve', value: () => talent(641) },
    { key: 'saltLick7', name: 'Salt Lick 7', value: () => owner<SaltLick>('saltLick').getBonus(7) },
    { key: 'movementChip', name: 'movement speed chip', value: () => player.getChipBonus('move') },
    { key: 'sigil13', name: 'Sigil 13', value: () => owner<Sigils>('sigils').sigils.find(sigil => sigil.index === 13)!.getBonus() },
  ];
  speed.forEach(({ key, name, value }) => it(`matches ${name}`, () => expect(value()).toMatchLiveGame(terms.speedTerms[key], 0)));
});
