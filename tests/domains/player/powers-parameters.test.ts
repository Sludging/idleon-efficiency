import { Card } from '../../../data/domain/cards';
import { Food } from '../../../data/domain/items';
import type { Player } from '../../../data/domain/player';
import { ClassIndex, Talent } from '../../../data/domain/talents';
import { Dungeons, PassiveType } from '../../../data/domain/dungeons';
import type { Guild } from '../../../data/domain/guild';
import type { Family } from '../../../data/domain/family';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent powers direct owner results', () => {
  let data: Map<string, unknown>;
  let player: Player;
  let replay: { terms: Record<string, number>; bubbles: Record<string, number>; statues: Record<number, number> };
  beforeAll(() => {
    const results = loadExtractionResults('player-powers-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.powers.result;
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  const parameters: { key: string; name: string; getValue: () => number }[] = [
    { key: 'postOffice', name: 'Post Office weapon reward', getValue: () => player.postOffice.reduce((total, box) => total + box.bonuses.reduce((subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === '12a' ? bonus.getBonus(box.level, index) : 0), 0), 0) },
    { key: 'flurbo', name: 'permanent Flurbo Weapon Power purchase', getValue: () => (data.get('dungeons') as Dungeons).passives.get(PassiveType.Flurbo)![0].getBonus() },
    {
      key: 'card18', name: 'equipped-card Weapon Power effect', getValue: () => {
        const cards = [...new Set([...player.cardInfo!.equippedCards, ...player.cardInfo!.cards.filter(card => card.passive)])];
        return Card.GetTotalBonusForId(cards, 18);
      }
    },
    {
      key: 'cardLevel', name: "Smolderin' Plateau passive-card level", getValue: () => {
        const card = player.cardInfo!.cards.find(card => card.id === 'w5b2');
        if (!card) throw new Error('Missing static Smolderin\' Plateau card w5b2; ownership zero is not missing metadata.');
        return card.getLevels();
      }
    },
    { key: 'guild', name: 'Guild Weapon Power bonus', getValue: () => (data.get('guild') as Guild).guildBonuses[3].getBonus() },
    { key: 'sigil', name: 'Alchemy Sigil Weapon Power bonus', getValue: () => (data.get('sigils') as Sigils).sigils[17].getBonus() },
    { key: 'vial', name: 'Weapon Power vial bonus', getValue: () => (data.get('alchemy') as Alchemy).getVialBonusForKey('WeaponPOW') },
    { key: 'family', name: 'recipient-aware Barbarian family Weapon Power', getValue: () => (data.get('family') as Family).getClassBonus(ClassIndex.Barbarian)?.getBonus(player) ?? 0 },
    { key: 'sign', name: 'prepared star-sign Weapon Power', getValue: () => player.starSigns.reduce((total, sign) => total + sign.getBonus('Weapon Power'), 0) },
    { key: 'arcade', name: 'Arcade Weapon Power bonus', getValue: () => (data.get('arcade') as Arcade).bonuses[17].getBonus() },
  ];
  parameters.forEach(({ key, name, getValue }) => {
    it(`matches ${name}`, () => expect(getValue()).toMatchLiveGame(replay.terms[key], 0));
  });

  // M2/M7 already have authoritative direct entries. Do not recapture them under new labels.
  ['W1', 'A1', 'M1', 'W5', 'W6', 'A5', 'A6', 'M5', 'M6', 'W2', 'W7', 'A2', 'A8'].forEach(key => {
    it(`matches recipient Alchemy ${key} power contribution`, () => {
      expect((data.get('alchemy') as Alchemy).getBubbleBonusForKey(key, player)).toMatchLiveGame(replay.bubbles[key], 0);
    });
  });
  [2, 6, 8, 9].forEach(id => {
    it(`matches recipient statue ${id} skill-power contribution`, () => {
      const statue = (data.get('statues') as PlayerStatues[])[player.playerID].statues.find(statue => statue.index === id)!;
      expect(statue.getBonus(player)).toMatchLiveGame(replay.statues[id], 0);
    });
  });

  const gearProperties = ['Weapon_Power', 'Mining_Power', 'Choppin_Power', 'Fishing_Power', 'Catching_Power', 'Trapping_Power', 'Worship_Power'] as const;
  gearProperties.forEach(property => {
    it(`matches complete ${property} gear input`, () => {
      const results = loadExtractionResults('player-equipment-properties-data.json');
      validateExtractionHealth(results);
      const expected = results.extractions.gear_properties.result[property];
      expect(player.gear.getProperty(property)).toMatchLiveGame(expected, 0);
    });
  });
  it('matches equipped-chip Weapon Power using its existing direct oracle', () => {
    const results = loadExtractionResults('player-chip-bonuses-data.json');
    validateExtractionHealth(results);
    expect(player.getChipBonus('weppow')).toMatchLiveGame(getExtractedValue(results, 'chip_bonus_weppow'), 0);
  });

  it('matches Food-owned weapon contribution directly consumed by Weapon Power', () => {
    const inputs = {
      boostFoodStamp: getStampBonusForKey(data.get('stamps') as Stamp[][], 'BFood'),
      foodStatue: (data.get('statues') as PlayerStatues[])[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
    };
    expect(Food.getWeaponPowerContribution(player, inputs)).toMatchLiveGame(replay.terms.foodWeapon, 0);
  });

  it('matches capped Beginner Best Class directly consumed by Weapon Power', () => {
    expect(Talent.getBeginnerWeaponPowerBonus(player)).toMatchLiveGame(replay.terms.beginner, 0);
  });
  it('matches Talent-owned progression and Intellect contributions directly consumed by Weapon Power', () => {
    const result = Talent.getSkillWeaponPowerBonus(player);
    expect(result.progression).toMatchLiveGame(replay.terms.progression, 0);
    expect(result.intellect).toMatchLiveGame(replay.terms.intellect, 0);
  });
  it('matches Talent-owned first-pet contribution directly consumed by Weapon Power', () => {
    const breeding = data.get('breeding') as Breeding;
    expect(Talent.getPetWeaponPowerBonus(player, breeding.firstStoredPetPower)).toMatchLiveGame(replay.terms.pet, 0);
  });
});
